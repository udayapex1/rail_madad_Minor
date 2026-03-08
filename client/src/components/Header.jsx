import { useNavigate } from 'react-router-dom'

export default function Header({ title, subtitle, showBack = false, showNotification = false }) {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-10 flex items-center bg-background-light dark:bg-background-dark p-4 border-b border-primary/10">
      {showBack ? (
        <button
          onClick={() => navigate(-1)}
          className="flex size-12 items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
          aria-label="Go back"
        >
          <span className="material-symbols-outlined text-primary text-3xl">arrow_back</span>
        </button>
      ) : (
        <div className="flex size-12 shrink-0 items-center justify-start">
          <span className="material-symbols-outlined text-primary text-3xl">menu</span>
        </div>
      )}

      <div className="flex-1 text-center pr-12">
        <h2 className="text-lg font-bold leading-tight tracking-tight text-primary">{title}</h2>
        {subtitle && (
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">{subtitle}</p>
        )}
      </div>

      {showNotification && (
        <button className="absolute right-4 flex items-center justify-center rounded-xl h-10 w-10 bg-primary/10 text-primary">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      )}
    </header>
  )
}
