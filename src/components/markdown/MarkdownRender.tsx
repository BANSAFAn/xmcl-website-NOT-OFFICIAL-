
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';
import { AlertCircle, AlertTriangle, CheckCircle, Info, AlertOctagon } from 'lucide-react';

interface MarkdownRenderProps {
  content: string;
  className?: string;
}

export const MarkdownRender = ({ content, className }: MarkdownRenderProps) => {
  return (
    <div className={cn("prose prose-invert max-w-none prose-headings:mb-3 prose-headings:mt-6 prose-p:my-3 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:bg-white/10 prose-code:p-1 prose-code:rounded-md prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg prose-hr:my-6 prose-hr:border-white/10", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-white/10 rounded-lg" {...props} />
            </div>
          ),
          thead: ({ ...props }) => (
            <thead className="bg-white/5" {...props} />
          ),
          tbody: ({ ...props }) => (
            <tbody className="divide-y divide-white/10" {...props} />
          ),
          tr: ({ ...props }) => (
            <tr className="border-b border-white/10 hover:bg-white/5" {...props} />
          ),
          th: ({ ...props }) => (
            <th className="py-3 px-4 text-left font-semibold text-white/90" {...props} />
          ),
          td: ({ ...props }) => (
            <td className="py-3 px-4" {...props} />
          ),
          // Custom blockquote handling for alert types
          blockquote: ({ node }) => {
            // Extract text content safely from the blockquote's children
            let textContent = '';
            
            // Safely traverse through the paragraph nodes in the blockquote
            if (node.children) {
              for (const child of node.children) {
                if (child.type === 'element' && child.tagName === 'p') {
                  // Get text from paragraph's text nodes
                  if (child.children) {
                    for (const textNode of child.children) {
                      if (textNode.type === 'text') {
                        textContent += textNode.value;
                      }
                    }
                  }
                }
              }
            }
            
            // Tip alert
            if (textContent.startsWith('TIP:') || textContent.startsWith('Tip:')) {
              return (
                <div className="my-4 p-4 bg-green-900/20 border-l-4 border-green-500 rounded-r-md">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-500">Tip</p>
                      <div>
                        {textContent.replace(/^TIP:\ |^Tip:\ /, '')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            
            // Warning alert
            if (textContent.startsWith('WARNING:') || textContent.startsWith('Warning:')) {
              return (
                <div className="my-4 p-4 bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-md">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-500">Warning</p>
                      <div>
                        {textContent.replace(/^WARNING:\ |^Warning:\ /, '')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            
            // Caution alert
            if (textContent.startsWith('CAUTION:') || textContent.startsWith('Caution:')) {
              return (
                <div className="my-4 p-4 bg-orange-900/20 border-l-4 border-orange-500 rounded-r-md">
                  <div className="flex items-start gap-3">
                    <AlertOctagon className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-orange-500">Caution</p>
                      <div>
                        {textContent.replace(/^CAUTION:\ |^Caution:\ /, '')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            
            // Important alert
            if (textContent.startsWith('IMPORTANT:') || textContent.startsWith('Important:')) {
              return (
                <div className="my-4 p-4 bg-red-900/20 border-l-4 border-red-500 rounded-r-md">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-500">Important</p>
                      <div>
                        {textContent.replace(/^IMPORTANT:\ |^Important:\ /, '')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            
            // Note alert
            if (textContent.startsWith('NOTE:') || textContent.startsWith('Note:')) {
              return (
                <div className="my-4 p-4 bg-blue-900/20 border-l-4 border-blue-500 rounded-r-md">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-500">Note</p>
                      <div>
                        {textContent.replace(/^NOTE:\ |^Note:\ /, '')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            
            // Default blockquote
            return (
              <blockquote className="border-l-4 border-accent pl-4 py-1 my-4 bg-black/20">
                {node.children?.map((child, i) => {
                  if (child.type === 'element') {
                    // Use the appropriate tag name from the node
                    const Component = child.tagName as keyof JSX.IntrinsicElements;
                    return <Component key={i}>{textContent}</Component>;
                  }
                  return null;
                })}
              </blockquote>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
