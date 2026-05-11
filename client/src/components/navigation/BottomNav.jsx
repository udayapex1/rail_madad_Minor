import { Link, useLocation } from 'react-router-dom'
import { BOTTOM_NAV_ITEMS } from '../../constants/navigation'
import Icon from '../common/Icon'

export default function BottomNav() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-0 lg:hidden">
      <div className="nav-floating max-w-lg mx-auto">
        <div className="flex justify-around items-center h-[62px] px-2">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 active:scale-90 ${
                  isActive ? 'flex-[1.5]' : 'flex-1'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-primary/10 rounded-2xl animate-scale-in" />
                )}
                <div className={`relative transition-all duration-300 ${isActive ? '-translate-y-1' : ''}`}>
                  <Icon
                    name={item.icon}
                    fill={isActive && item.fillOnActive}
                    className={`transition-all duration-300 ${
                      isActive ? 'text-primary scale-125' : 'text-slate-400 dark:text-slate-500'
                    }`}
                    size="text-2xl"
                  />
                  {isActive && (
                    <span className="absolute -top-1 -right-1 size-1.5 bg-primary rounded-full animate-ping" />
                  )}
                </div>
                <p
                  className={`text-[10px] font-black uppercase tracking-tighter transition-all duration-300 ${
                    isActive ? 'text-primary opacity-100 scale-100' : 'text-slate-400 opacity-60 scale-90'
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
