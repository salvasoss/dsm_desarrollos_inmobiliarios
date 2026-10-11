const keywords = /Docta|Córdoba|WhatsApp|Tipo [A-Z]|Proyecto \d+|calidad|diferencia|confianza|en marcha|construyendo|conocerlo|próximo hogar|hogar|proyectos?|entregados|espacios|recorrido|terminaciones|visita|buscando|listo|unidades|dúplex|página|compromiso|etapa|aberturas|pisos|baños|confort|estructura|posibilidades/i;

export default function AccentText({ text, highlight }) {
  if (typeof text !== 'string') return text;
  const keyword = highlight || text.match(keywords)?.[0];
  const start = keyword ? text.toLocaleLowerCase('es').indexOf(keyword.toLocaleLowerCase('es')) : -1;
  if (start < 0) return text;
  return <>{text.slice(0, start)}<span className="title-accent">{text.slice(start, start + keyword.length)}</span>{text.slice(start + keyword.length)}</>;
}
