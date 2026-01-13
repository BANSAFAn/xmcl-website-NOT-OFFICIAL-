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
    server: {
      port: 8080,
      host: true,
      hmr: {
        clientPort: 8080,
      },
    },
    plugins: [tailwind()],
    resolve: {
      alias: {
        '@': '/src',
        'highlight.js/lib/core': './node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/core.js',
      },
    },
  },
});

