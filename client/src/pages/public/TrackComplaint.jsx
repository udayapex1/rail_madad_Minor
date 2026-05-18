import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../components/layout'
import { InputField, Icon } from '../../components/common'
import { StatusBadge } from '../../components/common'
import { Timeline } from '../../components/feedback'
import api from '../../services/api'

const TRACK_FEATURES = [
  { icon: 'timeline',             text: 'Step-by-step resolution timeline' },
  { icon: 'notifications_active', text: 'Live status without an account' },
  { icon: 'verified_user',        text: 'Secure — read-only access' },
]

export default function TrackComplaint() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  const getIconData = (category) => {
    switch (category) {
      case 'Security':
        return { icon: 'security', iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600' }
      case 'Cleanliness':
        return { icon: 'cleaning_services', iconBg: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600' }
      default:
        return { icon: 'assignment', iconBg: 'bg-slate-100 dark:bg-slate-800', iconColor: 'text-slate-600' }
    }
  }

  const getPriorityColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
      case 'Medium': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
      default: return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
    }
  }

  const getStatusColors = (status) => {
    switch (status) {
      case 'Pending': return { bg: 'bg-amber-100 dark:bg-amber-900/30', color: 'text-amber-700 dark:text-amber-400' }
      case 'Resolved': return { bg: 'bg-green-100 dark:bg-green-900/30', color: 'text-green-700 dark:text-green-400' }
      default: return { bg: 'bg-blue-100 dark:bg-blue-900/30', color: 'text-blue-700 dark:text-blue-400' }
    }
  }

  const getProgress = (status) => {
    if (status === 'Pending') return 25
    if (status === 'In Progress') return 50
    if (status === 'Resolved') return 100
    return 10
  }

  async function handleTrack(e) {
    e.preventDefault()
    const id = input.trim().toUpperCase()
    if (!id) { setError('Please enter a complaint ID'); return }
    setError(''); setLoading(true); setResult(null); setSearched(false)

    try {
      const res = await api.get(`/complaints/${id}`)
      // console.log(res)
      if (res.success && res.data) {
        const c = res.data
        const statusColors = getStatusColors(c.status)
        const iconData = getIconData(c.category)
        
        const formattedResult = {
          id: c.complaintId,
          status: c.status,
          statusBg: statusColors.bg,
          statusColor: statusColors.color,
          icon: iconData.icon,
          iconBg: iconData.iconBg,
          iconColor: iconData.iconColor,
          title: c.aiMetadata?.description || c.rawText || c.category,
          coach: c.pnrNumber ? 'PNR: ' + c.pnrNumber : 'General',
          train: c.department?.name || 'Department Pending',
          filedDate: new Date(c.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          priority: c.urgency ? c.urgency.toUpperCase() : 'LOW',
          priorityColor: getPriorityColor(c.urgency),
          assignedTo: c.department?.name || 'Pending Assignment',
          progress: getProgress(c.status),
          lastUpdated: new Date(c.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          image: c.mediaFiles && c.mediaFiles.length > 0 ? c.mediaFiles[0].url : null,
          timeline: c.timeline?.map((t, idx) => ({
            label: t.status,
            time: new Date(t.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            note: t.note,
            done: idx < c.timeline.length - 1,
            active: idx === c.timeline.length - 1
          })) || []
        }
        
        setResult(formattedResult)
      } else {
        if (id.startsWith('RM-')) setError('No complaint found with this ID. Please check and try again.')
        else setError('Invalid complaint ID format. IDs look like RM-2025-48291.')
      }
    } catch (err) {
      console.error(err)
      const msg = err.message?.toLowerCase() || ''
      // If it's a 404 or "not found" or similar validation error, let the bottom UI handle it beautifully
      if (msg.includes('404') || msg.includes('not found') || msg.includes('invalid') || msg.includes('cast')) {
         // Do not set error state. `searched` will trigger the empty state.
      } else {
         setError(err.message || 'An error occurred while tracking the complaint.')
      }
    } finally {
      setLoading(false)
      setSearched(true)
    }
  }

  return (
    <AuthLayout
      icon="gps_fixed"
      title="Track Complaint"
      subtitle="Get real-time status updates without logging in."
      features={TRACK_FEATURES}
      panelMinH="min-h-[38vh]"
    >
      {/* Desktop heading */}
      <div className="hidden lg:block mb-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Track Your Complaint</h2>
        <p className="text-slate-500 text-sm mt-1">Enter the complaint ID from your confirmation receipt.</p>
      </div>

      {/* Search form */}
      <form onSubmit={handleTrack} className="flex flex-col gap-3">
        <InputField
          label="Complaint ID"
          icon="confirmation_number"
          placeholder="e.g. RM-2025-48291"
          value={input}
          onChange={(e) => { setInput(e.target.value.toUpperCase()); setError(''); setSearched(false); setResult(null) }}
          error={error}
          inputProps={{
            autoComplete: 'off',
            spellCheck: false,
            className: 'input-field h-14 pl-12 tracking-widest font-bold text-primary placeholder:font-normal placeholder:tracking-normal uppercase',
          }}
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary h-[52px] text-base w-full flex items-center justify-center gap-2 disabled:opacity-70 mt-1"
        >
          {loading ? (
            <>
              <span className="size-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Icon name="search" fill size="text-xl" />
              Track Complaint
            </>
          )}
        </button>
      </form>

      {/* Hint */}
      {!result && !loading && !searched && (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-primary/[0.05] border border-primary/10 mt-5">
          <Icon name="info" fill className="text-primary shrink-0 mt-0.5" size="text-lg" />
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Your complaint ID (e.g.{' '}
            <button
              type="button"
              onClick={() => { setInput('RM-2025-48291'); setError(''); setResult(null); setSearched(false) }}
              className="font-bold text-primary underline underline-offset-2"
            >
              RM-2025-48291
            </button>
            ) was sent to your registered email or phone when you filed the complaint.
          </p>
        </div>
      )}

      {/* Result Card */}
      {result && (
        <div className="mt-5 animate-slide-up space-y-1">
          <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-card">
            {/* Progress bar top accent */}
            <div className="h-1.5 bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-primary to-[#2800ff] rounded-full transition-all duration-700"
                style={{ width: `${result.progress}%` }}
              />
            </div>

            <div className="p-4 space-y-4">
              {/* ID + status */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Complaint ID</p>
                  <p className="text-sm font-black text-primary mt-0.5">{result.id}</p>
                </div>
                <StatusBadge label={result.status} bgColor={result.statusBg} textColor={result.statusColor} />
              </div>

              {/* Complaint info */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                <div className={`size-11 rounded-xl shrink-0 flex items-center justify-center ${result.iconBg} ${result.iconColor}`}>
                  <Icon name={result.icon} fill size="text-2xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate line-clamp-1">{result.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{result.coach} · {result.train}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Filed: {result.filedDate}</p>
                </div>
                <StatusBadge label={result.priority} bgColor={result.priorityColor.split(' ').slice(0, 2).join(' ')} textColor={result.priorityColor.split(' ').slice(2).join(' ')} />
              </div>

              {/* Assigned to */}
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 bg-primary/[0.04] border border-primary/10 rounded-xl px-3 py-2.5">
                <Icon name="support_agent" fill className="text-primary shrink-0" size="text-[18px]" />
                <span className="text-xs">Assigned to <span className="font-bold">{result.assignedTo}</span></span>
              </div>

              {/* Image Attachment */}
              {result.image && (
                <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700/50">
                  <img src={result.image} alt="Complaint attachment" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              )}

              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-500">
                  <span className="font-medium">Resolution Progress</span>
                  <span className="font-black text-primary">{result.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-[#2800ff] rounded-full transition-all duration-700"
                    style={{ width: `${result.progress}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Icon name="schedule" size="text-xs" />
                  Updated {result.lastUpdated}
                </p>
              </div>

              {/* Timeline */}
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Resolution Timeline</p>
                <Timeline steps={result.timeline} />
              </div>
            </div>

            {/* Footer CTA */}
            <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-3 flex gap-2">
              <button
                onClick={() => navigate('/login')}
                className="btn-primary flex-1 h-10 text-sm flex items-center justify-center gap-1.5"
              >
                <Icon name="login" fill size="text-base" />
                Login for Full Details
              </button>
              <button
                onClick={() => { setResult(null); setInput(''); setSearched(false) }}
                className="btn-secondary px-4 h-10 text-sm flex items-center justify-center"
              >
                <Icon name="refresh" size="text-base" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Not found */}
      {searched && !result && !error && (
        <div className="mt-5 flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 animate-fade-in">
          <Icon name="search_off" className="text-slate-300 dark:text-slate-600" size="text-5xl" />
          <p className="text-slate-500 text-sm font-medium text-center">Invalid complaint ID or complaint does not exist.</p>
        </div>
      )}

      <button
        onClick={() => navigate('/')}
        className="w-full text-center text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors mt-6 flex items-center justify-center gap-1"
      >
        <Icon name="arrow_back" size="text-sm" />
        Back to Home
      </button>
    </AuthLayout>
  )
}
