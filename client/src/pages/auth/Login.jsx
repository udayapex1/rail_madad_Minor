import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../components/layout'
import { InputField } from '../../components/common'
import Icon from '../../components/common/Icon'
import Captcha from '../../components/Captcha'

const LOGIN_FEATURES = [
  { icon: 'shield',               text: 'Secure and encrypted login' },
  { icon: 'notifications_active', text: 'Real-time complaint updates' },
  { icon: 'history',              text: 'Full complaint history' },
]

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)

  const handleCaptchaVerified = useCallback((verified) => {
    setCaptchaVerified(verified)
  }, [])

  return (
    <AuthLayout
      icon="train"
      title="Welcome Back!"
      subtitle="Sign in to Rail Madad and manage your complaints easily."
      features={LOGIN_FEATURES}
    >
      <div className="space-y-5">
        <div className="hidden lg:block mb-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Sign in</h2>
          <p className="text-slate-500 text-sm mt-1">Enter your credentials to continue</p>
        </div>

        <InputField
          label="Email / Phone"
          icon="person"
          placeholder="Enter your email or phone"
        />

        <InputField
          label="Password"
          icon="lock"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-slate-400 hover:text-primary transition-colors"
            >
              <Icon name={showPassword ? 'visibility_off' : 'visibility'} size="text-xl" />
            </button>
          }
        />

        <div className="flex justify-end">
          <button className="text-primary text-sm font-semibold hover:underline">Forgot Password?</button>
        </div>

        <Captcha onVerified={handleCaptchaVerified} />

        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={() => captchaVerified && navigate('/home')}
            disabled={!captchaVerified}
            className={`btn-primary h-14 text-base w-full flex items-center justify-center gap-2 transition-opacity duration-200 ${
              captchaVerified ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <Icon name="login" fill size="text-xl" />
            Login
          </button>

          <div className="relative flex items-center py-1">
            <div className="flex-grow border-t border-slate-100 dark:border-slate-800" />
            <span className="flex-shrink mx-3 text-slate-400 text-xs font-medium">or</span>
            <div className="flex-grow border-t border-slate-100 dark:border-slate-800" />
          </div>

          <button onClick={() => navigate('/register')} className="btn-secondary h-14 text-base w-full flex items-center justify-center gap-2">
            <Icon name="person_add" size="text-xl" />
            Create Account
          </button>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest text-center">Ministry of Railways · Government of India</p>
        </div>
      </div>
    </AuthLayout>
  )
}
