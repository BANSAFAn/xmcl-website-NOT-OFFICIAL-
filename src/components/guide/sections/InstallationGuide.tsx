
import React from "react";
import { Separator } from "@/components/ui/separator";
import { GoodNewsAlert, NoteAlert } from "../GuideAlerts";

export function InstallationGuide() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-6">Installation Guide</h2>
      <p>The launcher provides multiple installation formats, some of which are less common. Here we will focus on introducing the less common or special format features.</p>
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold">APPX</h3>
        <p>APPX is an installation package format provided by Windows 10 that allows programs to run in a virtualized/sandboxed environment. Programs installed through APPX will all run in the Windows sandbox.</p>
        
        <p>The biggest benefit for users is that the application's cache files, registry modifications, and other operations will be isolated - when you uninstall the application, the cache and registry modifications will be deleted together.</p>
        
        <GoodNewsAlert>
          Don't worry about the program messing around in the registry, although XMCL's only registry addition may be file extension association.
        </GoodNewsAlert>
        
        <p>AppX is updated through the appinstaller mechanism. According to the automatic update strategy built into appinstaller, XMCL checks for updates when the user launches the application, and if there is an update, it will update on the next launch.</p>
        
        <GoodNewsAlert>
          APPX's automatic updates support Windows' optimization delivery and incremental updates - only updating changed content.
        </GoodNewsAlert>
      </section>

      <Separator className="my-8 bg-white/10" />
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Online installation (appinstaller)</h3>
        <p>appinstaller is essentially the same as the APPX format. appinstaller itself is an XML text file that contains the URL of the APPX. When the installation interface pops up, it will attempt to download the APPX and install it. Therefore, its update mechanism is the same as APPX.</p>
      </section>

      <Separator className="my-8 bg-white/10" />
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold">AppImage</h3>
        <p>AppImage is a Linux application format that can run on any Linux desktop without installation. The AppImage file is executable, just double-click or run from the terminal.</p>
        
        <p>This is the only non-installation program that XMCL provides (actually don't want to support it). Therefore, its update mechanism is different from other formats, and users need to download a new AppImage on their own to update.</p>
      </section>

      <Separator className="my-8 bg-white/10" />
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Other formats</h3>
        <p>Currently, other installation formats either support [hot updates] or support the update method provided by electron-builder. This update mode generally does not require too much attention (if you can't update, you can just download the launcher again).</p>
        
        <h4 className="text-xl font-semibold text-amber-300 mt-6">Hot update</h4>
        <p>Hot update means that the launcher replaces the core asar file (~30mb) on its own, without the need for a complete re-download of the launcher.</p>
      </section>

      <Separator className="my-8 bg-white/10" />
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Appendix: Choosing the Game Data Directory</h3>
        <p>During the initial installation, users need to choose the Game Data Directory. XMCL will place downloaded assets, libraries, versions, etc. in this directory.</p>
        
        <NoteAlert>
          As mentioned on the setup page, due to the special file structure of XMCL, it is not recommended to use the raw Minecraft game directory as XMCL's data directory.
          <br /><br />
          Here, it is recommended to choose a new folder as XMCL's Game Data Directory.
        </NoteAlert>
        
        <p>For more information about the structure of the game data directory, please see the Data Management Guide.</p>
      </section>
    </div>
  );
}
