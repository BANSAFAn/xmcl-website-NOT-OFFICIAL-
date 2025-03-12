
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag, Image } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/Footer";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { getBlogPost, BlogPost as BlogPostType } from "@/utils/blogUtils";
import { useToast } from "@/hooks/use-toast";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        console.log(`Fetching blog post with slug: ${slug}`);
        const postData = await getBlogPost(slug);
        console.log("Received blog post data:", postData);
        setPost(postData);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        toast({
          title: "Ошибка загрузки статьи",
          description: "Не удалось загрузить статью блога. Пожалуйста, попробуйте еще раз.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <Link
              to="/blogs"
              className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Назад к блогам
            </Link>

            {isLoading ? (
              <div className="flex justify-center items-center h-60">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
              </div>
            ) : post ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Featured image */}
                  <div className="rounded-xl overflow-hidden mb-8 max-h-[400px] relative group">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-end justify-start p-6">
                      <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg max-w-md">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-white">{post.title}</h1>
                        <div className="flex flex-wrap items-center text-white/80 gap-4">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-2" />
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post header */}
                  <div className="mb-8">
                    <div className="flex flex-wrap items-center text-white/60 gap-4 mt-4">
                      <div className="flex items-center">
                        <User size={16} className="mr-2" />
                        <span>{post.author}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Tag size={16} className="mr-2" />
                        <span className="text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Post content */}
                  <MarkdownRenderer content={post.content} />
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-white/70 text-lg">Статья не найдена. Возможно, она была удалена или URL неверный.</p>
                <Link
                  to="/blogs"
                  className="inline-flex items-center text-accent hover:text-accent/80 mt-4 transition-colors"
                >
                  Вернуться к блогу
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
