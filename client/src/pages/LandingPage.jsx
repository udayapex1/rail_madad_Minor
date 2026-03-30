import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 selection:bg-primary/20 selection:text-primary">
      
      {/* --- HEADER --- */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
          isScrolled 
            ? 'glass py-3 shadow-float' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
              alt="GOI" 
              className="h-10 w-auto brightness-0 dark:brightness-200"
            />
            <div className="h-8 w-[1px] bg-slate-300 dark:bg-slate-700 hidden sm:block" />
            <div className="flex items-center gap-3">
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Indian_Railways_logo.svg/300px-Indian_Railways_logo.svg.png" 
                alt="IR Logo" 
                className="h-14 w-auto object-contain" 
              />
              <div className="leading-tight hidden xs:block">
                <p className="font-extrabold text-primary text-xl lg:text-2xl tracking-tighter">Rail Madad</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Ministry of Railways</p>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-2.5 rounded-2xl bg-primary text-white font-bold text-sm shadow-glow hover:brightness-110 active:scale-95 transition-all"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
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
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
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
                    <span className="material-symbols-outlined text-primary">verified</span>
                    <span className="text-xs font-bold uppercase tracking-wider">Fast-track Approval</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">support_agent</span>
                    <span className="text-xs font-bold uppercase tracking-wider">24/7 Digital Assistant</span>
                </div>
            </div>
          </div>

          <div className="relative animate-float pointer-events-none select-none">
            {/* Visual element placeholder or decorative shape */}
            <div className="relative aspect-square w-full max-w-[520px] mx-auto">
                <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-[4rem] blur-3xl" />
                <div className="relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[4rem] border border-white/40 dark:border-slate-800/40 shadow-float p-8 transform rotate-3 overflow-hidden group hover:rotate-0 transition-transform duration-700">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                    
                    {/* Mock Dashboard UI for AI Feel */}
                    <div className="space-y-4 opacity-80 mb-8">
                        <div className="flex items-center justify-between">
                            <div className="h-3 w-24 bg-primary/20 rounded-full" />
                            <div className="h-6 w-16 bg-primary/10 rounded-lg" />
                        </div>
                        <div className="h-32 w-full bg-slate-100 dark:bg-slate-800/80 rounded-2xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary/40 text-4xl animate-pulse">monitoring</span>
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
                                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
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

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 border-y border-slate-100 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 px-4">
            <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-3">About the Platform</h2>
            <h3 className="text-3xl lg:text-4xl font-black tracking-tight">Redefining Passenger Experience</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'auto_awesome',
                title: 'AI Smart Routing',
                desc: 'Complaints are automatically categorized and routed to the respective departments for faster processing.'
              },
              {
                icon: 'monitoring',
                title: 'Live Tracking',
                desc: 'Real-time updates on your complaint status with detailed logs of actions taken by officials.'
              },
              {
                icon: 'diversity_3',
                title: 'User Centric',
                desc: 'Designed with accessibility and ease of use in mind, catering to millions of Indian Railway passengers.'
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all group"
              >
                <div className="size-14 rounded-2xl bg-white dark:bg-slate-800 shadow-card flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <span className="material-symbols-outlined text-primary group-hover:text-white transition-colors">
                    {feature.icon}
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="card p-8 lg:p-12 glass relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none animate-float">
                <span className="material-symbols-outlined text-[240px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
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
                      <span className="material-symbols-outlined text-xl">phone_in_talk</span>
                    </div>
                    <p className="font-bold">139 (Toll Free)</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-xl">mail</span>
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
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">person</span>
                    <input type="text" placeholder="Your Name" className="input-field pl-12 h-14 bg-white/80 dark:bg-slate-800/50" />
                  </div>
                  
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">mail</span>
                    <input type="email" placeholder="Email Address" className="input-field pl-12 h-14 bg-white/80 dark:bg-slate-800/50" />
                  </div>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-5 text-slate-400 text-lg">chat_bubble</span>
                    <textarea placeholder="How can we help?" rows="4" className="input-field pl-12 py-4 bg-white/80 dark:bg-slate-800/50 resize-none"></textarea>
                  </div>

                  <button className="btn-primary w-full h-14 text-base flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
                    <span>Send Inquiry</span>
                    <span className="material-symbols-outlined text-xl">send</span>
                  </button>
                </div>

                {/* Subtle decorative element inside form */}
                <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-12 border-b border-white/10">
            <div className="flex items-center gap-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                alt="GOI" 
                className="h-12 w-auto invert"
              />
              <div className="h-8 w-[1px] bg-white/20" />
              <div>
                <p className="font-black text-lg uppercase tracking-tight">Rail Madad</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Ministry of Railways</p>
              </div>
            </div>

            <div className="flex gap-6">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Indian_Railways_logo.svg/1200px-Indian_Railways_logo.svg.png" className="h-10 opacity-70 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Indian Railways" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/17/Digital_India_logo.svg" className="h-10 opacity-70 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Digital India" />
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Swachh_Bharat_Abhiyan_logo.svg/1200px-Swachh_Bharat_Abhiyan_logo.svg.png" className="h-10 opacity-70 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Swachh Bharat" />
            </div>
          </div>
          
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <p>&copy; 2024 Rail Madad. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
