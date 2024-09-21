import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild', // Use esbuild for faster minification
    chunkSizeWarningLimit: 512, // Adjust this as needed
  },
})
