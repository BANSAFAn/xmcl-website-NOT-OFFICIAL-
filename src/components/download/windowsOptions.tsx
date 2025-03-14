
import { Archive, LayoutGrid } from "lucide-react";
import { DownloadOption } from './types';
import { WindowsAssets } from './types';
import { useOSAssets } from './fetchReleases';
import { ExtendedTranslations } from './types';
import { useLanguage } from '@/components/navbar/LanguageContext';

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
  const { currentLanguage } = useLanguage();

  const options: DownloadOption[] = [];
  
  if (windowsAssets?.zip64) {
    options.push({
      id: 'win_zip64',
      title: "Windows 64-bit ZIP",
      subtitle: "For most modern computers",
      description: getTranslation('windows.zip64'),
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
      description: getTranslation('windows.zip32'),
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
      description: getTranslation('windows.appx'),
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
      description: getTranslation('windows.app'),
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
