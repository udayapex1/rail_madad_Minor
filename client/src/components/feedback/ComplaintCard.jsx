import Icon from '../common/Icon'

/**
 * Reusable complaint summary card.
 * Used in MyComplaintsList and HomeDashboard.
 *
 * @param {object}  complaint — Complaint data object
 * @param {func}    onClick   — Click handler
 * @param {string}  className — Additional classes
 */
export default function ComplaintCard({ complaint, onClick, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`card-interactive flex items-center gap-3 p-4 ${className}`.trim()}
    >
      <div
        className={`size-12 rounded-xl shrink-0 ${complaint.iconBg} flex items-center justify-center ${complaint.iconColor}`}
      >
        <Icon name={complaint.icon} fill size="text-[22px]" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <p className="text-[10px] text-slate-400 font-medium">{complaint.id}</p>
          <span className={`text-[10px] font-black uppercase ${complaint.priorityColor}`}>
            {complaint.priority}
          </span>
        </div>
        <p className="text-sm font-bold truncate">{complaint.title}</p>
        <p className="text-xs text-slate-400">
          {complaint.date} · {complaint.status}
        </p>
      </div>

      <Icon name="chevron_right" className="text-slate-300 dark:text-slate-600 shrink-0" />
    </div>
  )
}
