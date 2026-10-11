import { useId } from 'react';
import { Link } from 'react-router-dom';
import AccentText from '../AccentText/AccentText';
import Icon from '../Icon/Icon';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';
import './localContent.scss';

export default function LocalContent({ content, compact = false }) {
  const id = useId();
  return <section className={`local-content ${compact ? 'local-content--compact' : ''}`} aria-labelledby={`local-content-${id}`}>
    <div className="wrap local-content__inner">
      <div className="local-content__copy"><span className="eyebrow">{content.eyebrow}</span><h2 id={`local-content-${id}`} className="display"><AccentText text={content.title} highlight={content.highlight} /><span className="red-dot">.</span></h2><p className="local-content__lead">{content.intro}</p>{content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="local-content__links">{content.links.map(({ to, label }) => <Link key={to} to={to} className="text-link">{label}<Icon name="arrow" /></Link>)}</div></div>
      <div className="local-content__questions"><span className="eyebrow">Antes de dar el próximo paso</span><h3>Conversamos sobre tu <span className="title-accent">hogar</span></h3>{content.questions.map(({ question, answer }, index) => <details key={question}><summary><span className="local-content__question-number">{String(index + 1).padStart(2, '0')}</span><span>{question}</span><Icon name="plus" /></summary><p>{answer}</p></details>)}<div className="local-content__contact"><p>Atención directa de DSM en Córdoba.</p><WhatsAppButton>Consultar por WhatsApp</WhatsAppButton></div></div>
    </div>
  </section>;
}
