import type { Translations, SupportedLocale, LanguageConfig } from '@/types/i18n';
import { navigationTranslations } from '@/locales/modules/navigation';
import { commonTranslations } from '@/locales/modules/common';
import { homeTranslations } from '@/locales/modules/home';
import { downloadTranslations, downloadMessagesTranslations } from '@/locales/modules/downloads';
import { footerTranslations } from '@/locales/modules/footer';
import { statsTranslations } from '@/locales/modules/stats';
import { issuesTranslations } from '@/locales/modules/issues';
import { blogTranslations } from '@/locales/modules/blog';
import { guideTranslations } from '@/locales/modules/guide';
import { changelogTranslations } from '@/locales/modules/changelog';
import { testingTranslations } from '@/locales/modules/testing';
import { themeTranslations, osSwitchTranslations } from '@/locales/modules/theme';
import { uiTranslations } from '@/locales/modules/ui';
import { docsTranslations } from '@/locales/modules/docs';

// Language configurations
export const languageConfigs: LanguageConfig[] = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺', color: 'from-blue-500 to-red-500' },
  { code: 'en', name: 'English', flag: '🇺🇸', color: 'from-blue-500 to-red-500' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', color: 'from-white to-red-500' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦', color: 'from-blue-500 to-yellow-400' },
  { code: 'zh', name: '中文', flag: '🇨🇳', color: 'from-red-600 to-yellow-400' }
] as const;

// Build complete translations by merging all modular translations
function buildTranslations(): Record<SupportedLocale, Translations> {
  const translations: Record<SupportedLocale, Translations> = {} as Record<SupportedLocale, Translations>;

  for (const locale of ['en', 'ru', 'ja', 'zh', 'uk'] as SupportedLocale[]) {
    translations[locale] = {
      // Modular translations
      nav: navigationTranslations[locale],
      common: commonTranslations[locale],
      home: homeTranslations[locale],
      downloadSection: downloadTranslations[locale],
      downloadMessages: downloadMessagesTranslations[locale],
      footer: footerTranslations[locale],
      stats: statsTranslations[locale],
      issues: issuesTranslations[locale],
      blog: blogTranslations[locale],
      guide: guideTranslations[locale],
      changelog: changelogTranslations[locale],
      testing: testingTranslations[locale],
      theme: themeTranslations[locale],
      osSwitch: osSwitchTranslations[locale],
      ui: uiTranslations[locale],
      docs: docsTranslations[locale],

      // Basic app information based on locale
      downloadXMCL: getDownloadXMCLText(locale),
      modernCrossplatformDescription: getModernDescText(locale),
      githubStars: getGitHubStarsText(locale),
      forks: getForksText(locale),
      lastVersion: getLastVersionText(locale)
    };
  }

  return translations;
}

function getDownloadXMCLText(locale: SupportedLocale): string {
  const texts = {
    en: "Download XMCL",
    ru: "Скачать XMCL",
    ja: "XMCLをダウンロード",
    zh: "下载XMCL",
    uk: "Завантажити XMCL"
  };
  return texts[locale];
}

function getModernDescText(locale: SupportedLocale): string {
  const texts = {
    en: "Modern cross-platform Minecraft launcher",
    ru: "Современный кроссплатформенный лаунчер Minecraft",
    ja: "モダンなクロスプラットフォームMinecraftランチャー",
    zh: "现代跨平台Minecraft启动器",
    uk: "Сучасний кросплатформенний лаунчер Minecraft"
  };
  return texts[locale];
}

function getGitHubStarsText(locale: SupportedLocale): string {
  const texts = {
    en: "GitHub Stars",
    ru: "Звёзды GitHub",
    ja: "GitHubスター",
    zh: "GitHub星标",
    uk: "Зірки GitHub"
  };
  return texts[locale];
}

function getForksText(locale: SupportedLocale): string {
  const texts = {
    en: "Forks",
    ru: "Форки",
    ja: "フォーク",
    zh: "分支",
    uk: "Форки"
  };
  return texts[locale];
}

function getLastVersionText(locale: SupportedLocale): string {
  const texts = {
    en: "Latest Version",
    ru: "Последняя версия",
    ja: "最新バージョン",
    zh: "最新版本",
    uk: "Остання версія"
  };
  return texts[locale];
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

// Async function to get translations (for compatibility with existing code)
export async function getTranslations(locale: SupportedLocale): Promise<Translations> {
  return translations[locale];
}

// Helper to check if locale is supported
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return ['en', 'ru', 'ja', 'zh', 'uk'].includes(locale);
}

// Default locale
export const DEFAULT_LOCALE: SupportedLocale = 'en';
