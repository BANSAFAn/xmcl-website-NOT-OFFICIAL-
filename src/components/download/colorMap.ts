
// Map of colors for each download type
export const colorMap: Record<string, string> = {
  // Windows
  "App Installer": "from-blue-600/30 to-blue-700/20",
  "App": "from-indigo-600/30 to-indigo-700/20",
  "AppX Package": "from-purple-600/30 to-purple-700/20",
  "Zip (x64)": "from-emerald-600/30 to-emerald-700/20",
  "Zip (x86)": "from-teal-600/30 to-teal-700/20",
  
  // macOS
  "DMG": "from-amber-600/30 to-amber-700/20",
  
  // Linux
  "AppImage": "from-rose-600/30 to-rose-700/20",
  "Deb": "from-yellow-600/30 to-yellow-700/20",
  "RPM": "from-pink-600/30 to-pink-700/20",
  "Tar.gz": "from-cyan-600/30 to-cyan-700/20"
};

// Platform color classes
export const platformColorMap: Record<string, string> = {
  "windows": "bg-gradient-to-br from-blue-600/30 to-blue-700/20",
  "macos": "bg-gradient-to-br from-amber-600/30 to-amber-700/20",
  "appx": "bg-gradient-to-br from-purple-600/30 to-purple-700/20",
  "zip": "bg-gradient-to-br from-emerald-600/30 to-emerald-700/20",
  "appimage": "bg-gradient-to-br from-rose-600/30 to-rose-700/20",
  "deb": "bg-gradient-to-br from-yellow-600/30 to-yellow-700/20",
  "rpm": "bg-gradient-to-br from-pink-600/30 to-pink-700/20",
  "flatpak": "bg-gradient-to-br from-indigo-600/30 to-indigo-700/20",
  "macos-arm": "bg-gradient-to-br from-orange-600/30 to-orange-700/20",
  "macos-intel": "bg-gradient-to-br from-amber-500/30 to-amber-600/20",
  "linux-arm": "bg-gradient-to-br from-red-600/30 to-red-700/20"
};

// Function to get color class based on platform/type
export const getColorClass = (platform: string): string => {
  return platformColorMap[platform] || "bg-gradient-to-br from-gray-600/30 to-gray-700/20";
};
