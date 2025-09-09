import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Globe, ChevronDown } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";
import { languageConfigs } from "@/locales";

export const LanguageSelector = () => {
  const { locale, changeLanguage } = useTranslation();

  const currentLanguage = languageConfigs.find(lang => lang.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 gap-2 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-foreground opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <Globe className="w-4 h-4 relative z-10" />
          <span className="hidden sm:inline relative z-10">
            {currentLanguage?.name}
          </span>
          <span className="sm:hidden relative z-10">
            {currentLanguage?.name}
          </span>
          <ChevronDown className="w-3 h-3 opacity-50 relative z-10 transition-transform group-hover:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl z-[60] min-w-[180px]"
        align="end"
      >
        {languageConfigs.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-all duration-200 gap-3 py-3 px-4 relative overflow-hidden group ${
              locale === lang.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 transition-all duration-200">
              {lang.name}
            </span>
            {locale === lang.code && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};