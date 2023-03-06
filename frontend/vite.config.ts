import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.png', '**/*.jpeg','**/*.jpg'],
  build: {
    sourcemap: true,
  },
  plugins: [react()],
  server: {
    // host: true, // needed for the Docker Container port mapping to work
    port: 5173, // you can replace this port with any port
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
})
