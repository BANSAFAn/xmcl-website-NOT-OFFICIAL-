
import React, { useEffect } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import NewDownloadSection from '@/components/download/NewDownloadSection';
import { PageTransition } from '@/components/PageTransition';

const Index = () => {
  const handleDownloadClick = () => {
    // Scroll to download section
    const downloadSection = document.querySelector('#download-section');
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const scrollToHash = () => {
      if (window.location.hash) {
        const el = document.querySelector(window.location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    window.addEventListener('hashchange', scrollToHash);
    // Initial check on mount
    scrollToHash();
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen">
        <HeroSection onDownloadClick={handleDownloadClick} />
        <FeaturesSection />
        <div id="download-section">
          <NewDownloadSection />
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
