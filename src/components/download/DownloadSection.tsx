
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLatestRelease } from "./fetchReleases";
import { downloadTranslations, LanguageKey } from "./translations";
import { OSSelector } from "./OsSelector";
import { DownloadOptions } from "./DownloadOptions";
import { SectionHeader } from "./SectionHeader";
import { useLanguage } from "@/components/navbar/LanguageContext";

export function DownloadSection() {
  const [activeOS, setActiveOS] = useState("windows");
  const { currentLanguage } = useLanguage();
  
  // Current translation
  const text = downloadTranslations[currentLanguage as LanguageKey] || downloadTranslations.en;

  // Fetch latest release data
  const { data: releaseData, isLoading, error } = useLatestRelease();

  // Get version number from release data or use fallback
  const versionNumber = releaseData ? releaseData.tag_name.replace('v', '') : "0.49.1";

  return (
    <motion.section 
      id="download" 
      className="py-20 bg-gradient-to-b from-black via-minecraft-dark-blue to-slate-900 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full filter blur-[120px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full filter blur-[150px] opacity-30 animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-full filter blur-[100px] opacity-40"></div>
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader 
          title={text.title}
          subtitle={text.subtitle}
          versionLabel={text.currentVersion}
          versionTag={releaseData?.tag_name || "v0.49.1"}
        />
        
        {/* Enhanced Download Options Container */}
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
            <DownloadOptions selectedOS={activeOS} setSelectedOS={setActiveOS} />
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-white/60 text-sm">
            {text.allDownloads} <a href="https://github.com/Voxelum/x-minecraft-launcher/releases" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors underline font-medium">{text.githubReleases}</a>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
