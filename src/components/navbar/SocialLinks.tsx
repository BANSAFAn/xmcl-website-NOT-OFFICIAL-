
import { Github } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from './LanguageContext';

export const SocialLinks = () => {
  const { translations } = useLanguage();
  
  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.a 
            href="https://github.com/Voxelum/x-minecraft-launcher" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative p-2 text-white/80 hover:text-white transition-colors hover:bg-white/5 rounded-lg group overflow-hidden"
            aria-label="GitHub repository"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Icon */}
            <Github size={20} className="relative z-10 group-hover:text-white transition-colors duration-300" />
            
            {/* Particles on hover */}
            <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <motion.span 
                  key={i}
                  className="absolute bg-white w-1 h-1 rounded-full"
                  initial={{ opacity: 0, x: "50%", y: "50%" }}
                  whileHover={{ 
                    opacity: [0, 0.5, 0],
                    x: `${50 + (Math.random() * 30) * (Math.random() > 0.5 ? 1 : -1)}%`,
                    y: `${50 + (Math.random() * 30) * (Math.random() > 0.5 ? 1 : -1)}%`
                  }}
                  transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity }}
                />
              ))}
            </motion.div>
          </motion.a>
        </TooltipTrigger>
        <TooltipContent>
          <p>{translations.githubRepo}</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.a 
            href="https://discord.gg/W5XVwYY7GQ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative p-2 text-white/80 hover:text-white transition-colors hover:bg-white/5 rounded-lg group overflow-hidden"
            aria-label="Discord server"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 127.14 96.36" 
              fill="currentColor" 
              className="relative z-10 group-hover:text-indigo-200 transition-colors duration-300"
            >
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
            </svg>
            
            {/* Particles on hover */}
            <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <motion.span 
                  key={i}
                  className="absolute bg-indigo-300 w-1 h-1 rounded-full"
                  initial={{ opacity: 0, x: "50%", y: "50%" }}
                  whileHover={{ 
                    opacity: [0, 0.5, 0],
                    x: `${50 + (Math.random() * 30) * (Math.random() > 0.5 ? 1 : -1)}%`,
                    y: `${50 + (Math.random() * 30) * (Math.random() > 0.5 ? 1 : -1)}%`
                  }}
                  transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity }}
                />
              ))}
            </motion.div>
          </motion.a>
        </TooltipTrigger>
        <TooltipContent>
          <p>{translations.discordServer}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
