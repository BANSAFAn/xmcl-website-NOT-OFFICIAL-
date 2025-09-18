import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, MessageCircle, Heart, Coffee, ExternalLink, Home, BookOpen, FileText, Bug, FlaskConical, Download } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';
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
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm overflow-hidden">
                <img 
                  src="/PhotoXMCL/logo.png" 
                  alt="XMCL Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                X Minecraft Launcher
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              {t('modernCrossplatformDescription')}. {t('home.comprehensiveSolution')}.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <Button asChild size="sm" className="w-full sm:w-auto">
                <Link to="/#download-section" onClick={onDownloadClick} aria-label={t('footer.downloadXMCL')}>
                  <Download className="w-4 h-4 mr-2" />
                  {t('footer.downloadXMCL')}
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.open('https://github.com/voxelum/x-minecraft-launcher/releases', '_blank')} className="w-full sm:w-auto">
                <Github className="w-4 h-4 mr-2" />
                {t('footer.viewReleases')}
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{t('footer.quickLinks')}</h3>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{t('footer.community')}</h3>
            <div className="space-y-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <social.icon className="w-4 h-4" />
                  <span>{social.label}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">
              © {currentYear} X Minecraft Launcher. {t('footer.allRightsReserved')}.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {t('footer.launcherBy')} <span className="font-medium text-primary">CIO10</span> • {t('footer.websiteBy')} <span className="font-medium text-primary">Baneronetwo</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {t('footer.madeWith')} ❤️ {t('footer.openSource')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};