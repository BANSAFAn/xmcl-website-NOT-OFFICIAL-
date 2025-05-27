
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner";
import Index from '@/pages/Index';
import Guide from '@/pages/Guide';
import BlogPost from '@/pages/BlogPost';
import Blogs from '@/pages/Blogs';
import About from '@/pages/About';
import Privacy from '@/pages/Privacy';
import Contact from '@/pages/Contact';
import Testing from '@/pages/Testing';
import Issues from '@/pages/Issues';
import NotFound from '@/pages/NotFound';
import Changelogs from '@/pages/Changelogs';
import RSSFeed from '@/pages/RSSFeed';
import { OSProvider } from '@/context/OSContext';
import { LanguageProvider } from '@/components/navbar/LanguageContext';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <OSProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <div className="min-h-screen bg-minecraft-dark-blue">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="/blogs/:year/:month/:slug" element={<BlogPost />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/changelogs" element={<Changelogs />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/testing" element={<Testing />} />
                <Route path="/issues" element={<Issues />} />
                <Route path="/api/rss" element={<RSSFeed />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </QueryClientProvider>
      </LanguageProvider>
    </OSProvider>
  );
}

export default App;
