
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DownloadOption } from './types';

export function useDownloadActions() {
  const { toast } = useToast();
  const [showAllOptions, setShowAllOptions] = useState(false);
  
  const handleDownloadClick = useCallback((option: DownloadOption) => {
    if (option.isComingSoon) {
      if (option.title === "Linux Flatpak") {
        window.open(option.link, '_blank');
      } else {
        toast({
          title: "Coming Soon",
          description: "This download option is not yet available.",
          variant: "default"
        });
      }
    } else {
      window.open(option.link, '_blank');
      
      toast({
        title: "Download Started",
        description: `${option.title} is downloading now.`,
        variant: "default"
      });
    }
  }, [toast]);

  return {
    showAllOptions,
    setShowAllOptions,
    handleDownloadClick
  };
}
