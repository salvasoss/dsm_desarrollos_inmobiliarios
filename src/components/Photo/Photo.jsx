import { media } from '../../data/media';
import './photo.scss';

export default function Photo({ image, className = '', priority = false, position, onClick, label }) {
  const item = typeof image === 'string' ? media[image] : image;
  if (!item) return null;
  const photo = <>
    <img src={item.src} alt={item.alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" style={position ? { objectPosition: position } : undefined} width="1774" height="941" />
    {item.illustrative && <span className="photo__note">Imagen ilustrativa</span>}
  </>;
  return onClick
    ? <button type="button" className={`photo photo--button ${className}`} onClick={onClick} aria-label={label || 'Ampliar imagen'}>{photo}</button>
    : <figure className={`photo ${className}`}>{photo}</figure>;
}
