
import { useState, useEffect } from "react";
import { translations, LanguageCode, TranslationsType } from "./translations";
import { useLanguage as useNavbarLanguage } from "../navbar/LanguageContext";

export function useLanguage() {
  const { currentLanguage } = useNavbarLanguage();
  const [text, setText] = useState(translations.en);
  
  // Update text when language changes
  useEffect(() => {
    // Immediately update text when currentLanguage changes
    setText(translations[currentLanguage as LanguageCode] || translations.en);
    
    // Also listen for language change events for immediate updates
    const handleLanguageChange = (e: Event) => {
      const event = e as CustomEvent;
      const lang = event.detail?.language || currentLanguage;
      setText(translations[lang as LanguageCode] || translations.en);
    };
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, [currentLanguage]);

  return { currentLanguage, text };
}
