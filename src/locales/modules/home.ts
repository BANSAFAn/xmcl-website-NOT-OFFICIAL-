
import type { SupportedLocale } from '@/types/i18n';

export interface HomeTranslations {
  heroTitle: string;
  heroSubtitle: string;
  getStarted: string;
  learnMore: string;
  featuresTitle: string;
  openSourceStatus: string;
  viewOnGitHub: string;
  powerfulFeatures: string;
  everythingYouNeed: string;
  comprehensiveSolution: string;
  feature1Title: string;
  feature1Description: string;
  feature2Title: string;
  feature2Description: string;
  feature3Title: string;
  feature3Description: string;
  feature4Title: string;
  feature4Description: string;
  hardLink: string;
  symbolicLink: string;
  feature5Title: string;
  feature5Description: string;
  // Feature translations
  installingFrameworks: string;
  installingFrameworksDesc: string;
  downloadManage: string;
  downloadManageDesc: string;
  crossPlatformSupport: string;
  crossPlatformDesc: string;
  resourcePackManagement: string;
  resourcePackManagementDesc: string;
  crossPlatform: string;
  crossPlatformFeatureDesc: string;
  // New translations
  downloadManageWhatever: string;
  downloadManageWhateverDesc: string;
  crossPlatformSupportTitle: string;
  crossPlatformSupportDesc: string;
  installingAnyFramework: string;
  installingAnyFrameworkDesc: string;
}

export const homeTranslations: Record<SupportedLocale, HomeTranslations> = {
  en: {
    heroTitle: "Modern Minecraft Launcher",
    heroSubtitle: "Experience Minecraft like never before with advanced mod management, performance optimization, and cross-platform support",
    getStarted: "Get Started",
    learnMore: "Learn More",
    featuresTitle: "Powerful Features",
    openSourceStatus: "Open Source",
    viewOnGitHub: "View on GitHub",
    powerfulFeatures: "Powerful Features",
    everythingYouNeed: "Everything You Need",
    comprehensiveSolution: "A comprehensive solution for Minecraft modding",
    feature1Title: "Mod Management",
    feature1Description: "Easily install, update, and manage your mods with built-in mod loaders support",
    feature2Title: "Performance Optimization",
    feature2Description: "Advanced memory management and performance tuning for smooth gameplay",
    feature3Title: "Instance Management",
    feature3Description: "Create and manage multiple game instances with different mod configurations",
    feature4Title: "Cross-Platform",
    feature4Description: "Available for Windows, macOS, and Linux with native performance",
    hardLink: "Hard Link",
    symbolicLink: "Symbolic Link",
    feature5Title: "Resource Pack Management",
    feature5Description: "Organize and apply resource packs with preview and automatic updates",
    installingFrameworks: "Installing Frameworks",
    installingFrameworksDesc: "Automatic installation and management of mod frameworks like Forge, Fabric, and Quilt",
    downloadManage: "Download & Manage",
    downloadManageDesc: "Smart download management with resume capability and integrity verification",
    crossPlatformSupport: "Cross-Platform Support",
    crossPlatformDesc: "Native performance on Windows, macOS, and Linux with consistent user experience",
    resourcePackManagement: "Resource Pack Management",
    resourcePackManagementDesc: "Preview, organize, and apply resource packs with automatic conflict resolution",
    crossPlatform: "Cross-Platform",
    crossPlatformFeatureDesc: "Run seamlessly on all major operating systems",
    downloadManageWhatever: "Download and manage whatever you want",
    downloadManageWhateverDesc: "You can download maps, mods, shaders, texture packs, mod packs, and much more from official sources. And it's very easy.",
    crossPlatformSupportTitle: "Cross-Platform Support",
    crossPlatformSupportDesc: "XMCL runs seamlessly across all major operating systems, providing a consistent experience everywhere.",
    installingAnyFramework: "Installing any framework for your instance",
    installingAnyFrameworkDesc: "You can install any framework on your regular Minecraft."
  },
  ru: {
    heroTitle: "Современный лаунчер Minecraft",
    heroSubtitle: "Испытайте Minecraft как никогда прежде с продвинутым управлением модами, оптимизацией производительности и кроссплатформенной поддержкой",
    getStarted: "Начать",
    learnMore: "Узнать больше",
    featuresTitle: "Мощные функции",
    openSourceStatus: "Открытый исходный код",
    viewOnGitHub: "Посмотреть на GitHub",
    powerfulFeatures: "Мощные функции",
    everythingYouNeed: "Всё что вам нужно",
    comprehensiveSolution: "Комплексное решение для модификации Minecraft",
    feature1Title: "Управление модами",
    feature1Description: "Легко устанавливайте, обновляйте и управляйте модами с поддержкой встроенных загрузчиков модов",
    feature2Title: "Оптимизация производительности",
    feature2Description: "Продвинутое управление памятью и настройка производительности для плавного игрового процесса",
    feature3Title: "Управление экземплярами",
    feature3Description: "Создавайте и управляйте несколькими игровыми экземплярами с разными конфигурациями модов",
    feature4Title: "Кроссплатформенность",
    feature4Description: "Доступно для Windows, macOS и Linux с нативной производительностью",
    hardLink: "Жёсткая ссылка",
    symbolicLink: "Символическая ссылка",
    feature5Title: "Управление ресурс-паками",
    feature5Description: "Организуйте и применяйте ресурс-паками с предварительным просмотром и автоматическими обновлениями",
    installingFrameworks: "Установка фреймворков",
    installingFrameworksDesc: "Автоматическая установка и управление фреймворками модов, такими как Forge, Fabric и Quilt",
    downloadManage: "Загрузка и управление",
    downloadManageDesc: "Умное управление загрузками с возможностью возобновления и проверкой целостности",
    crossPlatformSupport: "Кроссплатформенная поддержка",
    crossPlatformDesc: "Нативная производительность на Windows, macOS и Linux с единообразным пользовательским интерфейсом",
    resourcePackManagement: "Управление ресурс-паками",
    resourcePackManagementDesc: "Предварительный просмотр, организация и применение ресурс-паков с автоматическим разрешением конфликтов",
    crossPlatform: "Кроссплатформенность",
    crossPlatformFeatureDesc: "Безупречная работа на всех основных операционных системах",
    downloadManageWhatever: "Загружайте и управляйте чем угодно",
    downloadManageWhateverDesc: "Вы можете загружать карты, моды, шейдеры, текстуры, модпаки и многое другое из официальных источников. И это очень просто.",
    crossPlatformSupportTitle: "Кроссплатформенная поддержка",
    crossPlatformSupportDesc: "XMCL работает без проблем на всех основных операционных системах, обеспечивая единообразный опыт везде.",
    installingAnyFramework: "Установка любого фреймворка для вашего экземпляра",
    installingAnyFrameworkDesc: "Вы можете установить любой фреймворк на ваш обычный Minecraft."
  },
  ja: {
    heroTitle: "モダンなMinecraftランチャー",
    heroSubtitle: "高度なMod管理、パフォーマンス最適化、クロスプラットフォームサポートで、これまでにないMinecraft体験を",
    getStarted: "始める",
    learnMore: "詳細を見る",
    featuresTitle: "強力な機能",
    openSourceStatus: "オープンソース",
    viewOnGitHub: "GitHubで見る",
    powerfulFeatures: "強力な機能",
    everythingYouNeed: "必要なものすべて",
    comprehensiveSolution: "Minecraftモッディングの包括的なソリューション",
    feature1Title: "Mod管理",
    feature1Description: "内蔵ModローダーサポートでModの簡単なインストール、更新、管理",
    feature2Title: "パフォーマンス最適化",
    feature2Description: "スムーズなゲームプレイのための高度なメモリ管理とパフォーマンス調整",
    feature3Title: "インスタンス管理",
    feature3Description: "異なるMod構成で複数のゲームインスタンスを作成・管理",
    feature4Title: "クロスプラットフォーム",
    feature4Description: "Windows、macOS、Linuxでネイティブパフォーマンスを提供",
    hardLink: "ハードリンク",
    symbolicLink: "シンボリックリンク",
    feature5Title: "リソースパック管理",
    feature5Description: "プレビューと自動更新でリソースパックを整理・適用",
    installingFrameworks: "フレームワークのインストール",
    installingFrameworksDesc: "Forge、Fabric、QuiltなどのModフレームワークの自動インストールと管理",
    downloadManage: "ダウンロード＆管理",
    downloadManageDesc: "再開機能と整合性検証を備えたスマートダウンロード管理",
    crossPlatformSupport: "クロスプラットフォームサポート",
    crossPlatformDesc: "Windows、macOS、Linuxで一貫したユーザーエクスペリエンスとネイティブパフォーマンス",
    resourcePackManagement: "リソースパック管理",
    resourcePackManagementDesc: "自動競合解決機能付きのリソースパックのプレビュー、整理、適用",
    crossPlatform: "クロスプラットフォーム",
    crossPlatformFeatureDesc: "すべての主要なオペレーティングシステムでシームレスに動作",
    downloadManageWhatever: "何でもダウンロード＆管理",
    downloadManageWhateverDesc: "公式ソースからマップ、Mod、シェーダー、テクスチャパック、Modパックなど、様々なものをダウンロードできます。とても簡単です。",
    crossPlatformSupportTitle: "クロスプラットフォームサポート",
    crossPlatformSupportDesc: "XMCLはすべての主要なオペレーティングシステムでシームレスに動作し、どこでも一貫したエクスペリエンスを提供します。",
    installingAnyFramework: "インスタンス用の任意のフレームワークのインストール",
    installingAnyFrameworkDesc: "通常のMinecraftに任意のフレームワークをインストールできます。"
  },
  zh: {
    heroTitle: "现代Minecraft启动器",
    heroSubtitle: "通过先进的模组管理、性能优化和跨平台支持，体验前所未有的Minecraft",
    getStarted: "开始使用",
    learnMore: "了解更多",
    featuresTitle: "强大功能",
    openSourceStatus: "开源",
    viewOnGitHub: "在GitHub上查看",
    powerfulFeatures: "强大功能",
    everythingYouNeed: "您所需的一切",
    comprehensiveSolution: "Minecraft模组的综合解决方案",
    feature1Title: "模组管理",
    feature1Description: "通过内置模组加载器支持轻松安装、更新和管理模组",
    feature2Title: "性能优化",
    feature2Description: "为流畅游戏体验提供先进的内存管理和性能调优",
    feature3Title: "实例管理",
    feature3Description: "创建和管理具有不同模组配置的多个游戏实例",
    feature4Title: "跨平台",
    feature4Description: "支持Windows、macOS和Linux，提供原生性能",
    hardLink: "硬链接",
    symbolicLink: "符号链接",
    feature5Title: "资源包管理",
    feature5Description: "通过预览和自动更新来组织和应用资源包",
    installingFrameworks: "安装框架",
    installingFrameworksDesc: "自动安装和管理Forge、Fabric和Quilt等模组框架",
    downloadManage: "下载与管理",
    downloadManageDesc: "具有断点续传和完整性验证的智能下载管理",
    crossPlatformSupport: "跨平台支持",
    crossPlatformDesc: "在Windows、macOS和Linux上提供一致用户体验的原生性能",
    resourcePackManagement: "资源包管理",
    resourcePackManagementDesc: "具有自动冲突解决功能的资源包预览、组织和应用",
    crossPlatform: "跨平台",
    crossPlatformFeatureDesc: "在所有主要操作系统上无缝运行",
    downloadManageWhatever: "下载和管理任何你想要的",
    downloadManageWhateverDesc: "您可以从官方来源下载地图、模组、着色器、材质包、模组包等等。而且非常简单。",
    crossPlatformSupportTitle: "跨平台支持",
    crossPlatformSupportDesc: "XMCL在所有主要操作系统上无缝运行，在任何地方都提供一致的体验。",
    installingAnyFramework: "为您的实例安装任何框架",
    installingAnyFrameworkDesc: "您可以在常规Minecraft上安装任何框架。"
  },
  uk: {
    heroTitle: "Сучасний лаунчер Minecraft",
    heroSubtitle: "Відчуйте Minecraft як ніколи раніше з розширеним управлінням модами, оптимізацією продуктивності та кросплатформенною підтримкою",
    getStarted: "Почати",
    learnMore: "Дізнатися більше",
    featuresTitle: "Потужні функції",
    openSourceStatus: "Відкритий код",
    viewOnGitHub: "Подивитися на GitHub",
    powerfulFeatures: "Потужні функції",
    everythingYouNeed: "Все що вам потрібно",
    comprehensiveSolution: "Комплексне рішення для модифікації Minecraft",
    feature1Title: "Управління модами",
    feature1Description: "Легко встановлюйте, оновлюйте та керуйте модами з підтримкою вбудованих завантажувачів модів",
    feature2Title: "Оптимізація продуктивності",
    feature2Description: "Розширене управління пам'яттю та налаштування продуктивності для плавного ігрового процесу",
    feature3Title: "Управління екземплярами",
    feature3Description: "Створюйте та керуйте кількома ігровими екземплярами з різними конфігураціями модів",
    feature4Title: "Кросплатформенність",
    feature4Description: "Доступно для Windows, macOS та Linux з нативною продуктивністю",
    hardLink: "Жорстке посилання",
    symbolicLink: "Символічне посилання",
    feature5Title: "Управління ресурс-паками",
    feature5Description: "Організовуйте та застосовуйте ресурс-паки з попереднім переглядом та автоматичними оновленнями",
    installingFrameworks: "Встановлення фреймворків",
    installingFrameworksDesc: "Автоматичне встановлення та управління фреймворками модів, такими як Forge, Fabric та Quilt",
    downloadManage: "Завантаження та управління",
    downloadManageDesc: "Розумне управління завантаженнями з можливістю відновлення та перевіркою цілісності",
    crossPlatformSupport: "Кросплатформенна підтримка", 
    crossPlatformDesc: "Нативна продуктивність на Windows, macOS та Linux з єдиним користувацьким досвідом",
    resourcePackManagement: "Управління ресурс-паками",
    resourcePackManagementDesc: "Попередній перегляд, організація та застосування ресурс-паків з автоматичним вирішенням конфліктів",
    crossPlatform: "Кросплатформенність",
    crossPlatformFeatureDesc: "Бездоганна робота на всіх основних операційних системах",
    downloadManageWhatever: "Завантажуйте та керуйте всім, чим забажаєте",
    downloadManageWhateverDesc: "Ви можете завантажувати карти, моди, шейдери, текстури, модпаки та багато іншого з офіційних джерел. І це дуже легко.",
    crossPlatformSupportTitle: "Кросплатформенна підтримка", 
    crossPlatformSupportDesc: "XMCL працює бездоганно на всіх основних операційних системах, забезпечуючи єдиний досвід скрізь.",
    installingAnyFramework: "Встановлення будь-якого фреймворку для вашого екземпляра",
    installingAnyFrameworkDesc: "Ви можете встановити будь-який фреймворк на ваш звичайний Minecraft."
  }
};
