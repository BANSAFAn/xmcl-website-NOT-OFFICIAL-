
import React, { createContext, useContext } from 'react';
import { useI18n } from '@/i18n/context';
import { LanguageCode } from '@/i18n/types';
import { languages } from './languageData';

const LanguageContext = createContext<any>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useLanguage() {
  // Try to get the i18n context, but provide fallbacks
  let currentLanguage: LanguageCode = 'en';
  let setLanguage: (lang: LanguageCode) => void = () => {};
  let t: any = {
    nav: { guide: 'Guide', privacy: 'Privacy', changelogs: 'Changelogs', blogs: 'Blogs', download: 'Download', github: 'GitHub', about: 'About', contact: 'Contact', testing: 'Testing', issues: 'Issues', home: 'Home' },
    ui: { downloadNow: 'Download Now', changeLanguage: 'Change Language', selectLanguage: 'Select Language', readMore: 'Read More', backToHome: 'Back to Home', search: 'Search', submit: 'Submit' },
    social: { githubRepo: 'GitHub Repository', discordServer: 'Discord Server', supportUs: 'Support Us', joinCommunity: 'Join Community', communityPlatforms: 'Community Platforms', patreon: 'Patreon', afdian: 'Afdian', kook: 'Kook' },
    features: { advanced: 'Advanced', powerful: 'Powerful', modern: 'Modern', crossPlatform: 'Cross Platform', openSource: 'Open Source' },
    privacy: { title: 'Privacy Policy' },
    errors: { error404: '404 Error', pageNotFound: 'Page Not Found', loadingError: 'Loading Error' }
  };
  
  try {
    const i18n = useI18n();
    currentLanguage = i18n.currentLanguage;
    setLanguage = i18n.setLanguage;
    t = i18n.t;
  } catch (error) {
    // If i18n context is not available, use fallbacks
    console.log('Using fallback translations');
  }
  
  return {
    currentLanguage,
    setCurrentLanguage: setLanguage,
    translations: {
      guide: t.nav.guide,
      guideLocal: t.nav.guide,
      privacy: t.nav.privacy,
      changelogs: t.nav.changelogs,
      blogs: t.nav.blogs,
      download: t.nav.download,
      github: t.nav.github,
      about: t.nav.about,
      contact: t.nav.contact,
      contactUs: t.nav.contact,
      testing: t.nav.testing,
      issues: t.nav.issues,
      downloadNow: t.ui.downloadNow,
      changeLanguage: t.ui.changeLanguage,
      selectLanguage: t.ui.selectLanguage,
      githubRepo: t.social.githubRepo,
      discordServer: t.social.discordServer,
      supportUs: t.social.supportUs,
      joinCommunity: t.social.joinCommunity,
      communityPlatforms: t.social.communityPlatforms,
      patreon: t.social.patreon,
      afdian: t.social.afdian,
      kook: t.social.kook,
      darkMode: t.ui.darkMode || 'Dark Mode',
      lightMode: t.ui.lightMode || 'Light Mode',
      language: currentLanguage,
      email: t.nav.contact,
      resources: 'Resources',
      support: 'Support',
      documentation: 'Documentation',
      blogPosts: 'Blog Posts',
      privacyPolicy: t.privacy.title,
      error404: t.errors.error404,
      pageNotFound: t.errors.pageNotFound,
      backToHome: t.ui.backToHome,
      homeMessage: t.ui.backToHome,
      search: t.ui.search,
      submit: t.ui.submit,
      reportBug: 'Report Bug',
      latestBuilds: 'Latest Builds',
      deployRelease: 'Deploy Release',
      validate: 'Validate',
      build: 'Build',
      branch: 'Branch',
      updated: 'Updated',
      news: 'News',
      readMore: t.ui.readMore,
      appearanceGuide: 'Appearance Guide',
      underConstruction: 'Under Construction...',
      colorPaletteThemes: 'Color Palette and Themes',
      tip: 'TIP',
      cardColor: 'Card color',
      topBarColor: 'Top bar color',
      sidebarColor: 'Sidebar color',
      backgroundColor: 'Background color',
      basicComponentHighlight: 'Basic component highlight color',
      errorColor: 'Error color',
      features: 'Features',
      advanced: t.features.advanced,
      powerful: t.features.powerful,
      modern: t.features.modern,
      crossPlatform: t.features.crossPlatform,
      openSource: t.features.openSource
    }
  };
}
