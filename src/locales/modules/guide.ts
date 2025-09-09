import type { SupportedLocale } from '@/types/i18n';

export interface GuideTranslations {
  title: string;
  subtitle: string;
  loading: string;
  searchGuides: string;
  searchPlaceholder: string;
  filterByTags: string;
  clearFilters: string;
  guideStats: string;
  totalGuides: string;
  categories: string;
  showing: string;
  noGuides: string;
  noGuidesDescription: string;
  backToGuides: string;
  minRead: string;
  featured: string;
  readMore: string;
  difficulty: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  tableOfContents: string;
  backToGuide: string;
  nextSection: string;
  previousSection: string;
  searchGuide: string;
  noResultsFound: string;
  loadingGuide: string;
  errorLoading: string;
  filterByCategory: string;
  allCategories: string;
  newThisMonth: string;
  gettingStarted: string;
  advanced: string;
  troubleshooting: string;
  guideNotFound: string;
  guideNotFoundDescription: string;
  errorLoadingGuide: string;
  gettingStartedWithXMCL: string;
  learnBasics: string;
  author: string;
  xmclTeam: string;
  welcomeToXMCL: string;
}

export const guideTranslations: Record<SupportedLocale, GuideTranslations> = {
  en: {
    title: "User Guide",
    subtitle: "Complete guides and tutorials to help you master XMCL",
    loading: "Loading guides...",
    searchGuides: "Search Guides",
    searchPlaceholder: "Search guides...",
    filterByTags: "Filter by Tags",
    clearFilters: "Clear Filters",
    guideStats: "Guide Stats",
    totalGuides: "Total Guides",
    categories: "Categories",
    showing: "Showing",
    noGuides: "No guides found",
    noGuidesDescription: "Try adjusting your search or filter criteria",
    backToGuides: "Back to Guides",
    minRead: "min read",
    featured: "Featured",
    readMore: "Read More",
    difficulty: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced"
    },
    tableOfContents: "Table of Contents",
    backToGuide: "Back to Guide",
    nextSection: "Next Section",
    previousSection: "Previous Section",
    searchGuide: "Search Guide",
    noResultsFound: "No Results Found",
    loadingGuide: "Loading Guide...",
    errorLoading: "Error Loading",
    filterByCategory: "Filter by Category",
    allCategories: "All Categories",
    newThisMonth: "New This Month",
    gettingStarted: "Getting Started",
    advanced: "Advanced",
    troubleshooting: "Troubleshooting",
    guideNotFound: "Guide not found",
    guideNotFoundDescription: "This guide content is not available.",
    errorLoadingGuide: "Error loading guide",
    gettingStartedWithXMCL: "Getting Started with XMCL",
    learnBasics: "Learn the basics of using X Minecraft Launcher",
    author: "Author",
    xmclTeam: "XMCL Team",
    welcomeToXMCL: "Welcome to XMCL! This guide will help you get started."
  },
  ru: {
    title: "Руководство пользователя",
    subtitle: "Полные руководства и туториалы, которые помогут вам освоить XMCL",
    loading: "Загрузка руководств...",
    searchGuides: "Поиск руководств",
    searchPlaceholder: "Поиск руководств...",
    filterByTags: "Фильтр по тегам",
    clearFilters: "Очистить фильтры",
    guideStats: "Статистика руководств",
    totalGuides: "Всего руководств",
    categories: "Категории",
    showing: "Показано",
    noGuides: "Руководства не найдены",
    noGuidesDescription: "Попробуйте изменить поисковый запрос или критерии фильтрации",
    backToGuides: "Назад к руководствам",
    minRead: "мин чтения",
    featured: "Рекомендуемые",
    readMore: "Читать далее",
    difficulty: {
      beginner: "Начальный",
      intermediate: "Средний",
      advanced: "Продвинутый"
    },
    tableOfContents: "Содержание",
    backToGuide: "Назад к руководству",
    nextSection: "Следующий раздел",
    previousSection: "Предыдущий раздел",
    searchGuide: "Поиск по руководству",
    noResultsFound: "Результаты не найдены",
    loadingGuide: "Загрузка руководства...",
    errorLoading: "Ошибка загрузки",
    filterByCategory: "Фильтр по категории",
    allCategories: "Все категории",
    newThisMonth: "Новое в этом месяце",
    gettingStarted: "Начало работы",
    advanced: "Продвинутый",
    troubleshooting: "Устранение неполадок",
    guideNotFound: "Руководство не найдено",
    guideNotFoundDescription: "Содержимое этого руководства недоступно.",
    errorLoadingGuide: "Ошибка загрузки руководства",
    gettingStartedWithXMCL: "Начало работы с XMCL",
    learnBasics: "Изучите основы использования X Minecraft Launcher",
    author: "Автор",
    xmclTeam: "Команда XMCL",
    welcomeToXMCL: "Добро пожаловать в XMCL! Это руководство поможет вам начать работу."
  },
  ja: {
    title: "ユーザーガイド",
    subtitle: "XMCLをマスターするための完全なガイドとチュートリアル",
    loading: "ガイドを読み込み中...",
    searchGuides: "ガイド検索",
    searchPlaceholder: "ガイドを検索...",
    filterByTags: "タグでフィルター",
    clearFilters: "フィルターをクリア",
    guideStats: "ガイド統計",
    totalGuides: "総ガイド数",
    categories: "カテゴリー",
    showing: "表示中",
    noGuides: "ガイドが見つかりません",
    noGuidesDescription: "検索条件やフィルター条件を調整してみてください",
    backToGuides: "ガイド一覧に戻る",
    minRead: "分で読める",
    featured: "おすすめ",
    readMore: "続きを読む",
    difficulty: {
      beginner: "初級",
      intermediate: "中級",
      advanced: "上級"
    },
    tableOfContents: "目次",
    backToGuide: "ガイドに戻る",
    nextSection: "次のセクション",
    previousSection: "前のセクション",
    searchGuide: "ガイド内検索",
    noResultsFound: "結果が見つかりません",
    loadingGuide: "ガイドを読み込み中...",
    errorLoading: "読み込みエラー",
    filterByCategory: "カテゴリーでフィルター",
    allCategories: "すべてのカテゴリー",
    newThisMonth: "今月の新着",
    gettingStarted: "はじめに",
    advanced: "上級",
    troubleshooting: "トラブルシューティング",
    guideNotFound: "ガイドが見つかりません",
    guideNotFoundDescription: "このガイドの内容は利用できません。",
    errorLoadingGuide: "ガイドの読み込みエラー",
    gettingStartedWithXMCL: "XMCLをはじめよう",
    learnBasics: "X Minecraft Launcherの基本的な使い方を学ぶ",
    author: "著者",
    xmclTeam: "XMCLチーム",
    welcomeToXMCL: "XMCLへようこそ！このガイドでは使い方をご案内します。"
  },
  zh: {
    title: "用户指南",
    subtitle: "完整的指南和教程，帮助您掌握 XMCL",
    loading: "正在加载指南...",
    searchGuides: "搜索指南",
    searchPlaceholder: "搜索指南...",
    filterByTags: "按标签筛选",
    clearFilters: "清除筛选",
    guideStats: "指南统计",
    totalGuides: "总指南数",
    categories: "分类",
    showing: "显示中",
    noGuides: "未找到指南",
    noGuidesDescription: "请尝试调整搜索或筛选条件",
    backToGuides: "返回指南列表",
    minRead: "分钟阅读",
    featured: "精选",
    readMore: "阅读更多",
    difficulty: {
      beginner: "初级",
      intermediate: "中级",
      advanced: "高级"
    },
    tableOfContents: "目录",
    backToGuide: "返回指南",
    nextSection: "下一节",
    previousSection: "上一节",
    searchGuide: "搜索指南",
    noResultsFound: "未找到结果",
    loadingGuide: "正在加载指南...",
    errorLoading: "加载错误",
    filterByCategory: "按分类筛选",
    allCategories: "所有分类",
    newThisMonth: "本月新增",
    gettingStarted: "入门",
    advanced: "高级",
    troubleshooting: "故障排除",
    guideNotFound: "未找到指南",
    guideNotFoundDescription: "该指南内容不可用。",
    errorLoadingGuide: "加载指南时出错",
    gettingStartedWithXMCL: "开始使用 XMCL",
    learnBasics: "学习使用 X Minecraft Launcher 的基础知识",
    author: "作者",
    xmclTeam: "XMCL 团队",
    welcomeToXMCL: "欢迎使用 XMCL！本指南将帮助您开始使用。"
  },
  uk: {
    title: "Керівництво користувача",
    subtitle: "Повні керівництва та туторіали щоб допомогти вам освоїти XMCL",
    loading: "Завантаження керівництв...",
    searchGuides: "Пошук керівництв",
    searchPlaceholder: "Пошук керівництв...",
    filterByTags: "Фільтр за тегами",
    clearFilters: "Очистити фільтри",
    guideStats: "Статистика керівництв",
    totalGuides: "Усього керівництв",
    categories: "Категорії",
    showing: "Показано",
    noGuides: "Керівництва не знайдено",
    noGuidesDescription: "Спробуйте змінити пошуковий запит або критерії фільтрації",
    backToGuides: "Назад до керівництв",
    minRead: "хв читання",
    featured: "Рекомендовані",
    readMore: "Читати далі",
    difficulty: {
      beginner: "Початковий",
      intermediate: "Середній",
      advanced: "Просунутий"
    },
    tableOfContents: "Зміст",
    backToGuide: "Назад до керівництва",
    nextSection: "Наступний розділ",
    previousSection: "Попередній розділ",
    searchGuide: "Пошук по керівництву",
    noResultsFound: "Результатів не знайдено",
    loadingGuide: "Завантаження керівництва...",
    errorLoading: "Помилка завантаження",
    filterByCategory: "Фільтр за категорією",
    allCategories: "Всі категорії",
    newThisMonth: "Нове цього місяця",
    gettingStarted: "Початок роботи",
    advanced: "Просунутий",
    troubleshooting: "Усунення неполадок",
    guideNotFound: "Керівництво не знайдено",
    guideNotFoundDescription: "Вміст цього керівництва недоступний.",
    errorLoadingGuide: "Помилка завантаження керівництва",
    gettingStartedWithXMCL: "Початок роботи з XMCL",
    learnBasics: "Вивчіть основи використання X Minecraft Launcher",
    author: "Автор",
    xmclTeam: "Команда XMCL",
    welcomeToXMCL: "Ласкаво просимо до XMCL! Це керівництво допоможе вам почати роботу."
  }
};