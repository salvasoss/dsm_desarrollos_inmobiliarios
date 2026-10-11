import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';
import ContactForm from '../../components/ContactForm/ContactForm';
import Photo from '../../components/Photo/Photo';
import LocalContent from '../../components/LocalContent/LocalContent';
import { siteContent } from '../../data/siteContent';
import Icon from '../../components/Icon/Icon';
import { site } from '../../config/site';
import './contacto.scss';

export default function Contacto() {
  return <><div className="wrap">
    <Breadcrumbs items={[{ label: 'Contacto' }]} />
    <header className="page-intro"><span className="eyebrow">Atención directa · DSM</span><h1 className="display">Tu próxima etapa<br />empieza con una <span className="title-accent">charla</span><span className="red-dot">.</span></h1><p className="intro">Consultá por el dúplex disponible, conocé los proyectos en construcción o coordiná una visita. Hablemos de tu próximo hogar.</p></header>
    <div className="contact-page">
      <div className="contact-page__direct"><Photo image="interior" className="contact-page__image" /><div className="contact-page__information"><span className="eyebrow">Conversemos</span><h2>Te atendemos<br />por <span className="title-accent">WhatsApp</span><span className="red-dot">.</span></h2><p>Consultas y visitas con atención directa de DSM.</p>{site.whatsappNumber && <span className="contact-page__number">{site.whatsappDisplayNumber}</span>}<WhatsAppButton>Escribir por WhatsApp</WhatsAppButton><span className="contact-page__location"><Icon name="pin" />{site.location}</span></div></div>
      <ContactForm />
    </div>
  </div><LocalContent content={siteContent.contact} compact /></>;
}
