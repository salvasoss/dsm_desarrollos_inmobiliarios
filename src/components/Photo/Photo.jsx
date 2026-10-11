import { media } from '../../data/media';
import './photo.scss';

export default function Photo({ image, className = '', priority = false, position, onClick, label, context }) {
  const item = typeof image === 'string' ? media[image] : image;
  if (!item) return null;
  const description = `${item.alt}${context ? ` ${item.illustrative ? 'Referencia ilustrativa para' : 'Proyecto'} ${context}.` : ''}`;
  const photo = <>
    <img src={item.src} alt={description} title={item.title || description} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" style={position ? { objectPosition: position } : undefined} width={item.width} height={item.height} />
    {item.illustrative && <span className="photo__note">Imagen ilustrativa</span>}
  </>;
  return onClick
    ? <button type="button" className={`photo photo--button ${className}`} onClick={onClick} aria-label={label || 'Ampliar imagen'}>{photo}</button>
    : <figure className={`photo ${className}`}>{photo}</figure>;
}
