/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/', // Your back-end server
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  // other config settings
  define: {
    'process.env.API_BASE_URL': JSON.stringify(
        process.env.NODE_ENV === 'production'
            ? 'http://192.168.0.246:8080' // Android app API base URL
            : '/api' // Vite proxy for development
    ),
  },
})
