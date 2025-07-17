import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    proxy: {
     '/api': {
        target: "https://suitmedia-backend.suitdev.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
      '/media': {
        target: "https://assets.suitdev.com",
        changeOrigin: true,
    
      },
    },
  },
plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },});