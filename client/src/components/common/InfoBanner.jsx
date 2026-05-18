import Icon from './Icon'

export default function InfoBanner({ children, className = '' }) {
  return (
    <div className={`p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 flex gap-3 ${className}`}>
      <Icon name="info" className="text-blue-500 shrink-0" size="text-xl" fill />
      <p className="text-sm text-blue-700 dark:text-blue-300 font-medium leading-relaxed">
        {children}
      </p>
    </div>
  )
}