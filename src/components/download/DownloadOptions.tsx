
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useDownloadOptions } from './useDownloadOptions';
import { useDownloadActions } from './useDownloadActions';
import { LoadingSpinner } from './LoadingSpinner';
import { OSSelector } from './OsSelector';
import { DownloadGrid } from './DownloadGrid';
import { ShowMoreButton } from './ShowMoreButton';
import { ErrorDisplay } from './ErrorDisplay';
import { useLatestRelease } from './fetchReleases';
import { useIsMobile } from '@/hooks/use-mobile';
import { Smartphone, AlertTriangle } from 'lucide-react';
import { useOS } from '@/context/OSContext';

interface DownloadOptionsProps {
  selectedOS: string;
  setSelectedOS: (os: string) => void;
}

export function DownloadOptions({ selectedOS, setSelectedOS }: DownloadOptionsProps) {
  const { renderWindowsOptions, renderLinuxOptions, renderMacOSOptions } = useDownloadOptions();
  const { showAllOptions, setShowAllOptions, handleDownloadClick } = useDownloadActions();
  const { data: releaseData, isLoading, error } = useLatestRelease();
  const isMobile = useIsMobile();
  const { osInfo } = useOS();
  
  // Set the selected OS based on detected OS on initial load
  useEffect(() => {
    if (osInfo.category !== "unknown") {
      setSelectedOS(osInfo.category);
    }
  }, [osInfo.category, setSelectedOS]);
  
  // Get options based on selected OS
  const getOptions = () => {
    switch (selectedOS) {
      case 'windows':
        return renderWindowsOptions();
      case 'linux':
        return renderLinuxOptions();
      case 'macos':
        return renderMacOSOptions();
      default:
        return [];
    }
  };

  const downloadOptions = getOptions();
  
  // Update language when the user changes it
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  useEffect(() => {
    const handleLanguageChange = () => {
      const savedLang = localStorage.getItem('language') || 'en';
      setCurrentLanguage(savedLang);
    };
    
    handleLanguageChange();
    window.addEventListener('languageChange', handleLanguageChange);
    window.addEventListener('storage', (e) => {
      if (e.key === 'language') {
        handleLanguageChange();
      }
    });
    
    // Show toast with latest release info when data is loaded
    if (releaseData && !isLoading) {
      toast.success(`Latest version available: ${releaseData.tag_name}`, {
        description: `Released on ${new Date(releaseData.published_at).toLocaleDateString()}`,
        duration: 5000,
      });
    }
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, [releaseData, isLoading]);

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  

  return (
    <div className="space-y-8">
      <OSSelector activeOS={selectedOS} setActiveOS={setSelectedOS} />
      
      {isLoading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner />
        </div>
      ) : isMobile ? (
        <div className="p-6 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm my-8">
  <div className="flex flex-col items-center text-center space-y-4">
    <div className="p-4 rounded-full bg-yellow-500/20">
      <Smartphone className="h-10 w-10 text-yellow-500" />
    </div>
    <h3 className="text-xl font-medium text-white">{t('ui.mobileDetected')}</h3>
    <p className="text-white/70">{t('ui.mobileMessage')}</p>
    
    <div className="flex items-center mt-4 text-white/60 text-sm">
      <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
      <p>{t('ui.desktopBrowserMessage')}</p>
    </div>
  </div>
</div>
      ) : (
        <>
          <DownloadGrid 
            options={downloadOptions}
            showAllOptions={showAllOptions}
            onDownloadClick={handleDownloadClick}
          />
          
          {downloadOptions.length > 3 && (
            <ShowMoreButton
              showAllOptions={showAllOptions}
              setShowAllOptions={setShowAllOptions}
              totalOptions={downloadOptions.length}
            />
          )}
        </>
      )}
    </div>
  );
}
