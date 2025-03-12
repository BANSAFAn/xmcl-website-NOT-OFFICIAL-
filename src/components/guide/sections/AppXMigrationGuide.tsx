import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { CodeBlock } from "../CodeBlock";
import { UnderConstructionBadge } from "../GuideBages";

export function AppXMigrationGuide() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">AppX Migration</h2>
        <UnderConstructionBadge></UnderConstructionBadge>
      </div>

      <p className="mb-4">
        This page will guide you how to migrate your data from appx installation
        to zip installation.
      </p>
      <p className="mb-6">
        The idea is simple: just copying the AppData xmcl folder for AppX app to
        common AppData location.
      </p>

      <div className="flex items-start gap-3 p-4 mb-8 bg-red-500/10 rounded-lg border border-red-300/20">
        <AlertCircle className="h-5 w-5 text-red-300 mt-0.5" />
        <div>
          <strong className="text-red-300">Important:</strong> DO NOT delete the
          AppX version app in the migration process.
        </div>
      </div>

      <Card className="mb-8 border border-white/10 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Find your AppX data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Go to the following path to find your AppX data</p>

          <CodeBlock>
            # Version &lt; 0.34
            %LocalAppData%\Packages\XMCL_ncdvebj03zfcm\LocalCache\Roaming\xmcl #
            Version &gt;= 0.34 and &lt; 0.40
            %LocalAppData%\Packages\XMCL_68mcaawk44tpj\LocalCache\Roaming\xmcl
          </CodeBlock>

          <div className="flex items-start gap-3 p-4 bg-blue-500/10 rounded-lg border border-blue-300/20">
            <AlertCircle className="h-5 w-5 text-blue-300 mt-0.5" />
            <div>
              <strong className="text-blue-300">Tip:</strong> Use the input box
              (for routing) in the File Explorer to navigate to the path
              mentioned above.
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border border-white/10 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Copy the data to common AppData
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Copy the entire xmcl folder in the previous step to</p>

          <CodeBlock>%AppData%\xmcl</CodeBlock>
        </CardContent>
      </Card>

      <Card className="border border-white/10 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Start the new XMCL and delete the old one
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>After copying the data, you can start the new XMCL from zip.</p>
          <p>
            Once you have confirmed that the new XMCL works properly, you can
            delete the old XMCL app.
          </p>

          <div className="flex items-start gap-3 p-4 bg-blue-500/10 rounded-lg border border-blue-300/20">
            <AlertCircle className="h-5 w-5 text-blue-300 mt-0.5" />
            <div>
              <strong className="text-blue-300">Tip:</strong> Deleting AppX app
              will automatically remove the old data, so you don't need to worry
              about the data left behind.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
