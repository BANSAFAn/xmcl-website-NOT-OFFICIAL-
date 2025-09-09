
import type { SupportedLocale, Translations } from '@/types/i18n';
import { translations } from '@/locales';

export const DEFAULT_LOCALE: SupportedLocale = 'en';

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return ['en', 'ru', 'ja', 'zh', 'uk'].includes(locale);
}

export async function getTranslations(locale: SupportedLocale): Promise<Translations> {
  // Return the built translations from the modular system
  return translations[locale];
}

export function getTranslation(
  locale: SupportedLocale,
  key: string,
  fallback: string = key
): string {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return fallback;
    }
  }
  
  return typeof value === 'string' ? value : fallback;
}
