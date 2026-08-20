import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' — ポートフォリオサイトの /apps/<slug>/ 配下に置いて
// iframe 埋め込みしても資産解決が壊れないようにする。
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          transformers: ['@huggingface/transformers'],
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
})
