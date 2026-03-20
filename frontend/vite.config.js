import { defineConfig } from 'vite'
import reactOxc from '@vitejs/plugin-react-oxc'
import tailwindcss from '@tailwindcss/vite'

const backendTarget = 'http://localhost:8000';

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactOxc(),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api':          { target: backendTarget, changeOrigin: true },
      '/scan':         { target: backendTarget, changeOrigin: true },
      '/cbom':         { target: backendTarget, changeOrigin: true },
      '/score':        { target: backendTarget, changeOrigin: true },
      '/risk':         { target: backendTarget, changeOrigin: true },
      '/remediation':  { target: backendTarget, changeOrigin: true },
      '/certificate':  { target: backendTarget, changeOrigin: true },
      '/verify':       { target: backendTarget, changeOrigin: true },
      '/pqc':          { target: backendTarget, changeOrigin: true },
      '/ws':           { target: 'ws://localhost:8000', ws: true },
    },
  },
})
