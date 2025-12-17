export interface GitHubAsset {
  id: number;
  name: string;
  browser_download_url: string;
  size: number;
  download_count?: number;
}

export interface GitHubRelease {
  tag_name: string;
  published_at: string;
  assets: GitHubAsset[];
  html_url: string;
  body: string;
}

export interface PlatformAssets {
  windows: { x64: GitHubAsset[]; app: GitHubAsset[] };
  macos: { x64: GitHubAsset[]; arm64: GitHubAsset[] };
  linux: { x64: GitHubAsset[]; arm64: GitHubAsset[] };
}
