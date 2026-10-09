import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeWhatsAppNumber, createWhatsAppUrl, propertyMessage, formMessage } from '../src/utils/whatsapp.js';

test('un contacto sin configurar nunca abre WhatsApp hacia un destinatario inventado', () => {
  assert.equal(createWhatsAppUrl('', 'Hola'), null);
  assert.equal(createWhatsAppUrl('número pendiente', 'Hola'), null);
  assert.equal(normalizeWhatsAppNumber('00123456789'), '');
});

test('acepta un formato internacional legible y conserva íntegra la consulta en la URL', () => {
  const message = 'Quiero conocer el dúplex. Mi consulta: A&B, 180 m² + visita\n¡Gracias!';
  const url = new URL(createWhatsAppUrl('+54 (9) 351 123-4567', message));
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/5493511234567');
  assert.equal(url.searchParams.get('text'), message);
});

test('consultar un proyecto entregado dirige el interés a las unidades disponibles', () => {
  const message = propertyMessage({ name: 'Proyecto 01', category: 'entregado' }, 'visita');
  assert.match(message, /ya fue vendido y entregado/);
  assert.match(message, /proyectos disponibles/);
  assert.doesNotMatch(message, /coordinar una visita sobre/);
});

test('el formulario conserva nombre, interés, saltos de línea y teléfono opcional', () => {
  const input = { name: ' Ana ', phone: '', interest: 'Dúplex Tipo A', message: ' Quiero una visita.\nPor la tarde. ' };
  const message = formMessage(input);
  assert.match(message, /Nombre: Ana/);
  assert.match(message, /Me interesa: Dúplex Tipo A\n\nQuiero una visita\.\nPor la tarde\./);
  assert.doesNotMatch(message, /teléfono/);
  assert.match(formMessage({ ...input, phone: '+54 9 351 1234567' }), /Mi teléfono: \+54 9 351 1234567/);
});
