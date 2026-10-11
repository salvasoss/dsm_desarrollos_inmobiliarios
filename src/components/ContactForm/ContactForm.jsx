import { useState } from 'react';
import { getDuplexes } from '../../data/duplexes';
import { site } from '../../config/site';
import { createWhatsAppUrl, formMessage } from '../../utils/whatsapp';
import { useWhatsApp } from '../WhatsAppButton/WhatsAppButton';
import Icon from '../Icon/Icon';
import './contactForm.scss';

export default function ContactForm() {
  const [values, setValues] = useState({ name: '', phone: '', interest: '', message: '' });
  const { prepareMessage } = useWhatsApp();
  const available = getDuplexes().filter((item) => item.category !== 'entregado');
  function changeValue(event) {
    event.target.setCustomValidity('');
    setValues((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  }
  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (values.name.trim().length < 2) { form.elements.name.setCustomValidity('Ingresá tu nombre.'); form.elements.name.reportValidity(); return; }
    if (values.message.trim().length < 5) { form.elements.message.setCustomValidity('Contanos un poco más sobre tu consulta.'); form.elements.message.reportValidity(); return; }
    const message = formMessage(values);
    const href = createWhatsAppUrl(site.whatsappNumber, message);
    if (href) window.open(href, '_blank', 'noopener,noreferrer');
    else prepareMessage(message);
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="contact-form__heading"><span className="eyebrow">Tu consulta</span><h2>Contanos qué estás <span className="title-accent">buscando</span><span className="red-dot">.</span></h2><p>Completá el formulario y conversemos por WhatsApp.</p></div>
    <div className="contact-form__row">
      <div className="contact-form__field"><label htmlFor="contact-name">Tu nombre <span aria-hidden="true">*</span></label><input id="contact-name" name="name" type="text" placeholder="Nombre y apellido" autoComplete="name" value={values.name} onChange={changeValue} minLength={2} maxLength={80} required /></div>
      <div className="contact-form__field"><label htmlFor="contact-phone">Teléfono <span className="contact-form__optional">(opcional)</span></label><input id="contact-phone" name="phone" type="tel" placeholder="Código de área y número" autoComplete="tel" value={values.phone} onChange={changeValue} maxLength={30} /></div>
    </div>
    <div className="contact-form__field"><label htmlFor="contact-interest">Me interesa <span aria-hidden="true">*</span></label><select id="contact-interest" name="interest" value={values.interest} onChange={changeValue} required><option value="" disabled>Elegí una opción</option><option value="Consulta general sobre DSM">Conocer DSM y sus proyectos</option>{available.map((property) => <option key={property.id} value={`${property.name} (${property.label})`}>{property.title} · {property.label}</option>)}</select></div>
    <div className="contact-form__field"><label htmlFor="contact-message">Tu mensaje <span aria-hidden="true">*</span></label><textarea id="contact-message" name="message" placeholder="Quiero conocer el dúplex, coordinar una visita o consultar por un proyecto..." rows={5} minLength={5} maxLength={2000} value={values.message} onChange={changeValue} required /></div>
    <button type="submit" className="btn btn--primary"><Icon name="whatsapp" />Continuar en WhatsApp<Icon name="arrow" /></button>
    <p className="contact-form__note">El formulario prepara tu mensaje. Vos decidís cuándo enviarlo en WhatsApp.</p>
  </form>;
}
