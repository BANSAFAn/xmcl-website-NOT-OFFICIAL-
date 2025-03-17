
import { Download, Package, FileArchive } from "lucide-react";
import { DownloadOption } from './types';
import { LinuxAssets } from './types';
import { useOSAssets } from './fetchReleases';
import { ExtendedTranslations } from './types';
import { useLanguage } from '@/components/navbar/LanguageContext';

type RenderFunctionProps = {
  getTranslation: (key: keyof ExtendedTranslations) => string;
  setDownloadProgress: (progress: number) => void;
  setCurrentAsset: (asset: string | null) => void;
  setShowConfirmation: (show: boolean) => void;
};

export const renderLinuxOptions = ({
  getTranslation,
  setDownloadProgress,
  setCurrentAsset,
  setShowConfirmation
}: RenderFunctionProps): DownloadOption[] => {
  const { assets } = useOSAssets('linux');
  const linuxAssets = assets as LinuxAssets;
  const { currentLanguage } = useLanguage();
  
  const options: DownloadOption[] = [];
  
  // AppImage - Portable Linux option
  if (linuxAssets?.appimage) {
    options.push({
      id: 'linux_appimage',
      title: "Linux AppImage",
      subtitle: "Portable for any distribution",
      description: getTranslation('linux.appimage'),
      icon: <FileArchive size={24} />,
      disabled: false,
      colorClass: 'bg-white/5',
      isComingSoon: false,
      size: linuxAssets.appimage.size,
      link: linuxAssets.appimage.url,
      onClick: () => {
        setDownloadProgress(0);
        setCurrentAsset(linuxAssets.appimage?.url || '');
        setShowConfirmation(true);
      }
    });
  }
  
  // Debian/Ubuntu package
  if (linuxAssets?.deb) {
    options.push({
      id: 'linux_deb',
      title: "Debian/Ubuntu DEB",
      subtitle: "For Debian-based distributions",
      description: getTranslation('linux.deb'),
      icon: <Package size={24} />,
      disabled: false,
      colorClass: 'bg-white/5',
      isComingSoon: false,
      size: linuxAssets.deb.size,
      link: linuxAssets.deb.url,
      onClick: () => {
        setDownloadProgress(0);
        setCurrentAsset(linuxAssets.deb?.url || '');
        setShowConfirmation(true);
      }
    });
  }
  
  // RPM package
  if (linuxAssets?.rpm) {
    options.push({
      id: 'linux_rpm',
      title: "Fedora/RHEL RPM",
      subtitle: "For Fedora/RHEL-based distributions",
      description: getTranslation('linux.rpm'),
      icon: <Package size={24} />,
      disabled: false,
      colorClass: 'bg-white/5',
      isComingSoon: false,
      size: linuxAssets.rpm.size,
      link: linuxAssets.rpm.url,
      onClick: () => {
        setDownloadProgress(0);
        setCurrentAsset(linuxAssets.rpm?.url || '');
        setShowConfirmation(true);
      }
    });
  }
  
  // Flatpak (Community maintained)
  options.push({
    id: 'linux_flatpak',
    title: "Linux Flatpak",
    subtitle: "Maintained by community",
    description: getTranslation('linux.flatpak'),
    icon: <Package size={24} />,
    disabled: false,
    colorClass: 'bg-white/5',
    isComingSoon: true,
    size: "N/A",
    link: "https://github.com/ci010/XMinecraftLauncher",
    onClick: () => {
      window.open("https://github.com/ci010/XMinecraftLauncher", "_blank");
    }
  });
  
  // ARM64 build (for Raspberry Pi, etc)
  if (linuxAssets?.arm64) {
    options.push({
      id: 'linux_arm64',
      title: "Linux ARM64",
      subtitle: "For Raspberry Pi, etc",
      description: getTranslation('linux.arm64'),
      icon: <Download size={24} />,
      disabled: false,
      colorClass: 'bg-white/5',
      isComingSoon: false,
      size: linuxAssets.arm64.size,
      link: linuxAssets.arm64.url,
      onClick: () => {
        setDownloadProgress(0);
        setCurrentAsset(linuxAssets.arm64?.url || '');
        setShowConfirmation(true);
      }
    });
  }

  return options;
};
