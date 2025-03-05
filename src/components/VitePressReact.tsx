
import React from 'react';

// This component can be used inside VitePress
export const VitePressReact = () => {
  return (
    <div className="vitepress-react-component">
      <h2 className="text-2xl font-bold mb-4">React Component in VitePress</h2>
      <p className="mb-4">
        This is a React component that can be used in VitePress. To use React components in VitePress, follow these steps:
      </p>
      <div className="bg-minecraft-darker-blue p-4 rounded-md mb-4">
        <ol className="list-decimal list-inside space-y-2">
          <li>Install necessary dependencies: <code>@vitejs/plugin-react</code></li>
          <li>Configure VitePress to use React in <code>vite.config.js</code></li>
          <li>Create your React components</li>
          <li>Import and use them in VitePress markdown files</li>
        </ol>
      </div>
      <div className="bg-minecraft-darker-blue p-4 rounded-md syntax-highlight">
        <pre className="text-sm">
          <code>{`
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})

// In your markdown file
<script setup>
import { MyReactComponent } from '../components/MyReactComponent.jsx'
</script>

<MyReactComponent />
          `}</code>
        </pre>
      </div>
    </div>
  );
};

export default VitePressReact;
