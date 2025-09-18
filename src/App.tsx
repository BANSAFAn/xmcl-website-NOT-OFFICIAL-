
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { TranslationProvider } from '@/contexts/TranslationContext';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import Guide from "./pages/Guide";
import Changelog from "./pages/Changelog";
import Issues from "./pages/Issues";
import ModernChangelog from "./pages/ModernChangelog";
import ModernIssues from "./pages/ModernIssues";
import Testing from "./pages/Testing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  useTheme(); // Initialize theme on app startup
  
  return (
    <BrowserRouter>
      <TranslationProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <main className="pt-16 sm:pt-20">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<Blog />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/guide/:id" element={<Guide />} />
              <Route path="/changelog" element={<ModernChangelog />} />
              <Route path="/issues" element={<ModernIssues />} />
              <Route path="/testing" element={<Testing />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer onDownloadClick={() => {}} />
        </div>
      </TranslationProvider>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
