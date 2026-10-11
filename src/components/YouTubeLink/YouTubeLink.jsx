import { parseYouTubeUrl } from '../../utils/youtube';
import Icon from '../Icon/Icon';
import './youtubeLink.scss';

export default function YouTubeLink({ url, className = '', children = 'Ver recorrido en YouTube' }) {
  const video = parseYouTubeUrl(url);
  return video
    ? <a className={`btn btn--primary youtube-link ${className}`} href={video.watchUrl} target="_blank" rel="noopener noreferrer"><Icon name="play" />{children}<Icon name="diagonal" /></a>
    : <div className={`youtube-link youtube-link--pending ${className}`}><span className="youtube-link__play"><Icon name="play" /></span><div><strong>Recorrido en YouTube</strong><span>Próximamente</span></div></div>;
}
