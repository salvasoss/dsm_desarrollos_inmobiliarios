import { getDuplexes } from '../../data/duplexes';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import DeliveredProject from '../../components/DeliveredProject/DeliveredProject';
import ContactBand from '../../components/ContactBand/ContactBand';
import LocalContent from '../../components/LocalContent/LocalContent';
import { siteContent } from '../../data/siteContent';
import './entregados.scss';

export default function Entregados() {
  const projects = getDuplexes('entregado');
  const count = projects.length;
  return <>
    <div className="wrap"><Breadcrumbs items={[{ label: 'Entregados' }]} /><header className="page-intro delivered-intro"><span className="eyebrow">Obras que hablan por nosotros · Córdoba</span><h1 className="display">Proyectos <span className="title-accent">Entregados</span><span className="red-dot">.</span></h1><p className="intro">{count === 2 ? 'Dos' : count} dúplex vendidos y entregados. Conocé los espacios, los detalles y las imágenes de los hogares construidos por DSM.</p></header><section className="delivered-catalog" aria-label="Dúplex vendidos y entregados">{projects.map((property, index) => <DeliveredProject key={property.id} property={property} index={index} />)}</section></div>
    <LocalContent content={siteContent.delivered} compact />
    <ContactBand title="El mismo compromiso. Tu próximo hogar." description="Conocé la unidad disponible y los proyectos en construcción. Te atendemos de forma directa por WhatsApp." buttonText="Consultar por nuevos proyectos" />
  </>;
}
