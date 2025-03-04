
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, FileDown, DownloadCloud, Calendar, Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import ReactMarkdown from "react-markdown";

type ReleaseAsset = {
  name: string;
  browser_download_url: string;
  size: number;
};

type Release = {
  id: number;
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  html_url: string;
  assets: ReleaseAsset[];
};

// Function to fetch all releases from GitHub
const fetchReleases = async (): Promise<Release[]> => {
  const response = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases');
  if (!response.ok) {
    throw new Error('Failed to fetch releases');
  }
  return response.json();
};

// Format date function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const Changelogs = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  // Initialize language based on localStorage and add listener for changes
  useEffect(() => {
    const updateLanguage = () => {
      const savedLang = localStorage.getItem('language') || 'en';
      setCurrentLanguage(savedLang);
    };
    
    // Initial language set
    updateLanguage();
    
    // Listen for storage changes
    window.addEventListener('storage', updateLanguage);
    window.addEventListener('languageChange', updateLanguage);
    
    return () => {
      window.removeEventListener('storage', updateLanguage);
      window.removeEventListener('languageChange', updateLanguage);
    };
  }, []);

  // Translations
  const translations = {
    en: {
      title: "Changelogs",
      subtitle: "Stay up to date with the latest improvements and fixes to X Minecraft Launcher",
      version: "Version",
      released: "Released",
      viewOnGithub: "View on GitHub",
      loading: "Loading releases...",
      error: "Failed to load releases. Please try again later.",
    },
    ru: {
      title: "История изменений",
      subtitle: "Будьте в курсе последних улучшений и исправлений X Minecraft Launcher",
      version: "Версия",
      released: "Выпущено",
      viewOnGithub: "Посмотреть на GitHub",
      loading: "Загрузка релизов...",
      error: "Не удалось загрузить релизы. Пожалуйста, попробуйте позже.",
    },
    uk: {
      title: "Історія змін",
      subtitle: "Будьте в курсі останніх покращень та виправлень X Minecraft Launcher",
      version: "Версія",
      released: "Випущено",
      viewOnGithub: "Переглянути на GitHub",
      loading: "Завантаження релізів...",
      error: "Не вдалося завантажити релізи. Будь ласка, спробуйте пізніше.",
    }
  };

  // Current translation
  const text = translations[currentLanguage as keyof typeof translations] || translations.en;

  // Fetch releases data
  const { data: releases, isLoading, error } = useQuery({
    queryKey: ['githubReleases'],
    queryFn: fetchReleases,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    refetchOnWindowFocus: false
  });

  return (
    <div className="min-h-screen bg-minecraft-dark-blue">
      <Navbar />
      
      <div className="pt-32 pb-20 relative">
        {/* Background blurred lights */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-[80px] opacity-30"></div>
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-purple-500/10 rounded-full filter blur-[100px] opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-cyan">{text.title}</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              {text.subtitle}
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <motion.div 
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-16 h-16 mb-6"
              >
                <DownloadCloud className="w-16 h-16 text-accent opacity-80" />
              </motion.div>
              <p className="text-white/60">{text.loading}</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400 mb-4">{text.error}</p>
              <a 
                href="https://github.com/Voxelum/x-minecraft-launcher/releases" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
              >
                <ExternalLink size={16} className="mr-2" />
                {text.viewOnGithub}
              </a>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-14">
              {releases?.map((release, index) => (
                <motion.div
                  key={release.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-8 rounded-xl relative overflow-hidden"
                >
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60"></div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="flex items-center">
                      <Tag className="text-accent mr-3" />
                      <h2 className="text-2xl md:text-3xl font-bold">
                        <span className="text-accent">{release.tag_name}</span>
                        {release.name && release.name !== release.tag_name && 
                          <span className="ml-2 text-white/90">- {release.name}</span>
                        }
                      </h2>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex items-center text-white/60 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formatDate(release.published_at)}</span>
                      </div>
                      
                      <a 
                        href={release.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm px-3 py-1 bg-white/10 hover:bg-white/20 rounded-md transition-colors text-white/80"
                      >
                        <ExternalLink size={14} className="mr-1" />
                        {text.viewOnGithub}
                      </a>
                    </div>
                  </div>
                  
                  {/* Release notes content */}
                  <div className="prose prose-invert prose-sm max-w-none prose-headings:text-accent prose-a:text-accent hover:prose-a:text-accent/80 prose-a:transition-colors">
                    <ReactMarkdown>
                      {release.body}
                    </ReactMarkdown>
                  </div>
                  
                  {/* Download assets */}
                  {release.assets.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {release.assets.slice(0, 6).map(asset => (
                          <a
                            key={asset.name}
                            href={asset.browser_download_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 bg-white/5 hover:bg-white/10 rounded-md transition-colors group"
                          >
                            <div className="p-1.5 bg-accent/20 rounded-md">
                              <FileDown size={16} className="text-accent group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-sm font-medium truncate">{asset.name}</p>
                              <p className="text-xs text-white/50">
                                {(asset.size / (1024 * 1024)).toFixed(1)} MB
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                      
                      {release.assets.length > 6 && (
                        <div className="mt-3 text-center">
                          <a 
                            href={release.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-accent hover:text-accent/80 transition-colors"
                          >
                            +{release.assets.length - 6} more files...
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Changelogs;
