import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Globe, ChevronDown, Search } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";
import { languageConfigs } from "@/i18n/languageConfigs";
import { useState, useEffect, useCallback, useMemo } from "react";

const USER_PREFERENCE_KEY = "userPreferredLanguage";

const LanguageSelectorComponent = () => {
  const { locale, changeLanguage } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const getUserPreferredLanguage = useCallback((): string | null => {
    try {
      return localStorage.getItem(USER_PREFERENCE_KEY);
    } catch (e) {
      console.warn(
        "Could not access localStorage to get language preference:",
        e,
      );
      return null;
    }
  }, []);

  const saveUserPreferredLanguage = useCallback((langCode: string) => {
    try {
      localStorage.setItem(USER_PREFERENCE_KEY, langCode);
    } catch (e) {
      console.warn(
        "Could not access localStorage to save language preference:",
        e,
      );
    }
  }, []);

  const filteredLanguages = useMemo(() => {
    return languageConfigs.filter((lang) =>
      lang.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  const handleLanguageChange = useCallback(
    (langCode: string) => {
      changeLanguage(langCode);
      saveUserPreferredLanguage(langCode);
      requestAnimationFrame(() => {
        setSearchTerm("");
      });
    },
    [changeLanguage, saveUserPreferredLanguage],
  );

  const initializeLanguage = useCallback(() => {
    const savedLang = getUserPreferredLanguage();

    if (savedLang) {
      if (languageConfigs.some((lang) => lang.code === savedLang)) {
        if (savedLang !== locale) {
          changeLanguage(savedLang);
        }
      } else {
        try {
          localStorage.removeItem(USER_PREFERENCE_KEY);
        } catch (e) {
          console.warn("Could not remove item from localStorage:", e);
        }
      }
    } else {
      const defaultLang = "en";
      if (defaultLang !== locale) {
        changeLanguage(defaultLang);
      }
    }
  }, [getUserPreferredLanguage, changeLanguage, locale]);

  useEffect(() => {
    initializeLanguage();
  }, [initializeLanguage]);

  const currentLanguage = useMemo(
    () => languageConfigs.find((lang) => lang.code === locale),
    [locale],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`
            h-9 w-9 sm:w-auto px-0 sm:px-3 text-foreground
            hover:text-foreground hover:bg-accent/30 transition-all duration-300 ease-out gap-2
            relative overflow-hidden group
            transform-gpu hover:scale-[1.02] transition-transform duration-300
          `}
          aria-label="Change language"
        >
          <div
            className={`
            absolute inset-0
            bg-gradient-to-r from-primary/20 via-primary/50 to-secondary/20
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500 ease-out
            -translate-x-full group-hover:translate-x-0
            transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          `}
          />
          <Globe className="w-4 h-4 relative z-10" />
          <span className="hidden sm:inline relative z-10 font-medium">
            {currentLanguage?.name || "English"}
          </span>
          <ChevronDown
            className={`
            hidden sm:inline w-3 h-3 opacity-50 relative z-10
            transition-all duration-300 ease-in-out
            group-hover:opacity-100 group-hover:rotate-180
          `}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`
          bg-white/90 dark:bg-slate-800/90 backdrop-blur-md
          border border-slate-200 dark:border-slate-700 shadow-xl z-[10000]
          w-[260px] overflow-hidden
          shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50
        `}
        align="end"
        sideOffset={4}
      >
        <div className="p-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/50">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <Input
              placeholder="Search languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`
                pl-8 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-700/70
                border border-slate-200 dark:border-slate-600
                focus:ring-2 focus:ring-primary/30 focus:border-primary
                transition-all duration-200
              `}
              aria-label="Search for a language"
            />
          </div>
        </div>
        <ScrollArea className="h-[260px]">
          <div className="py-1">
            {filteredLanguages.map((lang) => {
              const isSelected = locale === lang.code;
              return (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`
                    text-slate-700 dark:text-slate-300
                    hover:text-blue-600 dark:hover:text-blue-400
                    cursor-pointer transition-all duration-200 ease-out gap-3 py-2 px-4
                    relative overflow-hidden group
                    ${isSelected ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "hover:bg-slate-100 dark:hover:bg-slate-700/50"}
                    transform-gpu hover:scale-[1.01] transition-transform duration-200
                    hover:shadow-sm hover:shadow-slate-300/30 dark:hover:shadow-slate-900/30
                  `}
                  aria-checked={isSelected}
                >
                  {}
                  <div
                    className={`
                    absolute inset-0
                    bg-gradient-to-r from-primary/10 to-secondary/10
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                  `}
                  />
                  <span className="font-medium relative z-10">{lang.name}</span>
                  {isSelected && (
                    <div
                      className={`
                      absolute right-2 top-1/2 transform -translate-y-1/2
                      w-2 h-2 bg-primary rounded-full
                      animate-pulse-slow
                      relative z-10
                    `}
                      aria-hidden="true"
                    />
                  )}
                </DropdownMenuItem>
              );
            })}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LanguageSelector = React.memo(LanguageSelectorComponent);

export { LanguageSelector };
