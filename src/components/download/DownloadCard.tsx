// src/components/download/DownloadCard.tsx
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Info, ExternalLink } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { DownloadOption } from './types';

interface DownloadCardProps {
  option: DownloadOption & {
    asset?: any;
    installCommand?: string;
    isExternal?: boolean;
  };
}

export const DownloadCard = ({ option }: DownloadCardProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const { t } = useTranslation();

  const handleDownload = () => {
    if (option.isExternal && option.link) {
      window.open(option.link, '_blank');
    } else if (option.installCommand) {
      navigator.clipboard.writeText(option.installCommand);
      alert(`${t('downloadMessages.brewCommands')}\n\n${option.installCommand}`);
    } else if (option.link) {
      window.open(option.link, '_blank');
    }
  };

  if (option.disabled) {
    return (
      <Card className="p-6 bg-gradient-to-br from-slate-700/20 to-slate-800/20 backdrop-blur-md text-white/50 border border-white/10 shadow-lg relative overflow-hidden opacity-70">
        <div className="text-center">
          <div className="flex justify-center mb-4 relative">
            <div className="p-3 bg-white/5 rounded-full backdrop-blur-sm">
              {option.icon}
            </div>
          </div>
          <h5 className="text-xl font-bold mb-3 drop-shadow-md">{option.title}</h5>
          <p className="text-sm text-white/70 mb-3">{option.subtitle}</p>
          <p className="text-xs text-white/50">{t('common.comingSoon')}</p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card
        className={`${option.colorClass} backdrop-blur-md text-white border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 animate-fade-in relative overflow-hidden group`}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-4 relative">
            <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
              {option.icon}
            </div>
          </div>

          <h5 className="text-xl font-bold mb-3 drop-shadow-md">{option.title}</h5>

          <p className="text-sm text-white/90 mb-3 truncate font-medium" title={option.subtitle}>
            {option.subtitle}
          </p>

          <div className="space-y-2">
            <Button
              className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
              onClick={handleDownload}
            >
              {option.isExternal ? (
                <>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('common.open')}
                </>
              ) : option.installCommand ? (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  {t('downloadSection.installCommands')}
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  {t('downloadSection.download')}
                </>
              )}
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

      {/* Modal for more info */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-white/10 rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowInfo(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white"
            >
              <Info className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-4">{t('downloadSection.moreInfo')}</h3>
            <p className="text-slate-300 whitespace-pre-wrap">
              {option.description}
            </p>
            {option.installCommand && (
              <div className="mt-4 p-3 bg-slate-700 rounded-md">
                <code className="text-sm text-green-400">{option.installCommand}</code>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};