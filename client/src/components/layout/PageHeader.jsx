import { useNavigate } from 'react-router-dom'
import Icon from '../common/Icon'

export default function PageHeader({ title, subtitle, showBack = false }) {
  const navigate = useNavigate()
  
  return (
    <header className="px-6 py-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {showBack && (
          <button 
            onClick={() => navigate(-1)}
            className="size-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-primary transition-all active:scale-90"
          >
            <Icon name="arrow_back" size="text-xl" />
          </button>
        )}
        <div className="leading-tight">
          <h1 className="text-xl font-black tracking-tight">{title}</h1>
          {subtitle && <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{subtitle}</p>}
        </div>
      </div>
      
      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <Icon name="train" size="text-xl" fill />
      </div>
    </header>
  )
}