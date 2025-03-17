import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AssetInfo, WindowsAssets, LinuxAssets, MacOSAssets } from './types';
import { defaultAssets } from './assetUrls';

const GITHUB_REPO_URL = 'https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases/latest';

// Function to fetch the latest release from GitHub
const fetchLatestRelease = async () => {
  const response = await fetch(GITHUB_REPO_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Custom hook to fetch the latest release
export function useLatestRelease() {
  return useQuery({
    queryKey: ['latestRelease'],
    queryFn: fetchLatestRelease,
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: 3, // Retry a few times
  });
}

// Custom hook to get assets for a specific OS
export function useOSAssets(os: string) {
  const { data, isLoading, error } = useLatestRelease();
  const [assets, setAssets] = useState<WindowsAssets | LinuxAssets | MacOSAssets | null>(null);
  
  useEffect(() => {
    if (data) {
      const assetsData = data.assets;
      
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
  }, [data, os]);
  
  return { assets, isLoading, error };
}

// Function to format file size from bytes to human-readable format
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Update the asset creation functions to include the name property
const processWindowsAssets = (assets: any[]): WindowsAssets => {
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
  const appxAsset = assets.find(a => a.name.endsWith('.appx') || a.name.endsWith('.msix'));
  if (appxAsset) {
    result.appx = {
      name: "Windows Store",
      url: appxAsset.browser_download_url,
      size: formatFileSize(appxAsset.size)
    };
  }
  
  // Find the 64-bit zip
  const zip64Asset = assets.find(a => a.name.includes('win32-x64') && a.name.endsWith('.zip'));
  if (zip64Asset) {
    result.zip64 = {
      name: "Windows 64-bit",
      url: zip64Asset.browser_download_url,
      size: formatFileSize(zip64Asset.size)
    };
  }
  
  // Find the 32-bit zip
  const zip32Asset = assets.find(a => a.name.includes('win32-ia32') && a.name.endsWith('.zip'));
  if (zip32Asset) {
    result.zip32 = {
      name: "Windows 32-bit",
      url: zip32Asset.browser_download_url,
      size: formatFileSize(zip32Asset.size)
    };
  }
  
  return result;
};

const processLinuxAssets = (assets: any[]): LinuxAssets => {
  const result: LinuxAssets = {};
  
  // Find the AppImage
  const appImageAsset = assets.find(a => a.name.endsWith('.AppImage'));
  if (appImageAsset) {
    result.appimage = {
      name: "Linux AppImage",
      url: appImageAsset.browser_download_url,
      size: formatFileSize(appImageAsset.size)
    };
  }
  
  // Find the .deb package
  const debAsset = assets.find(a => a.name.endsWith('.deb'));
  if (debAsset) {
    result.deb = {
      name: "Debian/Ubuntu",
      url: debAsset.browser_download_url,
      size: formatFileSize(debAsset.size)
    };
  }
  
  // Find the .rpm package
  const rpmAsset = assets.find(a => a.name.endsWith('.rpm'));
  if (rpmAsset) {
    result.rpm = {
      name: "Fedora/RHEL",
      url: rpmAsset.browser_download_url,
      size: formatFileSize(rpmAsset.size)
    };
  }
  
  // Find the ARM64 package
  const arm64Asset = assets.find(a => a.name.includes('arm64') || a.name.includes('aarch64'));
  if (arm64Asset) {
    result.arm64 = {
      name: "Linux ARM64",
      url: arm64Asset.browser_download_url,
      size: formatFileSize(arm64Asset.size)
    };
  }
  
  return result;
};

const processMacOSAssets = (assets: any[]): MacOSAssets => {
  const result: MacOSAssets = {};
  
  // Find the ARM64 (Apple Silicon) dmg
  const arm64Asset = assets.find(a => (a.name.includes('arm64') || a.name.includes('aarch64')) && a.name.endsWith('.dmg'));
  if (arm64Asset) {
    result.arm64 = {
      name: "macOS Apple Silicon",
      url: arm64Asset.browser_download_url,
      size: formatFileSize(arm64Asset.size)
    };
  }
  
  // Find the Intel dmg
  const intelAsset = assets.find(a => a.name.includes('darwin') && !a.name.includes('arm64') && a.name.endsWith('.dmg'));
  if (intelAsset) {
    result.intel = {
      name: "macOS Intel",
      url: intelAsset.browser_download_url,
      size: formatFileSize(intelAsset.size)
    };
  }
  
  return result;
};
