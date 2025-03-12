
import { motion } from 'framer-motion';
import { ArrowDownToLine, ArrowUpRight, Github, Info } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { DownloadOption } from './types';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DownloadCardProps {
  option: DownloadOption;
  onDownloadClick: (option: DownloadOption) => void;
}

export function DownloadCard({ option, onDownloadClick }: DownloadCardProps) {
  const { toast } = useToast();
  
  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    
    if (option.description) {
      toast({
        title: `${option.title} Information`,
        description: option.description,
        variant: "default",
        duration: 5000
      });
    }
  };
  
  return (
    <motion.div
      key={option.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className={`${option.colorClass || 'bg-white/5'} backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 cursor-pointer relative overflow-hidden group`}
      onClick={() => onDownloadClick(option)}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated background effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-accent/5 via-purple-500/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          backgroundPosition: ['0% 0%', '100% 0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      
      {/* Top left corner accent */}
      <div className="absolute -top-10 -left-10 w-20 h-20 bg-accent/20 rounded-full filter blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
      
      {/* Package info button with enhanced visibility */}
      <motion.div 
        className="absolute top-4 right-4 p-2 rounded-full bg-blue-500/30 text-white hover:bg-blue-500/50 hover:text-white z-10 border border-blue-400/30"
        whileHover={{ scale: 1.2, rotate: 15 }}
        onClick={handleInfoClick}
      >
        <Info size={16} />
      </motion.div>
      
      {/* Icon with pulse animation */}
      <motion.div 
        className="mb-5 text-3xl text-white"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          animate={{ 
            boxShadow: ['0 0 0 rgba(59, 130, 246, 0)', '0 0 15px rgba(59, 130, 246, 0.5)', '0 0 0 rgba(59, 130, 246, 0)']
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "mirror"
          }}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10"
        >
          {option.icon}
        </motion.div>
      </motion.div>
      
      {/* Title */}
      <h3 className="text-2xl font-bold mb-2 flex items-center text-white group-hover:text-accent transition-colors duration-300">
        {option.title}
        {option.isComingSoon && (
          <Badge variant="outline" className="ml-2 bg-blue-500/20 text-blue-300 border-blue-500/40">
            {option.title === "Linux Flatpak" ? "Community" : "Coming Soon"}
          </Badge>
        )}
      </h3>
      
      {/* Description */}
      <p className="text-white/70 mb-6 group-hover:text-white/90 transition-colors duration-300">{option.subtitle}</p>
      
      {/* Download button */}
      <div className="flex items-center justify-between mt-auto">
        {option.size && (
          <motion.span 
            className="text-white/60 text-sm font-mono bg-white/5 px-3 py-1 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            {option.size}
          </motion.span>
        )}
        
        <motion.div 
          className="p-3 rounded-full bg-accent/20 group-hover:bg-accent/40 transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
        >
          {option.id === 'linux_flatpak' ? (
            <Github className="w-5 h-5 text-white" />
          ) : option.isComingSoon ? (
            <ArrowUpRight className="w-5 h-5 text-white" />
          ) : (
            <ArrowDownToLine className="w-5 h-5 text-white" />
          )}
        </motion.div>
      </div>
      
      {/* Bottom animated border */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent via-purple-500 to-blue-500"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}
