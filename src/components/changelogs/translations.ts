
export type TranslationKey = 'en' | 'ru' | 'uk' | 'zh';

export interface ChangelogTranslations {
  title: string;
  subtitle: string;
  version: string;
  released: string;
  viewOnGithub: string;
  loading: string;
  error: string;
}

export const translations: Record<TranslationKey, ChangelogTranslations> = {
  en: {
    title: "Changelogs",
    subtitle: "Stay up to date with the latest improvements and fixes to X Minecraft Launcher",
    version: "Version",
    released: "Released",
    viewOnGithub: "View on GitHub",
    loading: "Loading releases...",
    error: "Failed to load releases. Please try again later.",
  },
  ru: {
    title: "История изменений",
    subtitle: "Будьте в курсе последних улучшений и исправлений X Minecraft Launcher",
    version: "Версия",
    released: "Выпущено",
    viewOnGithub: "Посмотреть на GitHub",
    loading: "Загрузка релизов...",
    error: "Не удалось загрузить релизы. Пожалуйста, попробуйте позже.",
  },
  uk: {
    title: "Історія змін",
    subtitle: "Будьте в курсі останніх покращень та виправлень X Minecraft Launcher",
    version: "Версія",
    released: "Випущено",
    viewOnGithub: "Переглянути на GitHub",
    loading: "Завантаження релізів...",
    error: "Не вдалося завантажити релізи. Будь ласка, спробуйте пізніше.",
  },
  zh: {
    title: "更新日志",
    subtitle: "了解 X Minecraft Launcher 的最新改进和修复",
    version: "版本",
    released: "发布日期",
    viewOnGithub: "在 GitHub 上查看",
    loading: "正在加载发布信息...",
    error: "加载发布信息失败。请稍后再试。",
  }
};
