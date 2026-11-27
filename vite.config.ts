import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Production builds are served from GitHub Pages at https://joaquinluisdavid.github.io/lavere/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/lavere/' : '/',
  plugins: [react()],
}))
