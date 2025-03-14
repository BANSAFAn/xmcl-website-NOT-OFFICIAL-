
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/utils/blogUtils';
import { Calendar, Image } from 'lucide-react';
import { useLanguage } from '@/components/navbar/LanguageContext';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const { currentLanguage } = useLanguage();
  
  // Function to format date for URL if needed
  const formatDateForUrl = (date: string) => {
    const dateObj = new Date(date);
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      // For Russian date format or other formats, just use the slug directly
      return post.slug;
    }
    
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    
    return `${year}/${month}/${post.slug}`;
  };

  // Get URL-friendly date parts
  const blogUrl = `/blogs/${formatDateForUrl(post.date)}`;

  // Read more text translations
  const readMoreText = {
    en: "Read more",
    ru: "Читать далее",
    uk: "Читати далі",
    zh: "阅读更多"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card rounded-xl overflow-hidden hover:translate-y-[-5px] transition-all duration-300"
    >
      <div className="h-48 overflow-hidden relative group">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Image className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs py-1 px-3 rounded-full bg-accent/20 text-accent">
            {post.category}
          </span>
          <span className="text-white/60 text-sm flex items-center">
            <Calendar size={14} className="mr-1" />
            {post.date}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-3 hover:text-accent transition-colors duration-300">
          <Link to={blogUrl}>{post.title}</Link>
        </h3>
        
        <p className="text-white/70 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <Link 
          to={blogUrl}
          className="inline-flex items-center text-accent hover:text-accent/80 transition-colors duration-300"
        >
          {readMoreText[currentLanguage as keyof typeof readMoreText] || readMoreText.en}
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
