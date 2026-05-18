export default function Icon({
  name,
  fill = false,
  size = 'text-2xl',
  className = '',
  style = {},
  ...rest
}) {
  return (
    <span
      className={`material-symbols-outlined ${size} ${className} select-none`.trim()}
      style={{
        fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0",
        ...style,
      }}
      {...rest}
    >
      {name}
    </span>
  )
}