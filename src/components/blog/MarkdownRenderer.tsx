
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { 
  TipAlert, 
  ImportantAlert, 
  NoteAlert, 
  GoodNewsAlert 
} from '@/components/guide/GuideAlerts';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Process custom alerts in the content
  const processedContent = content
    .replace(/:::tip\s+([\s\S]*?):::/g, '<div class="tip-alert">$1</div>')
    .replace(/:::important\s+([\s\S]*?):::/g, '<div class="important-alert">$1</div>')
    .replace(/:::caution\s+([\s\S]*?):::/g, '<div class="caution-alert">$1</div>')
    .replace(/:::note\s+([\s\S]*?):::/g, '<div class="note-alert">$1</div>')
    .replace(/:::warning\s+([\s\S]*?):::/g, '<div class="important-alert">$1</div>');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="prose prose-invert prose-lg max-w-none"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // Add remarkGfm for tables support
        components={{
          // Custom rendering for markdown components
          h1: ({ node, ...props }) => <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl md:text-2xl font-bold mt-6 mb-3" {...props} />,
          p: ({ node, ...props }) => {
            // Check if this paragraph is a custom alert
            const children = props.children?.toString() || '';
            if (typeof children === 'string') {
              if (children.startsWith('<div class="tip-alert">') && children.endsWith('</div>')) {
                return <TipAlert>{children.slice(23, -6)}</TipAlert>;
              }
              if (children.startsWith('<div class="important-alert">') && children.endsWith('</div>')) {
                return <ImportantAlert>{children.slice(29, -6)}</ImportantAlert>;
              }
              if (children.startsWith('<div class="note-alert">') && children.endsWith('</div>')) {
                return <NoteAlert>{children.slice(24, -6)}</NoteAlert>;
              }
              if (children.startsWith('<div class="caution-alert">') && children.endsWith('</div>')) {
                return <ImportantAlert>{children.slice(27, -6)}</ImportantAlert>;
              }
            }
            return <p className="text-white/80 mb-4 leading-relaxed" {...props} />;
          },
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
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full divide-y divide-gray-700 border border-gray-700 rounded-lg" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-gray-800" {...props} />,
          tbody: ({ node, ...props }) => <tbody className="divide-y divide-gray-700" {...props} />,
          tr: ({ node, ...props }) => <tr className="hover:bg-gray-800/50 transition-colors" {...props} />,
          th: ({ node, ...props }) => <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider" {...props} />,
          td: ({ node, ...props }) => <td className="px-4 py-3 text-sm" {...props} />,
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
        {processedContent}
      </ReactMarkdown>
    </motion.div>
  );
}
