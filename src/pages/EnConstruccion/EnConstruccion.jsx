import { getDuplexes } from '../../data/duplexes';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import DuplexListContainer from '../../components/DuplexListContainer/DuplexListContainer';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';
import ContactBand from '../../components/ContactBand/ContactBand';
import './enConstruccion.scss';

export default function EnConstruccion() {
  const count = getDuplexes('construccion').length;
  return <>
    <div className="wrap"><Breadcrumbs items={[{ label: 'En construcción' }]} /><header className="page-intro"><span className="eyebrow">La próxima etapa de DSM</span><h1 className="display">Lo que viene,<br />ya está en marcha<span className="red-dot">.</span></h1><p className="intro">{count === 3 ? 'Tres' : count} proyectos en construcción. Conocé sus espacios y consultanos por las características y los avances de cada obra.</p><WhatsAppButton className="construction-intro__contact" message="Hola DSM, quisiera recibir información sobre sus dúplex en construcción y los avances de las obras.">Consultar los proyectos</WhatsAppButton></header></div>
    <section className="construction-catalog"><div className="wrap"><DuplexListContainer category="construccion" /><p className="catalog-note">Las imágenes son ilustrativas. Consultá por la ubicación y el estado actual de cada obra.</p></div></section>
    <ContactBand title="Conocé lo que estamos construyendo." description="Escribinos y conversamos sobre la distribución, las características y el avance del proyecto que te interesa." buttonText="Consultar por WhatsApp" />
  </>;
}
