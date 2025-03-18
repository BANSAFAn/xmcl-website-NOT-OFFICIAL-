
import { useState, useEffect } from "react";
import { translations, LanguageCode, TranslationsType } from "./translations";
import { useLanguage as useNavbarLanguage } from "../navbar/LanguageContext";

export function useLanguage() {
  const { currentLanguage } = useNavbarLanguage();
  const [text, setText] = useState(translations.en);
  
  // Update text when language changes
  useEffect(() => {
    setText(translations[currentLanguage as LanguageCode] || translations.en);
  }, [currentLanguage]);

  return { currentLanguage, text };
}
