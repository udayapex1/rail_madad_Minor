import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Icon from '../../../components/common/Icon'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import ContactSection from './ContactSection'
import Footer from './Footer'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 selection:bg-primary/20 selection:text-primary">

      {/* --- HEADER --- */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
          isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-float py-3' : 'bg-white/20 dark:bg-slate-900/20 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Icon name="train" size="text-3xl" />
              </div>
              <div className="leading-tight hidden xs:block">
                <p className="font-extrabold text-primary text-lg sm:text-xl lg:text-2xl tracking-tighter">Rail Madad</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Ministry of Railways</p>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-slate-300 dark:bg-slate-700 hidden sm:block" />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
              alt="GOI"
              className="h-10 w-auto brightness-0 dark:brightness-200"
            />
          </div>

          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="hidden sm:block px-6 py-2.5 rounded-2xl bg-primary text-white font-bold text-sm shadow-glow hover:brightness-110 active:scale-95 transition-all"
            >
              Login
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              <Icon name={isMobileMenuOpen ? 'close' : 'menu'} size="text-xl" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 glass border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-64 py-6 opacity-100' : 'max-h-0 py-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false)
                navigate('/login')
              }}
              className="mt-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm shadow-glow"
            >
              Login
            </button>
          </nav>
        </div>
      </header>

      <HeroSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
