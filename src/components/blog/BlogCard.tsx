
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/utils/blogUtils';
import { Calendar, Image } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
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
          <Link to={`/blogs/${post.slug}`}>{post.title}</Link>
        </h3>
        
        <p className="text-white/70 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <Link 
          to={`/blogs/${post.slug}`}
          className="inline-flex items-center text-accent hover:text-accent/80 transition-colors duration-300"
        >
          Читать далее
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
