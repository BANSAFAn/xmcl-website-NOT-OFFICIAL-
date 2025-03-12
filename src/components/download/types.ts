import { ReactNode } from "react";

export interface DownloadOption {
  id: string;
  title: string;
  subtitle: string;
  description?: string; // Added description field for package information
  icon: ReactNode;
  disabled: boolean;
  onClick: () => void;
  colorClass?: string;
  isComingSoon?: boolean;
  size?: string;
  link?: string;
}

export interface WindowsAssets {
  zip64?: { url: string; size: string };
  zip32?: { url: string; size: string };
  app?: { url: string; size: string };
  appx?: { url: string; size: string };
}

export interface MacOSAssets {
  arm64?: { url: string; size: string };
  intel?: { url: string; size: string };
}

export interface LinuxAssets {
  appimage?: { url: string; size: string };
  tarball?: { url: string; size: string };
  arm64?: { url: string; size: string };
  rpm?: { url: string; size: string };
  deb?: { url: string; size: string };
}

// Define default translations for download-specific terms that might not be in the main translations
export interface DownloadTranslations {
  portable: string;
  portableDescription: string;
  zip64: string;
  zip32: string;
  zipDescription: string;
  appx: string;
  appxDescription: string;
}

// Extended interface for any additional translations needed in this component
export interface ExtendedTranslations {
  portable?: string;
  portableDescription?: string;
  zip64?: string;
  zip32?: string;
  zipDescription?: string;
  appx?: string;
  appxDescription?: string;
}
