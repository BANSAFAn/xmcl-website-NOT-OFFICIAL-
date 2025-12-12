import React, { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Download, Globe, Shield, Users, Package, Server, HardDrive, UserCheck, Link as LinkIcon, Code, Lock, Sparkles, Star, Gift, ChevronRight, Zap, ShieldCheck, Cpu, Database, Globe2, Layers, Heart } from 'lucide-react';
import { AppShell } from '@/components/AppShell';

interface Contributor {
  login: string;
  html_url: string;
  avatar_url: string;
}

const InformationContent: React.FC = () => {
  const { t } = useTranslation();
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [particles, setParticles] = useState<Array<{ left: number; top: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Генерируем частицы только на клиенте
    const generatedParticles = Array.from({ length: 50 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    }));
    setParticles(generatedParticles);
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/contributors')
      .then(response => response.json())
      .then(data => setContributors(data))
      .catch(err => console.error("Failed to fetch contributors:", err));
  }, []);

  // Example installation commands
  const wingetCommand = 'winget install CI010.XMinecraftLauncher';
  const brewCommand = 'brew install --cask --no-quarantine voxelum/xmcl';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated Background with Particles */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-20 animate-pulse"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 animate-pulse opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl opacity-50 animate-pulse"></div>
              <img
                src="https://github.com/Voxelum/x-minecraft-launcher/raw/master/xmcl-electron-app/icons/dark@256x256.png"
                alt="XMCL Logo"
                className="w-32 h-32 rounded-full border-4 border-white/30 shadow-2xl relative z-10 transform transition-all duration-500 hover:scale-110"
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl">
            {t('information.title')}
          </h1>
          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            {t('information.launcher_created_by')}{' '}
            <a
              href="https://github.com/ci010"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-bold underline decoration-2 decoration-blue-400 decoration-wavy"
            >
              CIO10
            </a>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="https://github.com/Voxelum/x-minecraft-launcher" target="_blank" rel="noopener noreferrer">
              <img src="https://github.com/Voxelum/x-minecraft-launcher/workflows/Build/badge.svg" alt="Build" className="rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
            </a>
            <a href="https://github.com/Voxelum/x-minecraft-launcher/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/npm/l/@xmcl/core.svg" alt="License" className="rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
            </a>
            <a href="https://conventionalcommits.org" target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Commit" className="rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
            </a>
            <a href="https://discord.gg/W5XVwYY7GQ" target="_blank" rel="noopener noreferrer">
              <img src="https://discord.com/api/guilds/405213567118213121/widget.png" alt="Discord" className="rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
            </a>
            <a href="https://kook.top/gqjSHh" target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/endpoint?url=https://api.xmcl.app/kook-badge" alt="Kook" className="rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
            </a>
          </div>

          <div className="flex justify-center gap-4">
            <a
              href="https://xmcl.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full font-bold text-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:rotate-1"
            >
              <Globe className="w-6 h-6" />
              <span>{t('footer.downloadXMCL')}</span>
              <ChevronRight className="w-5 h-5 animate-pulse" />
            </a>
          </div>
        </div>

        {/* Installation Section */}
        <section className="mb-16 p-8 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
            <Zap className="w-8 h-8 text-yellow-400" />
            <span>{t('downloadSection.title')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-slate-400/20 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:rotate-1 hover:shadow-xl">
              <h3 className="font-bold text-white mb-3 text-xl flex items-center gap-2">
                <Code className="w-6 h-6 text-blue-400" />
                Winget
              </h3>
              <p className="text-sm text-slate-300 mb-4">{t('information.install.winget_desc')}</p>
              <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm text-green-400 border border-slate-700/50 hover:border-slate-600 transition-all duration-300">
                <code>{wingetCommand}</code>
              </div>
            </div>
            <div className="p-6 border border-slate-400/20 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:rotate-1 hover:shadow-xl">
              <h3 className="font-bold text-white mb-3 text-xl flex items-center gap-2">
                <Cpu className="w-6 h-6 text-green-400" />
                Homebrew
              </h3>
              <p className="text-sm text-slate-300 mb-4">{t('information.install.brew_desc')}</p>
              <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm text-green-400 border border-slate-700/50 hover:border-slate-600 transition-all duration-300">
                <code>{brewCommand}</code>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <span>{t('information.features.title')}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Download, title: 'information.features.download_title', desc: 'information.features.download', color: 'text-blue-400' },
              { icon: HardDrive, title: 'information.features.manage_resources_title', desc: 'information.features.manage_resources', color: 'text-green-400' },
              { icon: Globe2, title: 'information.features.cross_platform_title', desc: 'information.features.cross_platform', color: 'text-purple-400' },
              { icon: Users, title: 'information.features.multi_account_title', desc: 'information.features.multi_account', color: 'text-yellow-400' },
              { icon: Server, title: 'information.features.p2p_title', desc: 'information.features.p2p', color: 'text-red-400' },
              { icon: ShieldCheck, title: 'information.features.code_sign_title', desc: 'information.features.code_sign', color: 'text-indigo-400' },
              { icon: Database, title: 'information.features.database_title', desc: 'information.features.database', color: 'text-pink-400' },
              { icon: Layers, title: 'information.features.plugins_title', desc: 'information.features.plugins', color: 'text-cyan-400' },
              { icon: Heart, title: 'information.features.community_title', desc: 'information.features.community', color: 'text-rose-400' }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 border border-slate-400/20 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:rotate-1 hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
                <h3 className="font-bold text-white mb-3 text-lg">{t(feature.title)}</h3>
                <p className="text-sm text-slate-300">{t(feature.desc)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sponsors Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
            <Shield className="w-8 h-8 text-indigo-400" />
            <span>{t('information.sponsors.title')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href="https://signpath.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 border border-slate-400/20 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src="https://github.com/DGP-Studio/Snap.Hutao/assets/10614984/73ae8b90-f3c7-4033-b2b7-f4126331ce66"
                alt="SignPath.io"
                className="w-24 h-24 mb-4 object-contain rounded-lg shadow-lg"
              />
              <h3 className="font-semibold text-white mb-2 text-lg">SignPath.io</h3>
              <p className="text-sm text-slate-300">{t('information.sponsors.signpath')}</p>
            </a>
            <a
              href="https://deno.com/deploy"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 border border-slate-400/20 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src="https://deno.com/images/deno_logo_4.gif"
                alt="Deno Deploy"
                className="w-24 h-24 mb-4 object-contain rounded-lg shadow-lg"
              />
              <h3 className="font-semibold text-white mb-2 text-lg">Deno Deploy</h3>
              <p className="text-sm text-slate-300">{t('information.sponsors.deno')}</p>
            </a>
            <a
              href="https://edgeone.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 border border-slate-400/20 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src="https://raw.githubusercontent.com/Voxelum/x-minecraft-launcher/master/assets/EdgeOne.png"
                alt="Tencent EdgeOne"
                className="w-24 h-24 mb-4 object-contain rounded-lg shadow-lg"
              />
              <h3 className="font-semibold text-white mb-2 text-lg">Tencent EdgeOne</h3>
              <p className="text-sm text-slate-300">{t('information.sponsors.tencent')}</p>
            </a>
          </div>

          {/* Afdian Sponsors */}
          <div className="mt-8 p-6 border border-slate-400/20 rounded-2xl bg-white/5">
            <h3 className="font-bold text-white mb-6 flex items-center gap-3 text-xl">
              <Gift className="w-6 h-6 text-pink-400" />
              <span>Afdian Sponsors</span>
            </h3>
            <div className="flex flex-wrap gap-6 justify-center">
              {[
                { title: '爱发电用户_9d663: ￥390.00', url: 'https://afdian.com/u/9d663ec6fb6711ec9ace52540025c377' },
                { title: '爱发电用户_19e29: ￥300.00', url: 'https://afdian.com/u/19e292c21a1d11ee929a52540025c377' },
                { title: 'ahdg: ￥180.00', url: 'https://afdian.com/u/dd9058ce20df11eba5c052540025c377' },
                { title: 'Kandk: ￥30.00', url: 'https://afdian.com/u/404b86a078e111ecab3652540025c377' },
                { title: '白雨 楠: ￥30.00', url: 'https://afdian.com/u/7f6ad7161b3e11eb8d0e52540025c377' }
              ].map((sponsor, index) => (
                <a
                  key={index}
                  title={sponsor.title}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-all duration-300 transform hover:scale-110"
                >
                  <img
                    width="70"
                    height="70"
                    style={{ borderRadius: '100%' }}
                    src={`https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/`}
                    alt="Afdian Sponsor"
                    className="shadow-lg hover:shadow-xl transition-shadow"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Credit Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
            <Star className="w-8 h-8 text-yellow-400" />
            <span>{t('information.credit.title')}</span>
          </h2>
          <ul className="list-disc list-inside space-y-3 mb-8 text-slate-200 text-lg max-w-3xl mx-auto">
            <li className="transform transition-all duration-500 hover:text-white hover:translate-x-2">BANER - {t('information.credit.baner')}</li>
            <li className="transform transition-all duration-500 hover:text-white hover:translate-x-2">GodLeaveMe, v1mkss - {t('information.credit.godleaveme')}</li>
            <li className="transform transition-all duration-500 hover:text-white hover:translate-x-2">0xc0000142 - {t('information.credit.0xc0000142')}</li>
            <li className="transform transition-all duration-500 hover:text-white hover:translate-x-2">Marmur2020 & BANSAFAn - {t('information.credit.marmur2020')}</li>
            <li className="transform transition-all duration-500 hover:text-white hover:translate-x-2">vanja-san - {t('information.credit.vanja-san')}</li>
            <li className="transform transition-all duration-500 hover:text-white hover:translate-x-2">lukechu10 & HoldYourWaffle - {t('information.credit.lukechu10')}</li>
            <li className="transform transition-all duration-500 hover:text-white hover:translate-x-2">laolarou726 - {t('information.credit.laolarou726')}</li>
            <li className="transform transition-all duration-500 hover:text-white hover:translate-x-2">{t('information.credit.special_thanks')}: Yricky, Jin, LG, Phoebe, Sumeng Wang, Luca, Charles Tang</li>
          </ul>
        </section>

        {/* Contributors Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
            <Users className="w-8 h-8 text-cyan-400" />
            <span>{t('information.contributors.title')}</span>
          </h2>
          {contributors.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {contributors.map((contributor, index) => (
                <div
                  key={contributor.login}
                  className="text-center transform transition-all duration-500 hover:scale-110 hover:rotate-3"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <a
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center hover:opacity-80 transition-opacity"
                  >
                    <div className="relative mb-3">
                      <img
                        src={contributor.avatar_url}
                        alt={contributor.login}
                        className="w-20 h-20 rounded-full border-2 border-transparent hover:border-cyan-400 transition-all duration-300 shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <span className="font-medium text-slate-200 text-sm">{contributor.login}</span>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 dark:text-slate-400 text-center">{t('ui.loading')}...</p>
          )}
        </section>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default function Information() {
  return (
    <AppShell>
      <InformationContent />
    </AppShell>
  );
}
