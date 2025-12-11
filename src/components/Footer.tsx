import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Github, MessageCircle, Heart, Coffee, ExternalLink, Home, BookOpen,
  FileText, Bug, Download, Users, Zap, Shield, Star, ArrowRight
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from '@/components/Link';
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

const AnimatedLink = ({
  icon: Icon,
  label,
  href,
  to,
  isExternal = false,
  delay = 0
}: {
  icon: any;
  label: string;
  href?: string;
  to?: string;
  isExternal?: boolean;
  delay?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <motion.div
      className="group relative overflow-hidden"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          backgroundSize: '200% 100%',
          backgroundPosition: isHovered ? '100% 0' : '0% 0',
        }}
      />

      <div className="relative flex items-center justify-between p-3 rounded-xl border border-border/30 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/5">
        <div className="flex items-center gap-3">
          <motion.div
            className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-4 h-4 text-primary" />
          </motion.div>

          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
            {label}
          </span>
        </div>

        {isExternal && (
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            animate={{ x: isHovered ? 3 : 0 }}
          >
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
          </motion.div>
        )}
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-purple-500"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </motion.div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <>{content}</>;
};

const LinksSection = ({ title, links, delay = 0 }: {
  title: string;
  links: any[];
  delay?: number;
}) => {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center gap-2">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-primary to-transparent flex-1"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
        />
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider px-3">
          {title}
        </h3>
        <motion.div
          className="h-px bg-gradient-to-r from-primary to-transparent flex-1"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
        />
      </div>

      <motion.div
        className="relative p-6 rounded-2xl bg-gradient-to-br from-background via-background/80 to-background/60 backdrop-blur-xl border border-border/20 shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.1 }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-50" />

        <div className="relative space-y-2">
          {links.map((link, index) => (
            <AnimatedLink
              key={link.label}
              icon={link.icon}
              label={link.label}
              href={link.href}
              to={link.to}
              isExternal={!!link.href}
              delay={delay + 0.1 + index * 0.1}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Footer = ({ onDownloadClick }: FooterProps) => {
  const { t } = useTranslation();
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const releaseResponse = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases/latest');
        if (releaseResponse.ok) {
          const releaseData = await releaseResponse.json();
          setLatestVersion(releaseData.tag_name);
        }
      } catch (error) {
        console.error('Error fetching repository data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoData();
  }, []);
// Слава Україні !!!!
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
  ];

  const features = [
    { icon: Zap, label: 'Lightning Fast' },
    { icon: Shield, label: 'Secure' },
  ];

  return (
    <footer className="relative border-t border-border/30 bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-4">
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20 shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/PhotoXMCL/logo.png"
                  alt="X Minecraft Launcher logo"
                  className="w-10 h-10 object-contain"
                />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  X Minecraft Launcher
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {loading ? 'Loading...' : (latestVersion ? `${latestVersion}` : 'v?.?.?')}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('modernCrossplatformDescription')}. {t('home.comprehensiveSolution')}.
            </p>

            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <feature.icon className="w-3 h-3" />
                  {feature.label}
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="sm" className="rounded-xl shadow-lg hover:shadow-xl transition-all group">
                <Link to="/#download-section" onClick={onDownloadClick}>
                  <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                  {t('footer.downloadXMCL')}
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl" onClick={() => window.open('https://github.com/voxelum/x-minecraft-launcher/releases', '_blank')}>
                <Github className="w-4 h-4 mr-2" />
                {t('footer.viewReleases')}
              </Button>
            </div>
          </motion.div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <LinksSection
              title={t('footer.quickLinks')}
              links={quickLinks}
              delay={0.2}
            />
            <LinksSection
              title={t('footer.community')}
              links={socialLinks}
              delay={0.4}
            />
          </div>
        </div>

        <motion.div
          className="mt-12 pt-8 border-t border-border/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-sm font-semibold text-foreground mb-6 text-center uppercase tracking-wider">
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
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="w-16 h-16 rounded-xl bg-white/80 dark:bg-slate-800/80 flex items-center justify-center p-2 mb-2 shadow-sm group-hover:shadow-lg transition-shadow">
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
                <span className="text-xs text-muted-foreground">{sponsor.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 pt-6 border-t border-border/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
            <div className="text-sm text-muted-foreground">
              <p>
                © {new Date().getFullYear()} X Minecraft Launcher. {t('footer.allRightsReserved')}.
              </p>
              <p className="mt-1">
                {t('footer.launcherBy')} <span className="font-medium text-primary">CIO10</span> • {t('footer.websiteBy')} <span className="font-medium text-primary">Baneronetwo</span>
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                {t('footer.madeWith')} <Heart className="w-3 h-3 text-red-500" /> {t('footer.openSource')}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
