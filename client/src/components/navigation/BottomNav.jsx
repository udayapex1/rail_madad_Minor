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
                className="relative flex flex-col items-center justify-center gap-[3px] px-5 py-2 rounded-xl transition-all duration-200 active:scale-90"
              >
                {isActive && (
                  <span className="absolute inset-0 bg-primary/[0.08] rounded-xl" />
                )}
                <Icon
                  name={item.icon}
                  fill={isActive && item.fillOnActive}
                  className={`transition-all duration-200 ${
                    isActive ? 'text-primary scale-110' : 'text-slate-400 dark:text-slate-500'
                  }`}
                  size="text-[22px]"
                />
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
