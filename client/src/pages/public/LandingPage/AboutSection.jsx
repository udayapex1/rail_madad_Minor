import Icon from '../../../components/common/Icon'

const features = [
  {
    icon: 'auto_awesome',
    title: 'AI Smart Routing',
    desc: 'Complaints are automatically categorized and routed to the respective departments for faster processing.',
  },
  {
    icon: 'monitoring',
    title: 'Live Tracking',
    desc: 'Real-time updates on your complaint status with detailed logs of actions taken by officials.',
  },
  {
    icon: 'diversity_3',
    title: 'User Centric',
    desc: 'Designed with accessibility and ease of use in mind, catering to millions of Indian Railway passengers.',
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

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all group"
            >
              <div className="size-14 rounded-2xl bg-white dark:bg-slate-800 shadow-card flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                <Icon name={feature.icon} className="text-primary group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
