import { defineConfig } from 'vite'

export default defineConfig({
  // Base public path for GitHub Pages
  base: process.env.NODE_ENV === 'production' ? '/nudge-o-clock/' : '/',

  // Root directory for the project
  root: '.',

  // Build configuration
  build: {
    // Output directory
    outDir: 'dist',

    // Clean output directory before build
    emptyOutDir: true,

    // Generate source maps for production (optional for static sites)
    sourcemap: false,

    // CSS optimization
    cssCodeSplit: false,

    // Rollup options
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },

  // Development server configuration
  server: {
    port: 3000,
    host: true,
    open: true
  },

  // CSS processing
  css: {
    postcss: './postcss.config.js'
  }
})