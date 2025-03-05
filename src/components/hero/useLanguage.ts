
import { useState, useEffect } from "react";
import { translations, LanguageCode, TranslationsType } from "./translations";

export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [text, setText] = useState(translations.en);
  
  // Initialize language based on localStorage and add listener for changes
  useEffect(() => {
    const updateLanguage = () => {
      const savedLang = localStorage.getItem('language') || 'en';
      const langCode = savedLang as LanguageCode;
      setCurrentLanguage(langCode);
      setText(translations[langCode] || translations.en);
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

  return { currentLanguage, text };
}
