import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from "node:url"; // <-- 1. Import this instead of 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // 2. Use import.meta.url (which is completely safe in "type": "module")
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})