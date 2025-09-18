
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { StatusBadge } from '@/components/hero/StatusBadge';
import { HeroTitle } from '@/components/hero/HeroTitle';
import { CTAButtons } from '@/components/hero/CTAButtons';

interface HeroSectionProps {
  onDownloadClick: () => void;
}

export const HeroSection = ({ onDownloadClick }: HeroSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
        {/* Status badge */}
        <StatusBadge />

        {/* Main Hero Content */}
        <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
          <HeroTitle />
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed font-light px-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          >
            {t('home.heroSubtitle')}
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <CTAButtons onDownloadClick={onDownloadClick} />
      </div>
    </section>
  );
};
