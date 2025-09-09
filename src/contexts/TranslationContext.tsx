
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { SupportedLocale, Translations } from '@/types/i18n';
import { getTranslations, DEFAULT_LOCALE, isSupportedLocale } from '@/locale';

interface TranslationContextType {
  locale: SupportedLocale;
  translations: Translations;
  changeLanguage: (locale: SupportedLocale) => void;
  t: (key: string, fallback?: string) => string;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [locale, setLocale] = useState<SupportedLocale>(() => {
    try {
      const saved = localStorage.getItem('language');
      if (saved && isSupportedLocale(saved)) {
        return saved;
      }
      
      const browserLang = navigator.language.split('-')[0];
      if (isSupportedLocale(browserLang)) {
        return browserLang;
      }
    } catch (error) {
      console.warn('Error accessing localStorage or navigator:', error);
    }
    
    return DEFAULT_LOCALE;
  });

  const [currentTranslations, setCurrentTranslations] = useState<Translations | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load translations when locale changes
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true);
        const translations = await getTranslations(locale);
        setCurrentTranslations(translations);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Load default English translations as fallback
        try {
          const fallbackTranslations = await getTranslations(DEFAULT_LOCALE);
          setCurrentTranslations(fallbackTranslations);
        } catch (fallbackError) {
          console.error('Failed to load fallback translations:', fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTranslations();
  }, [locale]);

  const changeLanguage = (newLocale: SupportedLocale) => {
    setLocale(newLocale);
    localStorage.setItem('language', newLocale);
    
    // Update document language
    document.documentElement.lang = newLocale;
  };

  // Translation helper function
  const t = (key: string, fallback?: string): string => {
    if (!currentTranslations) {
      return fallback || key;
    }

    const keys = key.split('.');
    let value: any = currentTranslations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback || key;
      }
    }
    
    return typeof value === 'string' ? value : (fallback || key);
  };

  // Set document language on mount and locale change
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Show loading state while translations are loading
  if (isLoading || !currentTranslations) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const value: TranslationContextType = {
    locale,
    translations: currentTranslations,
    changeLanguage,
    t,
    isLoading
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
