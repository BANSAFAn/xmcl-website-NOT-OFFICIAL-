
import { useState } from "react";
import { motion } from "framer-motion";
import { Layout, Upload, Download, Database, Users, Layers, Code, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Globe } from "@/components/guide/Globe";
import {
  AppearanceGuide,
  AppXMigrationGuide,
  LocalizationGuide,
  InstallationGuide,
  DataStorageGuide,
  MultiplayerGuide,
  UpdateGuide
} from "@/components/guide/sections";
import { ProtocolGuide } from "@/components/guide/sections/ProtocolGuide";
import { useLanguage } from "@/components/navbar/LanguageContext";

const Guide = () => {
  const [activeTab, setActiveTab] = useState("appearance");
  const { currentLanguage } = useLanguage();
  
  // Translations for Guide page
  const translations = {
    en: {
      title: "X Minecraft Launcher Guide",
      subtitle: "Complete documentation for getting the most out of the X Minecraft Launcher",
      sections: "Guide Sections",
      returnHome: "Return to Home",
      appearance: "Appearance Guide",
      appxMigration: "AppX Migration",
      localization: "Localization Guide",
      installation: "Installation Guide",
      dataStorage: "Data Storage",
      multiplayer: "Multiplayer Guide",
      protocol: "Protocol Guide",
      update: "Update Guide"
    },
    ru: {
      title: "Руководство X Minecraft Launcher",
      subtitle: "Полная документация для максимального использования X Minecraft Launcher",
      sections: "Разделы руководства",
      returnHome: "Вернуться на главную",
      appearance: "Руководство по внешнему виду",
      appxMigration: "Миграция AppX",
      localization: "Руководство по локализации",
      installation: "Руководство по установке",
      dataStorage: "Хранение данных",
      multiplayer: "Руководство по мультиплееру",
      protocol: "Руководство по протоколу",
      update: "Руководство по обновлению"
    },
    uk: {
      title: "Керівництво X Minecraft Launcher",
      subtitle: "Повна документація для максимального використання X Minecraft Launcher",
      sections: "Розділи керівництва",
      returnHome: "Повернутися на головну",
      appearance: "Керівництво по зовнішньому вигляду",
      appxMigration: "Міграція AppX",
      localization: "Керівництво по локалізації",
      installation: "Керівництво по встановленню",
      dataStorage: "Зберігання даних",
      multiplayer: "Керівництво по мультиплееру",
      protocol: "Керівництво по протоколу",
      update: "Керівництво по оновленню"
    },
    zh: {
      title: "X Minecraft 启动器指南",
      subtitle: "充分利用 X Minecraft 启动器的完整文档",
      sections: "指南部分",
      returnHome: "返回首页",
      appearance: "外观指南",
      appxMigration: "AppX 迁移",
      localization: "本地化指南",
      installation: "安装指南",
      dataStorage: "数据存储",
      multiplayer: "多人游戏指南",
      protocol: "协议指南",
      update: "更新指南"
    },
    de: {
      title: "X Minecraft Launcher Anleitung",
      subtitle: "Vollständige Dokumentation für die optimale Nutzung des X Minecraft Launchers",
      sections: "Anleitungsabschnitte",
      returnHome: "Zurück zur Startseite",
      appearance: "Erscheinungsbild-Anleitung",
      appxMigration: "AppX-Migration",
      localization: "Lokalisierungs-Anleitung",
      installation: "Installations-Anleitung",
      dataStorage: "Datenspeicherung",
      multiplayer: "Multiplayer-Anleitung",
      protocol: "Protokoll-Anleitung",
      update: "Update-Anleitung"
    },
    ja: {
      title: "X Minecraft Launcher ガイド",
      subtitle: "X Minecraft Launcher を最大限に活用するための完全なドキュメント",
      sections: "ガイドセクション",
      returnHome: "ホームに戻る",
      appearance: "外観ガイド",
      appxMigration: "AppX マイグレーション",
      localization: "ローカライゼーションガイド",
      installation: "インストールガイド",
      dataStorage: "データストレージ",
      multiplayer: "マルチプレイヤーガイド",
      protocol: "プロトコルガイド",
      update: "アップデートガイド"
    }
  };

  const text = translations[currentLanguage as keyof typeof translations] || translations.en;
  
  // Define guide sections with translations
  const sections = [
    {
      id: "appearance",
      title: text.appearance,
      icon: <Layout className="w-5 h-5" />,
      content: <AppearanceGuide />
    },
    {
      id: "appx-migration",
      title: text.appxMigration,
      icon: <Upload className="w-5 h-5" />,
      content: <AppXMigrationGuide />
    },
    {
      id: "localization",
      title: text.localization,
      icon: <Globe className="w-5 h-5" />,
      content: <LocalizationGuide />
    },
    {
      id: "installation",
      title: text.installation,
      icon: <Download className="w-5 h-5" />,
      content: <InstallationGuide />
    },
    {
      id: "data-storage",
      title: text.dataStorage,
      icon: <Database className="w-5 h-5" />,
      content: <DataStorageGuide />
    },
    {
      id: "multiplayer",
      title: text.multiplayer,
      icon: <Users className="w-5 h-5" />,
      content: <MultiplayerGuide />
    },
    {
      id: "protocol",
      title: text.protocol,
      icon: <Code className="w-5 h-5" />,
      content: <ProtocolGuide />
    },
    {
      id: "update",
      title: text.update,
      icon: <Upload className="w-5 h-5" />,
      content: <UpdateGuide />
    }
  ];

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
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Enhanced Sidebar */}
          <motion.div 
            className="lg:w-1/4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 sticky top-24 border border-white/20 shadow-2xl">
              <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {text.sections}
              </h2>
              <nav className="flex flex-col space-y-2">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`py-3 px-4 rounded-xl text-left transition-all flex items-center gap-3 relative overflow-hidden group ${
                      activeTab === section.id
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg"
                        : "hover:bg-white/10 text-white/80 hover:text-white border border-transparent hover:border-white/10"
                    }`}
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`${activeTab === section.id ? 'text-cyan-400' : 'text-white/60'} transition-colors`}>
                      {section.icon}
                    </div>
                    <span className="relative z-10 font-medium">{section.title}</span>
                    
                    {/* Active indicator */}
                    {activeTab === section.id && (
                      <motion.div
                        className="absolute right-2 w-2 h-2 bg-cyan-400 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    )}
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>
          
          {/* Enhanced Content */}
          <motion.div 
            className="lg:w-3/4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-8 min-h-[70vh] border border-white/20 shadow-2xl relative overflow-hidden">
              {/* Content background pattern */}
              <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 69, 219, 0.3) 0%, transparent 50%),
                                  radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
                }}
              />
              
              <motion.div 
                className="relative z-10"
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {sections.find(section => section.id === activeTab)?.content}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Guide;
