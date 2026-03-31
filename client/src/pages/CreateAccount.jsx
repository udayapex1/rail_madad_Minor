import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Captcha from '../components/Captcha'

const fields = [
  { name: 'Full Name',     type: 'text',  icon: 'person',   placeholder: 'Enter your full name'      },
  { name: 'Phone Number',  type: 'tel',   icon: 'call',     placeholder: '10-digit mobile number'    },
  { name: 'Email Address', type: 'email', icon: 'mail',     placeholder: 'Enter email address'       },
]

export default function CreateAccount() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)

  const handleCaptchaVerified = useCallback((verified) => {
    setCaptchaVerified(verified)
  }, [])

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-background-light dark:bg-background-dark animate-fade-in">

      {/* Left / Top — Gradient Panel */}
      <div className="relative flex-none min-h-[35vh] lg:w-1/2 lg:min-h-screen lg:flex lg:flex-col lg:items-center lg:justify-center gradient-header overflow-hidden">
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/5" />
        <div className="absolute top-6 -left-10 w-44 h-44 rounded-full bg-white/5" />
        <div className="lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-24 bg-white dark:bg-background-dark rounded-[100%]" />
        <button onClick={() => navigate(-1)} className="absolute top-12 left-4 size-10 bg-white/15 border border-white/20 rounded-xl flex items-center justify-center text-white backdrop-blur-sm">
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
<<<<<<< HEAD
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-14 pb-16 lg:pt-0 lg:pb-0 animate-bounce-in">
=======
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-14 pb-32 lg:pt-0 lg:pb-0 animate-bounce-in">
>>>>>>> dev
          <div className="size-16 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center mb-3 backdrop-blur-sm">
            <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
          </div>
          <h1 className="text-white text-3xl lg:text-4xl font-black tracking-tight">Create Account</h1>
          <p className="text-blue-100/80 text-sm mt-2 max-w-xs">Join Rail Madad for better railway assistance</p>
          <div className="hidden lg:flex flex-col gap-3 mt-10 w-full max-w-xs text-left">
            {[
              { icon: 'track_changes',        text: 'Track all your complaints live' },
              { icon: 'support_agent',         text: 'Chat directly with support agents' },
              { icon: 'star',                  text: 'Rate and review resolutions' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-base" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                </div>
                <p className="text-white/80 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right / Bottom — Form */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-t-[32px] lg:rounded-none -mt-6 lg:mt-0 px-6 pt-8 pb-10 shadow-[0_-8px_40px_-8px_rgba(0,0,0,0.12)] lg:shadow-none lg:flex lg:flex-col lg:justify-center lg:items-center overflow-y-auto">
        <form className="max-w-sm w-full flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          <div className="hidden lg:block mb-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Create Account</h2>
            <p className="text-slate-500 text-sm mt-1">Fill in your details to get started</p>
          </div>

          {fields.map(({ name, type, icon, placeholder }) => (
            <div key={name} className="flex flex-col gap-2">
              <label className="text-slate-700 dark:text-slate-300 text-sm font-bold">{name}</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">{icon}</span>
                <input type={type} required placeholder={placeholder} className="input-field h-14 pl-12 pr-4 text-sm" />
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-bold">Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
              <input type={showPassword ? 'text' : 'password'} required placeholder="Create a strong password" className="input-field h-14 pl-12 pr-12 text-sm" />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          {/* ── CAPTCHA ── */}
          <Captcha onVerified={handleCaptchaVerified} />

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              onClick={() => captchaVerified && navigate('/login')}
              disabled={!captchaVerified}
              className={`btn-primary h-14 text-base w-full flex items-center justify-center gap-2 transition-opacity duration-200 ${
                captchaVerified ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_reg</span>
              Register
            </button>
            <button type="button" onClick={() => navigate('/login')} className="btn-secondary h-14 text-base w-full flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-xl">arrow_back</span>
              Back to Login
            </button>
          </div>

          <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest mt-2">
            Ministry of Railways · Government of India
          </p>
        </form>
      </div>
    </div>
  )
}
