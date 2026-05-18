import Icon from '../../../components/common/Icon'

export default function Footer() {
  return (
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

          <div className="flex gap-8 items-center">
            <div className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-pointer group">
              <img
                src="/railways_logo.png"
                alt="Indian Railways"
                className="h-10 w-auto transition-all duration-300 group-hover:scale-110"
              />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors">Railways</span>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-pointer group">
              <img
                src="/digital_india_logo.png"
                alt="Digital India"
                className="h-10 w-auto transition-all duration-300 group-hover:scale-110"
              />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors">Digital India</span>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-pointer group">
              <img
                src="/swachh_bharat_logo.png"
                alt="Swachh Bharat"
                className="h-10 w-auto transition-all duration-300 group-hover:scale-110"
              />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors">Swachh Bharat</span>
            </div>
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
  )
}
