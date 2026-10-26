import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // "@/..." → src/ (required by shadcn/ui and Shadcn Space blocks)
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
})
