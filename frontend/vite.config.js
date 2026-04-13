import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    allowedHosts: ['fa26-2600-1700-1440-6c50-8e0-8ca8-cda1-1b54.ngrok-free.app'],
    proxy: {
      '/v1': {
        target: 'http://localhost:3003',
        changeOrigin: true,
      },
    },
  },
});
