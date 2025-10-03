import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { motion } from 'framer-motion';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import remarkDirective from 'remark-directive';
import rehypeHighlight from 'rehype-highlight';
import { visit } from 'unist-util-visit';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Custom remark plugin to handle directives like :::warning, :::code-group
function myRemarkDirective() {
  return (tree: any) => {
    visit(tree, ['textDirective', 'leafDirective', 'containerDirective'], (node: any) => {
      const data = node.data || (node.data = {});
      const attributes = node.attributes || {};

      if (node.name === 'warning') {
        data.hName = 'warning';
        data.hProperties = { ...attributes };
      }

      if (node.name === 'code-group') {
        data.hName = 'code-group';
        data.hProperties = { ...attributes };

        // Add data-title to code blocks from meta [title]
        visit(node, 'code', (codeNode: any) => {
          if (codeNode.meta) {
            const match = codeNode.meta.match(/\\[(.+)\\]/);
            if (match) {
              const codeData = codeNode.data || (codeNode.data = {});
              codeData.hProperties = {
                ...codeData.hProperties,
                'data-title': match[1],
              };
            }
          }
        });
      }
    });
  };
}

export const MarkdownRenderer = ({ content, className = '' }: MarkdownRendererProps) => {
  return (
    <div
      className={`prose prose-lg max-w-none dark:prose-invert prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800 prose-blockquote:border-blue-500 prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkDirective, myRemarkDirective]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          div: ({ node, ...props }) => {
            // @ts-ignore
            const isWarning = props.children.some(child => child.props.node?.data?.hName === 'warning');
            // @ts-ignore
            const isCodeGroup = props.children.some(child => child.props.node?.data?.hName === 'code-group');

            if (isWarning) {
              return <div {...props} />;
            }

            if (isCodeGroup) {
              return <div {...props} />;
            }

            return <div {...props} />;
          },
          pre: ({ node, ...props }) => {
            return <pre {...props} />;
          },
          warning: ({ node, ...props }) => (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded" role="alert">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                <strong>Warning:</strong>
              </div>
              {props.children}
            </div>
          ),
          'code-group': ({ node, ...props }) => {
            const childArray = React.Children.toArray(props.children);
            return (
              <Tabs defaultValue="0" className="my-4">
                <TabsList className="flex border-b">
                  {childArray.map((child: any, index: number) => {
                    if (child.type === 'pre') {
                      const title = child.props.children?.props?.children?.props?.['data-title'] || 'Code';
                      return (
                        <TabsTrigger
                          key={index}
                          value={index.toString()}
                          className="px-4 py-2 -mb-px border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-500">
                          {title}
                        </TabsTrigger>
                      );
                    }
                    return null;
                  })}
                </TabsList>
                {childArray.map((child: any, index: number) => {
                  if (child.type === 'pre') {
                    return (
                      <TabsContent key={index} value={index.toString()} className="p-4 bg-slate-800 rounded-b-lg">
                        {child}
                      </TabsContent>
                    );
                  }
                  return null;
                })}
              </Tabs>
            );
          },
          a: ({ href, children }) => (
            <motion.a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium no-underline hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}>
              {children}
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          ),
          img: ({ src, alt }) => (
            <motion.img
              src={src}
              alt={alt}
              className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-slate-200 dark:border-slate-700"
              onClick={() => window.open(src, '_blank')}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          ),
          video: ({ src, ...videoProps }) => (
            <motion.video
              src={src}
              className="rounded-lg shadow-lg w-full border border-slate-200 dark:border-slate-700"
              controls
              whileHover={{ scale: 1.01 }}
              {...(videoProps as any)}
            />
          ),
          code: ({ node, className, children, ...props }: any) => {
            const isInline = !className?.includes('language-');
            if (isInline) {
              return (
                <motion.code
                  className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 px-3 py-1 rounded-md text-sm font-mono border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200"
                  whileHover={{ scale: 1.05 }}
                  {...props}>
                  {children}
                </motion.code>
              );
            }
            return (
              <div className="relative group">
                <motion.pre
                  className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 p-6 rounded-xl overflow-x-auto border border-slate-700 shadow-2xl"
                  whileHover={{ scale: 1.01 }}>
                  <code className="text-sm font-mono text-green-400" {...props}>
                    {children}
                  </code>
                </motion.pre>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                    {className?.replace('language-', '') || 'code'}
                  </div>
                </div>
              </div>
            );
          },
          h1: ({ children }) => (
            <motion.h1
              className="text-5xl font-bold mb-8 text-slate-900 dark:text-slate-100 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}>
              {children}
            </motion.h1>
          ),
          h2: ({ children }) => (
            <motion.h2
              className="text-4xl font-bold mb-6 text-slate-900 dark:text-slate-100 border-b-2 border-gradient-to-r from-blue-500 to-purple-500 pb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}>
              {children}
            </motion.h2>
          ),
          h3: ({ children }) => (
            <motion.h3
              className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}>
              <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded"></span>
              {children}
            </motion.h3>
          ),
          p: ({ children }) => (
            <motion.p
              className="text-lg leading-relaxed mb-6 text-slate-700 dark:text-slate-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              {children}
            </motion.p>
          ),
          blockquote: ({ children }) => (
            <motion.blockquote
              className="border-l-4 border-gradient-to-b from-blue-500 to-purple-500 pl-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-r-lg my-6"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}>
              {children}
            </motion.blockquote>
          ),
          ul: ({ children }) => (
            <motion.ul className="space-y-3 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              {children}
            </motion.ul>
          ),
          li: ({ children }) => (
            <motion.li
              className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ x: 5 }}>
              <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>{children}</span>
            </motion.li>
          ),
        }}>
        {content}
      </ReactMarkdown>
    </div>
  );
};