import React, { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Download, Globe, Shield, Users, Package, Server, HardDrive, UserCheck, Link as LinkIcon, Code, Lock, Sparkles, Star, Gift } from 'lucide-react';
import { AppShell } from '@/components/AppShell';

interface Contributor {
  login: string;
  html_url: string;
  avatar_url: string;
}

const InformationContent: React.FC = () => {
  const { t } = useTranslation();
  const [contributors, setContributors] = useState<Contributor[]>([]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-pulse opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12 relative z-10">
          <div className="flex justify-center mb-4">
            <img
              src="https://github.com/Voxelum/x-minecraft-launcher/raw/master/xmcl-electron-app/icons/dark@256x256.png"
              alt="XMCL Logo"
              className="w-24 h-24 rounded-full border-4 border-white/20 shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">{t('information.title')}</h1>
          <p className="text-lg text-slate-200 mb-6">
            {t('information.launcher_created_by')}{' '}
            <a
              href="https://github.com/ci010"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-medium underline decoration-2 decoration-blue-400"
            >
              CIO10
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <a href="https://github.com/Voxelum/x-minecraft-launcher" target="_blank" rel="noopener noreferrer">
              <img src="https://github.com/Voxelum/x-minecraft-launcher/workflows/Build/badge.svg" alt="Build" className="rounded" />
            </a>
            <a href="https://github.com/Voxelum/x-minecraft-launcher/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/npm/l/@xmcl/core.svg" alt="License" className="rounded" />
            </a>
            <a href="https://conventionalcommits.org" target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Commit" className="rounded" />
            </a>
            <a href="https://discord.gg/W5XVwYY7GQ" target="_blank" rel="noopener noreferrer">
              <img src="https://discord.com/api/guilds/405213567118213121/widget.png" alt="Discord" className="rounded" />
            </a>
            <a href="https://kook.top/gqjSHh" target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/endpoint?url=https://api.xmcl.app/kook-badge" alt="Kook" className="rounded" />
            </a>
          </div>
          <div className="flex justify-center gap-4">
            <a
              href="https://xmcl.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <Globe className="w-6 h-6" />
              {t('footer.downloadXMCL')}
            </a>
          </div>
        </div>

        {/* Installation Section */}
        <section className="mb-12 p-6 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
            <Download className="w-6 h-6" />
            {t('downloadSection.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-slate-400/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
              <h3 className="font-semibold text-white mb-2">Winget</h3>
              <p className="text-sm text-slate-300 mb-2">{t('information.install.winget_desc')}</p>
              <div className="bg-slate-800 p-3 rounded-md font-mono text-sm text-green-400 border border-slate-600">
                {wingetCommand}
              </div>
            </div>
            <div className="p-4 border border-slate-400/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
              <h3 className="font-semibold text-white mb-2">Homebrew</h3>
              <p className="text-sm text-slate-300 mb-2">{t('information.install.brew_desc')}</p>
              <div className="bg-slate-800 p-3 rounded-md font-mono text-sm text-green-400 border border-slate-600">
                {brewCommand}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
            <Package className="w-6 h-6" />
            {t('information.features.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border border-slate-400/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Download className="w-10 h-10 text-blue-400 mb-3" />
              <h3 className="font-bold text-white mb-2">{t('information.features.download_title')}</h3>
              <p className="text-sm text-slate-300">{t('information.features.download')}</p>
            </div>
            <div className="p-6 border border-slate-400/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl">
              <HardDrive className="w-10 h-10 text-green-400 mb-3" />
              <h3 className="font-bold text-white mb-2">{t('information.features.manage_resources_title')}</h3>
              <p className="text-sm text-slate-300">{t('information.features.manage_resources')}</p>
            </div>
            <div className="p-6 border border-slate-400/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Globe className="w-10 h-10 text-purple-400 mb-3" />
              <h3 className="font-bold text-white mb-2">{t('information.features.cross_platform_title')}</h3>
              <p className="text-sm text-slate-300">{t('information.features.cross_platform')}</p>
            </div>
            <div className="p-6 border border-slate-400/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Users className="w-10 h-10 text-yellow-400 mb-3" />
              <h3 className="font-bold text-white mb-2">{t('information.features.multi_account_title')}</h3>
              <p className="text-sm text-slate-300">{t('information.features.multi_account')}</p>
            </div>
            <div className="p-6 border border-slate-400/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Server className="w-10 h-10 text-red-400 mb-3" />
              <h3 className="font-bold text-white mb-2">{t('information.features.p2p_title')}</h3>
              <p className="text-sm text-slate-300">{t('information.features.p2p')}</p>
            </div>
            <div className="p-6 border border-slate-400/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Lock className="w-10 h-10 text-indigo-400 mb-3" />
              <h3 className="font-bold text-white mb-2">{t('information.features.code_sign_title')}</h3>
              <p className="text-sm text-slate-300">{t('information.features.code_sign')}</p>
            </div>
          </div>
        </section>

        {/* Sponsors Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
            <Shield className="w-6 h-6" />
            {t('information.sponsors.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href="https://signpath.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 border border-slate-400/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <img
                src="https://github.com/DGP-Studio/Snap.Hutao/assets/10614984/73ae8b90-f3c7-4033-b2b7-f4126331ce66"
                alt="SignPath.io"
                className="w-20 h-20 mb-3 object-contain"
              />
              <h3 className="font-semibold text-white mb-1">SignPath.io</h3>
              <p className="text-sm text-slate-300">{t('information.sponsors.signpath')}</p>
            </a>
            <a
              href="https://deno.com/deploy"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 border border-slate-400/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <img
                src="https://deno.com/images/deno_logo_4.gif"
                alt="Deno Deploy"
                className="w-20 h-20 mb-3 object-contain"
              />
              <h3 className="font-semibold text-white mb-1">Deno Deploy</h3>
              <p className="text-sm text-slate-300">{t('information.sponsors.deno')}</p>
            </a>
            <a
              href="https://edgeone.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 border border-slate-400/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <img
                src="https://raw.githubusercontent.com/Voxelum/x-minecraft-launcher/master/assets/EdgeOne.png"
                alt="Tencent EdgeOne"
                className="w-20 h-20 mb-3 object-contain"
              />
              <h3 className="font-semibold text-white mb-1">Tencent EdgeOne</h3>
              <p className="text-sm text-slate-300">{t('information.sponsors.tencent')}</p>
            </a>
          </div>
          {/* Afdian Sponsors */}
          <div className="mt-8 p-6 border border-slate-400/20 rounded-xl bg-white/5">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Gift className="w-6 h-6" />
              Afdian Sponsors
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {/* You can dynamically generate these from an API or hardcode a few */}
              <a
                title="爱发电用户_9d663: ￥390.00"
                href="https://afdian.com/u/9d663ec6fb6711ec9ace52540025c377"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  width="70"
                  height="70"
                  style={{ borderRadius: '100%' }}
                  src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/"
                  alt="Afdian Sponsor"
                />
              </a>
              <a
                title="爱发电用户_19e29: ￥300.00"
                href="https://afdian.com/u/19e292c21a1d11ee929a52540025c377"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  width="70"
                  height="70"
                  style={{ borderRadius: '100%' }}
                  src="https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/"
                  alt="Afdian Sponsor"
                />
              </a>
              <a
                title="ahdg: ￥180.00"
                href="https://afdian.com/u/dd9058ce20df11eba5c052540025c377"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  width="70"
                  height="70"
                  style={{ borderRadius: '100%' }}
                  src="https://pic1.afdiancdn.com/user/dd9058ce20df11eba5c052540025c377/avatar/0c776e6de1b1027e951c6d94919eb781_w1280_h1024_s364.jpg"
                  alt="Afdian Sponsor"
                />
              </a>
              <a
                title="Kandk: ￥30.00"
                href="https://afdian.com/u/404b86a078e111ecab3652540025c377"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  width="50"
                  height="50"
                  style={{ borderRadius: '100%' }}
                  src="https://pic1.afdiancdn.com/user/404b86a078e111ecab3652540025c377/avatar/dfa3e35a696d8d8af5425dd400d68a8d_w607_h527_s432.png"
                  alt="Afdian Sponsor"
                />
              </a>
              <a
                title="白雨 楠: ￥30.00"
                href="https://afdian.com/u/7f6ad7161b3e11eb8d0e52540025c377"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  width="50"
                  height="50"
                  style={{ borderRadius: '100%' }}
                  src="https://pic1.afdiancdn.com/user/7f6ad7161b3e11eb8d0e52540025c377/avatar/1fa3b75648a15aea8da202c6108d659b_w1153_h1153_s319.jpeg"
                  alt="Afdian Sponsor"
                />
              </a>
            </div>
          </div>
        </section>

        {/* Credit Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
            <UserCheck className="w-6 h-6" />
            {t('information.credit.title')}
          </h2>
          <ul className="list-disc list-inside space-y-2 mb-6 text-slate-200">
            <li>BANER - {t('information.credit.baner')}</li>
            <li>GodLeaveMe, v1mkss - {t('information.credit.godleaveme')}</li>
            <li>0xc0000142 - {t('information.credit.0xc0000142')}</li>
            <li>Marmur2020 & BANSAFAn - {t('information.credit.marmur2020')}</li>
            <li>vanja-san - {t('information.credit.vanja-san')}</li>
            <li>lukechu10 & HoldYourWaffle - {t('information.credit.lukechu10')}</li>
            <li>laolarou726 - {t('information.credit.laolarou726')}</li>
            <li>{t('information.credit.special_thanks')}: Yricky, Jin, LG, Phoebe, Sumeng Wang, Luca, Charles Tang</li>
          </ul>
        </section>

        {/* Contributors Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
            <Users className="w-6 h-6" />
            {t('information.contributors.title')}
          </h2>
          {contributors.length > 0 ? (
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {contributors.map(contributor => (
                <li key={contributor.login} className="text-center">
                  <a
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      className="w-24 h-24 rounded-full mb-2 border-2 border-transparent hover:border-blue-500"
                    />
                    <span className="font-medium text-slate-200">{contributor.login}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 dark:text-slate-400">{t('ui.loading')}...</p>
          )}
        </section>
      </div>

      {/* CSS for animated background */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -40px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 40px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
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