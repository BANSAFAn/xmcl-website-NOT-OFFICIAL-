
import type { SupportedLocale } from '@/types/i18n';

export interface BlogTranslations {
  title: string;
  subtitle: string;
  readMore: string;
  backToBlog: string;
  publishedOn: string;
  tags: string;
  relatedPosts: string;
  noPostsFound: string;
  loadingPosts: string;
  errorLoading: string;
  totalPosts: string;
  featured: string;
  categories: string;
  searchPlaceholder: string;
  filterByCategory: string;
  allCategories: string;
  popular: string;
  recent: string;
  trending: string;
  searchPosts: string;
  blogStats: string;
  showing: string;
  noPostsDescription: string;
}

export const blogTranslations: Record<SupportedLocale, BlogTranslations> = {
  en: {
    title: "XMCL Blog",
    subtitle: "Latest news, tutorials, and insights from the XMCL community",
    readMore: "Read More",
    backToBlog: "Back to Blog",
    publishedOn: "Published on",
    tags: "Tags",
    relatedPosts: "Related Posts",
    noPostsFound: "No posts found",
    loadingPosts: "Loading posts...",
    errorLoading: "Error loading posts",
    totalPosts: "Total Posts",
    featured: "Featured",
    categories: "Categories",
    searchPlaceholder: "Search blog posts...",
    filterByCategory: "Filter by Category",
    allCategories: "All Categories",
    popular: "Popular",
    recent: "Recent",
    trending: "Trending",
    searchPosts: "Search Posts",
    blogStats: "Blog Stats",
    showing: "Showing",
    noPostsDescription: "Try adjusting your search or filter criteria"
  },
  ru: {
    title: "Блог XMCL",
    subtitle: "Последние новости, руководства и аналитика от сообщества XMCL",
    readMore: "Читать далее",
    backToBlog: "Вернуться к блогу",
    publishedOn: "Опубликовано",
    tags: "Теги",
    relatedPosts: "Похожие посты",
    noPostsFound: "Посты не найдены",
    loadingPosts: "Загрузка постов...",
    errorLoading: "Ошибка загрузки постов",
    totalPosts: "Всего постов",
    featured: "Рекомендуемые",
    categories: "Категории",
    searchPlaceholder: "Поиск постов...",
    filterByCategory: "Фильтр по категории",
    allCategories: "Все категории",
    popular: "Популярные",
    recent: "Последние",
    trending: "В тренде",
    searchPosts: "Поиск постов",
    blogStats: "Статистика блога",
    showing: "Показано",
    noPostsDescription: "Попробуйте изменить поисковый запрос или критерии фильтрации"
  },
  ja: {
    title: "XMCLブログ",
    subtitle: "XMCLコミュニティからの最新ニュース、チュートリアル、インサイト",
    readMore: "続きを読む",
    backToBlog: "ブログに戻る",
    publishedOn: "公開日",
    tags: "タグ",
    relatedPosts: "関連記事",
    noPostsFound: "記事が見つかりません",
    loadingPosts: "記事を読み込み中...",
    errorLoading: "記事の読み込みエラー",
    totalPosts: "記事総数",
    featured: "おすすめ",
    categories: "カテゴリー",
    searchPlaceholder: "記事を検索...",
    filterByCategory: "カテゴリーでフィルター",
    allCategories: "すべてのカテゴリー",
    popular: "人気",
    recent: "最新",
    trending: "トレンド",
    searchPosts: "記事検索",
    blogStats: "ブログ統計",
    showing: "表示中",
    noPostsDescription: "検索条件やフィルター条件を調整してみてください"
  },
  zh: {
    title: "XMCL博客",
    subtitle: "来自XMCL社区的最新新闻、教程和见解",
    readMore: "阅读更多",
    backToBlog: "返回博客",
    publishedOn: "发布于",
    tags: "标签",
    relatedPosts: "相关文章",
    noPostsFound: "未找到文章",
    loadingPosts: "加载文章中...",
    errorLoading: "加载文章时出错",
    totalPosts: "文章总数",
    featured: "精选",
    categories: "分类",
    searchPlaceholder: "搜索文章...",
    filterByCategory: "按分类筛选",
    allCategories: "所有分类",
    popular: "热门",
    recent: "最新",
    trending: "趋势",
    searchPosts: "搜索文章",
    blogStats: "博客统计",
    showing: "显示中",
    noPostsDescription: "请尝试调整搜索或筛选条件"
  },
  uk: {
    title: "Блог XMCL",
    subtitle: "Останні новини, керівництва та аналітика від спільноти XMCL",
    readMore: "Читати далі",
    backToBlog: "Повернутися до блогу",
    publishedOn: "Опубліковано",
    tags: "Теги",
    relatedPosts: "Схожі пости",
    noPostsFound: "Пости не знайдено",
    loadingPosts: "Завантаження постів...",
    errorLoading: "Помилка завантаження постів",
    totalPosts: "Усього постів",
    featured: "Рекомендовані",
    categories: "Категорії",
    searchPlaceholder: "Пошук постів...",
    filterByCategory: "Фільтр за категорією",
    allCategories: "Усі категорії",
    popular: "Популярні",
    recent: "Останні",
    trending: "У тренді",
    searchPosts: "Пошук постів",
    blogStats: "Статистика блогу",
    showing: "Показано",
    noPostsDescription: "Спробуйте змінити пошуковий запит або критерії фільтрації"
  }
};
