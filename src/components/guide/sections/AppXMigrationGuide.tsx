
import React from "react";
import { Separator } from "@/components/ui/separator";
import { TipAlert, ImportantAlert } from "../GuideAlerts";
import { CodeBlock } from "../CodeBlock";

export function AppXMigrationGuide() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-6">AppX Migration</h2>
      <p>This page will guide you how to migrate your data from appx installation to zip installation.</p>
      <p>The idea is simple: just copying the AppData xmcl folder for AppX app to common AppData location.</p>
      
      <ImportantAlert>
        DO NOT delete the AppX version app in the migration process.
      </ImportantAlert>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Find your AppX data</h3>
        <p>Go to the following path to find your AppX data</p>
        
        <CodeBlock>
          # Version &lt; 0.34
          %LocalAppData%\Packages\XMCL_ncdvebj03zfcm\LocalCache\Roaming\xmcl
          # Version &gt;= 0.34 and &lt; 0.40
          %LocalAppData%\Packages\XMCL_68mcaawk44tpj\LocalCache\Roaming\xmcl
        </CodeBlock>
        
        <TipAlert>
          Use the input box (for routing) in the File Explorer to navigate to the path mentioned above.
        </TipAlert>
      </section>

      <Separator className="my-8 bg-white/10" />

      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Copy the data to common AppData</h3>
        <p>Copy the entire xmcl folder in the previous step to</p>
        
        <CodeBlock>
          %AppData%\xmcl
        </CodeBlock>
      </section>

      <Separator className="my-8 bg-white/10" />

      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Start the new XMCL and delete the old one</h3>
        <p>After copying the data, you can start the new XMCL from zip.</p>
        <p>Once you have confirmed that the new XMCL works properly, you can delete the old XMCL app.</p>
        
        <TipAlert>
          Deleting AppX app will automatically remove the old data, so you don't need to worry about the data left behind.
        </TipAlert>
      </section>
    </div>
  );
}
