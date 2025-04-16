// vite-plugin-copy-assets.js
import { resolve, dirname } from 'path';
import { promises as fs } from 'fs';
import { glob } from 'glob';

/**
 * Vite plugin to copy CIF files and other assets to the build directory
 */
export default function copyAssetsPlugin() {
  return {
    name: 'copy-assets',
    
    // Hook into the closeBundle lifecycle hook which runs at the end of the build
    async closeBundle() {
      // Get all CIF files
      const cifFiles = await glob('src/assets/**/*.cif');
      
      // Create destination directories and copy files
      await Promise.all(cifFiles.map(async (file) => {
        const destPath = resolve('dist', file);
        const destDir = dirname(destPath);
        
        // Create directory if it doesn't exist
        await fs.mkdir(destDir, { recursive: true });
        
        // Copy the file
        await fs.copyFile(file, destPath);
        console.log(`Copied: ${file} → ${destPath}`);
      }));
      
      console.log('All assets successfully copied!');
    }
  };
}