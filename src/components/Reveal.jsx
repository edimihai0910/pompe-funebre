import { useReveal } from '../hooks/useReveal'

/**
 * Reveal — invelis care ridica bland continutul in pagina cand devine vizibil.
 * `delay` (ms) permite intrarea in cascada a mai multor elemente.
 * `as` alege eticheta HTML redata (implicit div).
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  style = {},
  ...rest
}) {
  const [ref, visible] = useReveal()

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
