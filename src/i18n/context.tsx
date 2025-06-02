
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, I18nTranslations } from './types';
import { translations } from './translations';

interface I18nContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: I18nTranslations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as LanguageCode;
    if (savedLang && translations[savedLang]) {
      setCurrentLanguage(savedLang);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Dispatch events for compatibility with existing components
    const event = new CustomEvent('languageChange', { 
      detail: { language: lang },
      bubbles: true
    });
    window.dispatchEvent(event);
    document.dispatchEvent(event);
    
    document.documentElement.setAttribute('lang', lang);
    
    setTimeout(() => {
      window.dispatchEvent(new StorageEvent('storage', { 
        key: 'language', 
        newValue: lang,
        oldValue: localStorage.getItem('language')
      }));
      
      window.dispatchEvent(new CustomEvent('languageUpdated', { 
        detail: { language: lang }
      }));
    }, 10);
  };

  const contextValue = {
    currentLanguage,
    setLanguage,
    t: translations[currentLanguage],
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
