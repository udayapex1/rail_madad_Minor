/**
 * Multi-step progress indicator.
 *
 * @param {number} totalSteps  — Total number of steps
 * @param {number} currentStep — Current active step (1-indexed)
 */
export default function StepIndicator({ totalSteps = 2, currentStep = 1 }) {
  return (
    <div className="flex items-center gap-2 mb-5 animate-fade-in">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1
        const isActive = step === currentStep
        const isDone = step < currentStep

        return (
          <span key={step}>
            {i > 0 && (
              <span className="contents">
                {/* Connector line between previous step dot and this dot is handled by the parent flex gap */}
              </span>
            )}
            <span
              className={`flex size-6 items-center justify-center rounded-full text-xs font-black ${
                isActive
                  ? 'bg-primary text-white'
                  : isDone
                  ? 'bg-primary/30 text-primary'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
              }`}
            >
              {step}
            </span>
          </span>
        )
      }).reduce((acc, dot, i) => {
        if (i === 0) return [dot]
        const lineIsDone = i < currentStep
        return [
          ...acc,
          <div
            key={`line-${i}`}
            className={`h-0.5 flex-1 rounded-full ${
              lineIsDone ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
            }`}
          >
            {!lineIsDone && i === currentStep - 1 && (
              <div className="h-full w-1/2 bg-primary/40 rounded-full" />
            )}
          </div>,
          dot,
        ]
      })}
    </div>
  )
}
