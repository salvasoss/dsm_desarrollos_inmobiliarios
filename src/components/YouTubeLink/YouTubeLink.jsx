import { parseYouTubeUrl } from '../../utils/youtube';
import Icon from '../Icon/Icon';
import './youtubeLink.scss';

export default function YouTubeLink({ url, className = '', children = 'Ver recorrido en YouTube' }) {
  const video = parseYouTubeUrl(url);
  return video
    ? <a className={`btn btn--outline youtube-link ${className}`} href={video.watchUrl} target="_blank" rel="noopener noreferrer"><Icon name="play" />{children}<Icon name="diagonal" /></a>
    : <span className={`youtube-link youtube-link--pending ${className}`}><Icon name="play" /><span>Recorrido en YouTube · próximamente</span></span>;
}
