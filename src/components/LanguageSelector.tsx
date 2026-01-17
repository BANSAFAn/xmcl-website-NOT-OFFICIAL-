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
import { motion } from "framer-motion";

const USER_PREFERENCE_KEY = "userPreferredLanguage";
const IP_PREFERENCE_KEY = "userIpLanguageMap";

// ... (Оставляем логику получения IP без изменений для краткости, она была хорошей)
const getUserIP = async (): Promise<string | null> => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    // console.warn("Could not fetch user IP:", error);
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
          className="group relative w-full h-10 justify-between gap-2 overflow-hidden rounded-xl bg-black/5 dark:bg-white/10 px-3 text-slate-700 dark:text-slate-200 transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/15 border border-transparent dark:border-white/5"
          aria-label={t("ui.changeLanguage")}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/50 dark:bg-black/20 text-slate-600 dark:text-slate-300">
               <Globe className="h-3.5 w-3.5" />
            </div>
            <span className="font-medium text-sm truncate">
              {currentLanguage?.name || "English"}
            </span>
          </div>
          <ChevronDown className={`h-4 w-4 opacity-50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="z-[100] w-[260px] overflow-hidden rounded-2xl border border-white/20 bg-white/80 p-0 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"
        align="start"
        sideOffset={8}
      >
        {/* Search Header */}
        <div className="border-b border-black/5 p-3 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder={t("language.searchPlaceholder") || "Search..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 border-none bg-black/5 pl-9 pr-4 text-sm rounded-lg focus-visible:ring-1 focus-visible:ring-indigo-500/50 dark:bg-white/5 dark:text-slate-200"
            />
          </div>
        </div>

        <ScrollArea className="h-[280px]">
          <div className="p-2 space-y-1">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => {
                const isSelected = locale === lang.code;
                return (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`
                      cursor-pointer gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors
                      ${
                        isSelected
                          ? "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300"
                          : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                      }
                    `}
                  >
                    <span className="flex-1 truncate">{lang.name}</span>
                    {isSelected && (
                      <motion.div layoutId="check" initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}}>
                         <Check className="h-4 w-4" />
                      </motion.div>
                    )}
                  </DropdownMenuItem>
                );
              })
            ) : (
              <div className="py-8 text-center text-sm text-slate-400">
                {t("language.noLanguageFound") || "No results"}
              </div>
            )}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LanguageSelector = React.memo(LanguageSelectorComponent);
export { LanguageSelector };
