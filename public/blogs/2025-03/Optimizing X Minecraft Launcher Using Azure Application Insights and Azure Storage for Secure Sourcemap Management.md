# Optimizing X Minecraft Launcher: Using Azure Application Insights and Azure Storage for Secure Sourcemap Management

## Sourcemap & Debugging

In X Minecraft Launcher, we embed the sourcemap in production code. With the `source-map-support` package, the Error stack becomes significantly useful to address the issues.

We can directly know which line in source code has an issue.

However, shipping sourcemap in production makes our final package larger. Basically, it increases the size of the final app bundle. At the same time, we need to load the sourcemap into memory, so it will also consume much memory in production usage. That's bad. 😔

Therefore, we start looking for an approach that we can not only have full & clear error stack, but also remove the sourcemap from the bundle.

## Azure Application Insight

The launcher is using the [Azure Application Insight for telemetry](https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview). From the official document, it supports the semantic file mapping in telemetry. That looks cool, but soon we find the problem.

## The Problem

In official document, we see the example that mapping the uglified browser JavaScript error stack back to source code callstack. The browser JavaScript error stack looks like:

```
at X (https://frog.com/path/file.js:123:456)
```

It starts with domain, and Azure can ignore the protocol and domain, directly use the path `/path/file.js` to lookup the corresponding `.map` file in azure storage blob: `/path/file.js.map`.

In the launcher, our error stack is always the full disk path of the js file. Which means, the error stack path is depending on where user place the program. Example:

```
at X (C:\\Users\\username\\x-minecraft-launcher\\resources\\app.asar\\index.js:123:456)
```

It's impossible to let Azure to handle this mapping.

## Inspiration

After we understand the nature of the Azure remapping logic, we think we should come up a way to modify the callback fitting in with the Azure logic.

The `source-map-support` give me a spark.

The `source-map-support` is doing the similar thing, except it's mapping the callback back to source. From reading its source code, we find we could use V8 stack trace API to modify the stack to the shape we want.

All we need to do, is intercepting the V8 stack trace generation process, and replace the absolute file path into relative path to our sourcemap in azure storage blob.

## Solution

The launcher use github action to build the artifact, and we are using the github run number as the build number of the launcher. We decide to store each builds sourcemaps into the azure storage blob, and map the error stack by build number.

It means, we store the sourcemap like

```
<storage-url>/build_number/<file>.map
```

and our error stack should be like

```
at X (/{build_number}/index.js:123:456)
```

So we first copy the intercept code from `source-map-support`:

```javascript
Error.prepareStackTrace = (error, stack) => {
  const name = error.name || "Error";
  const message = error.message || "";
  const errorString = name + ": " + message;
  
  const processedStack = [];
  for (let i = stack.length - 1; i >= 0; i--) {
    processedStack.push(formatCallSite(stack[i]));
  }
  
  return errorString + "\n" + processedStack.reverse().join("\n") + "\n";
};
```

In original implementation, the `wrapCallSite` is a complex function to transform the callback to source.

We only want a simple one:

```javascript
const BUILD_NUMBER = process.env.BUILD_NUMBER;
const prefix = `/${BUILD_NUMBER}/`;

const wrapCallSite = (frame) => {
  if (frame.isNative()) return frame;
  
  const original = frame.getScriptNameOrSourceURL();
  frame.getScriptNameOrSourceURL = function () {
    // transform the local path to relative path
    const name = original.call(this);
    
    if (name) {
      return name.replace(/\\/g, "/").replace(/.+\/resources\/app.asar\/(.+)/, prefix + "$1");
    }
    
    return name;
  };
  
  return frame;
};
```

The `cleanCallSite` is from original implementation.