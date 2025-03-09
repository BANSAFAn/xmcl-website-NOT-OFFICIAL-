
import { WindowsAssets } from './types';

// Use import.meta.env instead of process.env for Vite projects
export const windowsAssets: WindowsAssets = {
  zip64: import.meta.env.VITE_WINDOWS_ZIP64_URL ? { url: import.meta.env.VITE_WINDOWS_ZIP64_URL, size: 'Unknown' } : undefined,
  zip32: import.meta.env.VITE_WINDOWS_ZIP32_URL ? { url: import.meta.env.VITE_WINDOWS_ZIP32_URL, size: 'Unknown' } : undefined,
  appx: import.meta.env.VITE_WINDOWS_APPX_URL ? { url: import.meta.env.VITE_WINDOWS_APPX_URL, size: 'Unknown' } : undefined,
  app: import.meta.env.VITE_WINDOWS_APP_URL ? { url: import.meta.env.VITE_WINDOWS_APP_URL, size: 'Unknown' } : undefined,
};
