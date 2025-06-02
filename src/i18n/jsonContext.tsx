import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, I18nTranslations } from './types';
import { getTranslationsForLanguage, loadTranslations } from './jsonLoader';

interface I18nContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: I18nTranslations;
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function JsonI18nProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [translations, setTranslations] = useState<Record<LanguageCode, I18nTranslations>>({} as Record<LanguageCode, I18nTranslations>);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Загрузка переводов при первом рендере
  useEffect(() => {
    const fetchTranslations = async () => {
      setIsLoading(true);
      try {
        const data = await loadTranslations();
        setTranslations(data);
      } catch (error) {
        console.error('Failed to load translations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranslations();
  }, []);

  // Установка языка из localStorage при загрузке
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as LanguageCode;
    if (savedLang && translations[savedLang]) {
      setCurrentLanguage(savedLang);
    }
  }, [translations]);

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

  // Используем английский язык по умолчанию, если текущий язык не найден
  const currentTranslations = translations[currentLanguage] || translations['en'] || {} as I18nTranslations;

  const contextValue = {
    currentLanguage,
    setLanguage,
    t: currentTranslations,
    isLoading
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

export function useJsonI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useJsonI18n must be used within a JsonI18nProvider');
  }
  return context;
}