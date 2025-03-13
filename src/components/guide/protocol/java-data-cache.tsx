import { HardDrive, File, Folder } from "lucide-react";
import { UnderConstructionBadge } from "../GuideBages";
import { CodeBlock } from "../CodeBlock";

export function JavaDataCacheProtocol() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Java Data Cache</h2>
        <UnderConstructionBadge></UnderConstructionBadge>
      </div>

      <p className="mb-4">
        XMCL caches all found java in a JSON file, which is saved in the xmcl
        data directory.
      </p>

      <div className="bg-white/5 p-4 rounded-lg border border-white/10 my-6">
        <div className="flex items-center gap-2 mb-2">
          <HardDrive className="w-5 h-5 text-blue-400" />
          <span className="font-medium">xmcl data directory</span>
        </div>
        <div className="ml-6 flex items-center gap-2">
          └─
          <File className="w-5 h-5 text-amber-400" />
          <span>
            java.json <span className="text-gray-400"># java cache file</span>
          </span>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mt-8 mb-4">
        Java Cache JSON Format
      </h3>

      <CodeBlock language="json">
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
    </div>
  );
}
