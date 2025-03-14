import { useState } from 'react';
import { useLanguage } from "@/components/navbar/LanguageContext";
import { renderWindowsOptions } from './windowsOptions';
import { renderLinuxOptions } from './linuxOptions';
import { renderMacOSOptions } from './macosOptions';
import { translations as downloadTranslations } from './translations';
import { ExtendedTranslations } from './types';

export function useDownloadOptions() {
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [currentAsset, setCurrentAsset] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { currentLanguage } = useLanguage();
  
  // Function to get the translation for a specific key
  const getTranslation = (key: keyof ExtendedTranslations) => {
    const parts = key.split('.');
    const category = parts[0] as 'windows' | 'macos' | 'linux';
    const item = parts[1];
    
    try {
      const langTranslations = downloadTranslations[currentLanguage as keyof typeof downloadTranslations] || 
                              downloadTranslations.en;
      
      // @ts-ignore - Type safety handled by the try/catch
      return langTranslations[category][item] || downloadTranslations.en[category][item];
    } catch (e) {
      // Fallback to English if translation is missing
      try {
        // @ts-ignore - Type safety handled by the try/catch
        return downloadTranslations.en[category][item];
      } catch (e) {
        return 'Translation not available';
      }
    }
  };

  const renderOptionsConfig = {
    getTranslation,
    setDownloadProgress,
    setCurrentAsset,
    setShowConfirmation,
  };

  return {
    renderWindowsOptions: () => renderWindowsOptions(renderOptionsConfig),
    renderLinuxOptions: () => renderLinuxOptions(renderOptionsConfig),
    renderMacOSOptions: () => renderMacOSOptions(renderOptionsConfig),
    downloadProgress,
    setDownloadProgress,
    currentAsset,
    setCurrentAsset,
    showConfirmation,
    setShowConfirmation
  };
}