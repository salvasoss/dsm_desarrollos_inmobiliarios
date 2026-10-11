import { useEffect, useId, useRef, useState } from 'react';
import { site } from '../../config/site';
import { parseYouTubeUrl, createYouTubeEmbedUrl } from '../../utils/youtube';
import Photo from '../Photo/Photo';
import Icon from '../Icon/Icon';
import AccentText from '../AccentText/AccentText';
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
    <section className="video-tour-entry" aria-label={`Recorrido en video de ${property.title}`}><span className="video-tour-entry__icon" aria-hidden="true"><Icon name="play" /></span><div className="video-tour-entry__copy"><span className="eyebrow">Recorrido de la propiedad</span><h2>Conocé cada <span className="title-accent">espacio</span>.</h2><p>{video ? 'Recorré la propiedad en video y descubrí sus detalles.' : 'El recorrido se incorporará próximamente. Abrí la presentación del proyecto.'}</p></div><button type="button" className="btn btn--primary" onClick={() => setOpen(true)}><Icon name="play" />Ver recorrido en video<Icon name="arrow" /></button></section>
    <dialog ref={dialog} className="video-tour-dialog" aria-labelledby={`video-tour-title-${id}`} aria-describedby={`video-tour-description-${id}`} onCancel={close} onClose={close} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <header className="video-tour-dialog__heading"><div><span className="eyebrow">DSM · Recorrido en video</span><h2 id={`video-tour-title-${id}`}><AccentText text={property.title} /><span className="red-dot">.</span></h2></div><button type="button" autoFocus onClick={close} aria-label="Cerrar recorrido en video"><Icon name="close" /></button></header>
      <div className="video-tour-dialog__player">
        {open && video && !localFile
          ? <iframe src={embedUrl} title={`Recorrido de ${property.title} en YouTube`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
          : <div className="video-tour-dialog__poster"><Photo image={property.cover} context={property.name} className="video-tour-dialog__poster-image" /><div className="video-tour-dialog__poster-copy"><span className="video-tour-dialog__play" aria-hidden="true"><Icon name="play" /></span><h3><AccentText text={video ? 'Conocé sus espacios.' : 'Próximamente, el recorrido.'} /></h3><p>{video ? 'Abrí el video completo en YouTube.' : 'Mientras preparamos el video, descubrí las imágenes y los detalles de esta obra.'}</p>{video && <a className="btn btn--primary" href={video.watchUrl} target="_blank" rel="noopener noreferrer"><Icon name="play" />Ver en YouTube</a>}</div></div>}
      </div>
      <footer className="video-tour-dialog__footer"><p id={`video-tour-description-${id}`}>{video ? localFile ? 'Abrí el recorrido completo en YouTube.' : 'El recorrido comienza sin sonido. Podés activarlo desde el reproductor.' : 'Recorrido disponible próximamente.'}</p><div>{video && <a href={video.watchUrl} target="_blank" rel="noopener noreferrer">Abrir en YouTube<Icon name="diagonal" /></a>}<button type="button" className="btn btn--primary" onClick={close}>Seguir viendo la ficha<Icon name="arrow" /></button></div></footer>
    </dialog>
  </>;
}
