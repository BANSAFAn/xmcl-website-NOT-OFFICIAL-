
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDownloadOptions } from './useDownloadOptions';
import { LoadingSpinner } from './LoadingSpinner';
import { OSSelector } from './OsSelector';
import { useToast } from '@/hooks/use-toast';
import { ArrowDownToLine, ArrowUpRight, Github } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface DownloadOptionsProps {
  selectedOS: string;
  setSelectedOS: (os: string) => void;
}

export function DownloadOptions({ selectedOS, setSelectedOS }: DownloadOptionsProps) {
  const { downloadOptions, isLoading, error } = useDownloadOptions(selectedOS);
  const { toast } = useToast();
  const [showAllOptions, setShowAllOptions] = useState(false);
  
  // Update language when the user changes it
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  useEffect(() => {
    const handleLanguageChange = () => {
      const savedLang = localStorage.getItem('language') || 'en';
      setCurrentLanguage(savedLang);
    };
    
    handleLanguageChange();
    window.addEventListener('languageChange', handleLanguageChange);
    window.addEventListener('storage', (e) => {
      if (e.key === 'language') {
        handleLanguageChange();
      }
    });
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleDownloadClick = (option: any) => {
    if (option.isComingSoon) {
      if (option.title === "Linux Flatpak") {
        window.open(option.link, '_blank');
      } else {
        toast({
          title: "Coming Soon",
          description: "This download option is not yet available.",
          variant: "default"
        });
      }
    } else {
      window.open(option.link, '_blank');
      
      toast({
        title: "Download Started",
        description: `${option.title} is downloading now.`,
        variant: "default"
      });
    }
  };

  // Filter options to only show the first 3 by default, or all if showAllOptions is true
  const displayedOptions = showAllOptions ? downloadOptions : downloadOptions.slice(0, 3);

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl text-center">
        <p className="text-red-400">{error}</p>
        <p className="mt-2 text-white/80">Please check your internet connection and try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <OSSelector activeOS={selectedOS} setActiveOS={setSelectedOS} />
      
      {isLoading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displayedOptions.map((option, index) => (
              <motion.div
                key={option.title}
                variants={itemVariants}
                className={`${option.colorClass} glass-card p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer relative overflow-hidden group`}
                onClick={() => handleDownloadClick(option)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Icon */}
                <div className="mb-4 text-4xl">{option.icon}</div>
                
                {/* Title */}
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  {option.title}
                  {option.isComingSoon && (
                    <Badge variant="outline" className="ml-2 bg-blue-500/20 text-blue-300 border-blue-500/40">
                      {option.title === "Linux Flatpak" ? "Community" : "Coming Soon"}
                    </Badge>
                  )}
                </h3>
                
                {/* Description */}
                <p className="text-white/70 mb-4">{option.description}</p>
                
                {/* Download button */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-white/60 text-sm">{option.size}</span>
                  
                  <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                    {option.isComingSoon && option.title === "Linux Flatpak" ? (
                      <Github className="w-5 h-5" />
                    ) : option.isComingSoon ? (
                      <ArrowUpRight className="w-5 h-5" />
                    ) : (
                      <ArrowDownToLine className="w-5 h-5" />
                    )}
                  </div>
                </div>
                
                {/* Animated background line on hover */}
                <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-white/0 via-white/50 to-white/0 transition-all duration-700 ease-in-out"></div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Show more/less button if there are more than 3 options */}
          {downloadOptions.length > 3 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAllOptions(!showAllOptions)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 text-white/80 hover:text-white"
              >
                {showAllOptions ? "Show Less Options" : "Show All Options"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
