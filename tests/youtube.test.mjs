import test from 'node:test';
import assert from 'node:assert/strict';
import { parseYouTubeUrl, createYouTubeEmbedUrl } from '../src/utils/youtube.js';

const id = 'M7lc1UVf-VE';

test('acepta enlaces de video de YouTube compartidos en sus formatos habituales', () => {
  for (const input of [
    `https://www.youtube.com/watch?v=${id}&si=compartido`,
    `https://youtu.be/${id}?si=compartido`,
    `https://m.youtube.com/watch?v=${id}`,
    `https://www.youtube.com/shorts/${id}`,
    `https://www.youtube.com/live/${id}`,
    `https://www.youtube-nocookie.com/embed/${id}`,
  ]) {
    assert.deepEqual(parseYouTubeUrl(input), { type: 'video', id, watchUrl: `https://www.youtube.com/watch?v=${id}` });
  }
});

test('sin asignar un video, no inventa un destino ni intenta cargar un reproductor', () => {
  assert.equal(parseYouTubeUrl(''), null);
  assert.equal(createYouTubeEmbedUrl('', { autoplay: true }), null);
  assert.equal(parseYouTubeUrl('https://www.youtube.com/@canal-por-asignar'), null);
});

test('descarta enlaces ajenos a YouTube y formatos incorrectos', () => {
  for (const input of ['javascript:alert(1)', 'https://youtube.com.otro-dominio.test/watch?v=M7lc1UVf-VE', 'https://otro-dominio.test/video', 'https://usuario:clave@youtube.com/watch?v=M7lc1UVf-VE', 'https://youtube.com/watch?v=invalido', 'https://youtube.com:8443/watch?v=M7lc1UVf-VE']) assert.equal(parseYouTubeUrl(input), null);
});

test('prepara autoplay sin sonido, controles visibles y reproducción en línea', () => {
  const url = new URL(createYouTubeEmbedUrl(`https://youtu.be/${id}`, { autoplay: true }));
  assert.equal(url.hostname, 'www.youtube-nocookie.com');
  assert.equal(url.pathname, `/embed/${id}`);
  assert.equal(url.searchParams.get('autoplay'), '1');
  assert.equal(url.searchParams.get('mute'), '1');
  assert.equal(url.searchParams.get('controls'), '1');
  assert.equal(url.searchParams.get('playsinline'), '1');
});

test('acepta una playlist común del canal para todas las fichas', () => {
  const playlist = 'PLC77007E23FF423C6';
  const url = new URL(createYouTubeEmbedUrl(`https://www.youtube.com/playlist?list=${playlist}`));
  assert.equal(url.pathname, '/embed/videoseries');
  assert.equal(url.searchParams.get('list'), playlist);
  assert.equal(url.searchParams.get('listType'), 'playlist');
  assert.equal(url.searchParams.get('autoplay'), '0');
});
