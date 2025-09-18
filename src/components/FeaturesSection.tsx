
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Package, Code, Palette, Zap, Shield, Gamepad2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { FeatureCard } from '@/components/features/FeatureCard';
import { FeatureImage } from '@/components/features/FeatureImage';

export const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Package,
      title: t('home.downloadManageWhatever'),
      description: t('home.downloadManageWhateverDesc'),
      image: '/PhotoXMCL/477b2df8-4979-4097-95e5-b918123b0cf7.png',
      reverse: false,
      links: [
        { name: 'CurseForge', url: 'https://www.curseforge.com/minecraft/mc-mods', color: 'bg-orange-500 hover:bg-orange-600' },
        { name: 'Modrinth', url: 'https://modrinth.com/', color: 'bg-green-500 hover:bg-green-600' }
      ]
    },
    {
      icon: Code,
      title: t('home.crossPlatformSupportTitle'),
      description: t('home.crossPlatformSupportDesc'),
      image: '/PhotoXMCL/logo.png',
      reverse: true,
      links: [
        { name: 'Linux', url: 'https://www.linux.org/pages/download/', color: 'bg-orange-500 hover:bg-orange-600' },
        { name: 'MacOS', url: 'https://support.apple.com', color: 'bg-blue-500 hover:bg-blue-600' },
        { name: 'Windows', url: 'https://microsoft.com/windows', color: 'bg-cyan-500 hover:bg-cyan-600' }
      ]
    },
    {
      icon: Palette,
      title: t('home.installingAnyFramework'),
      description: t('home.installingAnyFrameworkDesc'),
      image: '/PhotoXMCL/7034b047-f7c2-4650-9bec-c71f0702e64a.png',
      reverse: false,
      links: [
        { name: 'Forge', url: 'https://files.minecraftforge.net/', color: 'bg-red-500 hover:bg-red-600' },
        { name: 'Fabric', url: 'https://fabricmc.net/', color: 'bg-blue-500 hover:bg-blue-600' },
        { name: 'NeoForge', url: 'https://neoforged.net/', color: 'bg-purple-500 hover:bg-purple-600' },
        { name: 'Quilt', url: 'https://quiltmc.org/', color: 'bg-yellow-500 hover:bg-yellow-600' },
        { name: 'LabyMod', url: 'https://www.labymod.net/', color: 'bg-indigo-500 hover:bg-indigo-600' }
      ]
    },
    {
      icon: Zap,
      title: t('home.feature4Title'),
      description: t('home.feature4Description'),
      image: '/PhotoXMCL/c1b9c039-948c-498e-b2c7-9389ef257ae0.png',
      reverse: true,
      links: [
        { name: t('home.hardLink'), url: 'https://en.wikipedia.org/wiki/Hard_link', color: 'bg-cyan-500 hover:bg-cyan-600' },
        { name: 'BMCL API', url: 'https://bmclapidoc.bangbang93.com/', color: 'bg-indigo-500 hover:bg-indigo-600' }
      ]
    },
    {
      icon: Shield,
      title: t('home.feature5Title'),
      description: t('home.feature5Description'),
      image: '/PhotoXMCL/c84556ce-21f8-4d32-93c0-d9d6ba82f881.png',
      reverse: false
    }
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-blue-50/30 dark:from-slate-950/50 dark:to-slate-900/30"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-full border border-slate-200/60 dark:border-slate-700/50 shadow-lg mb-8">
            <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('home.powerfulFeatures')}
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            {t('home.featuresTitle')}
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {t('home.comprehensiveSolution')}
          </p>
        </motion.div>

        {/* Features */}
        <div className="space-y-32">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-16 ${
                feature.reverse ? 'lg:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {/* Content */}
              <div className="flex-1 space-y-8">
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  links={feature.links}
                  index={index}
                />
              </div>

              {/* Image */}
              {feature.image && (
                <FeatureImage
                  image={feature.image}
                  title={feature.title}
                  reverse={feature.reverse}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
