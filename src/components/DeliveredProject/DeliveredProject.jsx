import Facts from '../Facts/Facts';
import Icon from '../Icon/Icon';
import PhotoCollage from '../PhotoCollage/PhotoCollage';
import YouTubeLink from '../YouTubeLink/YouTubeLink';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';
import { propertyMessage } from '../../utils/whatsapp';
import './deliveredProject.scss';

export default function DeliveredProject({ property, index }) {
  return <article id={`proyecto-${property.id}`} className="delivered-project" aria-labelledby={`titulo-${property.id}`}>
    <header className="delivered-project__heading"><div><span className="delivered-project__status"><Icon name="check" />Vendido y entregado</span><h2 id={`titulo-${property.id}`}>{property.title}<span className="red-dot">.</span></h2><p className="delivered-project__location"><Icon name="pin" />{property.location}</p></div><p className="delivered-project__summary">{property.summary}</p><span className="delivered-project__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></header>
    <PhotoCollage property={property} />
    <Facts property={property} compact />
    <div className="delivered-project__information"><div><span className="eyebrow">El proyecto</span><p>{property.description}</p></div><ul>{property.features.map((feature) => <li key={feature}><Icon name="check" />{feature}</li>)}</ul></div>
    <div className="delivered-project__actions"><YouTubeLink url={property.youtubeTourUrl} /><WhatsAppButton message={propertyMessage(property)}>Consultar nuevos proyectos</WhatsAppButton></div>
  </article>;
}
