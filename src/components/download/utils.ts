
import { Monitor, Terminal, Package, Archive, Rocket, ExternalLink } from 'lucide-react';

export const getFilteredAssets = (assets: any[], osName: string) => {
  console.log('Filtering assets for OS:', osName, 'Assets:', assets);
  
  if (!assets || !Array.isArray(assets)) {
    console.log('No assets available');
    return [];
  }

  // Фильтруем SHA256 файлы, blockmap файлы и другие служебные файлы
  const filteredAssets = assets.filter((asset: any) => {
    const name = asset.name.toLowerCase();
    return !name.includes('sha256') && 
           !name.includes('blockmap') && 
           !name.includes('.sig') &&
           !name.includes('.txt') &&
           !name.includes('.yml') &&
           asset.size > 1024 * 1024;
  });

  if (osName === 'Windows') {
    const uniqueAssets: any[] = [];
    
    // Приоритет 64-битным версиям
    const exe64Asset = filteredAssets.find((a: any) => {
      const name = a.name.toLowerCase();
      return name.includes('.exe') && (name.includes('x64') || name.includes('win64') || !name.includes('win32'));
    });
    if (exe64Asset) uniqueAssets.push(exe64Asset);
    
    const appxAsset = filteredAssets.find((a: any) => {
      const name = a.name.toLowerCase();
      return name.includes('.appx');
    });
    if (appxAsset) uniqueAssets.push(appxAsset);
    
    // Приоритет zip64 версиям
    const zip64Asset = filteredAssets.find((a: any) => {
      const name = a.name.toLowerCase();
      return name.includes('.zip') && (name.includes('x64') || name.includes('win64') || !name.includes('win32'));
    });
    if (zip64Asset) uniqueAssets.push(zip64Asset);
    
    console.log('Windows assets found:', uniqueAssets.length);
    return uniqueAssets;
  } else if (osName === 'macOS') {
    const macAssets = filteredAssets.filter((asset: any) => {
      const name = asset.name.toLowerCase();
      const matches = name.includes('.dmg') || name.includes('.pkg');
      if (matches) console.log('Found macOS asset:', asset.name);
      return matches;
    }).slice(0, 2);
    
    console.log('macOS assets found:', macAssets.length);
    return macAssets;
  } else if (osName === 'Linux') {
    const targetTypes = ['rpm', 'deb', 'tar', 'appimage'];
    const uniqueAssets: any[] = [];
    
    targetTypes.forEach(type => {
      const asset = filteredAssets.find((a: any) => {
        const name = a.name.toLowerCase();
        const matches = name.includes(`.${type}`);
        if (matches) console.log(`Found ${type} asset:`, a.name);
        return matches;
      });
      if (asset) uniqueAssets.push(asset);
    });

    // Добавляем AUR и Flathub пакеты
    uniqueAssets.push({
      id: 'aur',
      name: 'AUR Package',
      browser_download_url: 'https://aur.archlinux.org/packages/xmcl-launcher',
      size: 0,
      download_count: 0,
      isExternal: true
    });

    uniqueAssets.push({
      id: 'flathub',
      name: 'Flathub',
      browser_download_url: 'https://flathub.org/apps/app.xmcl.voxelum',
      size: 0,
      download_count: 0,
      isExternal: true
    });
    
    console.log('Linux assets found:', uniqueAssets.length);
    return uniqueAssets;
  }
  return [];
};

export const getPackageInfo = (fileName: string, osName: string) => {
  const name = fileName.toLowerCase();
  
  if (osName === 'Windows') {
    if (name.includes('.exe')) return { type: 'App Installer', icon: Monitor, color: 'from-blue-500 to-cyan-500' };
    if (name.includes('.appx')) return { type: 'AppX Package', icon: Rocket, color: 'from-green-500 to-emerald-500' };
    if (name.includes('.zip')) return { type: 'Zip Archive', icon: Archive, color: 'from-orange-500 to-amber-500' };
  } else if (osName === 'macOS') {
    if (name.includes('.dmg')) return { type: 'DMG Package', icon: Package, color: 'from-blue-500 to-purple-500' };
    if (name.includes('.pkg')) return { type: 'PKG Installer', icon: Package, color: 'from-green-500 to-emerald-500' };
  } else if (osName === 'Linux') {
    if (name.includes('aur')) return { type: 'AUR Package', icon: ExternalLink, color: 'from-blue-500 to-indigo-500' };
    if (name.includes('flathub')) return { type: 'Flathub', icon: ExternalLink, color: 'from-purple-500 to-pink-500' };
    if (name.includes('.deb')) return { type: 'DEB Package', icon: Package, color: 'from-green-500 to-emerald-500' };
    if (name.includes('.rpm')) return { type: 'RPM Package', icon: Package, color: 'from-red-500 to-rose-500' };
    if (name.includes('.tar')) return { type: 'Tar Archive', icon: Archive, color: 'from-orange-500 to-amber-500' };
    if (name.includes('.appimage')) return { type: 'AppImage', icon: Rocket, color: 'from-purple-500 to-violet-500' };
  }
  
  return { type: 'Package', icon: Package, color: 'from-blue-500 to-purple-500' };
};
