import { duplexes, getOneDuplex } from '../data/duplexes.js';
import { media } from '../data/media.js';

const brand = 'DSM Desarrollos Inmobiliarios';
const categories = {
  venta: { label: 'En venta', path: '/en-venta' },
  construccion: { label: 'En construcción', path: '/en-construccion' },
  entregado: { label: 'Proyectos Entregados', path: '/entregados' },
};
const pages = {
  '/': { title: 'Dúplex en Córdoba · Desarrollos Inmobiliarios | DSM', name: 'Dúplex de alta calidad en Córdoba', description: 'DSM Desarrollos Inmobiliarios en Córdoba. Conocé el dúplex en venta en Docta, las obras en construcción y los proyectos entregados. Contacto directo por WhatsApp.' },
  '/en-venta': { title: 'Dúplex en venta en Docta, Córdoba | DSM', name: 'Dúplex en venta', description: 'Conocé el dúplex DSM en venta en Docta, Córdoba: 3 dormitorios, 3 baños y cochera doble. Consultá materiales y coordiná una visita por WhatsApp.' },
  '/en-construccion': { title: 'Dúplex en construcción en Córdoba | DSM', name: 'Dúplex en construcción', description: 'Explorá los proyectos de DSM en construcción en Córdoba. Tipologías de 2 y 3 dormitorios, características y consulta directa por WhatsApp sobre cada obra.' },
  '/entregados': { title: 'Proyectos Entregados · Dúplex en Córdoba | DSM', name: 'Proyectos Entregados', description: 'Conocé los dúplex vendidos y entregados por DSM en Córdoba. Características de cada proyecto, collage de imágenes ampliable y recorridos en video.' },
  '/contacto': { title: 'Contacto DSM · Dúplex en Córdoba y Docta | DSM', name: 'Contacto', description: 'Contactá a DSM Desarrollos Inmobiliarios en Córdoba. Consultá por dúplex en Docta, proyectos en construcción o visitas. WhatsApp directo y formulario de consulta.' },
};

export function normalizeSiteUrl(value = '') {
  if (!value || typeof value !== 'string') return '';
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' || url.username || url.password || url.port || url.search || url.hash || url.pathname !== '/') return '';
    return url.origin;
  } catch { return ''; }
}

export function getIndexablePaths() {
  return [...Object.keys(pages), ...duplexes.filter((property) => property.category !== 'entregado').map((property) => `/duplex/${property.id}`)];
}

export function getPageSeo(pathname = '/', settings = {}) {
  const path = pathname.replace(/\/+$/, '') || '/';
  const property = path.startsWith('/duplex/') ? getOneDuplex(path.slice('/duplex/'.length)) : null;
  if (property?.category === 'entregado') return getPageSeo('/entregados', settings);
  let page = pages[path];
  const breadcrumbs = [{ name: 'Inicio', path: '/' }];
  if (property) {
    const category = categories[property.category];
    page = {
      title: `${property.title} · ${category.label.toLowerCase()} en Córdoba | DSM`, name: property.name,
      description: `${property.title}, ${category.label.toLowerCase()} en Córdoba. ${property.chips.slice(0, 3).join(', ')}. Consultá a DSM por WhatsApp.`,
    };
    breadcrumbs.push({ name: category.label, path: category.path }, { name: property.title, path });
  } else if (page && path !== '/') breadcrumbs.push({ name: page.name, path });
  const found = Boolean(page);
  if (!page) page = { title: 'Página no encontrada | DSM', name: 'Página no encontrada', description: 'La página solicitada no está disponible. Conocé los dúplex en venta y construcción de DSM en Córdoba o contactanos por WhatsApp.' };
  const origin = normalizeSiteUrl(settings.url);
  return {
    ...page, path, found, property, breadcrumbs,
    canonical: found && origin ? `${origin}${path}` : null,
    image: origin ? `${origin}/img/logo_dsm.png` : null,
    imageAlt: `Logo de ${brand} en Córdoba`,
    robots: found ? 'index, follow, max-image-preview:large' : 'noindex, follow',
  };
}

export function getStructuredData(seo, settings = {}) {
  if (!seo.found) return null;
  const origin = normalizeSiteUrl(settings.url);
  const businessId = origin ? `${origin}/#organization` : null;
  const organization = {
    '@type': 'Organization',
    ...(businessId ? { '@id': businessId, url: `${origin}/`, logo: `${origin}/img/logo_dsm.png` } : {}),
    name: brand, description: 'Desarrollos inmobiliarios y dúplex de alta calidad en Córdoba, Argentina.',
    areaServed: { '@type': 'City', name: 'Córdoba', containedInPlace: { '@type': 'Country', name: 'Argentina' } },
    ...(settings.whatsappNumber ? { telephone: `+${settings.whatsappNumber}`, contactPoint: { '@type': 'ContactPoint', telephone: `+${settings.whatsappNumber}`, contactType: 'Consultas sobre dúplex y visitas', availableLanguage: 'es', areaServed: 'AR' } } : {}),
  };
  const catalogCategory = { '/en-venta': 'venta', '/en-construccion': 'construccion', '/entregados': 'entregado' }[seo.path];
  const webpage = {
    '@type': catalogCategory ? 'CollectionPage' : seo.path === '/contacto' ? 'ContactPage' : 'WebPage',
    ...(seo.canonical ? { '@id': `${seo.canonical}#webpage`, url: seo.canonical } : {}),
    name: seo.name, description: seo.description, inLanguage: 'es-AR',
    about: businessId ? { '@id': businessId } : { '@type': 'Organization', name: brand },
    ...(origin ? { isPartOf: { '@id': `${origin}/#website` } } : {}),
  };
  if (catalogCategory) webpage.mainEntity = {
    '@type': 'ItemList',
    itemListElement: duplexes.filter((property) => property.category === catalogCategory).map((property, index) => ({
      '@type': 'ListItem', position: index + 1,
      item: { '@type': 'WebPage', name: property.name, ...(origin ? { url: `${origin}${catalogCategory === 'entregado' ? `/entregados#proyecto-${property.id}` : `/duplex/${property.id}`}` } : {}) },
    })),
  };
  const graph = [organization, { '@type': 'WebSite', ...(origin ? { '@id': `${origin}/#website`, url: `${origin}/` } : {}), name: brand, inLanguage: 'es-AR', ...(businessId ? { publisher: { '@id': businessId } } : {}) }, webpage];
  if (origin && seo.breadcrumbs.length > 1) graph.push({
    '@type': 'BreadcrumbList', '@id': `${seo.canonical}#breadcrumbs`,
    itemListElement: seo.breadcrumbs.map(({ name, path }, index) => ({ '@type': 'ListItem', position: index + 1, name, item: `${origin}${path}` })),
  });
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

export function serializeStructuredData(value) { return JSON.stringify(value).replace(/</g, '\\u003c'); }

export function renderSeoHead(seo, settings = {}) {
  const metas = [
    ['name', 'description', seo.description], ['name', 'robots', seo.robots], ['name', 'author', brand],
    ['property', 'og:title', seo.title], ['property', 'og:description', seo.description], ['property', 'og:type', 'website'],
    ['property', 'og:site_name', brand], ['property', 'og:locale', 'es_AR'],
    ['name', 'twitter:card', 'summary'], ['name', 'twitter:title', seo.title], ['name', 'twitter:description', seo.description],
  ];
  if (seo.canonical) metas.push(['property', 'og:url', seo.canonical]);
  if (seo.image) metas.push(['property', 'og:image', seo.image], ['property', 'og:image:alt', seo.imageAlt], ['property', 'og:image:width', '512'], ['property', 'og:image:height', '428'], ['name', 'twitter:image', seo.image], ['name', 'twitter:image:alt', seo.imageAlt]);
  const structured = getStructuredData(seo, settings);
  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    ...metas.map(([attribute, name, value]) => `<meta ${attribute}="${name}" content="${escapeHtml(value)}" />`),
    ...(seo.canonical ? [`<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`] : []),
    ...(structured ? [`<script id="dsm-structured-data" type="application/ld+json">${serializeStructuredData(structured)}</script>`] : []),
  ].join('\n');
}

export function createSitemap(settings = {}) {
  const origin = normalizeSiteUrl(settings.url);
  if (!origin) return null;
  const urls = getIndexablePaths().map((path) => {
    const property = path.startsWith('/duplex/') ? getOneDuplex(path.slice('/duplex/'.length)) : null;
    const images = property ? property.gallery.map((image) => typeof image === 'string' ? media[image] : image).filter((image) => image && !image.illustrative) : [];
    const imageNodes = images.map((image) => `<image:image><image:loc>${escapeHtml(new URL(image.src, origin).href)}</image:loc></image:image>`).join('');
    return `<url><loc>${escapeHtml(`${origin}${path}`)}</loc>${imageNodes}</url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`;
}

export function createRobots(settings = {}) {
  const origin = normalizeSiteUrl(settings.url);
  return `User-agent: *\nAllow: /\n${origin ? `\nSitemap: ${origin}/sitemap.xml\n` : ''}`;
}
