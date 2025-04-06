
import { motion } from "framer-motion";
import { ExternalLink, Calendar, Tag } from "lucide-react";
import { MarkdownRender } from "@/components/markdown/MarkdownRender";
import { Release } from "./types";

interface ReleaseItemProps {
  release: Release;
  formatDate: (dateString: string) => string;
  viewOnGithubText: string;
  index: number;
}

export const ReleaseItem = ({ release, formatDate, viewOnGithubText, index }: ReleaseItemProps) => {
  return (
    <motion.div
      key={release.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-black/20 backdrop-blur-sm p-8 rounded-xl relative overflow-hidden border border-white/5 hover:border-accent/20 transition-colors"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60"></div>
      
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center">
          <Tag className="text-accent mr-3" />
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="text-accent">{release.tag_name}</span>
            {release.name && release.name !== release.tag_name && 
              <span className="ml-2 text-white/90">- {release.name}</span>
            }
          </h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center text-white/60 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(release.published_at)}</span>
          </div>
          
          <motion.a 
            href={release.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm px-3 py-1 bg-accent/10 hover:bg-accent/20 rounded-md transition-colors text-accent"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(56, 189, 248, 0.2)" }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink size={14} className="mr-1" />
            {viewOnGithubText}
          </motion.a>
        </div>
      </motion.div>
      
      <div className="changelog-content markdown-content">
        <style dangerouslySetInnerHTML={{ __html: `
          .markdown-content a {
            color: #38bdf8;
            text-decoration: none;
            font-weight: 500;
            padding: 0.125rem 0.25rem;
            margin: -0.125rem -0.25rem;
            border-radius: 0.25rem;
            transition: all 0.2s ease;
            position: relative;
            background: rgba(56, 189, 248, 0.1);
          }
          
          .markdown-content a:hover {
            color: #7dd3fc;
            background: rgba(56, 189, 248, 0.2);
            text-shadow: 0 0 8px rgba(56, 189, 248, 0.4);
          }
          
          .markdown-content a::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0.25rem;
            right: 0.25rem;
            height: 1px;
            background: currentColor;
            opacity: 0.4;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease;
          }
          
          .markdown-content a:hover::after {
            transform: scaleX(1);
          }
          
          .markdown-content h1, 
          .markdown-content h2, 
          .markdown-content h3, 
          .markdown-content h4 {
            color: #38bdf8;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
          }
          
          .markdown-content ul {
            list-style-type: disc;
            padding-left: 1.5rem;
            margin: 1rem 0;
          }
          
          .markdown-content li {
            margin-bottom: 0.5rem;
          }
          
          .markdown-content code {
            background: rgba(255, 255, 255, 0.1);
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-family: monospace;
            font-size: 0.9em;
          }
          
          .markdown-content pre {
            background: rgba(0, 0, 0, 0.3);
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin: 1rem 0;
          }
          
          .markdown-content pre code {
            background: transparent;
            padding: 0;
          }
        `}} />
        <MarkdownRender 
          content={release.body} 
          className="prose-a:text-accent prose-a:font-medium hover:prose-a:text-accent/80 prose-a:transition-colors prose-headings:text-accent prose-headings:transition-colors hover:prose-headings:text-accent/90"
        />
      </div>
    </motion.div>
  );
}
