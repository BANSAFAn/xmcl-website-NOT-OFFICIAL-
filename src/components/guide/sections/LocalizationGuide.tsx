import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { CodeBlock } from "../CodeBlock";
import {
  UnderConstructionBadge,
  GreenBadge,
  YellowBadge,
  RedBadge,
} from "../GuideBages";

export function LocalizationGuide() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">
          Getting Started with Localization
        </h2>
        <UnderConstructionBadge></UnderConstructionBadge>
      </div>

      <Card className="mb-8 border border-white/10 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Git.</strong> Required for version control and project
              cloning
            </li>
            <li>
              <strong>Code editor:</strong> Choose one of the following:
              <ul className="list-disc pl-6 mt-2">
                <li>
                  <strong>VSCode</strong> <GreenBadge>Recommended</GreenBadge> -
                  Features integrated translation tools and extensions that
                  simplify finding translation keys
                </li>
                <li>
                  <strong>Zed</strong> <YellowBadge>(Alternative)</YellowBadge>{" "}
                  - Has fewer translation-specific features at the moment
                </li>
              </ul>
            </li>
            <li>
              <strong>Runtime environment:</strong> Choose one option:
              <ul className="list-disc pl-6 mt-2">
                <li>
                  <strong>Node.js</strong> <YellowBadge>Standard</YellowBadge> -
                  Install the latest version for local translation testing
                </li>
                <li>
                  <strong>bun</strong> <GreenBadge>Recommended</GreenBadge> -
                  Faster alternative to Node.js
                </li>
              </ul>
            </li>
            <li>
              <strong>Package manager:</strong> Choose one option:
              <ul className="list-disc pl-6 mt-2">
                <li>
                  <strong>pnpm</strong> <YellowBadge>Standard</YellowBadge> -
                  Follow the official installation guide
                </li>
                <li>
                  <strong>bun</strong> <GreenBadge>Recommended</GreenBadge> -
                  Faster alternative to pnpm
                </li>
              </ul>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8 border border-white/10 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Getting Started
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="fork" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6 rounded-lg bg-slate-800/50">
              <TabsTrigger value="fork" className="rounded-md">
                Fork & Clone
              </TabsTrigger>
              <TabsTrigger value="install" className="rounded-md">
                Install
              </TabsTrigger>
              <TabsTrigger value="locate" className="rounded-md">
                Locate Files
              </TabsTrigger>
              <TabsTrigger value="translate" className="rounded-md">
                Translate
              </TabsTrigger>
              <TabsTrigger value="test" className="rounded-md">
                Test & Submit
              </TabsTrigger>
            </TabsList>

            <TabsContent value="fork" className="space-y-4 mt-2">
              <p>You need to fork & clone the project using git.</p>
              <p>
                Suppose you already fork the project in Github to your repo:
              </p>

              <CodeBlock>
                git clone --recurse-submodules
                https://github.com/your-id/x-minecraft-launcher
              </CodeBlock>
            </TabsContent>

            <TabsContent value="install" className="space-y-4 mt-2">
              <p>
                Install the project using pnpm or bun, or you can run corepack
                command to install pnpm.
              </p>
              <p>
                Under the folder you cloned, e.g. x-minecraft-launcher, run
                command:
              </p>

              <div className="bg-slate-800/50 p-3 rounded my-3">
                <div className="text-slate-400 mb-2">
                  # If you use corepack, you can run this to install pnpm
                </div>
                <div className="font-mono">corepack enable</div>
              </div>

              <CodeBlock>pnpm install</CodeBlock>

              <p className="mt-3">Or if you prefer using bun:</p>

              <CodeBlock>bun install</CodeBlock>

              <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-300/20 mt-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-300 mt-0.5" />
                  <div>
                    <strong className="text-amber-300">Troubleshooting:</strong>{" "}
                    If you get "cannot find module" error, make sure you cloned
                    with{" "}
                    <span className="font-mono text-sm">
                      --recurse-submodules
                    </span>{" "}
                    option.
                    <div className="mt-2 bg-slate-800/50 p-3 rounded font-mono text-sm">
                      git submodule update --init --recursive
                    </div>
                    <div className="mt-2 text-sm text-slate-300">
                      Then run pnpm install or bun install again.
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="locate" className="space-y-4 mt-2">
              <p>You need to find the corresponding locale yaml file under:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <span className="font-mono text-sm">
                    xmcl-keystone-ui/locales
                  </span>
                </li>
                <li>
                  <span className="font-mono text-sm">
                    xmcl-electron-app/main/locales
                  </span>
                </li>
              </ul>

              <p className="mt-3">
                The file name is the locale code. For example, if you found some
                translations in Chinese that need improvement, you would edit{" "}
                <span className="font-mono text-sm">zh-CN.yaml</span>, since
                zh-CN is the locale code for Simplified Chinese.
              </p>
            </TabsContent>

            <TabsContent value="translate" className="space-y-4 mt-2">
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-amber-300">
                  Use VSCode with i18n Extension{" "}
                  <GreenBadge showEmoji={true}>Recommended</GreenBadge>
                </h4>
                <p className="mt-2">
                  Install the i18n-ally (lokalise.i18n-ally) extension. VSCode
                  might hint you to install recommended extensions, which should
                  already include this extension.
                </p>

                <div className="p-4 bg-black/30 rounded-lg my-4">
                  <p className="text-gray-400">
                    Alt text: Screenshot showing VSCode with i18n-ally extension
                  </p>
                </div>

                <p>
                  In this extension, you can find your locale progress in
                  PROGRESS tab, which displays the number of keys the language
                  is missing.
                </p>

                <div className="p-4 bg-black/30 rounded-lg my-4">
                  <p className="text-gray-400">
                    Alt text: Screenshot showing extension progress tab
                  </p>
                </div>

                <p>
                  You can directly translate the key in right side of the editor
                  for any language.
                </p>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-amber-300">
                  Adding new language{" "}
                  <YellowBadge showEmoji={true}>Optional</YellowBadge>
                </h4>
                <p className="mt-2">
                  If you are adding a new language, you need to also go to the{" "}
                  <span className="font-mono text-sm">assets\locales.json</span>{" "}
                  and add the new language key value there.
                </p>

                <p className="mt-3">
                  Suppose you want to add French (fr), you would edit:
                </p>

                <CodeBlock>
                  {`{
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  "en": "English",
  "ru": "Русский язык",
  "uk": "Українська мова",
  "es-ES": "Español",
}`}
                </CodeBlock>

                <p className="mt-3">Adding a new line at the end:</p>

                <CodeBlock>
                  {`{
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  "en": "English",
  "ru": "Русский язык",
  "uk": "Українська мова",
  "es-ES": "Español",
  "fr": "French"
}`}
                </CodeBlock>

                <p className="mt-3">
                  Then create the yaml files with the locale code:
                </p>

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

                <p className="mt-3">
                  Put your translation in the new fr.yaml file. You can refer to
                  en.yaml as reference.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="test" className="space-y-4 mt-2">
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-amber-300">
                  Test your translation{" "}
                  <GreenBadge showEmoji={true}>Recommended</GreenBadge>
                </h4>
                <ol className="list-decimal pl-6 space-y-3 mt-3 text-slate-200">
                  <li>
                    Make sure you've installed the project (see Install tab)
                  </li>
                  <li>
                    In VSCode, click the button on the sidebar Run and Debug
                  </li>
                  <li>
                    Select the Electron: Main (launch), and click play button
                  </li>
                  <li>
                    Alternatively, press F5 which might be the hotkey for this
                    operation
                  </li>
                  <li>
                    Once the launcher starts, switch to your language in
                    settings page to test
                  </li>
                </ol>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-amber-300">
                  Send Pull Request
                </h4>
                <p className="mt-2">
                  Please follow the github guide about how to send pull request.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
