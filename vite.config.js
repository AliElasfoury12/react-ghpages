import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://alielasfoury12.github.io/react-ghpages/",
  plugins: [react()],
})
