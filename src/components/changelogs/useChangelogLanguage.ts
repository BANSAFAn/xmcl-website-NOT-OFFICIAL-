
import { useState, useEffect } from 'react';
import { translations, TranslationKey } from './translations';

export function useChangelogLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<TranslationKey>('en');
  
  useEffect(() => {
    const updateLanguage = () => {
      const savedLang = localStorage.getItem('language') || 'en';
      setCurrentLanguage(savedLang as TranslationKey);
    };
    
    // Initial language setup
    updateLanguage();
    
    // Listen for custom language change events
    const handleLanguageChange = (e: Event) => {
      updateLanguage();
    };
    
    window.addEventListener('storage', updateLanguage);
    window.addEventListener('languageChange', handleLanguageChange);
    
    return () => {
      window.removeEventListener('storage', updateLanguage);
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const text = translations[currentLanguage] || translations.en;
  
  return { currentLanguage, text };
}
