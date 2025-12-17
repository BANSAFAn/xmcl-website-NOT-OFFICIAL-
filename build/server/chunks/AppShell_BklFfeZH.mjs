import { e as createComponent, f as createAstro, h as addAttribute, l as renderHead, n as renderSlot, o as renderScript, r as renderTemplate } from './astro/server_BQmXhRda.mjs';
import 'piccolore';
import { clsx } from 'clsx';
/* empty css                        */
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import React__default, { createContext, useContext, useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { twMerge } from 'tailwind-merge';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva } from 'class-variance-authority';
import { X, ChevronRight, Check, Circle, Globe, ChevronDown, Search, Moon, Sun, Menu, Home, FileText, BookOpen, GitBranch, AlertCircle, TestTube, Info, ExternalLink, Bug, Zap, Shield, Download, Github, MessageCircle, Heart, Coffee, ArrowRight } from 'lucide-react';
import { useTheme as useTheme$1 } from 'next-themes';
import { Toaster as Toaster$2 } from 'sonner';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Slot } from '@radix-ui/react-slot';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "X Minecraft Launcher",
    description = "Experience Minecraft like never before with XMCL - a modern, feature-rich launcher designed for performance and customization."
  } = Astro2.props;
  return renderTemplate`<html lang="en" class="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><link rel="icon" href="/PhotoXMCL/logo.ico"><meta name="description"${addAttribute(description, "content")}><meta name="author" content="Voxelum"><meta name="theme-color" content="#3b82f6"><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image" content="/PhotoXMCL/591e0b02-a16f-4fe0-8eda-dd9a81f27cf8.png"><meta property="og:site_name" content="X Minecraft Launcher"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image" content="/PhotoXMCL/591e0b02-a16f-4fe0-8eda-dd9a81f27cf8.png">${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} ${renderScript($$result, "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/layouts/Layout.astro", void 0);

const languageConfigs = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  { code: "ja", name: "日本語" },
  { code: "zh", name: "简体中文" },
  { code: "ar", name: "العربية" },
  { code: "zh-Hant", name: "繁體中文" },
  { code: "ko", name: "한국어" },
  { code: "uk", name: "Українська" },
  { code: "ru", name: "Русский" },
  { code: "kz", name: "Қазақша" },
  { code: "by", name: " Беларуская" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "pt", name: "Português" },
  { code: "tr", name: "Türkçe" }
];

const DEFAULT_LOCALE = "en";
const supportedLocales = new Set(languageConfigs.map((lang) => lang.code));
function isSupportedLocale(locale) {
  return supportedLocales.has(locale);
}
const translationModules = /* #__PURE__ */ Object.assign({"../translations/ar.json": () => import('./ar_Dww9ckn9.mjs'),"../translations/by.json": () => import('./by_BV8nN7sn.mjs'),"../translations/de.json": () => import('./de_DsXB4b9i.mjs'),"../translations/en.json": () => Promise.resolve().then(() => en),"../translations/es.json": () => import('./es_BGiRWitQ.mjs'),"../translations/fr.json": () => import('./fr_B9CWLz3_.mjs'),"../translations/it.json": () => import('./it_BP-5gKQ4.mjs'),"../translations/ja.json": () => import('./ja_Cv2JqqLu.mjs'),"../translations/ko.json": () => import('./ko_CUZM38Iy.mjs'),"../translations/kz.json": () => import('./kz_CTPB-OHg.mjs'),"../translations/pt.json": () => import('./pt_BCNVHN2z.mjs'),"../translations/ru.json": () => import('./ru_6W4-Zlic.mjs'),"../translations/tr.json": () => import('./tr_CIIl4d4h.mjs'),"../translations/uk.json": () => import('./uk_DOs3Bph-.mjs'),"../translations/zh.json": () => import('./zh_BfmwbsuY.mjs')});
const localeToModulePath = {
  en: "../translations/en.json",
  ru: "../translations/ru.json",
  uk: "../translations/uk.json",
  zh: "../translations/zh.json",
  ja: "../translations/ja.json",
  ko: "../translations/ko.json",
  de: "../translations/de.json",
  fr: "../translations/fr.json",
  es: "../translations/es.json",
  it: "../translations/it.json",
  ar: "../translations/ar.json",
  by: "../translations/by.json",
  kz: "../translations/kz.json",
  pt: "../translations/pt.json",
  tr: "../translations/tr.json"
};
const translationsCache = /* @__PURE__ */ new Map();
function loadTranslations(locale) {
  if (!isSupportedLocale(locale)) {
    console.warn(`Attempted to load unsupported locale: ${locale}`);
    return Promise.resolve({});
  }
  if (translationsCache.has(locale)) {
    return translationsCache.get(locale);
  }
  const modulePath = localeToModulePath[locale];
  const moduleLoader = translationModules[modulePath];
  if (!moduleLoader) {
    console.error(`No translation module found for locale: ${locale}`);
    if (locale !== DEFAULT_LOCALE) {
      console.log(`Falling back to default locale: ${DEFAULT_LOCALE}`);
      return loadTranslations(DEFAULT_LOCALE);
    }
    return Promise.resolve({});
  }
  const translationPromise = moduleLoader().then((module) => module.default).catch((error) => {
    console.error(`Failed to load translations for ${locale}:`, error);
    translationsCache.delete(locale);
    if (locale !== DEFAULT_LOCALE) {
      console.log(`Falling back to default locale: ${DEFAULT_LOCALE}`);
      return loadTranslations(DEFAULT_LOCALE);
    }
    return {};
  });
  translationsCache.set(locale, translationPromise);
  return translationPromise;
}

const nav = {"home":"Home","about":"About","blog":"Blog","discordnav":"Discord","changelog":"Changelog","guide":"Guide","issues":"Issues","testing":"Testing","information":"Information","aihelp":"AI Help"};
const footer = {"quickLinks":"Quick Links","community":"Community","support":"Support","resources":"Resources","blog":"Blog","guide":"Guide","changelog":"Changelog","issues":"Issues","testing":"Testing","discord":"Discord","github":"GitHub","twitter":"Twitter","documentation":"Documentation","faq":"FAQ","helpCenter":"Help Center","contact":"Contact","builtWith":"Built with","allRightsReserved":"All rights reserved","privacyPolicy":"Privacy Policy","termsOfService":"Terms of Service","openSource":"Open Source","madeWith":"Made with","downloadXMCL":"Download XMCL","viewReleases":"View Releases","launcherBy":"Launcher by","websiteBy":"Website by"};
const theme = {"light":"Light","dark":"Dark","system":"System"};
const common = {"all":"All","tryAgain":"Try Again","loading":"Loading","error":"Error","success":"Success","close":"Close","cancel":"Cancel","save":"Save","delete":"Delete","edit":"Edit","links":"Links","view":"View","back":"Back","next":"Next","previous":"Previous","search":"Search","filter":"Filter","sort":"Sort","refresh":"Refresh","download":"Download","open":"Open","clearFilters":"Clear Filters","share":"Share"};
const home = {"downloads":"Downloads (Not accurate, we don't keep track of auto-updates and many others, this version is more for Windows 64x.)","stars":"Stars","forks":"Forks","ready":"Are you ready already?","readyToStart":"Ready to start?","readyToStartDesc":"Join millions of players who are already using X Minecraft Launcher for the best gaming experience.","tryNow":"Try Now","issues":"Issues","highPerformance":"High Performance","crossPlatform":"Cross Platform","heroTitle":"X Minecraft Launcher","heroSubtitle":"Experience Minecraft like never before with advanced mod management, performance optimization, and cross-platform support","getStarted":"Get Started","learnMore":"Learn More","featuresTitle":"Powerful Features","openSourceStatus":"Open Source","viewOnGitHub":"View on GitHub","powerfulFeatures":"Powerful Features","everythingYouNeed":"Everything You Need","comprehensiveSolution":"A comprehensive solution for Minecraft modding","downloadManageWhatever":"Download & Manage Whatever You Want","optimalDiskSpace":"Optimal disk space with Massive Resources","optimalDiskSpaceDesc":"XMCL will store all the mods, resource packs, shader packs and modpacks to a single store location. While you try to use any known resource, it will use hard link to install the resource to the instance without copying. It means you will never see any duplicated copy in /mods folder anymore.","downloadManageWhateverDesc":"Access thousands of mods from multiple platforms with automatic updates and dependency management","crossPlatformSupportTitle":"True Cross-Platform Support","crossPlatformSupportDesc":"Native performance on Windows, macOS, and Linux with consistent user experience across all platforms","installingAnyFramework":"Installing Any Framework","installingAnyFrameworkDesc":"Support for Forge, Fabric, Quilt, and other mod loaders with seamless switching between different setups","feature1Title":"Mod Management","feature1Description":"Easily install, update, and manage your mods with built-in mod loaders support","feature2Title":"Performance Optimization","feature2Description":"Advanced memory management and performance tuning for smooth gameplay","feature3Title":"Instance Management","feature3Description":"Create and manage multiple game instances with different mod configurations","feature4Title":"Optimal disk space with Massive Resources","feature4Description":"XMCL will store all the mods, resource packs, shader packs and modpacks to a single store location. While you try to use any known resource, it will use hard link to install the resource to the instance without copying. It means you will never see any duplicated copy in /mods folder anymore.","hardLink":"Hard Link","symbolicLink":"Symbolic Link","feature5Title":"Resource Pack Management","multipleInstances":"Multiple Instances","multipleInstancesDesc":"Play online with friends, share files via p2p","p2p":"Peer-to-Peer","feature5Description":"Organize and apply resource packs with preview and automatic updates","feature6Title":"Save Management","feature6Description":"Backup, restore, and share your worlds with cloud synchronization"};
const downloadSection = {"title":"Download","subtitle":"Get the latest version of XMCL for your platform","version":"Version","releaseNotes":"Release Notes","download":"Download","installCommands":"Install Commands","moreInfo":"More Info","sizeMB":"MB","downloadCount":"downloads","windowsArchiveDesc":"Download portable version for Windows","windowsStoreDesc":"Install from Microsoft Store","wingetDesc":"Install with Winget package manager","rpmDesc":"Download RPM package for Linux","debianDesc":"Download DEB package for Linux","tarDesc":"Download TAR archive for Linux","linuxUniversal":"Linux Universal","windowsInstallerDesc":"Download installer for Windows","macosPackageDesc":"Download DMG package for macOS","macosPackageArmDesc":"Download DMG package for macOS (Apple Silicon)","homebrewDesc":"Install with Homebrew","aurDesc":"Install from AUR","flathubDesc":"Install from Flathub","debianArmDesc":"Download DEB package for Linux (ARM64)","rpmArmDesc":"Download RPM package for Linux (ARM64)","appImageDesc":"Download AppImage for Linux","appImageArmDesc":"Download AppImage for Linux (ARM64)","tarArmDesc":"Download TAR archive for Linux (ARM64)","infoButtonLabel":"Package information","info":{"systems":"Systems","advantages":"Advantages","disadvantages":"Disadvantages","default":{"title":"Package Information","desc":"Detailed information about this package type.","systems":"N/A","advantages":"N/A","disadvantages":"N/A"},"windowsInstaller":{"title":"Windows Installer","desc":"A standard Windows installer executable (.exe) file.","systems":"Windows 10/11","advantages":"Easy installation, includes all dependencies, integrates with Windows installer system.","disadvantages":"Requires administrative privileges, larger download size."},"windowsArchive":{"title":"Windows Archive","desc":"A portable ZIP archive containing the application.","systems":"Windows 10/11","advantages":"No installation required, portable, can run from any location.","disadvantages":"No integration with Windows, manual updates, requires manual Java setup."},"windowsStore":{"title":"Windows Store App","desc":"An appx package for installation via Microsoft Store.","systems":"Windows 10/11","advantages":"Automatic updates, integration with Windows Store, sandboxed for security.","disadvantages":"Limited control over installation, requires Microsoft account.","notes":"Requires Windows 10 or later."},"winget":{"title":"Winget Package","desc":"Install via the Windows Package Manager.","systems":"Windows 10/11","advantages":"Command-line installation, version management, automatic updates (if configured).","disadvantages":"Requires Winget to be installed and configured.","notes":"Run 'winget install CI010.XMinecraftLauncher' in Command Prompt or PowerShell."},"macosPackage":{"title":"macOS Package (Intel)","desc":"A DMG disk image for installation on Intel-based Macs.","systems":"macOS (Intel)","advantages":"Standard macOS installation method, easy to install and remove.","disadvantages":"Only for Intel Macs, requires manual updates.","notes":"Drag the application to the Applications folder."},"macosPackageArm":{"title":"macOS Package (Apple Silicon)","desc":"A DMG disk image optimized for Apple Silicon Macs.","systems":"macOS (Apple Silicon)","advantages":"Native performance on Apple Silicon, easy to install and remove.","disadvantages":"Only for Apple Silicon Macs, requires manual updates.","notes":"Drag the application to the Applications folder."},"homebrew":{"title":"Homebrew Formula","desc":"Install via the Homebrew package manager.","systems":"macOS","advantages":"Command-line installation, version management, easy updates.","disadvantages":"Requires Homebrew to be installed, might need Xcode Command Line Tools.","notes":"Run 'brew install --cask voxelum/xmcl' in Terminal."},"debian":{"title":"Debian Package (x64)","desc":"A DEB package for Debian-based Linux distributions (e.g., Ubuntu).","systems":"Linux (x64) - Debian/Ubuntu","advantages":"Standard package format, integrates with system package manager.","disadvantages":"Requires manual download, may have dependency issues.","notes":"Install with 'sudo dpkg -i package.deb' or 'sudo apt install ./package.deb'."},"debianArm":{"title":"Debian Package (ARM64)","desc":"A DEB package for ARM64-based Linux distributions.","systems":"Linux (ARM64) - Debian/Ubuntu","advantages":"Standard package format for ARM64, integrates with system package manager.","disadvantages":"Requires manual download, may have dependency issues.","notes":"Install with 'sudo dpkg -i package.deb' or 'sudo apt install ./package.deb'."},"rpm":{"title":"RPM Package (x64)","desc":"An RPM package for Red Hat-based Linux distributions (e.g., Fedora).","systems":"Linux (x64) - Fedora/RHEL/openSUSE","advantages":"Standard package format, integrates with system package manager.","disadvantages":"Requires manual download, may have dependency issues.","notes":"Install with 'sudo rpm -i package.rpm' or 'sudo dnf install ./package.rpm'."},"rpmArm":{"title":"RPM Package (ARM64)","desc":"An RPM package for ARM64-based Red Hat-based distributions.","systems":"Linux (ARM64) - Fedora/RHEL/openSUSE","advantages":"Standard package format for ARM64, integrates with system package manager.","disadvantages":"Requires manual download, may have dependency issues.","notes":"Install with 'sudo rpm -i package.rpm' or 'sudo dnf install ./package.rpm'."},"appImage":{"title":"AppImage (x64)","desc":"A portable, self-contained application bundle for Linux.","systems":"Linux (x64)","advantages":"No installation required, runs on most x64 Linux distributions, portable.","disadvantages":"Larger file size, no automatic updates, might lack system integration.","notes":"Make executable and run directly."},"appImageArm":{"title":"AppImage (ARM64)","desc":"A portable, self-contained application bundle for ARM64 Linux.","systems":"Linux (ARM64)","advantages":"No installation required, runs on most ARM64 Linux distributions, portable.","disadvantages":"Larger file size, no automatic updates, might lack system integration.","notes":"Make executable and run directly."},"tar":{"title":"Tar Archive (x64)","desc":"A compressed TAR archive containing the application for Linux.","systems":"Linux (x64)","advantages":"No installation required, portable, minimal dependencies.","disadvantages":"No system integration, manual updates, requires manual Java setup.","notes":"Extract and run the executable file inside."},"tarArm":{"title":"Tar Archive (ARM64)","desc":"A compressed TAR archive containing the application for ARM64 Linux.","systems":"Linux (ARM64)","advantages":"No installation required, portable, minimal dependencies.","disadvantages":"No system integration, manual updates, requires manual Java setup.","notes":"Extract and run the executable file inside."},"aur":{"title":"AUR Package","desc":"Install from the Arch User Repository.","systems":"Linux - Arch/Manjaro","advantages":"Easy installation via AUR helpers, integrates with system package manager.","disadvantages":"Requires AUR helper (e.g., paru, yay), compiles from source (longer install time).","notes":"Use 'paru -S xmcl-launcher' or 'yay -S xmcl-launcher'."},"flathub":{"title":"Flathub Package","desc":"Install via the Flathub universal package repository.","systems":"Linux","advantages":"Sandboxed, consistent environment, automatic updates, works on most Linux distributions.","disadvantages":"Requires Flatpak, larger runtime overhead, less native feel.","notes":"Install with 'flatpak install flathub app.xmcl.voxelum'."}}};
const downloadMessages = {"noVersionsAvailable":"No versions available","loadingReleases":"Loading releases...","viewAllReleases":"View All Releases","osWarningTo":"to","osWarningNote":"(May have problems launching / may not start at all)","brewCommands":"Commands copied to clipboard! Run in terminal:","releasedOn":"Released on","detected":"Detected","osWarningTitle":"OS Warning","osWarningDescription":"The site noticed that you are using that OS; when switching, you should understand that it simply won't run for you. Please do not ignore this! ","osWarningCancel":"Cancel","osWarningConfirm":"Confirm","osWarning":"OS Warning","copiedToClipboard":"Copied to clipboard!","copied":"Copied!","copyCommand":"Copy Command","download":"Download","sizeMB":"MB","downloads":"downloads","errorTitle":"Download Error","errorDescription":"Failed to fetch release information.","openGitHub":"Open GitHub","downloadTitle":"Download","downloadDescription":"Get the latest version of XMCL for your platform.","version":"Version","windowsInstaller":"Windows Installer","windowsArchive":"Windows Archive","windowsStoreApp":"Windows Store App","intelX64":"Intel (x64)","appleSiliconARM64":"Apple Silicon (ARM64)","macosPackage":"macOS Package","macosPackageAppleSilicon":"macOS Package (Apple Silicon)","linuxPackage":"Linux Package","debPackage":"DEB Package","rpmPackage":"RPM Package","appImageARM64":"AppImage (ARM64)","tarArchive":"TAR Archive","aur":"AUR (Arch User Repository)","linuxPackageARM64":"Linux Package (ARM64)","debPackageARM64":"DEB Package (ARM64)","rpmPackageARM64":"RPM Package (ARM64)","tarArchiveARM64":"TAR Archive (ARM64)","releaseNotes":"Release Notes","allReleases":"All Releases","macosDescription":"macOS 11.0+","linuxDescription":"Debian, RPM, AppImage","packageManagers":"Package Managers","windowsInstallers":"x64 / Installers","otherOption":"App Store / Other","otherPlatforms":"Other Platforms","appleSilicon":"Apple Silicon (M1/M2)","intel":"Intel (x64)","windowsDescription":"Windows 10/11 (64-bit)","lookingForOlder":"Looking for older versions?"};
const issues = {"title":"Issues & Bug Reports","subtitle":"Track, report, and help resolve issues to improve XMCL for everyone","openIssues":"Open Issues","closedIssues":"Closed Issues","allIssues":"All Issues","reportNewIssue":"Report New Issue","viewOnGitHub":"View on GitHub","searchPlaceholder":"Search issues...","openFilter":"Open","closedFilter":"Closed","newest":"Newest","allLabels":"All Labels","stats":"Stats","recentlyUpdated":"Recently Updated","mostCommented":"Most Commented","filterByLabels":"Filter by Labels","loadingIssues":"Loading issues...","noIssuesFound":"No issues found","createdBy":"Created by","errorLoading":"Error loading issues","description":"Description","comments":"comments","createdOn":"Created on","clearFilters":"Clear Filters","issueDetails":"Issue Details","author":"Author","state":"State","labels":"Labels","assignees":"Assignees","milestone":"Milestone","lastUpdated":"Last Updated","noDescription":"No description provided","noLabels":"No labels","noAssignees":"No assignees","noMilestone":"No milestone"};
const language = {"searchPlaceholder":"Search language...","searchLabel":"Search for a language","noLanguageFound":"Language not found","availableLanguages":"languages available","defaultName":"{{name}}"};
const blog = {"title":"XMCL Blog","subtitle":"Latest news, tutorials, and insights from the XMCL community","searchPosts":"Search Posts","showing":"Showing","readMore":"Read More","readTime":"{{minutes}} min read","backToGuides":"Back to Guides","backToBlog":"Back to Blog","publishedOn":"Published on","tags":"Tags","relatedPosts":"Related Posts","noPostsFound":"No posts found","loadingPosts":"Loading posts...","errorLoading":"Error loading posts","totalPosts":"posts total","featured":"Featured","categories":"Categories","searchPlaceholder":"Search posts...","filterByCategory":"Filter by Category","allCategories":"All Categories","popular":"Popular","recent":"Recent","trending":"Trending","loading":"Loading posts...","blogStats":"Blog Stats","tryAdjustingSearch":"Try adjusting your search parameters","minutes":"min"};
const guide = {"title":"User Guide","filterBy":"Filter by","subtitle":"Comprehensive guides and tutorials to help you master XMCL","searchGuides":"Search Guides","filterByTags":"Filter by Tags","categories":"Categories","noGuides":"No guides available","noGuidesFound":"No guides found","seen":"Seen","category":"Category","total":"Total","stats":"Stats","clear":"Clear","tag":"Tags","search":"Search","rss":"RSS Feed","share":"Share","back":"Back","notfound":"Not Found","error":"Error","copy":"Copy","noGuidesDescription":"No guides available for this category","showing":"Showing","backToGuides":"Back to Guides","tableOfContents":"Table of Contents","backToGuide":"Back to Guide","nextSection":"Next Section","previousSection":"Previous Section","searchGuide":"Search Guide","noResultsFound":"No results found","loadingGuide":"Loading guide...","errorLoading":"Error loading guide","totalGuides":"guides available","searchPlaceholder":"Search guides...","filterByCategory":"Filter by Category","allCategories":"All Categories","newThisMonth":"New This Month","gettingStarted":"Getting Started","advanced":"Advanced","troubleshooting":"Troubleshooting","loading":"Loading guides...","guideStats":"Guide Stats","featured":"Featured","readMore":"Read More","clearFilters":"Clear Filters"};
const information = {"title":"Information","launcher_created_by":"Launcher created by","install":{"winget_desc":"Install using the Windows Package Manager","brew_desc":"Install using Homebrew Cask"},"features":{"title":"Features","download_title":"Download & Auto Complete","not_in_releases_not_found":"Not found release !","all_releases":"All releases","error_loading":"Error loading releases","downloads":"Downloads","download":"Support download Minecraft, Forge, Fabric, Quilt, OptiFine, JVM from official or third party mirrors.","manage_resources_title":"Manage All Resources","manage_resources":"Use (hard/symbolic) links to install resources in instances, keep your disk usage optimal. No copies of mods everywhere!","cross_platform_title":"Cross Platform","cross_platform":"The launcher is based on Electron, and supports Windows 10/11, MacOS, and Linux.","multi_account_title":"Multi-Account System","multi_account":"Built-in Microsoft login and Mojang Yggdrasil API. It also has builtin support of ely.by and littleskin.cn. You can also add third-party authentication servers!","p2p_title":"Peer to Peer Connection","p2p":"You can play multiplayer over LAN even you are not in same physical LAN!","code_sign_title":"Code Sign & Modern Packaging","code_sign":"Under Windows, you can use appx and appinstaller to install the app. You won't receive blocking messages from your browser or see SmartScreen errors anymore!"},"sponsors":{"title":"Sponsors","signpath":"Free code signing on Windows provided by SignPath.io, certificate by SignPath Foundation","deno":"XMCL leverage its hassle-free platform for serverless JavaScript applications. Provided by Deno","tencent":"Best Asian CDN, Edge, and Secure Solutions - Tencent EdgeOne,CDN acceleration and security protection for this project are sponsored by Tencent EdgeOne."},"credit":{"title":"Credit","baner":"who helps me a lot on the RU/UK community.","godleaveme":"maintaining the AUR package registry.","0xc0000142":"maintaining the winget.","marmur2020":"completely translated a Ukrainian language!","vanja-san":"provided Russian language!","lukechu10":"helps me on Launcher core.","laolarou726":"who helps a lot on launcher design.","special_thanks":"Also, special thanks to"},"contributors":{"title":"Contributors"}};
const xmai = {"title":"X Minecraft AI Helper","greeting":"Hello! I am X Minecraft AI. Upload a .txt log file or ask a question about Minecraft issues.","user_label":"You","ai_label":"XM AI","attach_log":"Attach Log (.txt)","file_attached":"File Attached","input_placeholder":"Ask a question or attach a log...","input_error":"Please enter a message or upload a file.","processing_error":"An error occurred while processing the request.","api_error":"An error occurred communicating with the AI.","file_size_error":"File size must not exceed {size} MB.","file_type_error":"Only .txt files are supported.","attached_file":"Attached file","clear_button_title":"Clear Chat","policy_button_title":"Privacy Policy","responses":{"best_launcher":"The best launcher is X Minecraft Launcher (Voxelum). It is stable, functional, and allows efficient resource management. I don't like other launchers.","other_launcher_general":"Nya."},"policy":{"title":"Privacy Policy","content":"This website does not collect your data. Your data is sent to OpenRouter, and they handle it. However, we delete everything you provide. This bot is only for technical support and is not suitable for casual chat."}};
const changelog = {"title":"Changelog","subtitle":"Stay up-to-date with the latest changes, new features, and bug fixes in XMCL","version":"Version","released":"Released","features":"Features","improvements":"Improvements","bugFixes":"Bug Fixes","breaking":"Breaking Changes","loadingChangelog":"Loading changelog...","errorLoading":"Error loading changelog","noChangesFound":"No changes found","totalReleases":"releases total","stableReleases":"Stable Releases","prereleases":"Pre-releases","totalDownloads":"Total Downloads","searchPlaceholder":"Search by version (e.g., 0.53.1)...","filterByType":"Filter by Type","allVersions":"All Versions","stableOnly":"Stable Only","prereleasesOnly":"Pre-releases Only","latestVersion":"Latest Version","latestUpdates":"Latest Updates","downloadCount":"downloads","links":"Links","downloads":"Downloads","releases":"Releases","sortBy":"Sort by","sortNewest":"Newest First","sortMostDownloads":"Most Downloads","sortLeastDownloads":"Least Downloads","showMore":"Show more","showLess":"Show less","loading":"Loading releases...","noResults":"No releases found","tryDifferentSearch":"Try a different search term","retryMessage":"Please try again later or check GitHub directly"};
const testing = {"title":"Testing Builds","buildSuccessful":"Build Successful","buildFailed":"Build Failed","ready":"Ready for Testing","selectPlatform":"Select Platform","showDetails":"Show Details","viewOnGitHub":"View on GitHub","subtitle":"Get early access to the latest features and improvements","warningTitle":"Development Builds","warningDescription":"These builds are for testing purposes only and may contain bugs","useAtOwnRisk":"Use at your own risk","notRecommendedProduction":"Not recommended for production use","reportIssuesGitHub":"Report any issues on GitHub","lastUpdated":"Last Updated","allPlatforms":"All Platforms","downloadWindows":"Download for Windows","downloadLinux":"Download for Linux","downloadMacOS":"Download for macOS","noArtifacts":"No artifacts available","howToDownload":"How to Download","howToDownloadSteps":{"step1":"Choose your platform below","step2":"Download the appropriate file","step3":"Install using your preferred method","step4":"Report any issues you encounter","step5":"Provide feedback to help us improve"},"downloadStarted":"Download started","buildStatus":"Build Status","lastBuild":"Last Build","buildNumber":"Build Number","commitHash":"Commit Hash","buildTime":"Build Time","artifacts":"Artifacts","downloadArtifact":"Download Artifact","loading":"Loading testing builds..."};
const osSwitch = {"switchedTo":"Switched to","availableFor":"Available for"};
const downloadXMCL = "Download XMCL";
const modernCrossplatformDescription = "Modern cross-platform Minecraft launcher";
const githubStars = "GitHub Stars";
const forks = "Forks";
const lastVersion = "Latest Version";
const stats = {"downloads":"Downloads","users":"Users","mods":"Mods"};
const ui = {"loading":"Loading","error":"Error","retry":"Retry","changeLanguage":"Change language"};
const docs = {"title":"Documentation","search":"Search docs"};
const actions = {"preview":"Preview","hide":"Hide","goToIssue":"Go to Issue"};
const meta_description = "Experience Minecraft like never before with XMCL - a modern, feature-rich launcher designed for performance and customization.";
const og_description = "Experience Minecraft like never before with XMCL - a modern, feature-rich launcher designed for performance and customization.";
const og_title = "X Minecraft Launcher";
const enTranslations = {
  nav,
  footer,
  theme,
  common,
  home,
  downloadSection,
  downloadMessages,
  issues,
  language,
  blog,
  guide,
  information,
  xmai,
  changelog,
  testing,
  osSwitch,
  downloadXMCL,
  modernCrossplatformDescription,
  githubStars,
  forks,
  lastVersion,
  stats,
  ui,
  docs,
  actions,
  meta_description,
  og_description,
  og_title,
};

const en = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  actions,
  blog,
  changelog,
  common,
  default: enTranslations,
  docs,
  downloadMessages,
  downloadSection,
  downloadXMCL,
  footer,
  forks,
  githubStars,
  guide,
  home,
  information,
  issues,
  language,
  lastVersion,
  meta_description,
  modernCrossplatformDescription,
  nav,
  og_description,
  og_title,
  osSwitch,
  stats,
  testing,
  theme,
  ui,
  xmai
}, Symbol.toStringTag, { value: 'Module' }));

const TranslationContext = createContext(
  void 0
);
function TranslationProvider({ children }) {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [translationsMap, setTranslationsMap] = useState(() => /* @__PURE__ */ new Map([[DEFAULT_LOCALE, enTranslations]]));
  const [currentTranslations, setCurrentTranslations] = useState(
    enTranslations
  );
  const [isLoading, setIsLoading] = useState(false);
  const changeLanguage = useCallback(
    async (newLocale) => {
      if (!isSupportedLocale(newLocale)) {
        console.warn(`Unsupported locale requested: ${newLocale}`);
        return;
      }
      if (newLocale === locale) {
        return;
      }
      if (translationsMap.has(newLocale)) {
        setLocale(newLocale);
        setCurrentTranslations(translationsMap.get(newLocale));
        try {
          localStorage.setItem("language", newLocale);
        } catch {
        }
        try {
          document.documentElement.lang = newLocale;
        } catch {
        }
        return;
      }
      setIsLoading(true);
      try {
        const loaded = await loadTranslations(newLocale);
        setTranslationsMap((prev) => {
          const next = new Map(prev);
          next.set(newLocale, loaded);
          return next;
        });
        setCurrentTranslations(loaded);
        setLocale(newLocale);
        try {
          localStorage.setItem("language", newLocale);
        } catch {
        }
        try {
          document.documentElement.lang = newLocale;
        } catch {
        }
      } catch (error) {
        console.error("Failed to load translations for", newLocale, error);
      } finally {
        setIsLoading(false);
      }
    },
    [locale, translationsMap]
  );
  useEffect(() => {
    const initializeLanguage = async () => {
      let savedLocale = null;
      try {
        savedLocale = localStorage.getItem("language");
      } catch {
      }
      if (savedLocale && isSupportedLocale(savedLocale) && savedLocale !== DEFAULT_LOCALE) {
        setIsLoading(true);
        try {
          const loaded = await loadTranslations(savedLocale);
          setTranslationsMap((prev) => {
            const next = new Map(prev);
            next.set(savedLocale, loaded);
            return next;
          });
          setCurrentTranslations(loaded);
          setLocale(savedLocale);
          try {
            document.documentElement.lang = savedLocale;
          } catch {
          }
        } catch (error) {
          console.error(
            "Failed to load saved translations for",
            savedLocale,
            error
          );
        } finally {
          setIsLoading(false);
        }
      }
    };
    initializeLanguage();
  }, []);
  const t = useCallback(
    (key, fallback) => {
      const getValue = (translations, keyPath) => {
        const keys = keyPath.split(".");
        let value2 = translations;
        for (const k of keys) {
          if (value2 && typeof value2 === "object" && k in value2) {
            value2 = value2[k];
          } else {
            return null;
          }
        }
        return typeof value2 === "string" ? value2 : null;
      };
      const currentValue = getValue(currentTranslations, key);
      if (currentValue !== null) return currentValue;
      const enValue = getValue(enTranslations, key);
      if (enValue !== null) return enValue;
      return fallback || key;
    },
    [currentTranslations]
  );
  const value = {
    locale,
    translations: currentTranslations,
    changeLanguage,
    t,
    isLoading
  };
  return /* @__PURE__ */ jsx(TranslationContext.Provider, { value, children });
}
function useTranslation$1() {
  const context = useContext(TranslationContext);
  if (context === void 0) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}

const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme$1();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ScrollAreaPrimitive.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx(ScrollBar, {}),
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

const USER_PREFERENCE_KEY = "userPreferredLanguage";
const IP_PREFERENCE_KEY = "userIpLanguageMap";
const getUserIP = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.warn("Could not fetch user IP:", error);
    return null;
  }
};
const LanguageSelectorComponent = () => {
  const { t, locale, changeLanguage } = useTranslation$1();
  const [searchTerm, setSearchTerm] = useState("");
  const [userIP, setUserIP] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    getUserIP().then(setUserIP);
  }, []);
  const saveUserLanguagePreference = useCallback(
    (langCode) => {
      try {
        if (userIP) {
          const ipMap = JSON.parse(
            localStorage.getItem(IP_PREFERENCE_KEY) || "{}"
          );
          ipMap[userIP] = langCode;
          localStorage.setItem(IP_PREFERENCE_KEY, JSON.stringify(ipMap));
        }
        localStorage.setItem(USER_PREFERENCE_KEY, langCode);
      } catch (e) {
        console.warn("Could not save language preference:", e);
      }
    },
    [userIP]
  );
  const getUserLanguagePreference = useCallback(() => {
    try {
      if (userIP) {
        const ipMap = JSON.parse(
          localStorage.getItem(IP_PREFERENCE_KEY) || "{}"
        );
        if (ipMap[userIP]) {
          return ipMap[userIP];
        }
      }
      return localStorage.getItem(USER_PREFERENCE_KEY);
    } catch (e) {
      console.warn("Could not get language preference:", e);
      return null;
    }
  }, [userIP]);
  const filteredLanguages = useMemo(() => {
    if (!searchTerm) return languageConfigs;
    const term = searchTerm.toLowerCase();
    return languageConfigs.filter(
      (lang) => lang.name.toLowerCase().includes(term) || lang.code.toLowerCase().includes(term)
    );
  }, [searchTerm]);
  const handleLanguageChange = useCallback(
    (langCode) => {
      changeLanguage(langCode);
      saveUserLanguagePreference(langCode);
      setSearchTerm("");
      setIsOpen(false);
    },
    [changeLanguage, saveUserLanguagePreference]
  );
  useEffect(() => {
    if (!userIP) return;
    const savedLang = getUserLanguagePreference();
    if (savedLang && languageConfigs.some((lang) => lang.code === savedLang)) {
      if (savedLang !== locale) {
        changeLanguage(savedLang);
      }
    } else if (locale !== "en") {
      changeLanguage("en");
    }
  }, [userIP, getUserLanguagePreference, changeLanguage, locale]);
  const currentLanguage = useMemo(
    () => languageConfigs.find((lang) => lang.code === locale),
    [locale]
  );
  return /* @__PURE__ */ jsxs(DropdownMenu, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        size: "sm",
        className: "group relative h-10 gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 px-4 text-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 dark:from-slate-800 dark:to-slate-700 dark:text-slate-200",
        "aria-label": t("ui.changeLanguage"),
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-500 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 group-hover:opacity-100" }),
          /* @__PURE__ */ jsx(Globe, { className: "relative z-10 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" }),
          /* @__PURE__ */ jsx("span", { className: "relative z-10 hidden font-semibold sm:inline", children: currentLanguage?.name || t("language.defaultName", { name: "English" }) }),
          /* @__PURE__ */ jsx(ChevronDown, { className: "relative z-10 hidden h-4 w-4 opacity-60 transition-all duration-300 group-hover:translate-y-0.5 group-hover:opacity-100 sm:inline" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(
      DropdownMenuContent,
      {
        className: "z-[10000] w-[280px] overflow-hidden rounded-2xl border-2 border-slate-200/50 bg-white/95 p-0 shadow-2xl backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-800/95",
        align: "end",
        sideOffset: 8,
        children: [
          /* @__PURE__ */ jsx("div", { className: "border-b border-slate-200/50 bg-gradient-to-r from-slate-50 to-white p-3 dark:from-slate-800 dark:to-slate-700 dark:border-slate-700/50", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: t("language.searchPlaceholder"),
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                className: "h-10 border-slate-200 bg-white pl-10 pr-4 text-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700",
                "aria-label": t("language.searchLabel")
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(ScrollArea, { className: "h-[320px]", children: /* @__PURE__ */ jsx("div", { className: "p-2", children: filteredLanguages.length > 0 ? filteredLanguages.map((lang) => {
            const isSelected = locale === lang.code;
            return /* @__PURE__ */ jsxs(
              DropdownMenuItem,
              {
                onClick: () => handleLanguageChange(lang.code),
                className: `
                      group relative cursor-pointer gap-3 overflow-hidden rounded-xl px-4 py-3 transition-all duration-200
                      ${isSelected ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30" : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"}
                    `,
                "aria-checked": isSelected,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center justify-between", children: [
                    /* @__PURE__ */ jsx("span", { className: "relative z-10 font-semibold", children: lang.name }),
                    isSelected && /* @__PURE__ */ jsx(Check, { className: "relative z-10 h-5 w-5 animate-in zoom-in-50" })
                  ] }),
                  !isSelected && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" })
                ]
              },
              lang.code
            );
          }) : /* @__PURE__ */ jsx("div", { className: "py-8 text-center text-sm text-slate-500", children: t("language.noLanguageFound") }) }) }),
          /* @__PURE__ */ jsx("div", { className: "border-t border-slate-200/50 bg-gradient-to-r from-slate-50 to-white p-2 dark:from-slate-800 dark:to-slate-700 dark:border-slate-700/50", children: /* @__PURE__ */ jsxs("p", { className: "text-center text-xs text-slate-500 dark:text-slate-400", children: [
            languageConfigs.length,
            " ",
            t("language.availableLanguages")
          ] }) })
        ]
      }
    )
  ] });
};
const LanguageSelector = React__default.memo(LanguageSelectorComponent);

function useTranslation() {
  return useTranslation$1();
}

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  return { theme, setTheme };
};

const ThemeSelector = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };
  return /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: /* @__PURE__ */ jsxs(
    Button,
    {
      variant: "ghost",
      size: "sm",
      onClick: toggleTheme,
      className: "relative h-10 w-10 p-0 overflow-hidden rounded-full bg-muted/80 hover:bg-accent/60 transition-colors",
      "aria-label": isDark ? t("theme.light") : t("theme.dark"),
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute inset-0 opacity-30",
            style: {
              background: isDark ? "radial-gradient(circle, rgb(99 102 241 / 0.5) 0%, transparent 70%)" : "radial-gradient(circle, rgb(251 191 36 / 0.5) 0%, transparent 70%)"
            },
            animate: { opacity: isDark ? 0.5 : 0.3 },
            transition: { duration: 0.4 }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative flex items-center justify-center w-full h-full", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: isDark ? /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { scale: 0.5, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.5, opacity: 0 },
            transition: { duration: 0.2, ease: "easeInOut" },
            children: /* @__PURE__ */ jsx(Moon, { className: "w-5 h-5 text-foreground" })
          },
          "moon"
        ) : /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { scale: 0.5, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.5, opacity: 0 },
            transition: { duration: 0.2, ease: "easeInOut" },
            children: /* @__PURE__ */ jsx(Sun, { className: "w-5 h-5 text-foreground" })
          },
          "sun"
        ) }) }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: isDark ? t("theme.light") : t("theme.dark") })
      ]
    }
  ) });
};

const Link = ({ to, href, children, ...props }) => {
  const finalHref = to || href || "#";
  return /* @__PURE__ */ jsx("a", { href: finalHref, ...props, children });
};

const navItems = [
  { label: "nav.home", href: "/", icon: Home },
  { label: "nav.blog", href: "/blog", icon: FileText },
  { label: "nav.guide", href: "/guide", icon: BookOpen },
  { label: "nav.changelog", href: "/changelog", icon: GitBranch },
  { label: "nav.issues", href: "/issues", icon: AlertCircle },
  { label: "nav.testing", href: "/testing", icon: TestTube },
  { label: "nav.information", href: "/information", icon: Info }
];
const StaggeredMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation$1();
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    }
  };
  const sidebarVariants = {
    closed: {
      x: "-100%",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    open: {
      x: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.button,
      {
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.95 },
        className: "w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/5 shadow-lg flex items-center justify-center group overflow-hidden relative z-50 will-change-transform hover:bg-black/10 dark:hover:bg-white/10 transition-colors",
        onClick: toggleMenu,
        children: /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5 text-slate-700 dark:text-slate-200 opacity-70 group-hover:opacity-100 transition-opacity" })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "fixed inset-0 bg-transparent z-40",
          initial: { opacity: 0, backdropFilter: "blur(0px)" },
          animate: { opacity: 1, backdropFilter: "blur(8px)" },
          exit: { opacity: 0, backdropFilter: "blur(0px)" },
          transition: { duration: 0.3 },
          onClick: toggleMenu
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: "closed",
          animate: "open",
          exit: "closed",
          variants: sidebarVariants,
          className: "fixed top-0 left-0 h-screen z-50 flex flex-col shadow-2xl overflow-hidden backdrop-blur-3xl bg-white/10 dark:bg-black/10 border-r border-white/10 will-change-transform",
          style: { width: "320px" },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-6 border-b border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent", children: "Menu" }),
              /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: toggleMenu, className: "rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
            ] }),
            /* @__PURE__ */ jsxs("nav", { className: "flex flex-col flex-1 px-4 py-6 overflow-y-auto", children: [
              /* @__PURE__ */ jsx(
                motion.ul,
                {
                  variants: containerVariants,
                  initial: "hidden",
                  animate: "visible",
                  className: "space-y-2",
                  children: navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isExternal = item.isExternal;
                    return /* @__PURE__ */ jsx(motion.li, { variants: itemVariants, children: /* @__PURE__ */ jsxs(
                      Link,
                      {
                        to: item.href,
                        onClick: toggleMenu,
                        className: "flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-medium text-slate-800 dark:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 border border-transparent hover:border-black/5 dark:hover:border-white/5 group",
                        target: isExternal ? "_blank" : "_self",
                        rel: isExternal ? "noopener noreferrer" : void 0,
                        children: [
                          /* @__PURE__ */ jsx("div", { className: "p-2 rounded-lg bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300 group-hover:text-blue-500 transition-colors", children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" }) }),
                          t(item.label)
                        ]
                      }
                    ) }, index);
                  })
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-6 border-t border-white/5 space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 gap-2", children: [
                  /* @__PURE__ */ jsx("a", { href: "https://discord.gg/W5XVwYY7GQ", target: "_blank", rel: "noopener noreferrer", className: "aspect-square flex items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 hover:scale-105 transition-all", title: "Discord", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 fill-current", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" }) }) }),
                  /* @__PURE__ */ jsx("a", { href: "https://kook.top/wM7X1f", target: "_blank", rel: "noopener noreferrer", className: "aspect-square flex items-center justify-center rounded-xl bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:scale-105 transition-all", title: "Kook", children: /* @__PURE__ */ jsx(ExternalLink, { className: "w-5 h-5" }) }),
                  /* @__PURE__ */ jsx("a", { href: "https://afdian.com/@ci010", target: "_blank", rel: "noopener noreferrer", className: "aspect-square flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 hover:scale-105 transition-all", title: "Afdian", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 fill-current", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M12.013 7.15l-3.376 6.345h6.77L12.013 7.15zM24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-3.832.748l-4.103-8.89a.537.537 0 0 0-.486-.312h-7.14a.54.54 0 0 0-.5.334l-3.793 8.868a.54.54 0 0 0 .493.766h2.49l.643-1.39h8.336l.724 1.39h2.86a.54.54 0 0 0 .476-.766z" }) }) }),
                  /* @__PURE__ */ jsx("a", { href: "https://ko-fi.com/ci010", target: "_blank", rel: "noopener noreferrer", className: "aspect-square flex items-center justify-center rounded-xl bg-sky-500/10 text-sky-500 hover:bg-sky-500/20 hover:scale-105 transition-all", title: "Ko-fi", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 fill-current", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 3.722-2.671 3.722-2.671s2.111-2.905 2.927-4.245zM12.896 15.556h-7.39V6.02h7.39v9.536zm8.82-3.41s-1.464 2.47-3.834 1.956c0 0 .61-3.66 1.408-5.398 0 0 1.957.519 2.426 3.442zM7.226 8.524c-.219.006-.412.106-.525.275-.773 1.166.309 3.003 1.488 4.343.344.391.802.407 1.157.102 1.325-1.139 2.536-2.923 1.636-4.254-.109-.161-.295-.259-.507-.266-.466.012-.862.241-1.258.463-.39-.228-.79-.462-1.264-.474l-.727-.189z" }) }) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                  /* @__PURE__ */ jsx(LanguageSelector, {}),
                  /* @__PURE__ */ jsx(ThemeSelector, {})
                ] })
              ] })
            ] })
          ]
        }
      )
    ] }) })
  ] });
};

const sponsors = [
  {
    name: "SignPath",
    role: "Code Signing",
    url: "https://signpath.io",
    logo: "PhotoXMCL/signpath.png"
  },
  {
    name: "Deno Deploy",
    role: "Serverless Platform",
    url: "https://deno.com/deploy",
    logo: "PhotoXMCL/deno.gif"
  },
  {
    name: "Tencent EdgeOne",
    role: "CDN & Security",
    url: "https://edgeone.tencent.com",
    logo: "PhotoXMCL/tencent.png"
  }
];
const AnimatedLink = ({
  icon: Icon,
  label,
  href,
  to,
  isExternal = false,
  delay = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const content = /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "group relative overflow-hidden",
      initial: { opacity: 0, x: -20 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay },
      onHoverStart: () => setIsHovered(true),
      onHoverEnd: () => setIsHovered(false),
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            style: {
              backgroundSize: "200% 100%",
              backgroundPosition: isHovered ? "100% 0" : "0% 0"
            }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-between p-3 rounded-xl border border-border/30 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300",
                whileHover: { rotate: [0, -10, 10, 0] },
                transition: { duration: 0.5 },
                children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 text-primary" })
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300", children: label })
          ] }),
          isExternal && /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              initial: false,
              animate: { x: isHovered ? 3 : 0 },
              children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-purple-500",
            initial: { width: 0 },
            whileHover: { width: "100%" },
            transition: { duration: 0.3, ease: "easeInOut" }
          }
        )
      ]
    }
  );
  if (to) {
    return /* @__PURE__ */ jsx(Link, { to, children: content });
  }
  if (href) {
    return /* @__PURE__ */ jsx("a", { href, target: "_blank", rel: "noopener noreferrer", children: content });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: content });
};
const LinksSection = ({ title, links, delay = 0 }) => {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "space-y-4",
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "h-px bg-gradient-to-r from-transparent via-primary to-transparent flex-1",
              initial: { scaleX: 0 },
              whileInView: { scaleX: 1 },
              viewport: { once: true },
              transition: { duration: 0.8, delay: delay + 0.2 }
            }
          ),
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-foreground uppercase tracking-wider px-3", children: title }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "h-px bg-gradient-to-r from-primary to-transparent flex-1",
              initial: { scaleX: 0 },
              whileInView: { scaleX: 1 },
              viewport: { once: true },
              transition: { duration: 0.8, delay: delay + 0.3 }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "relative p-6 rounded-2xl bg-gradient-to-br from-background via-background/80 to-background/60 backdrop-blur-xl border border-border/20 shadow-xl",
            initial: { opacity: 0, scale: 0.95 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: delay + 0.1 },
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-50" }),
              /* @__PURE__ */ jsx("div", { className: "relative space-y-2", children: links.map((link, index) => /* @__PURE__ */ jsx(
                AnimatedLink,
                {
                  icon: link.icon,
                  label: link.label,
                  href: link.href,
                  to: link.to,
                  isExternal: !!link.href,
                  delay: delay + 0.1 + index * 0.1
                },
                link.label
              )) })
            ]
          }
        )
      ]
    }
  );
};
const Footer = ({ onDownloadClick }) => {
  const { t } = useTranslation();
  const [latestVersion, setLatestVersion] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const releaseResponse = await fetch("https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases/latest");
        if (releaseResponse.ok) {
          const releaseData = await releaseResponse.json();
          setLatestVersion(releaseData.tag_name);
        }
      } catch (error) {
        console.error("Error fetching repository data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepoData();
  }, []);
  const socialLinks = [
    { icon: Github, href: "https://github.com/voxelum/x-minecraft-launcher", label: "GitHub" },
    { icon: MessageCircle, href: "https://discord.gg/W5XVwYY7GQ", label: "Discord" },
    { icon: Heart, href: "https://afdian.com/@ci010", label: "Afdian" },
    { icon: Coffee, href: "https://ko-fi.com/ci010", label: "Ko-fi" }
  ];
  const quickLinks = [
    { icon: Home, label: t("nav.home"), to: "/" },
    { icon: BookOpen, label: t("nav.guide"), to: "/guide" },
    { icon: FileText, label: t("nav.changelog"), to: "/changelog" },
    { icon: Bug, label: t("nav.issues"), to: "/issues" }
  ];
  const features = [
    { icon: Zap, label: "Lightning Fast" },
    { icon: Shield, label: "Secure" }
  ];
  return /* @__PURE__ */ jsxs("footer", { className: "relative border-t border-border/30 bg-background", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "space-y-6",
            initial: { opacity: 0, x: -30 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    className: "w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20 shadow-lg",
                    whileHover: { scale: 1.05, rotate: 5 },
                    transition: { type: "spring", stiffness: 300 },
                    children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: "/PhotoXMCL/logo.png",
                        alt: "X Minecraft Launcher logo",
                        className: "w-10 h-10 object-contain"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent", children: "X Minecraft Launcher" }),
                  /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 mt-1", children: /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: loading ? "Loading..." : latestVersion ? `${latestVersion}` : "v?.?.?" }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed", children: [
                t("modernCrossplatformDescription"),
                ". ",
                t("home.comprehensiveSolution"),
                "."
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: features.map((feature, index) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  className: "flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium",
                  initial: { opacity: 0, scale: 0.8 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  transition: { delay: 0.2 + index * 0.1 },
                  whileHover: { scale: 1.05 },
                  children: [
                    /* @__PURE__ */ jsx(feature.icon, { className: "w-3 h-3" }),
                    feature.label
                  ]
                },
                index
              )) }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
                /* @__PURE__ */ jsx(Button, { asChild: true, size: "sm", className: "rounded-xl shadow-lg hover:shadow-xl transition-all group", children: /* @__PURE__ */ jsxs(Link, { to: "/#download-section", onClick: onDownloadClick, children: [
                  /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-2 group-hover:animate-bounce" }),
                  t("footer.downloadXMCL")
                ] }) }),
                /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "rounded-xl", onClick: () => window.open("https://github.com/voxelum/x-minecraft-launcher/releases", "_blank"), children: [
                  /* @__PURE__ */ jsx(Github, { className: "w-4 h-4 mr-2" }),
                  t("footer.viewReleases")
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsx(
            LinksSection,
            {
              title: t("footer.quickLinks"),
              links: quickLinks,
              delay: 0.2
            }
          ),
          /* @__PURE__ */ jsx(
            LinksSection,
            {
              title: t("footer.community"),
              links: socialLinks,
              delay: 0.4
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "mt-12 pt-8 border-t border-border/30",
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          transition: { duration: 0.6, delay: 0.6 },
          children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-foreground mb-6 text-center uppercase tracking-wider", children: "Sponsored by" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-6", children: sponsors.map((sponsor, index) => /* @__PURE__ */ jsxs(
              motion.a,
              {
                href: sponsor.url,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex flex-col items-center group",
                whileHover: { y: -5 },
                transition: { type: "spring", stiffness: 300, damping: 20 },
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-xl bg-white/80 dark:bg-slate-800/80 flex items-center justify-center p-2 mb-2 shadow-sm group-hover:shadow-lg transition-shadow", children: sponsor.logo ? /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: sponsor.logo,
                      alt: sponsor.name,
                      className: "max-w-full max-h-full object-contain"
                    }
                  ) : /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-primary", children: sponsor.name.charAt(0) }) }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: sponsor.name })
                ]
              },
              sponsor.name
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "mt-8 pt-6 border-t border-border/30",
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          transition: { duration: 0.6, delay: 0.7 },
          children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-4 text-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                "© ",
                (/* @__PURE__ */ new Date()).getFullYear(),
                " X Minecraft Launcher. ",
                t("footer.allRightsReserved"),
                "."
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "mt-1", children: [
                t("footer.launcherBy"),
                " ",
                /* @__PURE__ */ jsx("span", { className: "font-medium text-primary", children: "CIO10" }),
                " • ",
                t("footer.websiteBy"),
                " ",
                /* @__PURE__ */ jsx("span", { className: "font-medium text-primary", children: "Baneronetwo" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              t("footer.madeWith"),
              " ",
              /* @__PURE__ */ jsx(Heart, { className: "w-3 h-3 text-red-500" }),
              " ",
              t("footer.openSource")
            ] }) })
          ] })
        }
      )
    ] })
  ] });
};

function useOS() {
  const [os, setOs] = useState("windows");
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("mac")) {
      setOs("macos");
    } else if (userAgent.includes("linux") || userAgent.includes("x11")) {
      setOs("linux");
    } else {
      setOs("windows");
    }
  }, []);
  return os;
}

const MacOSDock = () => {
  const { t } = useTranslation();
  const mouseX = useMotionValue(Infinity);
  const navItems = [
    { label: "nav.home", href: "/", icon: Home },
    { label: "nav.blog", href: "/blog", icon: FileText },
    { label: "nav.guide", href: "/guide", icon: BookOpen },
    { label: "nav.changelog", href: "/changelog", icon: GitBranch },
    { label: "nav.issues", href: "/issues", icon: AlertCircle },
    { label: "nav.testing", href: "/testing", icon: TestTube },
    { label: "nav.information", href: "/information", icon: Info }
  ];
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-8 left-1/2 -translate-x-1/2 z-50", children: /* @__PURE__ */ jsx(
    motion.div,
    {
      onMouseMove: (e) => mouseX.set(e.pageX),
      onMouseLeave: () => mouseX.set(Infinity),
      className: "flex items-end gap-4 h-16 px-4 pb-3 mx-auto rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-2xl border border-white/20 shadow-2xl",
      children: navItems.map((item, index) => /* @__PURE__ */ jsx(DockIcon, { mouseX, item, t }, index))
    }
  ) });
};
function DockIcon({ mouseX, item, t }) {
  const ref = useRef(null);
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });
  const Icon = item.icon;
  return /* @__PURE__ */ jsx(Link, { to: item.href, children: /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        ref,
        style: { width, willChange: "width" },
        className: "aspect-square rounded-full bg-slate-800/80 backdrop-blur-md border border-slate-700/50 flex items-center justify-center relative hover:bg-slate-700/80 transition-colors group",
        children: /* @__PURE__ */ jsx(Icon, { className: "w-1/2 h-1/2 text-slate-200 group-hover:text-white" })
      }
    ) }),
    /* @__PURE__ */ jsx(TooltipContent, { side: "top", children: /* @__PURE__ */ jsx("p", { children: t(item.label) }) })
  ] }) });
}

const queryClient = new QueryClient();
function AppShell({ children }) {
  const os = useOS();
  const handleDownloadClick = () => {
    window.location.href = "/download";
  };
  const isDesktopStyle = os === "macos" || os === "linux";
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(TranslationProvider, { children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
    /* @__PURE__ */ jsx(Toaster$1, {}),
    /* @__PURE__ */ jsx(Toaster, {}),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
      !isDesktopStyle && /* @__PURE__ */ jsx("div", { className: "fixed top-6 left-1/2 -translate-x-1/2 z-50", children: /* @__PURE__ */ jsx(StaggeredMenu, {}) }),
      /* @__PURE__ */ jsx("main", { children }),
      isDesktopStyle && /* @__PURE__ */ jsx(MacOSDock, {}),
      /* @__PURE__ */ jsx(Footer, { onDownloadClick: handleDownloadClick })
    ] })
  ] }) }) });
}

export { $$Layout as $, AppShell as A, Button as B, Input as I, Link as L, useTranslation as a, cn as c, useTranslation$1 as u };
