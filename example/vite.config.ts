import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  build: {
    target: 'es2020',
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
  },
});
