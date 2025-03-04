
import { useMemo } from "react";
import { formatFileSize, ReleaseAsset, Release } from "./fetchReleases";
import { colorMap } from "./colorMap";
import { 
  AppInstallerIcon, 
  AppXPackageIcon, 
  ZipIcon, 
  DMGIcon, 
  AppImageIcon, 
  DebIcon, 
  RPMIcon, 
  TarGzIcon, 
  DefaultDownloadIcon 
} from "./DownloadIcons";

type DownloadOption = {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
  size: string;
  colorClass: string;
};

export function useDownloadOptions(releaseData: Release | undefined, activeOS: string) {
  return useMemo(() => {
    if (!releaseData) return [];
    
    // Filter assets based on active OS and specific package types
    let filteredAssets: ReleaseAsset[] = [];
    
    if (activeOS === "windows") {
      // Only include: zip64, zip86, app, appx
      filteredAssets = releaseData.assets.filter(asset => 
        (asset.name.includes("win32-x64") && asset.name.endsWith(".zip")) || // zip64
        (asset.name.includes("win32-ia32") && asset.name.endsWith(".zip")) || // zip86
        asset.name.endsWith(".exe") || // app installer
        (asset.name.includes("setup") && asset.name.endsWith(".exe")) || // app
        asset.name.endsWith(".appx") // appx
      );
    } else if (activeOS === "macos") {
      // Only include: dmg
      filteredAssets = releaseData.assets.filter(asset => 
        asset.name.endsWith(".dmg")
      );
    } else if (activeOS === "linux") {
      // Only include: AppImage, Tar.gz, deb, rpm
      filteredAssets = releaseData.assets.filter(asset => 
        asset.name.endsWith(".AppImage") ||
        asset.name.endsWith(".tar.gz") ||
        asset.name.endsWith(".deb") ||
        asset.name.endsWith(".rpm")
      );
    }
    
    // Map assets to download options
    return filteredAssets.map(asset => {
      let title = "";
      let description = "";
      let icon = <DefaultDownloadIcon size={24} />;
      
      // Windows files
      if (asset.name.endsWith(".exe") && !asset.name.includes("setup")) {
        title = "App Installer";
        description = "Recommended for most users";
        icon = <AppInstallerIcon className="w-6 h-6" />;
      } else if (asset.name.includes("setup") && asset.name.endsWith(".exe")) {
        title = "App";
        description = "Alternative installer package";
        icon = <AppInstallerIcon className="w-6 h-6" />;
      } else if (asset.name.endsWith(".appx")) {
        title = "AppX Package";
        description = "For Windows Store users";
        icon = <AppXPackageIcon className="w-6 h-6" />;
      } else if (asset.name.includes("win32-x64") && asset.name.endsWith(".zip")) {
        title = "Zip (x64)";
        description = "Portable version 64-bit";
        icon = <ZipIcon className="w-6 h-6" />;
      } else if (asset.name.includes("win32-ia32") && asset.name.endsWith(".zip")) {
        title = "Zip (x86)";
        description = "For 32-bit systems";
        icon = <ZipIcon className="w-6 h-6" />;
      }
      
      // macOS files
      else if (asset.name.endsWith(".dmg")) {
        title = "DMG";
        description = "Recommended for most users";
        icon = <DMGIcon className="w-6 h-6" />;
      }
      
      // Linux files
      else if (asset.name.endsWith(".AppImage")) {
        title = "AppImage";
        description = "Universal Linux package";
        icon = <AppImageIcon className="w-6 h-6" />;
      } else if (asset.name.endsWith(".deb")) {
        title = "Deb";
        description = "For Debian-based distributions";
        icon = <DebIcon className="w-6 h-6" />;
      } else if (asset.name.endsWith(".rpm")) {
        title = "RPM";
        description = "For Red Hat-based distributions";
        icon = <RPMIcon className="w-6 h-6" />;
      } else if (asset.name.endsWith(".tar.gz")) {
        title = "Tar.gz";
        description = "Portable archive";
        icon = <TarGzIcon className="w-6 h-6" />;
      }
      
      return {
        title,
        description,
        icon,
        link: asset.browser_download_url,
        size: formatFileSize(asset.size),
        colorClass: colorMap[title] || "from-accent/20 to-accent/10"
      };
    });
  }, [releaseData, activeOS]);
}
