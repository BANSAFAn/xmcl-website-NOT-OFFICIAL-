
import type { SupportedLocale } from '@/types/i18n';

export interface IssuesTranslations {
  title: string;
  subtitle: string;
  openIssues: string;
  closedIssues: string;
  allIssues: string;
  reportNewIssue: string;
  viewOnGitHub: string;
  searchPlaceholder: string;
  openFilter: string;
  closedFilter: string;
  newest: string;
  recentlyUpdated: string;
  mostCommented: string;
  filterByLabels: string;
  loadingIssues: string;
  noIssuesFound: string;
  createdBy: string;
  errorLoading: string;
  description: string;
  comments: string;
  createdOn: string;
  clearFilters: string;
  issueDetails: string;
  author: string;
  state: string;
  labels: string;
  assignees: string;
  milestone: string;
  lastUpdated: string;
  noDescription: string;
  noLabels: string;
  noAssignees: string;
  noMilestone: string;
  tryAdjusting: string;
  moreLabels: string;
}

export const issuesTranslations: Record<SupportedLocale, IssuesTranslations> = {
  en: {
    title: "Issues & Bug Reports",
    subtitle: "Track, report, and help resolve issues to improve X Minecraft Launcher for everyone",
    openIssues: "Open Issues",
    closedIssues: "Closed Issues",
    allIssues: "All Issues",
    reportNewIssue: "Report New Issue",
    viewOnGitHub: "View on GitHub",
    searchPlaceholder: "Search issues...",
    openFilter: "Open",
    closedFilter: "Closed",
    newest: "Newest",
    recentlyUpdated: "Recently Updated",
    mostCommented: "Most Commented",
    filterByLabels: "Filter by Labels",
    loadingIssues: "Loading issues...",
    noIssuesFound: "No issues found",
    createdBy: "Created by",
    errorLoading: "Error loading issues",
    description: "Description",
    comments: "comments",
    createdOn: "Created on",
    clearFilters: "Clear Filters",
    issueDetails: "Issue Details",
    author: "Author",
    state: "State",
    labels: "Labels",
    assignees: "Assignees",
    milestone: "Milestone",
    lastUpdated: "Last Updated",
    noDescription: "No description provided",
    noLabels: "No labels",
    noAssignees: "No assignees",
    noMilestone: "No milestone",
    tryAdjusting: "Try adjusting your search or filter criteria.",
    moreLabels: "more"
  },
  ru: {
    title: "Отчёты об ошибках и проблемах",
    subtitle: "Отслеживайте, сообщайте и помогайте решать проблемы для улучшения X Minecraft Launcher для всех",
    openIssues: "Открытые проблемы",
    closedIssues: "Закрытые проблемы",
    allIssues: "Все проблемы",
    reportNewIssue: "Сообщить о новой проблеме",
    viewOnGitHub: "Посмотреть на GitHub",
    searchPlaceholder: "Поиск проблем...",
    openFilter: "Открытые",
    closedFilter: "Закрытые",
    newest: "Новые",
    recentlyUpdated: "Недавно обновлённые",
    mostCommented: "Самые обсуждаемые",
    filterByLabels: "Фильтр по меткам",
    loadingIssues: "Загрузка проблем...",
    noIssuesFound: "Проблемы не найдены",
    createdBy: "Создано",
    errorLoading: "Ошибка загрузки проблем",
    description: "Описание",
    comments: "комментариев",
    createdOn: "Создано",
    clearFilters: "Очистить фильтры",
    issueDetails: "Детали проблемы",
    author: "Автор",
    state: "Состояние",
    labels: "Метки",
    assignees: "Исполнители",
    milestone: "Веха",
    lastUpdated: "Последнее обновление",
    noDescription: "Описание не предоставлено",
    noLabels: "Нет меток",
    noAssignees: "Нет исполнителей",
    noMilestone: "Нет вехи",
    tryAdjusting: "Попробуйте изменить критерии поиска или фильтрации.",
    moreLabels: "ещё"
  },
  ja: {
    title: "問題・バグ報告",
    subtitle: "問題を追跡、報告し、すべての人のためにX Minecraft Launcherを改善するお手伝いを",
    openIssues: "未解決の問題",
    closedIssues: "解決済みの問題",
    allIssues: "すべての問題",
    reportNewIssue: "新しい問題を報告",
    viewOnGitHub: "GitHubで見る",
    searchPlaceholder: "問題を検索...",
    openFilter: "未解決",
    closedFilter: "解決済み",
    newest: "最新",
    recentlyUpdated: "最近更新",
    mostCommented: "最多コメント",
    filterByLabels: "ラベルでフィルター",
    loadingIssues: "問題を読み込み中...",
    noIssuesFound: "問題が見つかりません",
    createdBy: "作成者",
    errorLoading: "問題の読み込みエラー",
    description: "説明",
    comments: "コメント",
    createdOn: "作成日",
    clearFilters: "フィルターをクリア",
    issueDetails: "問題の詳細",
    author: "作成者",
    state: "状態",
    labels: "ラベル",
    assignees: "担当者",
    milestone: "マイルストーン",
    lastUpdated: "最終更新",
    noDescription: "説明がありません",
    noLabels: "ラベルなし",
    noAssignees: "担当者なし",
    noMilestone: "マイルストーンなし",
    tryAdjusting: "検索条件やフィルター条件を調整してみてください。",
    moreLabels: "その他"
  },
  zh: {
    title: "问题与错误报告",
    subtitle: "跟踪、报告并帮助解决问题，为所有人改进X Minecraft Launcher",
    openIssues: "未解决问题",
    closedIssues: "已解决问题",
    allIssues: "所有问题",
    reportNewIssue: "报告新问题",
    viewOnGitHub: "在GitHub上查看",
    searchPlaceholder: "搜索问题...",
    openFilter: "未解决",
    closedFilter: "已解决",
    newest: "最新",
    recentlyUpdated: "最近更新",
    mostCommented: "评论最多",
    filterByLabels: "按标签筛选",
    loadingIssues: "加载问题中...",
    noIssuesFound: "未找到问题",
    createdBy: "创建者",
    errorLoading: "加载问题时出错",
    description: "描述",
    comments: "评论",
    createdOn: "创建于",
    clearFilters: "清除筛选",
    issueDetails: "问题详情",
    author: "作者",
    state: "状态",
    labels: "标签",
    assignees: "指派人",
    milestone: "里程碑",
    lastUpdated: "最后更新",
    noDescription: "未提供描述",
    noLabels: "无标签",
    noAssignees: "无指派人",
    noMilestone: "无里程碑",
    tryAdjusting: "尝试调整搜索或筛选条件。",
    moreLabels: "更多"
  },
  uk: {
    title: "Звіти про помилки та проблеми",
    subtitle: "Відстежуйте, повідомляйте та допомагайте вирішувати проблеми для покращення X Minecraft Launcher для всіх",
    openIssues: "Відкриті проблеми",
    closedIssues: "Закриті проблеми",
    allIssues: "Усі проблеми",
    reportNewIssue: "Повідомити про нову проблему",
    viewOnGitHub: "Подивитися на GitHub",
    searchPlaceholder: "Пошук проблем...",
    openFilter: "Відкриті",
    closedFilter: "Закриті",
    newest: "Найновіші",
    recentlyUpdated: "Нещодавно оновлені",
    mostCommented: "Найбільш обговорювані",
    filterByLabels: "Фільтр за мітками",
    loadingIssues: "Завантаження проблем...",
    noIssuesFound: "Проблем не знайдено",
    createdBy: "Створено",
    errorLoading: "Помилка завантаження проблем",
    description: "Опис",
    comments: "коментарів",
    createdOn: "Створено",
    clearFilters: "Очистити фільтри",
    issueDetails: "Деталі проблеми",
    author: "Автор",
    state: "Стан",
    labels: "Мітки",
    assignees: "Виконавці",
    milestone: "Віха",
    lastUpdated: "Останнє оновлення",
    noDescription: "Опис не надано",
    noLabels: "Немає міток",
    noAssignees: "Немає виконавців",
    noMilestone: "Немає віхи",
    tryAdjusting: "Спробуйте змінити критерії пошуку або фільтрації.",
    moreLabels: "ще"
  }
};
