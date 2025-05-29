
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLatestRelease } from "./fetchReleases";
import { downloadTranslations, LanguageKey } from "./translations";
import { useLanguage } from "@/components/navbar/LanguageContext";
import { Download, Star, Users, Clock, CheckCircle, Shield, Zap, ChevronDown, Github, Sparkles, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DownloadOptions } from "./DownloadOptions";

export function AnimatedDownloadSection() {
  const [activeOS, setActiveOS] = useState("windows");
  const [showVersionSelector, setShowVersionSelector] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState("latest");
  const { currentLanguage } = useLanguage();
  
  const text = downloadTranslations[currentLanguage as LanguageKey] || downloadTranslations.en;
  const { data: releaseData, isLoading, error } = useLatestRelease();
  const versionNumber = releaseData ? releaseData.tag_name.replace('v', '') : "0.49.1";

  // Background animation variants
  const backgroundVariants = {
    animate: {
      background: [
        "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
        "radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
        "radial-gradient(circle at 50% 20%, rgba(14, 165, 233, 0.15) 0%, transparent 50%)",
        "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)"
      ],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      id="download" 
      className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0"
        variants={backgroundVariants}
        animate="animate"
      />
      
      {/* Enhanced floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              i % 3 === 0 ? 'bg-cyan-400/40' : 
              i % 3 === 1 ? 'bg-purple-400/40' : 'bg-blue-400/40'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-15, 15, -15],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Enhanced animated badge */}
          <motion.div 
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 backdrop-blur-md rounded-full border border-cyan-500/50 mb-8 shadow-lg shadow-cyan-500/25"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
              animate={{ 
                scale: [1, 1.3, 1],
                boxShadow: [
                  '0 0 0 0 rgba(34, 211, 238, 0.7)',
                  '0 0 0 10px rgba(34, 211, 238, 0)',
                  '0 0 0 0 rgba(34, 211, 238, 0)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <Sparkles className="text-cyan-400 w-5 h-5" />
            <span className="text-cyan-300 font-bold text-base tracking-wide">СКАЧАТЬ</span>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Download className="text-purple-400 w-5 h-5" />
            </motion.div>
          </motion.div>
          
          {/* Enhanced animated title */}
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent leading-tight"
            variants={itemVariants}
          >
            {text.title}
          </motion.h2>
          
          {/* Enhanced animated subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-medium"
            variants={itemVariants}
          >
            {text.subtitle}
          </motion.p>
          
          {/* Enhanced animated stats */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-12"
            variants={containerVariants}
          >
            <motion.div 
              className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-xl border border-green-500/50 backdrop-blur-md shadow-lg shadow-green-500/25"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -3 }}
            >
              <Star className="text-green-400 w-6 h-6" />
              <div className="text-left">
                <div className="text-green-400 text-sm font-medium opacity-80">Текущая версия</div>
                <div className="text-green-300 font-bold text-lg">{releaseData?.tag_name || "v0.49.1"}</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-xl border border-blue-500/50 backdrop-blur-md shadow-lg shadow-blue-500/25"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -3 }}
            >
              <Shield className="text-blue-400 w-6 h-6" />
              <div className="text-left">
                <div className="text-blue-400 text-sm font-medium opacity-80">Лицензия</div>
                <div className="text-blue-300 font-bold text-lg">Бесплатно</div>
              </div>
            </motion.div>
            
            {releaseData && (
              <motion.div 
                className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-xl border border-purple-500/50 backdrop-blur-md shadow-lg shadow-purple-500/25"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -3 }}
              >
                <Clock className="text-purple-400 w-6 h-6" />
                <div className="text-left">
                  <div className="text-purple-400 text-sm font-medium opacity-80">Выпущено</div>
                  <div className="text-purple-300 font-bold text-lg">
                    {new Date(releaseData.published_at).toLocaleDateString('ru-RU')}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Enhanced version selector */}
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.02 }}
            >
              <Button
                onClick={() => setShowVersionSelector(!showVersionSelector)}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 border border-cyan-400/30"
                size="lg"
              >
                <Github className="w-6 h-6 mr-3" />
                Выбрать версию
                <motion.div
                  animate={{ rotate: showVersionSelector ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-3"
                >
                  <ChevronDown className="w-6 h-6" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced version selector dropdown */}
          <AnimatePresence>
            {showVersionSelector && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -30 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -30 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="mb-12 overflow-hidden"
              >
                <motion.div 
                  className="bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/30 p-8 max-w-2xl mx-auto shadow-2xl"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-white font-bold text-2xl mb-6 text-center">Доступные версии</h3>
                  <div className="space-y-4">
                    <motion.div 
                      className="flex items-center justify-between p-6 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-2xl border border-green-500/50 cursor-pointer group shadow-lg shadow-green-500/25"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedVersion("latest")}
                    >
                      <div className="flex items-center gap-4">
                        <Badge className="bg-green-500 text-white px-4 py-2 text-sm font-bold">Последняя</Badge>
                        <div>
                          <div className="text-white font-bold text-lg">{versionNumber}</div>
                          <div className="text-green-300 text-sm">Стабильная версия</div>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: [0, 15, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Star className="text-green-400 w-6 h-6" />
                      </motion.div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center justify-between p-6 bg-white/10 rounded-2xl border border-white/20 cursor-pointer group hover:bg-white/15 transition-all duration-300 shadow-lg"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/releases', '_blank')}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <Github className="text-white w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-white font-bold text-lg">Все релизы</div>
                          <div className="text-white/70 text-sm">Посмотреть на GitHub</div>
                        </div>
                      </div>
                      <ChevronDown className="text-white/60 w-5 h-5 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Enhanced main download container */}
        <motion.div 
          className="max-w-7xl mx-auto"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-2xl rounded-[2rem] border border-white/30 p-10 md:p-16 shadow-2xl relative overflow-hidden"
            whileHover={{ scale: 1.005, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Enhanced animated border gradient */}
            <motion.div 
              className="absolute inset-0 rounded-[2rem] opacity-50"
              style={{
                background: "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.2), transparent, rgba(168, 85, 247, 0.2), transparent, rgba(14, 165, 233, 0.2), transparent)",
                backgroundSize: "600% 600%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* Enhanced features grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
              variants={containerVariants}
            >
              {[
                { 
                  icon: CheckCircle, 
                  text: "Простая установка", 
                  color: "text-green-400",
                  bgColor: "from-green-500/20 to-emerald-500/20",
                  borderColor: "border-green-500/30"
                },
                { 
                  icon: Zap, 
                  text: "Быстрая работа", 
                  color: "text-yellow-400",
                  bgColor: "from-yellow-500/20 to-orange-500/20",
                  borderColor: "border-yellow-500/30"
                },
                { 
                  icon: Shield, 
                  text: "Безопасность", 
                  color: "text-blue-400",
                  bgColor: "from-blue-500/20 to-cyan-500/20",
                  borderColor: "border-blue-500/30"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col items-center text-center gap-4 p-8 bg-gradient-to-br ${feature.bgColor} rounded-3xl border ${feature.borderColor} backdrop-blur-sm shadow-lg`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  custom={index}
                >
                  <motion.div
                    variants={floatingVariants}
                    animate="float"
                    style={{ animationDelay: `${index * 0.5}s` }}
                    className="p-4 rounded-full bg-white/10"
                  >
                    <feature.icon className={`${feature.color} w-10 h-10`} />
                  </motion.div>
                  <span className="text-white/95 font-bold text-xl">{feature.text}</span>
                  <span className="text-white/70 text-sm">Проверено временем</span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Download options */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <DownloadOptions selectedOS={activeOS} setSelectedOS={setActiveOS} />
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Enhanced bottom info */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div 
            className="inline-flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-white/15 to-white/10 rounded-full border border-white/30 backdrop-blur-md shadow-xl"
            whileHover={{ scale: 1.05, y: -3 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Download className="text-cyan-400 w-6 h-6" />
            </motion.div>
            <p className="text-white/90 text-lg font-medium">
              {text.allDownloads}{" "}
              <motion.a 
                href="https://github.com/Voxelum/x-minecraft-launcher/releases" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-4 font-bold"
                whileHover={{ scale: 1.05 }}
              >
                {text.githubReleases}
              </motion.a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
