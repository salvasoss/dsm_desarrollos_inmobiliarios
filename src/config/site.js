import { normalizeWhatsAppNumber } from '../utils/whatsapp';
import { normalizeSiteUrl } from '../utils/seo';

const whatsappNumber = normalizeWhatsAppNumber(import.meta.env.VITE_WHATSAPP_NUMBER || '5493513067123');

export const site = {
  name: 'DSM Desarrollos Inmobiliarios',
  shortName: 'DSM',
  location: 'Córdoba, Argentina',
  whatsappNumber,
  whatsappDisplayNumber: whatsappNumber === '5493513067123' ? '+54 9 351 306 7123' : `+${whatsappNumber}`,
  url: normalizeSiteUrl(import.meta.env.VITE_SITE_URL),
  youtubeTourUrl: import.meta.env.VITE_YOUTUBE_TOUR_URL || '',
  generalMessage: 'Hola DSM, quisiera conocer sus dúplex y conversar sobre mi próximo hogar.',
};
