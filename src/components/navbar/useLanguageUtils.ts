
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
    
    // Ensure all components get notified of language change
    // Use a CustomEvent to allow passing data with the event
    const event = new CustomEvent('languageChange', { detail: { language: lang } });
    window.dispatchEvent(event);
    
    // Dispatch storage event for other tabs/windows
    window.dispatchEvent(new StorageEvent('storage', { key: 'language', newValue: lang }));
    
    // Force a re-render of the entire application
    document.documentElement.setAttribute('lang', lang);
    
    // Update any components that might be using redux or other state management
    window.dispatchEvent(new Event('languageUpdated'));
  };
  
  return { currentLanguage, setCurrentLanguage: handleLanguageChange };
}

// Helper function to validate language codes
function isValidLanguage(lang: string): lang is LanguageCode {
  return ['en', 'ru', 'uk', 'zh', 'de', 'ja'].includes(lang);
}
