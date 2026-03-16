import { useState, useEffect, useCallback } from 'react'

function generateChallenge() {
  const ops = ['+', '-', '×']
  const op = ops[Math.floor(Math.random() * ops.length)]
  let a, b, answer

  if (op === '+') {
    a = Math.floor(Math.random() * 9) + 1
    b = Math.floor(Math.random() * 9) + 1
    answer = a + b
  } else if (op === '-') {
    a = Math.floor(Math.random() * 8) + 3
    b = Math.floor(Math.random() * (a - 1)) + 1
    answer = a - b
  } else {
    a = Math.floor(Math.random() * 5) + 2
    b = Math.floor(Math.random() * 4) + 2
    answer = a * b
  }

  return { question: `${a} ${op} ${b} = ?`, answer }
}

/**
 * Props:
 *   onVerified(bool) — called whenever verification state changes
 */
export default function Captcha({ onVerified }) {
  const [challenge, setChallenge] = useState(generateChallenge)
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('idle') // idle | success | error

  const refresh = useCallback(() => {
    setChallenge(generateChallenge())
    setValue('')
    setStatus('idle')
    onVerified(false)
  }, [onVerified])

  useEffect(() => {
    if (value === '') {
      setStatus('idle')
      onVerified(false)
      return
    }
    const num = parseInt(value, 10)
    if (isNaN(num)) return
    if (num === challenge.answer) {
      setStatus('success')
      onVerified(true)
    } else {
      setStatus('error')
      onVerified(false)
    }
  }, [value, challenge.answer, onVerified])

  const borderColor =
    status === 'success'
      ? '#22c55e'
      : status === 'error'
      ? '#ef4444'
      : '#e2e8f0'

  const iconName =
    status === 'success' ? 'check_circle' : status === 'error' ? 'cancel' : 'security'

  const iconColor =
    status === 'success' ? '#22c55e' : status === 'error' ? '#ef4444' : '#94a3b8'

  return (
    <div className="flex flex-col gap-2">
      <label className="text-slate-700 dark:text-slate-300 text-sm font-bold flex items-center gap-1.5">
        <span
          className="material-symbols-outlined text-base"
          style={{ fontVariationSettings: "'FILL' 1", color: iconColor, transition: 'color 0.2s' }}
        >
          {iconName}
        </span>
        CAPTCHA Verification
      </label>

      <div
        className="flex items-center gap-3 rounded-2xl border-2 px-4 py-3 bg-white dark:bg-slate-800 transition-all duration-200"
        style={{ borderColor }}
      >
        {/* Challenge badge */}
        <div
          className="flex-shrink-0 rounded-xl px-3 py-2 font-black text-sm tracking-wide select-none"
          style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            color: '#fff',
            fontFamily: "'Courier New', monospace",
            letterSpacing: '0.08em',
            textDecoration: 'line-through',
            textDecorationColor: 'rgba(255,255,255,0.25)',
            filter: 'drop-shadow(0 2px 4px rgba(59,130,246,0.4))',
          }}
        >
          {challenge.question}
        </div>

        {/* Answer input */}
        <input
          type="number"
          min={0}
          max={99}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Answer"
          className="flex-1 bg-transparent outline-none text-slate-800 dark:text-slate-100 text-sm font-semibold placeholder:text-slate-400 min-w-0"
          style={{ appearance: 'textfield' }}
          aria-label="CAPTCHA answer"
        />

        {/* Refresh button */}
        <button
          type="button"
          onClick={refresh}
          title="Refresh CAPTCHA"
          className="flex-shrink-0 size-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-150"
        >
          <span className="material-symbols-outlined text-lg">refresh</span>
        </button>
      </div>

      {status === 'error' && (
        <p className="text-red-500 text-xs font-medium flex items-center gap-1">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            error
          </span>
          Incorrect answer. Please try again.
        </p>
      )}
      {status === 'success' && (
        <p className="text-green-500 text-xs font-medium flex items-center gap-1">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified
          </span>
          Verified successfully!
        </p>
      )}
    </div>
  )
}
