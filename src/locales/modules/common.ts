
import type { SupportedLocale } from '@/types/i18n';

export interface CommonTranslations {
  all: string;
  tryAgain: string;
  loading: string;
  error: string;
  success: string;
  close: string;
  cancel: string;
  save: string;
  delete: string;
  edit: string;
  view: string;
  back: string;
  next: string;
  previous: string;
  search: string;
  filter: string;
  sort: string;
  refresh: string;
  download: string;
  open: string;
}

export const commonTranslations: Record<SupportedLocale, CommonTranslations> = {
  en: {
    all: "All",
    tryAgain: "Try Again",
    loading: "Loading",
    error: "Error",
    success: "Success",
    close: "Close",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    back: "Back",
    next: "Next",
    previous: "Previous",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    refresh: "Refresh",
    download: "Download",
    open: "Open"
  },
  ru: {
    all: "Все",
    tryAgain: "Попробовать снова",
    loading: "Загрузка",
    error: "Ошибка",
    success: "Успех",
    close: "Закрыть",
    cancel: "Отмена",
    save: "Сохранить",
    delete: "Удалить",
    edit: "Редактировать",
    view: "Просмотр",
    back: "Назад",
    next: "Далее",
    previous: "Предыдущий",
    search: "Поиск",
    filter: "Фильтр",
    sort: "Сортировка",
    refresh: "Обновить",
    download: "Скачать",
    open: "Открыть"
  },
  ja: {
    all: "すべて",
    tryAgain: "再試行",
    loading: "読み込み中",
    error: "エラー",
    success: "成功",
    close: "閉じる",
    cancel: "キャンセル",
    save: "保存",
    delete: "削除",
    edit: "編集",
    view: "表示",
    back: "戻る",
    next: "次へ",
    previous: "前へ",
    search: "検索",
    filter: "フィルター",
    sort: "並び替え",
    refresh: "更新",
    download: "ダウンロード",
    open: "開く"
  },
  zh: {
    all: "全部",
    tryAgain: "重试",
    loading: "加载中",
    error: "错误",
    success: "成功",
    close: "关闭",
    cancel: "取消",
    save: "保存",
    delete: "删除",
    edit: "编辑",
    view: "查看",
    back: "返回",
    next: "下一步",
    previous: "上一步",
    search: "搜索",
    filter: "筛选",
    sort: "排序",
    refresh: "刷新",
    download: "下载",
    open: "打开"
  },
  uk: {
    all: "Усі",
    tryAgain: "Спробувати знову",
    loading: "Завантаження",
    error: "Помилка",
    success: "Успіх",
    close: "Закрити",
    cancel: "Скасувати",
    save: "Зберегти",
    delete: "Видалити",
    edit: "Редагувати",
    view: "Переглянути",
    back: "Назад",
    next: "Далі",
    previous: "Попередній",
    search: "Пошук",
    filter: "Фільтр",
    sort: "Сортування",
    refresh: "Оновити",
    download: "Завантажити",
    open: "Відкрити"
  }
};
