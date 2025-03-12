import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { GoodNewsAlert, NoteAlert } from "../GuideAlerts";
import { UnderConstructionBadge } from "../GuideBages";

export function InstallationGuide() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">
          Installation Guide
        </h2>
        <UnderConstructionBadge></UnderConstructionBadge>
      </div>

      <p className="mb-8">
        The launcher provides multiple installation formats, some of which are
        less common. Here we will focus on introducing the less common or
        special format features.
      </p>

      <Card className="mb-8 border border-white/10 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Windows Installation Formats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2">APPX</h3>
            <p>
              APPX is an installation package format provided by Windows 10 that
              allows programs to run in a virtualized/sandboxed environment.
              Programs installed through APPX will all run in the Windows
              sandbox.
            </p>

            <p className="mt-2">
              The biggest benefit for users is that the application's cache
              files, registry modifications, and other operations will be
              isolated - when you uninstall the application, the cache and
              registry modifications will be deleted together.
            </p>

            <div className="mt-4">
              <GoodNewsAlert>
                Don't worry about the program messing around in the registry,
                although XMCL's only registry addition may be file extension
                association.
              </GoodNewsAlert>
            </div>

            <p className="mt-4">
              AppX is updated through the appinstaller mechanism. According to
              the automatic update strategy built into appinstaller, XMCL checks
              for updates when the user launches the application, and if there
              is an update, it will update on the next launch.
            </p>

            <div className="mt-4">
              <GoodNewsAlert>
                APPX's automatic updates support Windows' optimization delivery
                and incremental updates - only updating changed content.
              </GoodNewsAlert>
            </div>
          </div>

          <Separator className="my-4 bg-white/10" />

          <div>
            <h3 className="text-xl font-bold mb-2">
              Online installation (appinstaller)
            </h3>
            <p>
              appinstaller is essentially the same as the APPX format.
              appinstaller itself is an XML text file that contains the URL of
              the APPX. When the installation interface pops up, it will attempt
              to download the APPX and install it. Therefore, its update
              mechanism is the same as APPX.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border border-white/10 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Linux Installation Formats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-xl font-bold mb-2">AppImage</h3>
            <p>
              AppImage is a portable Linux application format that runs on
              virtually any Linux distribution without installation. Simply make
              the file executable and run it with a double-click or via
              terminal.
            </p>

            <p className="mt-2">
              Unlike other formats, AppImage is the only portable option XMCL
              offers. This means its update process differs from other
              installation methods - users must manually download the newest
              AppImage version when updates are available.
            </p>
          </div>

          <Separator className="my-4 bg-white/10" />

          <div>
            <h3 className="text-xl font-bold mb-2">
              Package-Based Installations
            </h3>
            <p>XMCL is available in several native Linux package formats:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <strong>DEB packages</strong> - Compatible with Debian-derived
                distributions including Ubuntu, Linux Mint, Pop!_OS, and
                elementary OS
              </li>
              <li>
                <strong>RPM packages</strong> - For Red Hat-based systems such
                as Fedora, CentOS, and RHEL
              </li>
              <li>
                <strong>AUR package</strong> - Arch Linux users can install via
                the AUR using the package name{" "}
                <code>
                  <a
                    href="https://aur.archlinux.org/packages/xmcl-launcher"
                    className="underline"
                  >
                    xmcl-launcher
                  </a>
                </code>
              </li>
              <li>
                <strong>Flatpak</strong> - Currently available only through{" "}
                <a
                  href="https://github.com/v1mkss/io.github.voxelum.xmcl/releases/latest"
                  className="underline"
                >
                  GitHub Releases
                </a>
              </li>
            </ul>
            <p className="mt-3">
              These package-based installations integrate better with your
              system and can receive updates through your distribution's package
              management system.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border border-white/10 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Other Formats and Update Mechanisms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Currently, other installation formats either support hot updates or
            support the update method provided by electron-builder. This update
            mode generally does not require too much attention (if you can't
            update, you can just download the launcher again).
          </p>

          <div className="mt-6 p-4 bg-amber-500/10 rounded-lg border border-amber-300/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-300 mt-0.5" />
              <div>
                <strong className="text-amber-300">Hot update</strong>
                <p className="mt-1">
                  Hot update means that the launcher replaces the core asar file
                  (~30mb) on its own, without the need for a complete
                  re-download of the launcher.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-white/10 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Choosing the Game Data Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            During the initial installation, users need to choose the Game Data
            Directory. XMCL will place downloaded assets, libraries, versions,
            etc. in this directory.
          </p>

          <div className="mt-4">
            <NoteAlert>
              As mentioned on the setup page, due to the special file structure
              of XMCL, it is not recommended to use the raw Minecraft game
              directory as XMCL's data directory.
              <br />
              <br />
              Here, it is recommended to choose a new folder as XMCL's Game Data
              Directory.
            </NoteAlert>
          </div>

          <p className="mt-4">
            For more information about the structure of the game data directory,
            please see the Data Management Guide.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
