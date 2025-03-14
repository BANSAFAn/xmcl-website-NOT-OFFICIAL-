import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useDownloadOptions } from "./useDownloadOptions";
import { useDownloadActions } from "./useDownloadActions";
import { LoadingSpinner } from "./LoadingSpinner";
import { OSSelector } from "./OsSelector";
import { DownloadGrid } from "./DownloadGrid";
import { ShowMoreButton } from "./ShowMoreButton";
import { ErrorDisplay } from "./ErrorDisplay";
import { useLatestRelease } from "./fetchReleases";
import { useIsMobile } from "@/hooks/use-mobile";
import { Smartphone, Tablet, AlertTriangle } from "lucide-react";
import { useOS } from '@/context/OSContext';

interface DownloadOptionsProps {
  selectedOS: string;
  setSelectedOS: (os: string) => void;
}

export function DownloadOptions({
  selectedOS,
  setSelectedOS,
}: DownloadOptionsProps) {
  const { renderWindowsOptions, renderLinuxOptions, renderMacOSOptions } =
    useDownloadOptions();
  const { showAllOptions, setShowAllOptions, handleDownloadClick } =
    useDownloadActions();
  const { data: releaseData, isLoading, error } = useLatestRelease();
  const isMobile = useIsMobile();
  const { osInfo } = useOS();
  const [isUnsupportedWindows, setIsUnsupportedWindows] = useState(false);

  // Set the selected OS based on detected OS context
  useEffect(() => {
    if (osInfo.category !== "unknown") {
      setSelectedOS(osInfo.category);
      
      // Check Windows version if it's Windows
      if (osInfo.category === "windows") {
        const userAgent = window.navigator.userAgent.toLowerCase();
        const winVersionMatch = userAgent.match(/windows nt (\d+\.\d+)/);
        if (winVersionMatch) {
          const winVersion = parseFloat(winVersionMatch[1]);
          // Windows NT 6.2 is Windows 8, 6.3 is Windows 8.1, 10.0 is Windows 10
          // Check if it's lower than Windows 10 (NT 10.0)
          if (winVersion < 10.0) {
            setIsUnsupportedWindows(true);
          }
        }
      }
    }
  }, [osInfo.category, setSelectedOS]);
  
  // Get options based on selected OS
  const getOptions = () => {
    switch (selectedOS) {
      case "windows":
        return renderWindowsOptions();
      case "linux":
        return renderLinuxOptions();
      case "macos":
        return renderMacOSOptions();
      default:
        return [];
    }
  };

  const downloadOptions = getOptions();

  // Update language when the user changes it
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    const handleLanguageChange = () => {
      const savedLang = localStorage.getItem("language") || "en";
      setCurrentLanguage(savedLang);
    };

    handleLanguageChange();
    window.addEventListener("languageChange", handleLanguageChange);
    window.addEventListener("storage", (e) => {
      if (e.key === "language") {
        handleLanguageChange();
      }
    });

    // Show toast with latest release info when data is loaded
    if (releaseData && !isLoading) {
      toast.success(`Latest version available: ${releaseData.tag_name}`, {
        description: `Released on ${new Date(releaseData.published_at).toLocaleDateString()}`,
        duration: 5000,
      });
    }

    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, [releaseData, isLoading]);

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  // Mobile message translations
  const mobileMessages = {
    en: "The launcher is only available for desktop platforms (Windows, macOS, Linux).",
    ru: "Лаунчер доступен только для десктопных платформ (Windows, macOS, Linux).",
    uk: "Лаунчер доступний тільки для десктопних платформ (Windows, macOS, Linux).",
  };

  // Windows version message translations
  const windowsVersionMessages = {
    en: "The launcher requires Windows 10 or higher to run.",
    ru: "Для работы лаунчера требуется Windows 10 или выше.",
    uk: "Для роботи лаунчера потрібна Windows 10 або вище.",
  };

  // Get mobile message based on current language
  const getMobileMessage = () => {
    return (
      mobileMessages[currentLanguage as keyof typeof mobileMessages] ||
      mobileMessages.en
    );
  };

  // Get Windows version message based on current language
  const getWindowsVersionMessage = () => {
    return (
      windowsVersionMessages[
        currentLanguage as keyof typeof windowsVersionMessages
      ] || windowsVersionMessages.en
    );
  };

  // Detect if device is a tablet like iPad
  const isTablet = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    return (
      /ipad/.test(userAgent) ||
      (/android/.test(userAgent) && !/mobile/.test(userAgent)) ||
      (window.innerWidth >= 768 && window.innerWidth <= 1024)
    );
  };

  const isMobileDevice = isMobile;
  const isTabletDevice = isTablet();
  const DeviceIcon = isTabletDevice ? Tablet : Smartphone;

  return (
    <div className="space-y-8">
      {!isMobileDevice && !isTabletDevice && (
        <OSSelector activeOS={selectedOS} setActiveOS={setSelectedOS} />
      )}

      {isLoading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner />
        </div>
      ) : isMobileDevice || isTabletDevice ? (
        <div className="p-6 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm my-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-full bg-yellow-500/20">
              <DeviceIcon className="h-10 w-10 text-yellow-500" />
            </div>
            <h3 className="text-xl font-medium text-white">
              {isTabletDevice
                ? "Tablet Device Detected"
                : "Mobile Device Detected"}
            </h3>
            <p className="text-white/70">{getMobileMessage()}</p>

            <div className="flex items-center mt-4 text-white/60 text-sm">
              <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
              <p>
                Please visit this page from a desktop browser to download the
                launcher.
              </p>
            </div>
          </div>
        </div>
      ) : isUnsupportedWindows ? (
        <div className="p-6 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm my-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-full bg-red-500/20">
              <AlertTriangle className="h-10 w-10 text-red-500" />
            </div>
            <h3 className="text-xl font-medium text-white">
              Unsupported Windows Version
            </h3>
            <p className="text-white/70">{getWindowsVersionMessage()}</p>

            <div className="flex items-center mt-4 text-white/60 text-sm">
              <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
              <p>Please update to Windows 10 or later to use the launcher.</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <DownloadGrid
            options={downloadOptions}
            showAllOptions={showAllOptions}
            onDownloadClick={handleDownloadClick}
          />

          {downloadOptions.length > 3 && (
            <ShowMoreButton
              showAllOptions={showAllOptions}
              setShowAllOptions={setShowAllOptions}
              totalOptions={downloadOptions.length}
            />
          )}
        </>
      )}
    </div>
  );
}