import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

const tabs = ['Active', 'Resolved', 'All']
const filterPills = ['All Recent', 'Cleanliness', 'Security', 'Catering']

const previousComplaints = [
  {
    id: 'RM-2025-47120',
    icon: 'security',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600',
    title: 'Unauthorized Passenger Entry',
    date: '22 Oct 2026',
    status: 'Resolved',
    priority: 'Medium',
    priorityColor: 'text-blue-600',
  },
  {
    id: 'RM-2025-46001',
    icon: 'restaurant',
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600',
    title: 'Meal Quality Feedback',
    date: '18 Oct 2026',
    status: 'Resolved',
    priority: 'Low',
    priorityColor: 'text-green-600',
  },
]

export default function MyComplaintsList() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [activeFilter, setActiveFilter] = useState(0)

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen animate-fade-in">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center px-4 py-3 justify-between max-w-5xl mx-auto w-full">
            <button
              onClick={() => navigate(-1)}
              className="flex size-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <h2 className="font-black text-base">My Complaints</h2>
            <button className="flex size-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-primary">
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>
          </div>
          {/* Tabs */}
          <div className="px-4 max-w-5xl mx-auto w-full">
            <div className="flex gap-1">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-2.5 text-sm font-bold rounded-t-xl transition-all duration-200 relative ${
                    activeTab === i ? 'text-primary' : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {tab}
                  {activeTab === i && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[3px] bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-5xl mx-auto w-full pb-28 lg:pb-8">
          {/* Filter Pills */}
          <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar">
            {filterPills.map((pill, i) => (
              <button
                key={pill}
                onClick={() => setActiveFilter(i)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  activeFilter === i
                    ? 'bg-primary text-white shadow-glow'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {pill}
              </button>
            ))}
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:items-start lg:px-4">
          {/* Active Complaint Card */}
          <div className="px-4 lg:px-0 pb-4">
            <div className="card overflow-hidden ring-2 ring-primary/30">
              <div className="h-1 bg-gradient-to-r from-primary to-[#1500cc]" />
              <div className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-primary">Complaint ID</span>
                    <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 -mt-0.5">RM-2025-48291</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-[10px] font-black">
                    HIGH PRIORITY
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/[0.04] border border-primary/10">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-3xl">cleaning_services</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">Cleanliness Issue</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Coach B4, Seat 22 â€¢ 24 Oct 2026</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="pt-2">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Timeline</h5>
                  <div className="relative space-y-4 ml-2">
                    {[
                      { label: 'Pending', time: '24 Oct, 09:15 AM', done: true, active: false },
                      { label: 'In Progress', time: '24 Oct, 10:30 AM', done: false, active: true, note: 'Station Master - NDLS' },
                      { label: 'Resolved', time: 'Expected by 02:00 PM', done: false, active: false },
                    ].map((step, idx) => (
                      <div key={step.label} className="relative flex gap-3">
                        {idx < 2 && (
                          <div className={`absolute left-[9px] top-5 h-full w-0.5 ${step.done || step.active ? 'bg-primary/40' : 'bg-slate-200 dark:bg-slate-700'}`} />
                        )}
                        <div className={`z-10 shrink-0 size-5 rounded-full ring-4 ring-white dark:ring-slate-900 flex items-center justify-center ${
                          step.done ? 'bg-primary' : step.active ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
                        }`}>
                          {step.done && <span className="material-symbols-outlined text-white text-[11px]">check</span>}
                          {step.active && <div className="size-2 rounded-full bg-white" />}
                        </div>
                        <div>
                          <p className={`text-sm font-bold leading-none ${step.active ? 'text-primary' : step.done ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400'}`}>
                            {step.label}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">{step.time}</p>
                          {step.note && (
                            <p className="text-xs mt-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-lg">
                              {step.note}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 flex gap-2">
                <button
                  onClick={() => navigate('/feedback')}
                  className="btn-primary flex-1 h-10 text-sm flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">rate_review</span>
                  Update Feedback
                </button>
                <button
                  onClick={() => navigate('/chat')}
                  className="btn-secondary px-4 h-10 text-sm flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">support_agent</span>
                  Help
                </button>
              </div>
            </div>
          </div>

          {/* Previous Complaints */}
          <div className="px-4 lg:px-0 flex flex-col gap-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Previous Requests</p>
            {previousComplaints.map((complaint) => (
              <div
                key={complaint.id}
                className="card-interactive flex items-center gap-3 p-4"
              >
                <div className={`size-12 rounded-xl shrink-0 ${complaint.iconBg} flex items-center justify-center ${complaint.iconColor}`}>
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>{complaint.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <p className="text-[10px] text-slate-400 font-medium">{complaint.id}</p>
                    <span className={`text-[10px] font-black uppercase ${complaint.priorityColor}`}>{complaint.priority}</span>
                  </div>
                  <p className="text-sm font-bold truncate">{complaint.title}</p>
                  <p className="text-xs text-slate-400">{complaint.date} Â· {complaint.status}</p>
                </div>
                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 shrink-0">chevron_right</span>
              </div>
            ))}
          </div>
          </div>{/* end lg:grid */}
        </main>

        <BottomNav />
      </div>
    </div>
  )
}
