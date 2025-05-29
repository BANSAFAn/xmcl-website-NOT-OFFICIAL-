
import { motion } from 'framer-motion';
import { ArrowDownToLine, ArrowUpRight, Github, Info } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { DownloadOption } from './types';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/navbar/LanguageContext';
import { useState } from 'react';
import { PackageInfoModal } from './PackageInfoModal';

interface DownloadCardProps {
  option: DownloadOption;
  onDownloadClick: (option: DownloadOption) => void;
}

export function DownloadCard({ option, onDownloadClick }: DownloadCardProps) {
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowInfoModal(true);
  };
  
  return (
    <>
      <motion.div
        key={option.id}
        variants={{
          hidden: { opacity: 0, y: 20, scale: 0.9 },
          visible: { opacity: 1, y: 0, scale: 1 }
        }}
        className={`${option.colorClass || 'bg-gradient-to-br from-white/10 to-white/5'} backdrop-blur-xl p-8 rounded-3xl border border-white/20 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 cursor-pointer relative overflow-hidden group`}
        onClick={() => onDownloadClick(option)}
        whileHover={{ scale: 1.03, y: -8 }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Animated background effects */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(6, 182, 212, 0.05), rgba(168, 85, 247, 0.05), rgba(59, 130, 246, 0.05))",
              "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(6, 182, 212, 0.05), rgba(168, 85, 247, 0.05))",
              "linear-gradient(45deg, rgba(168, 85, 247, 0.05), rgba(59, 130, 246, 0.05), rgba(6, 182, 212, 0.05))"
            ]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        
        {/* Corner accents */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full filter blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
        <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-pink-400/20 rounded-full filter blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
        
        {/* Enhanced info button */}
        <motion.button 
          className="absolute top-6 right-6 p-3 rounded-full bg-gradient-to-r from-blue-500/40 to-purple-500/40 text-white hover:from-blue-500/60 hover:to-purple-500/60 z-10 border border-blue-400/50 backdrop-blur-sm shadow-lg"
          whileHover={{ scale: 1.15, rotate: 15 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleInfoClick}
        >
          <Info size={18} />
        </motion.button>
        
        {/* Enhanced icon with animations */}
        <motion.div 
          className="mb-8 text-4xl text-white"
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-white/20 to-white/10 shadow-xl border border-white/20"
            animate={{ 
              boxShadow: [
                '0 0 0 rgba(59, 130, 246, 0)',
                '0 0 30px rgba(59, 130, 246, 0.3)',
                '0 0 0 rgba(59, 130, 246, 0)'
              ]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: "mirror"
            }}
          >
            {option.icon}
          </motion.div>
        </motion.div>
        
        {/* Enhanced title */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-2 flex items-center text-white group-hover:text-cyan-300 transition-colors duration-300">
            {option.title}
            {option.isComingSoon && (
              <Badge variant="outline" className="ml-3 bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-200 border-blue-400/50 px-3 py-1">
                {option.title === "Linux Flatpak" ? "Сообщество" : "Скоро"}
              </Badge>
            )}
          </h3>
          <p className="text-white/80 group-hover:text-white/95 transition-colors duration-300 text-lg leading-relaxed">
            {option.subtitle}
          </p>
        </div>
        
        {/* Enhanced bottom section */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          {option.size && (
            <motion.div 
              className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 text-sm font-semibold font-mono">
                {option.size}
              </span>
            </motion.div>
          )}
          
          <motion.div 
            className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/30 to-blue-500/30 group-hover:from-cyan-500/50 group-hover:to-blue-500/50 transition-all duration-300 border border-cyan-400/30 shadow-lg"
            whileHover={{ scale: 1.15, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {option.id === 'linux_flatpak' ? (
              <Github className="w-6 h-6 text-white" />
            ) : option.isComingSoon ? (
              <ArrowUpRight className="w-6 h-6 text-white" />
            ) : (
              <ArrowDownToLine className="w-6 h-6 text-white" />
            )}
          </motion.div>
        </div>
        
        {/* Enhanced bottom animated border */}
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-500 rounded-full"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        
        {/* Pulse effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-cyan-400/0 group-hover:border-cyan-400/30"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      </motion.div>

      <PackageInfoModal 
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        packageInfo={option}
      />
    </>
  );
}
