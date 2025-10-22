import React, { useEffect, useRef, useState } from "react";

interface Props {
  code: string;
}

const MermaidDiagram: React.FC<Props> = ({ code }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code || !ref.current) return;

    const renderMermaid = async () => {
      try {
        const mermaidModule = await import("mermaid");
        const mermaid = mermaidModule.default;
        // mermaid.initialize({ startOnLoad: false, theme: "default" });

        const { svg: renderedSvg } = await mermaid.render(
          `mermaid-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
          code,
        );
        setSvg(renderedSvg);
        setError(null);
      } catch (err: any) {
        console.error("Mermaid rendering error:", err);
        setError(err.message || "Mermaid render error");
      }
    };

    renderMermaid();
  }, [code]);

  if (error) {
    return (
      <div className="mermaid-diagram my-6 overflow-x-auto rounded-xl bg-red-100 p-4 text-red-700">
        <p>
          <strong>Mermaid render error:</strong> {error}
        </p>
        <pre className="text-xs mt-2 bg-red-200 p-2 rounded">{code}</pre>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="mermaid-diagram my-6 overflow-x-auto rounded-xl bg-slate-900 p-4"
      dangerouslySetInnerHTML={{ __html: svg || "" }}
    />
  );
};

export default MermaidDiagram;
