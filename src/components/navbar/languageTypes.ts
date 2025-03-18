
export type LanguageCode = 'en' | 'ru' | 'uk' | 'zh' | 'de' | 'ja';

export interface Translations {
  guide: string;
  guideLocal: string;
  privacy: string;
  changelogs: string;
  blogs: string;
  download: string;
  github: string;
  darkMode: string;
  lightMode: string;
  downloadNow: string;
  changeLanguage: string;
  githubRepo: string;
  discordServer: string;
  selectLanguage: string;
  language: string;
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
}

export interface LanguageContextProps {
  currentLanguage: LanguageCode;
  setCurrentLanguage: (lang: LanguageCode) => void;
  translations: Translations;
}

export interface LanguageProviderProps {
  children: React.ReactNode;
}
