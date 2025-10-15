import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BlogPost } from "@/utils/blogUtils";
import { Calendar, ArrowRight, User } from "lucide-react";
import { useLanguage } from "@/components/navbar/LanguageContext";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const { currentLanguage } = useLanguage();

  const formatDateForUrl = (date: string) => {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
      return post.slug;
    }

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");

    return `${year}/${month}/${post.slug}`;
  };

  const blogUrl = `/blogs/${formatDateForUrl(post.date)}`;

  const readMoreText = {
    en: "Read more",
    ru: "Читать далее",
    uk: "Читати далі",
    zh: "阅读更多",
  };

  return (
    <motion.article
      className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-500"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        <motion.div
          className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-sm border border-white/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          <span className="text-xs font-semibold text-white">
            {post.category}
          </span>
        </motion.div>
      </div>

      <div className="relative p-6 space-y-4">
        <div className="flex items-center justify-between text-sm text-white/60">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={14} />
            <span>{post.author}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
          <Link to={blogUrl} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        <motion.div
          className="pt-2"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            to={blogUrl}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors duration-300 group"
          >
            {readMoreText[currentLanguage as keyof typeof readMoreText] ||
              readMoreText.en}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </motion.div>
      </div>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </motion.article>
  );
}
