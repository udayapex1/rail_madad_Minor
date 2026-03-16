import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home',       icon: 'home',         path: '/home',         fillOnActive: true },
  { label: 'Complaints', icon: 'assignment',    path: '/complaints',   fillOnActive: true },
  { label: 'AI Help',    icon: 'smart_toy',     path: '/ai-analysis',  fillOnActive: true },
  { label: 'Chat',       icon: 'support_agent', path: '/chat',         fillOnActive: true },
  { label: 'Profile',    icon: 'person',        path: '/profile',      fillOnActive: true },
]

export default function SideNav({ isOpen, onClose }) {
  const { pathname } = useLocation()

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-[280px] lg:w-[240px] bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 z-[70] transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}
      >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="size-9 rounded-xl bg-gradient-to-br from-primary to-[#2800ff] flex items-center justify-center shadow-glow shrink-0">
          <span
            className="material-symbols-outlined text-white text-xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            train
          </span>
        </div>
        <div className="flex-1">
          <p className="text-primary font-black text-[15px] leading-tight">Rail Madad</p>
          <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-widest">v2.0 Official</p>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden flex size-8 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined text-slate-400 text-xl">close</span>
        </button>
      </div>

      {/* File Complaint CTA */}
      <div className="px-4 py-4">
        <Link
          to="/file-complaint"
          onClick={onClose}
          className="btn-primary w-full h-11 text-sm flex items-center justify-center gap-2"
        >
          <span
            className="material-symbols-outlined text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            add_circle
          </span>
          File Complaint
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary/[0.08] text-primary'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] shrink-0 ${isActive ? 'text-primary' : ''}`}
                style={isActive && item.fillOnActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className={`text-sm font-bold flex-1 ${isActive ? 'text-primary' : ''}`}>
                {item.label}
              </span>
              {isActive && <span className="w-1 h-5 rounded-full bg-primary shrink-0" />}
            </Link>
          )
        })}
      </nav>

      {/* User footer */}
      <div className="px-3 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800">
        <Link
          to="/profile"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <span
              className="material-symbols-outlined text-primary text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              person
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">Ramesh Kumar</p>
            <p className="text-xs text-slate-400 truncate">ramesh@example.com</p>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-lg shrink-0">chevron_right</span>
        </Link>
      </div>
    </aside>
    </>
  )
}
