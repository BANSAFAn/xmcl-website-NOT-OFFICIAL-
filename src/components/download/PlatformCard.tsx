import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

interface PlatformCardProps {
  title: string;
  description: string;
  icon: string;
  downloadUrl: string;
  size: number;
  downloads: number;
  index: number;
}

const PlatformCard: React.FC<PlatformCardProps> = ({
  title,
  description,
  icon,
  downloadUrl,
  size,
  downloads,
  index
}) => {
  const { t } = useTranslation();

  const handleDownload = () => {
    window.open(downloadUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <div className="text-center">
          <div className="text-4xl mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
            {description}
          </p>
          <div className="flex justify-between text-sm text-slate-500 mb-4">
            <span>{size} {t('downloadSection.sizeMB')}</span>
            <span>{downloads} {t('downloadSection.downloadCount')}</span>
          </div>
          <Button
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Download className="w-4 h-4 mr-2" />
            {t('downloadSection.download')}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export { PlatformCard };