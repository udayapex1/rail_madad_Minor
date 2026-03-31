import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/layout'
import { StepIndicator, InfoBanner, Icon } from '../../components/common'
import { COMPLAINT_METHODS } from '../../constants/mockData'

export default function FileComplaint() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [step, setStep] = useState(1)
  const [chosen, setChosen] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [pnr, setPnr] = useState('')
  const [desc, setDesc] = useState('')

  function handleMethodSelect(method) {
    setChosen(method)
    if (method.accept) {
      fileInputRef.current.accept = method.accept
      if (method.capture) fileInputRef.current.setAttribute('capture', method.capture)
      else fileInputRef.current.removeAttribute('capture')
      fileInputRef.current.click()
    } else {
      setFileName(null)
      setStep(2)
    }
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (file) setFileName(file.name)
    e.target.value = ''
    setStep(2)
  }

  function handleSubmit() {
    if (!pnr.trim()) return
    navigate('/ai-analysis')
  }

  // ── Step 1 ──
  if (step === 1) {
    return (
      <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 animate-fade-in">
        <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />

        <PageHeader title="Rail Madad" subtitle="Grievance Redressal" showBack />

        <main className="flex-1 px-4 pt-6 pb-28 lg:pb-8 max-w-3xl mx-auto w-full">
          <StepIndicator totalSteps={2} currentStep={1} />

          <div className="mb-6 animate-slide-up">
            <h2 className="text-2xl font-black tracking-tight">File Complaint</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Step 1 — Choose how to report your issue.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-slide-up-1">
            {COMPLAINT_METHODS.map((method) => (
              <button
                key={method.label}
                onClick={() => handleMethodSelect(method)}
                className="group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-card hover:shadow-card-hover active:scale-[0.97] transition-all duration-200"
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${method.color} text-white shadow-md group-hover:scale-110 transition-transform duration-200`}>
                  <Icon name={method.icon} fill size="text-[32px]" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold">{method.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{method.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <InfoBanner className="mt-5 animate-slide-up-2">
            Sharing media helps us resolve issues faster. Your location will be automatically tagged.
          </InfoBanner>
        </main>
      </div>
    )
  }

  // ── Step 2 ──
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 animate-fade-in">
      <PageHeader
        title="Rail Madad"
        subtitle="Grievance Redressal"
        showBack
        onMenuToggle={null}
      />

      <main className="flex-1 px-4 pt-6 pb-36 lg:pb-8 max-w-3xl mx-auto w-full">
        <StepIndicator totalSteps={2} currentStep={2} />

        <div className="mb-6 animate-slide-up">
          <h2 className="text-2xl font-black tracking-tight">Almost done!</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Step 2 — Add your PNR &amp; a brief description.</p>
        </div>

        {/* Attachment confirmation */}
        {chosen && (
          <div className={`mb-5 flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br ${chosen.color} text-white shadow-glow animate-scale-in`}>
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
              <Icon name={chosen.icon} fill size="text-xl" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm">{chosen.label}</p>
              <p className="text-white/75 text-xs truncate">{fileName || 'Ready to submit'}</p>
            </div>
            <Icon name="check_circle" fill className="text-white/80" />
          </div>
        )}

        {/* PNR input */}
        <div className="mb-4 animate-slide-up-1">
          <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
            PNR Number <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Icon name="confirmation_number" fill className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size="text-xl" />
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
            <Icon name="send" fill size="text-xl" />
            Submit Complaint
          </button>
        </div>
      </div>
    </div>
  )
}
