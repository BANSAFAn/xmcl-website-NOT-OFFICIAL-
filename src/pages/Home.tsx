
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Star, Users, Code, Zap, Monitor, Palette, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import InteractiveDownloadSection from '@/components/InteractiveDownloadSection';
import { PageTransition } from '@/components/PageTransition';

const Home = () => {
  const { t } = useTranslation();
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const features = [
    {
      icon: <Code className="w-12 h-12" />,
      title: t('home.feature1Title'),
      description: t('home.feature1Description')
    },
    {
      icon: <Monitor className="w-12 h-12" />,
      title: t('home.feature2Title'),
      description: t('home.feature2Description')
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: t('home.feature3Title'),
      description: t('home.feature3Description')
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: t('home.feature4Title'),
      description: t('home.feature4Description')
    },
    {
      icon: <RefreshCw className="w-12 h-12" />,
      title: t('home.feature5Title'),
      description: t('home.feature5Description')
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-purple-900/30 dark:to-blue-900/30 relative overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-3xl"
            animate={{
              x: [0, 300, -200, 0],
              y: [0, -200, 150, 0],
              scale: [1, 1.4, 0.7, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ top: '-10%', left: '-10%' }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-cyan-400/15 to-pink-400/15 blur-3xl"
            animate={{
              x: [0, -300, 200, 0],
              y: [0, 200, -100, 0],
              scale: [1, 0.6, 1.3, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 8
            }}
            style={{ top: '30%', right: '-15%' }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-indigo-400/10 to-emerald-400/10 blur-3xl"
            animate={{
              x: [0, 150, -100, 0],
              y: [0, -150, 75, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 15
            }}
            style={{ bottom: '0%', left: '20%' }}
          />
        </div>

        <Navigation />
        
        <main className="container mx-auto px-4 pt-20 pb-12 relative z-10">
          {/* Hero Section */}
          <motion.section
            className="text-center py-20 mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-4 mb-8 px-6 py-3 bg-white/30 dark:bg-slate-800/30 backdrop-blur-md rounded-full border border-white/20 dark:border-slate-700/20 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Star className="w-6 h-6 text-yellow-500" />
              <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {t('home.openSourceStatus')}
              </span>
              <Github className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </motion.div>
            
            <motion.h1 
              className="text-7xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('home.heroTitle')}
            </motion.h1>
            
            <motion.p 
              className="text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {t('home.heroSubtitle')}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={() => setIsDownloadOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 text-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 border-0 rounded-2xl"
                  style={{
                    boxShadow: 'rgba(124, 58, 237, 0.5) 0px 20px 40px -10px'
                  }}
                >
                  <Download className="w-6 h-6 mr-3" />
                  {t('downloadXMCL')}
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher', '_blank')}
                  className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-700 px-12 py-4 text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl"
                >
                  <Github className="w-6 h-6 mr-3" />
                  {t('home.viewOnGitHub')}
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex justify-center items-center gap-8 mt-12 text-slate-600 dark:text-slate-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">{t('githubStars')}</span>
              </div>
              <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">{t('forks')}</span>
              </div>
            </motion.div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            className="py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-20">
              <motion.h2 
                className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {t('home.featuresTitle')}
              </motion.h2>
              <motion.p 
                className="text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t('home.comprehensiveSolution')}
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, rotateX: 10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100 
                  }}
                  whileHover={{ y: -10, rotateX: 5 }}
                  className="group"
                >
                  <Card className="p-10 h-full hover:shadow-3xl transition-all duration-700 relative overflow-hidden backdrop-blur-xl bg-white/90 dark:bg-slate-800/90 border-2 border-white/20 dark:border-slate-700/20 rounded-3xl group-hover:border-purple-200/50 dark:group-hover:border-purple-700/50">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                      initial={false}
                    />
                    
                    <div className="relative z-10 text-center">
                      <motion.div 
                        className="inline-flex items-center justify-center p-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl text-white mb-8 shadow-2xl group-hover:shadow-3xl transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {feature.icon}
                      </motion.div>
                      
                      <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                        {feature.title}
                      </h3>
                      
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                        {feature.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </main>

        <Footer onDownloadClick={() => setIsDownloadOpen(true)} />
        {isDownloadOpen && <InteractiveDownloadSection />}
      </div>
    </PageTransition>
  );
};

export default Home;
