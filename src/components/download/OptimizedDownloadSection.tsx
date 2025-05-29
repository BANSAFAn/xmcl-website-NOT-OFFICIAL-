
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLatestRelease } from "./fetchReleases";
import { downloadTranslations, LanguageKey } from "./translations";
import { OSSelector } from "./OsSelector";
import { DownloadOptions } from "./DownloadOptions";
import { useLanguage } from "@/components/navbar/LanguageContext";
import { Download, Star, Users, Clock, CheckCircle, Shield, Zap } from "lucide-react";

export function OptimizedDownloadSection() {
  const [activeOS, setActiveOS] = useState("windows");
  const { currentLanguage } = useLanguage();
  
  const text = downloadTranslations[currentLanguage as LanguageKey] || downloadTranslations.en;
  const { data: releaseData, isLoading, error } = useLatestRelease();
  const versionNumber = releaseData ? releaseData.tag_name.replace('v', '') : "0.49.1";

  return (
    <section 
      id="download" 
      className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Simplified background - removed heavy animations for performance */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 backdrop-blur-sm rounded-full border border-cyan-500/30 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 font-semibold text-sm">DOWNLOAD</span>
          </div>
          
          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            {text.title}
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
            {text.subtitle}
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/20">
              <Star className="text-green-400 w-4 h-4" />
              <span className="text-green-400 text-sm font-medium">
                {text.currentVersion}: {releaseData?.tag_name || "v0.49.1"}
              </span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Shield className="text-blue-400 w-4 h-4" />
              <span className="text-blue-400 text-sm font-medium">Free & Open Source</span>
            </div>
            
            {releaseData && (
              <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <Clock className="text-purple-400 w-4 h-4" />
                <span className="text-purple-400 text-sm font-medium">
                  {new Date(releaseData.published_at).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Download Container - Simplified design */}
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8 shadow-xl">
            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                <CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" />
                <span className="text-white/90 text-sm">Easy Installation</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                <Zap className="text-yellow-400 w-5 h-5 flex-shrink-0" />
                <span className="text-white/90 text-sm">Fast Performance</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                <Shield className="text-blue-400 w-5 h-5 flex-shrink-0" />
                <span className="text-white/90 text-sm">Secure & Safe</span>
              </div>
            </div>
            
            <DownloadOptions selectedOS={activeOS} setSelectedOS={setActiveOS} />
          </div>
        </motion.div>
        
        {/* Bottom info */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
            <Download className="text-cyan-400 w-4 h-4" />
            <p className="text-white/60 text-sm">
              {text.allDownloads}{" "}
              <a 
                href="https://github.com/Voxelum/x-minecraft-launcher/releases" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-cyan-400 hover:text-cyan-300 transition-colors underline"
              >
                {text.githubReleases}
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
