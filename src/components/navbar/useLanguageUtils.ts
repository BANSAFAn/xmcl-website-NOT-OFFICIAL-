
import { useState, useEffect } from 'react';
import { LanguageCode } from './languageTypes';

export function useLanguageStorage() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  
  // Initialize language based on localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && isValidLanguage(savedLang)) {
      setCurrentLanguage(savedLang as LanguageCode);
    }
  }, []);
  
  // Handles language change with local storage and events
  const handleLanguageChange = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Dispatch events to notify other components
    window.dispatchEvent(new Event('languageChange'));
    window.dispatchEvent(new StorageEvent('storage', { key: 'language', newValue: lang }));
  };
  
  return { currentLanguage, setCurrentLanguage: handleLanguageChange };
}

// Helper function to validate language codes
function isValidLanguage(lang: string): lang is LanguageCode {
  return ['en', 'ru', 'uk', 'zh', 'de', 'ja'].includes(lang);
}
