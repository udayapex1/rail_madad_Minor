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

          <div className="flex gap-10 items-center">
            <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
              <Icon name="train" size="text-3xl" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Railways</span>
            </div>
            <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
              <Icon name="cloud_done" size="text-3xl" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Digital India</span>
            </div>
            <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
              <Icon name="cleaning_services" size="text-3xl" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Swachh Bharat</span>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
          <p>&copy; 2024 Rail Madad. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
