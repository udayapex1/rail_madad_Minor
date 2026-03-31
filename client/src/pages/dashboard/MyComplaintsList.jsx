import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/layout'
import { Icon, StatusBadge } from '../../components/common'
import { Timeline, ComplaintCard } from '../../components/feedback'
import { PREVIOUS_COMPLAINTS, COMPLAINT_TABS, COMPLAINT_FILTER_PILLS } from '../../constants/mockData'

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
              <Icon name="arrow_back" size="text-[22px]" />
            </button>
            <h2 className="font-black text-base">My Complaints</h2>
            <button className="flex size-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-primary">
              <Icon name="search" size="text-[22px]" />
            </button>
          </div>
          {/* Tabs */}
          <div className="px-4 max-w-5xl mx-auto w-full">
            <div className="flex gap-1">
              {COMPLAINT_TABS.map((tab, i) => (
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
            {COMPLAINT_FILTER_PILLS.map((pill, i) => (
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
                    <StatusBadge label="HIGH PRIORITY" bgColor="bg-red-100 dark:bg-red-900/30" textColor="text-red-700 dark:text-red-400" />
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/[0.04] border border-primary/10">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Icon name="cleaning_services" size="text-3xl" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">Cleanliness Issue</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Coach B4, Seat 22 • 24 Oct 2026</p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="pt-2">
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Timeline</h5>
                    <Timeline
                      steps={[
                        { label: 'Pending', time: '24 Oct, 09:15 AM', done: true, active: false },
                        { label: 'In Progress', time: '24 Oct, 10:30 AM', done: false, active: true, note: 'Station Master - NDLS' },
                        { label: 'Resolved', time: 'Expected by 02:00 PM', done: false, active: false },
                      ]}
                    />
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 flex gap-2">
                  <button onClick={() => navigate('/feedback')} className="btn-primary flex-1 h-10 text-sm flex items-center justify-center gap-1.5">
                    <Icon name="rate_review" size="text-base" />
                    Update Feedback
                  </button>
                  <button onClick={() => navigate('/chat')} className="btn-secondary px-4 h-10 text-sm flex items-center justify-center gap-1.5">
                    <Icon name="support_agent" size="text-base" />
                    Help
                  </button>
                </div>
              </div>
            </div>

            {/* Previous Complaints */}
            <div className="px-4 lg:px-0 flex flex-col gap-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Previous Requests</p>
              {PREVIOUS_COMPLAINTS.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
