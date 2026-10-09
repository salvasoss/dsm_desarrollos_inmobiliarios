import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { site } from '../../config/site';
import { createWhatsAppUrl } from '../../utils/whatsapp';
import Icon from '../Icon/Icon';
import './whatsAppButton.scss';

const WhatsAppContext = createContext(null);

export function useWhatsApp() { return useContext(WhatsAppContext); }

export function WhatsAppProvider({ children }) {
  const [message, setMessage] = useState(null);
  const [copied, setCopied] = useState(false);
  const dialog = useRef(null);
  const textarea = useRef(null);
  useEffect(() => {
    if (message !== null && !dialog.current.open) dialog.current.showModal();
    if (message === null && dialog.current.open) dialog.current.close();
  }, [message]);

  function prepareMessage(value) { setCopied(false); setMessage(value); }
  function closeDialog() { setMessage(null); }
  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      textarea.current.focus();
      textarea.current.select();
      setCopied(document.execCommand('copy'));
    }
  }
  return <WhatsAppContext.Provider value={{ prepareMessage }}>
    {children}
    <dialog ref={dialog} className="contact-dialog" aria-labelledby="contact-dialog-title" aria-describedby="contact-dialog-description" onCancel={closeDialog} onClose={closeDialog} onClick={(event) => { if (event.target === event.currentTarget) closeDialog(); }}>
      <div className="contact-dialog__inner">
        <button type="button" className="contact-dialog__close" onClick={closeDialog} aria-label="Cerrar consulta"><Icon name="close" /></button>
        <span className="eyebrow">Consulta por WhatsApp</span>
        <h2 id="contact-dialog-title">Tu mensaje está listo<span className="red-dot">.</span></h2>
        <p id="contact-dialog-description">Esta versión de muestra todavía no tiene un número de contacto asignado. Podés revisar y copiar tu consulta.</p>
        <textarea ref={textarea} aria-label="Mensaje de consulta" value={message || ''} readOnly rows={6} />
        <button type="button" className="btn btn--primary" onClick={copyMessage}><Icon name={copied ? 'check' : 'copy'} />{copied ? 'Mensaje copiado' : 'Copiar consulta'}</button>
        <span className="contact-dialog__feedback" role="status">{copied ? 'El mensaje se copió al portapapeles.' : ''}</span>
      </div>
    </dialog>
  </WhatsAppContext.Provider>;
}

export default function WhatsAppButton({ message = site.generalMessage, children = 'Consultar por WhatsApp', variant = 'primary', className = '', icon = true, ariaLabel }) {
  const { prepareMessage } = useWhatsApp();
  const href = createWhatsAppUrl(site.whatsappNumber, message);
  const content = <>{icon && <Icon name="whatsapp" />}{children}</>;
  const classes = `btn btn--${variant} whatsapp-button ${className}`;
  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>{content}</a>
    : <button type="button" className={classes} onClick={() => prepareMessage(message)} aria-label={ariaLabel}>{content}</button>;
}
