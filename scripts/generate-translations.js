/**
 * Скрипт для объединения всех модульных переводов в один JSON-файл для каждого языка
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем текущую директорию для ES модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Поддерживаемые локали
const SUPPORTED_LOCALES = ['en', 'ru', 'ja', 'zh', 'uk', 'ar', 'de', 'zh-Hant'];

// Пути к файлам
const MODULES_DIR = path.join(__dirname, '../src/locales/modules');
const JSON_DIR = path.join(__dirname, '../src/locales/json');
const OUTPUT_DIR = path.join(__dirname, '../src/locales/json');

// Функция для получения текста в зависимости от локали
function getLocalizedText(texts, locale) {
  return texts[locale] || texts['en']; // Используем английский как запасной вариант
}

// Функция для получения базовой информации о приложении
function getBasicAppInfo(locale) {
  const downloadXMCLTexts = {
    en: "Download XMCL",
    ru: "Скачать XMCL",
    ja: "XMCLをダウンロード",
    zh: "下载XMCL",
    uk: "Завантажити XMCL",
    ar: "تحميل XMCL",
    de: "XMCL herunterladen",
    'zh-Hant': "下載XMCL"
  };

  const modernDescTexts = {
    en: "Modern cross-platform Minecraft launcher",
    ru: "Современный кроссплатформенный лаунчер Minecraft",
    ja: "モダンなクロスプラットフォームMinecraftランチャー",
    zh: "现代跨平台Minecraft启动器",
    uk: "Сучасний кросплатформенний лаунчер Minecraft",
    ar: "مشغل ماين كرافت حديث متعدد المنصات",
    de: "Moderner plattformübergreifender Minecraft-Launcher",
    'zh-Hant': "現代跨平台Minecraft啟動器"
  };

  const githubStarsTexts = {
    en: "GitHub Stars",
    ru: "Звёзды GitHub",
    ja: "GitHubスター",
    zh: "GitHub星标",
    uk: "Зірки GitHub",
    ar: "نجوم GitHub",
    de: "GitHub Sterne",
    'zh-Hant': "GitHub星標"
  };

  const forksTexts = {
    en: "Forks",
    ru: "Форки",
    ja: "フォーク",
    zh: "分支",
    uk: "Форки",
    ar: "تفريعات",
    de: "Forks",
    'zh-Hant': "分支"
  };

  const lastVersionTexts = {
    en: "Latest Version",
    ru: "Последняя версия",
    ja: "最新バージョン",
    zh: "最新版本",
    uk: "Остання версія",
    ar: "أحدث إصدار",
    de: "Neueste Version",
    'zh-Hant': "最新版本"
  };

  return {
    downloadXMCL: getLocalizedText(downloadXMCLTexts, locale),
    modernCrossplatformDescription: getLocalizedText(modernDescTexts, locale),
    githubStars: getLocalizedText(githubStarsTexts, locale),
    forks: getLocalizedText(forksTexts, locale),
    lastVersion: getLocalizedText(lastVersionTexts, locale)
  };
}

// Функция для загрузки модульных переводов
async function loadModuleTranslations() {
  // Получаем список всех файлов в директории modules
  const files = fs.readdirSync(MODULES_DIR).filter(file => file.endsWith('.ts'));
  
  // Создаем объект для хранения всех переводов
  const allTranslations = {};
  
  // Инициализируем объект для каждой локали
  SUPPORTED_LOCALES.forEach(locale => {
    allTranslations[locale] = {};
  });

  // Обрабатываем каждый файл модуля
  for (const file of files) {
    const filePath = path.join(MODULES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Извлекаем имя модуля из имени файла
    const moduleName = path.basename(file, '.ts');
    
    // Ищем объекты переводов в файле
    const exportMatches = content.match(/export const ([a-zA-Z0-9]+Translations)\s*:\s*Record<SupportedLocale,\s*[a-zA-Z0-9]+>/g) || [];
    
    for (const exportMatch of exportMatches) {
      // Извлекаем имя переменной с переводами
      const varNameMatch = exportMatch.match(/export const ([a-zA-Z0-9]+Translations)/);
      if (!varNameMatch) continue;
      
      const varName = varNameMatch[1];
      
      // Определяем имя секции в JSON на основе имени переменной
      let sectionName = varName.replace('Translations', '');
      
      // Специальная обработка для некоторых модулей
      if (sectionName === 'download') sectionName = 'downloadSection';
      if (sectionName === 'downloadMessages') sectionName = 'downloadMessages';
      if (sectionName === 'osSwitch') sectionName = 'osSwitch';
      
      // Ищем объект с переводами для этой переменной
      const translationsMatch = content.match(new RegExp(`export const ${varName}[\s\S]*?=\s*{([\s\S]*?)}\s*;`));
      if (!translationsMatch) continue;
      
      const translationsBlock = translationsMatch[1];
      
      // Обрабатываем каждую локаль
      for (const locale of SUPPORTED_LOCALES) {
        // Ищем блок переводов для текущей локали
        const localeMatch = translationsBlock.match(new RegExp(`${locale}\s*:\s*{([\s\S]*?)}\s*,?\s*(?:${SUPPORTED_LOCALES.join('|')}|$)`));
        if (!localeMatch) continue;
        
        const localeBlock = localeMatch[1];
        
        // Извлекаем пары ключ-значение
        const keyValuePairs = localeBlock.match(/([a-zA-Z0-9_]+)\s*:\s*"([^"]*)"/g) || [];
        
        // Создаем объект для текущей секции, если его еще нет
        if (!allTranslations[locale][sectionName]) {
          allTranslations[locale][sectionName] = {};
        }
        
        // Добавляем пары ключ-значение в объект переводов
        for (const pair of keyValuePairs) {
          const [key, value] = pair.split(/\s*:\s*"/);
          if (key && value) {
            const cleanValue = value.replace(/"\s*,?$/, '');
            allTranslations[locale][sectionName][key] = cleanValue;
          }
        }
      }
    }
  }
  
  return allTranslations;
}

// Функция для объединения всех переводов в один JSON-файл для каждой локали
async function generateTranslationFiles() {
  try {
    // Загружаем модульные переводы
    const moduleTranslations = await loadModuleTranslations();
    
    // Создаем директорию для выходных файлов, если она не существует
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    
    // Обрабатываем каждую локаль
    for (const locale of SUPPORTED_LOCALES) {
      // Получаем базовую информацию о приложении
      const basicAppInfo = getBasicAppInfo(locale);
      
      // Объединяем все переводы
      const translations = {
        ...moduleTranslations[locale],
        ...basicAppInfo
      };
      
      // Записываем в файл
      const outputPath = path.join(OUTPUT_DIR, `${locale}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2), 'utf8');
      
      console.log(`Generated translation file for ${locale}: ${outputPath}`);
    }
    
    console.log('All translation files generated successfully!');
  } catch (error) {
    console.error('Error generating translation files:', error);
  }
}

// Запускаем генерацию файлов переводов
generateTranslationFiles();