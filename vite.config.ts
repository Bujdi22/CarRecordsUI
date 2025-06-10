/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {defineConfig, loadEnv} from 'vite'
import fs from 'fs';

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  console.log('MODE:', mode); // 👈 Check what this prints

  const env = loadEnv(mode, process.cwd()); // Only VITE_*

  console.log('HELLO', env.VITE_API_URL);

  console.log('.env.development exists?', fs.existsSync('.env.development'));
  return {
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
              ? 'https://api.autojournalapp.com' // Android app API base URL
              : '/api' // Vite proxy for development
      ),
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },
  }
})
