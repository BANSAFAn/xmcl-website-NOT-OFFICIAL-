
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LanguageCode = 'en' | 'ru' | 'uk' | 'zh';

interface Translations {
  guide: string;
  guideLocal: string;
  privacy: string;
  changelogs: string;
  blogs: string;
  coreDocument: string;
  download: string;
  github: string;
  darkMode: string;
  lightMode: string;
  downloadNow: string;
  changeLanguage: string;
  githubRepo: string;
  discordServer: string;
}

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
  { code: 'uk', name: 'Українська' },
  { code: 'zh', name: '中文' }
];

const defaultTranslations: Record<LanguageCode, Translations> = {
  en: {
    guide: 'Documentation',
    guideLocal: 'Guide',
    privacy: 'Privacy Policy',
    changelogs: 'Changelogs',
    blogs: 'Blog',
    coreDocument: 'Core API',
    download: 'Download',
    github: 'GitHub',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    downloadNow: 'Download Now',
    changeLanguage: 'Change Language',
    githubRepo: 'GitHub Repository',
    discordServer: 'Discord Server'
  },
  ru: {
    guide: 'Документация',
    guideLocal: 'Гид',
    privacy: 'Конфиденциальность',
    changelogs: 'История изменений',
    blogs: 'Блог',
    coreDocument: 'API ядра',
    download: 'Скачать',
    github: 'GitHub',
    darkMode: 'Тёмная тема',
    lightMode: 'Светлая тема',
    downloadNow: 'Скачать сейчас',
    changeLanguage: 'Изменить язык',
    githubRepo: 'GitHub Репозиторий',
    discordServer: 'Discord Сервер'
  },
  uk: {
    guide: 'Документація',
    guideLocal: 'Гід',
    privacy: 'Конфіденційність',
    changelogs: 'Історія змін',
    blogs: 'Блог',
    coreDocument: 'API ядра',
    download: 'Завантажити',
    github: 'GitHub',
    darkMode: 'Темна тема',
    lightMode: 'Світла тема',
    downloadNow: 'Завантажити зараз',
    changeLanguage: 'Змінити мову',
    githubRepo: 'GitHub репозиторій',
    discordServer: 'Discord сервер'
  },
  zh: {
    guide: '文档',
    guideLocal: '指南',
    privacy: '隐私政策',
    changelogs: '更新日志',
    blogs: '博客',
    coreDocument: '核心 API',
    download: '下载',
    github: 'GitHub',
    darkMode: '深色模式',
    lightMode: '浅色模式',
    downloadNow: '立即下载',
    changeLanguage: '更改语言',
    githubRepo: 'GitHub 仓库',
    discordServer: 'Discord 服务器'
  }
};

interface LanguageContextProps {
  currentLanguage: LanguageCode;
  setCurrentLanguage: (lang: LanguageCode) => void;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  
  useEffect(() => {
    // Initialize language on component mount
    const savedLang = localStorage.getItem('language');
    if (savedLang && (savedLang === 'en' || savedLang === 'ru' || savedLang === 'uk' || savedLang === 'zh')) {
      setCurrentLanguage(savedLang as LanguageCode);
    }
  }, []);
  
  // Handle language change and notify other components
  const handleLanguageChange = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Dispatch events to notify other components about the language change
    window.dispatchEvent(new Event('languageChange'));
    window.dispatchEvent(new StorageEvent('storage', { key: 'language', newValue: lang }));
  };
  
  const translations = defaultTranslations[currentLanguage];
  
  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      setCurrentLanguage: handleLanguageChange,
      translations
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
