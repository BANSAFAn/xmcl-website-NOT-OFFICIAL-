
import type { SupportedLocale } from '@/types/i18n';

export interface DownloadTranslations {
  title: string;
  subtitle: string;
  version: string;
  releaseNotes: string;
  download: string;
  installCommands: string;
  moreInfo: string;
  sizeMB: string;
  downloadCount: string;
  linuxUniversal: string;
  // Package descriptions
  windowsInstallerDesc: string;
  windowsArchiveDesc: string;
  windowsStoreDesc: string;
  wingetDesc: string;
  macosPackageDesc: string;
  macosPackageArmDesc: string;
  homebrewDesc: string;
  debianDesc: string;
  debianArmDesc: string;
  rpmDesc: string;
  rpmArmDesc: string;
  appImageDesc: string;
  appImageArmDesc: string;
  tarDesc: string;
  tarArmDesc: string;
  aurDesc: string;
  flathubDesc: string;
}

export interface DownloadMessagesTranslations {
  noVersionsAvailable: string;
  loadingReleases: string;
  viewAllReleases: string;
  brewCommands: string;
  releasedOn: string;
}

export const downloadTranslations: Record<SupportedLocale, DownloadTranslations> = {
  en: {
    title: "Download",
    subtitle: "Get the latest version of XMCL for your platform",
    version: "Version",
    releaseNotes: "Release Notes",
    download: "Download",
    installCommands: "Install Commands",
    moreInfo: "More Info",
    sizeMB: "MB",
    downloadCount: "downloads",
    linuxUniversal: "Universal Linux Package",
    // Package descriptions
    windowsInstallerDesc: "Easy installation wizard for Windows users",
    windowsArchiveDesc: "Portable version, extract and run anywhere",
    windowsStoreDesc: "Install from Microsoft Store for automatic updates",
    wingetDesc: "Install via Windows Package Manager command line",
    macosPackageDesc: "Native macOS installer for Intel-based Macs",
    macosPackageArmDesc: "Optimized for Apple Silicon (M1/M2) processors",
    homebrewDesc: "Install using Homebrew package manager",
    debianDesc: "For Ubuntu, Debian and derivatives (64-bit)",
    debianArmDesc: "For Ubuntu, Debian ARM64 systems",
    rpmDesc: "For Fedora, RHEL, SUSE and derivatives (64-bit)",
    rpmArmDesc: "For Fedora, RHEL, SUSE ARM64 systems",
    appImageDesc: "Universal Linux application, works on any distribution",
    appImageArmDesc: "Universal Linux application for ARM64 systems",
    tarDesc: "Archive for manual installation (64-bit)",
    tarArmDesc: "Archive for manual installation (ARM64)",
    aurDesc: "Community package for Arch Linux users",
    flathubDesc: "Universal Linux package with sandboxing"
  },
  ru: {
    title: "Скачать",
    subtitle: "Получите последнюю версию XMCL для вашей платформы",
    version: "Версия",
    releaseNotes: "Примечания к релизу",
    download: "Скачать",
    installCommands: "Команды установки",
    moreInfo: "Подробнее",
    sizeMB: "МБ",
    downloadCount: "скачиваний",
    linuxUniversal: "Linux Универсальный",
    // Package descriptions
    windowsInstallerDesc: "Простой мастер установки для пользователей Windows",
    windowsArchiveDesc: "Портативная версия, распакуйте и запускайте где угодно",
    windowsStoreDesc: "Установите из Microsoft Store для автоматических обновлений",
    wingetDesc: "Установка через командную строку Windows Package Manager",
    macosPackageDesc: "Нативный установщик для Mac с процессорами Intel",
    macosPackageArmDesc: "Оптимизирован для Apple Silicon (M1/M2)",
    homebrewDesc: "Установка с помощью пакетного менеджера Homebrew",
    debianDesc: "Для Ubuntu, Debian и производных (64-бит)",
    debianArmDesc: "Для Ubuntu, Debian ARM64 систем",
    rpmDesc: "Для Fedora, RHEL, SUSE и производных (64-бит)",
    rpmArmDesc: "Для Fedora, RHEL, SUSE ARM64 систем",
    appImageDesc: "Универсальное приложение для любых дистрибутивов Linux",
    appImageArmDesc: "Универсальное приложение для ARM64 систем",
    tarDesc: "Архив для ручной установки (64-бит)",
    tarArmDesc: "Архив для ручной установки (ARM64)",
    aurDesc: "Пакет сообщества для пользователей Arch Linux",
    flathubDesc: "Универсальный Linux пакет с песочницей"
  },
  ja: {
    title: "ダウンロード",
    subtitle: "お使いのプラットフォーム用の最新版XMCLを入手",
    version: "バージョン",
    releaseNotes: "リリースノート",
    download: "ダウンロード",
    installCommands: "インストールコマンド",
    moreInfo: "詳細情報",
    sizeMB: "MB",
    downloadCount: "ダウンロード",
    linuxUniversal: "Linux ユニバーサル",
    windowsInstallerDesc: "Windows用簡単インストールウィザード",
    windowsArchiveDesc: "ポータブル版、どこでも展開して実行可能",
    windowsStoreDesc: "Microsoft Storeから自動更新でインストール",
    wingetDesc: "Windows Package Managerコマンドラインでインストール",
    macosPackageDesc: "Intel Mac用ネイティブインストーラー",
    macosPackageArmDesc: "Apple Silicon (M1/M2)用最適化版",
    homebrewDesc: "Homebrewパッケージマネージャーでインストール",
    debianDesc: "Ubuntu、Debian系用 (64ビット)",
    debianArmDesc: "Ubuntu、Debian ARM64システム用",
    rpmDesc: "Fedora、RHEL、SUSE系用 (64ビット)",
    rpmArmDesc: "Fedora、RHEL、SUSE ARM64システム用",
    appImageDesc: "あらゆるLinuxディストリビューションで動作",
    appImageArmDesc: "ARM64システム用ユニバーサルアプリ",
    tarDesc: "手動インストール用アーカイブ (64ビット)",
    tarArmDesc: "手動インストール用アーカイブ (ARM64)",
    aurDesc: "Arch Linuxユーザー向けコミュニティパッケージ",
    flathubDesc: "サンドボックス機能付きユニバーサルLinuxパッケージ"
  },
  zh: {
    title: "下载",
    subtitle: "获取适用于您平台的最新版本XMCL",
    version: "版本",
    releaseNotes: "发布说明",
    download: "下载",
    installCommands: "安装命令",
    moreInfo: "更多信息",
    sizeMB: "MB",
    downloadCount: "下载次数",
    linuxUniversal: "Linux 通用版",
    windowsInstallerDesc: "Windows用户简易安装向导",
    windowsArchiveDesc: "便携版本，解压即可运行",
    windowsStoreDesc: "从Microsoft Store安装以获得自动更新",
    wingetDesc: "通过Windows包管理器命令行安装",
    macosPackageDesc: "Intel Mac原生安装程序",
    macosPackageArmDesc: "为Apple Silicon (M1/M2)优化",
    homebrewDesc: "使用Homebrew包管理器安装",
    debianDesc: "适用于Ubuntu、Debian及衍生版 (64位)",
    debianArmDesc: "适用于Ubuntu、Debian ARM64系统",
    rpmDesc: "适用于Fedora、RHEL、SUSE及衍生版 (64位)",
    rpmArmDesc: "适用于Fedora、RHEL、SUSE ARM64系统",
    appImageDesc: "通用Linux应用，适用于任何发行版",
    appImageArmDesc: "ARM64系统通用Linux应用",
    tarDesc: "手动安装归档文件 (64位)",
    tarArmDesc: "手动安装归档文件 (ARM64)",
    aurDesc: "Arch Linux用户社区包",
    flathubDesc: "带沙盒功能的通用Linux包"
  },
  uk: {
    title: "Завантажити",
    subtitle: "Отримайте останню версію XMCL для вашої платформи",
    version: "Версія",
    releaseNotes: "Примітки до релізу",
    download: "Завантажити",
    installCommands: "Команди встановлення",
    moreInfo: "Докладніше",
    sizeMB: "МБ",
    downloadCount: "завантажень",
    linuxUniversal: "Linux Універсальний",
    windowsInstallerDesc: "Простий майстер встановлення для користувачів Windows",
    windowsArchiveDesc: "Портативна версія, розпакуйте та запускайте де завгодно",
    windowsStoreDesc: "Встановіть з Microsoft Store для автоматичних оновлень",
    wingetDesc: "Встановлення через командний рядок Windows Package Manager",
    macosPackageDesc: "Нативний інсталятор для Mac з процесорами Intel",
    macosPackageArmDesc: "Оптимізовано для Apple Silicon (M1/M2)",
    homebrewDesc: "Встановлення за допомогою пакетного менеджера Homebrew",
    debianDesc: "Для Ubuntu, Debian та похідних (64-біт)",
    debianArmDesc: "Для Ubuntu, Debian ARM64 систем",
    rpmDesc: "Для Fedora, RHEL, SUSE та похідних (64-біт)",
    rpmArmDesc: "Для Fedora, RHEL, SUSE ARM64 систем",
    appImageDesc: "Універсальний додаток для будь-яких дистрибутивів Linux",
    appImageArmDesc: "Універсальний додаток для ARM64 систем",
    tarDesc: "Архів для ручного встановлення (64-біт)",
    tarArmDesc: "Архів для ручного встановлення (ARM64)",
    aurDesc: "Пакет спільноти для користувачів Arch Linux",
    flathubDesc: "Універсальний Linux пакет з пісочницею"
  }
};

export const downloadMessagesTranslations: Record<SupportedLocale, DownloadMessagesTranslations> = {
  en: {
    noVersionsAvailable: "No versions available",
    loadingReleases: "Loading releases...",
    viewAllReleases: "View All Releases",
    brewCommands: "Commands copied to clipboard! Run in terminal:",
    releasedOn: "Released on"
  },
  ru: {
    noVersionsAvailable: "Нет доступных версий",
    loadingReleases: "Загрузка релизов...",
    viewAllReleases: "Посмотреть все релизы",
    brewCommands: "Команды скопированы в буфер обмена! Выполните в терминале:",
    releasedOn: "Выпущено"
  },
  ja: {
    noVersionsAvailable: "利用可能なバージョンがありません",
    loadingReleases: "リリースを読み込み中...",
    viewAllReleases: "すべてのリリースを表示",
    brewCommands: "コマンドがクリップボードにコピーされました！ターミナルで実行してください：",
    releasedOn: "リリース日"
  },
  zh: {
    noVersionsAvailable: "没有可用版本",
    loadingReleases: "加载发布版本中...",
    viewAllReleases: "查看所有发布版本",
    brewCommands: "命令已复制到剪贴板！在终端中运行：",
    releasedOn: "发布于"
  },
  uk: {
    noVersionsAvailable: "Немає доступних версій",
    loadingReleases: "Завантаження релізів...",
    viewAllReleases: "Переглянути всі релізи",
    brewCommands: "Команди скопійовано до буфера обміну! Виконайте в терміналі:",
    releasedOn: "Випущено"
  }
};
