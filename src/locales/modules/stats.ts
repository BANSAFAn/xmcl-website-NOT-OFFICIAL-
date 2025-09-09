
import type { SupportedLocale } from '@/types/i18n';

export interface StatsTranslations {
  linesOfCode: string;
  activeUsers: string;
  countries: string;
  uptime: string;
}

export const statsTranslations: Record<SupportedLocale, StatsTranslations> = {
  en: {
    linesOfCode: "Lines of Code",
    activeUsers: "Active Users",
    countries: "Countries",
    uptime: "Uptime"
  },
  ru: {
    linesOfCode: "Строк кода",
    activeUsers: "Активные пользователи",
    countries: "Страны",
    uptime: "Время работы"
  },
  ja: {
    linesOfCode: "コード行数",
    activeUsers: "アクティブユーザー",
    countries: "国",
    uptime: "稼働時間"
  },
  zh: {
    linesOfCode: "代码行数",
    activeUsers: "活跃用户",
    countries: "国家",
    uptime: "运行时间"
  },
  uk: {
    linesOfCode: "Рядків коду",
    activeUsers: "Активні користувачі",
    countries: "Країни",
    uptime: "Час роботи"
  }
};
