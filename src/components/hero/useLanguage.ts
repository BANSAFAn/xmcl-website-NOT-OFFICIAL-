
import { useState, useEffect } from 'react';
import { useLanguage as useGlobalLanguage } from '@/components/navbar/LanguageContext';
import { heroTranslations, LanguageKey } from './translations';

export function useLanguage() {
  const { currentLanguage } = useGlobalLanguage();
  const [text, setText] = useState(heroTranslations[currentLanguage as LanguageKey] || heroTranslations.en);

  useEffect(() => {
    const updateText = () => {
      setText(heroTranslations[currentLanguage as LanguageKey] || heroTranslations.en);
    };

    updateText();

    // Listen for language change events
    const handleLanguageChange = () => {
      updateText();
    };

    window.addEventListener('languageChange', handleLanguageChange);
    window.addEventListener('languageUpdated', handleLanguageChange);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
      window.removeEventListener('languageUpdated', handleLanguageChange);
    };
  }, [currentLanguage]);

  return { text };
}
