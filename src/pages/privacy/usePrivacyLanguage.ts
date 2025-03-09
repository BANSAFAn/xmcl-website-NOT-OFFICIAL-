
import { useState, useEffect } from "react";
import { LanguageKey, privacyTranslations } from "./translations";

export function usePrivacyLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageKey>('en');
  
  useEffect(() => {
    const handleLanguageChange = () => {
      const savedLang = localStorage.getItem('language') || 'en';
      setCurrentLanguage(savedLang as LanguageKey);
    };
    
    handleLanguageChange();
    window.addEventListener('languageChange', handleLanguageChange);
    window.addEventListener('storage', (e) => {
      if (e.key === 'language') {
        handleLanguageChange();
      }
    });
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, []);
  
  return {
    currentLanguage,
    content: privacyTranslations[currentLanguage]
  };
}
