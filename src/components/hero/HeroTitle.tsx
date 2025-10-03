import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const HeroTitle: React.FC = () => {
  const { t } = useTranslation();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const title = t('home.heroTitle');

  useEffect(() => {
    const element = titleRef.current;
    if (!element) return;

    // Split text into spans
    const chars = title.split('');
    element.innerHTML = chars.map(char => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`).join('');

    const spans = element.querySelectorAll('span');
    spans.forEach(span => {
      span.dataset.original = span.innerText;
    });

    // Shuffle animation
    const shuffleCount = 3;
    const shuffleDuration = 0.6;

    gsap.fromTo(spans,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        onStart: () => {
          for (let i = 0; i < shuffleCount; i++) {
            gsap.to(spans, {
              duration: shuffleDuration / shuffleCount,
              innerText: () => String.fromCharCode(65 + Math.floor(Math.random() * 26)),
              stagger: 0.02,
              delay: i * (shuffleDuration / shuffleCount),
              onComplete: i === shuffleCount - 1 ? () => {
                spans.forEach(span => {
                  span.innerText = span.dataset.original || '';
                });
              } : undefined
            });
          }
        }
      }
    );
  }, [title]);

  return (
    <motion.h1
      ref={titleRef}
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-slate-900 dark:text-white leading-tight px-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.span 
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent inline-block"
      >
        {title} {/* This will be replaced by the effect */}
      </motion.span>
    </motion.h1>
  );
};

export { HeroTitle };