import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

const HeroTitle: React.FC = () => {
  const { t } = useTranslation();
  const title = t('home.heroTitle');

  return (
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-slate-900 dark:text-white leading-tight px-2">
      <span 
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent inline-block"
      >
        {title}
      </span>
    </h1>
  );
};

export { HeroTitle };