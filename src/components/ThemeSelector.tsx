
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sun, Moon, ChevronDown } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useTheme, Theme } from "@/hooks/useTheme";

export const ThemeSelector = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const themes = [
    { 
      value: 'light' as Theme, 
      name: 'Light', 
      icon: Sun,
      gradient: 'from-amber-400 via-orange-400 to-yellow-400'
    },
    { 
      value: 'dark' as Theme, 
      name: 'Dark', 
      icon: Moon,
      gradient: 'from-slate-700 via-slate-800 to-slate-900'
    }
  ];

  const currentTheme = themes.find(t => t.value === theme);
  const IconComponent = currentTheme?.icon || Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all duration-300 gap-2 px-3 py-2 rounded-lg backdrop-blur-sm"
        >
          <div className="relative">
            <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${currentTheme?.gradient} shadow-lg ring-2 ring-background/20`} />
            <IconComponent className="w-3 h-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-sm" />
          </div>
          <span className="hidden sm:inline font-medium">{currentTheme?.name}</span>
          <ChevronDown className="w-3 h-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="bg-background/95 backdrop-blur-md border border-border shadow-xl z-[60] min-w-[160px] rounded-lg"
        align="end"
      >
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          return (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className={`text-foreground/80 hover:text-foreground hover:bg-accent/50 cursor-pointer transition-all duration-200 gap-3 py-3 px-4 rounded-md mx-1 my-0.5 ${
                theme === themeOption.value ? 'bg-primary/10 text-primary border border-primary/20' : ''
              }`}
            >
              <div className="relative">
                <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${themeOption.gradient} shadow-md ring-2 ring-background/30`} />
                <Icon className="w-3 h-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-sm" />
              </div>
              <span className="font-medium">{themeOption.name}</span>
              {theme === themeOption.value && (
                <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
