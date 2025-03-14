
export interface DownloadOption {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  disabled: boolean;
  colorClass?: string;
  isComingSoon?: boolean;
  size?: string;
  link?: string;
  onClick?: () => void;
}

export interface WindowsAssets {
  zip64?: { name: string; size: string; url: string };
  zip32?: { name: string; size: string; url: string };
  appx?: { name: string; size: string; url: string };
  app?: { name: string; size: string; url: string };
}

export interface MacOSAssets {
  universal?: { name: string; size: string; url: string };
  arm64?: { name: string; size: string; url: string };
  intel?: { name: string; size: string; url: string };
}

export interface LinuxAssets {
  appimage?: { name: string; size: string; url: string };
  deb?: { name: string; size: string; url: string };
  rpm?: { name: string; size: string; url: string };
  arm64?: { name: string; size: string; url: string };
}

export interface AssetInfo {
  name: string;
  size: string;
  url: string;
}

// Add DownloadTranslationsType definition
export interface DownloadTranslationsType {
  portable: string;
  portableDescription: string;
  zip64: string;
  zip32: string;
  zipDescription: string;
  appx: string;
  appxDescription: string;
}

// Add ExtendedTranslations type for the download options
export type ExtendedTranslations = {
  'windows.installer': string;
  'windows.appx': string;
  'windows.portable': string;
  'windows.zip64': string;
  'windows.zip32': string;
  'windows.app': string;
  'macos.universal': string;
  'macos.arm64': string;
  'macos.intel': string;
  'linux.appimage': string;
  'linux.flatpak': string;
  'linux.deb': string;
  'linux.rpm': string;
  'linux.arm64': string;
};
