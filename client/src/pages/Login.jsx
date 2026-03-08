import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Captcha from '../components/Captcha'

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)

  const handleCaptchaVerified = useCallback((verified) => {
    setCaptchaVerified(verified)
  }, [])

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-background-light dark:bg-background-dark animate-fade-in">

      {/* Left / Top — Gradient Panel */}
      <div className="relative flex-none min-h-[42vh] lg:w-1/2 lg:min-h-screen lg:flex lg:flex-col lg:items-center lg:justify-center gradient-header overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute top-8 -left-12 w-48 h-48 rounded-full bg-white/5" />
        <div className="lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-24 bg-white dark:bg-background-dark rounded-[100%]" />
        <button onClick={() => navigate(-1)} className="absolute top-12 left-4 size-10 bg-white/15 border border-white/20 rounded-xl flex items-center justify-center text-white backdrop-blur-sm">
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-14 pb-16 lg:pt-0 lg:pb-0 animate-bounce-in">
          <div className="size-20 rounded-3xl bg-white/20 border-2 border-white/30 flex items-center justify-center mb-4 backdrop-blur-sm">
            <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>train</span>
          </div>
          <h1 className="text-white text-3xl lg:text-4xl font-black tracking-tight">Welcome Back!</h1>
          <p className="text-blue-100/80 text-sm mt-2 max-w-xs">Sign in to Rail Madad and manage your complaints easily.</p>
          <div className="hidden lg:flex flex-col gap-3 mt-10 w-full max-w-xs text-left">
            {[
              { icon: 'shield',                text: 'Secure and encrypted login' },
              { icon: 'notifications_active',  text: 'Real-time complaint updates' },
              { icon: 'history',               text: 'Full complaint history' },
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
        <div className="max-w-sm w-full space-y-5">
          <div className="hidden lg:block mb-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Sign in</h2>
            <p className="text-slate-500 text-sm mt-1">Enter your credentials to continue</p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-bold">Email / Phone</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person</span>
              <input type="text" placeholder="Enter your email or phone" className="input-field h-14 pl-12 pr-4 text-sm" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-bold">Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
              <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" className="input-field h-14 pl-12 pr-12 text-sm" />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="text-primary text-sm font-semibold hover:underline">Forgot Password?</button>
          </div>

          {/* ── CAPTCHA ── */}
          <Captcha onVerified={handleCaptchaVerified} />

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => captchaVerified && navigate('/home')}
              disabled={!captchaVerified}
              className={`btn-primary h-14 text-base w-full flex items-center justify-center gap-2 transition-opacity duration-200 ${
                captchaVerified ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>login</span>
              Login
            </button>
            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-slate-100 dark:border-slate-800" />
              <span className="flex-shrink mx-3 text-slate-400 text-xs font-medium">or</span>
              <div className="flex-grow border-t border-slate-100 dark:border-slate-800" />
            </div>
            <button onClick={() => navigate('/register')} className="btn-secondary h-14 text-base w-full flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-xl">person_add</span>
              Create Account
            </button>
          </div>
          <div className="mt-6 flex flex-col items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex gap-5 opacity-50">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK-9p8C0eOszS3zyf0jiaAo8MYfN8LrfY_kZnZyvzuM4U4bWDqz8TdTDxvz6EopWMpONA_TcKx2NYp3jT0_qFbCww2Q6km8R9RFm7gdr9TNWhfFve-oKGIoMGFStjCbn54YizedHB7GTBLD1LFVnU-Vmz5n1GOOR8ui47q3DKGBOUjGdt0RPmCgqeSzNOHoa-kJsnhuXY5AR4uihpF0rslB75Iupa4w1Iry1RF01K7PaN5ipUX0Pwx0V0hKoPK-4_KQCPllqElz8E" alt="Indian Railways" className="h-8 w-auto" />
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0c59L574vAuSLLVrLazbvovisjj4uUvX2cXcdl2OXqm_xnVmx9oXAEPntU7mDvw9qlY_pvBBDp5tQ9K1vuxNR3t9pILxQ5fgHhexu6ZFJ5zKN5dNSc2h8wVfPE0xPsTsEMLkmffqJZjHxDCG5IvX4qovq3GdYzo6lN7fRJyh6apKjQRpnlIYj6J2yKE_5CF3xzr_3iIez95nmaa8GNAmXNzKGFcnXqdPWJK3Aj75bCmjQE3z9ePS6B8HJX6nw6JcFdTi0J00kNaU" alt="Digital India" className="h-8 w-auto" />
            </div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest text-center">Ministry of Railways · Government of India</p>
          </div>
        </div>
      </div>
    </div>
  )
}
