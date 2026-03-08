import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

export default function AIAnalysisResult() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 animate-fade-in">

      {/* Gradient Header */}
      <div className="gradient-header relative overflow-hidden shrink-0">
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/5" />

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center px-4 py-4">
            <button
              onClick={() => navigate(-1)}
              className="size-10 bg-white/15 border border-white/20 rounded-xl flex items-center justify-center text-white"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <h2 className="text-white font-black flex-1 text-center pr-10">Rail Madad AI</h2>
          </div>

          {/* AI icon + status — stacked on mobile, side-by-side on desktop */}
          <div className="px-4 pb-8 pt-2 flex flex-col lg:flex-row lg:items-center lg:gap-10 lg:pb-10 animate-bounce-in">
            <div className="flex justify-center lg:justify-start shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl" />
                <div className="relative size-28 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center backdrop-blur-sm">
                  <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                </div>
                <div className="absolute -bottom-2 -right-2 size-9 rounded-full bg-green-400 border-4 border-white dark:border-slate-900 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
              </div>
            </div>
            <div className="mt-5 lg:mt-0 text-center lg:text-left">
              <h1 className="text-white text-xl lg:text-2xl font-black">AI Processing Complete</h1>
              <p className="text-blue-100/80 text-xs lg:text-sm mt-1">Analyzed with 98% accuracy</p>
              <div className="hidden lg:flex items-center gap-1 mt-3 bg-green-400/20 border border-green-400/30 px-3 py-1.5 rounded-full w-fit">
                <span className="material-symbols-outlined text-green-300 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-green-200 text-xs font-bold">Complaint #RM-2025-48291 created</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24 lg:pb-8">
        <div className="p-4 max-w-4xl mx-auto animate-slide-up">
          <div className="card overflow-hidden">
            <div className="flex justify-between items-center p-4 bg-primary/[0.04] border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-primary">Analysis Report</span>
              </div>
              <div className="flex items-center gap-1 bg-red-100 dark:bg-red-900/30 px-2.5 py-1 rounded-full">
                <span className="material-symbols-outlined text-red-600 text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>priority_high</span>
                <span className="text-[10px] font-black text-red-600 dark:text-red-400">URGENCY: HIGH</span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <h3 className="font-black text-lg">AI understood your complaint</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { icon: 'cleaning_services', label: 'Issue Type',   value: 'Cleanliness Issue', color: 'bg-blue-50   dark:bg-blue-900/20   text-blue-600'   },
                  { icon: 'fingerprint',        label: 'Complaint ID', value: 'RM-2025-48291',     color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600' },
                  { icon: 'group',              label: 'Department',   value: 'Housekeeping',      color: 'bg-green-50  dark:bg-green-900/20  text-green-600'  },
                  { icon: 'schedule',           label: 'Status',       value: 'Pending Action',    color: 'bg-amber-50  dark:bg-amber-900/20  text-amber-600'  },
                ].map(({ icon, label, value, color }) => (
                  <div key={label} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                    <div className={`size-8 rounded-lg ${color} flex items-center justify-center mb-2`}>
                      <span className="material-symbols-outlined text-base">{icon}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">{label}</p>
                    <p className="text-sm font-bold mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">
                  &ldquo;The passenger reports unsanitary conditions in Coach B4, Seat 22. Immediate attention required for floor and upholstery cleaning.&rdquo;
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/complaints')}
            className="btn-primary mt-4 w-full h-14 text-base flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>track_changes</span>
            Track Complaint
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
