import DuplexCard from '../DuplexCard/DuplexCard';
import './duplexList.scss';

export default function DuplexList({ duplexes, compact = false, columns = 3 }) {
  return <div className={`duplex-list duplex-list--${columns}`}>
    {duplexes.map((duplex) => <DuplexCard key={duplex.id} duplex={duplex} compact={compact} />)}
  </div>;
}
