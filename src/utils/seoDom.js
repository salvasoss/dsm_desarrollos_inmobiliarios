import { getStructuredData, serializeStructuredData } from './seo.js';

export function applyPageSeo(seo, settings, preview = false) {
  document.title = seo.title;
  function meta(attribute, name, value) {
    let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
    if (value == null) { element?.remove(); return; }
    if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, name); document.head.append(element); }
    element.setAttribute('content', value);
  }
  meta('name', 'description', seo.description);
  meta('name', 'robots', preview ? 'noindex, follow' : seo.robots);
  meta('property', 'og:title', seo.title);
  meta('property', 'og:description', seo.description);
  meta('property', 'og:type', 'website');
  meta('property', 'og:site_name', settings.name);
  meta('property', 'og:locale', 'es_AR');
  meta('property', 'og:url', preview ? null : seo.canonical);
  meta('property', 'og:image', preview ? null : seo.image);
  meta('property', 'og:image:alt', !preview && seo.image ? seo.imageAlt : null);
  meta('property', 'og:image:width', !preview && seo.image ? '512' : null);
  meta('property', 'og:image:height', !preview && seo.image ? '428' : null);
  meta('name', 'twitter:card', 'summary');
  meta('name', 'twitter:title', seo.title);
  meta('name', 'twitter:description', seo.description);
  meta('name', 'twitter:image', preview ? null : seo.image);
  meta('name', 'twitter:image:alt', !preview && seo.image ? seo.imageAlt : null);
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!preview && seo.canonical) {
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
    canonical.href = seo.canonical;
  } else canonical?.remove();
  let script = document.getElementById('dsm-structured-data');
  const structured = preview ? null : getStructuredData(seo, settings);
  if (structured) {
    if (!script) { script = document.createElement('script'); script.id = 'dsm-structured-data'; script.type = 'application/ld+json'; document.head.append(script); }
    script.textContent = serializeStructuredData(structured);
  } else script?.remove();
}
