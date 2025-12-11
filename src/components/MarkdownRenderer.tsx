import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import MermaidDiagram from "./MermaidDiagram";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const components = {
  h1: ({ children, ...props }: any) => (
    <h1
      className="mb-6 mt-8 text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2
      className="mb-5 mt-8 text-4xl font-bold text-slate-900 dark:text-slate-100 border-b-2 border-blue-500/30 pb-2"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3
      className="mb-4 mt-6 text-3xl font-bold text-slate-800 dark:text-slate-200"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4
      className="mb-3 mt-5 text-2xl font-semibold text-slate-800 dark:text-slate-200"
      {...props}
    >
      {children}
    </h4>
  ),
  h5: ({ children, ...props }: any) => (
    <h5
      className="mb-3 mt-4 text-xl font-semibold text-slate-700 dark:text-slate-300"
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ children, ...props }: any) => (
    <h6
      className="mb-2 mt-3 text-lg font-semibold text-slate-700 dark:text-slate-300"
      {...props}
    >
      {children}
    </h6>
  ),
  p: ({ children, ...props }: any) => {
    // Проверяем, содержит ли children блочные элементы (img, div, table и т.д.)
    // Если да, не оборачиваем в <p>, а возвращаем их как есть
    const hasBlockElement = React.Children.toArray(children).some((child) => {
      if (React.isValidElement(child)) {
        const tag = child.type;
        return [
          "img",
          "div",
          "table",
          "video",
          "blockquote",
          "pre",
          "hr",
          "ul",
          "ol",
        ].includes(tag as string);
      }
      return false;
    });

    if (hasBlockElement) {
      return <>{children}</>;
    }

    return (
      <p
        className="mb-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300"
        {...props}
      >
        {children}
      </p>
    );
  },
  a: ({ children, href, ...props }: any) => (
    <a
      href={href}
      className="font-semibold text-blue-600 underline decoration-blue-500/30 underline-offset-2 transition-all hover:text-blue-700 hover:decoration-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }: any) => (
    <ul
      className="mb-4 ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol
      className="mb-4 ml-6 list-decimal space-y-2 text-slate-700 dark:text-slate-300"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="text-lg leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="my-6 border-l-4 border-blue-500 bg-blue-50 p-4 italic text-slate-700 dark:bg-blue-900/20 dark:text-slate-300"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "text";
    const childrenStr = String(children).replace(/\n$/, "");

    if (language === "mermaid") {
      return <MermaidDiagram code={childrenStr} />;
    }

    return !inline ? (
      <div className="my-6 overflow-hidden rounded-xl">
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          className="text-sm"
          showLineNumbers
          {...props}
        >
          {childrenStr}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code
        className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-sm text-slate-800 dark:bg-slate-700 dark:text-slate-200"
        {...props}
      >
        {children}
      </code>
    );
  },
  table: ({ children, ...props }: any) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
      <table className="w-full border-collapse text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: any) => (
    <thead className="bg-slate-100 dark:bg-slate-800" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: any) => (
    <tbody
      className="divide-y divide-slate-200 dark:divide-slate-700"
      {...props}
    >
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: any) => (
    <tr
      className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
      {...props}
    >
      {children}
    </tr>
  ),
  th: ({ children, ...props }: any) => (
    <th
      className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="px-4 py-3 text-slate-700 dark:text-slate-300" {...props}>
      {children}
    </td>
  ),
  img: ({ src, alt, ...props }: any) => (
    <figure className="my-8">
      <img
        src={src}
        alt={alt}
        className="mx-auto rounded-2xl shadow-2xl transition-transform hover:scale-105"
        loading="lazy"
        {...props}
      />
      {alt && (
        <figcaption className="mt-3 text-center text-sm italic text-slate-500 dark:text-slate-400">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  hr: ({ ...props }: any) => (
    <hr
      className="my-8 border-t-2 border-slate-200 dark:border-slate-700"
      {...props}
    />
  ),
  video: ({ src, ...props }: any) => (
    <figure className="my-8">
      <video
        src={src}
        controls
        className="mx-auto w-full max-w-4xl rounded-2xl shadow-2xl"
        {...props}
      />
    </figure>
  ),
  strong: ({ children, ...props }: any) => (
    <strong className="font-bold text-slate-900 dark:text-slate-100" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: any) => (
    <em className="italic text-slate-700 dark:text-slate-300" {...props}>
      {children}
    </em>
  ),
  del: ({ children, ...props }: any) => (
    <del className="line-through text-slate-500 dark:text-slate-400" {...props}>
      {children}
    </del>
  ),
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content = "",
  className = "",
}) => {
  return (
    <div
      className={`prose prose-lg prose-slate max-w-none dark:prose-invert ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw, rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
