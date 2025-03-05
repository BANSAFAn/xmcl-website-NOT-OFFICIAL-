
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
      portable: "No installation required. Run directly from any location."
    },
    macos: {
      universal: "Compatible with both Intel and Apple Silicon Macs.",
      arm64: "Optimized for Apple Silicon (M1/M2) Macs.",
      intel: "For Intel-based Macs. Better compatibility with older systems."
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
      portable: "Установка не требуется. Запускайте из любого места."
    },
    macos: {
      universal: "Совместимо с компьютерами Mac на базе Intel и Apple Silicon.",
      arm64: "Оптимизировано для Mac с Apple Silicon (M1/M2).",
      intel: "Для Mac на базе Intel. Лучшая совместимость со старыми системами."
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
      portable: "Установка не потрібна. Запускайте з будь-якого місця."
    },
    macos: {
      universal: "Сумісно з комп'ютерами Mac на базі Intel та Apple Silicon.",
      arm64: "Оптимізовано для Mac з Apple Silicon (M1/M2).",
      intel: "Для Mac на базі Intel. Краща сумісність зі старими системами."
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
      portable: "无需安装。可以从任意位置直接运行。"
    },
    macos: {
      universal: "兼容 Intel 和 Apple Silicon 芯片的 Mac。",
      arm64: "为 Apple Silicon (M1/M2) Mac 优化。",
      intel: "适用于基于 Intel 的 Mac。与旧系统兼容性更好。"
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
