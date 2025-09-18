import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Book, FileText, AlertCircle, TestTube, FileWarning } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const MobileBottomNav = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { name: t('nav.home'), path: '/', icon: Home },
    { name: t('nav.blog'), path: '/blog', icon: Book },
    { name: t('nav.guide'), path: '/guide', icon: FileText },
    { name: t('nav.changelog'), path: '/changelog', icon: FileWarning },
    { name: t('nav.issues'), path: '/issues', icon: AlertCircle },
    { name: t('nav.testing'), path: '/testing', icon: TestTube }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 md:hidden flex justify-around py-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center p-2 ${
              isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'
            } hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;