
export type LanguageCode = 'en' | 'ru' | 'uk' | 'zh' | 'de' | 'ja';

export interface I18nTranslations {
  nav: {
    home: string;
    guide: string;
    privacy: string;
    changelogs: string;
    blogs: string;
    download: string;
    github: string;
    about: string;
    contact: string;
    testing: string;
    issues: string;
  };
  ui: {
    downloadNow: string;
    changeLanguage: string;
    selectLanguage: string;
    readMore: string;
    backToHome: string;
    search: string;
    submit: string;
    loading: string;
    error: string;
    retry: string;
    close: string;
    open: string;
    menu: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    getStarted: string;
    learnMore: string;
    terminal: {
      welcome: string;
      creatorInfo: string;
      commandNotFound: string;
      showMessage: string;
      prompt: string;
      close: string;
    };
  };
  footer: {
    quickLinks: string;
    community: string;
    support: string;
    websiteBy: string;
    madeWith: string;
    forCommunity: string;
    launcherName: string;
    launcherShortDesc: string;
    launcherFullDesc: string;
  };
  social: {
    githubRepo: string;
    discordServer: string;
    supportUs: string;
    joinCommunity: string;
    communityPlatforms: string;
    patreon: string;
    afdian: string;
    kook: string;
    kofi: string;
    stats: {
      stars: string;
      forks: string;
      downloads: string;
      latest: string;
    };
  };
  features: {
    advanced: string;
    powerful: string;
    modern: string;
    crossPlatform: string;
    openSource: string;
    secure: string;
    fast: string;
    reliable: string;
  };
  common: {
    fileSize: {
      bytes: string;
      kb: string;
      mb: string;
      gb: string;
      tb: string;
      pb: string;
      eb: string;
      zb: string;
      yb: string;
    };
  };
  privacy: {
    title: string;
    description: string;
    lastUpdated: string;
  };
  errors: {
    error404: string;
    pageNotFound: string;
    loadingError: string;
    connectionError: string;
    tryAgain: string;
  };
  warnings: {
    unsupportedWindows: {
      title: string;
      message: string;
      button: string;
    };
  };
}
