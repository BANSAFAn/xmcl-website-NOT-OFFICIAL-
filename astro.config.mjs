import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [
    react(),
  ],
  output: 'server',
  adapter: vercel(),
  outDir: './build',
  vite: {
    plugins: [tailwind()],
    resolve: {
      alias: {
        '@': '/src',
        'highlight.js/lib/core': './node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/core.js',
      },
    },
  },
});

