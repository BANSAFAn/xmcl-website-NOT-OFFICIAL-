
import { useEffect, useState } from 'react';

const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      blog: "Blog", 
      guide: "Guide",
      changelog: "Changelog",
      issues: "Issues",
      about: "About",
      docs: "Docs",
      testing: "Testing"
    },
    // Footer
    footer: {
      quickLinks: "Quick Links",
      community: "Community",
      support: "Support",
      resources: "Resources",
      blog: "Blog",
      guide: "User Guide",
      changelog: "Changelog",
      issues: "Issues",
      testing: "Testing",
      discord: "Discord",
      github: "GitHub",
      twitter: "Twitter",
      documentation: "Documentation",
      faq: "FAQ",
      helpCenter: "Help Center",
      contact: "Contact Us",
      builtWith: "Built with ❤️ by XMCL Community",
      allRightsReserved: "All rights reserved.",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      openSource: "Modern cross-platform Minecraft launcher with advanced features",
      madeWith: "Made with Love by Community"
    },
    // Theme
    theme: {
      light: "Light",
      dark: "Dark",
      system: "System"
    },
    // Common
    common: {
      all: "All",
      tryAgain: "Try Again",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      close: "Close",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      back: "Back",
      next: "Next",
      previous: "Previous",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      refresh: "Refresh"
    },
    // Download
    downloadXMCL: "Download XMCL",
    modernCrossplatformDescription: "Modern cross-platform Minecraft launcher with advanced mod management, beautiful interface, and seamless integration with popular modding platforms.",
    githubStars: "GitHub Stars",
    forks: "Forks",
    lastVersion: "Latest Version",
    // Download Section
    downloadSection: {
      title: "Download",
      subtitle: "Get the latest version of XMCL for your platform",
      version: "Version",
      releaseNotes: "Release Notes",
      download: "Download",
      installCommands: "Install Commands",
      moreInfo: "More Info",
      sizeMB: "MB",
      downloadCount: "downloads",
      linuxUniversal: "Linux Universal"
    },
    // Download Messages
    downloadMessages: {
      noVersionsAvailable: "No versions available",
      loadingReleases: "Loading releases...",
      viewAllReleases: "View all releases",
      brewCommands: "Commands copied to clipboard! Run in terminal:",
      releasedOn: "Released on"
    },
    // Issues
    issues: {
      title: "Issues",
      subtitle: "Track bugs, suggest features, and follow project development",
      openIssues: "Open Issues",
      closedIssues: "Closed Issues",
      allIssues: "All Issues",
      reportNewIssue: "Report New Issue",
      viewOnGitHub: "View on GitHub",
      searchPlaceholder: "Search issues...",
      openFilter: "Open",
      closedFilter: "Closed",
      newest: "Newest",
      recentlyUpdated: "Recently Updated",
      mostCommented: "Most Commented",
      filterByLabels: "Filter by Labels",
      loadingIssues: "Loading issues...",
      noIssuesFound: "No issues found",
      createdBy: "Created by",
      errorLoading: "Error loading issues",
      description: "Description",
      comments: "Comments",
      createdOn: "Created on",
      clearFilters: "Clear Filters",
      issueDetails: "Issue Details",
      author: "Author",
      state: "State",
      labels: "Labels",
      assignees: "Assignees",
      milestone: "Milestone",
      lastUpdated: "Last Updated",
      noDescription: "No description provided",
      noLabels: "No labels",
      noAssignees: "No assignees",
      noMilestone: "No milestone"
    },
    // Home
    home: {
      heroTitle: "Next Generation Minecraft Launcher",
      heroSubtitle: "Experience Minecraft like never before with our modern, feature-rich launcher designed for casual players and modding enthusiasts alike.",
      getStarted: "Get Started",
      learnMore: "Learn More",
      featuresTitle: "Why Choose XMCL?",
      openSourceStatus: "Open Source Minecraft Launcher",
      viewOnGitHub: "View on GitHub",
      powerfulFeatures: "Powerful Features",
      everythingYouNeed: "Everything You Need",
      comprehensiveSolution: "A comprehensive solution for the perfect Minecraft experience with advanced features",
      feature1Title: "Advanced Mod Management",
      feature1Description: "Seamlessly install, update, and manage mods from CurseForge, Modrinth, and other platforms with our intuitive interface.",
      feature2Title: "Cross-Platform Support",
      feature2Description: "Native performance and platform-specific optimizations across Windows, macOS, and Linux.",
      feature3Title: "Beautiful Interface",
      feature3Description: "Modern, clean design with customizable themes and layouts that adapt to your preferences.",
      feature4Title: "Optimal Disk Space for Huge Amount of Resources",
      feature4Description: "XMCL will store all mods, resource packs, shader packs, and modpacks to single storage location. When you try to use any known resource, it will use hard link to install the resource to instance without copy. This means you will never see any duplicate copy in /mods folder again.",
      hardLink: "Hard Link",
      symbolicLink: "Symbolic Link",
      feature5Title: "Auto Updates",
      feature5Description: "Keep your mods and game versions up to date automatically with intelligent update management.",
      feature6Title: "Resource Pack Support",
      feature6Description: "Install and manage resource packs and shaders with preview support and easy organization."
    },
    // Blog
    blog: {
      title: "Blog",
      subtitle: "Latest news, updates, and guides from the XMCL team",
      readMore: "Read More",
      backToBlog: "Back to Blog",
      publishedOn: "Published on",
      tags: "Tags",
      relatedPosts: "Related Posts",
      noPostsFound: "No blog posts found",
      loadingPosts: "Loading posts...",
      errorLoading: "Error loading posts"
    },
    // Guide
    guide: {
      title: "User Guide",
      subtitle: "Complete documentation and tutorials to help you get the most out of XMCL",
      tableOfContents: "Table of Contents",
      backToGuide: "Back to Guide",
      nextSection: "Next Section",
      previousSection: "Previous Section",
      searchGuide: "Search guide...",
      noResultsFound: "No results found",
      loadingGuide: "Loading guide...",
      errorLoading: "Error loading guide"
    },
    // Changelog
    changelog: {
      title: "Changelog",
      subtitle: "Track all changes and updates to XMCL",
      version: "Version",
      released: "Released",
      features: "Features",
      improvements: "Improvements",
      bugFixes: "Bug Fixes",
      breaking: "Breaking Changes",
      loadingChangelog: "Loading changelog...",
      errorLoading: "Error loading changelog",
      noChangesFound: "No changes found for this version"
    },
    // Testing
    testing: {
      title: "Testing",
      subtitle: "Test XMCL features and report issues",
      runTest: "Run Test",
      testPassed: "Test Passed",
      testFailed: "Test Failed",
      testInProgress: "Test in Progress",
      allTests: "All Tests",
      passedTests: "Passed Tests",
      failedTests: "Failed Tests",
      testResults: "Test Results",
      noTestsAvailable: "No tests available",
      loadingTests: "Loading tests...",
      errorLoading: "Error loading tests"
    }
  },
  ru: {
    // Navigation
    nav: {
      home: "Главная",
      blog: "Блог",
      guide: "Руководство",
      changelog: "Журнал изменений",
      issues: "Проблемы",
      about: "О нас",
      docs: "Документация",
      testing: "Тестирование"
    },
    // Footer
    footer: {
      quickLinks: "Быстрые ссылки",
      community: "Сообщество",
      support: "Поддержка",
      resources: "Ресурсы",
      blog: "Блог",
      guide: "Руководство пользователя",
      changelog: "Журнал изменений",
      issues: "Проблемы",
      testing: "Тестирование",
      discord: "Discord",
      github: "GitHub",
      twitter: "Twitter",
      documentation: "Документация",
      faq: "FAQ",
      helpCenter: "Центр помощи",
      contact: "Связаться с нами",
      builtWith: "Создано с ❤️ сообществом XMCL",
      allRightsReserved: "Все права защищены.",
      privacyPolicy: "Политика конфиденциальности",
      termsOfService: "Условия использования",
      openSource: "Современный кроссплатформенный лаунчер Minecraft с расширенными функциями",
      madeWith: "Создано с любовью сообществом"
    },
    // Theme
    theme: {
      light: "Светлая",
      dark: "Тёмная",
      system: "Системная"
    },
    // Common
    common: {
      all: "Все",
      tryAgain: "Попробовать снова",
      loading: "Загрузка...",
      error: "Ошибка",
      success: "Успешно",
      close: "Закрыть",
      cancel: "Отмена",
      save: "Сохранить",
      delete: "Удалить",
      edit: "Редактировать",
      view: "Просмотр",
      back: "Назад",
      next: "Далее",
      previous: "Назад",
      search: "Поиск",
      filter: "Фильтр",
      sort: "Сортировка",
      refresh: "Обновить"
    },
    // Download
    downloadXMCL: "Скачать XMCL",
    modernCrossplatformDescription: "Современный кроссплатформенный лаунчер Minecraft с продвинутым управлением модами, красивым интерфейсом и бесшовной интеграцией с популярными платформами модов.",
    githubStars: "GitHub звёзды",
    forks: "Форки",
    lastVersion: "Последняя версия",
    // Download Section
    downloadSection: {
      title: "Скачать",
      subtitle: "Получите последнюю версию XMCL для вашей платформы",
      version: "Версия",
      releaseNotes: "Примечания к релизу",
      download: "Скачать",
      installCommands: "Команды установки",
      moreInfo: "Подробнее",
      sizeMB: "МБ",
      downloadCount: "скачиваний",
      linuxUniversal: "Linux универсальный"
    },
    // Download Messages
    downloadMessages: {
      noVersionsAvailable: "Нет доступных версий",
      loadingReleases: "Загрузка релизов...",
      viewAllReleases: "Посмотреть все релизы",
      brewCommands: "Команды скопированы в буфер обмена! Выполните в терминале:",
      releasedOn: "Выпущен"
    },
    // Issues
    issues: {
      title: "Проблемы",
      subtitle: "Отслеживайте баги, предлагайте функции и следите за разработкой проекта",
      openIssues: "Открытые проблемы",
      closedIssues: "Закрытые проблемы",
      allIssues: "Все проблемы",
      reportNewIssue: "Сообщить о новой проблеме",
      viewOnGitHub: "Посмотреть на GitHub",
      searchPlaceholder: "Поиск проблем...",
      openFilter: "Открытые",
      closedFilter: "Закрытые",
      newest: "Новейшие",
      recentlyUpdated: "Недавно обновлённые",
      mostCommented: "Самые обсуждаемые",
      filterByLabels: "Фильтр по меткам",
      loadingIssues: "Загрузка проблем...",
      noIssuesFound: "Проблемы не найдены",
      createdBy: "Создано",
      errorLoading: "Ошибка загрузки проблем",
      description: "Описание",
      comments: "Комментарии",
      createdOn: "Создано",
      clearFilters: "Очистить фильтры",
      issueDetails: "Детали проблемы",
      author: "Автор",
      state: "Состояние",
      labels: "Метки",
      assignees: "Назначенные",
      milestone: "Этап",
      lastUpdated: "Последнее обновление",
      noDescription: "Описание не предоставлено",
      noLabels: "Нет меток",
      noAssignees: "Не назначено",
      noMilestone: "Нет этапа"
    },
    // Home
    home: {
      heroTitle: "Лаунчер Minecraft нового поколения",
      heroSubtitle: "Испытайте Minecraft как никогда раньше с нашим современным, многофункциональным лаунчером, созданным как для обычных игроков, так и для энтузиастов модов.",
      getStarted: "Начать",
      learnMore: "Узнать больше",
      featuresTitle: "Почему выбрать XMCL?",
      openSourceStatus: "Лаунчер Minecraft с открытым исходным кодом",
      viewOnGitHub: "Посмотреть на GitHub",
      powerfulFeatures: "Мощные функции",
      everythingYouNeed: "Всё что вам нужно",
      comprehensiveSolution: "Комплексное решение для идеального опыта Minecraft с продвинутыми функциями",
      feature1Title: "Продвинутое управление модами",
      feature1Description: "Легко устанавливайте, обновляйте и управляйте модами с CurseForge, Modrinth и других платформ с помощью нашего интуитивного интерфейса.",
      feature2Title: "Кроссплатформенная поддержка",
      feature2Description: "Нативная производительность и специфичные для платформы оптимизации для Windows, macOS и Linux.",
      feature3Title: "Красивый интерфейс",
      feature3Description: "Современный, чистый дизайн с настраиваемыми темами и макетами, адаптирующимися к вашим предпочтениям.",
      feature4Title: "Оптимальное дисковое пространство для огромного количества ресурсов",
      feature4Description: "XMCL будет хранить все моды, ресурс-паки, шейдер-паки и модпаки в едином месте хранения. Когда вы попытаетесь использовать любой известный ресурс, он будет использовать жёсткую ссылку для установки ресурса в экземпляр без копирования. Это означает, что вы больше никогда не увидите дублирующиеся копии в папке /mods.",
      hardLink: "Жёсткая ссылка",
      symbolicLink: "Символическая ссылка",
      feature5Title: "Автообновления",
      feature5Description: "Поддерживайте ваши моды и версии игры актуальными автоматически с умным управлением обновлениями.",
      feature6Title: "Поддержка ресурс-паков",
      feature6Description: "Устанавливайте и управляйте ресурс-паками и шейдерами с поддержкой предпросмотра и легкой организацией."
    },
    // Blog
    blog: {
      title: "Блог",
      subtitle: "Последние новости, обновления и руководства от команды XMCL",
      readMore: "Читать далее",
      backToBlog: "Назад к блогу",
      publishedOn: "Опубликовано",
      tags: "Теги",
      relatedPosts: "Похожие посты",
      noPostsFound: "Посты блога не найдены",
      loadingPosts: "Загрузка постов...",
      errorLoading: "Ошибка загрузки постов"
    },
    // Guide
    guide: {
      title: "Руководство пользователя",
      subtitle: "Полная документация и руководства, чтобы помочь вам получить максимум от XMCL",
      tableOfContents: "Содержание",
      backToGuide: "Назад к руководству",
      nextSection: "Следующий раздел",
      previousSection: "Предыдущий раздел",
      searchGuide: "Поиск в руководстве...",
      noResultsFound: "Результаты не найдены",
      loadingGuide: "Загрузка руководства...",
      errorLoading: "Ошибка загрузки руководства"
    },
    // Changelog
    changelog: {
      title: "Журнал изменений",
      subtitle: "Отслеживайте все изменения и обновления XMCL",
      version: "Версия",
      released: "Выпущен",
      features: "Функции",
      improvements: "Улучшения",
      bugFixes: "Исправления ошибок",
      breaking: "Критические изменения",
      loadingChangelog: "Загрузка журнала изменений...",
      errorLoading: "Ошибка загрузки журнала изменений",
      noChangesFound: "Изменения для этой версии не найдены"
    },
    // Testing
    testing: {
      title: "Тестирование",
      subtitle: "Тестируйте функции XMCL и сообщайте о проблемах",
      runTest: "Запустить тест",
      testPassed: "Тест пройден",
      testFailed: "Тест провален",
      testInProgress: "Тест выполняется",
      allTests: "Все тесты",
      passedTests: "Пройденные тесты",
      failedTests: "Проваленные тесты",
      testResults: "Результаты тестов",
      noTestsAvailable: "Тесты недоступны",
      loadingTests: "Загрузка тестов...",
      errorLoading: "Ошибка загрузки тестов"
    }
  },
  uk: {
    // Navigation
    nav: {
      home: "Головна",
      blog: "Блог",
      guide: "Посібник",
      changelog: "Журнал змін",
      issues: "Проблеми",
      about: "Про нас",
      docs: "Документація",
      testing: "Тестування"
    },
    // Footer
    footer: {
      quickLinks: "Швидкі посилання",
      community: "Спільнота",
      support: "Підтримка",
      resources: "Ресурси",
      blog: "Блог",
      guide: "Посібник користувача",
      changelog: "Журнал змін",
      issues: "Проблеми",
      testing: "Тестування",
      discord: "Discord",
      github: "GitHub",
      twitter: "Twitter",
      documentation: "Документація",
      faq: "FAQ",
      helpCenter: "Центр допомоги",
      contact: "Зв'язатися з нами",
      builtWith: "Створено з ❤️ спільнотою XMCL",
      allRightsReserved: "Всі права захищені.",
      privacyPolicy: "Політика конфіденційності",
      termsOfService: "Умови користування",
      openSource: "Сучасний кросплатформенний лаунчер Minecraft з розширеними функціями",
      madeWith: "Створено з любов'ю спільнотою"
    },
    // Theme
    theme: {
      light: "Світла",
      dark: "Темна",
      system: "Системна"
    },
    // Common
    common: {
      all: "Всі",
      tryAgain: "Спробувати знову",
      loading: "Завантаження...",
      error: "Помилка",
      success: "Успішно",
      close: "Закрити",
      cancel: "Скасувати",
      save: "Зберегти",
      delete: "Видалити",
      edit: "Редагувати",
      view: "Переглянути",
      back: "Назад",
      next: "Далі",
      previous: "Попередній",
      search: "Пошук",
      filter: "Фільтр",
      sort: "Сортування",
      refresh: "Оновити"
    },
    // Download
    downloadXMCL: "Завантажити XMCL",
    modernCrossplatformDescription: "Сучасний кросплатформенний лаунчер Minecraft з розширеним управлінням модами, красивим інтерфейсом та безперешкодною інтеграцією з популярними платформами модів.",
    githubStars: "GitHub зірки",
    forks: "Форки",
    lastVersion: "Остання версія",
    // Download Section
    downloadSection: {
      title: "Завантажити",
      subtitle: "Отримайте останню версію XMCL для вашої платформи",
      version: "Версія",
      releaseNotes: "Примітки до релізу",
      download: "Завантажити",
      installCommands: "Команди встановлення",
      moreInfo: "Більше інформації",
      sizeMB: "МБ",
      downloadCount: "завантажень",
      linuxUniversal: "Linux універсальний"
    },
    // Download Messages
    downloadMessages: {
      noVersionsAvailable: "Немає доступних версій",
      loadingReleases: "Завантаження релізів...",
      viewAllReleases: "Переглянути всі релізи",
      brewCommands: "Команди скопійовано в буфер обміну! Виконайте в терміналі:",
      releasedOn: "Випущено"
    },
    // Issues
    issues: {
      title: "Проблеми",
      subtitle: "Відстежуйте баги, пропонуйте функції та слідкуйте за розробкою проекту",
      openIssues: "Відкриті проблеми",
      closedIssues: "Закриті проблеми",
      allIssues: "Всі проблеми",
      reportNewIssue: "Повідомити про нову проблему",
      viewOnGitHub: "Переглянути на GitHub",
      searchPlaceholder: "Пошук проблем...",
      openFilter: "Відкриті",
      closedFilter: "Закриті",
      newest: "Найновіші",
      recentlyUpdated: "Нещодавно оновлені",
      mostCommented: "Найбільш коментовані",
      filterByLabels: "Фільтр за мітками",
      loadingIssues: "Завантаження проблем...",
      noIssuesFound: "Проблеми не знайдені",
      createdBy: "Створено",
      errorLoading: "Помилка завантаження проблем",
      description: "Опис",
      comments: "Коментарі",
      createdOn: "Створено",
      clearFilters: "Очистити фільтри",
      issueDetails: "Деталі проблеми",
      author: "Автор",
      state: "Стан",
      labels: "Мітки",
      assignees: "Призначені",
      milestone: "Етап",
      lastUpdated: "Останнє оновлення",
      noDescription: "Опис не надано",
      noLabels: "Немає міток",
      noAssignees: "Не призначено",
      noMilestone: "Немає етапу"
    },
    // Home
    home: {
      heroTitle: "Лаунчер Minecraft нового покоління",
      heroSubtitle: "Відчуйте Minecraft як ніколи раніше з нашим сучасним, багатофункціональним лаунчером, створеним як для звичайних гравців, так і для ентузіастів модів.",
      getStarted: "Розпочати",
      learnMore: "Дізнатися більше",
      featuresTitle: "Чому обрати XMCL?",
      openSourceStatus: "Лаунчер Minecraft з відкритим вихідним кодом",
      viewOnGitHub: "Переглянути на GitHub",
      powerfulFeatures: "Потужні функції",
      everythingYouNeed: "Все що вам потрібно",
      comprehensiveSolution: "Комплексне рішення для ідеального досвіду Minecraft з розширеними функціями",
      feature1Title: "Розширене управління модами",
      feature1Description: "Легко встановлюйте, оновлюйте та керуйте модами з CurseForge, Modrinth та інших платформ за допомогою нашого інтуїтивного інтерфейсу.",
      feature2Title: "Кросплатформенна підтримка",
      feature2Description: "Нативна продуктивність та специфічні для платформи оптимізації для Windows, macOS та Linux.",
      feature3Title: "Красивий інтерфейс",
      feature3Description: "Сучасний, чистий дизайн з налаштовуваними темами та макетами, що адаптуються до ваших уподобань.",
      feature4Title: "Оптимальний дисковий простір для величезної кількості ресурсів",
      feature4Description: "XMCL буде зберігати всі моди, ресурс-паки, шейдер-паки та модпаки в єдиному місці зберігання. Коли ви спробуєте використати будь-який відомий ресурс, він буде використовувати жорстке посилання для встановлення ресурсу в екземпляр без копіювання. Це означає, що ви більше ніколи не побачите дублюючі копії в папці /mods.",
      hardLink: "Жорстке посилання",
      symbolicLink: "Символічне посилання",
      feature5Title: "Автооновлення",
      feature5Description: "Підтримуйте ваші моди та версії гри актуальними автоматично з розумним управлінням оновленнями.",
      feature6Title: "Підтримка ресурс-паків",
      feature6Description: "Встановлюйте та керуйте ресурс-паками та шейдерами з підтримкою попереднього перегляду та легкої організації."
    },
    // Blog
    blog: {
      title: "Блог",
      subtitle: "Останні новини, оновлення та посібники від команди XMCL",
      readMore: "Читати далі",
      backToBlog: "Назад до блогу",
      publishedOn: "Опубліковано",
      tags: "Теги",
      relatedPosts: "Схожі пости",
      noPostsFound: "Пости блогу не знайдені",
      loadingPosts: "Завантаження постів...",
      errorLoading: "Помилка завантаження постів"
    },
    // Guide
    guide: {
      title: "Посібник користувача",
      subtitle: "Повна документація та посібники, щоб допомогти вам отримати максимум від XMCL",
      tableOfContents: "Зміст",
      backToGuide: "Назад до посібника",
      nextSection: "Наступний розділ",
      previousSection: "Попередній розділ",
      searchGuide: "Пошук в посібнику...",
      noResultsFound: "Результати не знайдені",
      loadingGuide: "Завантаження посібника...",
      errorLoading: "Помилка завантаження посібника"
    },
    // Changelog
    changelog: {
      title: "Журнал змін",
      subtitle: "Відстежуйте всі зміни та оновлення XMCL",
      version: "Версія",
      released: "Випущено",
      features: "Функції",
      improvements: "Покращення",
      bugFixes: "Виправлення помилок",
      breaking: "Критичні зміни",
      loadingChangelog: "Завантаження журналу змін...",
      errorLoading: "Помилка завантаження журналу змін",
      noChangesFound: "Зміни для цієї версії не знайдені"
    },
    // Testing
    testing: {
      title: "Тестування",
      subtitle: "Тестуйте функції XMCL та повідомляйте про проблеми",
      runTest: "Запустити тест",
      testPassed: "Тест пройдено",
      testFailed: "Тест провалено",
      testInProgress: "Тест виконується",
      allTests: "Всі тести",
      passedTests: "Пройдені тести",
      failedTests: "Провалені тести",
      testResults: "Результати тестів",
      noTestsAvailable: "Тести недоступні",
      loadingTests: "Завантаження тестів...",
      errorLoading: "Помилка завантаження тестів"
    }
  },
  zh: {
    // Navigation
    nav: {
      home: "首页",
      blog: "博客",
      guide: "指南",
      changelog: "更新日志",
      issues: "问题",
      about: "关于",
      docs: "文档",
      testing: "测试"
    },
    // Footer
    footer: {
      quickLinks: "快速链接",
      community: "社区",
      support: "支持",
      resources: "资源",
      blog: "博客",
      guide: "用户指南",
      changelog: "更新日志",
      issues: "问题",
      testing: "测试",
      discord: "Discord",
      github: "GitHub",
      twitter: "Twitter",
      documentation: "文档",
      faq: "常见问题",
      helpCenter: "帮助中心",
      contact: "联系我们",
      builtWith: "由XMCL社区用❤️构建",
      allRightsReserved: "保留所有权利。",
      privacyPolicy: "隐私政策",
      termsOfService: "服务条款",
      openSource: "具有高级功能的现代跨平台Minecraft启动器",
      madeWith: "由社区用爱制作"
    },
    // Theme
    theme: {
      light: "浅色",
      dark: "深色",
      system: "系统"
    },
    // Common
    common: {
      all: "全部",
      tryAgain: "重试",
      loading: "加载中...",
      error: "错误",
      success: "成功",
      close: "关闭",
      cancel: "取消",
      save: "保存",
      delete: "删除",
      edit: "编辑",
      view: "查看",
      back: "返回",
      next: "下一个",
      previous: "上一个",
      search: "搜索",
      filter: "过滤",
      sort: "排序",
      refresh: "刷新"
    },
    // Download
    downloadXMCL: "下载XMCL",
    modernCrossplatformDescription: "现代化跨平台Minecraft启动器，具有高级模组管理、美观界面和与流行模组平台的无缝集成。",
    githubStars: "GitHub星标",
    forks: "分支",
    lastVersion: "最新版本",
    // Download Section
    downloadSection: {
      title: "下载",
      subtitle: "获取适用于您平台的最新版XMCL",
      version: "版本",
      releaseNotes: "发布说明",
      download: "下载",
      installCommands: "安装命令",
      moreInfo: "更多信息",
      sizeMB: "MB",
      downloadCount: "下载次数",
      linuxUniversal: "Linux 通用版"
    },
    // Download Messages
    downloadMessages: {
      noVersionsAvailable: "没有可用版本",
      loadingReleases: "正在加载发布版本...",
      viewAllReleases: "查看所有发布版本",
      brewCommands: "命令已复制到剪贴板！在终端中运行：",
      releasedOn: "发布于"
    },
    // Issues
    issues: {
      title: "问题",
      subtitle: "跟踪错误，建议功能，关注项目开发",
      openIssues: "开放问题",
      closedIssues: "已关闭问题",
      allIssues: "所有问题",
      reportNewIssue: "报告新问题",
      viewOnGitHub: "在GitHub上查看",
      searchPlaceholder: "搜索问题...",
      openFilter: "开放",
      closedFilter: "已关闭",
      newest: "最新",
      recentlyUpdated: "最近更新",
      mostCommented: "评论最多",
      filterByLabels: "按标签筛选",
      loadingIssues: "正在加载问题...",
      noIssuesFound: "未找到问题",
      createdBy: "创建者",
      errorLoading: "加载问题时出错",
      description: "描述",
      comments: "评论",
      createdOn: "创建于",
      clearFilters: "清除筛选器",
      issueDetails: "问题详情",
      author: "作者",
      state: "状态",
      labels: "标签",
      assignees: "分配给",
      milestone: "里程碑",
      lastUpdated: "最后更新",
      noDescription: "未提供描述",
      noLabels: "无标签",
      noAssignees: "未分配",
      noMilestone: "无里程碑"
    },
    // Home
    home: {
      heroTitle: "下一代Minecraft启动器",
      heroSubtitle: "使用我们为休闲玩家和模组爱好者设计的现代化、功能丰富的启动器，体验前所未有的Minecraft。",
      getStarted: "开始使用",
      learnMore: "了解更多",
      featuresTitle: "为什么选择XMCL？",
      openSourceStatus: "开源Minecraft启动器",
      viewOnGitHub: "在GitHub上查看",
      powerfulFeatures: "强大功能",
      everythingYouNeed: "您需要的一切",
      comprehensiveSolution: "具有先进功能的完美Minecraft体验综合解决方案",
      feature1Title: "高级模组管理",
      feature1Description: "通过我们直观的界面，无缝安装、更新和管理来自CurseForge、Modrinth和其他平台的模组。",
      feature2Title: "跨平台支持",
      feature2Description: "在Windows、macOS和Linux上提供原生性能和平台特定优化。",
      feature3Title: "美观界面",
      feature3Description: "现代化、简洁的设计，具有可定制的主题和布局，适应您的偏好。",
      feature4Title: "大量资源的最佳磁盘空间",
      feature4Description: "XMCL会将所有模组、资源包、着色器包和模组包存储到单一存储位置。当您尝试使用任何已知资源时，它将使用硬链接将资源安装到实例中而无需复制。这意味着您再也看不到/mods文件夹中的任何重复副本。",
      hardLink: "硬链接",
      symbolicLink: "符号链接",
      feature5Title: "自动更新",
      feature5Description: "通过智能更新管理自动保持您的模组和游戏版本最新。",
      feature6Title: "资源包支持",
      feature6Description: "安装和管理资源包和着色器，支持预览和轻松组织。"
    },
    // Blog
    blog: {
      title: "博客",
      subtitle: "来自XMCL团队的最新新闻、更新和指南",
      readMore: "阅读更多",
      backToBlog: "返回博客",
      publishedOn: "发布于",
      tags: "标签",
      relatedPosts: "相关文章",
      noPostsFound: "未找到博客文章",
      loadingPosts: "正在加载文章...",
      errorLoading: "加载文章时出错"
    },
    // Guide
    guide: {
      title: "用户指南",
      subtitle: "完整的文档和教程，帮助您充分利用XMCL",
      tableOfContents: "目录",
      backToGuide: "返回指南",
      nextSection: "下一节",
      previousSection: "上一节",
      searchGuide: "搜索指南...",
      noResultsFound: "未找到结果",
      loadingGuide: "正在加载指南...",
      errorLoading: "加载指南时出错"
    },
    // Changelog
    changelog: {
      title: "更新日志",
      subtitle: "跟踪XMCL的所有更改和更新",
      version: "版本",
      released: "已发布",
      features: "功能",
      improvements: "改进",
      bugFixes: "错误修复",
      breaking: "破坏性更改",
      loadingChangelog: "正在加载更新日志...",
      errorLoading: "加载更新日志时出错",
      noChangesFound: "未找到此版本的更改"
    },
    // Testing
    testing: {
      title: "测试",
      subtitle: "测试XMCL功能并报告问题",
      runTest: "运行测试",
      testPassed: "测试通过",
      testFailed: "测试失败",
      testInProgress: "测试进行中",
      allTests: "所有测试",
      passedTests: "通过的测试",
      failedTests: "失败的测试",
      testResults: "测试结果",
      noTestsAvailable: "没有可用的测试",
      loadingTests: "正在加载测试...",
      errorLoading: "加载测试时出错"
    }
  },
  ja: {
    // Navigation
    nav: {
      home: "ホーム",
      blog: "ブログ",
      guide: "ガイド",
      changelog: "変更ログ",
      issues: "課題",
      about: "概要",
      docs: "ドキュメント",
      testing: "テスト"
    },
    // Footer
    footer: {
      quickLinks: "クイックリンク",
      community: "コミュニティ",
      support: "サポート",
      resources: "リソース",
      blog: "ブログ",
      guide: "ユーザーガイド",
      changelog: "変更ログ",
      issues: "課題",
      testing: "テスト",
      discord: "Discord",
      github: "GitHub",
      twitter: "Twitter",
      documentation: "ドキュメント",
      faq: "FAQ",
      helpCenter: "ヘルプセンター",
      contact: "お問い合わせ",
      builtWith: "XMCLコミュニティが❤️で構築",
      allRightsReserved: "全ての権利を保有。",
      privacyPolicy: "プライバシーポリシー",
      termsOfService: "利用規約",
      openSource: "高度な機能を持つ現代的なクロスプラットフォームMinecraftランチャー",
      madeWith: "コミュニティが愛を込めて制作"
    },
    // Theme
    theme: {
      light: "ライト",
      dark: "ダーク",
      system: "システム"
    },
    // Common
    common: {
      all: "すべて",
      tryAgain: "再試行",
      loading: "読み込み中...",
      error: "エラー",
      success: "成功",
      close: "閉じる",
      cancel: "キャンセル",
      save: "保存",
      delete: "削除",
      edit: "編集",
      view: "表示",
      back: "戻る",
      next: "次へ",
      previous: "前へ",
      search: "検索",
      filter: "フィルター",
      sort: "並べ替え",
      refresh: "更新"
    },
    // Download
    downloadXMCL: "XMCLをダウンロード",
    modernCrossplatformDescription: "高度なMod管理、美しいインターフェース、人気のModプラットフォームとのシームレスな統合を備えた現代的なクロスプラットフォームMinecraftランチャー。",
    githubStars: "GitHub スター",
    forks: "フォーク",
    lastVersion: "最新バージョン",
    // Download Section
    downloadSection: {
      title: "ダウンロード",
      subtitle: "お使いのプラットフォーム向けの最新版XMCLを入手",
      version: "バージョン",
      releaseNotes: "リリースノート",
      download: "ダウンロード",
      installCommands: "インストールコマンド",
      moreInfo: "詳細情報",
      sizeMB: "MB",
      downloadCount: "ダウンロード数",
      linuxUniversal: "Linux ユニバーサル"
    },
    // Download Messages
    downloadMessages: {
      noVersionsAvailable: "利用可能なバージョンがありません",
      loadingReleases: "リリース情報を読み込み中...",
      viewAllReleases: "すべてのリリースを表示",
      brewCommands: "コマンドがクリップボードにコピーされました！ターミナルで実行：",
      releasedOn: "リリース日"
    },
    // Issues
    issues: {
      title: "課題",
      subtitle: "バグを追跡し、機能を提案し、プロジェクトの開発を追跡",
      openIssues: "未解決の課題",
      closedIssues: "解決済みの課題",
      allIssues: "すべての課題",
      reportNewIssue: "新しい課題を報告",
      viewOnGitHub: "GitHubで表示",
      searchPlaceholder: "課題を検索...",
      openFilter: "未解決",
      closedFilter: "解決済み",
      newest: "最新",
      recentlyUpdated: "最近更新",
      mostCommented: "コメント数順",
      filterByLabels: "ラベルで絞り込み",
      loadingIssues: "課題を読み込み中...",
      noIssuesFound: "課題が見つかりません",
      createdBy: "作成者",
      errorLoading: "課題の読み込みエラー",
      description: "説明",
      comments: "コメント",
      createdOn: "作成日",
      clearFilters: "フィルターをクリア",
      issueDetails: "課題の詳細",
      author: "作成者",
      state: "状態",
      labels: "ラベル",
      assignees: "担当者",
      milestone: "マイルストーン",
      lastUpdated: "最終更新",
      noDescription: "説明が提供されていません",
      noLabels: "ラベルなし",
      noAssignees: "担当者なし",
      noMilestone: "マイルストーンなし"
    },
    // Home
    home: {
      heroTitle: "次世代Minecraftランチャー",
      heroSubtitle: "カジュアルプレイヤーからModding愛好家まで、すべてのユーザーのために設計された現代的で機能豊富なランチャーで、かつてないMinecraft体験を。",
      getStarted: "始める",
      learnMore: "詳細を見る",
      featuresTitle: "なぜXMCLを選ぶのか？",
      openSourceStatus: "オープンソースMinecraftランチャー",
      viewOnGitHub: "GitHubで表示",
      powerfulFeatures: "強力な機能",
      everythingYouNeed: "必要なものすべて",
      comprehensiveSolution: "高度な機能を備えた完璧なMinecraft体験のための包括的ソリューション",
      feature1Title: "高度なMod管理",
      feature1Description: "直感的なインターフェースで、CurseForge、Modrinth、その他のプラットフォームからModをシームレスにインストール、更新、管理。",
      feature2Title: "クロスプラットフォーム対応",
      feature2Description: "Windows、macOS、Linuxでのネイティブパフォーマンスとプラットフォーム固有の最適化。",
      feature3Title: "美しいインターフェース",
      feature3Description: "カスタマイズ可能なテーマとレイアウトを備えた、お好みに合わせて調整される現代的でクリーンなデザイン。",
      feature4Title: "大量リソースの最適ディスク容量",
      feature4Description: "XMCLは、すべてのMod、リソースパック、シェーダーパック、Modpackを単一のストレージ場所に保存します。既知のリソースを使用しようとすると、コピーせずにハードリンクを使用してリソースをインスタンスにインストールします。これにより、/modsフォルダに重複コピーが表示されることがなくなります。",
      hardLink: "ハードリンク",
      symbolicLink: "シンボリックリンク",
      feature5Title: "自動更新",
      feature5Description: "インテリジェントな更新管理により、Modとゲームバージョンを自動的に最新に保ちます。",
      feature6Title: "リソースパック対応",
      feature6Description: "プレビュー対応と簡単な整理機能でリソースパックとシェーダーをインストール・管理。"
    },
    // Blog
    blog: {
      title: "ブログ",
      subtitle: "XMCLチームからの最新ニュース、アップデート、ガイド",
      readMore: "続きを読む",
      backToBlog: "ブログに戻る",
      publishedOn: "公開日",
      tags: "タグ",
      relatedPosts: "関連記事",
      noPostsFound: "ブログ記事が見つかりません",
      loadingPosts: "記事を読み込み中...",
      errorLoading: "記事の読み込みエラー"
    },
    // Guide
    guide: {
      title: "ユーザーガイド",
      subtitle: "XMCLを最大限に活用するための完全なドキュメントとチュートリアル",
      tableOfContents: "目次",
      backToGuide: "ガイドに戻る",
      nextSection: "次のセクション",
      previousSection: "前のセクション",
      searchGuide: "ガイドを検索...",
      noResultsFound: "結果が見つかりません",
      loadingGuide: "ガイドを読み込み中...",
      errorLoading: "ガイドの読み込みエラー"
    },
    // Changelog
    changelog: {
      title: "変更ログ",
      subtitle: "XMCLのすべての変更とアップデートを追跡",
      version: "バージョン",
      released: "リリース済み",
      features: "機能",
      improvements: "改善",
      bugFixes: "バグ修正",
      breaking: "破壊的変更",
      loadingChangelog: "変更ログを読み込み中...",
      errorLoading: "変更ログの読み込みエラー",
      noChangesFound: "このバージョンの変更が見つかりません"
    },
    // Testing
    testing: {
      title: "テスト",
      subtitle: "XMCL機能をテストして問題を報告",
      runTest: "テストを実行",
      testPassed: "テスト合格",
      testFailed: "テスト失敗",
      testInProgress: "テスト実行中",
      allTests: "すべてのテスト",
      passedTests: "合格したテスト",
      failedTests: "失敗したテスト",
      testResults: "テスト結果",
      noTestsAvailable: "利用可能なテストがありません",
      loadingTests: "テストを読み込み中...",
      errorLoading: "テストの読み込みエラー"
    }
  }
};

export const useTranslation = () => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return {
    t,
    language,
    locale: language,
    changeLanguage
  };
};
