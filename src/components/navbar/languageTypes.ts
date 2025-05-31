
export type LanguageCode = 'en' | 'ru' | 'uk' | 'zh' | 'de' | 'ja';

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
}

export interface LanguageContextProps {
  currentLanguage: LanguageCode;
  setCurrentLanguage: (lang: LanguageCode) => void;
  translations: Translations;
}

export interface LanguageProviderProps {
  children: React.ReactNode;
}
