import { Link } from 'react-router-dom';
import Photo from '../Photo/Photo';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';
import { propertyMessage } from '../../utils/whatsapp';
import './contactBand.scss';

export default function ContactBand({ title = 'Conocé la calidad de DSM.', description = 'Te acompañamos a conocer la unidad en venta y nuestros próximos proyectos.', property, image = false, dark = false, buttonText = 'Conversemos por WhatsApp' }) {
  return <section className={`contact-band ${image ? 'contact-band--image' : ''} ${dark ? 'contact-band--dark' : ''}`} aria-label="Contactar a DSM">
    {image && <Photo image="interior" className="contact-band__image" />}
    <div className="wrap contact-band__inner">
      <div className="contact-band__copy"><span className="eyebrow">Hablemos de tu próximo hogar</span><h2 className="display">{title}</h2><p>{description}</p>
        <div className="actions"><WhatsAppButton message={property ? propertyMessage(property, 'visita') : undefined}>{buttonText}</WhatsAppButton><Link to="/contacto" className="contact-band__link">También podés dejarnos tu consulta</Link></div>
      </div>
      {!image && <span className="contact-band__mark" aria-hidden="true">DSM<span>.</span></span>}
    </div>
  </section>;
}
