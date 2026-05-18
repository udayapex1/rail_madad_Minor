import Icon from './Icon'

export default function InputField({ 
  label, 
  icon, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required = false, 
  inputProps = {}, 
  trailing = null,
  className = ""
}) {
  return (
    <div className={`w-full animate-slide-up ${className}`}>
      {label && (
        <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <Icon 
            name={icon} 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" 
            size="text-xl" 
          />
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`input-field h-14 w-full ${icon ? 'pl-12' : 'px-4'} ${trailing ? 'pr-12' : 'pr-4'} bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
          {...inputProps}
        />
        {trailing && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {trailing}
          </div>
        )}
      </div>
    </div>
  )
}