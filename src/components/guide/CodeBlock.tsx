import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export function CodeBlock({
  children,
  language = "javascript",
}: {
  children: string;
  language?: string;
}) {
  return (
    <div className="bg-gray-900 rounded-md p-4 my-4 overflow-x-auto">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        className="text-gray-200 text-sm"
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
