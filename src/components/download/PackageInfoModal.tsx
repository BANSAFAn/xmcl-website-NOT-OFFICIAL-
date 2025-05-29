
import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor, Smartphone, Server, Download, Shield, Zap, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DownloadOption } from "./types";

interface PackageInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageInfo: DownloadOption | null;
}

export function PackageInfoModal({ isOpen, onClose, packageInfo }: PackageInfoModalProps) {
  if (!packageInfo) return null;

  const getCompatibilityInfo = (id: string) => {
    const compatibility = {
      'win_zip64': {
        systems: ['Windows 10', 'Windows 11'],
        requirements: 'x64 архитектура, 4GB RAM',
        installation: 'Распакуйте архив и запустите exe файл',
        features: ['Портативная версия', 'Не требует установки', 'Можно запускать с USB']
      },
      'win_zip32': {
        systems: ['Windows 7', 'Windows 8', 'Windows 10'],
        requirements: 'x86 архитектура, 2GB RAM',
        installation: 'Распакуйте архив и запустите exe файл',
        features: ['Совместимость со старыми ПК', 'Легкая версия', 'Быстрый запуск']
      },
      'win_appx': {
        systems: ['Windows 10', 'Windows 11'],
        requirements: 'Microsoft Store, 4GB RAM',
        installation: 'Установка через Microsoft Store',
        features: ['Автообновления', 'Безопасная песочница', 'Интеграция с системой']
      },
      'macos_arm64': {
        systems: ['macOS Big Sur', 'macOS Monterey', 'macOS Ventura'],
        requirements: 'Apple Silicon (M1/M2/M3), 4GB RAM',
        installation: 'Откройте DMG и перетащите в Applications',
        features: ['Оптимизация для Apple Silicon', 'Энергоэффективность', 'Нативная производительность']
      },
      'macos_intel': {
        systems: ['macOS Catalina', 'macOS Big Sur', 'macOS Monterey'],
        requirements: 'Intel процессор, 4GB RAM',
        installation: 'Откройте DMG и перетащите в Applications',
        features: ['Совместимость с Intel Mac', 'Стабильная работа', 'Проверенная версия']
      },
      'linux_appimage': {
        systems: ['Ubuntu', 'Fedora', 'Debian', 'Arch Linux'],
        requirements: 'Linux kernel 3.2+, 2GB RAM',
        installation: 'chmod +x файл.AppImage и запустите',
        features: ['Универсальная совместимость', 'Не требует установки', 'Портативность']
      },
      'linux_deb': {
        systems: ['Ubuntu', 'Debian', 'Linux Mint'],
        requirements: 'Debian-based система, 2GB RAM',
        installation: 'sudo dpkg -i файл.deb',
        features: ['Системная интеграция', 'Управление зависимостями', 'Автоматические обновления']
      },
      'linux_rpm': {
        systems: ['Fedora', 'RHEL', 'CentOS', 'openSUSE'],
        requirements: 'RPM-based система, 2GB RAM',
        installation: 'sudo rpm -i файл.rpm',
        features: ['Red Hat совместимость', 'Системная интеграция', 'Стабильность Enterprise']
      }
    };

    return compatibility[id as keyof typeof compatibility] || {
      systems: ['Универсальная совместимость'],
      requirements: 'Минимальные системные требования',
      installation: 'Следуйте инструкциям установки',
      features: ['Стандартная функциональность']
    };
  };

  const info = getCompatibilityInfo(packageInfo.id);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-3xl border border-white/20 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl">
                  {packageInfo.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{packageInfo.title}</h2>
                  <p className="text-white/70">{packageInfo.subtitle}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Package info */}
            <div className="space-y-6">
              {/* Description */}
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  Описание пакета
                </h3>
                <p className="text-white/80 leading-relaxed">{packageInfo.description}</p>
              </div>

              {/* System compatibility */}
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-green-400" />
                  Совместимые системы
                </h3>
                <div className="flex flex-wrap gap-2">
                  {info.systems.map((system, index) => (
                    <Badge 
                      key={index} 
                      className="bg-green-500/20 text-green-300 border-green-500/30 px-3 py-1"
                    >
                      {system}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-purple-400" />
                  Системные требования
                </h3>
                <p className="text-white/80">{info.requirements}</p>
              </div>

              {/* Installation */}
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Download className="w-5 h-5 text-cyan-400" />
                  Инструкция по установке
                </h3>
                <p className="text-white/80 font-mono text-sm bg-black/30 p-3 rounded-lg border border-white/10">
                  {info.installation}
                </p>
              </div>

              {/* Features */}
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Особенности
                </h3>
                <div className="space-y-2">
                  {info.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package size */}
              {packageInfo.size && (
                <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Размер пакета</h3>
                      <p className="text-blue-300 text-2xl font-bold">{packageInfo.size}</p>
                    </div>
                    <div className="p-4 bg-blue-500/20 rounded-full">
                      <HardDrive className="w-8 h-8 text-blue-400" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Download button */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <Button
                onClick={() => {
                  if (packageInfo.onClick) {
                    packageInfo.onClick();
                  }
                  onClose();
                }}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                disabled={packageInfo.disabled}
              >
                <Download className="w-5 h-5 mr-2" />
                {packageInfo.isComingSoon ? 'Скоро появится' : 'Скачать сейчас'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
