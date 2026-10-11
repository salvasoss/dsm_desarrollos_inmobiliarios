import { Link } from 'react-router-dom';
import { getDuplexes } from '../../data/duplexes';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import FeaturedDuplex from '../../components/FeaturedDuplex/FeaturedDuplex';
import Photo from '../../components/Photo/Photo';
import Icon from '../../components/Icon/Icon';
import LocalContent from '../../components/LocalContent/LocalContent';
import { siteContent } from '../../data/siteContent';
import ContactBand from '../../components/ContactBand/ContactBand';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';
import './enVenta.scss';

export default function EnVenta() {
  const properties = getDuplexes('venta');
  const single = properties.length === 1;
  const featured = properties[0];
  return <>
    <div className="wrap">
      <Breadcrumbs items={[{ label: 'En venta' }]} />
      <header className="page-intro sale-intro"><span className="eyebrow">En venta {featured ? `· ${featured.location.split(' · ')[0]}` : ''}</span><h1 className="display">{single ? <>Una unidad.<br />Cada <span className="title-accent">detalle</span>, a otro nivel<span className="red-dot">.</span></> : <>Tu próximo <span className="title-accent">hogar</span>,<br />con la calidad de DSM<span className="red-dot">.</span></>}</h1><p className="intro">{single ? 'La última unidad disponible. Espacios generosos, materiales seleccionados y el cuidado que distingue a una obra de DSM.' : 'Conocé nuestras unidades disponibles y coordiná una visita para apreciar cada detalle.'}</p></header>
      {properties.length ? <div className="sale-list">{properties.map((duplex) => <FeaturedDuplex key={duplex.id} duplex={duplex} lastUnit={single} />)}</div> : <div className="empty-state"><h2>Próximamente, nuevas <span className="title-accent">unidades</span>.</h2><p>Consultanos por nuestros proyectos en construcción.</p><WhatsAppButton /></div>}
    </div>
    {featured?.specs?.length > 0 && <section className="section sale-quality"><div className="wrap">
      <div className="section-heading sale-quality__heading"><div><span className="eyebrow">La diferencia está en los detalles</span><h2 className="display">La <span className="title-accent">calidad</span> está<br />en lo que elegimos<span className="red-dot">.</span></h2></div><p>Desde la estructura hasta las terminaciones. Conocé los materiales y el equipamiento del dúplex disponible.</p></div>
      <div className="sale-quality__images"><Photo image="interior" className="sale-quality__main" /><Photo image="exterior" className="sale-quality__detail" position="58% center" /></div>
      <div className="sale-quality__features"><span><Icon name="check" />Aberturas con DVH</span><span><Icon name="check" />Calefacción por radiadores</span><span><Icon name="check" />Terminaciones seleccionadas</span><Link to={`/duplex/${featured.id}#materiales`} className="text-link">Conocer los materiales<Icon name="arrow" /></Link></div>
    </div></section>}
    <LocalContent content={siteContent.sale} />
    <ContactBand dark title="Vale la pena conocerlo." description="Una visita es la mejor forma de apreciar los espacios, las terminaciones y la calidad de una obra de DSM." property={featured} buttonText="Coordinar visita por WhatsApp" />
  </>;
}
