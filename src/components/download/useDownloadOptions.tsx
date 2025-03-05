
import { useState, useEffect } from 'react';
import { LinuxLogo, WindowsLogo, AppleLogo, LinuxArm64Logo, AppXLogo, AppImageLogo, AppleSiliconLogo, AppleIntelLogo, DebLogo, RPMLogo, TarGzLogo, ZipLogo, FlatpakLogo } from './DownloadIcons';
import { fetchReleases } from './fetchReleases';
import { getColorClass } from './colorMap';
import { translations } from './translations';

export interface DownloadOption {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
  size: string;
  colorClass: string;
  isComingSoon?: boolean;
}

export function useDownloadOptions(initialOS = "windows") {
  const [selectedOS, setSelectedOS] = useState(initialOS);
  const [downloadOptions, setDownloadOptions] = useState<DownloadOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  // Update selected OS when the prop changes
  useEffect(() => {
    setSelectedOS(initialOS);
  }, [initialOS]);
  
  // Handle language change via event
  useEffect(() => {
    const handleLanguageChange = () => {
      const savedLang = localStorage.getItem('language') || 'en';
      setCurrentLanguage(savedLang);
    };
    
    // Listen for language changes and set initial language
    handleLanguageChange();
    window.addEventListener('languageChange', handleLanguageChange);
    window.addEventListener('storage', (e) => {
      if (e.key === 'language') {
        handleLanguageChange();
      }
    });
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);
  
  // Fetch release data when OS changes
  useEffect(() => {
    const loadReleaseData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const releaseData = await fetchReleases();
        
        // Filter and format options based on selected OS
        let filteredOptions: DownloadOption[] = [];
        
        if (selectedOS === 'windows') {
          filteredOptions = [
            {
              title: 'Windows Installer',
              description: translations[currentLanguage as keyof typeof translations].windows.installer,
              icon: <WindowsLogo />,
              link: releaseData.windows.installer.url,
              size: releaseData.windows.installer.size,
              colorClass: getColorClass('windows')
            },
            {
              title: 'Windows AppX',
              description: translations[currentLanguage as keyof typeof translations].windows.appx,
              icon: <AppXLogo />,
              link: releaseData.windows.appx.url,
              size: releaseData.windows.appx.size,
              colorClass: getColorClass('appx')
            },
            {
              title: 'Windows Portable',
              description: translations[currentLanguage as keyof typeof translations].windows.portable,
              icon: <ZipLogo />,
              link: releaseData.windows.portable.url,
              size: releaseData.windows.portable.size,
              colorClass: getColorClass('zip')
            }
          ];
        } else if (selectedOS === 'macos') {
          filteredOptions = [
            {
              title: 'macOS App (Universal)',
              description: translations[currentLanguage as keyof typeof translations].macos.universal,
              icon: <AppleLogo />,
              link: releaseData.macos.universal.url,
              size: releaseData.macos.universal.size,
              colorClass: getColorClass('macos')
            },
            {
              title: 'macOS App (Apple Silicon)',
              description: translations[currentLanguage as keyof typeof translations].macos.arm64,
              icon: <AppleSiliconLogo />,
              link: releaseData.macos.arm64.url,
              size: releaseData.macos.arm64.size,
              colorClass: getColorClass('macos-arm')
            },
            {
              title: 'macOS App (Intel)',
              description: translations[currentLanguage as keyof typeof translations].macos.intel,
              icon: <AppleIntelLogo />,
              link: releaseData.macos.intel.url,
              size: releaseData.macos.intel.size,
              colorClass: getColorClass('macos-intel')
            }
          ];
        } else if (selectedOS === 'linux') {
          filteredOptions = [
            {
              title: 'Linux AppImage',
              description: translations[currentLanguage as keyof typeof translations].linux.appimage,
              icon: <AppImageLogo />,
              link: releaseData.linux.appimage.url,
              size: releaseData.linux.appimage.size,
              colorClass: getColorClass('appimage')
            },
            {
              title: 'Linux Flatpak',
              description: translations[currentLanguage as keyof typeof translations].linux.flatpak,
              icon: <FlatpakLogo />,
              link: "https://github.com/v1mkss/io.github.voxelum.xmcl",
              size: '~100 MB',
              colorClass: getColorClass('flatpak'),
              isComingSoon: true
            },
            {
              title: 'Linux .deb (Ubuntu/Debian)',
              description: translations[currentLanguage as keyof typeof translations].linux.deb,
              icon: <DebLogo />,
              link: releaseData.linux.deb.url,
              size: releaseData.linux.deb.size,
              colorClass: getColorClass('deb')
            },
            {
              title: 'Linux .rpm (Fedora/RHEL)',
              description: translations[currentLanguage as keyof typeof translations].linux.rpm,
              icon: <RPMLogo />,
              link: releaseData.linux.rpm.url,
              size: releaseData.linux.rpm.size,
              colorClass: getColorClass('rpm')
            },
            {
              title: 'Linux ARM64 AppImage',
              description: translations[currentLanguage as keyof typeof translations].linux.arm64,
              icon: <LinuxArm64Logo />,
              link: releaseData.linux.arm64.url,
              size: releaseData.linux.arm64.size,
              colorClass: getColorClass('linux-arm')
            }
          ];
        }
        
        setDownloadOptions(filteredOptions);
      } catch (err) {
        console.error('Error fetching release data:', err);
        setError('Failed to fetch download options. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadReleaseData();
  }, [selectedOS, currentLanguage]);
  
  return {
    downloadOptions,
    isLoading,
    error
  };
}
