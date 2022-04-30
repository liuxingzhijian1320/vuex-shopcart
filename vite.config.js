import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 1231,
    strictPort: false,
    open: true,
    proxy: {
      '/foo': 'http://localhost:4567',
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
});
