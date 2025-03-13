import { useState } from "react";
import { useLanguage } from "@/components/navbar/LanguageContext";
import { DownloadOption, ExtendedTranslations } from "./types";
import { defaultDownloadTranslations } from "./defaultTranslations";
import { renderWindowsOptions } from "./windowsOptions";
import { renderLinuxOptions } from "./linuxOptions";
import { renderMacOSOptions } from "./macosOptions";

export function useDownloadOptions() {
  const { translations } = useLanguage();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [currentAsset, setCurrentAsset] = useState<string | null>(null);

  // Safely access translation or use default
  const getTranslation = (key: keyof ExtendedTranslations): string => {
    // Need to cast translations as any since it doesn't have these properties in its interface
    const translatedValue = (translations as unknown)[key];
    return (
      translatedValue ||
      defaultDownloadTranslations[
        key as keyof typeof defaultDownloadTranslations
      ]
    );
  };

  const renderOptionsConfig = {
    getTranslation,
    setDownloadProgress,
    setCurrentAsset,
    setShowConfirmation,
  };

  return {
    showConfirmation,
    setShowConfirmation,
    downloadProgress,
    setDownloadProgress,
    currentAsset,
    setCurrentAsset,
    renderWindowsOptions: () => renderWindowsOptions(renderOptionsConfig),
    renderLinuxOptions: () => renderLinuxOptions(renderOptionsConfig),
    renderMacOSOptions: () => renderMacOSOptions(renderOptionsConfig),
  };
}
