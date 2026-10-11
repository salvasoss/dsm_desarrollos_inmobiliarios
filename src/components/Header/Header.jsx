import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';
import Icon from '../Icon/Icon';
import './header.scss';

export const navigation = [
  { to: '/', label: 'Inicio' },
  { to: '/en-construccion', label: 'En construcción' },
  { to: '/en-venta', label: 'En venta' },
  { to: '/entregados', label: 'Entregados' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuButton = useRef(null);
  useEffect(() => { setOpen(false); }, [location.pathname]);
  function handleKeyDown(event) {
    if (event.key === 'Escape' && open) { setOpen(false); menuButton.current.focus(); }
  }
  return <header className="header" onKeyDown={handleKeyDown}>
    <div className="header__inner wrap">
      <Link to="/" className="header__brand" aria-label="DSM Desarrollos Inmobiliarios, ir al inicio">
        <img src="/img/logo-dsm.svg" alt="DSM Desarrollos Inmobiliarios" title="DSM Desarrollos Inmobiliarios · Dúplex en Córdoba" width="84" height="70" />
      </Link>
      <nav id="navegacion-principal" className={`header__nav ${open ? 'is-open' : ''}`} aria-label="Navegación principal">
        {navigation.map(({ to, label }) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}
      </nav>
      <WhatsAppButton className="header__contact" ariaLabel="Contactar a DSM por WhatsApp"><span>Hablemos</span></WhatsAppButton>
      <button ref={menuButton} type="button" className="header__toggle" aria-expanded={open} aria-controls="navegacion-principal" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
    </div>
  </header>;
}
