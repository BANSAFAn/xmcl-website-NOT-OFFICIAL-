import React from 'react';
import { PageTransition } from '@/components/PageTransition';
import NewDownloadSection from '@/components/download/NewDownloadSection';

const Download = () => {
  return (
    <PageTransition>
      <NewDownloadSection />
    </PageTransition>
  );
};

export default Download;
