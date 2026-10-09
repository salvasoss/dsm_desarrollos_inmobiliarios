const paths = {
  play: <><path d="m10 7 7 5-7 5Z" /><rect x="2" y="4" width="20" height="16" rx="3" /></>,
  arrow: <><path d="M4 12h15M14 6l6 6-6 6" /></>,
  diagonal: <><path d="M6 18 18 6M6 6h12v12" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  bed: <><path d="M3 18V7m18 11v-6H3m0 4h18M6 12V8h6v4m0 0V8h6v4" /></>,
  bath: <><path d="M3 12h18l-1 5a3 3 0 0 1-3 2H7a3 3 0 0 1-3-2ZM6 12V5a2 2 0 0 1 4 0v1M6 19v2m12-2v2" /></>,
  car: <><path d="m4 10 2-6h12l2 6m-17 0h18v8H3Zm2 8v2m14-2v2M6 14h2m8 0h2" /></>,
  area: <><path d="M4 4h16v16H4Zm0 8h6V4m0 8v8" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  left: <path d="m14 6-6 6 6 6" />,
  right: <path d="m10 6 6 6-6 6" />,
  expand: <><path d="M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6" /></>,
  copy: <><path d="M8 8h12v13H8ZM16 8V3H3v13h5" /></>,
  material: <><path d="m12 3 9 5-9 5-9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" /></>,
};

export default function Icon({ name, className = '' }) {
  if (name === 'whatsapp') {
    return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a9 9 0 0 1-13.4 7.9L3 21l1.5-4.6A9 9 0 1 1 21 11.5Z" /><path d="M8.2 7.5c-.7 1.2.2 3.4 1.9 5.1s3.9 2.6 5.1 1.9l.8-1.3-2.3-1.1-.8.8c-1-.3-2.3-1.6-2.6-2.6l.8-.8L10 7.2Z" /></svg>;
  }
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.arrow}</svg>;
}
