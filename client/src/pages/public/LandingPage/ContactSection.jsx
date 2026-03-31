import Icon from '../../../components/common/Icon'

export default function ContactSection() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="card p-8 lg:p-12 glass relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none animate-float">
            <Icon name="support_agent" fill className="text-primary" size="text-[240px]" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black mb-6 tracking-tight">Need Assistance?</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md font-medium">
                Our team is dedicated to providing you with the best travel experience. Reach out for any technical support or queries.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon name="phone_in_talk" size="text-xl" />
                  </div>
                  <p className="font-bold">139 (Toll Free)</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon name="mail" size="text-xl" />
                  </div>
                  <p className="font-bold">support@railmadad.gov.in</p>
                </div>
              </div>
            </div>

            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-glow-sm relative">
              <div className="mb-6 relative z-10">
                <h4 className="text-xl font-black mb-1">Send a Message</h4>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Professional support at your service</p>
              </div>

              <div className="space-y-5 relative z-10">
                <div className="relative">
                  <Icon name="person" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size="text-lg" />
                  <input type="text" placeholder="Your Name" className="input-field pl-12 h-14 bg-white/80 dark:bg-slate-800/50" />
                </div>

                <div className="relative">
                  <Icon name="mail" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size="text-lg" />
                  <input type="email" placeholder="Email Address" className="input-field pl-12 h-14 bg-white/80 dark:bg-slate-800/50" />
                </div>

                <div className="relative">
                  <Icon name="chat_bubble" className="absolute left-4 top-5 text-slate-400" size="text-lg" />
                  <textarea placeholder="How can we help?" rows="4" className="input-field pl-12 py-4 bg-white/80 dark:bg-slate-800/50 resize-none"></textarea>
                </div>

                <button className="btn-primary w-full h-14 text-base flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
                  <span>Send Inquiry</span>
                  <Icon name="send" size="text-xl" />
                </button>
              </div>

              <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
