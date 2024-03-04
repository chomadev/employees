/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "path"
import react from '@vitejs/plugin-react'
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    loader: 'tsx'
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
