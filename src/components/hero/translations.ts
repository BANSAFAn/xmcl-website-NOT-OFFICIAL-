
export const translations = {
  en: {
    title: "X Minecraft Launcher",
    subtitle: "An Open Source launcher with Modern UX",
    download: "Download",
    github: "GitHub Repository",
    description: "X Minecraft Launcher (XMCL) is a modern Minecraft launcher that efficiently manages your modpacks, resource packs, mods, and shader packs. It integrates with Minecraft Forge, Fabric, Quilt, CurseForge and Modrinth."
  },
  ru: {
    title: "X Minecraft Launcher",
    subtitle: "Лаунчер с открытым исходным кодом и современным интерфейсом",
    download: "Скачать",
    github: "GitHub Репозиторий",
    description: "X Minecraft Launcher (XMCL) - это современный лаунчер Minecraft, который эффективно управляет вашими модпаками, ресурспаками, модами и шейдерами. Он интегрируется с Minecraft Forge, Fabric, Quilt, CurseForge и Modrinth."
  },
  uk: {
    title: "X Minecraft Launcher",
    subtitle: "Лаунчер з відкритим вихідним кодом та сучасним інтерфейсом",
    download: "Завантажити",
    github: "GitHub Репозиторій",
    description: "X Minecraft Launcher (XMCL) - це сучасний лаунчер Minecraft, який ефективно керує вашими модпаками, ресурспаками, модами та шейдерами. Він інтегрується з Minecraft Forge, Fabric, Quilt, CurseForge та Modrinth."
  },
  zh: {
    title: "X Minecraft 启动器",
    subtitle: "具有现代用户体验的开源启动器",
    download: "下载",
    github: "GitHub 仓库",
    description: "X Minecraft 启动器 (XMCL) 是一个现代化的 Minecraft 启动器，可以高效管理您的模组包、资源包、模组和光影包。它与 Minecraft Forge、Fabric、Quilt、CurseForge 和 Modrinth 集成。"
  }
};

export type TranslationsType = typeof translations;
export type LanguageCode = keyof TranslationsType;
