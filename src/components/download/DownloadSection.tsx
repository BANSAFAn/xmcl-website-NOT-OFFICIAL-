
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
      className="py-16 bg-minecraft-dark-blue relative md:py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Background blurred lights - reduced opacity for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/5 rounded-full filter blur-[80px] opacity-20"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-purple-500/5 rounded-full filter blur-[100px] opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader 
          title={text.title}
          subtitle={text.subtitle}
          versionLabel={text.currentVersion}
          versionTag={releaseData?.tag_name || "v0.49.1"}
        />
        
        {/* Download Options with OS Selector */}
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
