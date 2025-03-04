
import { useState, useEffect } from "react";
import { translations, LanguageCode, TranslationsType } from "./translations";

export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  
  // Initialize language based on localStorage and add listener for changes
  useEffect(() => {
    const updateLanguage = () => {
      const savedLang = localStorage.getItem('language') || 'en';
      setCurrentLanguage(savedLang as LanguageCode);
    };
    
    // Initial language set
    updateLanguage();
    
    // Listen for storage changes (from other components)
    window.addEventListener('storage', updateLanguage);
    
    // Custom event listener for immediate language updates
    window.addEventListener('languageChange', updateLanguage);
    
    return () => {
      window.removeEventListener('storage', updateLanguage);
      window.removeEventListener('languageChange', updateLanguage);
    };
  }, []);

  // Get current translation
  const text = translations[currentLanguage] || translations.en;

  return { currentLanguage, text };
}
