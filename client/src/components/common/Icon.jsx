export default function Icon({ name, fill = false, size = 'text-2xl', className = '' }) {
  return (
    <span 
      className={`material-symbols-outlined ${size} ${className} select-none`}
      style={{ fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0" }}
    >
      {name}
    </span>
  )
}
