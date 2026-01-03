import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Prevents creating .map files, making the browser code unreadable
    sourcemap: false, 
  }
})
