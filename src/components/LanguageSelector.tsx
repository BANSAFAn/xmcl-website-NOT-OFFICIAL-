import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Globe, ChevronDown, Search } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";
import { languageConfigs } from "@/i18n/languageConfigs";
import { useState, useEffect } from "react";

export const LanguageSelector = () => {
  const { locale, changeLanguage } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [hasCheckedBrowserLang, setHasCheckedBrowserLang] = useState(false); // Новое состояние

  useEffect(() => {
    // Проверяем, установлено ли уже предпочтение пользователя (например, в localStorage)
    // Это предотвращает повторное определение языка при каждом рендере
    const userPreferredLang = localStorage.getItem('i18nextLng'); // Имя ключа может отличаться, проверьте ваш контекст
    // Если язык уже был выбран пользователем ранее, не проверяем браузерный язык снова
    if (userPreferredLang) {
      setHasCheckedBrowserLang(true); // Уже был выбор, больше не проверять
      return;
    }

    // Только если язык не был выбран ранее, проверяем браузерный
    if (!hasCheckedBrowserLang) {
      const browserLang = navigator.language.slice(0, 2);
      const supportedLang = languageConfigs.find(lang => lang.code === browserLang);
      
      if (supportedLang && locale !== supportedLang.code) {
        // Проверяем, не является ли язык браузера уже текущим (например, через i18next)
        // и не был ли он уже установлен в localStorage
        // Если все условия выполнены, устанавливаем язык
        changeLanguage(supportedLang.code);
      }
      setHasCheckedBrowserLang(true); // Отмечаем, что проверка выполнена
    }
  }, [locale, changeLanguage, hasCheckedBrowserLang]); // Добавляем hasCheckedBrowserLang в зависимости

  const currentLanguage = languageConfigs.find(lang => lang.code === locale);

  const filteredLanguages = languageConfigs.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 w-9 sm:w-auto px-0 sm:px-3 text-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-300 gap-2 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Globe className="w-4 h-4 relative z-10" />
          <span className="hidden sm:inline relative z-10 font-medium">
            {currentLanguage?.name}
          </span>
          <ChevronDown className="hidden sm:inline w-3 h-3 opacity-50 relative z-10 transition-transform group-hover:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl z-[10000] w-[260px]"
        align="end"
      >
        <div className="p-2 border-b border-slate-200 dark:border-slate-700">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>
        <ScrollArea className="h-[240px]">
          <div className="py-1">
            {filteredLanguages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code); // Это должно обновить localStorage
                  setSearchTerm("");
                }}
                className={`text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-all duration-200 gap-3 py-2 px-4 relative overflow-hidden group ${
                  locale === lang.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="font-medium relative z-10">{lang.name}</span>
                {locale === lang.code && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                )}
              </DropdownMenuItem>
            ))}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};