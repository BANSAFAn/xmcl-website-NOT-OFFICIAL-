import { Archive, LayoutGrid } from "lucide-react";
import { DownloadOption } from './types';
import { WindowsAssets } from './types';
import { useOSAssets } from './fetchReleases';
import { ExtendedTranslations } from './types';

type RenderFunctionProps = {
  getTranslation: (key: keyof ExtendedTranslations) => string;
  setDownloadProgress: (progress: number) => void;
  setCurrentAsset: (asset: string | null) => void;
  setShowConfirmation: (show: boolean) => void;
};

export const renderWindowsOptions = ({
  getTranslation,
  setDownloadProgress,
  setCurrentAsset,
  setShowConfirmation
}: RenderFunctionProps): DownloadOption[] => {
  const { assets } = useOSAssets('windows');
  const windowsAssets = assets as WindowsAssets;

  const options: DownloadOption[] = [];
  
  if (windowsAssets?.zip64) {
    options.push({
      id: 'win_zip64',
      title: "Windows 64-bit ZIP",
      subtitle: "For most modern computers",
      description: "Portable ZIP package for 64-bit Windows systems. Recommended for most users as it requires no installation and can be run from any location. Best for Windows 10/11.",
      icon: <Archive size={24} />,
      disabled: false,
      colorClass: 'bg-white/5',
      isComingSoon: false,
      size: windowsAssets.zip64.size,
      link: windowsAssets.zip64.url,
      onClick: () => {
        setDownloadProgress(0);
        setCurrentAsset(windowsAssets.zip64?.url || '');
        setShowConfirmation(true);
      }
    });
  }
  
  if (windowsAssets?.zip32) {
    options.push({
      id: 'win_zip32',
      title: "Windows 32-bit ZIP",
      subtitle: "For older computers",
      description: "Legacy ZIP package for 32-bit Windows systems. Use this if you have an older computer or specifically need 32-bit compatibility. Compatible with Windows 7 and later.",
      icon: <Archive size={24} />,
      disabled: false,
      colorClass: 'bg-white/5',
      isComingSoon: false,
      size: windowsAssets.zip32.size,
      link: windowsAssets.zip32.url,
      onClick: () => {
        setDownloadProgress(0);
        setCurrentAsset(windowsAssets.zip32?.url || '');
        setShowConfirmation(true);
      }
    });
  }
  
  if (windowsAssets?.appx) {
    options.push({
      id: 'win_appx',
      title: "Windows Store Package",
      subtitle: "APPX/MSIX for Windows 10/11",
      description: "Official Windows Store package format. Provides automatic updates and better integration with Windows. Recommended for users who prefer Microsoft Store apps.",
      icon: <LayoutGrid size={24} />,
      disabled: false,
      colorClass: 'bg-white/5',
      isComingSoon: false,
      size: windowsAssets.appx.size,
      link: windowsAssets.appx.url,
      onClick: () => {
        setDownloadProgress(0);
        setCurrentAsset(windowsAssets.appx?.url || '');
        setShowConfirmation(true);
      }
    });
  }
  
  if (windowsAssets?.app) {
    options.push({
      id: 'win_app',
      title: "Windows App",
      subtitle: "Executable installer",
      description: "Traditional Windows installer. Installs XMCL like a standard Windows application with start menu shortcuts and uninstall options. Best for users who prefer traditional installation.",
      icon: <LayoutGrid size={24} />,
      disabled: false,
      colorClass: 'bg-white/5',
      isComingSoon: false,
      size: windowsAssets.app.size,
      link: windowsAssets.app.url,
      onClick: () => {
        setDownloadProgress(0);
        setCurrentAsset(windowsAssets.app?.url || '');
        setShowConfirmation(true);
      }
    });
  }

  return options;
};
