import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the site from /lavere/, while Vercel serves it from /.
export default defineConfig(({ command }) => ({
  base: command === 'build' && !process.env.VERCEL ? '/lavere/' : '/',
  plugins: [react()],
}))
