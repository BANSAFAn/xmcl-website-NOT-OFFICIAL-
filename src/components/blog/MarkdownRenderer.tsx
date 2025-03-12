
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="prose prose-invert prose-lg max-w-none"
    >
      <ReactMarkdown
        components={{
          // Custom rendering for markdown components
          h1: ({ node, ...props }) => <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl md:text-2xl font-bold mt-6 mb-3" {...props} />,
          p: ({ node, ...props }) => <p className="text-white/80 mb-4 leading-relaxed" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-white/80" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-white/80" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          a: ({ node, ...props }) => (
            <a 
              className="text-accent hover:text-accent/80 underline transition-colors" 
              target={props.href?.startsWith('http') ? '_blank' : undefined}
              rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props} 
            />
          ),
          code: ({ node, className, children, ...props }) => {
            // Check if this is an inline code block based on whether it has a className
            const isInline = !className;
            
            if (isInline) {
              return <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm" {...props}>{children}</code>;
            }
            
            return (
              <div className="bg-black/30 rounded-md p-4 my-4 overflow-x-auto">
                <code className="text-sm text-white/90 font-mono" {...props}>{children}</code>
              </div>
            );
          },
          pre: ({ node, ...props }) => <pre className="overflow-auto" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-accent/50 pl-4 italic text-white/70 my-4" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </motion.div>
  );
}
