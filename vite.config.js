import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { normalizeWhatsAppNumber } from './src/utils/whatsapp.js';
import { parseYouTubeUrl } from './src/utils/youtube.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  if (env.VITE_WHATSAPP_NUMBER && !normalizeWhatsAppNumber(env.VITE_WHATSAPP_NUMBER)) {
    throw new Error('VITE_WHATSAPP_NUMBER: ingresá entre 10 y 15 dígitos, con código de país y sin cero inicial.');
  }
  if (env.VITE_YOUTUBE_TOUR_URL && !parseYouTubeUrl(env.VITE_YOUTUBE_TOUR_URL)) {
    throw new Error('VITE_YOUTUBE_TOUR_URL: ingresá un enlace de YouTube a un video o playlist, no la dirección general del canal.');
  }
  return {
    plugins: [react()],
    optimizeDeps: { entries: ['index.html'] },
    server: { host: '0.0.0.0', port: 5173 },
    preview: { host: '0.0.0.0', port: 4173 },
    build: { target: 'es2020', assetsInlineLimit: 0 },
  };
});
