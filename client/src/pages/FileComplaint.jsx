import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

const methods = [
  { icon: 'photo_camera', label: 'Take Photo',    desc: 'Snap it',  color: 'from-blue-500 to-blue-600',   accept: 'image/*',  capture: 'environment' },
  { icon: 'videocam',     label: 'Record Video',  desc: 'Film it',  color: 'from-purple-500 to-purple-600', accept: 'video/*',  capture: 'environment' },
  { icon: 'mic',          label: 'Voice Note',    desc: 'Say it',   color: 'from-rose-500 to-rose-600',   accept: 'audio/*',  capture: null },
  { icon: 'edit_note',    label: 'Type Details',  desc: 'Write it', color: 'from-amber-500 to-amber-600', accept: null,       capture: null },
]

export default function FileComplaint() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [step, setStep] = useState(1)            // 1 = pick method, 2 = PNR + desc
  const [chosen, setChosen] = useState(null)     // selected method object
  const [fileName, setFileName] = useState(null) // uploaded file name
  const [pnr, setPnr] = useState('')
  const [desc, setDesc] = useState('')

  // Step 1: user taps a method tile
  function handleMethodSelect(method) {
    setChosen(method)
    if (method.accept) {
      // trigger hidden file input
      fileInputRef.current.accept = method.accept
      if (method.capture) {
        fileInputRef.current.setAttribute('capture', method.capture)
      } else {
        fileInputRef.current.removeAttribute('capture')
      }
      fileInputRef.current.click()
    } else {
      // "Type Details" — skip file, go straight to step 2
      setFileName(null)
      setStep(2)
    }
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (file) setFileName(file.name)
    // reset so same file can be re-selected if needed
    e.target.value = ''
    setStep(2)
  }

  function handleSubmit() {
    if (!pnr.trim()) return
    navigate('/ai-analysis')
  }

  // ── Step 1 ──────────────────────────────────────────────
  if (step === 1) {
    return (
      <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 animate-fade-in">
        {/* Hidden file input */}
        <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />

        <header className="flex items-center px-4 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex size-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <div className="flex-1 text-center pr-10">
            <h1 className="text-base font-black text-primary">Rail Madad</h1>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Grievance Redressal</p>
          </div>
        </header>

        <main className="flex-1 px-4 pt-6 pb-36 lg:pb-8 max-w-3xl mx-auto w-full">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-5 animate-fade-in">
            <span className="flex size-6 items-center justify-center rounded-full bg-primary text-white text-xs font-black">1</span>
            <div className="h-0.5 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full">
              <div className="h-full w-1/2 bg-primary/40 rounded-full" />
            </div>
            <span className="flex size-6 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-400 text-xs font-black">2</span>
          </div>

          <div className="mb-6 animate-slide-up">
            <h2 className="text-2xl font-black tracking-tight">File Complaint</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Step 1 — Choose how to report your issue.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-slide-up-1">
            {methods.map((method) => (
              <button
                key={method.label}
                onClick={() => handleMethodSelect(method)}
                className="group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-card hover:shadow-card-hover active:scale-[0.97] transition-all duration-200"
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${method.color} text-white shadow-md group-hover:scale-110 transition-transform duration-200`}>
                  <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>{method.icon}</span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold">{method.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{method.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-5 p-4 rounded-2xl bg-primary/[0.06] border border-primary/10 flex items-start gap-3 animate-slide-up-2">
            <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Sharing media helps us resolve issues faster. Your location will be automatically tagged.
            </p>
          </div>
        </main>

        <BottomNav />
      </div>
    )
  }

  // ── Step 2 ──────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 animate-fade-in">
      <header className="flex items-center px-4 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <button
          onClick={() => setStep(1)}
          className="flex size-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">arrow_back</span>
        </button>
        <div className="flex-1 text-center pr-10">
          <h1 className="text-base font-black text-primary">Rail Madad</h1>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Grievance Redressal</p>
        </div>
      </header>

      <main className="flex-1 px-4 pt-6 pb-36 lg:pb-8 max-w-3xl mx-auto w-full">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-5 animate-fade-in">
          <span className="flex size-6 items-center justify-center rounded-full bg-primary/30 text-primary text-xs font-black">1</span>
          <div className="h-0.5 flex-1 bg-primary rounded-full" />
          <span className="flex size-6 items-center justify-center rounded-full bg-primary text-white text-xs font-black">2</span>
        </div>

        <div className="mb-6 animate-slide-up">
          <h2 className="text-2xl font-black tracking-tight">Almost done!</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Step 2 — Add your PNR &amp; a brief description.
          </p>
        </div>

        {/* Attachment confirmation */}
        {chosen && (
          <div className={`mb-5 flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br ${chosen.color} text-white shadow-glow animate-scale-in`}>
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{chosen.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm">{chosen.label}</p>
              <p className="text-white/75 text-xs truncate">
                {fileName ? fileName : 'Ready to submit'}
              </p>
            </div>
            <span className="material-symbols-outlined text-white/80" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
        )}

        {/* PNR input */}
        <div className="mb-4 animate-slide-up-1">
          <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
            PNR Number <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              confirmation_number
            </span>
            <input
              type="text"
              inputMode="numeric"
              maxLength={10}
              value={pnr}
              onChange={(e) => setPnr(e.target.value.replace(/\D/g, ''))}
              placeholder="10-digit PNR"
              className="input-field h-14 pl-12 tracking-widest font-bold text-primary placeholder:font-normal placeholder:tracking-normal"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-5 animate-slide-up-2">
          <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
            Description <span className="text-slate-300">(optional)</span>
          </label>
          <textarea
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Briefly describe the issue — e.g. coach number, seat, what happened…"
            className="input-field !h-auto resize-none pt-3.5 pb-3.5 text-sm"
          />
        </div>
      </main>

      {/* Submit footer */}
      <div className="fixed bottom-0 left-0 right-0 px-4 pb-20 lg:pb-4 pt-3 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 z-40 lg:left-[240px]">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={handleSubmit}
            disabled={!pnr.trim() || pnr.length < 10}
            className="btn-primary w-full h-[56px] text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
            Submit Complaint
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
