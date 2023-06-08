import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // TODO: proxy not working
    proxy: {
      '/api': {
        target: 'https://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    },
    port: 3000,
  }
})
