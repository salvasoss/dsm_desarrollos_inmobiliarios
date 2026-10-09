export function normalizeWhatsAppNumber(value = '') {
  const number = String(value).replace(/[\s()+.-]/g, '');
  return /^[1-9]\d{9,14}$/.test(number) ? number : '';
}

export function createWhatsAppUrl(number, message) {
  const normalized = normalizeWhatsAppNumber(number);
  return normalized ? `https://wa.me/${normalized}?text=${encodeURIComponent(message)}` : null;
}

export function propertyMessage(property, intent = 'consulta') {
  if (property.category === 'entregado') {
    return `Hola DSM, vi ${property.name}, que ya fue vendido y entregado. Quisiera conocer sus proyectos disponibles con esa calidad. ¿Podrían contactarme?`;
  }
  const introduction = intent === 'visita'
    ? 'Hola DSM, quiero coordinar una visita'
    : 'Hola DSM, quisiera recibir más información';
  return `${introduction} sobre ${property.name}. ${property.location ? `Ubicación: ${property.location}. ` : ''}¿Podrían contactarme?`;
}

export function formMessage({ name, phone, interest, message }) {
  return [
    'Hola DSM, tengo una consulta desde la web.',
    `Nombre: ${name.trim()}`,
    phone.trim() ? `Mi teléfono: ${phone.trim()}` : false,
    `Me interesa: ${interest}`,
    '',
    message.trim(),
  ].filter((line) => line !== false).join('\n');
}
