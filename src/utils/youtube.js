const hosts = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com']);
const videoIdPattern = /^[A-Za-z0-9_-]{11}$/;
const playlistPattern = /^[A-Za-z0-9_-]{10,100}$/;

// Se aceptan URLs públicas de videos o playlists; no hace falta una clave de API.
export function parseYouTubeUrl(value = '') {
  if (!value || typeof value !== 'string') return null;
  try {
    const url = new URL(value.trim());
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.port) return null;
    let videoId = '';
    let playlistId = '';
    if (url.hostname === 'youtu.be') {
      videoId = url.pathname.split('/')[1] || '';
    } else if (hosts.has(url.hostname)) {
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts[0] === 'watch') videoId = url.searchParams.get('v') || '';
      else if (['embed', 'shorts', 'live'].includes(parts[0]) && parts[1] !== 'videoseries') videoId = parts[1] || '';
      playlistId = url.searchParams.get('list') || '';
    } else return null;
    if (videoIdPattern.test(videoId)) return { type: 'video', id: videoId, watchUrl: `https://www.youtube.com/watch?v=${videoId}` };
    if (playlistPattern.test(playlistId)) return { type: 'playlist', id: playlistId, watchUrl: `https://www.youtube.com/playlist?list=${playlistId}` };
    return null;
  } catch { return null; }
}

export function createYouTubeEmbedUrl(value, { autoplay = false } = {}) {
  const source = parseYouTubeUrl(value);
  if (!source) return null;
  const url = new URL(`https://www.youtube-nocookie.com/embed/${source.type === 'video' ? source.id : 'videoseries'}`);
  if (source.type === 'playlist') { url.searchParams.set('listType', 'playlist'); url.searchParams.set('list', source.id); }
  url.searchParams.set('autoplay', autoplay ? '1' : '0');
  url.searchParams.set('mute', autoplay ? '1' : '0');
  url.searchParams.set('playsinline', '1');
  url.searchParams.set('controls', '1');
  url.searchParams.set('rel', '0');
  url.searchParams.set('hl', 'es');
  return url.href;
}
