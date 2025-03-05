
export type InfoSectionTitles = {
  mainTitle: string;
  subtitle: string;
};

export type InfoSection = {
  title: string;
  description: string;
  cta?: string;
  ctaLink?: string;
  cta2?: string;
  cta2Link?: string;
  cta3?: string;
  cta3Link?: string;
  cta4?: string;
  cta4Link?: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  id: string;
};

export const infoSectionTitles: Record<string, InfoSectionTitles> = {
  en: {
    mainTitle: "Advanced Features for Modern Minecraft",
    subtitle: "XMCL is designed to enhance your Minecraft experience with powerful features"
  },
  ru: {
    mainTitle: "Расширенные функции для современного Minecraft",
    subtitle: "XMCL разработан для улучшения вашего опыта в Minecraft с мощными функциями"
  },
  uk: {
    mainTitle: "Розширені функції для сучасного Minecraft",
    subtitle: "XMCL розроблений для покращення вашого досвіду в Minecraft з потужними функціями"
  },
  zh: {
    mainTitle: "现代 Minecraft 的高级功能",
    subtitle: "XMCL 旨在通过强大的功能增强您的 Minecraft 体验"
  }
};

export const infoSections: Record<string, InfoSection[]> = {
  en: [
    {
      title: "No more worry about the Game Install",
      description: "XMCL supports installation of vanilla Minecraft, Minecraft Forge, Fabric, and even Optifine All in One! You can install them in a single place within the Launcher. It also supports the third party mirror link BMCL API. You can even customize your own mirror in the launcher.",
      cta: "BMCL API",
      ctaLink: "https://bmclapidoc.bangbang93.com/",
      image: "/XMCL/3.gif",
      imageAlt: "Game Installation",
      id: "game-install"
    },
    {
      title: "Optimal disk space with Massive Resources",
      description: "XMCL will store all the mods, resource packs, shader packs and modpacks to a single store location. While you try to use any known resource, it will use hard link to install the resource to the instance without copying. It means you will never see any duplicated copy in /mods folder anymore.",
      cta: "Hard link",
      ctaLink: "https://en.wikipedia.org/wiki/Hard_link",
      cta2: "Symbolic link",
      cta2Link: "https://en.wikipedia.org/wiki/Symbolic_link",
      image: "/XMCL/2.gif",
      imageAlt: "Disk Space Management",
      reverse: true,
      id: "disk-space"
    },
    {
      title: "Keep your workspace Clean with multi-instances",
      description: "XMCL has built in support of multi-instances. You can create multiple instances easily. So you don't need to be worried about the mixture of the different launch settings.",
      image: "/XMCL/5.gif",
      imageAlt: "Multi-instances",
      id: "multi-instances"
    },
    {
      title: "Integrated with Multiple Communities",
      description: "XMCL built in supports with Curseforge & Modrinth. It also provides the ability to support custom user accounts/skin systems like blessing skin.",
      cta: "Curseforge",
      ctaLink: "https://curseforge.com/minecraft/",
      cta2: "Modrinth",
      cta2Link: "https://modrinth.com/",
      cta3: "Blessing Skin",
      cta3Link: "https://github.com/bs-community",
      cta4: "Authlib Injector",
      cta4Link: "https://blessing.netlify.app/yggdrasil-api/authlib-injector.html",
      image: "/XMCL/4.gif",
      imageAlt: "Community Integration",
      reverse: true,
      id: "community"
    }
  ],
  ru: [
    {
      title: "Не беспокойтесь об установке игры",
      description: "XMCL поддерживает установку vanilla Minecraft, Minecraft Forge, Fabric и даже Optifine - всё в одном! Вы можете установить их в одном месте в Лаунчере. Также поддерживается сторонняя зеркальная ссылка BMCL API. Вы даже можете настроить собственное зеркало в лаунчере.",
      cta: "BMCL API",
      ctaLink: "https://bmclapidoc.bangbang93.com/",
      image: "/XMCL/3.gif",
      imageAlt: "Установка игры",
      id: "game-install"
    },
    {
      title: "Оптимальное дисковое пространство с массивными ресурсами",
      description: "XMCL хранит все моды, пакеты ресурсов, шейдеры и модпаки в одном месте. Когда вы пытаетесь использовать любой известный ресурс, он использует жесткую ссылку для установки ресурса в экземпляр без копирования. Это означает, что вы больше никогда не увидите дублированных копий в папке /mods.",
      cta: "Жесткая ссылка",
      ctaLink: "https://en.wikipedia.org/wiki/Hard_link",
      cta2: "Символическая ссылка",
      cta2Link: "https://en.wikipedia.org/wiki/Symbolic_link",
      image: "/XMCL/2.gif",
      imageAlt: "Управление дисковым пространством",
      reverse: true,
      id: "disk-space"
    },
    {
      title: "Держите рабочее пространство чистым с помощью мульти-экземпляров",
      description: "XMCL имеет встроенную поддержку мульти-экземпляров. Вы можете легко создавать несколько экземпляров. Так что вам не нужно беспокоиться о смешении различных настроек запуска.",
      image: "/XMCL/5.gif",
      imageAlt: "Мульти-экземпляры",
      id: "multi-instances"
    },
    {
      title: "Интеграция с несколькими сообществами",
      description: "XMCL имеет встроенную поддержку Curseforge и Modrinth. Он также предоставляет возможность поддерживать пользовательские учетные записи/системы скинов, такие как Blessing Skin.",
      cta: "Curseforge",
      ctaLink: "https://curseforge.com/minecraft/",
      cta2: "Modrinth",
      cta2Link: "https://modrinth.com/",
      cta3: "Blessing Skin",
      cta3Link: "https://github.com/bs-community",
      cta4: "Authlib Injector",
      cta4Link: "https://blessing.netlify.app/yggdrasil-api/authlib-injector.html",
      image: "/XMCL/4.gif",
      imageAlt: "Интеграция с сообществами",
      reverse: true,
      id: "community"
    }
  ],
  uk: [
    {
      title: "Не турбуйтеся про встановлення гри",
      description: "XMCL підтримує встановлення vanilla Minecraft, Minecraft Forge, Fabric і навіть Optifine - все в одному! Ви можете встановити їх в одному місці в Лаунчері. Також підтримується стороннє дзеркальне посилання BMCL API. Ви навіть можете налаштувати власне дзеркало в лаунчері.",
      cta: "BMCL API",
      ctaLink: "https://bmclapidoc.bangbang93.com/",
      image: "/XMCL/3.gif",
      imageAlt: "Встановлення гри",
      id: "game-install"
    },
    {
      title: "Оптимальний дисковий простір з масивними ресурсами",
      description: "XMCL зберігає всі моди, пакети ресурсів, шейдери та модпаки в одному місці. Коли ви намагаєтеся використовувати будь-який відомий ресурс, він використовує жорстке посилання для встановлення ресурсу в екземпляр без копіювання. Це означає, що ви більше ніколи не побачите дубльованих копій у папці /mods.",
      cta: "Жорстке посилання",
      ctaLink: "https://en.wikipedia.org/wiki/Hard_link",
      cta2: "Символічне посилання",
      cta2Link: "https://en.wikipedia.org/wiki/Symbolic_link",
      image: "/XMCL/2.gif",
      imageAlt: "Управління дисковим простором",
      reverse: true,
      id: "disk-space"
    },
    {
      title: "Тримайте робочий простір чистим за допомогою мульти-екземплярів",
      description: "XMCL має вбудовану підтримку мульти-екземплярів. Ви можете легко створювати кілька екземплярів. Тож вам не потрібно турбуватися про змішування різних налаштувань запуску.",
      image: "/XMCL/5.gif",
      imageAlt: "Мульти-екземпляри",
      id: "multi-instances"
    },
    {
      title: "Інтеграція з кількома спільнотами",
      description: "XMCL має вбудовану підтримку Curseforge та Modrinth. Він також надає можливість підтримувати користувацькі облікові записи/системи скінів, такі як Blessing Skin.",
      cta: "Curseforge",
      ctaLink: "https://curseforge.com/minecraft/",
      cta2: "Modrinth",
      cta2Link: "https://modrinth.com/",
      cta3: "Blessing Skin",
      cta3Link: "https://github.com/bs-community",
      cta4: "Authlib Injector",
      cta4Link: "https://blessing.netlify.app/yggdrasil-api/authlib-injector.html",
      image: "/XMCL/4.gif",
      imageAlt: "Інтеграція зі спільнотами",
      reverse: true,
      id: "community"
    }
  ],
  zh: [
    {
      title: "不再担心游戏安装",
      description: "XMCL 支持一站式安装原版 Minecraft、Minecraft Forge、Fabric 甚至 Optifine！您可以在启动器中的单一位置安装它们。它还支持第三方镜像链接 BMCL API。您甚至可以在启动器中自定义自己的镜像。",
      cta: "BMCL API",
      ctaLink: "https://bmclapidoc.bangbang93.com/",
      image: "/XMCL/3.gif",
      imageAlt: "游戏安装",
      id: "game-install"
    },
    {
      title: "大型资源的最佳磁盘空间利用",
      description: "XMCL 将所有模组、资源包、着色器包和模组包存储在单个存储位置。当您尝试使用任何已知资源时，它将使用硬链接将资源安装到实例中而无需复制。这意味着您将不再在 /mods 文件夹中看到任何重复的副本。",
      cta: "硬链接",
      ctaLink: "https://en.wikipedia.org/wiki/Hard_link",
      cta2: "符号链接",
      cta2Link: "https://en.wikipedia.org/wiki/Symbolic_link",
      image: "/XMCL/2.gif",
      imageAlt: "磁盘空间管理",
      reverse: true,
      id: "disk-space"
    },
    {
      title: "多实例保持工作空间整洁",
      description: "XMCL 内置支持多实例。您可以轻松创建多个实例，因此您无需担心不同启动设置的混合问题。",
      image: "/XMCL/5.gif",
      imageAlt: "多实例",
      id: "multi-instances"
    },
    {
      title: "与多个社区集成",
      description: "XMCL 内置支持 Curseforge 和 Modrinth。它还提供了支持自定义用户账户/皮肤系统（如 Blessing Skin）的能力。",
      cta: "Curseforge",
      ctaLink: "https://curseforge.com/minecraft/",
      cta2: "Modrinth",
      cta2Link: "https://modrinth.com/",
      cta3: "Blessing Skin",
      cta3Link: "https://github.com/bs-community",
      cta4: "Authlib Injector",
      cta4Link: "https://blessing.netlify.app/yggdrasil-api/authlib-injector.html",
      image: "/XMCL/4.gif",
      imageAlt: "社区集成",
      reverse: true,
      id: "community"
    }
  ]
};
