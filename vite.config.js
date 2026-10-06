import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// "base" debe coincidir con el nombre del repositorio en GitHub
// para que gh-pages encuentre los archivos en /nextpixel-gearS8/
export default defineConfig({
  plugins: [react()],
  base: '/nextpixel-gearS8/',
});
