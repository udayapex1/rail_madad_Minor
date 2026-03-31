import Icon from './Icon'

/**
 * Info / tip banner used across multiple pages.
 *
 * @param {string} icon      — Material icon name (default: 'info')
 * @param {node}   children  — Banner content
 * @param {string} className — Additional classes
 */
export default function InfoBanner({ icon = 'info', children, className = '' }) {
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-2xl bg-primary/[0.06] border border-primary/10 ${className}`.trim()}
    >
      <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Icon name={icon} fill className="text-primary" size="text-base" />
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {children}
      </div>
    </div>
  )
}
