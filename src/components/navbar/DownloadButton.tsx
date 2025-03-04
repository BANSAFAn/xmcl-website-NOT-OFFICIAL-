
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from './LanguageContext';

export const DownloadButton = () => {
  const { translations } = useLanguage();
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.a 
          href="#download" 
          className="ml-1 bg-accent text-white rounded-lg p-2 relative overflow-hidden group flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-accent via-cyan-400 to-accent bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
          <Download size={20} className="group-hover:animate-bounce" />
        </motion.a>
      </TooltipTrigger>
      <TooltipContent>
        <p>{translations.download}</p>
      </TooltipContent>
    </Tooltip>
  );
};
