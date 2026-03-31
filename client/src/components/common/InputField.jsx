import Icon from './Icon'

/**
 * Reusable form input with leading icon + label + error state.
 *
 * @param {string}  label       — Field label
 * @param {string}  icon        — Material icon name for leading icon
 * @param {string}  type        — Input type
 * @param {string}  placeholder — Placeholder text
 * @param {string}  value       — Controlled value
 * @param {func}    onChange     — Change handler
 * @param {string}  error       — Error message (optional)
 * @param {boolean} required    — HTML required attribute
 * @param {string}  className   — Additional classes on the wrapper
 * @param {object}  inputProps  — Extra props spread on <input>
 * @param {node}    trailing    — Trailing element (e.g. visibility toggle)
 */
export default function InputField({
  label,
  icon,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = '',
  inputProps = {},
  trailing,
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`.trim()}>
      {label && (
        <label className="text-slate-700 dark:text-slate-300 text-sm font-bold">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <Icon
            name={icon}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size="text-xl"
          />
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`input-field h-14 ${icon ? 'pl-12' : 'pl-4'} ${trailing ? 'pr-12' : 'pr-4'} text-sm`}
          {...inputProps}
        />
        {trailing && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">{trailing}</div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1.5">
          <Icon name="error" fill size="text-sm" />
          {error}
        </p>
      )}
    </div>
  )
}
