import Icon from '../Icon/Icon';
import './facts.scss';

export default function Facts({ property, compact = false }) {
  return <ul className={`facts ${compact ? 'facts--compact' : ''}`} aria-label="Características principales">
    {(compact ? property.facts.slice(0, 3) : property.facts).map(({ icon, value }) => <li key={value}><Icon name={icon} /><span>{value}</span></li>)}
  </ul>;
}
