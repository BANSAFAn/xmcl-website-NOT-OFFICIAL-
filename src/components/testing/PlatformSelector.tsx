
import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Apple, Smartphone } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface PlatformSelectorProps {
  selectedPlatform: string;
  onSelectPlatform: (platform: string) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatform,
  onSelectPlatform
}) => {
  const { t } = useTranslation();

  const platforms = [
    { id: 'windows', name: 'Windows', icon: Monitor, color: 'from-blue-500 to-cyan-500' },
    { id: 'macos', name: 'macOS', icon: Apple, color: 'from-purple-500 to-pink-500' },
    { id: 'linux', name: 'Linux', icon: Smartphone, color: 'from-green-500 to-emerald-500' }
  ];

  return (
    <div className="flex justify-center mb-12">
      <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-2 shadow-2xl border border-white/20 dark:border-slate-700/20">
        <div className="flex gap-2">
          {platforms.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <motion.button
                key={platform.id}
                onClick={() => onSelectPlatform(platform.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  selectedPlatform === platform.id
                    ? `bg-gradient-to-r ${platform.color} text-white shadow-lg`
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconComponent className="w-6 h-6" />
                <span className="text-lg">{platform.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { PlatformSelector };
