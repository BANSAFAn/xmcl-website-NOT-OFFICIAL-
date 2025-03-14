import { HardDrive, File } from "lucide-react";
import { UnderConstructionBadge } from "../GuideBages";
import { CodeBlock } from "../CodeBlock";

export function GlobalSettings() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Global Settings</h2>
        <UnderConstructionBadge></UnderConstructionBadge>
      </div>

      <p className="mb-4">Global data is stored in xmcl data directory.</p>

      <div className="bg-white/5 p-4 rounded-lg border border-white/10 my-6">
        <div className="flex items-center gap-2 mb-2">
          <HardDrive className="w-5 h-5 text-blue-400" />
          <span className="font-medium">xmcl data directory</span>
        </div>
        <div className="ml-6 flex items-center gap-2">
          └─
          <File className="w-5 h-5 text-amber-400" />
          <span>
            setting.json{" "}
            <span className="text-gray-400"># user configuration file</span>
          </span>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mt-8 mb-4">
        Global Settings JSON Format
      </h3>

      <CodeBlock language="json">
        {`{
    // The current selected language
    "locale": "en",
    // Not enabled
    "autoInstallOnAppQuit": false,
    // Not enabled
    "autoDownload": false,
    // Not enabled
    "allowPrerelease": false,
    // List of known BMCL APIs
    "apiSets": [
        {
            "name": "mcbbs",
            "url": "https://download.mcbbs.net"
        },
        {
            "name": "bmcl",
            "url": "https://bmclapi2.bangbang93.com"
        }
    ],
    // Preferred BCML API, empty means auto select
    "apiSetsPreference": "",
    // Local proxy url
    "httpProxy": "http://127.0.0.1:7890",
    // Whether to use proxy
    "httpProxyEnabled": true,
    // Theme, light or dark
    "theme": "dark",
    // Max HTTP socket count for downloading
    "maxSockets": 16,
    "globalMinMemory": 0,
    "globalMaxMemory": 0,
    "globalAssignMemory": false,
    "globalVmOptions": [
        ""
    ],
    "globalMcOptions": [
        ""
    ],
    "globalFastLaunch": false,
    "globalHideLauncher": true,
    "globalShowLog": false,
    // Whether to enable Discord presence
    "discordPresence": true,
    // Whether to enable developer mode
    "developerMode": false,
    // Max HTTP socket count for API requests
    "maxAPISockets": 16
}`}
      </CodeBlock>
    </div>
  );
}
