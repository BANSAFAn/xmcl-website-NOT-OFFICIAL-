
import { AssetInfo, WindowsAssets } from './types';

export const defaultAssets = {
  windows: {
    app: { name: "Windows App", url: null, size: "58 MB" } as AssetInfo,
    zip64: { name: "Windows 64-bit", url: null, size: "62 MB" } as AssetInfo,
    zip32: { name: "Windows 32-bit", url: null, size: "60 MB" } as AssetInfo,
    appx: { name: "Windows Store", url: null, size: "61 MB" } as AssetInfo
  },
  linux: {
    appimage: { name: "Linux AppImage", url: null, size: "70 MB" } as AssetInfo,
    deb: { name: "Debian/Ubuntu", url: null, size: "68 MB" } as AssetInfo,
    rpm: { name: "Fedora/RHEL", url: null, size: "69 MB" } as AssetInfo,
    arm64: { name: "Linux ARM64", url: null, size: "65 MB" } as AssetInfo
  },
  macos: {
    arm64: { name: "macOS Apple Silicon", url: null, size: "75 MB" } as AssetInfo,
    intel: { name: "macOS Intel", url: null, size: "76 MB" } as AssetInfo
  }
};

export const windowsAssets: WindowsAssets = {
  zip64: import.meta.env.VITE_WINDOWS_ZIP64_URL ? { url: import.meta.env.VITE_WINDOWS_ZIP64_URL, size: 'Unknown', name: 'Windows 64-bit' } : undefined,
  zip32: import.meta.env.VITE_WINDOWS_ZIP32_URL ? { url: import.meta.env.VITE_WINDOWS_ZIP32_URL, size: 'Unknown', name: 'Windows 32-bit' } : undefined,
  appx: import.meta.env.VITE_WINDOWS_APPX_URL ? { url: import.meta.env.VITE_WINDOWS_APPX_URL, size: 'Unknown', name: 'Windows Store' } : undefined,
  app: import.meta.env.VITE_WINDOWS_APP_URL ? { url: import.meta.env.VITE_WINDOWS_APP_URL, size: 'Unknown', name: 'Windows App' } : undefined,
};
