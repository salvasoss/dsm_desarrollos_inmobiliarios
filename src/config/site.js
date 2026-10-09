import { normalizeWhatsAppNumber } from '../utils/whatsapp';

export const site = {
  name: 'DSM Desarrollos Inmobiliarios',
  shortName: 'DSM',
  location: 'Córdoba, Argentina',
  whatsappNumber: normalizeWhatsAppNumber(import.meta.env.VITE_WHATSAPP_NUMBER),
  url: (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, ''),
  youtubeTourUrl: import.meta.env.VITE_YOUTUBE_TOUR_URL || '',
  generalMessage: 'Hola DSM, quisiera conocer sus dúplex y conversar sobre mi próximo hogar.',
};
