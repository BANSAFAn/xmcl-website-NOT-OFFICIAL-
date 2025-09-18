
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { SupportedLocale, Translations } from '@/types/i18n';
import { loadTranslations, DEFAULT_LOCALE, isSupportedLocale, clearTranslationsCache } from '@/i18n';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

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
  const [englishTranslations, setEnglishTranslations] = useState<Translations | null>(null);

  // Load translations when locale changes
  useEffect(() => {
    const loadLocaleTranslations = async () => {
      try {
        setIsLoading(true);
        clearTranslationsCache();
        const [en, selected] = await Promise.all([
          loadTranslations(DEFAULT_LOCALE),
          locale === DEFAULT_LOCALE ? Promise.resolve(null) : loadTranslations(locale)
        ]);
        setEnglishTranslations(en);
        setCurrentTranslations(locale === DEFAULT_LOCALE ? en : (selected ?? en));
      } catch (error) {
        console.error('Failed to load translations:', error);
        try {
          const enFallback = await loadTranslations(DEFAULT_LOCALE);
          setEnglishTranslations(enFallback);
          setCurrentTranslations(enFallback);
        } catch (fallbackError) {
          console.error('Failed to load fallback translations:', fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadLocaleTranslations();
  }, [locale]);

  const changeLanguage = (newLocale: SupportedLocale) => {
    setLocale(newLocale);
    localStorage.setItem('language', newLocale);
    
    // Update document language
    document.documentElement.lang = newLocale;
  };

  // Translation helper function with English fallback
  const t = (key: string, fallback?: string): string => {
    if (!currentTranslations) {
      return fallback || key;
    }

    const getValue = (translations: Translations, keyPath: string): string | null => {
      const keys = keyPath.split('.');
      let value: any = translations;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return null;
        }
      }
      return typeof value === 'string' ? value : null;
    };

    const currentValue = getValue(currentTranslations, key);
    if (currentValue !== null) {
      return currentValue;
    }

    if (englishTranslations) {
      const enValue = getValue(englishTranslations, key);
      if (enValue !== null) {
        return enValue;
      }
    }

    if (import.meta.env.DEV) {
      console.warn(`Missing translation for key "${key}" in locale "${locale}"`);
    }
    return fallback || key;
  };

  // Set document language on mount and locale change
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Show loading state while translations are loading
  if (isLoading || !currentTranslations) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center" aria-busy="true" aria-live="polite">
        <div className="w-[300px] sm:w-[380px] rounded-xl border bg-card/70 backdrop-blur p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden="true" />
            <span className="text-sm text-muted-foreground">Loading interface… (lang: {locale})</span>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
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
