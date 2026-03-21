import { defineConfig } from 'vite'
import reactOxc from '@vitejs/plugin-react-oxc'
import tailwindcss from '@tailwindcss/vite'

const backendTarget = 'http://127.0.0.1:8000';

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactOxc(),
  ],
  server: {
    port: 3000,
    proxy: {
      '/auth':         { target: backendTarget, changeOrigin: true },
      '/api':          { target: backendTarget, changeOrigin: true },
      '/scan':         { target: backendTarget, changeOrigin: true },
      '/cbom':         { target: backendTarget, changeOrigin: true },
      '/score':        { target: backendTarget, changeOrigin: true },
      '/risk':         { target: backendTarget, changeOrigin: true },
      '/remediation':  { target: backendTarget, changeOrigin: true },
      '/certificate':  { target: backendTarget, changeOrigin: true },
      '/verify':       { target: backendTarget, changeOrigin: true },
      '/pqc':          { target: backendTarget, changeOrigin: true },
      '/ws':           { target: 'ws://127.0.0.1:8000', ws: true },
    },
  },
})
