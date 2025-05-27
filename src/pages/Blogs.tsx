
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { RSSButton } from "@/components/blog/RSSButton";
import { getAllBlogPosts, BlogPost } from "@/utils/blogUtils";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Newspaper, Sparkles } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { blogTranslations } from "@/components/blog/translations";
import { useLanguage } from "@/components/navbar/LanguageContext";

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();
  
  const text = blogTranslations[currentLanguage as keyof typeof blogTranslations];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const posts = await getAllBlogPosts();
        setBlogPosts(posts);
        
        if (posts.length === 0) {
          toast({
            title: text.pageTitle,
            description: text.noBlogs,
            variant: "default",
          });
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError(text.loadingError);
        toast({
          title: text.error,
          description: text.loadingError,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [toast, text]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                className="p-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Newspaper size={32} className="text-blue-400" />
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {text.pageTitle}
              </h1>
            </div>
            
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              {text.subtitle}
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Sparkles size={16} />
                <span>Latest updates and insights from our team</span>
              </div>
              <RSSButton />
            </div>
          </motion.div>
        </div>
      </section>

      <main className="pb-20">
        <div className="container mx-auto px-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto mb-8"
            >
              <Alert variant="destructive" className="bg-red-500/10 border-red-500/30 backdrop-blur-sm">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{text.error}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-60">
              <motion.div
                className="relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500/20 border-b-purple-500 rounded-full animate-spin-reverse"></div>
              </motion.div>
            </div>
          ) : blogPosts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-7xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <BlogCard post={post} index={index} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <motion.div
                  className="p-6 rounded-3xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-white/10 mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Newspaper size={48} className="text-white/40 mx-auto mb-4" />
                  <p className="text-white/70 text-lg">{text.noBlogs}</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blogs;
