
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Monitor, Apple, Smartphone, Zap } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from "sonner";

interface Artifact {
  id: number;
  name: string;
  size_in_bytes: number;
  archive_download_url: string;
  expired: boolean;
}

interface DownloadArtifactsProps {
  artifacts: Artifact[];
  selectedPlatform: string;
  runId: number;
}

const DownloadArtifacts: React.FC<DownloadArtifactsProps> = ({ 
  artifacts, 
  selectedPlatform, 
  runId 
}) => {
  const { t } = useTranslation();

  const getPlatformArtifacts = () => {
    if (!artifacts) return [];
    
    switch (selectedPlatform) {
      case 'windows':
        return artifacts.filter((a: Artifact) => 
          a.name.toLowerCase().includes('windows') || 
          a.name.toLowerCase().includes('win') ||
          a.name.toLowerCase().includes('exe')
        );
      case 'linux':
        return artifacts.filter((a: Artifact) => 
          a.name.toLowerCase().includes('linux') ||
          a.name.toLowerCase().includes('appimage') ||
          a.name.toLowerCase().includes('deb') ||
          a.name.toLowerCase().includes('rpm')
        );
      case 'macos':
        return artifacts.filter((a: Artifact) => 
          a.name.toLowerCase().includes('mac') ||
          a.name.toLowerCase().includes('darwin') ||
          a.name.toLowerCase().includes('dmg')
        );
      default:
        return [];
    }
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const handleDownload = (artifact: Artifact) => {
    window.open(`https://github.com/Voxelum/x-minecraft-launcher/actions/runs/${runId}`, '_blank');
    toast.success(t('testing.downloadStarted'));
  };

  const platformArtifacts = getPlatformArtifacts();

  if (platformArtifacts.length === 0) {
    return (
      <motion.div 
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Monitor className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
          {t('testing.noArtifacts')}
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          No artifacts available for {selectedPlatform}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {platformArtifacts.map((artifact: Artifact, index: number) => (
        <motion.div
          key={artifact.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 * index }}
        >
          <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2 truncate">
                {artifact.name}
              </h3>
              
              <div className="flex justify-between items-center mb-4">
                <Badge variant="secondary" className="text-xs">
                  {formatFileSize(artifact.size_in_bytes)}
                </Badge>
                <Badge 
                  className={`text-xs ${
                    artifact.expired 
                      ? 'bg-red-500 text-white' 
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {artifact.expired ? 'Expired' : 'Available'}
                </Badge>
              </div>
              
              <Button
                onClick={() => handleDownload(artifact)}
                disabled={artifact.expired}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4 mr-2" />
                {t('testing.downloadArtifact')}
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export { DownloadArtifacts };
