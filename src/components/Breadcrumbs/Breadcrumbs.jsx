import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items }) {
  return <nav className="breadcrumbs" aria-label="Ubicación en el sitio">
    <Link to="/">Inicio</Link>
    {items.map((item, index) => <span className="breadcrumbs__item" key={`${item.label}-${index}`} style={{ display: 'contents' }}><span aria-hidden="true">/</span>{item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}
  </nav>;
}
