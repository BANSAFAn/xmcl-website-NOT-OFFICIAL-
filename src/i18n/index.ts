import type { SupportedLocale, Translations } from '@/types/i18n';
import { languageConfigs } from './languageConfigs';

export const DEFAULT_LOCALE: SupportedLocale = 'en';

const supportedLocales = new Set(languageConfigs.map(lang => lang.code));

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.has(locale as SupportedLocale);
}

const translationsCache = new Map<SupportedLocale, Promise<Translations>>();

export function loadTranslations(locale: SupportedLocale): Promise<Translations> {
  if (!isSupportedLocale(locale)) {
    console.warn(`Attempted to load unsupported locale: ${locale}`);
    return Promise.resolve({});
  }

  if (translationsCache.has(locale)) {
    return translationsCache.get(locale)!;
  }

  const translationPromise = import(`@/translations/${locale}.json`)
    .then(module => module.default)
    .catch(error => {
      console.error(`Failed to load translations for ${locale}:`, error);
      translationsCache.delete(locale); // Remove from cache on failure
      if (locale !== DEFAULT_LOCALE) {
        console.log(`Falling back to default locale: ${DEFAULT_LOCALE}`);
        return loadTranslations(DEFAULT_LOCALE);
      }
      return {}; // Return empty object if default locale also fails
    });

  translationsCache.set(locale, translationPromise);
  return translationPromise;
}

export function clearTranslationsCache() {
  translationsCache.clear();
}