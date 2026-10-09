import { useEffect, useId, useRef, useState } from 'react';
import { site } from '../../config/site';
import { parseYouTubeUrl, createYouTubeEmbedUrl } from '../../utils/youtube';
import Photo from '../Photo/Photo';
import Icon from '../Icon/Icon';
import './videoTour.scss';

export default function VideoTour({ property }) {
  const [open, setOpen] = useState(true);
  const dialog = useRef(null);
  const id = useId();
  const sourceUrl = property.youtubeTourUrl || site.youtubeTourUrl;
  const video = parseYouTubeUrl(sourceUrl);
  const localFile = typeof window !== 'undefined' && window.location.protocol === 'file:';
  const embedUrl = createYouTubeEmbedUrl(sourceUrl, { autoplay: true });

  // Cada ficha monta su propia instancia: se abre de nuevo al entrar en otra obra.
  useEffect(() => {
    if (open && !dialog.current.open) dialog.current.showModal();
    if (!open && dialog.current.open) dialog.current.close();
  }, [open]);
  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  function close() { setOpen(false); }
  return <>
    <div className="video-tour-entry"><div><Icon name="play" /><span>Un recorrido para conocer sus espacios.</span></div><button type="button" className="text-link" onClick={() => setOpen(true)}>Ver recorrido<Icon name="arrow" /></button></div>
    <dialog ref={dialog} className="video-tour-dialog" aria-labelledby={`video-tour-title-${id}`} aria-describedby={`video-tour-description-${id}`} onCancel={close} onClose={close} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <header className="video-tour-dialog__heading"><div><span className="eyebrow">DSM · Recorrido en video</span><h2 id={`video-tour-title-${id}`}>{property.title}<span className="red-dot">.</span></h2></div><button type="button" autoFocus onClick={close} aria-label="Cerrar recorrido en video"><Icon name="close" /></button></header>
      <div className="video-tour-dialog__player">
        {open && video && !localFile
          ? <iframe src={embedUrl} title={`Recorrido de ${property.title} en YouTube`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
          : <div className="video-tour-dialog__poster"><Photo image={property.cover} className="video-tour-dialog__poster-image" /><div className="video-tour-dialog__poster-copy"><span className="video-tour-dialog__play" aria-hidden="true"><Icon name="play" /></span><h3>{video ? 'Conocé sus espacios.' : 'Próximamente, el recorrido.'}</h3><p>{video ? 'Abrí el video completo en YouTube.' : 'Mientras preparamos el video, descubrí las imágenes y los detalles de esta obra.'}</p>{video && <a className="btn btn--primary" href={video.watchUrl} target="_blank" rel="noopener noreferrer"><Icon name="play" />Ver en YouTube</a>}</div></div>}
      </div>
      <footer className="video-tour-dialog__footer"><p id={`video-tour-description-${id}`}>{video ? localFile ? 'Abrí el recorrido completo en YouTube.' : 'El recorrido comienza sin sonido. Podés activarlo desde el reproductor.' : 'Recorrido disponible próximamente.'}</p><div>{video && <a href={video.watchUrl} target="_blank" rel="noopener noreferrer">Abrir en YouTube<Icon name="diagonal" /></a>}<button type="button" className="btn btn--primary" onClick={close}>Seguir viendo la ficha<Icon name="arrow" /></button></div></footer>
    </dialog>
  </>;
}
