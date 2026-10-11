import { Link } from 'react-router-dom';
import { getDuplexes } from '../../data/duplexes';
import AccentText from '../AccentText/AccentText';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Gallery from '../Gallery/Gallery';
import VideoTour from '../VideoTour/VideoTour';
import Facts from '../Facts/Facts';
import Photo from '../Photo/Photo';
import Icon from '../Icon/Icon';
import DuplexList from '../DuplexList/DuplexList';
import ContactBand from '../ContactBand/ContactBand';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';
import { propertyMessage } from '../../utils/whatsapp';
import './duplexDetail.scss';

const categories = {
  venta: { label: 'En venta', path: '/en-venta' },
  construccion: { label: 'En construcción', path: '/en-construccion' },
  entregado: { label: 'Entregados', path: '/entregados' },
};

export default function DuplexDetail({ duplex }) {
  const category = categories[duplex.category];
  const sold = duplex.category === 'entregado';
  const available = duplex.category === 'venta';
  const related = getDuplexes(duplex.category).filter((item) => item.id !== duplex.id).slice(0, 2);
  const saleCount = getDuplexes('venta').length;
  return <>
    <div className="wrap">
      <Breadcrumbs items={[{ label: category.label, to: category.path }, { label: duplex.title }]} />
      <header className="detail-heading"><div><span className="eyebrow">{available ? 'Una obra para tu próxima etapa' : sold ? 'Obra realizada por DSM' : 'Proyecto en desarrollo'}</span><h1 className="display"><AccentText text={duplex.title} /><span className="red-dot">.</span></h1><p><Icon name="pin" />{duplex.location}</p></div><span className={`detail-heading__status ${sold ? 'detail-heading__status--sold' : ''}`}>{sold && <Icon name="check" />}{sold ? 'Vendido y entregado' : available && saleCount === 1 ? 'Última unidad disponible' : duplex.label}</span></header>
      <VideoTour property={duplex} />
      <Gallery property={duplex} />
      <div className="detail-facts"><Facts property={duplex} /></div>
      <section className="detail-description"><div><span className="eyebrow">Los espacios</span><h2 className="display">Pensado para<br /><span className="title-accent">vivirlo</span> cada día<span className="red-dot">.</span></h2></div><div><p>{duplex.description}</p><ul>{duplex.features.map((feature) => <li key={feature}><Icon name="check" />{feature}</li>)}</ul><WhatsAppButton variant="ghost" message={propertyMessage(duplex)}>Consultar por este dúplex<Icon name="arrow" /></WhatsAppButton></div></section>
      {duplex.specs?.length > 0 && <section id="materiales" className="detail-materials"><Photo image="interior" className="detail-materials__image" position="30% center" /><div className="detail-materials__content"><span className="eyebrow">Materiales y terminaciones</span><h2 className="display">Detalles que hacen<br />la <span className="title-accent">diferencia</span><span className="red-dot">.</span></h2><div className="detail-materials__list">{duplex.specs.map(([title, description]) => <div key={title}><Icon name="material" /><div><h3><AccentText text={title} /></h3><p>{description}</p></div></div>)}</div></div></section>}
      {duplex.videoUrl && <section className="detail-video"><span className="eyebrow">Recorrido de la propiedad</span><h2 className="display">Conocé sus <span className="title-accent">espacios</span>.</h2><video controls preload="metadata" poster={duplex.videoPoster || undefined} src={duplex.videoUrl} aria-label={`Recorrido de ${duplex.title}`}>{duplex.videoCaptions && <track kind="captions" src={duplex.videoCaptions} srcLang="es" label="Español" default />}Tu navegador no permite reproducir este video.</video></section>}
      {related.length > 0 && <section className="detail-related"><div className="section-heading"><span className="eyebrow">Más obras de DSM</span><h2 className="display"><AccentText text={sold ? 'Más proyectos entregados.' : 'Conocé otros proyectos.'} /></h2></div><DuplexList duplexes={related} columns={2} compact /></section>}
      <div className="detail-back"><Link to={category.path} className="text-link"><Icon name="left" />Volver a {category.label.toLowerCase()}</Link></div>
    </div>
    <ContactBand title={sold ? 'La misma calidad. Nuevos proyectos.' : available ? 'Tu próxima etapa, con la calidad de DSM.' : 'Conversemos sobre este proyecto.'} description={sold ? 'Conocé la unidad disponible y los proyectos que estamos construyendo.' : available ? 'Coordiná una visita. Te acompañamos a conocer los espacios y las terminaciones.' : 'Consultanos por sus características, ubicación y avances.'} property={duplex} buttonText={sold ? 'Consultar nuevos proyectos' : available ? 'Coordinar visita por WhatsApp' : 'Consultar por WhatsApp'} />
  </>;
}
