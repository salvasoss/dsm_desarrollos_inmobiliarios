import { Link } from 'react-router-dom';
import AccentText from '../../components/AccentText/AccentText';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';
import './notFound.scss';

export default function NotFound({ property = false }) {
  return <section className="wrap not-found"><span className="eyebrow">DSM · Desarrollos Inmobiliarios</span><h1 className="display"><AccentText text={property ? 'No encontramos ese dúplex.' : 'No encontramos esta página.'} /></h1><p>Podés volver a nuestros proyectos o escribirnos para que te ayudemos.</p><div className="actions"><Link to="/en-venta" className="btn btn--outline">Ver dúplex en venta</Link><WhatsAppButton /></div></section>;
}
