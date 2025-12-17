import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { StaggeredMenu } from "@/components/StaggeredMenu";
import { Footer } from "@/components/Footer";
import { useOS } from '@/hooks/useOS';
import { MacOSDock } from '@/components/MacOSDock';

const queryClient = new QueryClient();

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * AppShell wrapper component that provides all necessary React contexts.
 * This component wraps the entire page content including header and footer.
 */
export function AppShell({ children }: AppShellProps) {
  const os = useOS();
  
  const handleDownloadClick = () => {
    window.location.href = '/download';
  };

  const isDesktopStyle = os === 'macos' || os === 'linux';

  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="min-h-screen bg-background text-foreground">
            <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
              <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {!isDesktopStyle && <StaggeredMenu />}
                {isDesktopStyle && <div />} {/* Spacer if menu is hidden */}
              </div>
            </header>
            
            <main className="pt-16">
              {children}
            </main>
            
            {isDesktopStyle && <MacOSDock />}

            <Footer onDownloadClick={handleDownloadClick} />
          </div>
        </TooltipProvider>
      </TranslationProvider>
    </QueryClientProvider>
  );
}

export default AppShell;
