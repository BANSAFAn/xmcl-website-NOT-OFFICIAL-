
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/Footer";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllBlogPosts, BlogPost } from "@/utils/blogUtils";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <BlogHeader 
            title={text.pageTitle}
            subtitle={text.subtitle}
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto mb-8"
            >
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{text.error}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-60">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {blogPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-white/70 text-lg">{text.noBlogs}</p>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blogs;
