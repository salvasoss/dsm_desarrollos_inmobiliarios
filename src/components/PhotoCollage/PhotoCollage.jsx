import { useId, useRef, useState } from 'react';
import { media } from '../../data/media';
import Photo from '../Photo/Photo';
import Icon from '../Icon/Icon';
import './photoCollage.scss';

export default function PhotoCollage({ property }) {
  const [current, setCurrent] = useState(0);
  const dialog = useRef(null);
  const id = useId();
  const images = property.gallery.map((key) => typeof key === 'string' ? media[key] : key).filter(Boolean);
  if (!images.length) return null;
  function openImage(index) { setCurrent(index); dialog.current.showModal(); }
  function changeImage(direction) { setCurrent((index) => (index + direction + images.length) % images.length); }
  return <>
    <div className={`photo-collage photo-collage--${Math.min(images.length, 4)}`} aria-label={`Imágenes de ${property.title}`}>
      {images.map((image, index) => <div key={`${image.src}-${index}`} className={`photo-collage__cell ${index === 0 ? 'photo-collage__cell--main' : ''}`}><Photo image={image} onClick={() => openImage(index)} label={`Ampliar imagen ${index + 1} de ${property.title}`} className="photo-collage__photo" /><span className="photo-collage__expand" aria-hidden="true"><Icon name="expand" /></span></div>)}
    </div>
    <div className="photo-collage__caption"><span>{images.length} imágenes del proyecto</span><button type="button" onClick={() => openImage(0)}>Ver galería completa<Icon name="arrow" /></button></div>
    <dialog ref={dialog} className="collage-dialog" aria-labelledby={`collage-title-${id}`} onClick={(event) => { if (event.target === event.currentTarget) dialog.current.close(); }} onKeyDown={(event) => { if (event.key === 'ArrowRight') { event.preventDefault(); changeImage(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); changeImage(-1); } }}>
      <div className="collage-dialog__heading"><h3 id={`collage-title-${id}`}>{property.title}</h3><button type="button" aria-label="Cerrar galería del proyecto" onClick={() => dialog.current.close()}><Icon name="close" /></button></div>
      <div className="collage-dialog__image"><img src={images[current].src} alt={images[current].alt} />{images[current].illustrative && <span>Imagen ilustrativa</span>}</div>
      <div className="collage-dialog__controls">{images.length > 1 && <button type="button" aria-label="Imagen anterior" onClick={() => changeImage(-1)}><Icon name="left" /></button>}<span aria-live="polite">{current + 1} / {images.length}</span>{images.length > 1 && <button type="button" aria-label="Imagen siguiente" onClick={() => changeImage(1)}><Icon name="right" /></button>}</div>
    </dialog>
  </>;
}
