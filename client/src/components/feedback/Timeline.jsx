import Icon from '../common/Icon'

/**
 * Vertical timeline for complaint progress tracking.
 * Extracted from MyComplaintsList and TrackComplaint.
 *
 * @param {Array} steps — Array of { label, time, done, active, note? }
 */
export default function Timeline({ steps = [] }) {
  return (
    <div className="relative space-y-4 ml-2">
      {steps.map((step, idx) => (
        <div key={step.label} className="relative flex gap-3">
          {/* Connector line */}
          {idx < steps.length - 1 && (
            <div
              className={`absolute left-[9px] top-5 h-full w-0.5 ${
                step.done || step.active ? 'bg-primary/40' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            />
          )}

          {/* Dot */}
          <div
            className={`z-10 shrink-0 size-5 rounded-full ring-4 ring-white dark:ring-slate-900 flex items-center justify-center ${
              step.done
                ? 'bg-primary'
                : step.active
                ? 'bg-primary'
                : 'bg-slate-200 dark:bg-slate-700'
            }`}
          >
            {step.done && (
              <Icon name="check" fill className="text-white text-[11px]" />
            )}
            {step.active && <div className="size-2 rounded-full bg-white animate-pulse" />}
          </div>

          {/* Content */}
          <div className="pb-1">
            <p
              className={`text-sm font-bold leading-none ${
                step.active
                  ? 'text-primary'
                  : step.done
                  ? 'text-slate-900 dark:text-slate-100'
                  : 'text-slate-400'
              }`}
            >
              {step.label}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{step.time}</p>
            {step.note && (
              <p className="text-xs mt-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-lg">
                {step.note}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
