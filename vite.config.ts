import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Оптимизация для режима разработки
    hmr: {
      overlay: true,
    },
  },
  // Оптимизация для режима разработки
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
  build: {
    // Оптимизация сборки
    target: 'es2015',
    minify: 'terser', // Используем terser для лучшей минификации
    cssMinify: true,
    assetsInlineLimit: 4096, // Инлайн маленьких файлов
    chunkSizeWarningLimit: 1000, // Увеличиваем лимит предупреждения о размере чанка
    sourcemap: false, // Отключаем sourcemap в production
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      treeshake: true, // Включаем tree-shaking
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', '@radix-ui/react-slot', '@radix-ui/react-toast'],
        },
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
