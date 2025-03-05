
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useLatestRelease } from "./fetchReleases";
import { downloadTranslations, LanguageKey } from "./translations";
import { OSSelector } from "./OsSelector";
import { DownloadOptions } from "./DownloadOptions";
import { SectionHeader } from "./SectionHeader";

export function DownloadSection() {
  const [activeOS, setActiveOS] = useState("windows");
  const [currentLanguage, setCurrentLanguage] = useState<LanguageKey>('en');
  
  // Initialize language based on localStorage and add listener for changes
  useEffect(() => {
    const updateLanguage = () => {
      const savedLang = localStorage.getItem('language') || 'en';
      setCurrentLanguage(savedLang as LanguageKey);
    };
    
    // Initial language set
    updateLanguage();
    
    // Listen for storage changes (from other components)
    window.addEventListener('storage', updateLanguage);
    
    // Custom event listener for immediate language updates
    window.addEventListener('languageChange', updateLanguage);
    
    return () => {
      window.removeEventListener('storage', updateLanguage);
      window.removeEventListener('languageChange', updateLanguage);
    };
  }, []);

  // Current translation
  const text = downloadTranslations[currentLanguage] || downloadTranslations.en;

  // Fetch latest release data
  const { data: releaseData, isLoading, error } = useLatestRelease();

  // Get version number from release data or use fallback
  const versionNumber = releaseData ? releaseData.tag_name.replace('v', '') : "0.49.1";

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
        <SectionHeader 
          title={text.title}
          subtitle={text.subtitle}
          versionLabel={text.currentVersion}
          versionTag={releaseData?.tag_name || "v0.49.1"}
        />
        
        {/* Download Options Grid - We'll pass activeOS to DownloadOptions directly */}
        <div className="max-w-5xl mx-auto">
          <DownloadOptions selectedOS={activeOS} setSelectedOS={setActiveOS} />
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
