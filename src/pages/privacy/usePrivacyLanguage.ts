
import { useState, useEffect } from "react";
import { LanguageKey, privacyTranslations } from "./translations";
import { useLanguage } from "@/components/navbar/LanguageContext";

export function usePrivacyLanguage() {
  const { currentLanguage } = useLanguage();
  const [content, setContent] = useState(privacyTranslations.en);
  
  useEffect(() => {
    // Update content immediately when language changes
    setContent(privacyTranslations[currentLanguage as LanguageKey] || privacyTranslations.en);
    
    // Also listen for direct language change events for immediate updates
    const handleLanguageChange = (e: Event) => {
      const event = e as CustomEvent;
      const lang = event.detail?.language || currentLanguage;
      setContent(privacyTranslations[lang as LanguageKey] || privacyTranslations.en);
    };
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, [currentLanguage]);
  
  return {
    currentLanguage,
    content
  };
}
