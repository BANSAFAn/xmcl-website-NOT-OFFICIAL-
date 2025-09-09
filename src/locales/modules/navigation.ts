
import type { SupportedLocale } from '@/types/i18n';

export interface NavigationTranslations {
  home: string;
  blog: string;
  guide: string;
  changelog: string;
  issues: string;
  testing: string;
}

export const navigationTranslations: Record<SupportedLocale, NavigationTranslations> = {
  en: {
    home: "Home",
    blog: "Blog",
    guide: "Guide",
    changelog: "Changelog",
    issues: "Issues",
    testing: "Testing"
  },
  ru: {
    home: "Главная",
    blog: "Блог",
    guide: "Руководство",
    changelog: "Журнал изменений",
    issues: "Проблемы",
    testing: "Тестирование"
  },
  ja: {
    home: "ホーム",
    blog: "ブログ",
    guide: "ガイド",
    changelog: "変更履歴",
    issues: "問題",
    testing: "テスト"
  },
  zh: {
    home: "首页",
    blog: "博客",
    guide: "指南",
    changelog: "更新日志",
    issues: "问题",
    testing: "测试"
  },
  uk: {
    home: "Головна",
    blog: "Блог",
    guide: "Керівництво",
    changelog: "Журнал змін",
    issues: "Проблеми",
    testing: "Тестування"
  }
};
