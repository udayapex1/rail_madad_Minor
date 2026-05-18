import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/layout'
import { Icon, StatusBadge } from '../../components/common'
import { Timeline, ComplaintCard } from '../../components/feedback'
import { COMPLAINT_TABS, COMPLAINT_FILTER_PILLS } from '../../constants/mockData'
import api from '../../services/api'

export default function MyComplaintsList() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [activeFilter, setActiveFilter] = useState(0)
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get('/complaints/my-complaints')
        if (res.success && res.data) {
          setComplaints(res.data)
        }
      } catch (err) {
        console.error('Failed to fetch complaints:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchComplaints()
  }, [])

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
      case 'High': return 'text-red-600'
      case 'Medium': return 'text-orange-600'
      default: return 'text-green-600'
    }
  }

  const getBadgeColors = (urgency) => {
    switch (urgency) {
      case 'High': return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400' }
      case 'Medium': return { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400' }
      default: return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400' }
    }
  }

  const formatComplaint = (c) => ({
    id: c.complaintId,
    _id: c._id,
    ...getIconData(c.category),
    title: c.aiMetadata?.description || c.rawText || c.category,
    date: new Date(c.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: c.status,
    priority: c.urgency,
    priorityColor: getPriorityColor(c.urgency)
  })

  const filteredComplaints = complaints.filter(c => {
    const isTabMatch = 
      activeTab === 0 ? (c.status === 'Pending' || c.status === 'In Progress') :
      activeTab === 1 ? (c.status === 'Resolved') : true;

    const filterPillName = COMPLAINT_FILTER_PILLS[activeFilter]
    const isPillMatch = 
      activeFilter === 0 ? true : 
      (c.category && c.category === filterPillName);

    return isTabMatch && isPillMatch;
  });

  const activeComplaint = filteredComplaints.length > 0 ? filteredComplaints[0] : null
  const previousComplaints = filteredComplaints.length > 1 ? filteredComplaints.slice(1) : []

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

          {loading ? (
             <div className="p-8 text-center text-slate-500">Loading complaints...</div>
          ) : (
            <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:items-start lg:px-4">
              {/* Active Complaint Card */}
              {activeComplaint && (
                <div className="px-4 lg:px-0 pb-4">
                  <div className="card overflow-hidden ring-2 ring-primary/30">
                    <div className="h-1 bg-gradient-to-r from-primary to-[#1500cc]" />
                    <div className="p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-primary">Complaint ID</span>
                          <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 -mt-0.5">{activeComplaint.complaintId}</h4>
                        </div>
                        <StatusBadge label={`${activeComplaint.urgency} PRIORITY`} bgColor={getBadgeColors(activeComplaint.urgency).bg} textColor={getBadgeColors(activeComplaint.urgency).text} />
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                        <div className={`size-12 rounded-xl shrink-0 flex items-center justify-center ${getIconData(activeComplaint.category).iconBg} ${getIconData(activeComplaint.category).iconColor}`}>
                          <Icon name={getIconData(activeComplaint.category).icon} size="text-3xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate line-clamp-1">{activeComplaint.aiMetadata?.description || activeComplaint.rawText || activeComplaint.category}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {activeComplaint.pnrNumber ? 'PNR: ' + activeComplaint.pnrNumber : 'General'} · {activeComplaint.department?.name || 'Department Pending'}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Filed: {new Date(activeComplaint.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      </div>

                      {/* Assigned to */}
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 bg-primary/[0.04] border border-primary/10 rounded-xl px-3 py-2.5">
                        <Icon name="support_agent" fill className="text-primary shrink-0" size="text-[18px]" />
                        <span className="text-xs">Assigned to <span className="font-bold">{activeComplaint.department?.name || 'Pending Assignment'}</span></span>
                      </div>

                      {/* Image Attachment */}
                      {activeComplaint.mediaFiles && activeComplaint.mediaFiles.length > 0 && (
                        <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700/50">
                          <img src={activeComplaint.mediaFiles[0].url} alt="Complaint attachment" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}

                      {/* Timeline */}
                      {activeComplaint.timeline && activeComplaint.timeline.length > 0 && (
                        <div className="pt-2">
                          <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Timeline</h5>
                          <Timeline
                            steps={activeComplaint.timeline.map((step, idx) => ({
                              label: step.status,
                              time: new Date(step.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                              done: idx < activeComplaint.timeline.length - 1,
                              active: idx === activeComplaint.timeline.length - 1,
                              note: step.note
                            }))}
                          />
                        </div>
                      )}
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
              )}

              {/* Previous Complaints */}
              {previousComplaints.length > 0 && (
                <div className="px-4 lg:px-0 flex flex-col gap-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Previous Requests</p>
                  {previousComplaints.map((complaint) => (
                    <ComplaintCard key={complaint._id} complaint={formatComplaint(complaint)} />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
