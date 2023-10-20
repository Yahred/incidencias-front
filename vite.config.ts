import { fileURLToPath, URL } from "url";

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@catalogos': fileURLToPath(new URL('./src/modules/catalogos', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services/index', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/utils/hooks', import.meta.url)),
      '@interfaces': fileURLToPath(new URL('./src/interfaces', import.meta.url)),
      '@constants': fileURLToPath(new URL('./src/constants', import.meta.url)),
      "@functions": fileURLToPath(new URL('./src/utils/functions', import.meta.url)),
    }
  }
})
