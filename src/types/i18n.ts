// Type definitions for translation modules
export interface DocsTranslations {
  [key: string]: string | DocsTranslations;
}

export interface NavigationTranslations {
  [key: string]: string | NavigationTranslations;
}

export interface CommonTranslations {
  [key: string]: string | CommonTranslations;
}

export interface HomeTranslations {
  [key: string]: string | HomeTranslations;
}

export interface DownloadTranslations {
  [key: string]: string | DownloadTranslations;
}

export interface BlogTranslations {
  [key: string]: string | BlogTranslations;
}

export interface ChangelogTranslations {
  [key: string]: string | ChangelogTranslations;
}

export interface FooterTranslations {
  [key: string]: string | FooterTranslations;
}

export interface StatsTranslations {
  [key: string]: string | StatsTranslations;
}

export interface TestingTranslations {
  [key: string]: string | TestingTranslations;
}

export interface IssuesTranslations {
  [key: string]: string | IssuesTranslations;
}

export interface ThemeTranslations {
  [key: string]: string | ThemeTranslations;
}

export interface UITranslations {
  [key: string]: string | UITranslations;
}

export interface GuideTranslations {
  [key: string]: string | GuideTranslations;
}

export interface DownloadMessagesTranslations {
  noVersionsAvailable: string;
  loadingReleases: string;
  viewAllReleases: string;
  brewCommands: string;
  releasedOn: string;
}

export interface OSSwitchTranslations {
  switchedTo: string;
  availableFor: string;
}

// Main translation interface
export interface Translations {
  nav: NavigationTranslations;
  footer: FooterTranslations;
  theme: ThemeTranslations;
  downloadXMCL: string;
  modernCrossplatformDescription: string;
  githubStars: string;
  forks: string;
  lastVersion: string;
  downloadSection: DownloadTranslations;
  downloadMessages: DownloadMessagesTranslations;
  common: CommonTranslations;
  stats: StatsTranslations;
  issues: IssuesTranslations;
  home: HomeTranslations;
  blog: BlogTranslations;
  guide: GuideTranslations;
  changelog: ChangelogTranslations;
  testing: TestingTranslations;
  osSwitch: OSSwitchTranslations;
  ui: UITranslations;
  docs: DocsTranslations;
}

// Supported locales
export type SupportedLocale = 'en' | 'ru' | 'ja' | 'zh' | 'uk';

// Language configuration
export interface LanguageConfig {
  code: SupportedLocale;
  name: string;
  flag: string;
  color: string;
}