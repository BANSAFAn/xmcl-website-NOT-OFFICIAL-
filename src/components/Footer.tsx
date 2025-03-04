
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Footer() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  

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
      copyright: "© 2022-2025 X Minecraft Launcher. Website by moderator Baneronetwo. Launcher created by",
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
      copyright: "© 2022-2025 X Minecraft Launcher. Сайт создан модератором Baneronetwo. Лаунчер создан",
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
      copyright: "© 2022-2025 X Minecraft Launcher. Сайт створено модератором Baneronetwo. Лаунчер створено",
    }
  };

  const text = translations[currentLanguage as keyof typeof translations] || translations.en;

  return (
    <footer className="bg-minecraft-darker-blue border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src="/XMCL/a39086fb-5549-43c0-a69e-217c717d938e.png" alt="X Minecraft Launcher" className="h-8 w-8" />
              <span className="font-bold text-lg">X Minecraft Launcher</span>
            </Link>
            <p className="text-white/60 text-sm">
              {text.description}
            </p>
            <div className="bg-white/10 rounded-md p-3 text-sm text-white/70">
              <p>{text.disclaimer}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">{text.navigation}</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://xmcl.app/en/guide/install" className="text-white/60 hover:text-white transition-colors">
                  {text.guide}
                </a>
              </li>
              <li>
                <a href="https://xmcl.app/en/privacy" className="text-white/60 hover:text-white transition-colors">
                  {text.privacy}
                </a>
              </li>
              <li>
                <a href="https://xmcl.app/en/changelogs/0.49.1" className="text-white/60 hover:text-white transition-colors">
                  {text.changelogs}
                </a>
              </li>
              <li>
                <a href="https://xmcl.app/en/blog/" className="text-white/60 hover:text-white transition-colors">
                  {text.blogs}
                </a>
              </li>
              <li>
                <a href="https://xmcl.app/en/core/" className="text-white/60 hover:text-white transition-colors">
                  {text.coreDocument}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">{text.resources}</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/Voxelum/x-minecraft-launcher" className="text-white/60 hover:text-white transition-colors">
                  {text.github}
                </a>
              </li>
              <li>
                <a href="https://discord.gg/W5XVwYY7GQ" className="text-white/60 hover:text-white transition-colors">
                  {text.discord}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">{text.websiteSource}</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/Baneronetwo" className="text-white/60 hover:text-white transition-colors">
                  {text.author}
                </a>
              </li>
              <li>
                <a href="https://github.com/BANSAFAn/xmcl-website-NOT-OFFICIAL-" className="text-white/60 hover:text-white transition-colors">
                  {text.viewSource}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm mb-4 md:mb-0">
            {text.copyright}{" "}
            <motion.a 
              href="https://xmcl.app/" 
              className="text-accent hover:text-accent/80 transition-colors"
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 8px rgba(29, 78, 216, 0.7)",
              }}
            >
              CI010
            </motion.a>
          </p>
          
          <div className="flex space-x-4">
            <a href="https://github.com/Voxelum/x-minecraft-launcher" className="text-white/60 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            
            <a href="https://discord.gg/W5XVwYY7GQ" className="text-white/60 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 127.14 96.36" fill="currentColor">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
