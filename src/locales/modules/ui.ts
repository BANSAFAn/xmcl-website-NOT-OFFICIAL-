
import type { SupportedLocale } from '@/types/i18n';

export interface UITranslations {
  // Navigation and UI elements
  menu: string;
  close: string;
  open: string;
  toggle: string;
  // Status and actions
  available: string;
  unavailable: string;
  online: string;
  offline: string;
  active: string;
  inactive: string;
  // File operations
  install: string;
  uninstall: string;
  update: string;
  configure: string;
  // Additional common UI terms
  settings: string;
  preferences: string;
  about: string;
  help: string;
  documentation: string;
  tutorials: string;
  community: string;
  support: string;
  feedback: string;
  report: string;
  // Loading states
  initializing: string;
  processing: string;
  completing: string;
  // Notifications
  notification: string;
  alert: string;
  warning: string;
  info: string;
}

export const uiTranslations: Record<SupportedLocale, UITranslations> = {
  en: {
    menu: "Menu",
    close: "Close",
    open: "Open",
    toggle: "Toggle",
    available: "Available",
    unavailable: "Unavailable",
    online: "Online",
    offline: "Offline",
    active: "Active",
    inactive: "Inactive",
    install: "Install",
    uninstall: "Uninstall",
    update: "Update",
    configure: "Configure",
    settings: "Settings",
    preferences: "Preferences",
    about: "About",
    help: "Help",
    documentation: "Documentation",
    tutorials: "Tutorials",
    community: "Community",
    support: "Support",
    feedback: "Feedback",
    report: "Report",
    initializing: "Initializing",
    processing: "Processing",
    completing: "Completing",
    notification: "Notification",
    alert: "Alert",
    warning: "Warning",
    info: "Information"
  },
  ru: {
    menu: "Меню",
    close: "Закрыть",
    open: "Открыть",
    toggle: "Переключить",
    available: "Доступно",
    unavailable: "Недоступно",
    online: "Онлайн",
    offline: "Оффлайн",
    active: "Активно",
    inactive: "Неактивно",
    install: "Установить",
    uninstall: "Удалить",
    update: "Обновить",
    configure: "Настроить",
    settings: "Настройки",
    preferences: "Предпочтения",
    about: "О программе",
    help: "Помощь",
    documentation: "Документация",
    tutorials: "Учебники",
    community: "Сообщество",
    support: "Поддержка",
    feedback: "Обратная связь",
    report: "Отчёт",
    initializing: "Инициализация",
    processing: "Обработка",
    completing: "Завершение",
    notification: "Уведомление",
    alert: "Оповещение",
    warning: "Предупреждение",
    info: "Информация"
  },
  ja: {
    menu: "メニュー",
    close: "閉じる",
    open: "開く",
    toggle: "切り替え",
    available: "利用可能",
    unavailable: "利用不可",
    online: "オンライン",
    offline: "オフライン",
    active: "アクティブ",
    inactive: "非アクティブ",
    install: "インストール",
    uninstall: "アンインストール",
    update: "更新",
    configure: "設定",
    settings: "設定",
    preferences: "環境設定",
    about: "このアプリについて",
    help: "ヘルプ",
    documentation: "ドキュメント",
    tutorials: "チュートリアル",
    community: "コミュニティ",
    support: "サポート",
    feedback: "フィードバック",
    report: "報告",
    initializing: "初期化中",
    processing: "処理中",
    completing: "完了中",
    notification: "通知",
    alert: "アラート",
    warning: "警告",
    info: "情報"
  },
  zh: {
    menu: "菜单",
    close: "关闭",
    open: "打开",
    toggle: "切换",
    available: "可用",
    unavailable: "不可用",
    online: "在线",
    offline: "离线",
    active: "活跃",
    inactive: "非活跃",
    install: "安装",
    uninstall: "卸载",
    update: "更新",
    configure: "配置",
    settings: "设置",
    preferences: "首选项",
    about: "关于",
    help: "帮助",
    documentation: "文档",
    tutorials: "教程",
    community: "社区",
    support: "支持",
    feedback: "反馈",
    report: "报告",
    initializing: "初始化中",
    processing: "处理中",
    completing: "完成中",
    notification: "通知",
    alert: "警告",
    warning: "警告",
    info: "信息"
  },
  uk: {
    menu: "Меню",
    close: "Закрити",
    open: "Відкрити",
    toggle: "Перемкнути",
    available: "Доступно",
    unavailable: "Недоступно",
    online: "Онлайн",
    offline: "Офлайн",
    active: "Активно",
    inactive: "Неактивно",
    install: "Встановити",
    uninstall: "Видалити",
    update: "Оновити",
    configure: "Налаштувати",
    settings: "Налаштування",
    preferences: "Уподобання",
    about: "Про програму",
    help: "Допомога",
    documentation: "Документація",
    tutorials: "Навчальні матеріали",
    community: "Спільнота",
    support: "Підтримка",
    feedback: "Зворотний зв'язок",
    report: "Звіт",
    initializing: "Ініціалізація",
    processing: "Обробка",
    completing: "Завершення",
    notification: "Сповіщення",
    alert: "Попередження",
    warning: "Попередження",
    info: "Інформація"
  }
};
