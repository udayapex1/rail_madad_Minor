/**
 * Wrapper for Google Material Symbols icon font.
 * Eliminates the verbose fontVariationSettings boilerplate.
 *
 * @param {string}  name      — Icon name (e.g. 'train', 'arrow_back')
 * @param {boolean} fill      — Whether to use the filled variant
 * @param {string}  size      — Tailwind text-size class (e.g. 'text-xl', 'text-3xl')
 * @param {string}  className — Additional classes
 * @param {object}  style     — Additional inline styles
 */
export default function Icon({
  name,
  fill = false,
  size = '',
  className = '',
  style = {},
  ...rest
}) {
  return (
    <span
      className={`material-symbols-outlined ${size} ${className}`.trim()}
      style={fill ? { fontVariationSettings: "'FILL' 1", ...style } : style}
      {...rest}
    >
      {name}
    </span>
  )
}
