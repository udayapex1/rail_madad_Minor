import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function WelcomeScreen() {
  const navigate = useNavigate()
  const [showTrack, setShowTrack] = useState(false)
  const [trackId, setTrackId] = useState('')

  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen overflow-hidden bg-background-light dark:bg-background-dark">

      {/* Left / Top — Gradient Panel */}
      <div className="relative flex-none min-h-[52vh] lg:w-1/2 lg:min-h-screen lg:sticky lg:top-0 overflow-hidden">
        <div className="absolute inset-0 gradient-header" />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute top-10 -left-16 w-56 h-56 rounded-full bg-white/5" />
        {/* Mobile only: bottom curve */}
        <div className="lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-24 bg-white dark:bg-background-dark rounded-[100%]" />

        {/* Header branding */}
        <div className="relative z-10 flex items-center justify-between px-5 pt-12">
          <div className="flex items-center gap-2.5">
            <div className="size-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <span className="material-symbols-outlined text-white text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>train</span>
            </div>
            <span className="text-white text-base font-black uppercase tracking-widest">Rail Madad</span>
          </div>
          <div className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/25">
            <span className="text-white text-xs font-semibold">Official App</span>
          </div>
        </div>

        {/* Hero text */}
<<<<<<< HEAD
        <div className="relative z-10 px-6 pt-7 pb-16 animate-fade-in lg:flex lg:flex-col lg:justify-center lg:h-[calc(100vh-88px)] lg:pb-10">
=======
        <div className="relative z-10 px-6 pt-7 pb-32 animate-fade-in lg:flex lg:flex-col lg:justify-center lg:h-[calc(100vh-88px)] lg:pb-10">
>>>>>>> dev
          <h1 className="text-white text-[38px] lg:text-5xl font-black leading-tight tracking-tight mb-3">
            Report Railway<br />Issues Instantly
          </h1>
          <p className="text-blue-100/80 text-base leading-relaxed max-w-md">
            AI-powered grievance redressal for a better Indian Railways experience.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['Fast Resolution', 'AI-Powered', 'Real-time Tracking'].map((badge) => (
              <span key={badge} className="bg-white/15 border border-white/25 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">{badge}</span>
            ))}
          </div>
          {/* Desktop-only feature bullets */}
          <div className="hidden lg:flex flex-col gap-3 mt-10">
            {[
              { icon: 'bolt',      text: 'Resolve complaints in under 24 hours' },
              { icon: 'smart_toy', text: 'AI-powered auto-categorisation' },
              { icon: 'verified',  text: 'Trusted by 50M+ passengers' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                </div>
                <p className="text-white/85 text-sm font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right / Bottom — Content Panel */}
      <div className="flex-1 relative -mt-6 lg:mt-0 bg-white dark:bg-background-dark rounded-t-[32px] lg:rounded-none px-6 pt-7 pb-10 shadow-[0_-8px_40px_-8px_rgba(0,0,0,0.14)] lg:shadow-none animate-slide-up lg:flex lg:flex-col lg:justify-center lg:items-center lg:overflow-y-auto">
        {/* Hero train image — mobile only */}
        <div
          className="lg:hidden w-full bg-center bg-no-repeat bg-cover overflow-hidden rounded-2xl h-[148px] mb-7 shadow-card"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBVfSNdmg1bhukRfQ8mtk1kwkMYL0DBL0CQ23IXUCUMHCGzhF7XtE2w_0YcqT2Az5pTvDZWYR9uOt0j13Q4tKUajgd9Se_9of0T_q45dtNzP0ayJ2JyWAl72f3-2lqnhBQskvk9_Pu5Rz1LlrxLzWht2jU9tDQ0H4cc1oiIDmhz0shs_rlIi2hrGcOlb5Q_Dk_zuuCv2S89RocBha-SdJqMfOee5s9ZqKFFjY3BZlE8bSiQhySpgdqvN0NLzaAJeX6pVint0C8ksh0')" }}
        />

        <div className="w-full max-w-sm">
          {/* Desktop logo */}
          <div className="hidden lg:flex items-center gap-3 mb-8">
            <div className="size-11 rounded-2xl bg-gradient-to-br from-primary to-[#2800ff] flex items-center justify-center shadow-glow">
              <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>train</span>
            </div>
            <div>
              <p className="text-primary font-black text-xl">Rail Madad</p>
              <p className="text-slate-400 text-xs">Ministry of Railways</p>
            </div>
          </div>
          <h2 className="text-slate-900 dark:text-slate-50 text-2xl font-black tracking-tight text-center lg:text-left mb-1">Get Started</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm text-center lg:text-left mb-7">Login or create an account to file and track your railway complaints.</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => navigate('/login')} className="btn-primary h-[56px] text-base w-full flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>login</span>
              Login
            </button>
            <button onClick={() => navigate('/register')} className="btn-secondary h-[56px] text-base w-full flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-xl">person_add</span>
              Create Account
            </button>
            <button
              onClick={() => navigate('/track')}
              className="h-[56px] text-base w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.97] transition-all duration-200"
            >
              <span className="material-symbols-outlined text-xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>gps_fixed</span>
              Track Complaint
            </button>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              { icon: 'support_agent', label: 'Help' },
              { icon: 'info',          label: 'About' },
            ].map(({ icon, label }) => (
              <button key={label} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-primary/[0.06] border border-primary/10 hover:bg-primary/[0.1] transition-colors active:scale-95">
                <span className="material-symbols-outlined text-primary text-[22px]">{icon}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
              </button>
            ))}
          </div>
          <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest mt-8">Ministry of Railways · Government of India</p>
        </div>
      </div>
    </div>
  )
}
