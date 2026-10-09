import { Navigate, useParams } from 'react-router-dom';
import { getOneDuplex } from '../../data/duplexes';
import DuplexDetail from '../DuplexDetail/DuplexDetail';
import NotFound from '../../pages/NotFound/NotFound';

export default function DuplexDetailContainer() {
  const { duplexId } = useParams();
  const duplex = getOneDuplex(duplexId);
  if (duplex?.category === 'entregado') {
    return <Navigate to={`/entregados#proyecto-${duplex.id}`} replace />;
  }
  // Resolver por el parámetro actual evita conservar la ficha anterior al navegar.
  return duplex ? <DuplexDetail key={duplex.id} duplex={duplex} /> : <NotFound property />;
}
