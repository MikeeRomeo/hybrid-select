import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/hybrid-select.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit/
    }
  }
})
