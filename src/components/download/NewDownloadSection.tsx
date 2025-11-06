import React, { useState, useMemo } from "react";
import {
  Download,
  Github,
  ExternalLink,
  Copy,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/useTranslation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
interface GitHubAsset {
  id: number;
  name: string;
  browser_download_url: string;
  size: number;
  download_count?: number;
}

interface GitHubRelease {
  tag_name: string;
  published_at: string;
  assets: GitHubAsset[];
  html_url: string;
}

interface PlatformAssets {
  windows: { x64: GitHubAsset[]; app: GitHubAsset[] };
  macos: { x64: GitHubAsset[]; arm64: GitHubAsset[] };
  linux: { x64: GitHubAsset[]; arm64: GitHubAsset[] };
}

interface DownloadItemProps {
  title: string;
  packageType: string;
  downloadUrl?: string;
  size?: number;
  downloads?: number;
  isCommand?: boolean;
  commandText?: string;
  gradient: string;
}

// SVG Icons for packages
const PackageIcon = React.memo(
  ({ type, gradient }: { type: string; gradient: string }) => {
    const renderIcon = () => {
      switch (type) {
        case "installer":
          return (
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
              <path d="M13 2L3 14h8l-2 8 10-12h-8l2-8z" fill="currentColor" />
            </svg>
          );
        case "archive":
          return (
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M9 3v6m6-6v6M9 13v6m6-6v6"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          );
        case "store":
          return (
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
              <path
                d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" />
            </svg>
          );
        case "terminal":
          return (
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
              <rect
                x="2"
                y="4"
                width="20"
                height="16"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M6 8l4 4-4 4m6 0h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          );
        case "package":
        case "deb":
        case "rpm":
          return (
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
              <path
                d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 22V12m0 0L3 7m9 5l9-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          );
        case "appimage":
          return (
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
              <rect
                x="4"
                y="4"
                width="16"
                height="16"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M9 9h6m-6 4h6m-6 4h4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          );
        case "tar":
          return (
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
              <path
                d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M14 2v6h6M12 18v-6m-3 3l3-3 3 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          );
        case "aur":
          return (
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
              <path
                d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 8v8m-4-4h8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          );
        case "flathub":
          return (
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 6v12M6 12h12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          );
        default:
          return (
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          );
      }
    };

    return (
      <div
        className={`w-16 h-16 rounded-2xl ${gradient} flex items-center justify-center shadow-lg shrink-0 text-white`}
      >
        {renderIcon()}
      </div>
    );
  },
);

PackageIcon.displayName = "PackageIcon";
const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};
const DownloadItem = React.memo<DownloadItemProps>(
  ({
    title,
    packageType,
    downloadUrl,
    size,
    downloads,
    isCommand = false,
    commandText = "",
    gradient,
  }) => {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);

    const handleAction = () => {
      if (isCommand && commandText) {
        navigator.clipboard.writeText(commandText.replace(/&#10;/g, "\n"));
        setCopied(true);
        // Use the translation key here
        toast.success(t("downloadMessages.copiedToClipboard"));
        setTimeout(() => setCopied(false), 2000);
      } else if (downloadUrl) {
        window.open(downloadUrl, "_blank");
      }
    };

    return (
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02]">
        <div className="p-6 flex items-center gap-6 flex-wrap sm:flex-nowrap">
          {/* Icon */}
          <PackageIcon type={packageType} gradient={gradient} />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white mb-2 truncate">
              {title}
            </h3>

            {/* Stats */}
            {!isCommand && (
              <div className="flex items-center gap-4 flex-wrap">
                {size && (
                  <div className="flex items-center gap-2 text-sm">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-4 h-4 text-slate-400"
                    >
                      <path
                        d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m14-7l-5-5m0 0L7 8m5-5v12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-slate-400 font-medium">
                      {/* Use translation key for MB */}
                      {size} {t("downloadMessages.sizeMB")}
                    </span>
                  </div>
                )}
                {downloads !== undefined && (
                  <div className="flex items-center gap-2 text-sm">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-4 h-4 text-slate-400"
                    >
                      <path
                        d="M12 2v13m0 0l-4-4m4 4l4-4M5 17v3a2 2 0 002 2h10a2 2 0 002-2v-3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-slate-400 font-medium">
                      {/* Use translation key for downloads */}
                      {formatNumber(downloads)}{" "}
                      {t("downloadMessages.downloads")}
                    </span>
                  </div>
                )}
              </div>
            )}

            {isCommand && commandText && (
              <div className="mt-2 p-3 bg-black/40 rounded-lg border border-slate-700/50">
                <code className="text-xs text-green-400 font-mono break-all leading-relaxed">
                  {commandText.replace(/&#10;/g, "\n")}
                </code>
              </div>
            )}
          </div>

          {/* Action Button */}
          <Button
            onClick={handleAction}
            size="lg"
            className={`${gradient} hover:opacity-90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-8 whitespace-nowrap`}
          >
            {isCommand ? (
              copied ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  {/* Use translation key */}
                  {t("downloadMessages.copied")}
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" />
                  {/* Use translation key */}
                  {t("downloadMessages.copyCommand")}
                </>
              )
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                {/* Use translation key */}
                {t("downloadMessages.download")}
              </>
            )}
          </Button>
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
        </div>
      </div>
    );
  },
);

DownloadItem.displayName = "DownloadItem";

// OS Selection Button
const OSButton = React.memo<{
  name: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
  color: string;
}>(({ name, icon, isSelected, onClick, color }) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={onClick}
      className={`group relative px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 ${
        isSelected
          ? `bg-gradient-to-r ${color} text-white shadow-2xl scale-105 sm:scale-110`
          : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white hover:scale-105"
      }`}
    >
      <span className="flex items-center gap-2 sm:gap-3">
        <span className="text-2xl sm:text-3xl">{icon}</span>
        <span>{name}</span>
      </span>
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl -z-10 animate-pulse" />
      )}
    </button>
  );
});

OSButton.displayName = "OSButton";

// OS Icons
const WindowsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M3 5.5l8-1.1v7.6H3V5.5zm8 7.5v7.6l-8-1.1V13h8zm1 0h9v8.4l-9-1.2V13zm9-1V3.6L12 2.4v8.6h9z" />
  </svg>
);

const MacOSIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

const LinuxIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.84-.41 1.569-.348 2.094.217 1.87 1.447 3.456 3.317 4.285.85.38 1.672.627 2.282.801 1.01.29 1.761.421 2.456.421.695 0 1.446-.131 2.456-.421.61-.174 1.432-.421 2.282-.801 1.87-.829 3.1-2.415 3.317-4.285.062-.525-.07-1.254-.348-2.094-.589-1.771-1.831-3.47-2.716-4.521-.75-1.067-.974-1.928-1.05-3.02-.065-1.491 1.056-5.965-3.17-6.298-.165-.013-.325-.021-.48-.021zm-.01 3.36c.084 0 .148.014.195.045.045.03.08.082.106.152.025.07.043.156.052.26.01.104.013.221.013.352v.436c0 .146-.005.283-.015.408-.01.125-.028.234-.052.327-.024.093-.059.166-.106.22-.047.054-.112.08-.195.08-.084 0-.148-.026-.195-.08-.047-.054-.082-.127-.106-.22-.024-.093-.042-.202-.052-.327-.01-.125-.015-.262-.015-.408v-.436c0-.131.003-.248.013-.352.009-.104.027-.19.052-.26.026-.07.061-.122.106-.152.047-.031.111-.045.195-.045zm2.446.336c.16 0 .288.053.384.158.096.106.144.245.144.416 0 .171-.048.31-.144.416-.096.106-.224.158-.384.158-.16 0-.288-.052-.384-.158-.096-.106-.144-.245-.144-.416 0-.171.048-.31.144-.416.096-.105.224-.158.384-.158zm-4.892 0c.16 0 .288.053.384.158.096.106.144.245.144.416 0 .171-.048.31-.144.416-.096.106-.224.158-.384.158-.16 0-.288-.052-.384-.158-.096-.106-.144-.245-.144-.416 0-.171.048-.31.144-.416.096-.105.224-.158.384-.158z" />
  </svg>
);

// Main Component
const NewDownloadSection = () => {
  const { t } = useTranslation();
  const [selectedOS, setSelectedOS] = useState<"windows" | "macos" | "linux">(
    "windows",
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle OS change with animation
  const handleOSChange = (os: "windows" | "macos" | "linux") => {
    if (os === selectedOS) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedOS(os);
      setIsTransitioning(false);
    }, 300);
  };

  // Fetch releases with optimization
  const {
    data: releases,
    isLoading,
    error,
  } = useQuery<GitHubRelease[]>({
    queryKey: ["github-releases"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases",
        { headers: { Accept: "application/vnd.github.v3+json" } },
      );
      if (!response.ok) throw new Error("Failed to fetch");
      return response.json();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const latestRelease = releases?.[0];

  // Memoized asset filtering with optimization
  const platformAssets = useMemo((): PlatformAssets => {
    if (!latestRelease?.assets) {
      return {
        windows: { x64: [], app: [] },
        macos: { x64: [], arm64: [] },
        linux: { x64: [], arm64: [] },
      };
    }

    const filtered = latestRelease.assets.filter((asset) => {
      const name = asset.name.toLowerCase();
      return (
        !name.includes("sha256") &&
        !name.includes("blockmap") &&
        !name.includes(".sig") &&
        !name.includes(".txt") &&
        !name.includes(".yml") &&
        asset.size > 1024 * 1024
      );
    });

    return {
      windows: {
        x64: filtered
          .filter((a) => {
            const n = a.name.toLowerCase();
            return (
              (n.includes("setup") && n.includes(".exe") && !n.includes("ia32") && !n.includes("x86")) ||
              (n.includes("win") && n.includes(".zip") && !n.includes("arm64") && !n.includes("ia32") && !n.includes("x86"))
            );
          })
          .slice(0, 2),
        app: filtered
          .filter(
            (a) =>
              a.name.toLowerCase().includes(".appx") &&
              !a.name.toLowerCase().includes("arm64") &&
              !a.name.toLowerCase().includes("ia32") &&
              !a.name.toLowerCase().includes("x86"),
          )
          .slice(0, 1),
      },
      macos: {
        x64: filtered
          .filter((a) => {
            const n = a.name.toLowerCase();
            return (
              (n.includes(".dmg") || n.includes(".pkg")) && !n.includes("arm64")
            );
          })
          .slice(0, 1),
        arm64: filtered
          .filter((a) => {
            const n = a.name.toLowerCase();
            return (
              (n.includes(".dmg") || n.includes(".pkg")) && n.includes("arm64")
            );
          })
          .slice(0, 1),
      },
      linux: {
        x64: filtered
          .filter((a) => {
            const n = a.name.toLowerCase();
            return (
              (n.includes(".deb") ||
                n.includes(".rpm") ||
                n.includes(".appimage") ||
                n.includes(".tar.xz")) &&
              !n.includes("arm64")
            );
          })
          .slice(0, 4),
        arm64: filtered
          .filter((a) => {
            const n = a.name.toLowerCase();
            return (
              (n.includes(".deb") ||
                n.includes(".rpm") ||
                n.includes(".appimage") ||
                n.includes(".tar.xz")) &&
              n.includes("arm64")
            );
          })
          .slice(0, 4),
      },
    };
  }, [latestRelease]);

  // Loading state
  if (isLoading) {
    return (
      <section className="py-20 px-4 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 light:from-slate-100 light:via-blue-100 light:to-purple-100">
        <div className="container mx-auto text-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-16 h-16 animate-spin text-blue-400 dark:text-blue-400 light:text-blue-600" />
            {/* Use translation key */}
            <p className="text-xl text-slate-300 dark:text-slate-300 light:text-slate-700">
              {t("downloadMessages.loadingReleases")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || !latestRelease) {
    return (
      <section className="py-20 px-4 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 light:from-slate-100 light:via-blue-100 light:to-purple-100">
        <div className="container mx-auto text-center">
          <div className="max-w-md mx-auto p-8 bg-red-500/10 dark:bg-red-500/10 light:bg-red-100/70 backdrop-blur-xl border border-red-500/50 dark:border-red-500/50 light:border-red-300/50 rounded-2xl">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400 dark:text-red-400 light:text-red-600" />
            {/* Use translation key */}
            <h3 className="text-2xl font-bold text-white dark:text-white light:text-slate-800 mb-2">
              {t("downloadMessages.errorTitle")}
            </h3>
            {/* Use translation key */}
            <p className="text-slate-300 dark:text-slate-300 light:text-slate-600 mb-6">
              {t("downloadMessages.errorDescription")}
            </p>
            <Button
              onClick={() =>
                window.open(
                  "https://github.com/Voxelum/x-minecraft-launcher/releases",
                  "_blank",
                )
              }
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              {/* Use translation key */}
              {t("downloadMessages.openGitHub")}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Determine OS-specific gradient
  const getOSGradient = () => {
    switch (selectedOS) {
      case "windows":
        return "from-blue-600 via-blue-700 to-blue-800";
      case "macos":
        return "from-gray-600 via-gray-700 to-gray-800";
      case "linux":
        return "from-orange-600 via-orange-700 to-orange-800";
      default:
        return "from-blue-600 via-purple-600 to-pink-600";
    }
  };

  return (
    <section className={`py-20 px-4 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 light:from-slate-100 light:via-blue-100 light:to-purple-100 relative overflow-hidden transition-all duration-500`}>
      {/* Animated background with OS-specific color */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/20 light:bg-blue-300/20 rounded-full blur-3xl animate-pulse`} />
        <div
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/20 light:bg-purple-300/20 rounded-full blur-3xl animate-pulse`}
          style={{ animationDelay: "1s" }}
        />
        {selectedOS === "windows" && (
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 dark:bg-blue-400/10 light:bg-blue-200/10 rounded-full blur-3xl animate-pulse`}
            style={{ animationDelay: "0.5s" }}
          />
        )}
        {selectedOS === "macos" && (
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-400/10 dark:bg-gray-400/10 light:bg-gray-200/10 rounded-full blur-3xl animate-pulse`}
            style={{ animationDelay: "0.5s" }}
          />
        )}
        {selectedOS === "linux" && (
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-400/10 dark:bg-orange-400/10 light:bg-orange-200/10 rounded-full blur-3xl animate-pulse`}
            style={{ animationDelay: "0.5s" }}
          />
        )}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Use translation key */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 light:from-blue-600 light:via-purple-600 light:to-pink-600 bg-clip-text text-transparent">
            {t("downloadMessages.downloadTitle")}
          </h2>
          {/* Use translation key */}
          <p className="text-xl sm:text-2xl text-slate-300 dark:text-slate-300 light:text-slate-700 max-w-3xl mx-auto mb-8 leading-relaxed">
            {t("downloadMessages.downloadDescription")}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge className="text-lg py-3 px-6 bg-slate-800/80 dark:bg-slate-800/80 light:bg-white/70 backdrop-blur-xl border border-slate-700 dark:border-slate-700 light:border-slate-300 text-white dark:text-white light:text-slate-800">
              {/* Use translation key for Version */}
              {t("downloadMessages.version")} {latestRelease.tag_name}
            </Badge>
            <Badge className="text-lg py-3 px-6 bg-slate-800/80 dark:bg-slate-800/80 light:bg-white/70 backdrop-blur-xl border border-slate-700 dark:border-slate-700 light:border-slate-300 text-white dark:text-white light:text-slate-800">
              {/* Use translation key for Released on */}
              {t("downloadMessages.releasedOn")}{" "}
              {new Date(latestRelease.published_at).toLocaleDateString("ru-RU")}
            </Badge>
          </div>
        </div>

        {/* OS Selector */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex gap-3 sm:gap-4 p-2 sm:p-3 bg-slate-800/50 dark:bg-slate-800/50 light:bg-white/50 backdrop-blur-2xl rounded-3xl border border-slate-700/50 dark:border-slate-700/50 light:border-slate-300/50 shadow-2xl flex-wrap justify-center">
            <OSButton
              name="Windows"
              icon={<WindowsIcon />}
              isSelected={selectedOS === "windows"}
              onClick={() => handleOSChange("windows")}
              color="from-blue-600 via-blue-700 to-blue-800"
            />
            <OSButton
              name="macOS"
              icon={<MacOSIcon />}
              isSelected={selectedOS === "macos"}
              onClick={() => handleOSChange("macos")}
              color="from-gray-600 via-gray-700 to-gray-800"
            />
            <OSButton
              name="Linux"
              icon={<LinuxIcon />}
              isSelected={selectedOS === "linux"}
              onClick={() => handleOSChange("linux")}
              color="from-orange-600 via-orange-700 to-orange-800"
            />
          </div>
        </div>

        {/* Download Items with transition */}
        <div className={`space-y-6 max-w-5xl mx-auto transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
          {selectedOS === "windows" && (
            <>
              {platformAssets.windows.x64.map((asset) => (
                <DownloadItem
                  key={asset.id}
                  title={
                    asset.name.includes(".exe")
                      ? t("downloadMessages.windowsInstaller")
                      : t("downloadMessages.windowsArchive")
                  }
                  packageType={
                    asset.name.includes(".exe") ? "installer" : "archive"
                  }
                  downloadUrl={asset.browser_download_url}
                  size={Math.round(asset.size / 1024 / 1024)}
                  downloads={asset.download_count}
                  gradient="bg-gradient-to-r from-blue-600 to-blue-700"
                />
              ))}
              {platformAssets.windows.app.map((asset) => (
                <DownloadItem
                  key={asset.id}
                  title={t("downloadMessages.windowsStoreApp")}
                  packageType="store"
                  downloadUrl={asset.browser_download_url}
                  size={Math.round(asset.size / 1024 / 1024)}
                  downloads={asset.download_count}
                  gradient="bg-gradient-to-r from-purple-600 to-purple-700"
                />
              ))}
              <DownloadItem
                title="Winget"
                packageType="terminal"
                isCommand
                commandText="winget install CI010.XMinecraftLauncher"
                gradient="bg-gradient-to-r from-green-600 to-green-700"
              />
            </>
          )}

          {selectedOS === "macos" && (
            <>
              <div className="mb-12">
                {/* Use translation key */}
                <h3 className="text-3xl font-bold text-center mb-6 text-white dark:text-white light:text-slate-800">
                  {t("downloadMessages.intelX64")}
                </h3>
                <div className="space-y-6">
                  {platformAssets.macos.x64.map((asset) => (
                    <DownloadItem
                      key={asset.id}
                      title={t("downloadMessages.macosPackage")}
                      packageType="package"
                      downloadUrl={asset.browser_download_url}
                      size={Math.round(asset.size / 1024 / 1024)}
                      downloads={asset.download_count}
                      gradient="bg-gradient-to-r from-blue-600 to-blue-700"
                    />
                  ))}
                  <DownloadItem
                    title="Homebrew"
                    packageType="terminal"
                    isCommand
                    commandText="brew tap voxelum/xmcl&#10;brew install --cask --no-quarantine xmcl"
                    gradient="bg-gradient-to-r from-amber-600 to-amber-700"
                  />
                </div>
              </div>
              {platformAssets.macos.arm64.length > 0 && (
                <div>
                  {/* Use translation key */}
                  <h3 className="text-3xl font-bold text-center mb-6 text-white dark:text-white light:text-slate-800">
                    {t("downloadMessages.appleSiliconARM64")}
                  </h3>
                  <div className="space-y-6">
                    {platformAssets.macos.arm64.map((asset) => (
                      <DownloadItem
                        key={asset.id}
                        title={t("downloadMessages.macosPackageAppleSilicon")}
                        packageType="package"
                        downloadUrl={asset.browser_download_url}
                        size={Math.round(asset.size / 1024 / 1024)}
                        downloads={asset.download_count}
                        gradient="bg-gradient-to-r from-purple-600 to-purple-700"
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {selectedOS === "linux" && (
            <>
              <div className="mb-12">
                {/* Use translation key */}
                <h3 className="text-3xl font-bold text-center mb-6 text-white dark:text-white light:text-slate-800">
                  x64
                </h3>
                <div className="space-y-6">
                  {platformAssets.linux.x64.map((asset) => {
                    let type = "package";
                    let gradient =
                      "bg-gradient-to-r from-orange-600 to-orange-700";
                    let title = t("downloadMessages.linuxPackage"); // Default translation

                    if (asset.name.includes(".deb")) {
                      type = "deb";
                      gradient = "bg-gradient-to-r from-red-600 to-red-700";
                      title = t("downloadMessages.debPackage");
                    } else if (asset.name.includes(".rpm")) {
                      type = "rpm";
                      gradient = "bg-gradient-to-r from-blue-600 to-blue-700";
                      title = t("downloadMessages.rpmPackage");
                    } else if (asset.name.includes(".appimage")) {
                      type = "appimage";
                      gradient = "bg-gradient-to-r from-green-600 to-green-700";
                      title = "AppImage";
                    } else if (asset.name.includes(".tar.xz")) {
                      type = "tar";
                      gradient =
                        "bg-gradient-to-r from-purple-600 to-purple-700";
                      title = t("downloadMessages.tarArchive");
                    }

                    return (
                      <DownloadItem
                        key={asset.id}
                        title={title}
                        packageType={type}
                        downloadUrl={asset.browser_download_url}
                        size={Math.round(asset.size / 1024 / 1024)}
                        downloads={asset.download_count}
                        gradient={gradient}
                      />
                    );
                  })}
                  <DownloadItem
                    title={t("downloadMessages.aur")}
                    packageType="aur"
                    downloadUrl="https://aur.archlinux.org/packages/xmcl-launcher"
                    gradient="bg-gradient-to-r from-cyan-600 to-cyan-700"
                  />
                  <DownloadItem
                    title="Flathub"
                    packageType="flathub"
                    downloadUrl="https://flathub.org/apps/app.xmcl.voxelum"
                    gradient="bg-gradient-to-r from-indigo-600 to-indigo-700"
                  />
                </div>
              </div>
              {platformAssets.linux.arm64.length > 0 && (
                <div>
                  {/* Use translation key */}
                  <h3 className="text-3xl font-bold text-center mb-6 text-white dark:text-white light:text-slate-800">
                    ARM64
                  </h3>
                  <div className="space-y-6">
                    {platformAssets.linux.arm64.map((asset) => {
                      let type = "package";
                      let gradient =
                        "bg-gradient-to-r from-orange-600 to-orange-700";
                      let title = t("downloadMessages.linuxPackageARM64"); // Default translation

                      if (asset.name.includes(".deb")) {
                        type = "deb";
                        gradient = "bg-gradient-to-r from-red-600 to-red-700";
                        title = t("downloadMessages.debPackageARM64");
                      } else if (asset.name.includes(".rpm")) {
                        type = "rpm";
                        gradient = "bg-gradient-to-r from-blue-600 to-blue-700";
                        title = t("downloadMessages.rpmPackageARM64");
                      } else if (asset.name.includes(".appimage")) {
                        type = "appimage";
                        gradient =
                          "bg-gradient-to-r from-green-600 to-green-700";
                        title = t("downloadMessages.appImageARM64");
                      } else if (asset.name.includes(".tar.xz")) {
                        type = "tar";
                        gradient =
                          "bg-gradient-to-r from-purple-600 to-purple-700";
                        title = t("downloadMessages.tarArchiveARM64");
                      }

                      return (
                        <DownloadItem
                          key={asset.id}
                          title={title}
                          packageType={type}
                          downloadUrl={asset.browser_download_url}
                          size={Math.round(asset.size / 1024 / 1024)}
                          downloads={asset.download_count}
                          gradient={gradient}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-center gap-4 sm:gap-6 mt-16 flex-wrap">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open(latestRelease.html_url, "_blank")}
            className="bg-slate-800/50 dark:bg-slate-800/50 light:bg-white/50 backdrop-blur-xl border-slate-700 dark:border-slate-700 light:border-slate-300 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 light:hover:bg-slate-100/50 text-white dark:text-white light:text-slate-800 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
          >
            <ExternalLink className="w-5 h-5 mr-2 sm:mr-3" />
            {/* Use translation key */}
            {t("downloadMessages.releaseNotes")}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() =>
              window.open(
                "https://github.com/Voxelum/x-minecraft-launcher/releases",
                "_blank",
              )
            }
            className="bg-slate-800/50 dark:bg-slate-800/50 light:bg-white/50 backdrop-blur-xl border-slate-700 dark:border-slate-700 light:border-slate-300 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 light:hover:bg-slate-100/50 text-white dark:text-white light:text-slate-800 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
          >
            <Github className="w-5 h-5 mr-2 sm:mr-3" />
            {/* Use translation key */}
            {t("downloadMessages.allReleases")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewDownloadSection;
