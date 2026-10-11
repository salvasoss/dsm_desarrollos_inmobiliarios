import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './scrollReveal.scss';

const targets = ['.hero__copy', '.page-intro', '.section-heading', '.duplex-card', '.featured-duplex', '.delivered-project__heading', '.delivered-project__tour', '.photo-collage', '.photo-collage__caption', '.delivered-project__information', '.delivered-project__actions', '.detail-heading', '.gallery', '.video-tour-entry', '.detail-description', '.detail-materials', '.contact-page__direct', '.contact-form', '.contact-band__copy', '.local-content__copy', '.local-content__questions'];

export default function ScrollReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const elements = [...document.querySelectorAll(targets.map((selector) => `#contenido ${selector}`).join(','))];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.add('scroll-reveal--visible');
        observer.unobserve(target);
      });
    }, { rootMargin: '0px 0px 35px 0px', threshold: 0.06 });
    elements.forEach((element, index) => {
      element.classList.add('scroll-reveal');
      if (element.matches('.duplex-card')) element.style.setProperty('--reveal-delay', `${index % 3 * 65}ms`);
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => {
        element.classList.remove('scroll-reveal', 'scroll-reveal--visible');
        element.style.removeProperty('--reveal-delay');
      });
    };
  }, [pathname]);
  return null;
}
