
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Github, ExternalLink, Info, Monitor, Smartphone, Laptop, Package, Terminal, Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/useTranslation';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

interface MousePosition {
  x: number;
  y: number;
}

interface PackageInfo {
  type: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  pros: string[];
  cons: string[];
  bestFor: string;
}

const ModernDownloadSection = () => {
  const { t } = useTranslation();
  const [selectedOS, setSelectedOS] = useState('windows');
  const [selectedPackage, setSelectedPackage] = useState<PackageInfo | null>(null);
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
    staleTime: 5 * 60 * 1000
  });

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

  const getPackageInfo = (fileName: string, osName: string): PackageInfo => {
    const name = fileName.toLowerCase();
    
    if (osName === 'windows') {
      if (name.includes('.exe')) {
        return {
          type: 'Windows Installer',
          icon: <Monitor className="w-6 h-6" />,
          color: 'from-blue-500 to-cyan-500',
          description: 'Standard Windows installer with automatic setup and shortcuts',
          pros: ['Easy installation', 'Automatic updates', 'Desktop shortcuts', 'Start menu integration'],
          cons: ['Requires admin rights', 'Cannot run portable'],
          bestFor: 'Most Windows users who want a traditional installation experience'
        };
      }
      if (name.includes('.zip')) {
        return {
          type: 'Portable Archive',
          icon: <Package className="w-6 h-6" />,
          color: 'from-green-500 to-emerald-500',
          description: 'Portable version that runs without installation',
          pros: ['No installation needed', 'Can run from USB', 'No admin rights required', 'Multiple versions'],
          cons: ['Manual updates', 'No system integration'],
          bestFor: 'Users who prefer portable apps or have restricted permissions'
        };
      }
      if (name.includes('.appx')) {
        return {
          type: 'Microsoft Store Package',
          icon: <Smartphone className="w-6 h-6" />,
          color: 'from-purple-500 to-violet-500',
          description: 'Windows Store compatible package with sandboxed security',
          pros: ['Automatic updates via Store', 'Sandboxed security', 'Easy uninstall'],
          cons: ['Windows 10+ only', 'Limited file system access'],
          bestFor: 'Windows 10/11 users who prefer Store apps'
        };
      }
    } else if (osName === 'macos') {
      if (name.includes('.dmg')) {
        return {
          type: 'macOS Disk Image',
          icon: <Laptop className="w-6 h-6" />,
          color: 'from-gray-600 to-gray-800',
          description: 'Standard macOS application package with drag-and-drop installation',
          pros: ['Easy installation', 'Native macOS experience', 'Automatic app signing'],
          cons: ['Intel/Apple Silicon specific builds'],
          bestFor: 'Most macOS users who prefer traditional app installation'
        };
      }
    } else if (osName === 'linux') {
      if (name.includes('.deb')) {
        return {
          type: 'Debian Package',
          icon: <Terminal className="w-6 h-6" />,
          color: 'from-red-500 to-pink-500',
          description: 'Debian/Ubuntu package with dependency management',
          pros: ['Automatic dependencies', 'System integration', 'Package manager updates'],
          cons: ['Debian/Ubuntu only', 'May conflict with other packages'],
          bestFor: 'Debian, Ubuntu, and derivative users'
        };
      }
      if (name.includes('.rpm')) {
        return {
          type: 'RPM Package',
          icon: <Terminal className="w-6 h-6" />,
          color: 'from-blue-500 to-indigo-500',
          description: 'Red Hat package for RHEL, Fedora, and SUSE systems',
          pros: ['System integration', 'Dependency management', 'Package manager updates'],
          cons: ['RPM-based distros only', 'May require additional repositories'],
          bestFor: 'Fedora, RHEL, openSUSE, and other RPM-based distributions'
        };
      }
      if (name.includes('.appimage')) {
        return {
          type: 'AppImage',
          icon: <Package className="w-6 h-6" />,
          color: 'from-green-500 to-teal-500',
          description: 'Universal Linux application that runs on any distribution',
          pros: ['Works on any Linux', 'No installation needed', 'Self-contained', 'No dependencies'],
          cons: ['Larger file size', 'Manual updates', 'No system integration'],
          bestFor: 'Any Linux distribution, especially for portable use'
        };
      }
      if (name === 'aur package') {
        return {
          type: 'AUR Package',
          icon: <ExternalLink className="w-6 h-6" />,
          color: 'from-blue-600 to-cyan-600',
          description: 'Arch User Repository package for Arch Linux and derivatives',
          pros: ['Latest versions', 'Arch integration', 'Community maintained'],
          cons: ['Arch Linux only', 'Build from source', 'Community support'],
          bestFor: 'Arch Linux, Manjaro, and other Arch-based distributions'
        };
      }
      if (name === 'flathub') {
        return {
          type: 'Flathub',
          icon: <ExternalLink className="w-6 h-6" />,
          color: 'from-purple-600 to-pink-600',
          description: 'Universal Linux package via Flatpak with sandboxing',
          pros: ['Works on most Linux', 'Sandboxed security', 'Automatic updates'],
          cons: ['Larger disk usage', 'Some performance overhead'],
          bestFor: 'Most Linux distributions with Flatpak support'
        };
      }
    }
    
    return {
      type: 'Package',
      icon: <Package className="w-6 h-6" />,
      color: 'from-gray-500 to-gray-700',
      description: 'Software package',
      pros: ['Standard installation'],
      cons: [],
      bestFor: 'General use'
    };
  };

  const getFilteredAssets = (assets: any[]) => {
    if (!assets) return { 
      windows: { x64: [], app: [] }, 
      macos: { x64: [], arm64: [] }, 
      linux: { x64: [], arm64: [] } 
    };
    
    const filteredAssets = assets.filter((asset: any) => {
      const name = asset.name.toLowerCase();
      return !name.includes('sha256') && 
             !name.includes('sha256sum') &&
             !name.includes('blockmap') && 
             !name.includes('.sig') &&
             !name.includes('.txt') &&
             !name.includes('.yml') &&
             asset.size > 1024 * 1024;
    });
    
    return {
      windows: {
        x64: filteredAssets.filter(asset => {
          const name = asset.name.toLowerCase();
          return ((name.includes('setup') && name.includes('.exe')) ||
                 (name.includes('win') && name.includes('.zip'))) && 
                 (name.includes('x64') || name.includes('win64') || !name.includes('win32'));
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
      className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
        isSelected
          ? 'bg-primary text-primary-foreground shadow-lg scale-105'
          : 'bg-card text-card-foreground hover:bg-accent border border-border'
      }`}
      whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="text-xl">{icon}</span>
      <span>{name}</span>
      {isSelected && (
        <motion.div
          className="absolute inset-0 bg-primary/10 rounded-xl"
          layoutId="selectedOSGlow"
        />
      )}
    </motion.button>
  );

  const DownloadCard = ({ asset, packageInfo, downloadUrl, size, downloads, index, isCommand = false, commandText = '' } : {
    asset?: any;
    packageInfo: PackageInfo;
    downloadUrl?: string;
    size?: number;
    downloads?: number;
    index: number;
    isCommand?: boolean;
    commandText?: string;
  }) =&gt; (
    &lt;div className=&quot;group&quot;&gt;
      &lt;Card className=&quot;relative p-6 h-full bg-card border-border hover:shadow-xl transition-all duration-300 overflow-hidden&quot;&gt;
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.05), transparent)`
          }}
        />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${packageInfo.color}`}>
              {packageInfo.icon}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedPackage(packageInfo)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Info className="w-4 h-4" />
            </Button>
          </div>
          
          <h3 className="text-lg font-semibold mb-2 text-foreground">
            {packageInfo.type}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4 flex-1">
            {packageInfo.description}
          </p>
          
          {!isCommand && size && downloads !== undefined && (
            <div className="flex justify-between text-xs text-muted-foreground mb-4 p-2 bg-muted rounded-lg">
              <span>{size} MB</span>
              <span>{downloads.toLocaleString()} downloads</span>
            </div>
          )}

          {isCommand && commandText && (
            <div className="mb-4">
              <div className="bg-secondary p-3 rounded-lg border">
                <code className="text-xs font-mono text-foreground whitespace-pre-wrap">
                  {commandText}
                </code>
              </div>
            </div>
          )}
          
          <Button
            onClick={() => {
              if (isCommand && commandText) {
                handleCopy(commandText, packageInfo.type);
              } else if (downloadUrl) {
                window.open(downloadUrl, '_blank');
              }
            }}
            className="w-full mt-auto"
            size="sm"
          >
            {isCommand ? (
              copiedItem === packageInfo.type ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Commands
                </>
              )
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download
              </>
            )}
          </Button>
        </div>
      </Card>
    </motion.div>
  );

  if (isLoading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div 
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-muted-foreground">Loading releases...</p>
        </div>
      </section>
    );
  }

  if (error || !latestRelease) {
    const isRateLimit = error?.message?.includes('rate limit');
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-md mx-auto p-6 bg-destructive/10 border border-destructive/20 rounded-xl">
            <h3 className="text-lg font-semibold text-destructive mb-2">
              {isRateLimit ? 'GitHub API rate limit exceeded' : 'Unable to load releases'}
            </h3>
            <p className="text-destructive/80 mb-4">
              {isRateLimit ? 'Please try again in a few minutes.' : 'Failed to fetch release information.'}
            </p>
            {isRateLimit && (
              <Button
                onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/releases', '_blank')}
                variant="destructive"
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
    <>
      <section 
        ref={sectionRef}
        className="py-20 px-4 bg-gradient-to-br from-background via-background/50 to-muted/30"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Download X Minecraft Launcher
            </motion.h2>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Choose the best installation option for your system
            </motion.p>
            
            <motion.div 
              className="flex items-center justify-center gap-4 mb-8 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge variant="secondary" className="text-sm py-1 px-3">
                Version {latestRelease.tag_name}
              </Badge>
              <Badge variant="outline" className="text-sm py-1 px-3">
                Released {new Date(latestRelease.published_at).toLocaleDateString()}
              </Badge>
            </motion.div>
          </div>

          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-3 border border-border shadow-lg">
              <div className="flex gap-2">
                <OSButton
                  id="windows"
                  name="Windows"
                  icon={<Monitor />}
                  isSelected={selectedOS === 'windows'}
                  onClick={() => {
                    setSelectedOS('windows');
                    toast.success('Switched to Windows');
                  }}
                />
                <OSButton
                  id="macos"
                  name="macOS"
                  icon={<Laptop />}
                  isSelected={selectedOS === 'macos'}
                  onClick={() => {
                    setSelectedOS('macos');
                    toast.success('Switched to macOS');
                  }}
                />
                <OSButton
                  id="linux"
                  name="Linux"
                  icon={<Terminal />}
                  isSelected={selectedOS === 'linux'}
                  onClick={() => {
                    setSelectedOS('linux');
                    toast.success('Switched to Linux');
                  }}
                />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {selectedOS === 'windows' && (
              <>
                {platformAssets.windows.x64.map((asset, index) => {
                  const packageInfo = getPackageInfo(asset.name, 'windows');
                  return (
                    <DownloadCard
                      key={asset.id}
                      asset={asset}
                      packageInfo={packageInfo}
                      downloadUrl={asset.browser_download_url}
                      size={Math.round(asset.size / 1024 / 1024)}
                      downloads={asset.download_count}
                      index={index}
                    />
                  );
                })}
                
                {platformAssets.windows.app.map((asset, index) => {
                  const packageInfo = getPackageInfo(asset.name, 'windows');
                  return (
                    <DownloadCard
                      key={asset.id}
                      asset={asset}
                      packageInfo={packageInfo}
                      downloadUrl={asset.browser_download_url}
                      size={Math.round(asset.size / 1024 / 1024)}
                      downloads={asset.download_count}
                      index={platformAssets.windows.x64.length + index}
                    />
                  );
                })}
                
                <DownloadCard
                  packageInfo={{
                    type: 'Winget',
                    icon: <Terminal className="w-6 h-6" />,
                    color: 'from-blue-600 to-purple-600',
                    description: 'Install via Windows Package Manager',
                    pros: ['Command-line installation', 'Automatic updates', 'No manual downloads'],
                    cons: ['Windows 10+ only', 'Requires command line'],
                    bestFor: 'Developers and power users who prefer command-line tools'
                  }}
                  index={platformAssets.windows.x64.length + platformAssets.windows.app.length}
                  isCommand={true}
                  commandText="winget install CI010.XMinecraftLauncher"
                />
              </>
            )}
            
            {selectedOS === 'macos' && (
              <>
                {platformAssets.macos.x64.map((asset, index) => {
                  const packageInfo = getPackageInfo(asset.name, 'macos');
                  return (
                    <DownloadCard
                      key={asset.id}
                      asset={asset}
                      packageInfo={packageInfo}
                      downloadUrl={asset.browser_download_url}
                      size={Math.round(asset.size / 1024 / 1024)}
                      downloads={asset.download_count}
                      index={index}
                    />
                  );
                })}
                
                {platformAssets.macos.arm64.map((asset, index) => {
                  const packageInfo = getPackageInfo(asset.name, 'macos');
                  return (
                    <DownloadCard
                      key={asset.id}
                      asset={asset}
                      packageInfo={{
                        ...packageInfo,
                        type: packageInfo.type + ' (Apple Silicon)',
                        bestFor: 'Apple Silicon Macs (M1, M2, M3 chips)'
                      }}
                      downloadUrl={asset.browser_download_url}
                      size={Math.round(asset.size / 1024 / 1024)}
                      downloads={asset.download_count}
                      index={platformAssets.macos.x64.length + index}
                    />
                  );
                })}
                
                <DownloadCard
                  packageInfo={{
                    type: 'Homebrew',
                    icon: <Terminal className="w-6 h-6" />,
                    color: 'from-orange-500 to-red-500',
                    description: 'Install via Homebrew package manager',
                    pros: ['Easy updates', 'Dependency management', 'Command-line installation'],
                    cons: ['Requires Homebrew', 'Command-line only'],
                    bestFor: 'Developers who use Homebrew for package management'
                  }}
                  index={platformAssets.macos.x64.length + platformAssets.macos.arm64.length}
                  isCommand={true}
                  commandText="brew tap voxelum/xmcl\nbrew install --cask --no-quarantine voxelum/xmcl"
                />
              </>
            )}
            
            {selectedOS === 'linux' && (
              <>
                {platformAssets.linux.x64.map((asset, index) => {
                  const packageInfo = getPackageInfo(asset.name, 'linux');
                  return (
                    <DownloadCard
                      key={asset.id}
                      asset={asset}
                      packageInfo={packageInfo}
                      downloadUrl={asset.browser_download_url}
                      size={Math.round(asset.size / 1024 / 1024)}
                      downloads={asset.download_count}
                      index={index}
                    />
                  );
                })}
                
                <DownloadCard
                  packageInfo={getPackageInfo('aur package', 'linux')}
                  downloadUrl="https://aur.archlinux.org/packages/xmcl-launcher"
                  index={platformAssets.linux.x64.length}
                />
                
                <DownloadCard
                  packageInfo={getPackageInfo('flathub', 'linux')}
                  downloadUrl="https://flathub.org/apps/app.xmcl.voxelum"
                  index={platformAssets.linux.x64.length + 1}
                />
              </>
            )}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex justify-center gap-4 flex-wrap">
              <Button
                variant="outline"
                onClick={() => window.open(latestRelease.html_url, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Release Notes
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/releases', '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                All Releases
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Dialog open={!!selectedPackage} onOpenChange={() => setSelectedPackage(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${selectedPackage?.color}`}>
                {selectedPackage?.icon}
              </div>
              {selectedPackage?.type}
            </DialogTitle>
            <DialogDescription>
              {selectedPackage?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Advantages:</h4>
              <ul className="text-sm space-y-1">
                {selectedPackage?.pros.map((pro, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-green-500 rounded-full" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            
            {selectedPackage?.cons && selectedPackage.cons.length > 0 && (
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">Considerations:</h4>
                <ul className="text-sm space-y-1">
                  {selectedPackage.cons.map((con, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-orange-500 rounded-full" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-foreground mb-1">Best for:</h4>
              <p className="text-sm text-muted-foreground">{selectedPackage?.bestFor}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModernDownloadSection;

const DownloadCard = ({ asset, packageInfo, downloadUrl, size, downloads, index, isCommand = false, commandText = '' } : {
  asset?: any;
  packageInfo: PackageInfo;
  downloadUrl?: string;
  size?: number;
  downloads?: number;
  index: number;
  isCommand?: boolean;
  commandText?: string;
}) => (
  &lt;div className=&quot;group&quot;&gt;
    &lt;Card className=&quot;relative p-6 h-full bg-card border-border hover:shadow-xl transition-all duration-300 overflow-hidden&quot;&gt;
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.05), transparent)`
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${packageInfo.color}`}>
            {packageInfo.icon}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedPackage(packageInfo)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Info className="w-4 h-4" />
          </Button>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 text-foreground">
          {packageInfo.type}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 flex-1">
          {packageInfo.description}
        </p>
        
        {!isCommand && size && downloads !== undefined && (
          <div className="flex justify-between text-xs text-muted-foreground mb-4 p-2 bg-muted rounded-lg">
            <span>{size} MB</span>
            <span>{downloads.toLocaleString()} downloads</span>
          </div>
        )}

        {isCommand && commandText && (
          <div className="mb-4">
            <div className="bg-secondary p-3 rounded-lg border">
              <code className="text-xs font-mono text-foreground whitespace-pre-wrap">
                {commandText}
              </code>
            </div>
          </div>
        )}
        
        <Button
          onClick={() => {
            if (isCommand && commandText) {
              handleCopy(commandText, packageInfo.type);
            } else if (downloadUrl) {
              window.open(downloadUrl, '_blank');
            }
          }}
          className="w-full mt-auto"
          size="sm"
        >
          {isCommand ? (
            copiedItem === packageInfo.type ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Commands
              </>
            )
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div 
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-muted-foreground">Loading releases...</p>
        </div>
      </section>
    );
  }

  if (error || !latestRelease) {
    const isRateLimit = error?.message?.includes('rate limit');
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-md mx-auto p-6 bg-destructive/10 border border-destructive/20 rounded-xl">
            <h3 className="text-lg font-semibold text-destructive mb-2">
              {isRateLimit ? 'GitHub API rate limit exceeded' : 'Unable to load releases'}
            </h3>
            <p className="text-destructive/80 mb-4">
              {isRateLimit ? 'Please try again in a few minutes.' : 'Failed to fetch release information.'}
            </p>
            {isRateLimit && (
              <Button
                onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/releases', '_blank')}
                variant="destructive"
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
    <>
      <section 
        ref={sectionRef}
        className="py-20 px-4 bg-gradient-to-br from-background via-background/50 to-muted/30"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Download X Minecraft Launcher
            </motion.h2>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Choose the best installation option for your system
            </motion.p>
            
            <motion.div 
              className="flex items-center justify-center gap-4 mb-8 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge variant="secondary" className="text-sm py-1 px-3">
                Version {latestRelease.tag_name}
              </Badge>
              <Badge variant="outline" className="text-sm py-1 px-3">
                Released {new Date(latestRelease.published_at).toLocaleDateString()}
              </Badge>
            </motion.div>
          </div>

          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-3 border border-border shadow-lg">
              <div className="flex gap-2">
                <OSButton
                  id="windows"
                  name="Windows"
                  icon={<Monitor />}
                  isSelected={selectedOS === 'windows'}
                  onClick={() => {
                    setSelectedOS('windows');
                    toast.success('Switched to Windows');
                  }}
                />
                <OSButton
                  id="macos"
                  name="macOS"
                  icon={<Laptop />}
                  isSelected={selectedOS === 'macos'}
                  onClick={() => {
                    setSelectedOS('macos');
                    toast.success('Switched to macOS');
                  }}
                />
                <OSButton
                  id="linux"
                  name="Linux"
                  icon={<Terminal />}
                  isSelected={selectedOS === 'linux'}
                  onClick={() => {
                    setSelectedOS('linux');
                    toast.success('Switched to Linux');
                  }}
                />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {selectedOS === 'windows' &amp;&amp; (
              &lt;motion.div
                key=&quot;windows&quot;
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className=&quot;contents&quot;
              &gt;
                {platformAssets.windows.x64.map((asset, index) => {
                  const packageInfo = getPackageInfo(asset.name, 'windows');
                  return (
                    <DownloadCard
                      key={asset.id}
                      asset={asset}
                      packageInfo={packageInfo}
                      downloadUrl={asset.browser_download_url}
                      size={Math.round(asset.size / 1024 / 1024)}
                      downloads={asset.download_count}
                      index={index}
                    />
                  );
                })}
                
                {platformAssets.windows.app.map((asset, index) => {
                  const packageInfo = getPackageInfo(asset.name, 'windows');
                  return (
                    <DownloadCard
                      key={asset.id}
                      asset={asset}
                      packageInfo={packageInfo}
                      downloadUrl={asset.browser_download_url}
                      size={Math.round(asset.size / 1024 / 1024)}
                      downloads={asset.download_count}
                      index={platformAssets.windows.x64.length + index}
                    />
                  );
                })}
                
                <DownloadCard
                  packageInfo={{
                    type: 'Winget',
                    icon: <Terminal className="w-6 h-6" />,
                    color: 'from-blue-600 to-purple-600',
                    description: 'Install via Windows Package Manager',
                    pros: ['Command-line installation', 'Automatic updates', 'No manual downloads'],
                    cons: ['Windows 10+ only', 'Requires command line'],
                    bestFor: 'Developers and power users who prefer command-line tools'
                  }}
                  index={platformAssets.windows.x64.length + platformAssets.windows.app.length}
                  isCommand={true}
                  commandText="winget install CI010.XMinecraftLauncher"
                />
              </>
            )}
            
            {selectedOS === 'macos' &amp;&amp; (
              &lt;motion.div
                key=&quot;macos&quot;
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className=&quot;contents&quot;
              &gt;
                {platformAssets.macos.x64.map((asset, index) => {
                  const packageInfo = getPackageInfo(asset.name, 'macos');
                  return (
                    <DownloadCard
                      key={asset.id}
                      asset={asset}
                      packageInfo={packageInfo}
                      downloadUrl={asset.browser_download_url}
                      size={Math.round(asset.size / 1024 / 1024)}
                      downloads={asset.download_count}
                      index={index}
                    />
                  );
                })}
                
                {platformAssets.macos.arm64.map((asset, index) => {
                  const packageInfo = getPackageInfo(asset.name, 'macos');
                  return (
                    <DownloadCard
                      key={asset.id}
                      asset={asset}
                      packageInfo={{
                        ...packageInfo,
                        type: packageInfo.type + ' (Apple Silicon)',
                        bestFor: 'Apple Silicon Macs (M1, M2, M3 chips)'
                      }}
                      downloadUrl={asset.browser_download_url}
                      size={Math.round(asset.size / 1024 / 1024)}
                      downloads={asset.download_count}
                      index={platformAssets.macos.x64.length + index}
                    />
                  );
                })}
                
                <DownloadCard
                  packageInfo={{
                    type: 'Homebrew',
                    icon: <Terminal className="w-6 h-6" />,
                    color: 'from-orange-500 to-red-500',
                    description: 'Install via Homebrew package manager',
                    pros: ['Easy updates', 'Dependency management', 'Command-line installation'],
                    cons: ['Requires Homebrew', 'Command-line only'],
                    bestFor: 'Developers who use Homebrew for package management'
                  }}
                  index={platformAssets.macos.x64.length + platformAssets.macos.arm64.length}
                  isCommand={true}
                  commandText="brew tap voxelum/xmcl\nbrew install --cask --no-quarantine voxelum/xmcl"
                />
              </>
            )}
            
            {selectedOS === 'linux' &amp;&amp; (
              &lt;motion.div
                key=&quot;linux&quot;
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className=&quot;contents&quot;
              &gt;
                {platformAssets.linux.x64.map((asset, index) => {
                  const packageInfo = getPackageInfo(asset.name, 'linux');
                  return (
                    <DownloadCard
                      key={asset.id}
                      asset={asset}
                      packageInfo={packageInfo}
                      downloadUrl={asset.browser_download_url}
                      size={Math.round(asset.size / 1024 / 1024)}
                      downloads={asset.download_count}
                      index={index}
                    />
                  );
                })}
                
                <DownloadCard
                  packageInfo={getPackageInfo('aur package', 'linux')}
                  downloadUrl="https://aur.archlinux.org/packages/xmcl-launcher"
                  index={platformAssets.linux.x64.length}
                />
                
                <DownloadCard
                  packageInfo={getPackageInfo('flathub', 'linux')}
                  downloadUrl="https://flathub.org/apps/app.xmcl.voxelum"
                  index={platformAssets.linux.x64.length + 1}
                />
              </>
            )}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex justify-center gap-4 flex-wrap">
              <Button
                variant="outline"
                onClick={() => window.open(latestRelease.html_url, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Release Notes
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/releases', '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                All Releases
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Dialog open={!!selectedPackage} onOpenChange={() => setSelectedPackage(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${selectedPackage?.color}`}>
                {selectedPackage?.icon}
              </div>
              {selectedPackage?.type}
            </DialogTitle>
            <DialogDescription>
              {selectedPackage?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Advantages:</h4>
              <ul className="text-sm space-y-1">
                {selectedPackage?.pros.map((pro, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-green-500 rounded-full" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            
            {selectedPackage?.cons && selectedPackage.cons.length > 0 && (
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">Considerations:</h4>
                <ul className="text-sm space-y-1">
                  {selectedPackage.cons.map((con, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-orange-500 rounded-full" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-foreground mb-1">Best for:</h4>
              <p className="text-sm text-muted-foreground">{selectedPackage?.bestFor}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModernDownloadSection;
