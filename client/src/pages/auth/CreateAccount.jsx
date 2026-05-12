import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../components/layout'
import { InputField } from '../../components/common'
import { useAuth } from '../../context/AuthContext'
import Icon from '../../components/common/Icon'

const REGISTER_FEATURES = [
  { icon: 'track_changes',  text: 'Track all your complaints live' },
  { icon: 'support_agent',  text: 'Chat directly with support agents' },
  { icon: 'star',           text: 'Rate and review resolutions' },
]

export default function CreateAccount() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await register(formData)
    if (result.success) {
      navigate('/login', { state: { message: 'Registration successful! Please login.' } })
    } else {
      setError(result.message || 'Registration failed. Please try again.')
    }
    setLoading(false)
  }

  return (
    <AuthLayout
      icon="person_add"
      title="Create Account"
      subtitle="Join Rail Madad for better railway assistance"
      features={REGISTER_FEATURES}
      panelMinH="min-h-[35vh]"
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="hidden lg:block mb-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Create Account</h2>
          <p className="text-slate-500 text-sm mt-1">Fill in your details to get started</p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm font-bold flex items-center gap-2">
            <Icon name="error" fill size="text-lg" />
            {error}
          </div>
        )}

        <InputField
          label="Full Name"
          icon="person"
          type="text"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          inputProps={{ autoComplete: 'name' }}
        />
        <InputField
          label="Phone Number"
          icon="call"
          type="tel"
          placeholder="10-digit mobile number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          inputProps={{ autoComplete: 'tel' }}
        />
        <InputField
          label="Email Address"
          icon="mail"
          type="email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          inputProps={{ autoComplete: 'email' }}
        />

        <InputField
          label="Password"
          icon="lock"
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a strong password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          inputProps={{ autoComplete: 'new-password' }}
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

        <div className="flex flex-col gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary h-14 text-base w-full flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-glow disabled:opacity-50"
          >
            {loading ? 'Registering...' : (
              <>
                <Icon name="how_to_reg" fill size="text-xl" />
                Register
              </>
            )}
          </button>
          <button type="button" onClick={() => navigate('/login')} className="btn-secondary h-14 text-base w-full flex items-center justify-center gap-2">
            <Icon name="arrow_back" size="text-xl" />
            Back to Login
          </button>
        </div>

        <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest mt-2">
          Ministry of Railways · Government of India
        </p>
      </form>
    </AuthLayout>
  )
}
