// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';
import copyAssetsPlugin from './vite-plugin-copy-assets.js';

export default defineConfig({
  // Base path for GitHub Pages - use your repository name here
  // If your repo is https://github.com/username/cifvis_presentation, 
  // the base would be '/cifvis_presentation/'
  // For username.github.io repos, use '/'
  base: '/cifvis_presentation/',
  
  // Configure server options
  server: {
    port: 3000,
    open: true, // Automatically open browser on server start
  },
  
  // Resolve file paths
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  
  // Build options
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      // Ensure proper handling of dependencies
      output: {
        manualChunks: {
          reveal: ['reveal.js'],
          d3: ['d3'],
          cifvis: ['cifvis'],
        },
      },
    },
    // Ensure we properly copy assets
    assetsInlineLimit: 0, // Don't inline any assets as base64
    // Ensure all CIF files are copied as-is to the dist folder
    assetsInclude: ['**/*.cif'],
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['reveal.js', 'd3', 'cifvis'],
  },
  
  // Handle static assets
  publicDir: 'public',

  // Ensure proper handling of CSS
  css: {
    devSourcemap: true,
  },
  
  // Add custom plugins
  plugins: [
    copyAssetsPlugin()
  ],
});