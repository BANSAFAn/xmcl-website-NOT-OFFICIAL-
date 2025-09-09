
import type { SupportedLocale } from '@/types/i18n';

export interface ThemeTranslations {
  light: string;
  dark: string;
  system: string;
}

export interface OSSwitchTranslations {
  switchedTo: string;
  availableFor: string;
}

export const themeTranslations: Record<SupportedLocale, ThemeTranslations> = {
  en: {
    light: "Light",
    dark: "Dark",
    system: "System"
  },
  ru: {
    light: "Светлая",
    dark: "Тёмная",
    system: "Системная"
  },
  ja: {
    light: "ライト",
    dark: "ダーク",
    system: "システム"
  },
  zh: {
    light: "浅色",
    dark: "深色",
    system: "系统"
  },
  uk: {
    light: "Світла",
    dark: "Темна",
    system: "Системна"
  }
};

export const osSwitchTranslations: Record<SupportedLocale, OSSwitchTranslations> = {
  en: {
    switchedTo: "Switched to",
    availableFor: "Available for"
  },
  ru: {
    switchedTo: "Переключено на",
    availableFor: "Доступно для"
  },
  ja: {
    switchedTo: "切り替え先",
    availableFor: "利用可能"
  },
  zh: {
    switchedTo: "切换到",
    availableFor: "可用于"
  },
  uk: {
    switchedTo: "Переключено на",
    availableFor: "Доступно для"
  }
};
