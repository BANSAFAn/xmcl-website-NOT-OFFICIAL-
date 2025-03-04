
export const translations = {
  en: {
    title: "X Minecraft Launcher",
    subtitle: "An Open Source launcher with Modern UX",
    download: "Download v0.49.1",
    github: "GitHub Repository",
    description: "X Minecraft Launcher (XMCL) is a modern Minecraft launcher that efficiently manages your modpacks, resource packs, mods, and shader packs. It integrates with Minecraft Forge, Fabric, Quilt, CurseForge and Modrinth."
  },
  ru: {
    title: "X Minecraft Launcher",
    subtitle: "Лаунчер с открытым исходным кодом и современным интерфейсом",
    download: "Скачать v0.49.1",
    github: "GitHub Репозиторий",
    description: "X Minecraft Launcher (XMCL) - это современный лаунчер Minecraft, который эффективно управляет вашими модпаками, ресурспаками, модами и шейдерами. Он интегрируется с Minecraft Forge, Fabric, Quilt, CurseForge и Modrinth."
  },
  uk: {
    title: "X Minecraft Launcher",
    subtitle: "Лаунчер з відкритим вихідним кодом та сучасним інтерфейсом",
    download: "Завантажити v0.49.1",
    github: "GitHub Репозиторій",
    description: "X Minecraft Launcher (XMCL) - це сучасний лаунчер Minecraft, який ефективно керує вашими модпаками, ресурспаками, модами та шейдерами. Він інтегрується з Minecraft Forge, Fabric, Quilt, CurseForge та Modrinth."
  }
};

export type TranslationsType = typeof translations;
export type LanguageCode = keyof TranslationsType;
