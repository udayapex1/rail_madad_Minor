import Icon from '../../../components/common/Icon'

const features = [
  {
    icon: 'confirmation_number',
    title: 'PNR Status',
    desc: 'Real-time passenger name record lookup for instant travel updates.',
  },
  {
    icon: 'edit_note',
    title: 'File Complaints',
    desc: 'Submit and track grievances end-to-end with secure evidence attachments.',
  },
  {
    icon: 'psychology',
    title: 'AI Analysis',
    desc: 'Intelligent complaint categorization and automated next-step suggestions.',
  },
  {
    icon: 'forum',
    title: 'Chat Support',
    desc: 'AI-powered live chat assistant for immediate passenger assistance.',
  },
  {
    icon: 'lock',
    title: 'Secure Auth',
    desc: 'Robust JWT-based authentication with secure HTTP-only cookie protection.',
  },
  {
    icon: 'cloud_upload',
    title: 'Cloud Uploads',
    desc: 'Seamlessly attach up to 5 images or documents per complaint via Cloudinary.',
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 border-y border-slate-100 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 px-4">
          <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-3">About the Platform</h2>
          <h3 className="text-3xl lg:text-4xl font-black tracking-tight">Redefining Passenger Experience</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-glow transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute -top-4 -right-4 p-8 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                <Icon name={feature.icon} size="text-[120px]" className="text-primary" />
              </div>
              <div className="size-14 rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-card flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 group-hover:shadow-glow transition-all duration-300 relative z-10">
                <Icon name={feature.icon} className="text-primary group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold mb-3 relative z-10">{feature.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm relative z-10">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
