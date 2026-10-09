import { Link } from 'react-router-dom';
import Photo from '../Photo/Photo';
import Facts from '../Facts/Facts';
import Icon from '../Icon/Icon';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';
import { propertyMessage } from '../../utils/whatsapp';
import './featuredDuplex.scss';

export default function FeaturedDuplex({ duplex, lastUnit = false }) {
  return <article className="featured-duplex">
    <Link to={`/duplex/${duplex.id}`} className="featured-duplex__image-link" aria-label={`Ver la ficha de ${duplex.name}`}><Photo image={duplex.cover} priority className="featured-duplex__image" /><span className="featured-duplex__image-label">Conocé cada detalle <Icon name="diagonal" /></span></Link>
    <div className="featured-duplex__content">
      <span className="eyebrow">{lastUnit ? 'Última unidad disponible' : 'Unidad disponible'}</span>
      <h2>{duplex.title}<span className="red-dot">.</span></h2>
      <span className="featured-duplex__location"><Icon name="pin" />{duplex.location}</span>
      <Facts property={duplex} />
      <p>{duplex.summary}</p>
      <WhatsAppButton message={propertyMessage(duplex, 'visita')}>Coordinar una visita</WhatsAppButton>
      <Link to={`/duplex/${duplex.id}`} className="btn btn--outline">Ver la ficha completa<Icon name="arrow" /></Link>
      <span className="featured-duplex__note">Atención directa. Conocelo en persona.</span>
    </div>
  </article>;
}
