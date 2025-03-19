
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "../CodeBlock";

export function LocalizationGuide() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-6">Getting Started with Localization</h2>
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Pre-requirements</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Git.</strong> You must install git to getting stared</li>
          <li><strong>VSCode.</strong> The highly recommended editor for translator to translate. It have integrated UI tool to help you find the translation key.</li>
          <li><strong>Node.js.</strong> If you want to test your translation locally, you need this. You can just install latest version.</li>
          <li><strong>pnpm.</strong> If you want to test your translation locally, you need this. You can follow its installation page to install.</li>
        </ul>
      </section>

      <Separator className="my-8 bg-white/10" />

      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Getting Started</h3>
        
        <h4 className="text-xl font-semibold text-amber-300">Fork & Clone Required</h4>
        <p>You need to fork & clone the project using git.</p>
        <p>Suppose you already fork the project in Github to your repo:</p>
        
        <CodeBlock>
          git clone --recurse-submodules https://github.com/your-id/x-minecraft-launcher
        </CodeBlock>
        
        <h4 className="text-xl font-semibold text-amber-300 mt-6">Install Required</h4>
        <p>Install the project using pnpm, or you can run corepack command to install pnpm.</p>
        <p>Under the folder you cloned, e.g. x-minecraft-launcher, run command</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>If you use corepack, you can run corepack enable . to install pnpm</li>
        </ul>
        
        <CodeBlock>
          pnpm install
        </CodeBlock>
        
        <p>If you get error like cannot find module, please make sure you have cloned with --recurse-submodules option.</p>
        <p>If you forget to add this option, you can run</p>
        
        <CodeBlock>
          git submodule update --init --recursive
        </CodeBlock>
        
        <p>and then run pnpm install again.</p>
        
        <h4 className="text-xl font-semibold text-amber-300 mt-6">Found the locale file</h4>
        <p>You need to find the corresponding locale yaml file under</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>xmcl-keystone-ui/locales</li>
          <li>xmcl-electron-app/main/locales</li>
        </ul>
        
        <p>The file name is the locale code. You can reference this document to choice the locale.</p>
        <p>For example, if I found some translations in Chinese is not suitable. I need to change the translation in the zh-CN.yaml, since zh-CN is the locale code for Simplified Chinese.</p>
        
        <h4 className="text-xl font-semibold text-amber-300 mt-6">Use VSCode with i18n Extension <Badge variant="outline" className="ml-2">Recommended</Badge> <Badge variant="outline" className="ml-1">Optional</Badge></h4>
        <p>Install the i18n-ally (lokalise.i18n-ally) extension. The VSCode might hint you to install recommended extensions, which should already include this extension.</p>
        
        <div className="p-4 bg-black/30 rounded-lg my-4">
          <p className="text-gray-400">Alt text: Screenshot showing VSCode with i18n-ally extension</p>
        </div>
        
        <p>In this extensions, you can find your locale progress in PROGRESS tab, which display the number of keys the language is missing.</p>
        
        <div className="p-4 bg-black/30 rounded-lg my-4">
          <p className="text-gray-400">Alt text: Screenshot showing extension progress tab</p>
        </div>
        
        <p>You can directly translate the key in right side of the editor for any language.</p>
        
        <h4 className="text-xl font-semibold text-amber-300 mt-6">Adding new language <Badge variant="outline" className="ml-2">Optional</Badge></h4>
        <p>If you are adding a new language, you need to also go to the assets\locales.json and add the new language key value there.</p>
        
        <p>Suppose you want to add French (fr), you can open the file assets\locales.json</p>
        
        <CodeBlock>
{`{
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  "en": "English",
  "ru": "Русский язык",
  "es-ES": "Español"
}`}
        </CodeBlock>
        
        <p>adding a new line at the end</p>
        
        <CodeBlock>
{`{
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  "en": "English",
  "ru": "Русский язык",
  "es-ES": "Español",
  "fr": "French"
}`}
        </CodeBlock>
        
        <p>Then you want to create the yaml file with the locale code. Use fr as the example:</p>
        
        <CodeBlock>
{` x-minecraft-launcher
 └─📂xmcl-keystone-ui/locales
   ├─ 📜en.yaml
   ├─ 📜zh-CN.yaml
+  └─ 📜fr.yaml
 └─📂xmcl-electron-app/main/locales
   ├─ 📜en.yaml
   ├─ 📜zh-CN.yaml
+  └─ 📜fr.yaml`}
        </CodeBlock>
        
        <p>Put your translation in the new fr.yaml file. You can refer en.yaml as reference.</p>
        
        <h4 className="text-xl font-semibold text-amber-300 mt-6">Test your translation result <Badge variant="outline" className="ml-2">Recommended</Badge> <Badge variant="outline" className="ml-1">Optional</Badge></h4>
        <p>You need to first install the project. See #Install section above.</p>
        <p>In VSCode, click the button on the sidebar Run and Debug, select the Electron: Main (launch), and click play button.</p>
        <p>Or, you can try to press F5 which might be the hotkey for this operation.</p>
        <p>This should start the launcher. You can switch to your language in setting page to test.</p>
        
        <h4 className="text-xl font-semibold text-amber-300 mt-6">Send Pull Request</h4>
        <p>Please follow the github guide about how to send pull request.</p>
      </section>
    </div>
  );
}
