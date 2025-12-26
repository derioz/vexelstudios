import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'generate-cname',
      closeBundle() {
        const cnamePath = resolve(__dirname, 'dist', 'CNAME');
        const cnameContent = 'vexelstudios.xyz';
        
        // Ensure dist directory exists (it should after build)
        if (fs.existsSync(resolve(__dirname, 'dist'))) {
            fs.writeFileSync(cnamePath, cnameContent);
            console.log(`✓ CNAME file auto-generated: ${cnameContent}`);
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});