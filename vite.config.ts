import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      utils: path.resolve(__dirname, "src/utils"),
      context: path.resolve(__dirname, "src/context"),
      components: path.resolve(__dirname, "src/components"),
      hooks: path.resolve(__dirname, "src/hooks"),
      interface: path.resolve(__dirname, "src/interface"),
    },
  },
});