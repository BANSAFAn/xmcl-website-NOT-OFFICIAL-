
import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Book } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { GuideList } from "@/components/guide/GuideList";
import { GuideRenderer } from "@/components/guide/GuideRenderer";
import { useLanguage } from "@/components/navbar/LanguageContext";

interface GuideData {
  slug: string;
  title: string;
  description: string;
  category: string;
  order: number;
  icon: string;
  path: string;
  lastUpdated: string;
}

const Guide = () => {
  const [selectedGuide, setSelectedGuide] = useState<GuideData | null>(null);
  const { currentLanguage } = useLanguage();
  
  // Translations for Guide page
  const translations = {
    en: {
      title: "X Minecraft Launcher Guide",
      subtitle: "Complete documentation for getting the most out of the X Minecraft Launcher",
      returnHome: "Return to Home",
    },
    ru: {
      title: "Руководство X Minecraft Launcher",
      subtitle: "Полная документация для максимального использования X Minecraft Launcher",
      returnHome: "Вернуться на главную",
    },
    uk: {
      title: "Керівництво X Minecraft Launcher",
      subtitle: "Повна документація для максимального використання X Minecraft Launcher",
      returnHome: "Повернутися на головну",
    },
    zh: {
      title: "X Minecraft 启动器指南",
      subtitle: "充分利用 X Minecraft 启动器的完整文档",
      returnHome: "返回首页",
    },
    de: {
      title: "X Minecraft Launcher Anleitung",
      subtitle: "Vollständige Dokumentation für die optimale Nutzung des X Minecraft Launchers",
      returnHome: "Zurück zur Startseite",
    },
    ja: {
      title: "X Minecraft Launcher ガイド",
      subtitle: "X Minecraft Launcher を最大限に活用するための完全なドキュメント",
      returnHome: "ホームに戻る",
    }
  };

  const text = translations[currentLanguage as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-minecraft-dark-blue via-slate-900 to-black relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-full filter blur-[150px]"></div>
        
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
      
      <Navbar />
      
      <motion.div 
        className="container mx-auto px-4 pt-32 pb-20 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Return Home Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <Link to="/" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-full hover:from-white/20 hover:to-white/10 transition-all duration-300 border border-white/20 hover:border-cyan-500/40">
            <Home size={18} />
            <span className="text-sm font-medium text-white">{text.returnHome}</span>
          </Link>
        </motion.div>

        {/* Header */}
        {!selectedGuide && (
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold mb-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                {text.title}
              </span>
            </motion.h1>
            
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mb-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
            
            <motion.p 
              className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {text.subtitle}
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-2 mt-8 text-white/60"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Book className="w-5 h-5" />
              <span className="text-sm">Select a guide below to get started</span>
            </motion.div>
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {selectedGuide ? (
            <GuideRenderer 
              guide={selectedGuide} 
              onBack={() => setSelectedGuide(null)} 
            />
          ) : (
            <GuideList onSelectGuide={setSelectedGuide} />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Guide;
