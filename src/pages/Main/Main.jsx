import { Link } from 'react-router-dom';
import { getDuplexes } from '../../data/duplexes';
import Photo from '../../components/Photo/Photo';
import Icon from '../../components/Icon/Icon';
import DuplexListContainer from '../../components/DuplexListContainer/DuplexListContainer';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';
import LocalContent from '../../components/LocalContent/LocalContent';
import { siteContent } from '../../data/siteContent';
import ContactBand from '../../components/ContactBand/ContactBand';
import './main.scss';

export default function Main() {
  const saleCount = getDuplexes('venta').length;
  const constructionCount = getDuplexes('construccion').length;
  const deliveredCount = getDuplexes('entregado').length;
  return <>
    <section className="hero" data-home-section="inicio">
      <Photo image="exterior" className="hero__image" priority />
      <div className="hero__shade" />
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <span className="eyebrow">DSM · Desarrollos Inmobiliarios</span>
          <h1>La <span className="title-accent">diferencia</span><br />se construye<span>.</span></h1>
          <p>Dúplex de alta calidad en Córdoba.</p>
          <div className="actions"><Link to="/en-venta" className="btn btn--primary">Ver dúplex en venta<Icon name="arrow" /></Link><Link to="/en-construccion" className="btn btn--outline">Ver en construcción</Link></div>
          <div className="hero__availability"><span className="hero__availability-dot" /><Link to="/en-venta">{saleCount === 1 ? 'Última unidad disponible' : saleCount ? `${saleCount} unidades disponibles` : 'Conocé nuestros próximos proyectos'}</Link><WhatsAppButton variant="ghost">Consultar</WhatsAppButton></div>
        </div>
        <span className="hero__place">Córdoba, Argentina <span>01 / DSM</span></span>
      </div>
    </section>
    <section className="section delivered-section" data-home-section="entregados">
      <div className="wrap">
        <div className="section-heading"><span className="eyebrow">Obras entregadas</span><h2 className="display">La <span className="title-accent">confianza</span> también se ve<span className="red-dot">.</span></h2><p>{deliveredCount === 2 ? 'Dos' : deliveredCount} dúplex vendidos y entregados. Un compromiso que se convierte en hogares.</p></div>
        <DuplexListContainer category="entregado" columns={2} compact />
        <div className="section-footer"><Link to="/entregados" className="text-link">Conocer las obras entregadas<Icon name="arrow" /></Link></div>
      </div>
    </section>
    <section className="section construction-section" data-home-section="construccion">
      <div className="wrap">
        <div className="section-heading"><span className="eyebrow">En construcción</span><h2 className="display">Lo que viene,<br />ya está <span className="title-accent">en marcha</span><span className="red-dot">.</span></h2><p>{constructionCount === 3 ? 'Tres' : constructionCount} proyectos. La misma atención en cada detalle.</p></div>
        <DuplexListContainer category="construccion" compact />
        <div className="section-footer"><Link to="/en-construccion" className="text-link">Ver todos los proyectos<Icon name="arrow" /></Link></div>
      </div>
    </section>
    <LocalContent content={siteContent.home} />
    <div data-home-section="contacto"><ContactBand image /></div>
  </>;
}
