import type { SupportedLocale, Translations } from '@/types/i18n';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import ja from '@/locales/ja.json';
import zh from '@/locales/zh.json';
import uk from '@/locales/uk.json';

// Cache for loaded translations
const translationsCache: Map<SupportedLocale, Translations> = new Map();

// Deep merge utility functions
function isPlainObject(obj: any): obj is Record<string, any> {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

function deepMerge(base: any, override: any): any {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override !== undefined ? override : base;
  }

  const result = { ...base };
  for (const key in override) {
    if (Object.prototype.hasOwnProperty.call(override, key)) {
      result[key] = deepMerge(base[key], override[key]);
    }
  }
  return result;
}

const LOCALES: Record<SupportedLocale, Translations> = {
  en: en as Translations,
  ru: ru as Translations,
  ja: ja as Translations,
  zh: zh as Translations,
  uk: uk as Translations,
};

export async function loadTranslations(locale: SupportedLocale): Promise<Translations> {
  if (translationsCache.has(locale)) {
    return translationsCache.get(locale)!;
  }

  const english = LOCALES.en;
  translationsCache.set('en', english);

  if (locale === 'en') {
    return english;
  }

  const selected = LOCALES[locale] ?? {};
  const merged = deepMerge(english, selected) as Translations;
  translationsCache.set(locale, merged);
  return merged;
}

export function clearTranslationsCache(): void {
  translationsCache.clear();
}

export const DEFAULT_LOCALE: SupportedLocale = 'en';

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return ['en', 'ru', 'ja', 'zh', 'uk'].includes(locale);
}
