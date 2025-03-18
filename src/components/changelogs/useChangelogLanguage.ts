
import { useState, useEffect } from 'react';
import { translations, TranslationKey } from './translations';

export function useChangelogLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<TranslationKey>('en');
  
  useEffect(() => {
    const updateLanguage = () => {
      const savedLang = localStorage.getItem('language') || 'en';
      setCurrentLanguage(savedLang as TranslationKey);
    };
    
    updateLanguage();
    
    window.addEventListener('storage', updateLanguage);
    window.addEventListener('languageChange', updateLanguage);
    
    return () => {
      window.removeEventListener('storage', updateLanguage);
      window.removeEventListener('languageChange', updateLanguage);
    };
  }, []);

  const text = translations[currentLanguage] || translations.en;
  
  return { currentLanguage, text };
}
