import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { getIndexablePaths, getPageSeo, renderSeoHead, createSitemap, createRobots } from '../src/utils/seo.js';
import { duplexes } from '../src/data/duplexes.js';

export async function prerenderSite() {
  const root = resolve(import.meta.dirname, '..');
  const dist = join(root, 'dist');
  const template = await readFile(join(dist, 'index.html'), 'utf8');
  // Compila JSX en memoria sin abrir un servidor HTTP de vista previa.
  const compiler = await createServer({ root, server: { middlewareMode: true, hmr: false }, appType: 'custom' });
  try {
    const { default: App } = await compiler.ssrLoadModule('/src/App.jsx');
    const { site } = await compiler.ssrLoadModule('/src/config/site.js');
    const paths = getIndexablePaths();
    for (const path of [...paths, '/404']) {
      const seo = getPageSeo(path, site);
      let markup = renderToString(React.createElement(StaticRouter, { location: path }, React.createElement(App)));
      const preload = [...markup.matchAll(/<link[^>]+rel="preload"[^>]*\/>/g)].map((match) => match[0]).join('');
      markup = markup.replace(/<link[^>]+rel="preload"[^>]*\/>/g, '');
      let html = template.replace(/<title>[\s\S]*?<\/title>/, '').replace(/<meta[^>]+name="description"[^>]*\/>/, '');
      html = html.replace('</head>', () => `${renderSeoHead(seo, site)}${preload}</head>`);
      html = html.replace('<div id="root"></div>', () => `<div id="root"${seo.found ? ' data-prerendered="true"' : ''}><!--DSM_APP_START-->${markup}<!--DSM_APP_END--></div>`);
      const output = path === '/' ? join(dist, 'index.html') : join(dist, `${path.slice(1)}.html`);
      await mkdir(dirname(output), { recursive: true });
      await writeFile(output, html);
    }
    const sitemap = createSitemap(site);
    if (sitemap) await writeFile(join(dist, 'sitemap.xml'), sitemap);
    else await rm(join(dist, 'sitemap.xml'), { force: true });
    await writeFile(join(dist, 'robots.txt'), createRobots(site));
    const redirects = duplexes.filter((property) => property.category === 'entregado').map((property) => `/duplex/${property.id} /entregados#proyecto-${property.id} 301`);
    await writeFile(join(dist, '_redirects'), `${redirects.join('\n')}\n`);
    console.log(`SEO: ${paths.length} páginas con HTML completo, metadatos, datos estructurados y una página 404.`);
    console.log(sitemap ? 'SEO: sitemap.xml generado para el dominio configurado.' : 'SEO: configurá VITE_SITE_URL con el dominio definitivo para generar sitemap.xml y URLs canónicas.');
  } finally { await compiler.close(); }
}
