import { Link } from 'react-router-dom';
import { navigation } from '../Header/Header';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';
import Icon from '../Icon/Icon';
import { site } from '../../config/site';
import './footer.scss';

export default function Footer() {
  return <footer className="footer">
    <div className="wrap footer__main">
      <div className="footer__brand"><Link to="/" aria-label="DSM, volver al inicio"><span>DSM<span className="red-dot">.</span></span></Link><p>Desarrollos Inmobiliarios</p><span className="footer__location"><Icon name="pin" />{site.location}</span></div>
      <nav className="footer__nav" aria-label="Navegación del pie de página">{navigation.map(({ to, label }) => <Link key={to} to={to}>{label}</Link>)}</nav>
      <div className="footer__contact"><span className="eyebrow">Atención directa</span><p>Conversemos sobre<br />tu próximo <span className="title-accent">hogar</span>.</p><span className="footer__phone">{site.whatsappDisplayNumber}</span><WhatsAppButton variant="ghost">Escribir por WhatsApp</WhatsAppButton></div>
    </div>
    <div className="wrap footer__bottom"><span>© {new Date().getFullYear()} DSM Desarrollos Inmobiliarios</span><span>Diseño. Materiales. Terminaciones.</span></div>
  </footer>;
}
