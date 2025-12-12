import React, { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useQuery } from '@tanstack/react-query';
import { Download, Globe, Shield, Users, Package, Server, HardDrive, UserCheck, Code, Sparkles, Star, ChevronRight, Zap, ShieldCheck, Cpu, Database, Globe2, Layers, Heart, Github, ExternalLink, Copy, Check } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { motion } from 'framer-motion';

interface Contributor {
  login: string;
  html_url: string;
  avatar_url: string;
  contributions: number;
}

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
    </button>
  );
};

const InformationContent: React.FC = () => {
  const { t } = useTranslation();

  const { data: contributors = [] } = useQuery({
    queryKey: ['contributors'],
    queryFn: async () => {
      const res = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/contributors?per_page=20');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    staleTime: 10 * 60 * 1000,
  });

  const { data: repoStats } = useQuery({
    queryKey: ['repo-stats'],
    queryFn: async () => {
      const res = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    staleTime: 10 * 60 * 1000,
  });

  const wingetCommand = 'winget install CI010.XMinecraftLauncher';
  const brewCommand = 'brew install --cask --no-quarantine voxelum/xmcl';

  const features = [
    { icon: Download, title: 'Download & Auto Complete', desc: 'Support download Minecraft, Forge, Fabric, Quilt, OptiFine, JVM from official or third party mirrors.', gradient: 'from-blue-500 to-cyan-500' },
    { icon: HardDrive, title: 'Manage All Resources', desc: 'Use (hard/symbolic) links to install resources in instances, keep your disk usage optimal. No copies of mods everywhere!', gradient: 'from-green-500 to-emerald-500' },
    { icon: Globe2, title: 'Cross Platform', desc: 'The launcher is based on Electron, and supports Windows 10/11, MacOS, and Linux.', gradient: 'from-purple-500 to-pink-500' },
    { icon: Users, title: 'Multi-Account System', desc: 'Built-in Microsoft login and Mojang Yggdrasil API. It also has builtin support of ely.by and littleskin.cn.', gradient: 'from-amber-500 to-orange-500' },
    { icon: Server, title: 'Peer to Peer Connection', desc: 'You can play multiplayer over LAN even you are not in same physical LAN!', gradient: 'from-red-500 to-rose-500' },
    { icon: ShieldCheck, title: 'Code Sign & Modern Packaging', desc: 'Under Windows, you can use appx and appinstaller to install the app without SmartScreen errors!', gradient: 'from-indigo-500 to-violet-500' },
    { icon: Database, title: 'Instance Management', desc: 'Create unlimited game instances with different mod configurations and game versions.', gradient: 'from-pink-500 to-fuchsia-500' },
    { icon: Heart, title: 'Community Driven', desc: 'Open source project with active community contributions and support.', gradient: 'from-rose-500 to-pink-500' }
  ];

  const sponsors = [
    { name: 'SignPath', logo: 'https://avatars.githubusercontent.com/u/34448643', url: 'https://signpath.io/', desc: 'Free code signing on Windows' },
    { name: 'Netlify', logo: 'https://avatars.githubusercontent.com/u/7892489', url: 'https://netlify.com/', desc: 'Hosting & Deployment' },
    { name: 'Tencent EdgeOne', logo: 'https://edgeone.ai/logo.png', url: 'https://edgeone.ai/', desc: 'CDN Acceleration & Security Protection' },
  ];

  return (
    <>
      {/* SEO: JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "X Minecraft Launcher",
          "alternateName": "XMCL",
          "description": "A modern, open-source Minecraft launcher with resource management and multiplayer features",
          "applicationCategory": "GameApplication",
          "operatingSystem": "Windows, macOS, Linux",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "author": { "@type": "Person", "name": "CI010", "url": "https://github.com/ci010" },
          "downloadUrl": "https://xmcl.app",
          "softwareVersion": "latest"
        })
      }} />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-12 max-w-7xl relative z-10">
          {/* Hero Section */}
          <motion.header 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-50 scale-150" />
              <img
                src="https://github.com/Voxelum/x-minecraft-launcher/raw/master/xmcl-electron-app/icons/dark@256x256.png"
                alt="XMCL Logo"
                className="w-40 h-40 rounded-3xl shadow-2xl relative z-10 border-4 border-white/20"
              />
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              X Minecraft Launcher
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              {t('information.launcher_created_by')}{' '}
              <a href="https://github.com/ci010" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 font-semibold underline decoration-wavy">
                CI010
              </a>
            </p>

            {/* Stats Grid */}
            {repoStats && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-6 mb-10"
              >
                <div className="px-6 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <Star className="w-6 h-6 text-yellow-400" />
                    <span className="text-3xl font-bold text-white">{(repoStats.stargazers_count / 1000).toFixed(1)}K</span>
                  </div>
                  <div className="text-sm text-slate-400 mt-1">GitHub Stars</div>
                </div>
                <div className="px-6 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-indigo-400" />
                    <span className="text-3xl font-bold text-white">{contributors.length}+</span>
                  </div>
                  <div className="text-sm text-slate-400 mt-1">Contributors</div>
                </div>
                <div className="px-6 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <Code className="w-6 h-6 text-green-400" />
                    <span className="text-3xl font-bold text-white">{repoStats.forks_count}</span>
                  </div>
                  <div className="text-sm text-slate-400 mt-1">Forks</div>
                </div>
              </motion.div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://xmcl.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all shadow-2xl shadow-indigo-500/25 hover:scale-105"
              >
                <Globe className="w-6 h-6" />
                <span>{t('footer.downloadXMCL')}</span>
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Voxelum/x-minecraft-launcher"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
              >
                <Github className="w-6 h-6" />
                <span>GitHub</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </motion.header>

          {/* Installation Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
              <Zap className="w-8 h-8 text-yellow-400" />
              <span>{t('downloadSection.title')}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Winget */}
              <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xl">Winget</h3>
                    <p className="text-sm text-slate-400">{t('information.install.winget_desc')}</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-slate-900/70 p-4 rounded-xl font-mono text-sm text-green-400 border border-slate-700/50 pr-14 overflow-x-auto">
                    <code>{wingetCommand}</code>
                  </div>
                  <CopyButton text={wingetCommand} />
                </div>
              </div>
              
              {/* Homebrew */}
              <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xl">Homebrew</h3>
                    <p className="text-sm text-slate-400">{t('information.install.brew_desc')}</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-slate-900/70 p-4 rounded-xl font-mono text-sm text-green-400 border border-slate-700/50 pr-14 overflow-x-auto">
                    <code>{brewCommand}</code>
                  </div>
                  <CopyButton text={brewCommand} />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <span>{t('information.features.title')}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2 text-lg">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Contributors Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
              <Users className="w-8 h-8 text-indigo-400" />
              <span>{t('information.contributors.title')}</span>
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {contributors.map((contributor: Contributor) => (
                <a
                  key={contributor.login}
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  title={`${contributor.login} - ${contributor.contributions} contributions`}
                >
                  <img
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    className="w-full aspect-square rounded-2xl border-2 border-white/10 group-hover:border-indigo-500 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-indigo-500/20"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                    <span className="text-xs text-white font-medium truncate px-1">{contributor.login}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.section>

          {/* Sponsors Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
              <Shield className="w-8 h-8 text-green-400" />
              <span>{t('information.sponsors.title')}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sponsors.map((sponsor, index) => (
                <a
                  key={index}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all group"
                >
                  <img src={sponsor.logo} alt={sponsor.name} className="w-16 h-16 rounded-xl group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-bold text-white text-xl">{sponsor.name}</h3>
                    <p className="text-sm text-slate-400">{sponsor.desc}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-slate-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
};

export default function Information() {
  return (
    <AppShell>
      <InformationContent />
    </AppShell>
  );
}
