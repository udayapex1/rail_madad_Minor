import { useNavigate } from 'react-router-dom'
import Icon from '../common/Icon'

/**
 * Split-panel layout for auth pages (Login, Register, Track).
 * Left = gradient panel with icon, title, bullets.
 * Right = form content (children).
 *
 * @param {string}  icon          — Material icon for the gradient panel
 * @param {string}  title         — Main heading
 * @param {string}  subtitle      — Short description
 * @param {Array}   features      — Array of { icon, text } for desktop bullet points
 * @param {string}  panelMinH     — Min-height for the gradient panel (mobile)
 * @param {node}    children      — Form content
 */
export default function AuthLayout({
  icon,
  title,
  subtitle,
  features = [],
  panelMinH = 'min-h-[42vh]',
  children,
}) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-background-light dark:bg-background-dark animate-fade-in">

      {/* Left / Top — Gradient Panel */}
      <div className={`relative flex-none ${panelMinH} lg:w-1/2 lg:min-h-screen lg:flex lg:flex-col lg:items-center lg:justify-center gradient-header overflow-hidden`}>
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute top-8 -left-12 w-48 h-48 rounded-full bg-white/5" />
        <div className="lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-24 bg-white dark:bg-background-dark rounded-[100%]" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 size-10 bg-white/15 border border-white/20 rounded-xl flex items-center justify-center text-white backdrop-blur-sm"
        >
          <Icon name="arrow_back" size="text-xl" />
        </button>

        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-14 pb-32 lg:pt-0 lg:pb-0 animate-bounce-in">
          {/* Hero icon */}
          <div className="size-20 rounded-3xl bg-white/20 border-2 border-white/30 flex items-center justify-center mb-4 backdrop-blur-sm">
            <Icon name={icon} fill className="text-white" size="text-4xl" />
          </div>
          <h1 className="text-white text-3xl lg:text-4xl font-black tracking-tight">{title}</h1>
          <p className="text-blue-100/80 text-sm mt-2 max-w-xs">{subtitle}</p>

          {/* Desktop feature bullets */}
          {features.length > 0 && (
            <div className="hidden lg:flex flex-col gap-3 mt-10 w-full max-w-xs text-left">
              {features.map(({ icon: featureIcon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                    <Icon name={featureIcon} fill className="text-white" size="text-base" />
                  </div>
                  <p className="text-white/80 text-sm">{text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right / Bottom — Form */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-t-[32px] lg:rounded-none -mt-6 lg:mt-0 px-6 pt-8 pb-10 shadow-[0_-8px_40px_-8px_rgba(0,0,0,0.12)] lg:shadow-none lg:flex lg:flex-col lg:justify-center lg:items-center overflow-y-auto">
        <div className="max-w-sm w-full">
          {children}
        </div>
      </div>
    </div>
  )
}
