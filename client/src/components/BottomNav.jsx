import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home', icon: 'home', path: '/home', fillOnActive: true },
  { label: 'Complaints', icon: 'assignment', path: '/complaints', fillOnActive: true },
  { label: 'AI', icon: 'smart_toy', path: '/ai-analysis', fillOnActive: true },
  { label: 'Profile', icon: 'person', path: '/profile', fillOnActive: true },
]

export default function BottomNav() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-0 lg:hidden">
      <div className="nav-floating max-w-lg mx-auto">
        <div className="flex justify-around items-center h-[62px] px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center justify-center gap-[3px] px-5 py-2 rounded-xl transition-all duration-200 active:scale-90"
              >
                {isActive && (
                  <span className="absolute inset-0 bg-primary/[0.08] rounded-xl" />
                )}
                <span
                  className={`material-symbols-outlined text-[22px] transition-all duration-200 ${
                    isActive ? 'text-primary scale-110' : 'text-slate-400 dark:text-slate-500'
                  }`}
                  style={isActive && item.fillOnActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                <p
                  className={`text-[9px] font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {item.label}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
