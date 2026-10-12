import test from 'node:test';
import assert from 'node:assert/strict';
import { getIndexablePaths, getPageSeo, getStructuredData, normalizeSiteUrl, createSitemap, createRobots, renderSeoHead, serializeStructuredData } from '../src/utils/seo.js';

const settings = { url: 'https://dsm.test', whatsappNumber: '5493513067123' };

test('el dominio canónico acepta solo una raíz HTTPS válida y no inventa direcciones', () => {
  assert.equal(normalizeSiteUrl('https://dsm.test/'), 'https://dsm.test');
  for (const invalid of ['', 'javascript:alert(1)', 'http://dsm.test', 'https://usuario:clave@dsm.test', 'https://dsm.test/otra-ruta', 'https://dsm.test?q=1', 'https://dsm.test/#inicio']) assert.equal(normalizeSiteUrl(invalid), '');
  assert.equal(getPageSeo('/', {}).canonical, null);
  assert.equal(createSitemap({}), null);
  assert.doesNotMatch(createRobots({}), /Sitemap:/);
});

test('cada página y ficha activa tiene su título, descripción y URL canónica propios', () => {
  const paths = getIndexablePaths();
  assert.equal(paths.length, 9);
  assert.ok(!paths.some((path) => path.includes('/duplex/entregado-')));
  const pages = paths.map((path) => getPageSeo(path, settings));
  assert.equal(new Set(pages.map((page) => page.title)).size, paths.length);
  assert.equal(new Set(pages.map((page) => page.description)).size, paths.length);
  for (const page of pages) {
    assert.equal(page.found, true);
    assert.equal(page.canonical, `${settings.url}${page.path}`);
    assert.match(page.description, /Córdoba/);
    assert.match(page.robots, /^index/);
  }
  assert.match(getPageSeo('/en-venta', settings).description, /Docta/);
});

test('las páginas inexistentes usan noindex y los entregados apuntan a la página común', () => {
  const missing = getPageSeo('/duplex/inexistente', settings);
  assert.equal(missing.found, false);
  assert.equal(missing.canonical, null);
  assert.equal(missing.robots, 'noindex, follow');
  assert.equal(getStructuredData(missing, settings), null);
  assert.equal(getPageSeo('/duplex/entregado-escritorio', settings).canonical, `${settings.url}/entregados`);
});

test('los datos estructurados contienen el contacto real y las obras visibles, sin reseñas ni dirección inventada', () => {
  const data = getStructuredData(getPageSeo('/entregados', settings), settings);
  const business = data['@graph'].find((node) => node['@type'] === 'Organization');
  assert.equal(business.telephone, '+5493513067123');
  assert.equal(business.areaServed.name, 'Córdoba');
  assert.equal(business.address, undefined);
  assert.equal(business.aggregateRating, undefined);
  const collection = data['@graph'].find((node) => node['@type'] === 'CollectionPage');
  assert.equal(collection.mainEntity.itemListElement.length, 2);
  assert.ok(collection.mainEntity.itemListElement.every(({ item }) => item.url.startsWith(`${settings.url}/entregados#proyecto-`)));
  const detail = getStructuredData(getPageSeo('/duplex/docta-mza-76-lote-7', settings), settings);
  assert.equal(detail['@graph'].find((node) => node['@type'] === 'BreadcrumbList').itemListElement.length, 3);
});

test('el sitemap contiene las nueve URLs públicas y las fotos reales, y robots apunta al dominio asignado', () => {
  const xml = createSitemap(settings);
  assert.equal([...xml.matchAll(/<loc>/g)].length, 9);
  assert.doesNotMatch(xml, /\/duplex\/entregado-|\/404|<lastmod>/);
  assert.ok(xml.includes('<image:loc>https://dsm.test/img/docta/ingreso.webp</image:loc>'));
  assert.ok(xml.includes('<image:loc>https://dsm.test/img/docta/cocina.webp</image:loc>'));
  assert.doesNotMatch(xml, /\/img\/(?:exterior|interior|proyecto)\.webp/);
  assert.ok(xml.includes('<loc>https://dsm.test/en-venta</loc>'));
  assert.equal(createRobots(settings), 'User-agent: *\nAllow: /\n\nSitemap: https://dsm.test/sitemap.xml\n');
});

test('los metadatos y el JSON-LD no permiten que texto con etiquetas rompa el HTML', () => {
  const page = { ...getPageSeo('/', settings), title: 'DSM <script>alert(1)</script>', description: 'Calidad "A&B" <img>' };
  const head = renderSeoHead(page, settings);
  assert.ok(head.includes('DSM &lt;script&gt;alert(1)&lt;/script&gt;'));
  assert.ok(head.includes('Calidad &quot;A&amp;B&quot; &lt;img&gt;'));
  assert.ok(!head.includes('<title>DSM <script>'));
  const serialized = serializeStructuredData({ description: '</script><script>alert(1)</script>' });
  assert.doesNotMatch(serialized, /<\/script>/);
  assert.equal(JSON.parse(serialized).description, '</script><script>alert(1)</script>');
});
