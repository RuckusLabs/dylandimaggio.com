import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use './src/styles/index.scss' as *;`,
      },
    },
  },
  base: '/dylandimaggio.com/', // GitHub Pages expects this to point to your repo name
})