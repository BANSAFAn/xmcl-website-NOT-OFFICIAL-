import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { useQuery } from '@tanstack/react-query';
import { OSSelector } from '@/components/download/OSSelector';
import { PlatformCard } from '@/components/download/PlatformCard';
import { HomebrewCard } from '@/components/download/HomebrewCard';

interface GitHubAsset {
  id: number;
  name: string;
  browser_download_url: string;
  size: number;
  download_count: number;
}

interface GitHubRelease {
  tag_name: string;
  published_at: string;
  html_url: string;
  assets: GitHubAsset[];
}

const DownloadSection = () => {
  const { t } = useTranslation();
  const [selectedOS, setSelectedOS] = useState('windows');
  const { data: releases, isLoading, error } = useQuery({
    queryKey: ['github-releases'],
    queryFn: async () => {
      const response = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases');
      if (!response.ok) throw new Error('Failed to fetch releases');
      return response.json();
    }
  });

  const latestRelease = releases?.[0];

  const getAssetsByPlatform = (assets: GitHubAsset[]) => {
    if (!assets) return { windows: [], macos: [], linux: [] };
    
    return {
      windows: assets.filter(asset => 
        asset.name.includes('win') || 
        asset.name.includes('Setup') || 
        asset.name.includes('.exe') ||
        asset.name.includes('windows')
      ),
      macos: assets.filter(asset => 
        asset.name.includes('mac') || 
        asset.name.includes('darwin') || 
        asset.name.includes('.dmg')
      ),
      linux: assets.filter(asset => 
        asset.name.includes('linux') || 
        asset.name.includes('.AppImage') ||
        asset.name.includes('.deb') ||
        asset.name.includes('.rpm')
      )
    };
  };

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
        <div className="container mx-auto text-center">
          <p className="text-slate-600 dark:text-slate-400">{t('downloadMessages.loadingReleases')}</p>
        </div>
      </section>
    );
  }

  if (error || !latestRelease) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
        <div className="container mx-auto text-center">
          <p className="text-red-600 dark:text-red-400">{t('ui.error')}</p>
        </div>
      </section>
    );
  }

  const platformAssets = getAssetsByPlatform(latestRelease.assets);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('downloadSection.title')}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            {t('downloadSection.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Badge variant="secondary" className="text-sm">
              {t('downloadSection.version')} {latestRelease.tag_name}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {t('downloadMessages.releasedOn')} {new Date(latestRelease.published_at).toLocaleDateString()}
            </Badge>
          </div>
        </div>

        <OSSelector selectedOS={selectedOS} onSelectOS={setSelectedOS} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {selectedOS === 'windows' && platformAssets.windows.map((asset, index) => (
            <PlatformCard
              key={asset.id}
              title="Windows"
              description={asset.name}
              icon="🪟"
              downloadUrl={asset.browser_download_url}
              size={Math.round(asset.size / 1024 / 1024)}
              downloads={asset.download_count}
              index={index}
            />
          ))}
          
          {selectedOS === 'macos' && (
            <>
              {platformAssets.macos.map((asset, index) => (
                <PlatformCard
                  key={asset.id}
                  title="macOS"
                  description={asset.name}
                  icon="🍎"
                  downloadUrl={asset.browser_download_url}
                  size={Math.round(asset.size / 1024 / 1024)}
                  downloads={asset.download_count}
                  index={index}
                />
              ))}
              
              <HomebrewCard />
            </>
          )}
          
          {selectedOS === 'linux' && platformAssets.linux.map((asset, index) => (
            <PlatformCard
              key={asset.id}
              title="Linux"
              description={asset.name}
              icon="🐧"
              downloadUrl={asset.browser_download_url}
              size={Math.round(asset.size / 1024 / 1024)}
              downloads={asset.download_count}
              index={index}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => window.open(latestRelease.html_url, '_blank')}
            className="mr-4"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            {t('downloadSection.releaseNotes')}
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/releases', '_blank')}
          >
            <Github className="w-4 h-4 mr-2" />
            {t('downloadMessages.viewAllReleases')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;