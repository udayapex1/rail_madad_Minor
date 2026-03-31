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
  )
}
