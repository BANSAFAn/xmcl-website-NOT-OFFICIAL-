
import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const ScrambleText = ({ text, isActive }: { text: string; isActive: boolean }) => {
  const [displayText, setDisplayText] = useState('');
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    setIsScrambling(true);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(text.split('').map((char, index) => {
        if (index < iteration) {
          return text[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text, isActive]);

  return (
    <span className={`font-mono ${isScrambling ? 'text-blue-400' : 'text-white'}`}>
      {displayText}
    </span>
  );
};

export const LoadingScreen = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const titleTimer = setTimeout(() => setShowTitle(true), 800);
    const completeTimer = setTimeout(() => setIsComplete(true), 3000);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  if (isComplete) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className={`text-8xl font-bold mb-8 transition-all duration-1000 ${
          showTitle ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
        }`}>
          <ScrambleText text="XMCL" isActive={showTitle} />
        </div>
        
        <div className={`text-slate-400 text-lg transition-all duration-500 delay-1000 ${
          showTitle ? 'opacity-100' : 'opacity-0'
        }`}>
          {t('loading')}
        </div>
      </div>
    </div>
  );
};
