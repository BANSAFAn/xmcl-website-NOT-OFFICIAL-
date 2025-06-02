
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { I18nProvider } from '@/i18n/context';
import { LanguageProvider } from '@/components/navbar/LanguageContext';
import { OSProvider } from '@/context/OSContext';
import { ModernNavbar } from '@/components/navbar';
import { LoadingScreen } from '@/components/LoadingScreen';
import { OldWindowsWarning } from '@/components/OldWindowsWarning';
import { Footer } from '@/components/Footer';

// Pages
import Index from '@/pages/Index';
import Guide from '@/pages/Guide';
import About from '@/pages/About';
import Changelogs from '@/pages/Changelogs';
import Blogs from '@/pages/Blogs';
import BlogPost from '@/pages/BlogPost';
import Contact from '@/pages/Contact';
import Testing from '@/pages/Testing';
import Issues from '@/pages/Issues';
import Privacy from '@/pages/Privacy';
import NotFound from '@/pages/NotFound';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <LanguageProvider>
          <OSProvider>
            <TooltipProvider>
              <Router>
                <div className="min-h-screen bg-minecraft-dark-blue text-white overflow-x-hidden">
                  <LoadingScreen />
                  <ModernNavbar />
                  <main className="relative">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/guide" element={<Guide />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/changelogs" element={<Changelogs />} />
                      <Route path="/blogs" element={<Blogs />} />
                      <Route path="/blogs/:slug" element={<BlogPost />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/testing" element={<Testing />} />
                      <Route path="/issues" element={<Issues />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                  <OldWindowsWarning />
                </div>
              </Router>
            </TooltipProvider>
          </OSProvider>
        </LanguageProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
