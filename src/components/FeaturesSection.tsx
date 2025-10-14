import React from 'react';
import { motion } from 'framer-motion';
import { Package, Download, HardDrive, Shield, Gamepad2, Zap, Palette, Code, Sparkles, Home } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { FeatureCard } from '@/components/features/FeatureCard';
import { FeatureImage } from '@/components/features/FeatureImage';

export const FeaturesSection = () => {
  const { t } = useTranslation();

  // Обновленные и дополнительные функции на основе xmcl.app
  const features = [
    {
      icon: Download,
      title: t('home.downloadManageWhatever'), // "Download & Manage Whatever"
      description: t('home.downloadManageWhateverDesc'), // "Download and manage your massive resources like modpacks, resource packs, mods, shader packs..."
      image: '/PhotoXMCL/477b2df8-4979-4097-95e5-b918123b0cf7.png', // Пример изображения
      reverse: false,
      links: [
        { name: 'CurseForge', url: 'https://www.curseforge.com/minecraft/mc-mods', color: 'bg-orange-500 hover:bg-orange-600' },
        { name: 'Modrinth', url: 'https://modrinth.com/', color: 'bg-green-500 hover:bg-green-600' }
      ]
    },
    {
      icon: HardDrive,
      title: t('home.optimalDiskSpace'), 
      description: t('home.optimalDiskSpaceDesc'),
      image: '/PhotoXMCL/c1b9c039-948c-498e-b2c7-9389ef257ae0.png', 
      reverse: true,
      links: [
        { name: t('home.hardLink'), url: 'https://en.wikipedia.org/wiki/Hard_link', color: 'bg-cyan-500 hover:bg-cyan-600' },
        { name: t('home.symbolicLink'), url: 'https://en.wikipedia.org/wiki/Symbolic_link', color: 'bg-indigo-500 hover:bg-indigo-600' }
      ]
    },
    {
      icon: Gamepad2,
      title: t('home.installingAnyFramework'), 
      description: t('home.installingAnyFrameworkDesc'), 
      image: '/PhotoXMCL/download minecrat.png', 
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
      title: t('home.multipleInstances'),
      description: t('home.multipleInstancesDesc'),
      image: '/PhotoXMCL/X_Minecraft_Launcher_O3OyGdWjN6.png',
      reverse: true,
      links: [
        { name: t('home.p2p'), url: 'https://en.wikipedia.org/wiki/Peer-to-peer', color: 'bg-purple-500 hover:bg-purple-600' }
      ]
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Декоративные градиенты */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 dark:bg-purple-600/10 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 dark:bg-blue-600/10 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-cyan-500/10 dark:bg-cyan-600/10 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Заголовок секции */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full border border-slate-300/50 dark:border-slate-600/50 shadow-lg mb-6">
            <Sparkles className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('home.powerfulFeatures')}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-6">
            {t('home.featuresTitle')}
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {t('home.comprehensiveSolution')}
          </p>
        </motion.div>

        {/* Карточки функций */}
        <div className="space-y-28">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                feature.reverse ? 'lg:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
            >
              {/* Изображение */}
              {feature.image && (
                <FeatureImage
                  image={feature.image}
                  title={feature.title}
                  reverse={feature.reverse}
                />
              )}

              {/* Контент */}
              <div className="flex-1 space-y-6">
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  links={feature.links}
                  index={index}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Стили для анимации blob */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};