
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
    
    // Broadcast immediate language change to all components
    const event = new CustomEvent('languageChange', { 
      detail: { language: lang },
      bubbles: true
    });
    window.dispatchEvent(event);
    
    // Also dispatch to document for broader reach
    document.dispatchEvent(event);
    
    // Force immediate re-render by updating DOM attribute
    document.documentElement.setAttribute('lang', lang);
    
    // Trigger storage event for cross-tab synchronization
    setTimeout(() => {
      window.dispatchEvent(new StorageEvent('storage', { 
        key: 'language', 
        newValue: lang,
        oldValue: localStorage.getItem('language')
      }));
    }, 0);
    
    // Additional event for components that might miss the first one
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('languageUpdated', { 
        detail: { language: lang }
      }));
    }, 10);
  };
  
  return { currentLanguage, setCurrentLanguage: handleLanguageChange };
}

// Helper function to validate language codes
function isValidLanguage(lang: string): lang is LanguageCode {
  return ['en', 'ru', 'uk', 'zh', 'de', 'ja', 'fr'].includes(lang);
}
