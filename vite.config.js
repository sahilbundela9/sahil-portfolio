import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',           // ← THIS fixes white screen on Netlify
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})