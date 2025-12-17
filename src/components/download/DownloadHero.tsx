import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Download, Laptop, Apple, Monitor } from 'lucide-react';
import type { GitHubRelease } from './types';

interface DownloadHeroProps {
  latestRelease: GitHubRelease | undefined;
  detectedOS: 'windows' | 'macos' | 'linux';
  onDownload: () => void;
}

export const DownloadHero: React.FC<DownloadHeroProps> = ({ latestRelease, detectedOS, onDownload }) => {
  const { t } = useTranslation();

  const getOSIcon = () => {
    switch (detectedOS) {
      case 'windows': return <Laptop className="w-6 h-6 mr-2" />;
      case 'macos': return <Apple className="w-6 h-6 mr-2" />;
      case 'linux': return <Monitor className="w-6 h-6 mr-2" />;
    }
  };

  const getOSName = () => {
    switch (detectedOS) {
      case 'windows': return 'Windows';
      case 'macos': return 'macOS';
      case 'linux': return 'Linux';
    }
  };

  if (!latestRelease) return null;

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px]" />
            <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
        </div>

      <div className="container mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-6 py-2 px-4 bg-slate-800/50 hover:bg-slate-800/50 backdrop-blur border-slate-700/50 text-blue-300">
            {t('downloadMessages.version')} {latestRelease.tag_name}
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-slate-300 bg-clip-text text-transparent">
              {t('downloadMessages.downloadTitle')}
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            {t('downloadMessages.downloadDescription')}
          </p>

          <div className="flex flex-col items-center gap-6">
            <Button 
              size="lg" 
              onClick={onDownload}
              className="h-16 px-10 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-500/20 rounded-2xl transition-all duration-300 transform hover:scale-105"
            >
              {getOSIcon()}
              {t('downloadMessages.download')} {getOSName()}
              <Download className="w-5 h-5 ml-3" />
            </Button>
            
            <span className="text-sm text-slate-500">
              {t('downloadMessages.releasedOn')} {new Date(latestRelease.published_at).toLocaleDateString()}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
