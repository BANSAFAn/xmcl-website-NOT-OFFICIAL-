
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Language data with translations
export const languages = [
  { 
    code: 'en', 
    name: 'English',
    translations: {
      guide: 'Guide',
      privacy: 'Privacy',
      changelogs: 'Changelogs',
      blogs: 'Blogs',
      coreDocument: 'Core Document',
      changeLanguage: 'Change Language',
      githubRepo: 'GitHub Repository',
      discordServer: 'Discord Server',
      download: 'Download v0.49.1'
    }
  },
  { 
    code: 'ru', 
    name: 'Русский',
    translations: {
      guide: 'Руководство',
      privacy: 'Конфиденциальность',
      changelogs: 'Изменения',
      blogs: 'Блоги',
      coreDocument: 'Основной документ',
      changeLanguage: 'Изменить язык',
      githubRepo: 'Репозиторий GitHub',
      discordServer: 'Сервер Discord',
      download: 'Скачать v0.49.1'
    }
  },
  { 
    code: 'uk', 
    name: 'Українська',
    translations: {
      guide: 'Посібник',
      privacy: 'Конфіденційність',
      changelogs: 'Зміни',
      blogs: 'Блоги',
      coreDocument: 'Основний документ',
      changeLanguage: 'Змінити мову',
      githubRepo: 'Репозиторій GitHub',
      discordServer: 'Сервер Discord',
      download: 'Завантажити v0.49.1'
    }
  }
];

export type Translation = typeof languages[0]['translations'];

interface LanguageContextType {
  currentLanguage: string;
  setCurrentLanguage: (code: string) => void;
  translations: Translation;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  setCurrentLanguage: () => {},
  translations: languages[0].translations
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState<Translation>(languages[0].translations);
  
  // Initialize language based on localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLang);
    const langData = languages.find(l => l.code === savedLang) || languages[0];
    setTranslations(langData.translations);
  }, []);

  const changeLanguage = (code: string) => {
    setCurrentLanguage(code);
    localStorage.setItem('language', code);
    
    // Update translations
    const langData = languages.find(l => l.code === code) || languages[0];
    setTranslations(langData.translations);
    
    // Dispatch custom event for immediate updates in other components
    window.dispatchEvent(new Event('languageChange'));
    
    // Also dispatch storage event for components listening to storage
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'language',
      newValue: code
    }));
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage: changeLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
