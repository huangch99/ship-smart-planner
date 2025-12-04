import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This allows the process.env.API_KEY to work in the browser for the demo
    'process.env': process.env
  }
});