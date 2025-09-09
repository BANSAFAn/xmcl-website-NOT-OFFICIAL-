import type { DocsTranslations } from '../locales/modules/docs';
import type { NavigationTranslations } from '../locales/modules/navigation';
import type { CommonTranslations } from '../locales/modules/common';
import type { HomeTranslations } from '../locales/modules/home';
import type { DownloadTranslations } from '../locales/modules/downloads';
import type { BlogTranslations } from '../locales/modules/blog';
import type { ChangelogTranslations } from '../locales/modules/changelog';
import type { FooterTranslations } from '../locales/modules/footer';
import type { StatsTranslations } from '../locales/modules/stats';
import type { TestingTranslations } from '../locales/modules/testing';
import type { IssuesTranslations } from '../locales/modules/issues';
import type { ThemeTranslations } from '../locales/modules/theme';
import type { UITranslations } from '../locales/modules/ui';
import type { GuideTranslations } from '../locales/modules/guide';

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