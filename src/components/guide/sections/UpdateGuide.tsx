
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "../CodeBlock";

export function UpdateGuide() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-6">Update Guide</h2>
      <Badge className="bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 mb-6">Under Construction</Badge>
      
      <p>Because the launcher is still in the beta stage, data backup is particularly important... Here we will introduce how to solve problems encountered during updates and how to backup if you want to reinstall.</p>
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold">APPX update requires reinstallation</h3>
        <p>Because the old version launcher of the APPX format has expired certificates, when upgrading from the old version to the new version, it will require uninstalling the old version. In this case, please backup your XMCL data folder.</p>
        
        <p>Suppose foo is your username:</p>
        
        <Tabs defaultValue="appx" className="w-full mb-6">
          <TabsList>
            <TabsTrigger value="appx">Windows (APPX)</TabsTrigger>
          </TabsList>
          <TabsContent value="appx" className="p-4 bg-black/30 rounded-lg">
            <CodeBlock>%LocalAppData%\Packages\XMCL_ncdvebj03zfcm\LocalCache\Roaming\xmcl</CodeBlock>
          </TabsContent>
        </Tabs>
        
        <p>You can copy it out and put it on the desktop. After reinstallation, the new version of XMCL should have the following file path:</p>
        
        <Tabs defaultValue="appx" className="w-full mb-6">
          <TabsList>
            <TabsTrigger value="appx">Windows (APPX)</TabsTrigger>
          </TabsList>
          <TabsContent value="appx" className="p-4 bg-black/30 rounded-lg">
            <CodeBlock>%LocalAppData%\Packages\XMCL_68mcaawk44tpj\LocalCache\Roaming\xmcl</CodeBlock>
          </TabsContent>
        </Tabs>
        
        <p>Just put your backup files back in.</p>
      </section>

      <Separator className="my-8 bg-white/10" />
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold">APPX update failed</h3>
        <p>The APPX update should also open a folder, where there is a downloaded xmcl.appinstaller file. You can manually double-click this file to install the update.</p>
      </section>

      <Separator className="my-8 bg-white/10" />
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Other updates require reinstallation</h3>
        <p>This situation does not actually require backup, because only APPX will clear XMCL's data files. Of course, you can back up if you want to, and the data files will be located in the following locations:</p>
        
        <Tabs defaultValue="windows" className="w-full mb-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="windows">Windows</TabsTrigger>
            <TabsTrigger value="macos">macOS</TabsTrigger>
            <TabsTrigger value="linux">Linux</TabsTrigger>
          </TabsList>
          <TabsContent value="windows" className="p-4 bg-black/30 rounded-lg">
            <CodeBlock>%AppData%\xmcl</CodeBlock>
          </TabsContent>
          <TabsContent value="macos" className="p-4 bg-black/30 rounded-lg">
            <p>Standard macOS Application Support directory.</p>
          </TabsContent>
          <TabsContent value="linux" className="p-4 bg-black/30 rounded-lg">
            <p>Standard Linux data directory.</p>
          </TabsContent>
        </Tabs>
      </section>

      <Separator className="my-8 bg-white/10" />
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Other version updates failed</h3>
        <p className="text-xl italic">Just redownload it...</p>
      </section>
    </div>
  );
}
