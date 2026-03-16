import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

const stats = [
  { label: 'Total Filed', value: '12', icon: 'assignment' },
  { label: 'Resolved',    value: '9',  icon: 'check_circle' },
  { label: 'Pending',     value: '3',  icon: 'schedule' },
]

const menuSections = [
  {
    title: 'Account',
    items: [
      { icon: 'person_edit',   label: 'Edit Profile',     color: 'text-blue-500',   bg: 'bg-blue-50   dark:bg-blue-900/20'   },
      { icon: 'lock',          label: 'Change Password',  color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
      { icon: 'notifications', label: 'Notifications',    color: 'text-amber-500',  bg: 'bg-amber-50  dark:bg-amber-900/20'  },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'help',   label: 'Help & FAQ',       color: 'text-teal-500',   bg: 'bg-teal-50   dark:bg-teal-900/20'   },
      { icon: 'policy', label: 'Privacy Policy',   color: 'text-slate-500',  bg: 'bg-slate-100 dark:bg-slate-800'     },
      { icon: 'info',   label: 'About Rail Madad', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    ],
  },
]

export default function Profile() {
  const navigate = useNavigate()

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">

      {/* ── Gradient header — full width ── */}
      <div
        className="relative overflow-hidden pt-4 pb-20 lg:pb-12 px-4"
        style={{ background: 'linear-gradient(135deg, #000099 0%, #1500cc 55%, #2800ff 100%)' }}
      >
        {/* Page title row */}
        <div className="max-w-4xl mx-auto flex items-center mb-5">
          <button
            onClick={() => navigate(-1)}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15 border border-white/20 text-white hover:bg-white/25 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <h2 className="text-white font-black flex-1 text-center text-base">Profile</h2>
          <div className="size-10" />
        </div>
        <div className="absolute -top-10 -right-10 size-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 size-40 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center lg:flex-row lg:items-center lg:gap-8">

          {/* Avatar */}
          <div className="relative inline-flex mb-4 lg:mb-0 shrink-0">
            <div className="flex size-24 items-center justify-center rounded-3xl bg-white/20 border-2 border-white/30 shadow-float">
              <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            </div>
            <button className="absolute -bottom-1.5 -right-1.5 flex size-8 items-center justify-center rounded-xl bg-white shadow-card border border-slate-100">
              <span className="material-symbols-outlined text-primary text-base">photo_camera</span>
            </button>
          </div>

          {/* Name + email + PNR */}
          <div className="text-center lg:text-left flex-1">
            <h1 className="text-white text-xl font-extrabold tracking-tight">Ramesh Kumar</h1>
            <p className="text-white/70 text-sm mt-0.5">ramesh.kumar@example.com</p>
            <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-white/15 border border-white/20">
              <span className="material-symbols-outlined text-white/80 text-sm">train</span>
              <span className="text-white/90 text-xs font-bold">PNR: 4821039456</span>
            </div>
          </div>

          {/* Stats — shown in gradient on desktop */}
          <div className="hidden lg:grid grid-cols-3 gap-4 shrink-0">
            {stats.map(({ label, value, icon }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 px-5 py-4 bg-white/10 border border-white/15 rounded-2xl">
                <span className="material-symbols-outlined text-white/90 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                <p className="text-white text-2xl font-extrabold leading-none">{value}</p>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider text-center">{label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── White content area ── */}
      <div className="-mt-8 lg:mt-0 rounded-t-[32px] lg:rounded-none bg-white dark:bg-slate-900 px-4 pt-6 pb-32 lg:pb-8">
        <div className="max-w-4xl mx-auto">

          {/* Stats row — mobile only */}
          <div className="lg:hidden grid grid-cols-3 gap-3 mb-8">
            {stats.map(({ label, value, icon }) => (
              <div key={label} className="card flex flex-col items-center gap-1.5 py-4">
                <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 leading-none">{value}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">{label}</p>
              </div>
            ))}
          </div>

          {/* Menu sections — 2-col on desktop */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-6 mb-6">
            {menuSections.map((section) => (
              <div key={section.title} className="mb-6 lg:mb-0">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">{section.title}</p>
                <div className="card overflow-hidden !p-0 divide-y divide-slate-100 dark:divide-slate-800">
                  {section.items.map(({ icon, label, color, bg }) => (
                    <button
                      key={label}
                      className="w-full flex items-center gap-3.5 px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors active:scale-[0.98]"
                    >
                      <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${bg}`}>
                        <span className={`material-symbols-outlined text-xl ${color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                      </div>
                      <p className="flex-1 text-sm font-semibold text-slate-800 dark:text-slate-100 text-left">{label}</p>
                      <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-lg">chevron_right</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sign out */}
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 text-red-500 font-bold text-sm transition-all hover:bg-red-100 dark:hover:bg-red-900/20 active:scale-95"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Sign Out
          </button>

          <p className="text-center text-[11px] text-slate-400 mt-5">Rail Madad v2.0 · Ministry of Railways</p>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
