import { useNavigate } from 'react-router-dom'
import Icon from '../../../components/common/Icon'

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section id="home" className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in">
          <div className="hidden sm:flex items-center gap-2 mb-6">
            <div className="h-[1px] w-8 bg-primary/40" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Official Grievance Portal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tight text-slate-900 dark:text-white font-display">
            Rail Madad <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Grievance Redressal</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 mb-10 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed px-2 sm:px-0">
            Mobile-first grievance platform for Indian Railways. Submit complaints, attach evidence, and track status with intelligent AI-powered categorization.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto px-8 h-14 btn-primary flex items-center justify-center gap-2 group"
            >
              File a Complaint
              <Icon name="arrow_forward" className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate('/track')}
              className="w-full sm:w-auto px-8 h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              Track Complaint
            </button>
          </div>
        </div>

        <div className="relative animate-float pointer-events-none select-none lg:mt-12">
          <div className="relative aspect-square w-full max-w-[520px] mx-auto">
            <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-[4rem] blur-3xl" />
            <div className="relative bg-white/20 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[4rem] border border-white/40 dark:border-slate-700/50 shadow-glow p-4 transform rotate-2 overflow-hidden group hover:rotate-0 hover:scale-[1.02] transition-all duration-700">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

              <img
                src="/hero_train.png"
                alt="Train Illustration"
                className="relative z-10 w-full h-auto mx-auto drop-shadow-2xl rounded-3xl transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
