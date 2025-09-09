
import type { SupportedLocale } from '@/types/i18n';

export interface ChangelogTranslations {
  title: string;
  subtitle: string;
  version: string;
  released: string;
  features: string;
  improvements: string;
  bugFixes: string;
  breaking: string;
  loadingChangelog: string;
  errorLoading: string;
  noChangesFound: string;
  totalReleases: string;
  stableReleases: string;
  prereleases: string;
  totalDownloads: string;
  searchPlaceholder: string;
  filterByType: string;
  allVersions: string;
  stableOnly: string;
  prereleasesOnly: string;
  latestVersion: string;
  downloadCount: string;
}

export const changelogTranslations: Record<SupportedLocale, ChangelogTranslations> = {
  en: {
    title: "Changelog",
    subtitle: "See what's new in each version of XMCL",
    version: "Version",
    released: "Released",
    features: "Features",
    improvements: "Improvements",
    bugFixes: "Bug Fixes",
    breaking: "Breaking Changes",
    loadingChangelog: "Loading changelog...",
    errorLoading: "Error loading changelog",
    noChangesFound: "No changes found",
    totalReleases: "releases total",
    stableReleases: "Stable Releases",
    prereleases: "Pre-releases",
    totalDownloads: "Total Downloads",
    searchPlaceholder: "Search releases...",
    filterByType: "Filter by Type",
    allVersions: "All Versions",
    stableOnly: "Stable Only",
    prereleasesOnly: "Pre-releases Only",
    latestVersion: "Latest Version",
    downloadCount: "downloads"
  },
  ru: {
    title: "Журнал изменений",
    subtitle: "Посмотрите что нового в каждой версии XMCL",
    version: "Версия",
    released: "Выпущено",
    features: "Функции",
    improvements: "Улучшения",
    bugFixes: "Исправления ошибок",
    breaking: "Критические изменения",
    loadingChangelog: "Загрузка журнала изменений...",
    errorLoading: "Ошибка загрузки журнала изменений",
    noChangesFound: "Изменения не найдены",
    totalReleases: "релизов всего",
    stableReleases: "Стабильные релизы",
    prereleases: "Пре-релизы",
    totalDownloads: "Всего скачиваний",
    searchPlaceholder: "Поиск релизов...",
    filterByType: "Фильтр по типу",
    allVersions: "Все версии",
    stableOnly: "Только стабильные",
    prereleasesOnly: "Только пре-релизы",
    latestVersion: "Последняя версия",
    downloadCount: "скачиваний"
  },
  ja: {
    title: "変更履歴",
    subtitle: "XMCLの各バージョンの新機能をご覧ください",
    version: "バージョン",
    released: "リリース日",
    features: "機能",
    improvements: "改善",
    bugFixes: "バグ修正",
    breaking: "破壊的変更",
    loadingChangelog: "変更履歴を読み込み中...",
    errorLoading: "変更履歴の読み込みエラー",
    noChangesFound: "変更が見つかりません",
    totalReleases: "リリース総数",
    stableReleases: "安定版リリース",
    prereleases: "プレリリース",
    totalDownloads: "総ダウンロード数",
    searchPlaceholder: "リリースを検索...",
    filterByType: "タイプでフィルター",
    allVersions: "すべてのバージョン",
    stableOnly: "安定版のみ",
    prereleasesOnly: "プレリリースのみ",
    latestVersion: "最新バージョン",
    downloadCount: "ダウンロード数"
  },
  zh: {
    title: "更新日志",
    subtitle: "查看XMCL每个版本的新功能",
    version: "版本",
    released: "发布时间",
    features: "功能",
    improvements: "改进",
    bugFixes: "错误修复",
    breaking: "破坏性更改",
    loadingChangelog: "加载更新日志中...",
    errorLoading: "加载更新日志时出错",
    noChangesFound: "未找到更改",
    totalReleases: "发布总数",
    stableReleases: "稳定版本",
    prereleases: "预发布版本",
    totalDownloads: "总下载次数",
    searchPlaceholder: "搜索发布版本...",
    filterByType: "按类型筛选",
    allVersions: "所有版本",
    stableOnly: "仅稳定版",
    prereleasesOnly: "仅预发布版",
    latestVersion: "最新版本",
    downloadCount: "下载次数"
  },
  uk: {
    title: "Журнал змін",
    subtitle: "Подивіться що нового в кожній версії XMCL",
    version: "Версія",
    released: "Випущено",
    features: "Функції",
    improvements: "Покращення",
    bugFixes: "Виправлення помилок",
    breaking: "Критичні зміни",
    loadingChangelog: "Завантаження журналу змін...",
    errorLoading: "Помилка завантаження журналу змін",
    noChangesFound: "Змін не знайдено",
    totalReleases: "релізів загалом",
    stableReleases: "Стабільні релізи",
    prereleases: "Пре-релізи",
    totalDownloads: "Загалом завантажень",
    searchPlaceholder: "Пошук релізів...",
    filterByType: "Фільтр за типом",
    allVersions: "Усі версії",
    stableOnly: "Тільки стабільні",
    prereleasesOnly: "Тільки пре-релізи",
    latestVersion: "Остання версія",
    downloadCount: "завантажень"
  }
};
