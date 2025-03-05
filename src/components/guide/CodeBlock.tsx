
import React from "react";

export function CodeBlock({ children }: { children: string }) {
  return (
    <div className="bg-gray-900 rounded-md p-4 my-4 overflow-x-auto">
      <pre className="text-gray-200 text-sm">
        <code>{children}</code>
      </pre>
    </div>
  );
}
