
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/i18n/context";

type ReleaseAsset = {
  name: string;
  browser_download_url: string;
  content_type: string;
  size: number;
};

type Release = {
  tag_name: string;
  name: string;
  published_at: string;
  assets: ReleaseAsset[];
};

const formatFileSize = (bytes: number): string => {
  const { t } = useI18n();
  
  if (bytes < 1024) return `${bytes} ${t.common.fileSize.bytes}`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} ${t.common.fileSize.kb}`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} ${t.common.fileSize.mb}`;
};


const fetchLatestRelease = async (): Promise<Release> => {
  const response = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases/latest');
  if (!response.ok) {
    throw new Error('Failed to fetch latest release');
  }
  return response.json();
};

export function DownloadSection() {
  const [activeOS, setActiveOS] = useState("windows");
  const [currentLanguage, setCurrentLanguage] = useState('en');
  useEffect(() => {
    const updateLanguage = () => {
      const savedLang = localStorage.getItem('language') || 'en';
      setCurrentLanguage(savedLang);
    };
    updateLanguage();
    window.addEventListener('storage', updateLanguage);
    window.addEventListener('languageChange', updateLanguage);
    
    return () => {
      window.removeEventListener('storage', updateLanguage);
      window.removeEventListener('languageChange', updateLanguage);
    };
  }, []);

  const translations = {
    en: {
      title: "Download X Minecraft Launcher",
      subtitle: "Choose the version that works best for your system.",
      currentVersion: "Current Version:",
      downloadBtn: "Download",
      allDownloads: "All downloads are available on",
      githubReleases: "GitHub Releases"
    },
    ru: {
      title: "Скачать X Minecraft Launcher",
      subtitle: "Выберите версию, которая лучше всего подходит для вашей системы.",
      currentVersion: "Текущая версия:",
      downloadBtn: "Скачать",
      allDownloads: "Все загрузки доступны на",
      githubReleases: "GitHub Releases"
    },
    uk: {
      title: "Завантажити X Minecraft Launcher",
      subtitle: "Виберіть версію, яка найкраще підходить для вашої системи.",
      currentVersion: "Поточна версія:",
      downloadBtn: "Завантажити",
      allDownloads: "Усі завантаження доступні на",
      githubReleases: "GitHub Releases"
    }
  };
  const text = translations[currentLanguage as keyof typeof translations] || translations.en;
  const { data: releaseData, isLoading, error } = useQuery({
    queryKey: ['latestRelease'],
    queryFn: fetchLatestRelease,
    staleTime: 1000 * 60 * 60, 
    refetchOnWindowFocus: false
  });
  const versionNumber = releaseData ? releaseData.tag_name.replace('v', '') : "0.49.1";
  
  const osOptions = [
    { id: "windows", name: "Windows" },
    { id: "macos", name: "macOS" },
    { id: "linux", name: "Linux" }
  ];

  // Map asset file names to their descriptions and icons
  const getDownloadOptions = () => {
    if (!releaseData) return [];
    
    // Filter assets based on active OS
    let filteredAssets: ReleaseAsset[] = [];
    
    if (activeOS === "windows") {
      filteredAssets = releaseData.assets.filter(asset => 
        asset.name.includes("win") || 
        asset.name.endsWith(".exe") || 
        asset.name.endsWith(".appx")
      );
    } else if (activeOS === "macos") {
      filteredAssets = releaseData.assets.filter(asset => 
        asset.name.includes("mac") || 
        asset.name.endsWith(".dmg")
      );
    } else if (activeOS === "linux") {
      filteredAssets = releaseData.assets.filter(asset => 
        asset.name.includes("linux") || 
        asset.name.endsWith(".AppImage") ||
        asset.name.endsWith(".deb") ||
        asset.name.endsWith(".rpm") ||
        asset.name.endsWith(".tar.gz")
      );
    }
    
    // Map assets to download options
    return filteredAssets.map(asset => {
      let title = "";
      let description = "";
      let icon = <Download size={24} />;
      
      // Windows files
      if (asset.name.endsWith(".exe")) {
        title = "App Installer";
        description = "Recommended for most users";
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M6 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H6Z" />
            <path d="m4 22 4-4" />
            <path d="M2 22h6" />
            <path d="M14 22h6c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-7.5" />
            <path d="M2 18h9c1.1 0 2-.9 2-2V4" />
          </svg>
        );
      } else if (asset.name.endsWith(".appx")) {
        title = "AppX Package";
        description = "For Windows Store users";
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <rect width="20" height="20" x="2" y="2" rx="2" />
            <rect width="8" height="8" x="6" y="6" rx="1" />
            <path d="M18 14v4" />
            <path d="M14 18h8" />
          </svg>
        );
      } else if (asset.name.includes("win32-x64") && asset.name.endsWith(".zip")) {
        title = "Zip (x64)";
        description = "Portable version 64-bit";
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M2 6h4" />
            <path d="M2 10h4" />
            <path d="M6 14v4h12" />
            <path d="M18 14v4" />
            <rect width="8" height="4" x="8" y="6" rx="1" />
            <path d="M10 6V2h6v10" />
          </svg>
        );
      } else if (asset.name.includes("win32-ia32") && asset.name.endsWith(".zip")) {
        title = "Zip (x86)";
        description = "For 32-bit systems";
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M2 6h4" />
            <path d="M2 10h4" />
            <path d="M6 14v4h12" />
            <path d="M18 14v4" />
            <rect width="8" height="4" x="8" y="6" rx="1" />
            <path d="M10 6V2h6v10" />
          </svg>
        );
      }
      
      // macOS files
      else if (asset.name.endsWith(".dmg")) {
        title = "DMG";
        description = "Recommended for most users";
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
            <path d="M10 2c1 .5 2 2 2 5" />
          </svg>
        );
      }
      
      // Linux files
      else if (asset.name.endsWith(".AppImage")) {
        title = "AppImage";
        description = "Universal Linux package";
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        );
      } else if (asset.name.endsWith(".deb")) {
        title = "Deb";
        description = "For Debian-based distributions";
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5Z" />
            <circle cx="10" cy="10" r="1" />
            <circle cx="14" cy="10" r="1" />
            <circle cx="10" cy="14" r="1" />
            <circle cx="14" cy="14" r="1" />
          </svg>
        );
      } else if (asset.name.endsWith(".rpm")) {
        title = "RPM";
        description = "For Red Hat-based distributions";
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M12 2v8" />
            <path d="m4.93 10.93 1.41 1.41" />
            <path d="M2 18h2" />
            <path d="M20 18h2" />
            <path d="m19.07 10.93-1.41 1.41" />
            <path d="M22 22H2" />
            <path d="m8 22 4-10 4 10" />
          </svg>
        );
      } else if (asset.name.endsWith(".tar.gz")) {
        title = "Tar.gz";
        description = "Portable archive";
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M2 9V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1" />
            <path d="M2 13h10" />
            <path d="m9 16 3-3-3-3" />
          </svg>
        );
      }
      
      // Fallback for any other files
      else {
        title = asset.name.split('.').pop()?.toUpperCase() || "File";
        description = `${formatFileSize(asset.size)}`;
        icon = <Download size={24} />;
      }
      
      return {
        title,
        description,
        icon,
        link: asset.browser_download_url,
        size: formatFileSize(asset.size)
      };
    });
  };

  const downloadOptions = getDownloadOptions();

  // If we're still loading the release data, show skeleton loaders
  const renderDownloadOptions = () => {
    if (isLoading) {
      return Array(4).fill(0).map((_, index) => (
        <motion.div 
          key={index}
          className="glass-card p-6 rounded-xl text-center bg-white/5 animate-pulse-slow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4 mx-auto"></div>
          <div className="h-5 bg-white/10 rounded-md w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-white/5 rounded-md w-1/2 mx-auto mb-4"></div>
          <div className="py-2 px-4 bg-white/10 rounded-md w-32 h-10 mx-auto"></div>
        </motion.div>
      ));
    }
    
    if (error) {
      return (
        <div className="col-span-full text-center py-8">
          <p className="text-red-400 mb-4">Failed to fetch latest release information</p>
          <p className="text-white/70">
            Please visit the <a href="https://github.com/Voxelum/x-minecraft-launcher/releases" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">GitHub Releases page</a> to download
          </p>
        </div>
      );
    }
    
    if (downloadOptions.length === 0) {
      return (
        <div className="col-span-full text-center py-8">
          <p className="text-white/70 mb-4">No download options available for selected OS</p>
          <a 
            href="https://github.com/Voxelum/x-minecraft-launcher/releases/latest" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
          >
            <ExternalLink size={16} className="mr-2" />
            View on GitHub
          </a>
        </div>
      );
    }
    
    return downloadOptions.map((option, index) => (
      <motion.a 
        key={index}
        href={option.link}
        target="_blank"
        rel="noopener noreferrer"
        className="glass-card p-6 rounded-xl text-center transition-all duration-300 group relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ 
          y: -8,
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <motion.div 
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4 relative"
          whileHover={{ 
            rotate: 10,
            scale: 1.1
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
          <div className="relative">
            {option.icon}
          </div>
        </motion.div>
        <h3 className="text-xl font-bold mb-2">{option.title}</h3>
        <p className="text-white/70 text-sm mb-1">{option.description}</p>
        <p className="text-white/50 text-xs mb-4">{option.size}</p>
        <motion.div 
          className="py-2 px-4 bg-accent text-white rounded-md inline-flex items-center justify-center relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-accent via-cyan-400 to-accent bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative flex items-center">
            <Download size={16} className="mr-2" />
            {text.downloadBtn}
          </span>
        </motion.div>
      </motion.a>
    ));
  };

  return (
    <motion.section 
      id="download" 
      className="py-24 bg-minecraft-dark-blue relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Background blurred lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-[80px] opacity-30"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-purple-500/10 rounded-full filter blur-[100px] opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gradient-cyan">{text.title}</span>
          </motion.h2>
          <motion.p 
            className="text-white/70 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {text.subtitle}
          </motion.p>
          <motion.div 
            className="inline-block mt-6 py-1 px-4 bg-white/10 rounded-full text-sm font-medium"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {text.currentVersion} {releaseData?.tag_name || "v0.49.1"}
          </motion.div>
        </div>
        
        {/* OS Selection Tabs */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="glass-card inline-flex p-1 rounded-xl">
            {osOptions.map((os) => (
              <motion.button
                key={os.id}
                onClick={() => setActiveOS(os.id)}
                className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                  activeOS === os.id 
                    ? 'bg-accent text-white shadow-lg' 
                    : 'hover:bg-white/10 text-white/70'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {os.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Download Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {renderDownloadOptions()}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-white/60 text-sm">
            {text.allDownloads} <a href="https://github.com/Voxelum/x-minecraft-launcher/releases" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{text.githubReleases}</a>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
