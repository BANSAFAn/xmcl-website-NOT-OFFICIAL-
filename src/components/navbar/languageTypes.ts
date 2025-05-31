
export type LanguageCode = 'en' | 'ru' | 'uk' | 'zh' | 'de' | 'ja' | 'fr';

export interface GitHubFileViewerTranslations {
  openOnGitHub: string;
  loading: string;
  loadingFileContent: string;
  selectFile: string;
  browseFiles: string;
  copy: string;
  copied: string;
  download: string;
  root: string;
  name: string;
  date: string;
  size: string;
  type: string;
  noFileSelected: string;
}

export interface Translations {
  guide: string;
  privacy: string;
  download: string;
  github: string;
  darkMode: string;
  lightMode: string;
  language: string;
  blog: string;
  changelog: string;
  hero: HeroTranslations;
  information: InformationTranslations;
  downloadSection: DownloadTranslations;
  privacySection: PrivacyTranslations;
  blogSection: BlogTranslations;
  changelogSection: ChangelogTranslations;
  githubFileViewer?: GitHubFileViewerTranslations;
  about: string;
  contact: string;
  contactUs: string;
  email: string;
  patreon: string;
  afdian: string;
  kook: string;
  supportUs: string;
  joinCommunity: string;
  communityPlatforms: string;
  resources: string;
  support: string;
  documentation: string;
  blogPosts: string;
  privacyPolicy: string;
  error404: string;
  pageNotFound: string;
  backToHome: string;
  homeMessage: string;
  search: string;
  submit: string;
  reportBug: string;
  testing: string;
  issues: string;
  latestBuilds: string;
  deployRelease: string;
  validate: string;
  build: string;
  branch: string;
  updated: string;
  news: string;
  readMore: string;
  appearanceGuide: string;
  underConstruction: string;
  colorPaletteThemes: string;
  tip: string;
  cardColor: string;
  topBarColor: string;
  sidebarColor: string;
  backgroundColor: string;
  basicComponentHighlight: string;
  errorColor: string;
  features: string;
  advanced: string;
  powerful: string;
  modern: string;
  crossPlatform: string;
  openSource: string;
  // GitHub File Viewer translations
  viewCode: string;
  sortBy: string;
  sortByName: string;
  sortByDate: string;
  ascending: string;
  descending: string;
  parentDirectory: string;
  fileExplorer: string;
  noFileSelected: string;
  selectFileToView: string;
  loading: string;
  copy: string;
  copied: string;
  downloadFile: string;
}

export interface LanguageContextProps {
  currentLanguage: LanguageCode;
  setCurrentLanguage: (lang: LanguageCode) => void;
  translations: Translations;
}

export interface LanguageProviderProps {
  children: React.ReactNode;
}
