
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/guide/CodeBlock";
import { TipAlert, ImportantAlert } from "@/components/guide/GuideAlerts";

export function ProtocolGuide() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-6">Protocol</h2>
      
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold">Instance storage format</h3>
        <Badge className="bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 mb-4">Under Construction</Badge>
        
        <p>XMCL, similar to multimc, stores instance information.</p>
        
        <p>This information is stored in the XMCL data directory:</p>
        <CodeBlock>
{`XMCL data directory
└─ 📜instances.json # Global instance configuration file`}
        </CodeBlock>
        
        <p>As well as the XMCL game data directory:</p>
        <CodeBlock>
{`XMCL game data directory
└─📂instances # Contains files for instances
  ├─📂instance-a
  │ └─ 📜instance.json # Configuration file for instance A
  └─ 📂instance-b
    └─ 📜instance.json # Configuration file for instance B`}
        </CodeBlock>

        <h4 className="text-xl font-semibold mt-6">Global Configuration File Format</h4>
        <p>Here we assume your XMCL data is stored in /path/to/xmcl.</p>
        <CodeBlock>
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
        
        <h4 className="text-xl font-semibold mt-6">Instance configuration file</h4>
        <p>Suppose you have created one in /path/to/xmcl/instances/mc.hypixel.com.</p>
        <CodeBlock>
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
        
        <p className="text-sm text-white/50 mt-2">Last updated: 17.03.2025, 07:50</p>
      </section>

      <Separator className="my-8 bg-white/10" />
      
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold">Java Data Cache</h3>
        
        <p>XMCL caches all found java in a JSON file, which is saved in the xmcl data directory.</p>
        <CodeBlock>
{`xmcl data directory
└─ java.json # java cache file`}
        </CodeBlock>
        
        <h4 className="text-xl font-semibold mt-6">Java Cache JSON Format</h4>
        <CodeBlock>
{`{
    "all": [
        {
            // Path of the executable file
            "path": "path/to/java",
            // Cached version
            "version": "11.0.6",
            // Major version number
            "majorVersion": 11,
            // Whether it is accessible and executable
            "valid": true
        },
    ]
}`}
        </CodeBlock>
        
        <p className="text-sm text-white/50 mt-2">Last updated: 17.03.2025, 07:50</p>
      </section>

      <Separator className="my-8 bg-white/10" />
      
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold">Minecraft Online Protocol Based on WebRTC</h3>
        
        <p>This article describes a launcher implementation for Minecraft that enables cross-local network play through WebRTC.</p>
        
        <h4 className="text-xl font-semibold mt-6">What is WebRTC? Why choose it?</h4>
        
        <p>WebRTC is a peer-to-peer real-time communication technology. To quote from the MDN:</p>
        
        <blockquote className="border-l-4 border-accent pl-4 italic my-4">
          WebRTC (Web Real-Time Communications) is an open-source technology that enables real-time communication over peer-to-peer connections.
        </blockquote>
        
        <p>WebRTC was originally designed for real-time audio and video streaming between browsers, but this doesn't limit its use in a launcher.</p>
        
        <p>So why choose WebRTC over other technologies? The following table compares three ways of implementing online play:</p>
        
        <div className="overflow-x-auto my-4">
          <table className="min-w-full bg-white/5 rounded-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-white/10 text-left"></th>
                <th className="py-2 px-4 border-b border-white/10 text-left">WebRTC</th>
                <th className="py-2 px-4 border-b border-white/10 text-left">Handwritten Hole Punching (Custom Protocol)</th>
                <th className="py-2 px-4 border-b border-white/10 text-left">Hiper and other third-party software</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b border-white/10 font-medium">Customization</td>
                <td className="py-2 px-4 border-b border-white/10">High</td>
                <td className="py-2 px-4 border-b border-white/10">Highest</td>
                <td className="py-2 px-4 border-b border-white/10">-</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-white/10 font-medium">Implementation Difficulty</td>
                <td className="py-2 px-4 border-b border-white/10">Low</td>
                <td className="py-2 px-4 border-b border-white/10">High</td>
                <td className="py-2 px-4 border-b border-white/10">Lowest</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-white/10 font-medium">Ease of Use for Users</td>
                <td className="py-2 px-4 border-b border-white/10">Dependent on Implementation</td>
                <td className="py-2 px-4 border-b border-white/10">Dependent on Implementation</td>
                <td className="py-2 px-4 border-b border-white/10">Requires Admin Permissions, cost involved</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h5 className="text-lg font-semibold mt-4">Customization</h5>
        <p>WebRTC and custom hole punching offer developers maximum control. With custom hole punching, the protocol is completely free of implementation restrictions since everything needs to be implemented from scratch.</p>
        <p>In contrast, unless SDKs are provided, extending other functions based on services like Hiper could be difficult.</p>
        <p>WebRTC only handles the connection establishment between users, while developers have complete control over what data to transfer, when to transfer it, and how to handle the data.</p>
        
        <h5 className="text-lg font-semibold mt-4">Implementation Difficulty</h5>
        <p>Custom hole punching is the most difficult in terms of engineering difficulty. Since WebRTC and custom hole punching share similar principles, custom hole punching requires the developer to implement WebRTC functionality from scratch.</p>
        <p>In the process, developers may face a variety of bugs, and the scope that developers consider may not be as comprehensive as the WebRTC protocol developers.</p>
        <p>Using WebRTC is like standing on the shoulders of giants; developers don't need to deal directly with the various complex situations encountered when establishing connections, but simply use the interfaces encapsulated by WebRTC. Thus, the implementation difficulty of using WebRTC is much lower than completely handwriting custom hole punching.</p>
        <p>There's basically no significant engineering difficulty for third-party services like Hiper.</p>
        
        <h5 className="text-lg font-semibold mt-4">Ease for Users</h5>
        <p>It's worth noting that using third-party services requires users to connect to their external systems, which may involve additional costs.</p>
        <p>If developers use custom hole punching or WebRTC, they can fully control the user experience aspect.</p>
        
        <TipAlert>
          This guide is designed for developers who wish to implement WebRTC in their own Minecraft launchers.
        </TipAlert>
        
        <h4 className="text-xl font-semibold mt-6">Protocol Details and Basic Concepts</h4>
        
        <p>The protocol consists primarily of the following parts:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>How to establish a peer-to-peer connection between users.</li>
          <li>The protocol format for communication between users after a peer-to-peer connection has been established.</li>
          <li>How to allow Minecraft to connect through a DataChannel.</li>
        </ul>
        
        <p>Here's a brief introduction to the concepts that appear in WebRTC and what they represent:</p>
        
        <h5 className="text-lg font-semibold mt-4">PeerConnection</h5>
        <p>PeerConnection represents the connection established with other users.</p>
        
        <h5 className="text-lg font-semibold mt-4">DataChannel</h5>
        <p>DataChannel represents the data communication channel established with other users in a PeerConnection, similar to a Socket. A PeerConnection can have many DataChannels used for different types of communication. DataChannels can be created/closed arbitrarily after a PeerConnection has been successfully established.</p>
        <p>When creating a DataChannel, the protocol (protocol) can be specified. The remote listener can handle different DataChannel creations based on protocol.</p>
        
        <h5 className="text-lg font-semibold mt-4">Description</h5>
        <p>The Description is a string created by PeerConnection to describe the local network information. This string contains some information required for hole punching (since WebRTC fundamentally still requires hole punching).</p>
        <p>Developers need not fully understand the contents of this string; they simply need to transmit it correctly to the other side via the signaling server.</p>
        
        <h5 className="text-lg font-semibold mt-4">ICEServer</h5>
        <p>ICEServer is divided into two types: STUN and TURN.</p>
        <p>WebRTC needs to obtain local network information from an STUN server in order to punch holes.</p>
        <p>Many STUN servers are free, such as stun:stun.qq.com used by QQ.</p>
        <p>A TURN server is responsible for relaying traffic. It is usually self-deployed and requires payment.</p>
        
        <ImportantAlert>
          For production environments, consider using both STUN and TURN servers to ensure reliable connections.
        </ImportantAlert>
        
        <p className="text-sm text-white/50 mt-4">Last updated: 17.03.2025, 07:50</p>
      </section>

      <Separator className="my-8 bg-white/10" />
      
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold">Global Settings</h3>
        <Badge className="bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 mb-4">Under Construction</Badge>
        
        <p>Global data is stored in xmcl data directory.</p>
        <CodeBlock>
{`xmcl data directory
└─ setting.json # user configuration file`}
        </CodeBlock>
        
        <h4 className="text-xl font-semibold mt-6">Global Settings JSON Format</h4>
        <CodeBlock>
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
        
        <p className="text-sm text-white/50 mt-2">Last updated: 17.03.2025, 07:50</p>
      </section>
    </div>
  );
}
