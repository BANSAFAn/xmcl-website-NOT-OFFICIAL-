import type { Translations, SupportedLocale, LanguageConfig } from '@/types/i18n';

// Импорт JSON-файлов переводов
import enJson from './json/en.json';
import ruJson from './json/ru.json';
import jaJson from './json/ja.json';
import zhJson from './json/zh.json';
import ukJson from './json/uk.json';
import arJson from './json/ar.json';
import deJson from './json/de.json';
import zhHantJson from './json/zh-Hant.json';

// Language configurations
export const languageConfigs: LanguageConfig[] = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺', color: 'from-blue-500 to-red-500' },
  { code: 'en', name: 'English', flag: '🇺🇸', color: 'from-blue-500 to-red-500' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', color: 'from-white to-red-500' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦', color: 'from-blue-500 to-yellow-400' },
  { code: 'zh', name: '中文', flag: '🇨🇳', color: 'from-red-600 to-yellow-400' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', color: 'from-green-500 to-white' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', color: 'from-black to-yellow-500 via-red-500' },
  { code: 'zh-Hant', name: '中文（繁體）', flag: '🇹🇼', color: 'from-blue-500 to-red-500' }
] as const;

// Build complete translations by loading from JSON files
function buildTranslations(): Record<SupportedLocale, Translations> {
  const translations: Record<SupportedLocale, Translations> = {} as Record<SupportedLocale, Translations>;

  // Загружаем переводы из JSON-файлов
  translations['en'] = enJson as Translations;
  translations['ru'] = ruJson as Translations;
  translations['ja'] = jaJson as Translations;
  translations['zh'] = zhJson as Translations;
  translations['uk'] = ukJson as Translations;
  translations['ar'] = arJson as Translations;
  translations['de'] = deJson as Translations;
  translations['zh-Hant'] = zhHantJson as Translations;

  return translations;
}

export const translations = buildTranslations();

// Helper function to get translation with fallback
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

// Helper to check if locale is supported
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return ['en', 'ru', 'ja', 'zh', 'uk', 'ar', 'de', 'zh-Hant'].includes(locale);
}

// Default locale
export const DEFAULT_LOCALE: SupportedLocale = 'en';