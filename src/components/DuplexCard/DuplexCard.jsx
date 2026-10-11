import { Link } from 'react-router-dom';
import Photo from '../Photo/Photo';
import AccentText from '../AccentText/AccentText';
import Facts from '../Facts/Facts';
import Icon from '../Icon/Icon';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';
import { propertyMessage } from '../../utils/whatsapp';
import './duplexCard.scss';

export default function DuplexCard({ duplex, compact = false }) {
  const delivered = duplex.category === 'entregado';
  const destination = delivered ? `/entregados#proyecto-${duplex.id}` : `/duplex/${duplex.id}`;
  return <article className={`duplex-card ${compact ? 'duplex-card--compact' : ''}`}>
    <Link to={destination} className="duplex-card__image-link" aria-label={`Ver ${duplex.name}${delivered ? ' en obras entregadas' : ''}`}>
      <Photo image={duplex.cover} context={duplex.name} position={duplex.imagePosition} className="duplex-card__image" />
      <span className="duplex-card__image-arrow" aria-hidden="true"><Icon name="diagonal" /></span>
    </Link>
    <div className="duplex-card__body">
      <span className={`duplex-card__status ${delivered ? 'duplex-card__status--delivered' : ''}`}>{delivered && <Icon name="check" />}{delivered ? 'Vendido y entregado' : duplex.label}</span>
      <h3><Link to={destination}><AccentText text={duplex.title} /><span className="red-dot">.</span></Link></h3>
      <p>{duplex.summary}</p>
      {!compact && <Facts property={duplex} compact />}
      <div className="duplex-card__actions">
        <Link to={destination} className="text-link">{delivered ? 'Ver proyecto' : 'Ver detalles'}<Icon name="arrow" /></Link>
        <WhatsAppButton variant={delivered ? 'ghost' : 'primary'} message={propertyMessage(duplex)} ariaLabel={`Consultar por WhatsApp sobre ${duplex.name}`}>{delivered ? 'Otros proyectos' : 'WhatsApp'}</WhatsAppButton>
      </div>
    </div>
  </article>;
}
