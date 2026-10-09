import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getOneDuplex } from '../../data/duplexes';
import { site } from '../../config/site';

const pages = {
  '/': ['Dúplex de alta calidad en Córdoba', 'DSM Desarrollos Inmobiliarios. Conocé nuestros dúplex en venta, en construcción y entregados en Córdoba.'],
  '/en-venta': ['Dúplex en venta', 'Conocé el dúplex DSM disponible en Docta. Tres dormitorios, espacios generosos y terminaciones seleccionadas. Consultá y coordiná una visita por WhatsApp.'],
  '/en-construccion': ['Dúplex en construcción', 'Conocé los proyectos de DSM en construcción y consultá por sus características y avances por WhatsApp.'],
  '/entregados': ['Obras entregadas', 'Dos dúplex vendidos y entregados. Conocé las obras realizadas por DSM Desarrollos Inmobiliarios.'],
  '/contacto': ['Contacto', 'Contactá a DSM Desarrollos Inmobiliarios por WhatsApp y conversá sobre tu próximo hogar.'],
};

export default function RouteEffects() {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const property = pathname.startsWith('/duplex/') ? getOneDuplex(pathname.split('/')[2]) : null;
    const [title, description] = property ? [property.name, property.summary] : pages[pathname] || ['Página no encontrada', 'Conocé los proyectos de DSM.'];
    document.title = `${title} | DSM Desarrollos Inmobiliarios`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    if (site.url) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
      canonical.href = `${site.url}${pathname}`;
    }
    if (previousPath.current !== pathname) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.getElementById('contenido')?.focus({ preventScroll: true });
      previousPath.current = pathname;
    }
    if (hash) {
      const frame = requestAnimationFrame(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' }));
      return () => cancelAnimationFrame(frame);
    }
  }, [pathname, hash]);
  return null;
}
