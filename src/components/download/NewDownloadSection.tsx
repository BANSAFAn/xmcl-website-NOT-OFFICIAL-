import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Github, ExternalLink, Copy, Check, Monitor, Smartphone, Laptop, Package, Terminal } from 'lucide-react';
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

interface PlatformAssets {
  windows: {
    x64: any[];
    app: any[];
  };
  macos: {
    x64: any[];
    arm64: any[];
  };
  linux: {
    x64: any[];
    arm64: any[];
  };
}

const NewDownloadSection = () => {
  const { t } = useTranslation();
  const [selectedOS, setSelectedOS] = useState('windows');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  // Fetch latest release from GitHub
  const { data: releases, isLoading, error } = useQuery({
    queryKey: ['github-releases'],
    queryFn: async () => {
      const response = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases');
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('GitHub API rate limit exceeded');
        }
        throw new Error('Failed to fetch releases');
      }
      return response.json();
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

  const getPlatformDescription = (platform: string, packageType: string) => {
    const descriptions = {
      'Windows Installer': t('downloadSection.windowsInstallerDesc'),
      'Windows Archive': t('downloadSection.windowsArchiveDesc'),
      'Windows Store App': t('downloadSection.windowsStoreDesc'),
      'Winget': t('downloadSection.wingetDesc'),
      'macOS Package': t('downloadSection.macosPackageDesc'),
      'macOS Package (Apple Silicon)': t('downloadSection.macosPackageArmDesc'),
      'Homebrew': t('downloadSection.homebrewDesc'),
      'Debian Package': t('downloadSection.debianDesc'),
      'Debian Package (ARM64)': t('downloadSection.debianArmDesc'),
      'RPM Package': t('downloadSection.rpmDesc'),
      'RPM Package (ARM64)': t('downloadSection.rpmArmDesc'),
      'AppImage': t('downloadSection.appImageDesc'),
      'AppImage (ARM64)': t('downloadSection.appImageArmDesc'),
      'Tar Archive': t('downloadSection.tarDesc'),
      'Tar Archive (ARM64)': t('downloadSection.tarArmDesc'),
      'AUR': t('downloadSection.aurDesc'),
      'Flathub': t('downloadSection.flathubDesc')
    };
    return descriptions[packageType] || packageType;
  };

  const latestRelease = releases?.[0];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleCopy = (text: string, item: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(item);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const getFilteredAssets = (assets: any[]): PlatformAssets => {
    if (!assets) return { 
      windows: { x64: [], app: [] }, 
      macos: { x64: [], arm64: [] }, 
      linux: { x64: [], arm64: [] } 
    };

    // First filter out SHA256, blockmap, and other service files
    const filteredAssets = assets.filter((asset: any) => {
      const name = asset.name.toLowerCase();
      return !name.includes('sha256') && 
             !name.includes('blockmap') && 
             !name.includes('.sig') &&
             !name.includes('.txt') &&
             !name.includes('.yml') &&
             asset.size > 1024 * 1024; // Only files larger than 1MB
    });
    
    return {
      windows: {
        x64: filteredAssets.filter(asset => {
          const name = asset.name.toLowerCase();
          return (name.includes('setup') && name.includes('.exe')) ||
                 (name.includes('win') && name.includes('.zip')) && 
                 !name.includes('arm64');
        }).slice(0, 2),
        app: filteredAssets.filter(asset => {
          const name = asset.name.toLowerCase();
          return name.includes('.appx') && !name.includes('arm64');
        }).slice(0, 1)
      },
      
      macos: {
        x64: filteredAssets.filter(asset => {
          const name = asset.name.toLowerCase();
          return (name.includes('.dmg') || name.includes('.pkg')) && 
                 !name.includes('arm64');
        }).slice(0, 1),
        arm64: filteredAssets.filter(asset => {
          const name = asset.name.toLowerCase();
          return (name.includes('.dmg') || name.includes('.pkg')) && 
                 name.includes('arm64');
        }).slice(0, 1)
      },
      
      linux: {
        x64: filteredAssets.filter(asset => {
          const name = asset.name.toLowerCase();
          return (name.includes('.deb') || name.includes('.rpm') || 
                 name.includes('.appimage') || name.includes('.tar.xz')) && 
                 !name.includes('arm64');
        }).slice(0, 4),
        arm64: filteredAssets.filter(asset => {
          const name = asset.name.toLowerCase();
          return (name.includes('.deb') || name.includes('.rpm') || 
                 name.includes('.appimage') || name.includes('.tar.xz')) && 
                 name.includes('arm64');
        }).slice(0, 4)
      }
    };
  };

  const OSButton = ({ id, name, icon, isSelected, onClick }: {
    id: string;
    name: string;
    icon: React.ReactNode;
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <motion.button
      onClick={onClick}
      className={`relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 overflow-hidden group ${
        isSelected
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl scale-105'
          : 'bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm border-2 border-transparent hover:border-blue-200/50 dark:hover:border-blue-700/50'
      }`}
      whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        boxShadow: isSelected 
          ? `0 0 30px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)`
          : 'none'
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent)`
        }}
      />
      <span className="text-2xl relative z-10">{icon}</span>
      <span className="text-lg relative z-10">{name}</span>
      {isSelected && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl"
          layoutId="selectedOSGlow"
          style={{
            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.2)'
          }}
        />
      )}
    </motion.button>
  );

  const DownloadCard = ({ title, description, icon, downloadUrl, size, downloads, index, isCommand = false, commandText = '' }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    downloadUrl?: string;
    size?: number;
    downloads?: number;
    index: number;
    isCommand?: boolean;
    commandText?: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <Card 
        className="p-8 hover:shadow-2xl transition-all duration-500 relative overflow-hidden backdrop-blur-md bg-white/95 dark:bg-slate-800/95 border-2 border-transparent group-hover:border-blue-200/50 dark:group-hover:border-blue-700/50"
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 16px, rgba(0, 0, 0, 0.1) 0px 8px 24px, rgba(0, 0, 0, 0.1) 0px 16px 56px'
        }}
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.05), transparent)`
          }}
        />
        
        <div className="text-center relative z-10">
          <motion.div 
            className="text-5xl mb-6 relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative inline-block">
              {icon}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
          
          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            {title}
          </h3>
          
          <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
            {description}
          </p>
          
          {!isCommand && size && downloads && (
            <div className="flex justify-between text-sm text-slate-500 mb-6 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-700/50 dark:to-slate-600/50 rounded-xl p-4 border border-slate-200/50 dark:border-slate-600/50">
              <span className="font-medium">{size} {t('downloadSection.sizeMB')}</span>
              <span className="font-medium">{downloads} {t('downloadSection.downloadCount')}</span>
            </div>
          )}

          {isCommand && commandText && (
            <div className="mb-6">
              <div className="bg-slate-900 dark:bg-slate-800 rounded-xl p-4 border border-slate-700">
                <code className="text-green-400 dark:text-green-300 text-sm font-mono whitespace-pre-wrap">
                  {commandText}
                </code>
              </div>
            </div>
          )}
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => {
                if (isCommand && commandText) {
                  handleCopy(commandText, title);
                } else if (downloadUrl) {
                  window.open(downloadUrl, '_blank');
                }
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
              style={{
                backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: 'rgba(102, 126, 234, 0.4) 0px 8px 32px'
              }}
            >
              {isCommand ? (
                copiedItem === title ? (
                  <>
                    <Check className="w-5 h-5 mr-3" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 mr-3" />
                    Copy Commands
                  </>
                )
              ) : (
                <>
                  <Download className="w-5 h-5 mr-3" />
                  {t('downloadSection.download')}
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );

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
    const isRateLimit = error?.message?.includes('rate limit');
    return (
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800" />
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-md mx-auto p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              {isRateLimit ? 'GitHub API rate limit exceeded' : 'Unable to load releases'}
            </h3>
            <p className="text-red-600 dark:text-red-400 mb-4">
              {isRateLimit ? 'Please try again in a few minutes.' : 'Failed to fetch release information.'}
            </p>
            {isRateLimit && (
              <Button
                onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/releases', '_blank')}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on GitHub
              </Button>
            )}
          </div>
        </div>
      </section>
    );
  }

  const platformAssets = getFilteredAssets(latestRelease.assets);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800" />
      
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 100%)',
        }}
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"
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
            <Badge 
              variant="secondary" 
              className="text-lg py-3 px-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-2 border-blue-200/50 dark:border-blue-700/50"
            >
              {t('downloadSection.version')} {latestRelease.tag_name}
            </Badge>
            <Badge 
              variant="outline" 
              className="text-lg py-3 px-6 border-2 border-slate-200/50 dark:border-slate-700/50"
            >
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
          <div className="bg-white/60 dark:bg-slate-800/60 rounded-3xl p-4 shadow-2xl backdrop-blur-xl border-2 border-white/20 dark:border-slate-700/20">
            <div className="flex gap-4">
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

        <div className="mb-12">
          {selectedOS === 'windows' && (
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-200">
                  Windows x64
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(() => {
                    const installer = platformAssets.windows.x64.find(a => a.name.includes('.exe'));
                    const archive = platformAssets.windows.x64.find(a => !a.name.includes('.exe'));
                    const assets = [installer, archive].filter(Boolean);

                    return assets.map((asset, index) => (
                      <DownloadCard
                        key={asset.id}
                        title={asset.name.includes('.exe') ? 'Windows Installer' : 'Windows Archive'}
                        description={getPlatformDescription('windows', asset.name.includes('.exe') ? 'Windows Installer' : 'Windows Archive')}
                        icon={<Monitor />}
                        downloadUrl={asset.browser_download_url}
                        size={Math.round(asset.size / 1024 / 1024)}
                        downloads={asset.download_count}
                        index={index}
                      />
                    ));
                  })()}
                  
                  {platformAssets.windows.app.map((asset, index) => (
                    <DownloadCard
                      key={asset.id}
                      title="Windows Store App"
                      description={getPlatformDescription('windows', 'Windows Store App')}
                      icon={<Package />}
                      downloadUrl={asset.browser_download_url}
                      size={Math.round(asset.size / 1024 / 1024)}
                      downloads={asset.download_count}
                      index={platformAssets.windows.x64.length + index}
                    />
                  ))}
                  
                  <DownloadCard
                    title="Winget"
                    description={getPlatformDescription('windows', 'Winget')}
                    icon={<Terminal />}
                    index={platformAssets.windows.x64.length + platformAssets.windows.app.length}
                    isCommand={true}
                    commandText="winget install CI010.XMinecraftLauncher"
                  />
                </div>
              </div>
            </div>
          )}
          
          {selectedOS === 'macos' && (
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-200">
                  macOS x64 (Intel)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {platformAssets.macos.x64.map((asset, index) => (
                    <DownloadCard
                      key={asset.id}
                      title="macOS Package"
                      description={getPlatformDescription('macos', 'macOS Package')}
                      icon={<Laptop />}
                      downloadUrl={asset.browser_download_url}
                      size={Math.round(asset.size / 1024 / 1024)}
                      downloads={asset.download_count}
                      index={index}
                    />
                  ))}
                  
                  <DownloadCard
                    title="Homebrew"
                    description={getPlatformDescription('macos', 'Homebrew')}
                    icon={<Terminal />}
                    index={platformAssets.macos.x64.length}
                    isCommand={true}
                    commandText="brew tap voxelum/xmcl&#10;brew install --cask --no-quarantine voxelum/xmcl"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-200">
                  macOS arm64 (Apple Silicon)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {platformAssets.macos.arm64.map((asset, index) => (
                    <DownloadCard
                      key={asset.id}
                      title="macOS Package (Apple Silicon)"
                      description={getPlatformDescription('macos', 'macOS Package (Apple Silicon)')}
                      icon={<Laptop />}
                      downloadUrl={asset.browser_download_url}
                      size={Math.round(asset.size / 1024 / 1024)}
                      downloads={asset.download_count}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {selectedOS === 'linux' && (
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-200">
                  Linux x64
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {platformAssets.linux.x64.map((asset, index) => {
                    let packageType = 'Linux Package';
                    if (asset.name.includes('.deb')) packageType = 'Debian Package';
                    else if (asset.name.includes('.rpm')) packageType = 'RPM Package';
                    else if (asset.name.includes('.appimage')) packageType = 'AppImage';
                    else if (asset.name.includes('.tar.xz')) packageType = 'Tar Archive';
                    
                    return (
                      <DownloadCard
                        key={asset.id}
                        title={packageType}
                        description={getPlatformDescription('linux', packageType)}
                        icon={<Terminal />}
                        downloadUrl={asset.browser_download_url}
                        size={Math.round(asset.size / 1024 / 1024)}
                        downloads={asset.download_count}
                        index={index}
                      />
                    );
                  })}
                  
                   <DownloadCard
                     title="AUR"
                     description={getPlatformDescription('linux', 'AUR')}
                     icon={<Package />}
                     downloadUrl="https://aur.archlinux.org/packages/xmcl-launcher"
                     index={platformAssets.linux.x64.length + 1}
                   />
                   
                   <DownloadCard
                     title="Flathub"
                     description={getPlatformDescription('linux', 'Flathub')}
                     icon={<Package />}
                     downloadUrl="https://flathub.org/apps/app.xmcl.voxelum"
                     index={platformAssets.linux.x64.length + 2}
                   />
                </div>
              </div>

              {platformAssets.linux.arm64.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-200">
                    Linux arm64
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {platformAssets.linux.arm64.map((asset, index) => {
                      let packageType = 'Linux Package (ARM64)';
                      if (asset.name.includes('.deb')) packageType = 'Debian Package (ARM64)';
                      else if (asset.name.includes('.rpm')) packageType = 'RPM Package (ARM64)';
                      else if (asset.name.includes('.appimage')) packageType = 'AppImage (ARM64)';
                      else if (asset.name.includes('.tar.xz')) packageType = 'Tar Archive (ARM64)';
                      
                      return (
                        <DownloadCard
                          key={asset.id}
                          title={packageType}
                          description={getPlatformDescription('linux', packageType)}
                          icon={<Terminal />}
                          downloadUrl={asset.browser_download_url}
                          size={Math.round(asset.size / 1024 / 1024)}
                          downloads={asset.download_count}
                          index={index}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex justify-center gap-6 flex-wrap">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => window.open(latestRelease.html_url, '_blank')}
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-700 py-4 px-8 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5 mr-3" />
                {t('downloadSection.releaseNotes')}
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/releases', '_blank')}
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-700 py-4 px-8 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
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

export default NewDownloadSection;
