import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Github, MessageCircle, Heart, Coffee, ExternalLink, Home, BookOpen, 
  FileText, Bug, FlaskConical, Download, Globe, Code, Users, Zap, Shield, Gamepad2
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface FooterProps {
  onDownloadClick: () => void;
}

const sponsors = [
  { 
    name: 'SignPath', 
    role: 'Code Signing', 
    url: 'https://signpath.io',
    logo: 'PhotoXMCL/signpath.png'
  },
  { 
    name: 'Deno Deploy', 
    role: 'Serverless Platform', 
    url: 'https://deno.com/deploy',
    logo: 'PhotoXMCL/deno.gif'
  },
  { 
    name: 'Tencent EdgeOne', 
    role: 'CDN & Security', 
    url: 'https://edgeone.tencent.com',
    logo: 'PhotoXMCL/tencent.png'
  },
];

export const Footer = ({ onDownloadClick }: FooterProps) => {
  const { t } = useTranslation();
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestVersion = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases/latest');
        if (response.ok) {
          const data = await response.json();
          setLatestVersion(data.tag_name);
        }
      } catch (error) {
        console.error('Error fetching latest version:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestVersion();
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/voxelum/x-minecraft-launcher', label: 'GitHub' },
    { icon: MessageCircle, href: 'https://discord.gg/W5XVwYY7GQ', label: 'Discord' },
    { icon: Heart, href: 'https://afdian.com/@ci010', label: 'Afdian' },
    { icon: Coffee, href: 'https://ko-fi.com/ci010', label: 'Ko-fi' },
  ];

  const quickLinks = [
    { icon: Home, label: t('nav.home'), to: '/' },
    { icon: BookOpen, label: t('nav.guide'), to: '/guide' },
    { icon: FileText, label: t('nav.changelog'), to: '/changelog' },
    { icon: Bug, label: t('nav.issues'), to: '/issues' },
    { icon: FlaskConical, label: t('nav.testing'), to: '/testing' },
  ];
  
  return (
    <footer className="relative border-t border-border bg-background/80 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50/10 to-transparent dark:from-slate-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="sm:col-span-2 lg:col-span-2 space-y-6">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm overflow-hidden border border-border/30">
                <img 
                  src="/PhotoXMCL/logo.png" 
                  alt="X Minecraft Launcher logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  X Minecraft Launcher
                </span>
                <div className="flex items-center gap-1 mt-1">
                  <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse"></div>
                  {loading ? (
                    <span className="text-xs text-muted-foreground">Loading...</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {latestVersion ? `${latestVersion}` : 'v?.?.?'}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground ml-2">Online</span>
                </div>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-muted-foreground text-base max-w-md leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {t('modernCrossplatformDescription')}. {t('home.comprehensiveSolution')}.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Button asChild size="lg" className="rounded-xl shadow-md hover:shadow-lg transition-all group">
                <Link to="/#download-section" onClick={onDownloadClick} aria-label={t('footer.downloadXMCL')}>
                  <Download className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                  {t('footer.downloadXMCL')}
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.open('https://github.com/voxelum/x-minecraft-launcher/releases', '_blank')} className="rounded-xl shadow-md hover:shadow-lg transition-all">
                <Github className="w-5 h-5 mr-2" />
                {t('footer.viewReleases')}
              </Button>
            </motion.div>
          </div>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-foreground">{t('footer.quickLinks')}</h3>
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <Link 
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 group"
                >
                  <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <link.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-foreground">{t('footer.community')}</h3>
            <div className="space-y-3">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 group"
                >
                  <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <social.icon className="w-4 h-4" />
                  </div>
                  <span>{social.label}</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-16 pt-8 border-t border-border/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-6 text-center">Sponsored by</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {sponsors.map((sponsor, index) => (
              <motion.a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-20 h-20 rounded-lg bg-white/80 dark:bg-slate-800/80 flex items-center justify-center p-3 mb-2 group-hover:scale-110 transition-transform">
                  {sponsor.logo ? (
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name} 
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <span className="text-lg font-bold text-primary">{sponsor.name.charAt(0)}</span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground">{sponsor.name}</span>
                <span className="text-xs text-primary">{sponsor.role}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <Separator className="my-12 bg-border/50" />

        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <div className="text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} X Minecraft Launcher. {t('footer.allRightsReserved')}.
            </p>
            <p className="mt-1">
              {t('footer.launcherBy')} <span className="font-medium text-primary">CIO10</span> • {t('footer.websiteBy')} <span className="font-medium text-primary">Baneronetwo</span>
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{t('footer.madeWith')} ❤️ {t('footer.openSource')}</span>
            <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse"></div>
            <span>Uptime: 99.9%</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};