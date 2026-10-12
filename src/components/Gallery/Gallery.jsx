import { useRef, useState } from 'react';
import { media } from '../../data/media';
import Photo from '../Photo/Photo';
import Icon from '../Icon/Icon';
import AccentText from '../AccentText/AccentText';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';
import { propertyMessage } from '../../utils/whatsapp';
import './gallery.scss';

export default function Gallery({ property }) {
  const [current, setCurrent] = useState(0);
  const dialog = useRef(null);
  const images = property.gallery.map((key) => typeof key === 'string' ? media[key] : key).filter(Boolean);
  if (!images.length) return null;
  const available = property.category === 'venta';
  const completed = property.category === 'entregado';
  function openImage(index) { setCurrent(index); dialog.current.showModal(); }
  function changeImage(direction) { setCurrent((index) => (index + direction + images.length) % images.length); }

  return <>
    <div className="gallery">
      <div className="gallery__main"><Photo image={images[0]} priority onClick={() => openImage(0)} context={property.name} className="gallery__cover" label={`Ampliar imagen principal de ${property.title}`} /><span className="gallery__expand" aria-hidden="true"><Icon name="expand" />Ver galería · {images.length} {images.length === 1 ? 'imagen' : 'imágenes'}</span></div>
      <div className="gallery__side">
        {images.length > 1 && <div className="gallery__thumbnails">{images.slice(1, 3).map((image, index) => <Photo key={image.src} image={image} onClick={() => openImage(index + 1)} label={`Ampliar imagen ${index + 2} de ${property.title}`} />)}</div>}
        <div className={`gallery__contact ${images.length === 1 ? 'gallery__contact--full' : ''}`}>
          <span className="eyebrow">{available ? 'Conocelo en persona' : completed ? 'El compromiso de DSM' : 'Conocé el proyecto'}</span>
          <h2><AccentText text={available ? 'La calidad se aprecia de cerca.' : completed ? 'Una obra terminada. Nuevas posibilidades.' : 'La próxima etapa empieza acá.'} /></h2>
          <p>{available ? 'Coordiná una visita y descubrí cada detalle.' : completed ? 'Consultanos por nuestros proyectos disponibles.' : 'Escribinos para conocer las características y el avance de esta obra.'}</p>
          <WhatsAppButton message={propertyMessage(property, available ? 'visita' : 'consulta')}>{available ? 'Coordinar una visita' : completed ? 'Consultar nuevos proyectos' : 'Consultar este proyecto'}</WhatsAppButton>
        </div>
      </div>
    </div>
    <dialog ref={dialog} className="gallery-dialog" aria-label={`Galería de ${property.title}`} onClick={(event) => { if (event.target === event.currentTarget) dialog.current.close(); }} onKeyDown={(event) => { if (event.key === 'ArrowRight') { event.preventDefault(); changeImage(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); changeImage(-1); } }}>
      <button type="button" className="gallery-dialog__close" aria-label="Cerrar galería" onClick={() => dialog.current.close()}><Icon name="close" /></button>
      <div className="gallery-dialog__photo"><img src={images[current].src} alt={images[current].alt} title={`${property.title} · ${images[current].alt}`} width={images[current].width} height={images[current].height} />{images[current].illustrative && <span>Imagen ilustrativa</span>}</div>
      <div className="gallery-dialog__controls">
        {images.length > 1 && <button type="button" onClick={() => changeImage(-1)} aria-label="Imagen anterior"><Icon name="left" /></button>}
        <span aria-live="polite">{current + 1} / {images.length}</span>
        {images.length > 1 && <button type="button" onClick={() => changeImage(1)} aria-label="Imagen siguiente"><Icon name="right" /></button>}
      </div>
    </dialog>
  </>;
}
