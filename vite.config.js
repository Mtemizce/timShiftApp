import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve())

  return {
    root: 'frontend',
    plugins: [react(),tailwindcss(),],
    server: {
      port: parseInt(env.VITE_PORT),
      proxy: {
        [env.VITE_API_BASE]: env.VITE_API_URL
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'frontend')
      }
    },
    build: {
      outDir: '../dist',
      emptyOutDir: true
    }
  }
})
