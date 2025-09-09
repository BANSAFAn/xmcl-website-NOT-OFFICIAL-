import React from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

interface CTAButtonsProps {
  onDownloadClick: () => void;
}

const CTAButtons: React.FC<CTAButtonsProps> = ({ onDownloadClick }) => {
  const { t } = useTranslation();

  const handleGitHubClick = () => {
    window.open('https://github.com/Voxelum/x-minecraft-launcher', '_blank');
  };

  const handleLearnMoreClick = () => {
    window.open('https://github.com/Voxelum/x-minecraft-launcher#features', '_blank');
  };

  return (
    <>
      {/* Main CTA Buttons */}
      <motion.div 
        className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={onDownloadClick}
            size="lg"
            className="group px-12 py-6 text-xl font-bold rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-500 text-white border-0 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-2xl"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <Download className="w-6 h-6 mr-3 group-hover:animate-bounce relative z-10" />
            <span className="relative z-10">{t('home.getStarted')}</span>
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="outline"
            size="lg"
            className="group px-12 py-6 text-xl font-semibold rounded-2xl border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl"
            onClick={handleGitHubClick}
          >
            <Github className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform relative z-10" />
            <span className="relative z-10">{t('home.viewOnGitHub')}</span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Learn More Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <Button 
          variant="ghost" 
          className="group text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          onClick={handleLearnMoreClick}
        >
          <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          {t('home.learnMore')}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </>
  );
};

export { CTAButtons };