/**
 * Pill-shaped badge for status / priority labels.
 *
 * @param {string} label     — Display text (e.g. 'HIGH PRIORITY')
 * @param {string} bgColor   — Tailwind bg classes (e.g. 'bg-red-100 dark:bg-red-900/30')
 * @param {string} textColor — Tailwind text classes (e.g. 'text-red-700 dark:text-red-400')
 * @param {string} className — Additional classes
 */
export default function StatusBadge({ label, bgColor, textColor, className = '' }) {
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase whitespace-nowrap ${bgColor} ${textColor} ${className}`.trim()}
    >
      {label}
    </span>
  )
}
