
export const downloadTranslations = {
  en: {
    title: "Download X Minecraft Launcher",
    subtitle: "Choose the version that works best for your system.",
    currentVersion: "Current Version:",
    downloadBtn: "Download",
    allDownloads: "All downloads are available on",
    githubReleases: "GitHub Releases"
  },
  ru: {
    title: "Скачать X Minecraft Launcher",
    subtitle: "Выберите версию, которая лучше всего подходит для вашей системы.",
    currentVersion: "Текущая версия:",
    downloadBtn: "Скачать",
    allDownloads: "Все загрузки доступны на",
    githubReleases: "GitHub Releases"
  },
  uk: {
    title: "Завантажити X Minecraft Launcher",
    subtitle: "Виберіть версію, яка найкраще підходить для вашої системи.",
    currentVersion: "Поточна версія:",
    downloadBtn: "Завантажити",
    allDownloads: "Усі завантаження доступні на",
    githubReleases: "GitHub Releases"
  },
  zh: {
    title: "下载 X Minecraft 启动器",
    subtitle: "选择最适合您系统的版本。",
    currentVersion: "当前版本：",
    downloadBtn: "下载",
    allDownloads: "所有下载可在",
    githubReleases: "GitHub Releases 获取"
  }
};

export type LanguageKey = 'en' | 'ru' | 'uk' | 'zh';

export const translations = {
  en: {
    windows: {
      installer: "The standard Windows installer. Recommended for most users.",
      appx: "Windows Store package format with automatic updates.",
      portable: "No installation required. Run directly from any location.",
      zip64: "Portable ZIP package for 64-bit Windows systems. Recommended for most users as it requires no installation and can be run from any location. Best for Windows 10/11.",
      zip32: "Legacy ZIP package for 32-bit Windows systems. Use this if you have an older computer or specifically need 32-bit compatibility. Compatible with Windows 7 and later.",
      app: "Traditional Windows installer. Installs XMCL like a standard Windows application with start menu shortcuts and uninstall options. Best for users who prefer traditional installation."
    },
    macos: {
      universal: "Compatible with both Intel and Apple Silicon Macs.",
      arm64: "Optimized for Apple Silicon (M1/M2) Macs. It provides native performance and better energy efficiency on these systems. Use this if you have a newer Mac with Apple's own processors.",
      intel: "For Intel-based Macs. Better compatibility with older systems. If you have an older Mac with an Intel processor, this is the version you should download for best compatibility and performance."
    },
    linux: {
      appimage: "Run on any Linux distribution without installation.",
      flatpak: "Sandboxed installation via Flatpak (community maintained).",
      deb: "For Debian, Ubuntu, and derived distributions.",
      rpm: "For Fedora, RHEL, and derived distributions.",
      arm64: "For ARM64-based Linux systems like Raspberry Pi."
    }
  },
  ru: {
    windows: {
      installer: "Стандартный установщик Windows. Рекомендуется для большинства пользователей.",
      appx: "Формат пакета Windows Store с автоматическими обновлениями.",
      portable: "Установка не требуется. Запускайте из любого места.",
      zip64: "Портативный ZIP-пакет для 64-битных систем Windows. Рекомендуется большинству пользователей, так как не требует установки и может быть запущен из любого места. Лучше всего подходит для Windows 10/11.",
      zip32: "Устаревший ZIP-пакет для 32-битных систем Windows. Используйте его, если у вас старый компьютер или вам конкретно нужна 32-битная совместимость. Совместим с Windows 7 и новее.",
      app: "Традиционный установщик Windows. Устанавливает XMCL как стандартное приложение Windows с ярлыками в меню «Пуск» и возможностью удаления. Лучше всего подходит для пользователей, предпочитающих традиционную установку."
    },
    macos: {
      universal: "Совместимо с компьютерами Mac на базе Intel и Apple Silicon.",
      arm64: "Оптимизировано для Mac с Apple Silicon (M1/M2). Обеспечивает нативную производительность и лучшую энергоэффективность на этих системах. Используйте это, если у вас новый Mac с собственными процессорами Apple.",
      intel: "Для Mac на базе Intel. Лучшая совместимость со старыми системами. Если у вас старый Mac с процессором Intel, это версия, которую вы должны загрузить для наилучшей совместимости и производительности."
    },
    linux: {
      appimage: "Запуск на любом дистрибутиве Linux без установки.",
      flatpak: "Установка в песочнице через Flatpak (поддерживается сообществом).",
      deb: "Для Debian, Ubuntu и производных дистрибутивов.",
      rpm: "Для Fedora, RHEL и производных дистрибутивов.",
      arm64: "Для систем Linux на базе ARM64, таких как Raspberry Pi."
    }
  },
  uk: {
    windows: {
      installer: "Стандартний інсталятор Windows. Рекомендується для більшості користувачів.",
      appx: "Формат пакету Windows Store з автоматичними оновленнями.",
      portable: "Установка не потрібна. Запускайте з будь-якого місця.",
      zip64: "Портативний ZIP-пакет для 64-бітних систем Windows. Рекомендується більшості користувачів, оскільки не потребує встановлення і може бути запущений з будь-якого місця. Найкраще підходить для Windows 10/11.",
      zip32: "Застарілий ZIP-пакет для 32-бітних систем Windows. Використовуйте його, якщо у вас старий комп'ютер або вам конкретно потрібна 32-бітна сумісність. Сумісний з Windows 7 і новіше.",
      app: "Традиційний інсталятор Windows. Встановлює XMCL як стандартний додаток Windows з ярликами в меню «Пуск» та можливістю видалення. Найкраще підходить для користувачів, які віддають перевагу традиційному встановленню."
    },
    macos: {
      universal: "Сумісно з комп'ютерами Mac на базі Intel та Apple Silicon.",
      arm64: "Оптимізовано для Mac з Apple Silicon (M1/M2). Забезпечує нативну продуктивність та кращу енергоефективність на цих системах. Використовуйте це, якщо у вас новий Mac з власними процесорами Apple.",
      intel: "Для Mac на базі Intel. Краща сумісність зі старими системами. Якщо у вас старий Mac з процесором Intel, це версія, яку ви повинні завантажити для найкращої сумісності та продуктивності."
    },
    linux: {
      appimage: "Запуск на будь-якому дистрибутиві Linux без встановлення.",
      flatpak: "Встановлення в пісочниці через Flatpak (підтримується спільнотою).",
      deb: "Для Debian, Ubuntu та похідних дистрибутивів.",
      rpm: "Для Fedora, RHEL та похідних дистрибутивів.",
      arm64: "Для систем Linux на базі ARM64, таких як Raspberry Pi."
    }
  },
  zh: {
    windows: {
      installer: "标准 Windows 安装程序。推荐大多数用户使用。",
      appx: "Windows 应用商店格式，支持自动更新。",
      portable: "无需安装。可以从任意位置直接运行。",
      zip64: "适用于64位Windows系统的便携式ZIP包。推荐大多数用户使用，因为它不需要安装，可以从任何位置运行。最适合Windows 10/11。",
      zip32: "适用于32位Windows系统的传统ZIP包。如果您使用的是较旧的计算机或特别需要32位兼容性，请使用此版本。兼容Windows 7及更高版本。",
      app: "传统的Windows安装程序。将XMCL作为标准Windows应用程序安装，带有开始菜单快捷方式和卸载选项。最适合喜欢传统安装方式的用户。"
    },
    macos: {
      universal: "兼容 Intel 和 Apple Silicon 芯片的 Mac。",
      arm64: "为 Apple Silicon (M1/M2) Mac 优化。在这些系统上提供原生性能和更好的能源效率。如果您拥有配备苹果自家处理器的较新Mac，请使用此版本。",
      intel: "适用于基于 Intel 的 Mac。与旧系统兼容性更好。如果您拥有搭载Intel处理器的旧款Mac，为获得最佳兼容性和性能，您应下载此版本。"
    },
    linux: {
      appimage: "无需安装，在任何 Linux 发行版上运行。",
      flatpak: "通过 Flatpak 进行沙盒安装（社区维护）。",
      deb: "适用于 Debian、Ubuntu 及衍生发行版。",
      rpm: "适用于 Fedora、RHEL 及衍生发行版。",
      arm64: "适用于基于 ARM64 的 Linux 系统，如树莓派。"
    }
  }
};
