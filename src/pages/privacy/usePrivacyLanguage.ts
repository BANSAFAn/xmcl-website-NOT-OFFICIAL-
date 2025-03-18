
import { useState, useEffect } from "react";
import { LanguageKey, privacyTranslations } from "./translations";
import { useLanguage } from "@/components/navbar/LanguageContext";

export function usePrivacyLanguage() {
  const { currentLanguage } = useLanguage();
  const [content, setContent] = useState(privacyTranslations.en);
  
  useEffect(() => {
    setContent(privacyTranslations[currentLanguage as LanguageKey] || privacyTranslations.en);
  }, [currentLanguage]);
  
  return {
    currentLanguage,
    content
  };
}
