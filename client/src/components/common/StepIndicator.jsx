import Icon from './Icon'

/**
 * Multi-step progress indicator.
 *
 * @param {number} totalSteps  — Total number of steps
 * @param {number} currentStep — Current active step (1-indexed)
 */
export default function StepIndicator({ totalSteps = 2, currentStep = 1 }) {
  const steps = []

  for (let i = 1; i <= totalSteps; i++) {
    const isActive = i === currentStep
    const isDone = i < currentStep

    // Add step dot
    steps.push(
      <div
        key={`step-${i}`}
        className={`flex size-6 items-center justify-center rounded-full text-[10px] font-black shrink-0 transition-all duration-300 ${
          isActive
            ? 'bg-primary text-white scale-110 shadow-glow'
            : isDone
            ? 'bg-primary/20 text-primary'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
        }`}
      >
        {isDone ? <Icon name="check" size="text-xs" /> : i}
      </div>
    )

    // Add connector line if not the last step
    if (i < totalSteps) {
      steps.push(
        <div
          key={`line-${i}`}
          className="flex-1 h-0.5 mx-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden"
        >
          <div
            className={`h-full bg-primary transition-all duration-500 ease-out ${
              i < currentStep ? 'w-full' : 'w-0'
            }`}
          />
        </div>
      )
    }
  }

  return (
    <div className="flex items-center w-full mb-8 animate-fade-in px-1">
      {steps}
    </div>
  )
}
