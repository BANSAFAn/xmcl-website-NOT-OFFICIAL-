
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { SupportedLocale, Translations } from '@/types/i18n';
import { loadTranslations, DEFAULT_LOCALE, isSupportedLocale, clearTranslationsCache } from '@/i18n';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import { languageConfigs } from '@/i18n/languageConfigs';

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

  const [allTranslations, setAllTranslations] = useState<Map<SupportedLocale, Translations>>(new Map());
  const [currentTranslations, setCurrentTranslations] = useState<Translations | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const loadAllTranslations = async () => {
      setIsLoading(true);
      try {
        const promises = languageConfigs.map(lang => 
          loadTranslations(lang.code).then(trans => ({ code: lang.code, trans }))
        );
        const results = await Promise.all(promises);
        
        if (!isCancelled) {
          const map = new Map(results.map(r => [r.code, r.trans]));
          setAllTranslations(map);
          setCurrentTranslations(map.get(locale) || map.get(DEFAULT_LOCALE)!);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error('Failed to load translations:', error);
          // fallback to default
          loadTranslations(DEFAULT_LOCALE).then(fallback => {
            if (!isCancelled) {
              setAllTranslations(new Map([[DEFAULT_LOCALE, fallback]]));
              setCurrentTranslations(fallback);
            }
          });
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };
    
    loadAllTranslations();

    return () => {
      isCancelled = true;
      clearTranslationsCache();
    };
  }, []);

  const changeLanguage = (newLocale: SupportedLocale) => {
    if (allTranslations.has(newLocale)) {
      setLocale(newLocale);
      setCurrentTranslations(allTranslations.get(newLocale)!);
      localStorage.setItem('language', newLocale);
      document.documentElement.lang = newLocale;
    }
  };

  // Translation helper function
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

    const englishTranslations = allTranslations.get(DEFAULT_LOCALE);

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

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

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
