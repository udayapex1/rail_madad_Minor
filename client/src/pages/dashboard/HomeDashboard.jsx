import { useNavigate, useOutletContext } from 'react-router-dom'
import { PageHeader } from '../../components/layout'
import Icon from '../../components/common/Icon'

export default function HomeDashboard() {
  const navigate = useNavigate()
  const { toggleSidebar } = useOutletContext()

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <PageHeader
        title="Rail Madad"
        onMenuToggle={toggleSidebar}
        trailing={
          <button className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary relative">
            <Icon name="notifications" size="text-[22px]" />
            <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
          </button>
        }
      />

      <main className="flex-1 overflow-y-auto pb-28 lg:pb-8">
        {/* Welcome Banner */}
        <div className="p-4">
          <div className="gradient-header rounded-2xl p-5 overflow-hidden relative animate-fade-in">
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-white/5" />
            <div className="relative z-10 flex items-start justify-between mb-5">
              <div>
                <p className="text-blue-200 text-sm font-medium">Good morning</p>
                <h3 className="text-white text-2xl font-black tracking-tight">Hello, Traveler 👋</h3>
                <p className="text-blue-200/80 text-xs mt-0.5">How can we assist you today?</p>
              </div>
              <div className="size-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
                <Icon name="train" fill className="text-white" size="text-3xl" />
              </div>
            </div>
            <div className="relative z-10 grid grid-cols-3 gap-2">
              {[
                { value: '3', label: 'Active' },
                { value: '12', label: 'Resolved' },
                { value: '2h', label: 'Avg. Time' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
                  <p className="text-white text-xl font-black">{value}</p>
                  <p className="text-blue-200 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 mb-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Actions</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div onClick={() => navigate('/file-complaint')} className="card-interactive overflow-hidden animate-slide-up-1">
              <div className="p-5 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#1500cc] text-white shadow-glow">
                  <Icon name="add_a_photo" fill size="text-3xl" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-black">File a Complaint</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Report with photo, voice or text</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate('/file-complaint') }}
                  className="btn-primary h-10 px-4 text-sm flex items-center gap-1 shrink-0"
                >
                  <Icon name="add" size="text-base" />
                  New
                </button>
              </div>
            </div>

            <div onClick={() => navigate('/complaints')} className="card-interactive animate-slide-up-2">
              <div className="p-5 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600">
                  <Icon name="assignment" fill size="text-3xl" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-black">My Complaints</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">View history and track progress</p>
                </div>
                <Icon name="chevron_right" className="text-slate-300 dark:text-slate-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Status */}
        <div className="px-4 mt-4 animate-slide-up-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent Status</p>
            <button onClick={() => navigate('/complaints')} className="text-primary font-bold text-xs flex items-center gap-1">
              View All <Icon name="arrow_forward" size="text-sm" />
            </button>
          </div>
          <div className="card p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Complaint ID</p>
                <p className="text-sm font-black text-primary">#RM-2025-48291</p>
              </div>
              <span className="badge-active px-2.5 py-1 rounded-full text-[10px] font-bold">In Progress</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Icon name="cleaning_services" size="text-[20px]" />
              </div>
              <div>
                <p className="text-sm font-bold">Cleanliness Issue · Coach B4</p>
                <p className="text-xs text-slate-500">Assigned to DRM Office</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Progress</span>
                <span className="font-bold text-amber-600">65%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 w-[65%] rounded-full" />
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Icon name="schedule" size="text-sm" />
                <span>Updated 2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
