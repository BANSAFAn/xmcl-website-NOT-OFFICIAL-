import { useQuery } from "@tanstack/react-query";
import { WindowsAssets, MacOSAssets, LinuxAssets } from "./types";

export type ReleaseAsset = {
  name: string;
  browser_download_url: string;
  content_type: string;
  size: number;
};

export type Release = {
  tag_name: string;
  name: string;
  published_at: string;
  assets: ReleaseAsset[];
};

// Define specific asset types for different OS
export type ReleaseAssets = WindowsAssets | MacOSAssets | LinuxAssets;

// Function to format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// Function to fetch the latest release from GitHub
export const fetchLatestRelease = async (): Promise<Release> => {
  const response = await fetch(
    "https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases/latest",
  );
  if (!response.ok) {
    throw new Error("Failed to fetch latest release");
  }
  return response.json();
};

// Improved function to better match release assets for different OS types
export const getAssetsForOS = (
  release: Release | undefined,
  os: string,
): ReleaseAssets => {
  if (!release) return {};

  const assets = release.assets.reduce<Record<string, unknown>>(
    (acc, asset) => {
      const { name, browser_download_url, size } = asset;

      // Windows assets
      if (os === "windows") {
        if (
          name.includes("win") &&
          name.includes("x64") &&
          name.endsWith(".zip")
        ) {
          acc.zip64 = { url: browser_download_url, size: formatFileSize(size) };
        } else if (
          name.includes("win") &&
          (name.includes("x86") || name.includes("ia32")) &&
          name.endsWith(".zip")
        ) {
          acc.zip32 = { url: browser_download_url, size: formatFileSize(size) };
        } else if (name.endsWith(".appx") || name.includes("msix")) {
          acc.appx = { url: browser_download_url, size: formatFileSize(size) };
        } else if (name.endsWith(".exe")) {
          acc.app = { url: browser_download_url, size: formatFileSize(size) };
        }
      }

      // macOS assets
      else if (os === "macos") {
        if (
          name.endsWith(".dmg") &&
          name.includes("arm64") &&
          !name.endsWith(".sha256")
        ) {
          acc.arm64 = { url: browser_download_url, size: formatFileSize(size) };
        } else if (
          name.endsWith(".dmg") &&
          (name.includes("x64") || name.includes("intel")) &&
          !name.endsWith(".sha256")
        ) {
          acc.intel = { url: browser_download_url, size: formatFileSize(size) };
        }
      }

      // Linux assets
      else if (os === "linux") {
        if (name.endsWith(".AppImage") && !name.endsWith(".sha256")) {
          acc.appimage = {
            url: browser_download_url,
            size: formatFileSize(size),
          };
        } else if (
          (name.endsWith(".tar.gz") || name.includes(".tgz")) &&
          !name.endsWith(".sha256")
        ) {
          acc.tarball = {
            url: browser_download_url,
            size: formatFileSize(size),
          };
        } else if (
          (name.includes("arm64") || name.includes("aarch64")) &&
          !name.endsWith(".sha256")
        ) {
          acc.arm64 = { url: browser_download_url, size: formatFileSize(size) };
        } else if (name.endsWith(".rpm") && !name.endsWith(".sha256")) {
          acc.rpm = { url: browser_download_url, size: formatFileSize(size) };
        } else if (name.endsWith(".deb") && !name.endsWith(".sha256")) {
          acc.deb = { url: browser_download_url, size: formatFileSize(size) };
        }
      }

      return acc;
    },
    {},
  );

  return assets;
};

// Mock data for releases - this will be used if API call fails
export const mockReleaseData: Record<string, ReleaseAssets> = {
  windows: {
    zip64: { url: "#", size: "64.2 MB" },
    zip32: { url: "#", size: "60.5 MB" },
    appx: { url: "#", size: "67.1 MB" },
    app: { url: "#", size: "63.9 MB" },
  },
  macos: {
    arm64: { url: "#", size: "75.3 MB" },
    intel: { url: "#", size: "76.8 MB" },
  },
  linux: {
    appimage: { url: "#", size: "70.1 MB" },
    tarball: { url: "#", size: "68.5 MB" },
    arm64: { url: "#", size: "67.8 MB" },
    rpm: { url: "#", size: "69.2 MB" },
    deb: { url: "#", size: "65.7 MB" },
  },
};

// Improved function to fetch release data with better error handling
export const fetchReleases = async (
  os: string = "windows",
): Promise<ReleaseAssets> => {
  try {
    const release = await fetchLatestRelease();
    const assets = getAssetsForOS(release, os);

    if (!assets || Object.keys(assets).length === 0) {
      console.warn(`No assets found for ${os}, using mock data`);
      return mockReleaseData[os as keyof typeof mockReleaseData] || {};
    }

    return assets;
  } catch (error) {
    console.error("Error fetching releases:", error);
    return mockReleaseData[os as keyof typeof mockReleaseData] || {};
  }
};

// Hook to get the latest release data
export const useLatestRelease = () => {
  return useQuery({
    queryKey: ["latestRelease"],
    queryFn: fetchLatestRelease,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    refetchOnWindowFocus: false,
  });
};

// New hook to get assets for a specific OS
export const useOSAssets = (os: string) => {
  const { data: release, isLoading, error } = useLatestRelease();

  const assets = release ? getAssetsForOS(release, os) : {};
  const isEmpty = Object.keys(assets).length === 0;

  return {
    assets: isEmpty
      ? mockReleaseData[os as keyof typeof mockReleaseData] || {}
      : assets,
    isLoading,
    error,
  };
};
