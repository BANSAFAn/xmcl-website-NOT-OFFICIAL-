import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { CodeBlock } from "../CodeBlock";

export function UpdateGuide() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Update Guide</h2>
        <Badge
          variant="outline"
          className="bg-amber-500/10 text-amber-300 border-amber-300/20"
        >
          Under Construction
        </Badge>
      </div>

      <p className="mb-8">
        Because the launcher is still in the beta stage, data backup is
        particularly important... Here we will introduce how to solve problems
        encountered during updates and how to backup if you want to reinstall.
      </p>

      <Card className="mb-8 border border-white/10 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            APPX update requires reinstallation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Because the old version launcher of the APPX format has expired
            certificates, when upgrading from the old version to the new
            version, it will require uninstalling the old version. In this case,
            please backup your XMCL data folder.
          </p>

          <p>Suppose foo is your username:</p>

          <Tabs defaultValue="appx" className="w-full mb-6">
            <TabsList className="rounded-lg bg-slate-800/50">
              <TabsTrigger value="appx" className="rounded-md">
                Windows (APPX)
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="appx"
              className="p-4 bg-black/30 rounded-lg mt-2"
            >
              <CodeBlock>
                %LocalAppData%\Packages\XMCL_ncdvebj03zfcm\LocalCache\Roaming\xmcl
              </CodeBlock>
            </TabsContent>
          </Tabs>

          <p>
            You can copy it out and put it on the desktop. After reinstallation,
            the new version of XMCL should have the following file path:
          </p>

          <Tabs defaultValue="appx" className="w-full mb-6">
            <TabsList className="rounded-lg bg-slate-800/50">
              <TabsTrigger value="appx" className="rounded-md">
                Windows (APPX)
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="appx"
              className="p-4 bg-black/30 rounded-lg mt-2"
            >
              <CodeBlock>
                %LocalAppData%\Packages\XMCL_68mcaawk44tpj\LocalCache\Roaming\xmcl
              </CodeBlock>
            </TabsContent>
          </Tabs>

          <p>Just put your backup files back in.</p>
        </CardContent>
      </Card>

      <Card className="mb-8 border border-white/10 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            APPX update failed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            The APPX update should also open a folder, where there is a
            downloaded xmcl.appinstaller file. You can manually double-click
            this file to install the update.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8 border border-white/10 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Other updates require reinstallation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            This situation does not actually require backup, because only APPX
            will clear XMCL's data files. Of course, you can back up if you want
            to, and the data files will be located in the following locations:
          </p>

          <Tabs defaultValue="windows" className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-3 rounded-lg bg-slate-800/50">
              <TabsTrigger value="windows" className="rounded-md">
                Windows
              </TabsTrigger>
              <TabsTrigger value="macos" className="rounded-md">
                macOS
              </TabsTrigger>
              <TabsTrigger value="linux" className="rounded-md">
                Linux
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="windows"
              className="p-4 bg-black/30 rounded-lg mt-2"
            >
              <CodeBlock>%AppData%\xmcl</CodeBlock>
            </TabsContent>
            <TabsContent
              value="macos"
              className="p-4 bg-black/30 rounded-lg mt-2"
            >
              <p>Standard macOS Application Support directory.</p>
            </TabsContent>
            <TabsContent
              value="linux"
              className="p-4 bg-black/30 rounded-lg mt-2"
            >
              <p>Standard Linux data directory.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="border border-white/10 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Other version updates failed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center p-4 bg-amber-500/10 rounded-lg border border-amber-300/20">
            <AlertCircle className="h-5 w-5 text-amber-300 mr-3" />
            <p className="text-lg">Just redownload it...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
