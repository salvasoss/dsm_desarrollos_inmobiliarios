import { useLocation } from 'react-router-dom';
import { getOneDuplex } from '../../data/duplexes';
import { propertyMessage } from '../../utils/whatsapp';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';
import './floatingWhatsApp.scss';

export default function FloatingWhatsApp() {
  const { pathname } = useLocation();
  const property = pathname.startsWith('/duplex/') ? getOneDuplex(pathname.split('/')[2]) : null;
  return <WhatsAppButton className="floating-whatsapp" message={property ? propertyMessage(property) : undefined} ariaLabel={property ? `Consultar por WhatsApp sobre ${property.title}` : 'Consultar por WhatsApp'}><span>Conversemos</span></WhatsAppButton>;
}
