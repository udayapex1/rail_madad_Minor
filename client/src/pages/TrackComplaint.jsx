import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MOCK_COMPLAINTS = {
  'RM-2025-48291': {
    id: 'RM-2025-48291',
    title: 'Cleanliness Issue',
    icon: 'cleaning_services',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    category: 'Cleanliness',
    coach: 'Coach B4, Seat 22',
    train: '12951 Mumbai Rajdhani',
    filedDate: '24 Oct 2026',
    status: 'In Progress',
    statusBg: 'bg-amber-100 dark:bg-amber-900/30',
    statusColor: 'text-amber-700 dark:text-amber-400',
    priority: 'High',
    priorityColor: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    assignedTo: 'DRM Office, New Delhi',
    lastUpdated: '2 hours ago',
    progress: 65,
    timeline: [
      { label: 'Complaint Filed',  time: '24 Oct, 09:15 AM', done: true,  active: false },
      { label: 'Under Review',     time: '24 Oct, 09:45 AM', done: true,  active: false },
      { label: 'In Progress',      time: '24 Oct, 10:30 AM', done: false, active: true, note: 'Station Master - NDLS' },
      { label: 'Resolved',         time: 'Expected by 02:00 PM', done: false, active: false },
    ],
  },
  'RM-2025-47120': {
    id: 'RM-2025-47120',
    title: 'Unauthorized Passenger Entry',
    icon: 'security',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600',
    category: 'Security',
    coach: 'Coach S6',
    train: '12301 Howrah Rajdhani',
    filedDate: '22 Oct 2026',
    status: 'Resolved',
    statusBg: 'bg-green-100 dark:bg-green-900/30',
    statusColor: 'text-green-700 dark:text-green-400',
    priority: 'Medium',
    priorityColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    assignedTo: 'RPF Team, Howrah',
    lastUpdated: '1 day ago',
    progress: 100,
    timeline: [
      { label: 'Complaint Filed', time: '22 Oct, 07:10 AM', done: true, active: false },
      { label: 'Under Review',    time: '22 Oct, 07:30 AM', done: true, active: false },
      { label: 'In Progress',     time: '22 Oct, 08:00 AM', done: true, active: false, note: 'RPF Team deployed' },
      { label: 'Resolved',        time: '22 Oct, 09:45 AM', done: true, active: false },
    ],
  },
}

export default function TrackComplaint() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  function handleTrack(e) {
    e.preventDefault()
    const id = input.trim().toUpperCase()
    if (!id) {
      setError('Please enter a complaint ID')
      return
    }
    setError('')
    setLoading(true)
    setResult(null)
    setSearched(false)

    // Simulate API lookup
    setTimeout(() => {
      setLoading(false)
      setSearched(true)
      const found = MOCK_COMPLAINTS[id]
      if (found) {
        setResult(found)
      } else if (id.startsWith('RM-')) {
        setError('No complaint found with this ID. Please check and try again.')
      } else {
        setError('Invalid complaint ID format. IDs look like RM-2025-48291.')
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-background-light dark:bg-background-dark animate-fade-in">

      {/* Left / Top — Gradient Panel */}
      <div className="relative flex-none min-h-[38vh] lg:w-[42%] lg:min-h-screen lg:flex lg:flex-col lg:items-center lg:justify-center gradient-header overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute top-8 -left-12 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 right-10 w-36 h-36 rounded-full bg-white/5" />
        <div className="lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-24 bg-white dark:bg-background-dark rounded-[100%]" />

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 size-10 bg-white/15 border border-white/20 rounded-xl flex items-center justify-center text-white backdrop-blur-sm"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>

<<<<<<< HEAD
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-14 pb-16 lg:pt-0 lg:pb-0 animate-bounce-in">
=======
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-14 pb-32 lg:pt-0 lg:pb-0 animate-bounce-in">
>>>>>>> dev
          <div className="size-20 rounded-3xl bg-white/20 border-2 border-white/30 flex items-center justify-center mb-4 backdrop-blur-sm shadow-glow">
            <span
              className="material-symbols-outlined text-white text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              gps_fixed
            </span>
          </div>
          <h1 className="text-white text-3xl lg:text-4xl font-black tracking-tight">Track Complaint</h1>
          <p className="text-blue-100/80 text-sm mt-2 max-w-xs leading-relaxed">
            Get real-time status updates without logging in.
          </p>

          {/* Desktop feature bullets */}
          <div className="hidden lg:flex flex-col gap-3 mt-10 w-full max-w-xs text-left">
            {[
              { icon: 'timeline',              text: 'Step-by-step resolution timeline' },
              { icon: 'notifications_active',  text: 'Live status without an account' },
              { icon: 'verified_user',         text: 'Secure — read-only access' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-white text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {icon}
                  </span>
                </div>
                <p className="text-white/80 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right / Bottom — Form + Result */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-t-[32px] lg:rounded-none -mt-6 lg:mt-0 px-6 pt-8 pb-12 shadow-[0_-8px_40px_-8px_rgba(0,0,0,0.12)] lg:shadow-none lg:flex lg:flex-col lg:justify-center lg:items-center overflow-y-auto">
        <div className="max-w-sm w-full">

          {/* Desktop heading */}
          <div className="hidden lg:block mb-6">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Track Your Complaint</h2>
            <p className="text-slate-500 text-sm mt-1">Enter the complaint ID from your confirmation receipt.</p>
          </div>

          {/* Search form */}
          <form onSubmit={handleTrack} className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-slate-700 dark:text-slate-300 text-sm font-bold">Complaint ID</label>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  confirmation_number
                </span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => { setInput(e.target.value.toUpperCase()); setError(''); setSearched(false); setResult(null) }}
                  placeholder="e.g. RM-2025-48291"
                  className="input-field h-14 pl-12 tracking-widest font-bold text-primary placeholder:font-normal placeholder:tracking-normal uppercase"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary h-[52px] text-base w-full flex items-center justify-center gap-2 disabled:opacity-70 mt-1"
            >
              {loading ? (
                <>
                  <span className="size-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>search</span>
                  Track Complaint
                </>
              )}
            </button>
          </form>

          {/* Hint */}
          {!result && !loading && !searched && (
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-primary/[0.05] border border-primary/10 mt-5">
              <span
                className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                info
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Your complaint ID (e.g.{' '}
                <button
                  type="button"
                  onClick={() => { setInput('RM-2025-48291'); setError(''); setResult(null); setSearched(false) }}
                  className="font-bold text-primary underline underline-offset-2"
                >
                  RM-2025-48291
                </button>
                ) was sent to your registered email or phone when you filed the complaint.
              </p>
            </div>
          )}

          {/* ── Result Card ── */}
          {result && (
            <div className="mt-5 animate-slide-up space-y-1">
              <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-card">
                {/* Progress bar top accent */}
                <div className="h-1.5 bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-[#2800ff] rounded-full transition-all duration-700"
                    style={{ width: `${result.progress}%` }}
                  />
                </div>

                <div className="p-4 space-y-4">
                  {/* ID + status badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Complaint ID</p>
                      <p className="text-sm font-black text-primary mt-0.5">{result.id}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase whitespace-nowrap ${result.statusBg} ${result.statusColor}`}>
                      {result.status}
                    </span>
                  </div>

                  {/* Complaint info tile */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                    <div className={`size-11 rounded-xl shrink-0 flex items-center justify-center ${result.iconBg} ${result.iconColor}`}>
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {result.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{result.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{result.coach} · {result.train}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Filed: {result.filedDate}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase shrink-0 ${result.priorityColor}`}>
                      {result.priority}
                    </span>
                  </div>

                  {/* Assigned to */}
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 bg-primary/[0.04] border border-primary/10 rounded-xl px-3 py-2.5">
                    <span
                      className="material-symbols-outlined text-primary text-[18px] shrink-0"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      support_agent
                    </span>
                    <span className="text-xs">Assigned to <span className="font-bold">{result.assignedTo}</span></span>
                  </div>

                  {/* Progress */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span className="font-medium">Resolution Progress</span>
                      <span className="font-black text-primary">{result.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-[#2800ff] rounded-full transition-all duration-700"
                        style={{ width: `${result.progress}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      Updated {result.lastUpdated}
                    </p>
                  </div>

                  {/* Timeline */}
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Resolution Timeline</p>
                    <div className="relative space-y-4 ml-2">
                      {result.timeline.map((step, idx) => (
                        <div key={step.label} className="relative flex gap-3">
                          {idx < result.timeline.length - 1 && (
                            <div
                              className={`absolute left-[9px] top-5 h-full w-0.5 ${
                                step.done || step.active ? 'bg-primary/40' : 'bg-slate-200 dark:bg-slate-700'
                              }`}
                            />
                          )}
                          <div
                            className={`z-10 shrink-0 size-5 rounded-full ring-4 ring-white dark:ring-slate-900 flex items-center justify-center ${
                              step.done ? 'bg-primary' : step.active ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
                            }`}
                          >
                            {step.done && (
                              <span className="material-symbols-outlined text-white text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                check
                              </span>
                            )}
                            {step.active && <div className="size-2 rounded-full bg-white animate-pulse" />}
                          </div>
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
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-3 flex gap-2">
                  <button
                    onClick={() => navigate('/login')}
                    className="btn-primary flex-1 h-10 text-sm flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>login</span>
                    Login for Full Details
                  </button>
                  <button
                    onClick={() => { setResult(null); setInput(''); setSearched(false) }}
                    className="btn-secondary px-4 h-10 text-sm flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-base">refresh</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Not found empty state */}
          {searched && !result && !error && (
            <div className="mt-5 flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 animate-fade-in">
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-5xl">search_off</span>
              <p className="text-slate-500 text-sm font-medium text-center">No complaint found with this ID.</p>
            </div>
          )}

          <button
            onClick={() => navigate('/')}
            className="w-full text-center text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors mt-6 flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
