
import { Link, useLocation } from 'react-router-dom';
import { Mail, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useLanguage } from './LanguageContext';
import { cn } from '@/lib/utils';
import { NavItem } from './types';

export const SupportDropdown = () => {
  const { translations } = useLanguage();
  const location = useLocation();
  
  // Items for Support dropdown
  const supportItems: NavItem[] = [
    { 
      icon: <Mail size={18} />,
      link: "/contact",
      external: false,
      label: "Contact",
      index: 4
    },
    { 
      icon: <FileText size={18} />,
      link: "/privacy",
      external: false,
      label: translations.privacy || "Privacy",
      index: 5
    }
  ];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className={cn(
                  "flex items-center justify-center p-2.5 rounded-lg transition-all duration-300",
                  ['/contact', '/privacy'].includes(location.pathname)
                    ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                )}
              >
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, 0] }} // Упрощенная анимация для Firefox
                  transition={{ duration: 0.3, type: "tween" }} // Оптимизированные параметры
                  style={{ willChange: "transform" }} // Подсказка браузеру для оптимизации
                >
                  <Mail size={18} />
                </motion.div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px] bg-black/70 backdrop-blur-xl border border-white/10">
              {supportItems.map((item) => (
                <DropdownMenuItem key={item.index} asChild>
                  <Link 
                    to={item.link}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer",
                      location.pathname === item.link && "bg-accent/20 text-accent"
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Support</p>
      </TooltipContent>
    </Tooltip>
  );
};
