
import { useTranslation } from "@/hooks/useTranslation";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Github, 
  Download, 
  Users, 
  Shield, 
  Zap, 
  Globe, 
  Package, 
  Heart,
  ExternalLink,
  Star,
  GitBranch,
  Coffee,
  MessageCircle,
  User,
  Award,
  Code,
  Monitor
} from "lucide-react";

const About = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: Download,
      title: t('about.downloadAuto'),
      description: t('about.downloadAutoDesc')
    },
    {
      icon: Zap,
      title: t('about.fastDownload'),
      description: t('about.fastDownloadDesc')
    },
    {
      icon: Globe,
      title: t('about.crossPlatform'),
      description: t('about.crossPlatformDesc')
    },
    {
      icon: Package,
      title: t('about.multipleInstances'),
      description: t('about.multipleInstancesDesc')
    },
    {
      icon: Shield,
      title: t('about.manageResources'),
      description: t('about.manageResourcesDesc')
    },
    {
      icon: Star,
      title: t('about.builtinSupport'),
      description: t('about.builtinSupportDesc')
    }
  ];

  const badges = [
    {
      name: "Build",
      url: "https://github.com/Voxelum/x-minecraft-launcher/workflows/Build/badge.svg",
      link: "https://github.com/Voxelum/x-minecraft-launcher"
    },
    {
      name: "License",
      url: "https://img.shields.io/npm/l/@xmcl/core.svg",
      link: "https://github.com/Voxelum/x-minecraft-launcher/blob/master/LICENSE"
    },
    {
      name: "Conventional Commits",
      url: "https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg",
      link: "https://conventionalcommits.org"
    }
  ];

  const sponsors = [
    {
      name: "SignPath",
      description: "Бесплатная подпись кода для Windows",
      logo: "https://signpath.io/assets/images/signpath-logo.svg",
      url: "https://signpath.io/"
    },
    {
      name: "Deno Deploy",
      description: "Платформа для serverless JavaScript приложений",
      logo: "https://deno.com/images/deno_logo_4.gif",
      url: "https://deno.com/deploy"
    },
    {
      name: "Tencent EdgeOne",
      description: "CDN ускорение и защита безопасности",
      logo: "/assets/EdgeOne.png",
      url: "https://edgeone.ai/"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20"></div>
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-20 right-32 w-64 h-64 bg-blue-300/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-48 h-48 bg-indigo-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-300/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative z-10">
        <Navigation />
        
        <div className="container mx-auto px-4 pt-24 pb-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <img 
                src="/GifXMCL/2.gif" 
                alt="XMCL Logo" 
                className="w-32 h-32 rounded-2xl shadow-2xl animate-float"
              />
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
              {t('about.pageTitle')}
            </h1>
            <p className="text-2xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
              {t('about.pageDescription')}
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {badges.map((badge, index) => (
              <a 
                key={index}
                href={badge.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-transform duration-200"
              >
                <img src={badge.url} alt={badge.name} className="h-6" />
              </a>
            ))}
          </div>

          {/* Creator Info */}
          <Card className="p-8 mb-16 glass-effect border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-8">
                {t('about.creatorTitle')}
              </h2>
              <div className="inline-flex items-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                <div className="relative">
                  <User className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {t('about.creatorName')}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 text-lg">
                    {t('about.creatorDescription')}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://github.com/ci010', '_blank')}
                    className="group bg-white/50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                    {t('about.githubProfile')}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Installation Methods */}
          <Card className="p-8 mb-16 glass-effect border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
              {t('about.installationTitle')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800/50 dark:to-blue-900/20 p-6 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <Monitor className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                    {t('about.windowsWinget')}
                  </h3>
                </div>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-lg overflow-x-auto">
                  winget install CI010.XMinecraftLauncher
                </div>
              </div>
              <div className="bg-gradient-to-r from-slate-50 to-purple-50 dark:from-slate-800/50 dark:to-purple-900/20 p-6 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <Monitor className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                    {t('about.macosHomebrew')}
                  </h3>
                </div>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-lg space-y-2 overflow-x-auto">
                  <div>brew tap voxelum/xmcl</div>
                  <div>brew install --cask --no-quarantine voxelum/xmcl</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-5xl font-bold text-slate-900 dark:text-slate-100 mb-12 text-center">
              {t('about.featuresTitle')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-8 glass-effect border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm group">
                  <div className="text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Key Features Highlight */}
          <Card className="p-12 mb-16 glass-effect border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
              {t('about.specialTitle')}
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-blue-400">
                  {t('about.technicalAdvantages')}
                </h3>
                <ul className="space-y-4 text-slate-600 dark:text-slate-400 text-lg">
                  <li className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    {t('about.multiAuth')}
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                    {t('about.p2p')}
                  </li>
                  <li className="flex items-start gap-3">
                    <Package className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                    {t('about.digitalSign')}
                  </li>
                  <li className="flex items-start gap-3">
                    <Globe className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                    {t('about.importExport')}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-purple-600 dark:text-purple-400">
                  {t('about.userExperience')}
                </h3>
                <ul className="space-y-4 text-slate-600 dark:text-slate-400 text-lg">
                  <li className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    {t('about.intuitiveUI')}
                  </li>
                  <li className="flex items-start gap-3">
                    <Download className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                    {t('about.autoUpdate')}
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                    {t('about.diskOpt')}
                  </li>
                  <li className="flex items-start gap-3">
                    <Heart className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                    {t('about.activeCommunity')}
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Sponsors */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-12 text-center">
              {t('about.sponsorsTitle')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {sponsors.map((sponsor, index) => (
                <Card key={index} className="p-8 glass-effect border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm group"
                      onClick={() => window.open(sponsor.url, '_blank')}>
                  <div className="text-center">
                    <div className="mb-6 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <img src={sponsor.logo} alt={sponsor.name} className="max-h-12 max-w-full" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">
                      {t(`about.${sponsor.name.toLowerCase()}`)}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {t(`about.${sponsor.name.toLowerCase()}Desc`)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Community and Support */}
          <Card className="p-12 glass-effect border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
              {t('about.communityTitle')}
            </h2>
            <div className="text-center space-y-8">
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                {t('about.communityDescription')}
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
                  onClick={() => window.open('https://github.com/voxelum/x-minecraft-launcher', '_blank')}
                >
                  <Github className="w-6 h-6 mr-3" />
                  {t('about.github')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300 bg-white/50 dark:bg-slate-800/50"
                  onClick={() => window.open('https://discord.gg/W5XVwYY7GQ', '_blank')}
                >
                  <MessageCircle className="w-6 h-6 mr-3" />
                  {t('about.discord')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300 bg-white/50 dark:bg-slate-800/50"
                  onClick={() => window.open('https://ko-fi.com/xmcl', '_blank')}
                >
                  <Coffee className="w-6 h-6 mr-3" />
                  {t('about.kofi')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300 bg-white/50 dark:bg-slate-800/50"
                  onClick={() => window.open('https://afdian.com/@ci010', '_blank')}
                >
                  <Heart className="w-6 h-6 mr-3" />
                  {t('about.afdian')}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
