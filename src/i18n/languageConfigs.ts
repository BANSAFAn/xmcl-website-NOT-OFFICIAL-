export type SupportedLocale =
  | "en"
  | "de"
  | "it"
  | "ja"
  | "zh"
  | "ar"
  | "zh-Hant"
  | "ko"
  | "uk"
  | "ru"
  | "kz"
  | "by"
  | "fr"
  | "es";
// | "pt"
// | "pt-BR"
// | "pt-PT";

export const languageConfigs: { code: string; name: string }[] = [
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
  // Beta 1.7 Translation 2x
  // { code: "pt", name: "Português" },
  // { code: "pt-BR", name: "Português (Brasil)" },
];
