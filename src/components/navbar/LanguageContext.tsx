
import React, { createContext, useContext } from 'react';
import { LanguageCode, Translations, LanguageContextProps, LanguageProviderProps } from './languageTypes';
import { defaultTranslations, languages } from './languageData';
import { useLanguageStorage } from './useLanguageUtils';

// Re-export the language data and types for external use
export type { LanguageCode, Translations };
export { languages };

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Use the custom hook for language storage
  const { currentLanguage, setCurrentLanguage } = useLanguageStorage();
  
  // Get translations for the current language
  const translations = defaultTranslations[currentLanguage];
  
  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      setCurrentLanguage,
      translations
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
