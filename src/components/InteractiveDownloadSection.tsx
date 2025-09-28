import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Download, Github, ExternalLink, Copy, Check, Monitor, Terminal, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

interface MousePosition {
  x: number;
  y: number;
}

const InteractiveDownloadSection = memo(() => {
  const { t } = useTranslation();
  const [selectedOS, setSelectedOS] = useState('windows');
  const [copiedBrew, setCopiedBrew] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Fetch latest release from GitHub
  const { data: releases, isLoading, error } = useQuery({
    queryKey: ['github-releases'],
    queryFn: async () => {
      const response = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases');
      if (!response.ok) throw new Error('Failed to fetch releases');
      return response.json();
    },
    staleTime: 60000, // 1 минута кэша
    cacheTime: 300000, // 5 минут
  });

  const latestRelease = releases?.[0];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const handleBrewCopy = () => {
    const commands = `brew tap voxelum/brew\nbrew install --cask xmcl`;
    navigator.clipboard.writeText(commands);
    setCopiedBrew(true);
    toast.success(t('downloadMessages.brewCommands'));
    setTimeout(() => setCopiedBrew(false), 2000);
  };

  const getFilteredAssetsByPlatform = (assets: any[]) => {
    if (!assets) return { windows: [], macos: [], linux: [] };
    
    return {
      windows: assets.filter(asset => {
        const name = asset.name.toLowerCase();
        return (name.includes('.exe') || name.includes('setup') || name.includes('.zip')) && 
               asset.size > 1024 * 1024 && 
               !name.includes('blockmap') && 
               !name.includes('.sha256') &&
               !name.includes('.sha256sum') &&
               !name.includes('.sig');
      }).slice(0, 2),
      
      macos: assets.filter(asset => {
        const name = asset.name.toLowerCase();
        return (name.includes('.dmg') || name.includes('.pkg')) && 
               asset.size > 1024 * 1024 &&
               !name.includes('blockmap') && 
               !name.includes('.sha256') &&
               !name.includes('.sha256sum') &&
               !name.includes('.sig');
      }).slice(0, 1),
      
      linux: [
        ...assets.filter(asset => {
          const name = asset.name.toLowerCase();
          return (name.includes('.deb') || name.includes('.rpm') || name.includes('.appimage')) && 
                 asset.size > 1024 * 1024 &&
                 !name.includes('blockmap') && 
                 !name.includes('.sha256') &&
                 !name.includes('.sha256sum') &&
                 !name.includes('.sig');
        }).slice(0, 3),
        {
          id: 'aur',
          name: 'AUR Package',
          browser_download_url: 'https://aur.archlinux.org/packages/xmcl-launcher',
          size: 0,
          download_count: 0,
          isExternal: true
        },
        {
          id: 'flathub',
          name: 'Flathub',
          browser_download_url: 'https://flathub.org/apps/app.xmcl.voxelum',
          size: 0,
          download_count: 0,
          isExternal: true
        }
      ]
    };
  };

  const OSButton = ({ id, name, icon, isSelected, onClick }: {
    id: string;
    name: string;
    icon: React.ReactNode;
    isSelected: boolean;
    onClick: () => void;
  }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    
    return (
      <motion.button
        ref={buttonRef}
        onClick={onClick}
        className={`relative px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 overflow-hidden ${
          isSelected
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-105'
            : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          animate={{
            background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent)`
          }}
          style={{ opacity: isSelected ? 0 : 1 }}
        />
        <span className="text-2xl">{icon}</span>
        <span className="text-lg">{name}</span>
        {isSelected && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl"
            layoutId="selectedOS"
          />
        )}
      </motion.button>
    );
  };

  const DownloadCard = ({ title, description, icon, downloadUrl, size, downloads, index, system, features }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    downloadUrl: string;
    size: number;
    downloads: number;
    index: number;
  }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="relative group"
      >
        <Card className="p-8 hover:shadow-2xl transition-all duration-500 relative overflow-hidden backdrop-blur-sm bg-white/90 dark:bg-slate-800/90 border-slate-200/50 dark:border-slate-700/50">
          
          <div className="text-center relative z-10">
            <motion.div 
              className="text-5xl mb-6 cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              onClick={handleInfoClick}
            >
              {icon}
            </motion.div>
            
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              {title}
            </h3>
            
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
              {description}
            </p>
            
            <div className="flex justify-between text-sm text-slate-500 mb-6 bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
              <span>{size} {t('downloadSection.sizeMB')}</span>
              <span>{downloads} {t('downloadSection.downloadCount')}</span>
            </div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => window.open(downloadUrl, '_blank')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Download className="w-5 h-5 mr-3" />
                {t('downloadSection.download')}
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div 
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-slate-600 dark:text-slate-400 text-lg">{t('downloadMessages.loadingReleases')}</p>
        </div>
      </section>
    );
  }

  if (error || !latestRelease) {
    return (
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800" />
        <div className="container mx-auto text-center relative z-10">
          <p className="text-red-600 dark:text-red-400 text-lg">{t('common.error')}</p>
        </div>
      </section>
    );
  }

  const platformAssets = getFilteredAssetsByPlatform(latestRelease.assets);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800" />
      
      <motion.div
        className="pointer-events-none absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      />
      
      {/* Removed the mouse-following circle to prevent visual issues */}
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('downloadSection.title')}
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('downloadSection.subtitle')}
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-center gap-6 mb-8 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge variant="secondary" className="text-lg py-2 px-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
              {t('downloadSection.version')} {latestRelease.tag_name}
            </Badge>
            <Badge variant="outline" className="text-lg py-2 px-4">
              {t('downloadMessages.releasedOn')} {new Date(latestRelease.published_at).toLocaleDateString()}
            </Badge>
          </motion.div>
        </div>

        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white/50 dark:bg-slate-800/50 rounded-2xl p-3 shadow-2xl backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex gap-3">
              <OSButton
                id="windows"
                name="Windows"
                icon={<Monitor />}
                isSelected={selectedOS === 'windows'}
                onClick={() => {
                  setSelectedOS('windows');
                  toast.success(`${t('osSwitch.switchedTo')} Windows`);
                }}
              />
              <OSButton
                id="macos"
                name="macOS"
                icon={<Laptop />}
                isSelected={selectedOS === 'macos'}
                onClick={() => {
                  setSelectedOS('macos');
                  toast.success(`${t('osSwitch.switchedTo')} macOS`);
                }}
              />
              <OSButton
                id="linux"
                name="Linux"
                icon={<Terminal />}
                isSelected={selectedOS === 'linux'}
                onClick={() => {
                  setSelectedOS('linux');
                  toast.success(`${t('osSwitch.switchedTo')} Linux`);
                }}
              />
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedOS === 'windows' &amp;&amp; (
            <motion.div
              key="windows"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            &gt;
              // ... existing code ...
            &lt;/motion.div&gt;
          )}
          {selectedOS === 'macos' &amp;&amp; (
            <motion.div
              key="macos"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            &gt;
              // ... existing code ...
            &lt;/motion.div&gt;
          )}
          {selectedOS === 'linux' &amp;&amp; (
            <motion.div
              key="linux"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            &gt;
              // ... existing code ...
            &lt;/motion.div&gt;
          )}
        &lt;/AnimatePresence&gt;
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {selectedOS === 'windows' && platformAssets.windows.map((asset, index) => (
            <DownloadCard
              key={asset.id}
              title={asset.name.includes('.exe') ? 'Windows Installer' : 'Windows Archive'}
              description={asset.name}
              icon={<Monitor />}
              downloadUrl={asset.browser_download_url}
              size={Math.round(asset.size / 1024 / 1024)}
              downloads={asset.download_count}
              index={index}
            />
          ))}
          
          {selectedOS === 'macos' && (
            <>
              {platformAssets.macos.map((asset, index) => (
                <DownloadCard
                  key={asset.id}
                  title="macOS Package"
                  description={asset.name}
                  icon={<Laptop />}
                  downloadUrl={asset.browser_download_url}
                  size={Math.round(asset.size / 1024 / 1024)}
                  downloads={asset.download_count}
                  index={index}
                />
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative group"
              >
                <Card className="p-8 hover:shadow-2xl transition-all duration-500 relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200/50 dark:border-orange-800/50">
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.05), transparent)`
                    }}
                  />
                  
                  <div className="text-center relative z-10">
                    <motion.div 
                      className="text-5xl mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      🍺
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                      Homebrew
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      {t('downloadSection.installCommands')}
                    </p>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleBrewCopy}
                        variant="outline"
                        className="w-full border-orange-200 hover:bg-orange-50 dark:border-orange-800 dark:hover:bg-orange-900/20 py-3 text-lg font-medium"
                      >
                        {copiedBrew ? (
                          <>
                            <Check className="w-5 h-5 mr-3 text-green-600" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-5 h-5 mr-3" />
                            Copy Commands
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </>
          )}
          
          {selectedOS === 'linux' && platformAssets.linux.map((asset, index) => {
            let packageType = 'Linux Package';
            let icon = <Terminal />;
            
            if (asset.isExternal) {
              if (asset.name.includes('AUR')) {
                packageType = 'AUR Package';
                icon = <ExternalLink />;
              } else if (asset.name.includes('Flathub')) {
                packageType = 'Flathub';
                icon = <ExternalLink />;
              }
            } else {
              if (asset.name.includes('.deb')) packageType = 'Debian Package';
              else if (asset.name.includes('.rpm')) packageType = 'RPM Package';
              else if (asset.name.includes('.appimage')) packageType = 'AppImage';
            }
            
            return (
              <DownloadCard
                key={asset.id}
                title={packageType}
                description={asset.isExternal ? `Install via ${packageType}` : asset.name}
                icon={icon}
                downloadUrl={asset.browser_download_url}
                size={asset.isExternal ? 0 : Math.round(asset.size / 1024 / 1024)}
                downloads={asset.download_count}
                index={index}
              />
            );
          })}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex justify-center gap-4 flex-wrap">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => window.open(latestRelease.html_url, '_blank')}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-700 py-3 px-6 text-lg font-medium"
              >
                <ExternalLink className="w-5 h-5 mr-3" />
                {t('downloadSection.releaseNotes')}
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/releases', '_blank')}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-700 py-3 px-6 text-lg font-medium"
              >
                <Github className="w-5 h-5 mr-3" />
                {t('downloadMessages.viewAllReleases')}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

useEffect(() => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('win')) setSelectedOS('windows');
  else if (userAgent.includes('mac')) setSelectedOS('macos');
  else if (userAgent.includes('linux')) setSelectedOS('linux');
}, []);
});

export default InteractiveDownloadSection;

// В местах вызова DownloadCard добавляем props
<DownloadCard
  key={asset.id}
  title={asset.name.includes('.exe') ? 'Windows Installer' : 'Windows Archive'}
  description={asset.name}
  icon={<Monitor />}
  downloadUrl={asset.browser_download_url}
  size={Math.round(asset.size / 1024 / 1024)}
  downloads={asset.download_count}
  index={index}
  system="Windows"
  features="Простая установка, поддержка 64-bit"
/>

// Аналогично для других ОС

// Удаляем mouse-following div для фикса бага
// Удалена строка: <motion.div className="pointer-events-none absolute w-96 h-96 ... />
