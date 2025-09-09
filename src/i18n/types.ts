
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
  downloadSection: {
    title: string;
    subtitle: string;
    sizeMB: string;
    downloadCount: string;
    download: string;
    releaseNotes: string;
    installCommands: string;
    version: string;
  };
  downloadMessages: {
    releasedOn: string;
    brewCommands: string;
    loadingReleases: string;
    viewAllReleases: string;
  };
  osSwitch: {
    switchedTo: string;
  };
  blog: {
    title: string;
    subtitle: string;
    loading: string;
    backToBlog: string;
    searchPlaceholder: string;
    filterByTags: string;
    clearFilters: string;
    blogStats: string;
    totalPosts: string;
    categories: string;
    showing: string;
    featured: string;
    readPost: string;
    noPostsFound: string;
    adjustSearch: string;
    searchTitle: string;
  };
  guide: {
    title: string;
    subtitle: string;
    loading: string;
    backToGuides: string;
    searchTitle: string;
    filterByTags: string;
    clearFilters: string;
    guideStats: string;
    totalGuides: string;
    categories: string;
    showing: string;
    featured: string;
    readGuide: string;
    noGuidesFound: string;
    adjustSearch: string;
  };
  changelogs: {
    title: string;
    subtitle: string;
    version: string;
    released: string;
    viewOnGithub: string;
    loading: string;
    error: string;
    versionFilter: string;
    totalVersions: string;
    allVersions: string;
    latest: string;
    recent10: string;
    first10: string;
    recent25: string;
    first25: string;
    showAllReleases: string;
    mostRecentRelease: string;
    last10Releases: string;
    first10Releases: string;
    last25Releases: string;
    first25Releases: string;
    jumpToLatest: string;
    jumpToFirst: string;
    versionMap: string;
    pre: string;
    showLess: string;
    showAllVersions: string;
    clickToView: string;
  };
};
