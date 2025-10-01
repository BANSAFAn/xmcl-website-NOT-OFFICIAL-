// src/components/download/DownloadOptions.tsx
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Info, ExternalLink } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { DownloadOption, WindowsAssets, MacOSAssets, LinuxAssets } from './types';
import { useOSAssets } from './fetchReleases';
import { WindowsLogo, AppXLogo, ZipLogo, AppleLogo, AppleSiliconLogo, AppleIntelLogo, LinuxLogo, LinuxArm64Logo, AppImageLogo, DebLogo, RPMLogo, TarGzLogo, FlatpakLogo, DefaultDownloadIcon } from './DownloadIcons';

interface DownloadOptionsProps {
  selectedOS: string;
  setSelectedOS: (os: string) => void;
}

export const DownloadOptions = ({ selectedOS, setSelectedOS }: DownloadOptionsProps) => {
  const { t } = useTranslation();
  const { assets, isLoading, error } = useOSAssets(selectedOS, (t as any).i18n.store.data[t.lng]); 

  const [showAllOptions, setShowAllOptions] = useState(false);

  const createOptionFromAsset = (assetInfo: any, type: string): DownloadOption => {
    const iconMap: Record<string, React.ReactNode> = {
      'app': <WindowsLogo className="w-12 h-12 text-white drop-shadow-lg" />,
      'appx': <AppXLogo className="w-12 h-12 text-white drop-shadow-lg" />,
      'zip64': <ZipLogo className="w-12 h-12 text-white drop-shadow-lg" />,
      'zip32': <ZipLogo className="w-12 h-12 text-white drop-shadow-lg" />,
      'universal': <AppleLogo className="w-12 h-12 text-white drop-shadow-lg" />,
      'arm64': <AppleSiliconLogo className="w-12 h-12 text-white drop-shadow-lg" />,
      'intel': <AppleIntelLogo className="w-12 h-12 text-white drop-shadow-lg" />,
      'appimage': <AppImageLogo className="w-12 h-12 text-white drop-shadow-lg" />,
      'deb': <DebLogo className="w-12 h-12 text-white drop-shadow-lg" />,
      'rpm': <RPMLogo className="w-12 h-12 text-white drop-shadow-lg" />,
      'default': <DefaultDownloadIcon className="w-12 h-12 text-white drop-shadow-lg" />,
    };

    const colorMap: Record<string, string> = {
      'windows': 'from-blue-500/20 to-cyan-500/20',
      'macos': 'from-purple-500/20 to-pink-500/20',
      'linux': 'from-green-500/20 to-emerald-500/20',
    };

    const icon = assetInfo ? iconMap[type] || iconMap['default'] : iconMap['default'];
    const color = colorMap[selectedOS as 'windows' | 'macos' | 'linux'] || 'from-slate-500/20 to-slate-600/20';

    return {
      id: `${selectedOS}-${type}`,
      title: assetInfo?.name || t(`downloadSection.${type}` as any) || type,
      subtitle: assetInfo?.size || t(`downloadSection.${type}Description` as any) || 'No description',
      description: t(`downloadSection.${type}Description` as any) || 'No description',
      icon: icon,
      disabled: !assetInfo,
      colorClass: `bg-gradient-to-br ${color}`,
      link: assetInfo?.url,
      asset: assetInfo,
      installCommand: undefined,
      isExternal: false,
    };
  };

  const generateOptions = (): DownloadOption[] => {
    if (isLoading || error || !assets) return [];

    const osOptions: DownloadOption[] = [];

    if (selectedOS === 'windows') {
      const winAssets = assets as WindowsAssets;
      if (winAssets.app) osOptions.push(createOptionFromAsset(winAssets.app, 'app'));
      if (winAssets.appx) osOptions.push(createOptionFromAsset(winAssets.appx, 'appx'));
      if (winAssets.zip64) osOptions.push(createOptionFromAsset(winAssets.zip64, 'zip64'));
      if (winAssets.zip32) osOptions.push(createOptionFromAsset(winAssets.zip32, 'zip32'));
    }

    if (selectedOS === 'macos') {
      const macAssets = assets as MacOSAssets;
      if (macAssets.universal) osOptions.push(createOptionFromAsset(macAssets.universal, 'universal'));
      if (macAssets.arm64) osOptions.push(createOptionFromAsset(macAssets.arm64, 'arm64'));
      if (macAssets.intel) osOptions.push(createOptionFromAsset(macAssets.intel, 'intel'));
    }

    if (selectedOS === 'linux') {
      const linuxAssets = assets as LinuxAssets;
      if (linuxAssets.appimage) osOptions.push(createOptionFromAsset(linuxAssets.appimage, 'appimage'));
      if (linuxAssets.deb) osOptions.push(createOptionFromAsset(linuxAssets.deb, 'deb'));
      if (linuxAssets.rpm) osOptions.push(createOptionFromAsset(linuxAssets.rpm, 'rpm'));
      if (linuxAssets.arm64) osOptions.push(createOptionFromAsset(linuxAssets.arm64, 'arm64'));
      // Add external options like Flatpak
      osOptions.push({
        id: 'linux-flatpak',
        title: t('downloadSection.flathub'),
        subtitle: t('downloadSection.flathubDesc'),
        description: t('downloadSection.flathubDesc'),
        icon: <FlatpakLogo className="w-12 h-12 text-white drop-shadow-lg" />,
        disabled: false,
        colorClass: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20',
        isExternal: true,
        link: 'https://flathub.org/apps/details/app.voxelum.xmcl', // v1mkss FLATHUB BTW
        asset: undefined,
        installCommand: undefined,
      });
    }

    if (selectedOS === 'windows') {
      osOptions.push({
        id: 'windows-winget',
        title: 'Winget',
        subtitle: t('downloadSection.wingetDesc'),
        description: t('downloadSection.wingetDesc'),
        icon: <WindowsLogo className="w-12 h-12 text-white drop-shadow-lg" />,
        disabled: false,
        colorClass: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
        installCommand: 'winget install CI010.XMinecraftLauncher',
        asset: undefined,
        isExternal: false,
        link: undefined,
      });
    }

    if (selectedOS === 'macos') {
      osOptions.push({
        id: 'macos-brew',
        title: 'Homebrew',
        subtitle: t('downloadSection.homebrewDesc'),
        description: t('downloadSection.homebrewDesc'),
        icon: <AppleLogo className="w-12 h-12 text-white drop-shadow-lg" />,
        disabled: false,
        colorClass: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
        installCommand: 'brew install --cask --no-quarantine voxelum/xmcl',
        asset: undefined,
        isExternal: false,
        link: undefined,
      });
    }

    return osOptions;
  };

  const options = generateOptions();
  const displayedOptions = showAllOptions ? options : options.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* OS Selector */}
      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant={selectedOS === 'windows' ? 'default' : 'outline'}
          onClick={() => setSelectedOS('windows')}
          className={`px-8 py-4 rounded-xl font-bold ${selectedOS === 'windows' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'text-white border-white/30'}`}
        >
          <WindowsLogo className="w-5 h-5 mr-2" />
          Windows
        </Button>
        <Button
          variant={selectedOS === 'macos' ? 'default' : 'outline'}
          onClick={() => setSelectedOS('macos')}
          className={`px-8 py-4 rounded-xl font-bold ${selectedOS === 'macos' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'text-white border-white/30'}`}
        >
          <AppleLogo className="w-5 h-5 mr-2" />
          macOS
        </Button>
        <Button
          variant={selectedOS === 'linux' ? 'default' : 'outline'}
          onClick={() => setSelectedOS('linux')}
          className={`px-8 py-4 rounded-xl font-bold ${selectedOS === 'linux' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'text-white border-white/30'}`}
        >
          <LinuxLogo className="w-5 h-5 mr-2" />
          Linux
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center text-red-500">
          {t('downloadMessages.errorLoading')} - {error.message || error}
        </div>
      )}

      {/* Options Grid */}
      {!isLoading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedOptions.map((option) => (
              <DownloadCard key={option.id} option={option} />
            ))}
          </div>

          {/* Show More/Less Button */}
          {options.length > 3 && (
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => setShowAllOptions(!showAllOptions)}
                className="text-white border-white/30"
              >
                {showAllOptions ? t('common.showLess') : `${t('common.showMore')} (${options.length - 3})`}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};