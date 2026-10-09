import { readFile, writeFile, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
let html = await readFile(join(dist, 'index.html'), 'utf8');
const mime = { webp: 'image/webp', svg: 'image/svg+xml', png: 'image/png', woff2: 'font/woff2', woff: 'font/woff' };
async function dataUrl(path) {
  const extension = path.split('.').pop();
  return `data:${mime[extension] || 'application/octet-stream'};base64,${(await readFile(path)).toString('base64')}`;
}
const assets = await readdir(join(dist, 'assets'));
// Usar las referencias de index.html evita incorporar bundles de compilaciones anteriores.
const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"[^>]*><\/script>/g)].map((match) => match[1]);
if (scripts.length !== 1) throw new Error('La vista HTML necesita un único bundle de JavaScript.');
let script = await readFile(join(dist, scripts[0].replace(/^\//, '')), 'utf8');
for (const file of await readdir(join(dist, 'img'))) {
  const uri = await dataUrl(join(dist, 'img', file));
  script = script.replaceAll(`/img/${file}`, uri);
  html = html.replaceAll(`/img/${file}`, uri);
}
let styles = '';
const stylesheets = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/g)].map((match) => match[1]);
for (const file of stylesheets) {
  let css = await readFile(join(dist, file.replace(/^\//, '')), 'utf8');
  for (const font of assets.filter((item) => /\.woff2?$/.test(item))) {
    css = css.replaceAll(`/assets/${font}`, await dataUrl(join(dist, 'assets', font)));
  }
  styles += css;
}
html = html.replace(/<script[^>]+src="[^"]+"[^>]*><\/script>/g, '').replace(/<link[^>]+rel="stylesheet"[^>]*>/g, '');
html = html.replace('</head>', () => `<style>${styles}</style></head>`);
html = html.replace('</body>', () => `<script>window.__DSM_HTML_PREVIEW__=true;</script><script type="module">${script.replaceAll('</script', '<\\/script')}</script></body>`);
await writeFile(join(root, 'DSM_preview.html'), html);
console.log('DSM_preview.html creado. Podés abrirlo directamente en tu navegador.');
