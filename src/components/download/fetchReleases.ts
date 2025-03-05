
import { useQuery } from "@tanstack/react-query";

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

// Function to format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// Function to fetch the latest release from GitHub
export const fetchLatestRelease = async (): Promise<Release> => {
  const response = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases/latest');
  if (!response.ok) {
    throw new Error('Failed to fetch latest release');
  }
  return response.json();
};

// Mock data for releases - this will be used if API call fails
export const mockReleaseData = {
  windows: {
    installer: { url: "#", size: "64.2 MB" },
    appx: { url: "#", size: "67.1 MB" },
    portable: { url: "#", size: "63.9 MB" }
  },
  macos: {
    universal: { url: "#", size: "78.4 MB" },
    arm64: { url: "#", size: "75.3 MB" },
    intel: { url: "#", size: "76.8 MB" }
  },
  linux: {
    appimage: { url: "#", size: "70.1 MB" },
    deb: { url: "#", size: "68.5 MB" },
    rpm: { url: "#", size: "69.2 MB" },
    arm64: { url: "#", size: "67.8 MB" }
  }
};

// Function to fetch release data
export const fetchReleases = async () => {
  try {
    const release = await fetchLatestRelease();
    
    // Process release data here
    // For now, return mock data
    return mockReleaseData;
  } catch (error) {
    console.error("Error fetching releases:", error);
    return mockReleaseData;
  }
};

// Hook to get the latest release data
export const useLatestRelease = () => {
  return useQuery({
    queryKey: ['latestRelease'],
    queryFn: fetchLatestRelease,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    refetchOnWindowFocus: false
  });
};
