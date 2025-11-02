import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Github, MessageCircle, Heart, Coffee, ExternalLink, Home, BookOpen,
  FileText, Bug, FlaskConical, Download, Globe, Code, Users, Zap, Shield, Gamepad2,
  Sparkles, Rocket, Star, Clock, AlertCircle
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
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [repoStatus, setRepoStatus] = useState<'active' | 'warning' | 'inactive'>('active');
  const [loading, setLoading] = useState(true);
  const [activeSponsor, setActiveSponsor] = useState<number | null>(null);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        // Fetch latest release
        const releaseResponse = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases/latest');
        if (releaseResponse.ok) {
          const releaseData = await releaseResponse.json();
          setLatestVersion(releaseData.tag_name);
        }

        // Fetch repository data for last update
        const repoResponse = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher');
        if (repoResponse.ok) {
          const repoData = await repoResponse.json();
          const lastUpdated = new Date(repoData.updated_at);
          setLastUpdate(lastUpdated);

          // Calculate status based on last update
          const now = new Date();
          const diffInDays = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24));

          if (diffInDays <= 30) {
            setRepoStatus('active');
          } else if (diffInDays <= 60) {
            setRepoStatus('warning');
          } else {
            setRepoStatus('inactive');
          }
        }
      } catch (error) {
        console.error('Error fetching repository data:', error);
        setRepoStatus('inactive');
      } finally {
        setLoading(false);
      }
    };

    fetchRepoData();
  }, []);

  const getStatusColor = () => {
    switch (repoStatus) {
      case 'active': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'inactive': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch (repoStatus) {
      case 'active': return <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>;
      case 'warning': return <AlertCircle className="w-3 h-3 text-yellow-500" />;
      case 'inactive': return <AlertCircle className="w-3 h-3 text-red-500" />;
      default: return <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>;
    }
  };

  const getStatusText = () => {
    if (!lastUpdate) return 'Unknown';

    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Updated today';
    if (diffInDays === 1) return 'Updated yesterday';
    if (diffInDays < 7) return `Updated ${diffInDays} days ago`;
    if (diffInDays < 30) return `Updated ${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 60) return `Updated ${Math.floor(diffInDays / 30)} month ago`;
    return `Updated ${Math.floor(diffInDays / 30)} months ago`;
  };

  const getUptimeStatus = () => {
    switch (repoStatus) {
      case 'active': return { color: 'text-green-500', text: 'Active Development', icon: Star };
      case 'warning': return { color: 'text-yellow-500', text: 'Slow Updates', icon: Clock };
      case 'inactive': return { color: 'text-red-500', text: 'Inactive', icon: AlertCircle };
      default: return { color: 'text-gray-500', text: 'Unknown', icon: Clock };
    }
  };

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

  const features = [
    { icon: Zap, label: 'Lightning Fast' },
    { icon: Shield, label: 'Secure' },
    { icon: Gamepad2, label: 'Optimized for Gaming' },
  ];

  // Get uptime status data once to use in JSX
  const uptimeStatus = getUptimeStatus();
  const StatusIcon = uptimeStatus.icon;

  return (
    <footer className="relative border-t border-border/30 bg-gradient-to-b from-background to-background/95 backdrop-blur-xl overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm overflow-hidden border border-border/30">
                  <img
                    src="/PhotoXMCL/logo.png"
                    alt="X Minecraft Launcher logo"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse border-2 border-background ${repoStatus === 'active' ? 'bg-green-500' : repoStatus === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  X Minecraft Launcher
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  {loading ? (
                    <span className="text-xs text-muted-foreground">Loading...</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {latestVersion ? `${latestVersion}` : 'v?.?.?'}
                    </span>
                  )}
                  <span className={`text-xs flex items-center gap-1 ${getStatusColor()}`}>
                    {getStatusIcon()}
                    {getStatusText()}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.p
              className="text-muted-foreground text-base max-w-md leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('modernCrossplatformDescription')}. {t('home.comprehensiveSolution')}.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <feature.icon className="w-3 h-3" />
                  {feature.label}
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button asChild size="lg" className="rounded-xl shadow-lg hover:shadow-xl transition-all group relative overflow-hidden">
                <Link to="/#download-section" onClick={onDownloadClick} aria-label={t('footer.downloadXMCL')}>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <Download className="w-5 h-5 mr-2 relative z-10 transition-transform group-hover:rotate-12" />
                  <span className="relative z-10">{t('footer.downloadXMCL')}</span>
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.open('https://github.com/voxelum/x-minecraft-launcher/releases', '_blank')} className="rounded-xl shadow-lg hover:shadow-xl transition-all">
                <Github className="w-5 h-5 mr-2" />
                {t('footer.viewReleases')}
              </Button>
            </motion.div>
          </div>

          {/* Quick Links Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              {t('footer.quickLinks')}
            </h3>
            <nav className="space-y-2">
              {quickLinks.map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 group py-2 px-3 rounded-lg hover:bg-primary/5"
                >
                  <div className="p-1.5 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <link.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Community Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              {t('footer.community')}
            </h3>
            <div className="space-y-2">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 group py-2 px-3 rounded-lg hover:bg-primary/5"
                >
                  <div className="p-1.5 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <social.icon className="w-4 h-4" />
                  </div>
                  <span>{social.label}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Sponsors Section */}
        <motion.div
          className="mt-16 pt-8 border-t border-border/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-6 text-center flex items-center justify-center gap-2">
            <Rocket className="w-5 h-5 text-primary" />
            Sponsored by
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {sponsors.map((sponsor, index) => (
              <motion.a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
                onMouseEnter={() => setActiveSponsor(index)}
                onMouseLeave={() => setActiveSponsor(null)}
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`w-20 h-20 rounded-xl bg-white/80 dark:bg-slate-800/80 flex items-center justify-center p-3 mb-2 transition-all ${activeSponsor === index ? 'shadow-xl scale-110' : 'shadow-md'}`}>
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
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{sponsor.name}</span>
                <span className="text-xs text-primary">{sponsor.role}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <Separator className="my-12 bg-border/30" />

        {/* Copyright Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
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
            <span className="flex items-center gap-1">
              {t('footer.madeWith')} <Heart className="w-3 h-3 text-red-500" /> {t('footer.openSource')}
            </span>
            <div className={`h-1.5 w-1.5 rounded-full ${repoStatus === 'active' ? 'bg-green-500' : repoStatus === 'warning' ? 'bg-yellow-500' : 'bg-red-500'} animate-pulse`}></div>
            <span className={`flex items-center gap-1 ${uptimeStatus.color}`}>
              <StatusIcon className="w-3 h-3" /> {uptimeStatus.text}
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
