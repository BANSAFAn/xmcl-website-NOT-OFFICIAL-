
// Map of colors for each download type
export const colorMap: Record<string, string> = {
  // Windows
  "App Installer": "from-blue-500/20 to-blue-600/10",
  "App": "from-indigo-500/20 to-indigo-600/10",
  "AppX Package": "from-purple-500/20 to-purple-600/10",
  "Zip (x64)": "from-green-500/20 to-green-600/10",
  "Zip (x86)": "from-teal-500/20 to-teal-600/10",
  
  // macOS
  "DMG": "from-orange-500/20 to-orange-600/10",
  
  // Linux
  "AppImage": "from-red-500/20 to-red-600/10",
  "Deb": "from-yellow-500/20 to-yellow-600/10",
  "RPM": "from-pink-500/20 to-pink-600/10",
  "Tar.gz": "from-cyan-500/20 to-cyan-600/10"
};
