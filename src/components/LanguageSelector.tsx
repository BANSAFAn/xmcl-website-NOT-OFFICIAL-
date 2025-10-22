import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Globe, ChevronDown, Search, Check } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";
import { languageConfigs } from "@/i18n/languageConfigs";

const USER_PREFERENCE_KEY = "userPreferredLanguage";
const IP_PREFERENCE_KEY = "userIpLanguageMap";

const getUserIP = async (): Promise<string | null> => {
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
  const { t, locale, changeLanguage } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [userIP, setUserIP] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getUserIP().then(setUserIP);
  }, []);

  const saveUserLanguagePreference = useCallback(
    (langCode: string) => {
      try {
        if (userIP) {
          const ipMap = JSON.parse(
            localStorage.getItem(IP_PREFERENCE_KEY) || "{}",
          );
          ipMap[userIP] = langCode;
          localStorage.setItem(IP_PREFERENCE_KEY, JSON.stringify(ipMap));
        }
        localStorage.setItem(USER_PREFERENCE_KEY, langCode);
      } catch (e) {
        console.warn("Could not save language preference:", e);
      }
    },
    [userIP],
  );

  const getUserLanguagePreference = useCallback((): string | null => {
    try {
      if (userIP) {
        const ipMap = JSON.parse(
          localStorage.getItem(IP_PREFERENCE_KEY) || "{}",
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
      (lang) =>
        lang.name.toLowerCase().includes(term) ||
        lang.code.toLowerCase().includes(term),
    );
  }, [searchTerm]);

  const handleLanguageChange = useCallback(
    (langCode: string) => {
      changeLanguage(langCode);
      saveUserLanguagePreference(langCode);
      setSearchTerm("");
      setIsOpen(false);
    },
    [changeLanguage, saveUserLanguagePreference],
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
    [locale],
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="group relative h-10 gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 px-4 text-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 dark:from-slate-800 dark:to-slate-700 dark:text-slate-200"
          aria-label={t("ui.changeLanguage")}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-500 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 group-hover:opacity-100" />
          <Globe className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
          <span className="relative z-10 hidden font-semibold sm:inline">
            {currentLanguage?.name ||
              t("language.defaultName", { name: "English" })}
          </span>
          <ChevronDown className="relative z-10 hidden h-4 w-4 opacity-60 transition-all duration-300 group-hover:translate-y-0.5 group-hover:opacity-100 sm:inline" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="z-[10000] w-[280px] overflow-hidden rounded-2xl border-2 border-slate-200/50 bg-white/95 p-0 shadow-2xl backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-800/95"
        align="end"
        sideOffset={8}
      >
        <div className="border-b border-slate-200/50 bg-gradient-to-r from-slate-50 to-white p-3 dark:from-slate-800 dark:to-slate-700 dark:border-slate-700/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <Input
              placeholder={t("language.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 border-slate-200 bg-white pl-10 pr-4 text-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700"
              aria-label={t("language.searchLabel")}
            />
          </div>
        </div>

        <ScrollArea className="h-[320px]">
          <div className="p-2">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => {
                const isSelected = locale === lang.code;
                return (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`
                      group relative cursor-pointer gap-3 overflow-hidden rounded-xl px-4 py-3 transition-all duration-200
                      ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"
                      }
                    `}
                    aria-checked={isSelected}
                  >
                    <div className="flex flex-1 items-center justify-between">
                      <span className="relative z-10 font-semibold">
                        {lang.name}
                      </span>
                      {isSelected && (
                        <Check className="relative z-10 h-5 w-5 animate-in zoom-in-50" />
                      )}
                    </div>
                    {!isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    )}
                  </DropdownMenuItem>
                );
              })
            ) : (
              <div className="py-8 text-center text-sm text-slate-500">
                {t("language.noLanguageFound")}
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t border-slate-200/50 bg-gradient-to-r from-slate-50 to-white p-2 dark:from-slate-800 dark:to-slate-700 dark:border-slate-700/50">
          <p className="text-center text-xs text-slate-500 dark:text-slate-400">
            {languageConfigs.length} {t("language.availableLanguages")}
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LanguageSelector = React.memo(LanguageSelectorComponent);

export { LanguageSelector };
