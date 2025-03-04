
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

// Hook to get the latest release data
export const useLatestRelease = () => {
  return useQuery({
    queryKey: ['latestRelease'],
    queryFn: fetchLatestRelease,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    refetchOnWindowFocus: false
  });
};
