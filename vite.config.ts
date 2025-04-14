import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { glslify } from 'vite-plugin-glslify'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),glslify()],
})