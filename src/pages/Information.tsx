import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Contributor {
  login: string;
  html_url: string;
  avatar_url: string;
}

const Information: React.FC = () => {
  const { t } = useTranslation();
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/contributors')
      .then(response => response.json())
      .then(data => setContributors(data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{t('information.title')}</h1>
      <p className="mb-8">
        {t('information.launcher_created_by')}{' '}
        <a href="https://github.com/ci010" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          CIO10
        </a>
      </p>

      <h2 className="text-2xl font-bold mb-4">{t('information.features.title')}</h2>
      <ul className="list-disc list-inside mb-8">
        <li>{t('information.features.download')}</li>
        <li>{t('information.features.fast_download')}</li>
        <li>{t('information.features.cross_platform')}</li>
        <li>{t('information.features.multi_instancing')}</li>
        <li>{t('information.features.manage_resources')}</li>
        <li>{t('information.features.curseforge_modrinth')}</li>
        <li>{t('information.features.import_export')}</li>
        <li>{t('information.features.multi_account')}</li>
        <li>{t('information.features.p2p')}</li>
        <li>{t('information.features.code_sign')}</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">{t('information.sponsors.title')}</h2>
      <ul className="list-disc list-inside mb-8">
        <li><a href="https://www.signpath.io" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">SignPath.io</a> - {t('information.sponsors.signpath')}</li>
        <li><a href="https://deno.com/deploy" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Deno Deploy</a> - {t('information.sponsors.deno')}</li>
        <li><a href="https://www.tencentcloud.com/products/edgeone" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Tencent EdgeOne</a> - {t('information.sponsors.tencent')}</li>
        <li><a href="https://afdian.net/@ci010" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">AFDIAN</a></li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">{t('information.credit.title')}</h2>
      <ul className="list-disc list-inside mb-8">
        <li>BANER - {t('information.credit.baner')}</li>
        <li>GodLeaveMe, v1mkss - {t('information.credit.godleaveme')}</li>
        <li>0xc0000142 - {t('information.credit.0xc0000142')}</li>
        <li>Marmur2020 & BANSAFAn - {t('information.credit.marmur2020')}</li>
        <li>vanja-san - {t('information.credit.vanja-san')}</li>
        <li>lukechu10 & HoldYourWaffle - {t('information.credit.lukechu10')}</li>
        <li>laolarou726 - {t('information.credit.laolarou726')}</li>
        <li>{t('information.credit.special_thanks')}: Yricky, Jin, LG, Phoebe, Sumeng Wang, Luca, Charles Tang</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">{t('information.contributors.title')}</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {contributors.map(contributor => (
          <li key={contributor.login} className="text-center">
            <a href={contributor.html_url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
              <img src={contributor.avatar_url} alt={contributor.login} className="w-24 h-24 rounded-full mb-2" />
              <span>{contributor.login}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Information;