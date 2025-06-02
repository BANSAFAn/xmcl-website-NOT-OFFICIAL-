import { LanguageCode, I18nTranslations } from './types';

// Кэш для хранения загруженных переводов
let translationsCache: Record<LanguageCode, I18nTranslations> | null = null;

/**
 * Загружает переводы из JSON файла
 * @returns Promise с объектом переводов
 */
export async function loadTranslations(): Promise<Record<LanguageCode, I18nTranslations>> {
  if (translationsCache) {
    return translationsCache;
  }

  try {
    const response = await fetch('/translations.json');
    if (!response.ok) {
      throw new Error('Failed to fetch translations');
    }
    
    const translations = await response.json();
    translationsCache = translations;
    return translations;
  } catch (error) {
    console.error('Error loading translations:', error);
    // Возвращаем пустой объект в случае ошибки
    return {} as Record<LanguageCode, I18nTranslations>;
  }
}

/**
 * Получает переводы для конкретного языка
 * @param lang Код языка
 * @returns Promise с переводами для указанного языка или для английского языка по умолчанию
 */
export async function getTranslationsForLanguage(lang: LanguageCode): Promise<I18nTranslations> {
  const translations = await loadTranslations();
  return translations[lang] || translations['en'] || {} as I18nTranslations;
}

/**
 * Очищает кэш переводов
 */
export function clearTranslationsCache(): void {
  translationsCache = null;
}