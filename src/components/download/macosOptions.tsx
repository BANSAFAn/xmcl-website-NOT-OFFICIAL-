
import { Apple } from "lucide-react";
import { DownloadOption } from './types';
import { MacOSAssets } from './types';
import { useOSAssets } from './fetchReleases';
import { ExtendedTranslations } from './types';
import { useLanguage } from '@/components/navbar/LanguageContext';

type RenderFunctionProps = {
  getTranslation: (key: keyof ExtendedTranslations) => string;
  setDownloadProgress: (progress: number) => void;
  setCurrentAsset: (asset: string | null) => void;
  setShowConfirmation: (show: boolean) => void;
};

export const renderMacOSOptions = ({
  getTranslation,
  setDownloadProgress,
  setCurrentAsset,
  setShowConfirmation
}: RenderFunctionProps): DownloadOption[] => {
  // Get macOS assets from GitHub
  const { assets } = useOSAssets('macos');
  const macOSAssets = assets as MacOSAssets;
  const { currentLanguage } = useLanguage();
  
  const options: DownloadOption[] = [];

  // macOS ARM64 (Apple Silicon)
  if (macOSAssets?.arm64) {
    options.push({
      id: 'macos_arm64',
      title: "Apple Silicon DMG",
      subtitle: "For M1/M2/M3 Macs",
      description: getTranslation('macos.arm64'),
      icon: <Apple size={24} />,
      disabled: false,
      colorClass: 'bg-white/5',
      isComingSoon: false,
      size: macOSAssets.arm64.size,
      link: macOSAssets.arm64.url,
      onClick: () => {
        setDownloadProgress(0);
        setCurrentAsset(macOSAssets.arm64?.url || '');
        setShowConfirmation(true);
      }
    });
  }
  
  // macOS Intel
  if (macOSAssets?.intel) {
    options.push({
      id: 'macos_intel',
      title: "Intel DMG",
      subtitle: "For Intel-based Macs",
      description: getTranslation('macos.intel'),
      icon: <Apple size={24} />,
      disabled: false,
      colorClass: 'bg-white/5',
      isComingSoon: false,
      size: macOSAssets.intel.size,
      link: macOSAssets.intel.url,
      onClick: () => {
        setDownloadProgress(0);
        setCurrentAsset(macOSAssets.intel?.url || '');
        setShowConfirmation(true);
      }
    });
  }

  return options;
};
