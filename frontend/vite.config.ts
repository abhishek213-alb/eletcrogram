import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Optimized Vite configuration for 100% Stability
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8083',
        changeOrigin: true
      }
    }
  }
})
