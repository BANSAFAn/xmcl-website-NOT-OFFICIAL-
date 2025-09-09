import React from 'react';
import { motion } from 'framer-motion';
import { Star, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

const StatusBadge: React.FC = () => {
  const { t } = useTranslation();

  const handleGitHubClick = () => {
    window.open('https://github.com/Voxelum/x-minecraft-launcher', '_blank');
  };

  return (
    <motion.div 
      className="inline-flex items-center px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-full border border-slate-200/60 dark:border-slate-700/50 shadow-lg mb-8"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="relative mr-2"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Star className="w-4 h-4 text-yellow-500" />
      </motion.div>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {t('home.openSourceStatus')}
      </span>
      <Button 
        variant="ghost" 
        size="sm" 
        className="ml-3 p-1 h-auto hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110"
        onClick={handleGitHubClick}
      >
        <Github className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};

export { StatusBadge };