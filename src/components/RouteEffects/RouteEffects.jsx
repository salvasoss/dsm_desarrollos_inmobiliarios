import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { site } from '../../config/site';
import { getPageSeo } from '../../utils/seo';
import { applyPageSeo } from '../../utils/seoDom';

export default function RouteEffects() {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const preview = window.location.protocol === 'file:' || Boolean(window.__DSM_HTML_PREVIEW__);
    applyPageSeo(getPageSeo(pathname, site), site, preview);
    if (previousPath.current !== pathname) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.getElementById('contenido')?.focus({ preventScroll: true });
      previousPath.current = pathname;
    }
    if (hash) {
      let id;
      try { id = decodeURIComponent(hash.slice(1)); } catch { id = hash.slice(1); }
      const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }));
      return () => cancelAnimationFrame(frame);
    }
  }, [pathname, hash]);
  return null;
}
