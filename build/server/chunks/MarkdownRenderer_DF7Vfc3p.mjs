import { jsxs, jsx } from 'react/jsx-runtime';
import React__default, { useRef, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { Prism } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism/index.js';
/* empty css                        */

const MermaidDiagram = ({ code }) => {
  const ref = useRef(null);
  const svgRef = useRef(null);
  const [svg, setSvg] = useState(null);
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!code || !ref.current) return;
    const renderMermaid = async () => {
      try {
        const mermaidModule = await import('mermaid');
        const mermaid = mermaidModule.default;
        const { svg: renderedSvg } = await mermaid.render(
          `mermaid-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
          code
        );
        setSvg(renderedSvg);
        setError(null);
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        setError(err.message || "Mermaid render error");
      }
    };
    renderMermaid();
  }, [code]);
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => Math.min(Math.max(0.5, prev + delta), 3));
  };
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));
  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };
  if (error) {
    return /* @__PURE__ */ jsxs("div", { className: "mermaid-diagram my-6 overflow-x-auto rounded-xl bg-red-100 p-4 text-red-700", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Mermaid render error:" }),
        " ",
        error
      ] }),
      /* @__PURE__ */ jsx("pre", { className: "text-xs mt-2 bg-red-200 p-2 rounded", children: code })
    ] });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: "mermaid-diagram my-6 overflow-hidden rounded-xl bg-slate-900 p-4 relative",
      onWheel: handleWheel,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: svgRef,
            className: "cursor-move",
            onMouseDown: handleMouseDown,
            style: {
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              transformOrigin: "0 0",
              transition: isDragging ? "none" : "transform 0.1s ease"
            },
            dangerouslySetInnerHTML: { __html: svg || "" }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "absolute top-2 left-2 flex flex-col gap-2 z-10", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: zoomIn,
              className: "bg-slate-700 hover:bg-slate-600 text-white p-1.5 rounded text-xs font-bold transition",
              "aria-label": "Збільшити",
              children: "+"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: zoomOut,
              className: "bg-slate-700 hover:bg-slate-600 text-white p-1.5 rounded text-xs font-bold transition",
              "aria-label": "Зменшити",
              children: "-"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: resetView,
              className: "bg-slate-700 hover:bg-slate-600 text-white p-1.5 rounded text-xs transition",
              "aria-label": "Скинути до початкового вигляду",
              children: "↻"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded", children: [
          "Scale: ",
          (scale * 100).toFixed(0),
          "%"
        ] })
      ]
    }
  );
};

const components = {
  h1: ({ children, ...props }) => /* @__PURE__ */ jsx(
    "h1",
    {
      className: "mb-6 mt-10 text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight",
      ...props,
      children
    }
  ),
  h2: ({ children, ...props }) => /* @__PURE__ */ jsx(
    "h2",
    {
      className: "mb-5 mt-10 text-3xl font-bold text-slate-900 dark:text-white border-b-2 border-gradient-to-r from-blue-500 to-purple-500 pb-3 border-blue-500/30",
      ...props,
      children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" }),
        children
      ] })
    }
  ),
  h3: ({ children, ...props }) => /* @__PURE__ */ jsx(
    "h3",
    {
      className: "mb-4 mt-8 text-2xl font-bold text-slate-800 dark:text-slate-100",
      ...props,
      children
    }
  ),
  h4: ({ children, ...props }) => /* @__PURE__ */ jsx(
    "h4",
    {
      className: "mb-3 mt-6 text-xl font-semibold text-slate-800 dark:text-slate-200",
      ...props,
      children
    }
  ),
  h5: ({ children, ...props }) => /* @__PURE__ */ jsx(
    "h5",
    {
      className: "mb-3 mt-5 text-lg font-semibold text-slate-700 dark:text-slate-300",
      ...props,
      children
    }
  ),
  h6: ({ children, ...props }) => /* @__PURE__ */ jsx(
    "h6",
    {
      className: "mb-2 mt-4 text-base font-semibold text-slate-700 dark:text-slate-300",
      ...props,
      children
    }
  ),
  // Use div instead of p to avoid nesting issues
  p: ({ children, node, ...props }) => {
    const hasBlockElement = React__default.Children.toArray(children).some((child) => {
      if (React__default.isValidElement(child)) {
        const type = child.type;
        if (typeof type === "string") {
          return ["img", "div", "figure", "table", "video", "blockquote", "pre", "hr", "ul", "ol"].includes(type);
        }
        if (typeof type === "function") {
          const name = type.displayName || type.name || "";
          return ["img", "ClickableImage", "code", "video"].includes(name);
        }
      }
      return false;
    });
    const hasBlockInNode = node?.children?.some(
      (child) => child.tagName === "img" || child.type === "image" || child.tagName === "code" || child.tagName === "pre"
    );
    if (hasBlockElement || hasBlockInNode) {
      return /* @__PURE__ */ jsx("div", { className: "mb-4", children });
    }
    return /* @__PURE__ */ jsx(
      "p",
      {
        className: "mb-5 text-lg leading-relaxed text-slate-700 dark:text-slate-300",
        ...props,
        children
      }
    );
  },
  a: ({ children, href, ...props }) => /* @__PURE__ */ jsxs(
    "a",
    {
      href,
      className: "inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-500/40 underline-offset-2 hover:decoration-blue-500 transition-all duration-200",
      target: "_blank",
      rel: "noopener noreferrer",
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 opacity-60", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) })
      ]
    }
  ),
  ul: ({ children, ...props }) => /* @__PURE__ */ jsx(
    "ul",
    {
      className: "mb-6 ml-2 space-y-3 text-slate-700 dark:text-slate-300",
      ...props,
      children
    }
  ),
  ol: ({ children, ...props }) => /* @__PURE__ */ jsx(
    "ol",
    {
      className: "mb-6 ml-2 space-y-3 text-slate-700 dark:text-slate-300 list-none counter-reset-item",
      ...props,
      children
    }
  ),
  li: ({ children, ordered, index, ...props }) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-lg leading-relaxed", ...props, children: [
    /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" }),
    /* @__PURE__ */ jsx("span", { children })
  ] }),
  blockquote: ({ children, ...props }) => /* @__PURE__ */ jsxs(
    "blockquote",
    {
      className: "my-8 relative pl-6 py-4 pr-4 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent rounded-r-xl italic text-slate-700 dark:text-slate-300",
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute -left-3 -top-2 text-4xl text-blue-300 dark:text-blue-700 font-serif", children: '"' }),
        children
      ]
    }
  ),
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "text";
    const childrenStr = String(children).replace(/\n$/, "");
    const isBlock = match || String(children).includes("\n");
    if (language === "mermaid") {
      return /* @__PURE__ */ jsx(MermaidDiagram, { code: childrenStr });
    }
    if (!isBlock) {
      return /* @__PURE__ */ jsx(
        "code",
        {
          className: "px-2 py-0.5 rounded-md bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 text-pink-600 dark:text-pink-400 font-mono text-[0.9em] font-medium",
          ...props,
          children
        }
      );
    }
    return /* @__PURE__ */ jsxs("div", { className: "my-8 group shadow-2xl rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-blue-500" }),
          language
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5 bg-slate-800/50 p-1.5 rounded-full", children: [
          /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-red-500/80" }),
          /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-yellow-500/80" }),
          /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-green-500/80" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Prism,
        {
          style: vscDarkPlus,
          language,
          PreTag: "div",
          className: "!mt-0 !rounded-none text-sm !bg-[#1e1e1e]",
          showLineNumbers: true,
          customStyle: {
            margin: 0,
            padding: "1.5rem"
          },
          ...props,
          children: childrenStr
        }
      )
    ] });
  },
  table: ({ children, ...props }) => /* @__PURE__ */ jsx("div", { className: "my-8 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg", children: /* @__PURE__ */ jsx("table", { className: "w-full border-collapse text-left text-sm", ...props, children }) }),
  thead: ({ children, ...props }) => /* @__PURE__ */ jsx("thead", { className: "bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-850", ...props, children }),
  tbody: ({ children, ...props }) => /* @__PURE__ */ jsx(
    "tbody",
    {
      className: "divide-y divide-slate-200 dark:divide-slate-700",
      ...props,
      children
    }
  ),
  tr: ({ children, ...props }) => /* @__PURE__ */ jsx(
    "tr",
    {
      className: "transition-colors hover:bg-blue-50/50 dark:hover:bg-slate-800/50",
      ...props,
      children
    }
  ),
  th: ({ children, ...props }) => /* @__PURE__ */ jsx(
    "th",
    {
      className: "px-5 py-4 font-bold text-slate-900 dark:text-slate-100 uppercase text-xs tracking-wider",
      ...props,
      children
    }
  ),
  td: ({ children, ...props }) => /* @__PURE__ */ jsx("td", { className: "px-5 py-4 text-slate-700 dark:text-slate-300", ...props, children }),
  // Simple image component
  img: ({ src, alt, ...props }) => /* @__PURE__ */ jsxs("span", { className: "block my-8", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src,
        alt: alt || "",
        className: "mx-auto rounded-2xl shadow-xl max-w-full h-auto transition-transform hover:scale-[1.02] duration-300",
        loading: "lazy",
        ...props
      }
    ),
    alt && /* @__PURE__ */ jsx("span", { className: "block mt-3 text-center text-sm italic text-slate-500 dark:text-slate-400", children: alt })
  ] }),
  hr: ({ ...props }) => /* @__PURE__ */ jsxs("div", { className: "my-12 flex items-center justify-center gap-3", children: [
    /* @__PURE__ */ jsx("span", { className: "flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600" }),
    /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "✦" }),
    /* @__PURE__ */ jsx("span", { className: "flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600" })
  ] }),
  video: ({ src, ...props }) => /* @__PURE__ */ jsx("span", { className: "block my-8", children: /* @__PURE__ */ jsx(
    "video",
    {
      src,
      controls: true,
      className: "mx-auto w-full max-w-4xl rounded-2xl shadow-xl",
      ...props
    }
  ) }),
  strong: ({ children, ...props }) => /* @__PURE__ */ jsx("strong", { className: "font-bold text-slate-900 dark:text-white", ...props, children }),
  em: ({ children, ...props }) => /* @__PURE__ */ jsx("em", { className: "italic text-slate-700 dark:text-slate-300", ...props, children }),
  del: ({ children, ...props }) => /* @__PURE__ */ jsx("del", { className: "line-through text-slate-500 dark:text-slate-400 opacity-70", ...props, children }),
  // GitHub-style alerts
  div: ({ children, className, ...props }) => {
    if (className?.includes("markdown-alert")) {
      const alertType = className.includes("note") ? "note" : className.includes("tip") ? "tip" : className.includes("warning") ? "warning" : className.includes("caution") ? "caution" : className.includes("important") ? "important" : null;
      if (alertType) {
        const styles = {
          note: "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
          tip: "border-green-500 bg-green-50 dark:bg-green-900/20",
          warning: "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20",
          caution: "border-red-500 bg-red-50 dark:bg-red-900/20",
          important: "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
        };
        return /* @__PURE__ */ jsx("div", { className: `my-6 p-4 border-l-4 rounded-r-lg ${styles[alertType]}`, ...props, children });
      }
    }
    return /* @__PURE__ */ jsx("div", { className, ...props, children });
  }
};
const MarkdownRenderer = ({
  content = "",
  className = ""
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `prose prose-lg prose-slate max-w-none dark:prose-invert 
        prose-headings:scroll-mt-20
        prose-pre:p-0 prose-pre:bg-transparent
        ${className}`,
      children: /* @__PURE__ */ jsx(
        ReactMarkdown,
        {
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [rehypeKatex, rehypeRaw],
          components,
          children: content
        }
      )
    }
  );
};

export { MarkdownRenderer, MarkdownRenderer as default };
