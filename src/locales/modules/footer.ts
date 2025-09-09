
import type { SupportedLocale } from '@/types/i18n';

export interface FooterTranslations {
  quickLinks: string;
  community: string;
  support: string;
  resources: string;
  blog: string;
  guide: string;
  changelog: string;
  issues: string;
  testing: string;
  discord: string;
  github: string;
  twitter: string;
  documentation: string;
  faq: string;
  helpCenter: string;
  contact: string;
  builtWith: string;
  allRightsReserved: string;
  privacyPolicy: string;
  termsOfService: string;
  openSource: string;
  madeWith: string;
}

export const footerTranslations: Record<SupportedLocale, FooterTranslations> = {
  en: {
    quickLinks: "Quick Links",
    community: "Community",
    support: "Support",
    resources: "Resources",
    blog: "Blog",
    guide: "Guide",
    changelog: "Changelog",
    issues: "Issues",
    testing: "Testing",
    discord: "Discord",
    github: "GitHub",
    twitter: "Twitter",
    documentation: "Documentation",
    faq: "FAQ",
    helpCenter: "Help Center",
    contact: "Contact",
    builtWith: "Built with",
    allRightsReserved: "All rights reserved",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    openSource: "Open Source",
    madeWith: "Made with"
  },
  ru: {
    quickLinks: "Быстрые ссылки",
    community: "Сообщество",
    support: "Поддержка",
    resources: "Ресурсы",
    blog: "Блог",
    guide: "Руководство",
    changelog: "Журнал изменений",
    issues: "Проблемы",
    testing: "Тестирование",
    discord: "Discord",
    github: "GitHub",
    twitter: "Twitter",
    documentation: "Документация",
    faq: "Часто задаваемые вопросы",
    helpCenter: "Центр помощи",
    contact: "Контакты",
    builtWith: "Создано с помощью",
    allRightsReserved: "Все права защищены",
    privacyPolicy: "Политика конфиденциальности",
    termsOfService: "Условия использования",
    openSource: "Открытый исходный код",
    madeWith: "Сделано с"
  },
  ja: {
    quickLinks: "クイックリンク",
    community: "コミュニティ",
    support: "サポート",
    resources: "リソース",
    blog: "ブログ",
    guide: "ガイド",
    changelog: "変更履歴",
    issues: "問題",
    testing: "テスト",
    discord: "Discord",
    github: "GitHub",
    twitter: "Twitter",
    documentation: "ドキュメント",
    faq: "よくある質問",
    helpCenter: "ヘルプセンター",
    contact: "お問い合わせ",
    builtWith: "使用技術",
    allRightsReserved: "全著作権所有",
    privacyPolicy: "プライバシーポリシー",
    termsOfService: "利用規約",
    openSource: "オープンソース",
    madeWith: "で作成"
  },
  zh: {
    quickLinks: "快速链接",
    community: "社区",
    support: "支持",
    resources: "资源",
    blog: "博客",
    guide: "指南",
    changelog: "更新日志",
    issues: "问题",
    testing: "测试",
    discord: "Discord",
    github: "GitHub",
    twitter: "Twitter",
    documentation: "文档",
    faq: "常见问题",
    helpCenter: "帮助中心",
    contact: "联系我们",
    builtWith: "构建于",
    allRightsReserved: "版权所有",
    privacyPolicy: "隐私政策",
    termsOfService: "服务条款",
    openSource: "开源",
    madeWith: "制作于"
  },
  uk: {
    quickLinks: "Швидкі посилання",
    community: "Спільнота",
    support: "Підтримка",
    resources: "Ресурси",
    blog: "Блог",
    guide: "Керівництво",
    changelog: "Журнал змін",
    issues: "Проблеми",
    testing: "Тестування",
    discord: "Discord",
    github: "GitHub",
    twitter: "Twitter",
    documentation: "Документація",
    faq: "Часті запитання",
    helpCenter: "Центр допомоги",
    contact: "Контакти",
    builtWith: "Створено за допомогою",
    allRightsReserved: "Усі права захищені",
    privacyPolicy: "Політика конфіденційності",
    termsOfService: "Умови використання",
    openSource: "Відкритий код",
    madeWith: "Зроблено з"
  }
};
