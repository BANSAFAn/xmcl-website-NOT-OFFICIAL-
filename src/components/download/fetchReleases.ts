import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { AssetInfo, WindowsAssets, MacOSAssets, LinuxAssets } from "./types";
import { defaultAssets } from './assetUrls';

const GITHUB_REPO_URL = 'https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases/latest';

export type ReleaseAsset = {
  name: string;
  browser_download_url: string;
  content_type: string;
  size: number;
};

export type Release = {
  tag_name: string;
  name: string;
  published_at: string;
  assets: ReleaseAsset[];
};

// Define specific asset types for different OS
export type ReleaseAssets = WindowsAssets | MacOSAssets | LinuxAssets;

// Function to format file size from bytes to human-readable format
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Function to fetch the latest release from GitHub
export const fetchLatestRelease = async (): Promise<Release> => {
  const response = await fetch(GITHUB_REPO_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Mock data for releases - this will be used if API call fails
export const mockReleaseData: Record<string, ReleaseAssets> = {
  windows: {
    zip64: { name: "Windows 64-bit", url: "#", size: "64.2 MB" },
    zip32: { name: "Windows 32-bit", url: "#", size: "60.5 MB" },
    appx: { name: "Windows Store", url: "#", size: "67.1 MB" },
    app: { name: "Windows App", url: "#", size: "63.9 MB" },
  },
  macos: {
    arm64: { name: "macOS Apple Silicon", url: "#", size: "75.3 MB" },
    intel: { name: "macOS Intel", url: "#", size: "76.8 MB" },
  },
  linux: {
    appimage: { name: "Linux AppImage", url: "#", size: "70.1 MB" },
    tarball: { name: "Linux Tarball", url: "#", size: "68.5 MB" },
    arm64: { name: "Linux ARM64", url: "#", size: "67.8 MB" },
    rpm: { name: "Fedora/RHEL", url: "#", size: "69.2 MB" },
    deb: { name: "Debian/Ubuntu", url: "#", size: "65.7 MB" },
  },
};

// Process Windows assets
const processWindowsAssets = (assets: ReleaseAsset[]): WindowsAssets => {
  const result: WindowsAssets = {};
  
  // Find the Windows app
  const appAsset = assets.find(a => a.name.endsWith('.exe'));
  if (appAsset) {
    result.app = {
      name: "Windows App",
      url: appAsset.browser_download_url,
      size: formatFileSize(appAsset.size)
    };
  }
  
  // Find the Windows Store package
  const appxAsset = assets.find(a => a.name.endsWith('.appx') || a.name.includes('msix'));
  if (appxAsset) {
    result.appx = {
      name: "Windows Store",
      url: appxAsset.browser_download_url,
      size: formatFileSize(appxAsset.size)
    };
  }
  
  // Find the 64-bit zip
  const zip64Asset = assets.find(a => 
    a.name.includes('win') && 
    a.name.includes('x64') && 
    a.name.endsWith('.zip')
  );
  if (zip64Asset) {
    result.zip64 = {
      name: "Windows 64-bit",
      url: zip64Asset.browser_download_url,
      size: formatFileSize(zip64Asset.size)
    };
  }
  
  // Find the 32-bit zip
  const zip32Asset = assets.find(a => 
    a.name.includes('win') && 
    (a.name.includes('x86') || a.name.includes('ia32')) && 
    a.name.endsWith('.zip')
  );
  if (zip32Asset) {
    result.zip32 = {
      name: "Windows 32-bit",
      url: zip32Asset.browser_download_url,
      size: formatFileSize(zip32Asset.size)
    };
  }
  
  return result;
};

// Process Linux assets
const processLinuxAssets = (assets: ReleaseAsset[]): LinuxAssets => {
  const result: LinuxAssets = {};
  
  // Find the AppImage
  const appImageAsset = assets.find(a => a.name.endsWith('.AppImage') && !a.name.endsWith('.sha256'));
  if (appImageAsset) {
    result.appimage = {
      name: "Linux AppImage",
      url: appImageAsset.browser_download_url,
      size: formatFileSize(appImageAsset.size)
    };
  }
  
  // Find the tarball
  const tarballAsset = assets.find(a => 
    (a.name.endsWith('.tar.gz') || a.name.includes('.tgz')) && 
    !a.name.endsWith('.sha256')
  );
  if (tarballAsset) {
    result.tarball = {
      name: "Linux Tarball",
      url: tarballAsset.browser_download_url,
      size: formatFileSize(tarballAsset.size)
    };
  }
  
  // Find the .deb package
  const debAsset = assets.find(a => a.name.endsWith('.deb') && !a.name.endsWith('.sha256'));
  if (debAsset) {
    result.deb = {
      name: "Debian/Ubuntu",
      url: debAsset.browser_download_url,
      size: formatFileSize(debAsset.size)
    };
  }
  
  // Find the .rpm package
  const rpmAsset = assets.find(a => a.name.endsWith('.rpm') && !a.name.endsWith('.sha256'));
  if (rpmAsset) {
    result.rpm = {
      name: "Fedora/RHEL",
      url: rpmAsset.browser_download_url,
      size: formatFileSize(rpmAsset.size)
    };
  }
  
  // Find the ARM64 package
  const arm64Asset = assets.find(a => 
    (a.name.includes('arm64') || a.name.includes('aarch64')) && 
    !a.name.endsWith('.sha256')
  );
  if (arm64Asset) {
    result.arm64 = {
      name: "Linux ARM64",
      url: arm64Asset.browser_download_url,
      size: formatFileSize(arm64Asset.size)
    };
  }
  
  return result;
};

// Process macOS assets
const processMacOSAssets = (assets: ReleaseAsset[]): MacOSAssets => {
  const result: MacOSAssets = {};
  
  // Find the ARM64 (Apple Silicon) dmg
  const arm64Asset = assets.find(a => 
    a.name.endsWith('.dmg') && 
    a.name.includes('arm64') && 
    !a.name.endsWith('.sha256')
  );
  if (arm64Asset) {
    result.arm64 = {
      name: "macOS Apple Silicon",
      url: arm64Asset.browser_download_url,
      size: formatFileSize(arm64Asset.size)
    };
  }
  
  // Find the Intel dmg
  const intelAsset = assets.find(a => 
    a.name.endsWith('.dmg') && 
    (a.name.includes('x64') || a.name.includes('intel')) && 
    !a.name.endsWith('.sha256')
  );
  if (intelAsset) {
    result.intel = {
      name: "macOS Intel",
      url: intelAsset.browser_download_url,
      size: formatFileSize(intelAsset.size)
    };
  }
  
  return result;
};

// Custom hook to fetch the latest release
export function useLatestRelease() {
  return useQuery({
    queryKey: ['latestRelease'],
    queryFn: fetchLatestRelease,
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: 3,
    refetchOnWindowFocus: false,
  });
}

// Custom hook to get assets for a specific OS
export function useOSAssets(os: string) {
  const { data: release, isLoading, error } = useLatestRelease();
  const [assets, setAssets] = useState<WindowsAssets | LinuxAssets | MacOSAssets | null>(null);
  
  useEffect(() => {
    if (release) {
      const assetsData = release.assets;
      
      switch (os) {
        case 'windows':
          setAssets(processWindowsAssets(assetsData));
          break;
        case 'linux':
          setAssets(processLinuxAssets(assetsData));
          break;
        case 'macos':
          setAssets(processMacOSAssets(assetsData));
          break;
        default:
          setAssets(null);
      }
    }
  }, [release, os]);
  
  // If we have no assets or are still loading, use the mock data
  const isEmpty = !assets || Object.keys(assets).length === 0;
  const finalAssets = isEmpty && !isLoading 
    ? mockReleaseData[os as keyof typeof mockReleaseData] || {}
    : assets;
    
  return { 
    assets: finalAssets, 
    isLoading, 
    error 
  };
}