import { HardDrive, File, Folder } from "lucide-react";
import { UnderConstructionBadge } from "../GuideBages";
import { CodeBlock } from "../CodeBlock";

export function InstanceStorageProtocol() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Instance Storage</h2>
        <UnderConstructionBadge></UnderConstructionBadge>
      </div>

      <p className="mb-4">
        XMCL, similar to MultiMC, stores instance information in specific
        locations.
      </p>

      <div className="bg-white/5 p-4 rounded-lg border border-white/10 my-6">
        <div className="flex items-center gap-2 mb-2">
          <HardDrive className="w-5 h-5 text-blue-400" />
          <span className="font-medium">XMCL data directory</span>
        </div>
        <div className="ml-6 flex items-center gap-2">
          └─
          <File className="w-5 h-5 text-amber-400" />
          <span>
            instances.json{" "}
            <span className="text-gray-400">
              # Global instance configuration file
            </span>
          </span>
        </div>
      </div>

      <div className="bg-white/5 p-4 rounded-lg border border-white/10 my-6">
        <div className="flex items-center gap-2 mb-2">
          <HardDrive className="w-5 h-5 text-blue-400" />
          <span className="font-medium">XMCL game data directory</span>
        </div>
        <div className="ml-6 flex items-center gap-2">
          └─
          <Folder className="w-5 h-5 text-amber-400" />
          <span>instances</span>
          <span className="text-gray-400"># Contains files for instances</span>
        </div>
        <div className="ml-12 flex items-center gap-2">
          ├─
          <Folder className="w-5 h-5 text-amber-400" />
          <span>instance-a</span>
        </div>
        <div className="ml-16 flex items-center gap-2">
          └─
          <File className="w-5 h-5 text-amber-400" />
          <span>
            instance.json{" "}
            <span className="text-gray-400">
              # Configuration file for instance A
            </span>
          </span>
        </div>
        <div className="ml-12 flex items-center gap-2">
          └─
          <Folder className="w-5 h-5 text-amber-400" />
          <span>instance-b</span>
        </div>
        <div className="ml-16 flex items-center gap-2">
          └─
          <File className="w-5 h-5 text-amber-400" />
          <span>
            instance.json{" "}
            <span className="text-gray-400">
              # Configuration file for instance B
            </span>
          </span>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mt-8 mb-4">
        Global Configuration File Format
      </h3>
      <p className="mb-4">
        Here we assume your XMCL data is stored in{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">
          /path/to/xmcl.
        </span>
      </p>

      <CodeBlock language="json">
        {`{
    // This is the last selected instance. The launcher will select this one when launched.
    "selectedInstance": "/path/to/xmcl/instances/instance-a",
    // This is a cached list of all instances. Imported external instances paths will also be stored here. They will be unavailable if the launcher is deleted.
    "instances": [
        "/path/to/xmcl/instances/instance-a",
        "/path/to/xmcl/instances/instance-b",
        // External instances
        "/external/.minecraft"
    ]
}`}
      </CodeBlock>

      <h3 className="text-2xl font-semibold mt-8 mb-4">
        Instance Configuration File
      </h3>
      <p className="mb-4">
        Suppose you have created one in{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">
          /path/to/xmcl/instances/mc.hypixel.com
        </span>
        .
      </p>

      <CodeBlock language="json">
        {`{
    // This is the name displayed in the launcher
    "name": "mc.hypixel.com",
    // Not currently enabled. Sets resolution of instance game
    "resolution": { "width": 800, "height": 400, "fullscreen": false },
    // Minimum memory
    "minMemory": 0,
    // Maximum memory
    "maxMemory": 0,
    // JVM extra startup parameters
    "vmOptions": [],
    // MC extra startup parameters
    "mcOptions": [],
    "url": "",
    // URL of instance icon
    "icon": "",
    // Whether XMCL will display a log window after launch
    "showLog": false,
    // Whether to hide the launcher after launch
    "hideLauncher": true,
    // Required version for instance, an empty string represents not required
    "runtime": {
        "minecraft": "1.16.3",
        "forge": "",
        "liteloader": "",
        "fabricLoader": "",
        "yarn": "",
        "optifine": "",
        "quiltLoader": ""
    },
    // Java path, empty represents auto detection
    "java": "",
    // Manually specified launch version, empty represents a calculation based on runtime
    "version": "",
    // Server address, if present the launcher will connect directly to this server
    "server": { "host": "mc.hypixel.net", "port": 25565 },
    // Modpack author
    "author": "ci010",
    // Description
    "description": "",
    "lastAccessDate": 1661774086015,
    "creationDate": 1602514422594,
    "modpackVersion": "",
    "fileApi": "",
    "tags": [],
    "assignMemory": false,
    // Whether to launch quickly
    "fastLaunch": false
}`}
      </CodeBlock>
    </div>
  );
}
