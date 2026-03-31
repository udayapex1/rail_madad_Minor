import { useNavigate } from 'react-router-dom'
import Icon from '../../../components/common/Icon'

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-[1px] w-8 bg-primary/40" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Official Grievance Portal</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
            Rail Madad <br />
            <span className="text-primary opacity-80">Grievance Redressal</span>
          </h1>

          <p className="text-lg text-slate-500 mb-10 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
            Expedited grievance redressal platform for Indian Railway passengers. Lodge your complaints and track status in real-time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto px-8 h-14 btn-primary flex items-center justify-center gap-2 group"
            >
              Get Started
              <Icon name="arrow_forward" className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate('/track')}
              className="w-full sm:w-auto px-8 h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              Track Complaint
            </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-6 opacity-60">
            <div className="flex items-center gap-2">
              <Icon name="verified" className="text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider">Fast-track Approval</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="support_agent" className="text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider">24/7 Digital Assistant</span>
            </div>
          </div>
        </div>

        <div className="relative animate-float pointer-events-none select-none">
          <div className="relative aspect-square w-full max-w-[520px] mx-auto">
            <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-[4rem] blur-3xl" />
            <div className="relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[4rem] border border-white/40 dark:border-slate-800/40 shadow-float p-8 transform rotate-3 overflow-hidden group hover:rotate-0 transition-transform duration-700">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

              {/* Mock Dashboard UI */}
              <div className="space-y-4 opacity-80 mb-8">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-24 bg-primary/20 rounded-full" />
                  <div className="h-6 w-16 bg-primary/10 rounded-lg" />
                </div>
                <div className="h-32 w-full bg-slate-100 dark:bg-slate-800/80 rounded-2xl flex items-center justify-center">
                  <Icon name="monitoring" className="text-primary/40 animate-pulse" size="text-4xl" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-12 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-white dark:border-slate-700" />
                  <div className="h-12 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-white dark:border-slate-700" />
                </div>
              </div>

              <img
                src="https://img.freepik.com/free-vector/modern-train-concept-illustration_114360-19208.jpg"
                alt="Train Illustration"
                className="relative z-10 w-full h-auto mx-auto brightness-110 contrast-110 mix-blend-multiply dark:mix-blend-screen drop-shadow-2xl"
              />

              <div className="absolute bottom-10 left-10 right-10 p-6 glass rounded-2xl border border-white shadow-lg animate-slide-up">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <Icon name="check_circle" fill size="text-lg" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Live Status</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">AI Assistant Online</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
