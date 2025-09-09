import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, MessageCircle, Coffee, Heart, Github } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';

interface FooterProps {
  onDownloadClick: () => void;
}

export const Footer = ({ onDownloadClick }: FooterProps) => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: 'https://github.com/voxelum/x-minecraft-launcher', label: 'GitHub' },
    { icon: MessageCircle, href: 'https://discord.gg/W5XVwYY7GQ', label: 'Discord' },
    { icon: MessageCircle, href: 'https://kook.top/xxxxxx', label: 'Kook' },
    { icon: Heart, href: 'https://afdian.com/@ci010', label: 'Afdian' },
    { icon: Coffee, href: 'https://ko-fi.com/ci010', label: 'Ko-fi' },
  ];
  
  return (
    <footer className="relative py-20 mt-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20 dark:from-slate-950 dark:via-purple-950/30 dark:to-blue-950/30" />
      <motion.div 
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(600px circle at 20% 80%, hsl(var(--primary) / 0.15), transparent)',
            'radial-gradient(600px circle at 80% 20%, hsl(var(--primary) / 0.15), transparent)',
            'radial-gradient(600px circle at 40% 60%, hsl(var(--primary) / 0.15), transparent)',
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Social Links */}
          <motion.div 
            className="flex justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {socialLinks.map((social, index) => (
              <motion.div 
                key={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-12 h-12 p-0 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20"
                  onClick={() => window.open(social.href, '_blank')}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div 
            className="text-center pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-slate-400 text-sm">
              © {currentYear} X Minecraft Launcher. All rights reserved.
            </p>
            <motion.p 
              className="text-slate-500 text-xs mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {t('footer.madeWith')}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};