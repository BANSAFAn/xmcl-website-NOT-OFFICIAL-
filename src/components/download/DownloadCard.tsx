
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Info } from 'lucide-react';
import { PackageInfoModal } from './PackageInfoModal';
import { useTranslation } from '@/hooks/useTranslation';

interface DownloadCardProps {
  asset: any;
  packageInfo: {
    type: string;
    icon: React.ComponentType<any>;
    color: string;
  };
  index: number;
}

export const DownloadCard = ({ asset, packageInfo, index }: DownloadCardProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const { t } = useTranslation();
  const IconComponent = packageInfo.icon;

  return (
    <>
      <Card 
        key={index} 
        className={`group p-6 bg-gradient-to-br ${packageInfo.color} backdrop-blur-md text-white border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 animate-fade-in relative overflow-hidden`} 
        style={{animationDelay: `${index * 0.1}s`}}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-4 relative">
            <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
              <IconComponent className="w-12 h-12 text-white drop-shadow-lg" />
            </div>
          </div>
          
          <h5 className="text-xl font-bold mb-3 drop-shadow-md">{packageInfo.type}</h5>
          
          <p className="text-sm text-white/90 mb-3 truncate font-medium" title={asset.name}>
            {asset.isExternal ? t('downloadSection.linuxUniversal') : asset.name}
          </p>
          
          {!asset.isExternal && asset.size > 0 && (
            <div className="flex items-center justify-center gap-4 text-white/80 text-sm mb-4 bg-white/10 rounded-lg p-2 backdrop-blur-sm">
              <span className="font-medium">{(asset.size / 1024 / 1024).toFixed(1)} {t('downloadSection.sizeMB')}</span>
              {asset.download_count > 0 && (
                <span className="font-medium">{asset.download_count?.toLocaleString()} {t('downloadSection.downloadCount')}</span>
              )}
            </div>
          )}
          
          <div className="space-y-2">
            <Button 
              className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
              onClick={() => {
                if (asset.name === 'Brew') {
                  // Показываем команды для brew
                  const commands = `brew tap voxelum/xmcl\nbrew install --cask --no-quarantine voxelum/xmcl`;
                  navigator.clipboard?.writeText(commands);
                  alert(`${t('downloadMessages.brewCommands')}\n\n${commands}`);
                } else {
                  window.open(asset.browser_download_url, '_blank');
                }
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              {asset.name === 'Brew' ? t('downloadSection.installCommands') : t('downloadSection.download')}
            </Button>
            
            <Button 
              variant="ghost"
              size="sm"
              className="w-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
              onClick={() => setShowInfo(true)}
            >
              <Info className="w-4 h-4 mr-2" />
              {t('downloadSection.moreInfo')}
            </Button>
          </div>
        </div>
      </Card>
      
      {showInfo && (
        <PackageInfoModal 
          packageType={packageInfo.type}
          onClose={() => setShowInfo(false)}
        />
      )}
    </>
  );
};
