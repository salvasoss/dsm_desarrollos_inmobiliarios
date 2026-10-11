import { getDuplexes } from '../../data/duplexes';
import DuplexList from '../DuplexList/DuplexList';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';

export default function DuplexListContainer({ category, compact = false, columns = 3 }) {
  const duplexes = getDuplexes(category);
  if (!duplexes.length) return <div className="empty-state"><h2>Pronto, nuevos <span className="title-accent">proyectos</span>.</h2><p>Conversemos para que puedas conocer las próximas novedades de DSM.</p><WhatsAppButton /></div>;
  return <DuplexList duplexes={duplexes} compact={compact} columns={columns} />;
}
