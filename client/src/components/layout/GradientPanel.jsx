import { useNavigate } from 'react-router-dom'
import Icon from '../common/Icon'

/**
 * Reusable gradient hero panel for full-width headers.
 * Used by AIAnalysisResult, ChatSupport, FeedbackRating, Profile.
 *
 * @param {boolean} showBack   — Show back button
 * @param {string}  title      — Header title (centered, white)
 * @param {node}    children   — Content rendered inside the gradient area
 * @param {string}  className  — Additional classes
 */
export default function GradientPanel({
  showBack = true,
  title,
  children,
  className = '',
}) {
  const navigate = useNavigate()

  return (
    <div
      className={`relative overflow-hidden shrink-0 ${className}`.trim()}
      style={{ background: 'linear-gradient(135deg, #000099 0%, #1500cc 55%, #2800ff 100%)' }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Title row */}
        <div className="flex items-center px-4 py-4">
          {showBack ? (
            <button
              onClick={() => navigate(-1)}
              className="size-10 bg-white/15 border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/25 transition-colors"
            >
              <Icon name="arrow_back" size="text-xl" />
            </button>
          ) : (
            <div className="size-10" />
          )}
          {title && (
            <h2 className="text-white font-black flex-1 text-center text-base">{title}</h2>
          )}
          <div className="size-10" />
        </div>

        {/* Custom content */}
        {children}
      </div>
    </div>
  )
}
