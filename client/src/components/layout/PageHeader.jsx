import { useNavigate } from 'react-router-dom'
import Icon from '../common/Icon'

/**
 * Universal sticky page header.
 *
 * @param {string}  title          — Page title
 * @param {string}  subtitle       — Optional subtitle
 * @param {boolean} showBack       — Show back button (default: false → show menu toggle)
 * @param {func}    onMenuToggle   — Sidebar toggle handler (for dashboard pages)
 * @param {node}    trailing       — Optional trailing action (e.g. notification bell)
 * @param {string}  className      — Additional classes
 */
export default function PageHeader({
  title,
  subtitle,
  showBack = false,
  onMenuToggle,
  trailing,
  className = '',
}) {
  const navigate = useNavigate()

  return (
    <header
      className={`sticky top-0 z-10 flex items-center px-4 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 ${className}`.trim()}
    >
      {showBack ? (
        <button
          onClick={() => navigate(-1)}
          className="flex size-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Go back"
        >
          <Icon name="arrow_back" size="text-[22px]" />
        </button>
      ) : onMenuToggle ? (
        <button
          onClick={onMenuToggle}
          className="flex lg:hidden size-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Icon name="menu" className="text-slate-700 dark:text-slate-300" size="text-[26px]" />
        </button>
      ) : (
        <div className="size-10" />
      )}

      <div className="flex-1 text-center pr-10">
        <h2 className="text-base font-black tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
            {subtitle}
          </p>
        )}
      </div>

      {trailing ? (
        <div className="shrink-0">{trailing}</div>
      ) : (
        <div className="size-10" />
      )}
    </header>
  )
}
