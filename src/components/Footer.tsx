import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles, ExternalLink, Heart, Code, Globe } from 'lucide-react';

export function Footer() {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Initialize language based on localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLang);
  }, []);
  const translations = {
    en: {
      description: "An open-source Minecraft launcher focused on modern UX and efficient mod management.",
      disclaimer: "This is an unofficial website created by XMCL moderator Baneronetwo.",
      navigation: "Navigation",
      guide: "Guide",
      privacy: "Privacy",
      changelogs: "Changelogs",
      blogs: "Blogs",
      coreDocument: "Core Document",
      resources: "Resources",
      github: "GitHub",
      discord: "Discord Community",
      websiteSource: "Website Source Code",
      author: "Baneronetwo (Author)",
      viewSource: "View Source",
      copyright: "© 2022-2025 X Minecraft Launcher. Website by moderator Baneronetwo. Launcher created by"
    },
    ru: {
      description: "Minecraft лаунчер с открытым исходным кодом, ориентированный на современный интерфейс и эффективное управление модами.",
      disclaimer: "Это неофициальный сайт, созданный модератором XMCL Baneronetwo.",
      navigation: "Навигация",
      guide: "Руководство",
      privacy: "Конфиденциальность",
      changelogs: "История изменений",
      blogs: "Блоги",
      coreDocument: "Документация API",
      resources: "Ресурсы",
      github: "GitHub",
      discord: "Сообщество Discord",
      websiteSource: "Исходный код сайта",
      author: "Baneronetwo (Автор)",
      viewSource: "Просмотреть код",
      copyright: "© 2022-2025 X Minecraft Launcher. Сайт создан модератором Baneronetwo. Лаунчер создан"
    },
    uk: {
      description: "Minecraft лаунчер з відкритим вихідним кодом, орієнтований на сучасний інтерфейс та ефективне керування модами.",
      disclaimer: "Це неофіційний сайт, створений модератором XMCL Baneronetwo.",
      navigation: "Навігація",
      guide: "Посібник",
      privacy: "Конфіденційність",
      changelogs: "Історія змін",
      blogs: "Блоги",
      coreDocument: "Документація API",
      resources: "Ресурси",
      github: "GitHub",
      discord: "Спільнота Discord",
      websiteSource: "Вихідний код сайту",
      author: "Baneronetwo (Автор)",
      viewSource: "Переглянути код",
      copyright: "© 2022-2025 X Minecraft Launcher. Сайт створено модератором Baneronetwo. Лаунчер створено"
    }
  };
  const text = translations[currentLanguage as keyof typeof translations] || translations.en;

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const linkVariants = {
    initial: { opacity: 0.7, x: 0 },
    hover: {
      opacity: 1,
      x: 8,
      textShadow: "0 0 15px rgba(56, 189, 248, 0.4)",
      color: "#38bdf8",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-minecraft-dark-blue to-minecraft-darker-blue border-t border-white/10 py-16 overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/5 rounded-full filter blur-[100px] opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full filter blur-[120px] opacity-30 animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/3 rounded-full filter blur-[150px] opacity-20"></div>
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Enhanced Brand Section */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <img src="/assets/images/a39086fb-5549-43c0-a69e-217c717d938e.png" alt="XMCL" className="h-8 w-8" />
              </motion.div>
              <motion.span 
                className="font-bold text-xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                X Minecraft Launcher
              </motion.span>
            </Link>
            
            <motion.p 
              className="text-white/70 text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {text.description}
            </motion.p>
            
            <motion.div 
              className="relative bg-gradient-to-r from-white/10 via-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-white/10 group"
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.12)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-start gap-3">
                <Heart className="text-red-400 mt-0.5 flex-shrink-0" size={16} />
                <p className="text-white/80 text-sm leading-relaxed">{text.disclaimer}</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Enhanced Navigation Section */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-lg mb-6 relative flex items-center">
              <Globe className="mr-2 text-blue-400" size={20} />
              {text.navigation}
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "60%" }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </h4>
            <ul className="space-y-3">
              {[
                { href: "https://xmcl.app/en/guide/install", text: text.guide },
                { href: "https://xmcl.app/en/privacy", text: text.privacy },
                { href: "https://xmcl.app/en/changelogs/0.49.1", text: text.changelogs },
                { href: "https://xmcl.app/en/blog/", text: text.blogs },
                { href: "https://xmcl.app/en/core/", text: text.coreDocument }
              ].map((item, index) => (
                <motion.li key={index}>
                  <motion.a 
                    href={item.href}
                    variants={linkVariants}
                    initial="initial"
                    whileHover="hover"
                    className="text-white/60 hover:text-white transition-colors flex items-center group"
                  >
                    <motion.span 
                      className="mr-2 text-blue-400"
                      whileHover={{ x: 3 }}
                    >
                      ›
                    </motion.span>
                    <span className="group-hover:underline">{item.text}</span>
                    <ExternalLink className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" size={12} />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Enhanced Resources Section */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-lg mb-6 relative flex items-center">
              <Code className="mr-2 text-green-400" size={20} />
              {text.resources}
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "60%" }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              />
            </h4>
            <ul className="space-y-3">
              {[
                { href: "https://github.com/Voxelum/x-minecraft-launcher", text: text.github },
                { href: "https://discord.gg/W5XVwYY7GQ", text: text.discord }
              ].map((item, index) => (
                <motion.li key={index}>
                  <motion.a 
                    href={item.href}
                    variants={linkVariants}
                    initial="initial"
                    whileHover="hover"
                    className="text-white/60 hover:text-white transition-colors flex items-center group"
                  >
                    <motion.span 
                      className="mr-2 text-green-400"
                      whileHover={{ x: 3 }}
                    >
                      ›
                    </motion.span>
                    <span className="group-hover:underline">{item.text}</span>
                    <ExternalLink className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" size={12} />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Enhanced Website Source Section */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-lg mb-6 relative flex items-center">
              <Sparkles className="mr-2 text-purple-400" size={20} />
              {text.websiteSource}
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "60%" }}
                transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              />
            </h4>
            <ul className="space-y-3">
              {[
                { href: "https://github.com/Baneronetwo", text: text.author },
                { href: "https://github.com/Voxelum/x-minecraft-launcher", text: text.viewSource }
              ].map((item, index) => (
                <motion.li key={index}>
                  <motion.a 
                    href={item.href}
                    variants={linkVariants}
                    initial="initial"
                    whileHover="hover"
                    className="text-white/60 hover:text-white transition-colors flex items-center group"
                  >
                    <motion.span 
                      className="mr-2 text-purple-400"
                      whileHover={{ x: 3 }}
                    >
                      ›
                    </motion.span>
                    <span className="group-hover:underline">{item.text}</span>
                    <ExternalLink className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" size={12} />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
        
        {/* Enhanced Bottom Section */}
        <motion.div 
          className="mt-16 pt-8 border-t border-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.p 
              className="text-white/40 text-sm text-center md:text-left"
              whileHover={{ color: "rgba(255,255,255,0.6)" }}
            >
              {text.copyright}{" "}
              <motion.a 
                href="https://xmcl.app/" 
                className="text-accent hover:text-accent/80 transition-colors font-medium"
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 10px rgba(29, 78, 216, 0.7)"
                }}
              >
                CI010
              </motion.a>
            </motion.p>
            
            <div className="flex space-x-6">
              <motion.a 
                href="https://github.com/Voxelum/x-minecraft-launcher" 
                className="text-white/60 hover:text-white transition-colors p-2 rounded-lg bg-white/5 hover:bg-white/10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </motion.a>
              
              <motion.a 
                href="https://discord.gg/W5XVwYY7GQ" 
                className="text-white/60 hover:text-white transition-colors p-2 rounded-lg bg-white/5 hover:bg-white/10"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 127.14 96.36" fill="currentColor">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
