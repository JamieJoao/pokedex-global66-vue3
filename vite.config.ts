import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // server: {
  //   host: '192.168.1.4',
  // }
})
