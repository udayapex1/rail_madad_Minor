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
          isScrolled ? 'glass py-3 shadow-float' : 'bg-transparent'
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

      <HeroSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
