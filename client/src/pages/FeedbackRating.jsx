import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

const sentiments = [
  { icon: 'sentiment_very_dissatisfied', label: 'Terrible', activeColor: 'text-red-500', activeBg: 'bg-red-100' },
  { icon: 'sentiment_dissatisfied',      label: 'Bad',      activeColor: 'text-orange-500', activeBg: 'bg-orange-100' },
  { icon: 'sentiment_neutral',           label: 'Okay',     activeColor: 'text-yellow-500', activeBg: 'bg-yellow-100' },
  { icon: 'sentiment_satisfied',         label: 'Good',     activeColor: 'text-lime-500',   activeBg: 'bg-lime-100' },
  { icon: 'sentiment_very_satisfied',    label: 'Amazing',  activeColor: 'text-green-500',  activeBg: 'bg-green-100' },
]

export default function FeedbackRating() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(-1)
  const [comment, setComment] = useState('')

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">

        {/* Gradient Header */}
        <div
          className="pt-12 lg:pt-8 pb-10 lg:pb-8 px-4 text-center"
          style={{ background: 'linear-gradient(135deg, #000099 0%, #1500cc 55%, #2800ff 100%)' }}
        >
          {/* Back */}
          <div className="flex justify-start mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex size-10 items-center justify-center rounded-2xl bg-white/15 border border-white/20 text-white hover:bg-white/25 transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          </div>

          <div className="inline-flex items-center justify-center size-16 rounded-3xl bg-white/20 border border-white/30 mb-4">
            <span
              className="material-symbols-outlined text-white text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              rate_review
            </span>
          </div>
          <h1 className="text-white text-2xl font-extrabold tracking-tight">Share Your Feedback</h1>
          <p className="text-white/70 text-sm mt-1">Help us serve you better</p>
        </div>

        {/* White bottom sheet */}
        <div className="-mt-6 lg:mt-0 flex-1 rounded-t-[32px] lg:rounded-none bg-white dark:bg-slate-900 pt-8 pb-32 lg:pb-8">
          <div className="max-w-2xl mx-auto px-5">

          {/* Sentiment picker */}
          <div className="mb-8">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-5 text-center">
              How was your experience?
            </p>
            <div className="flex justify-between items-center">
              {sentiments.map(({ icon, label, activeColor, activeBg }, i) => {
                const isActive = i === selected
                return (
                  <button
                    key={label}
                    onClick={() => setSelected(i)}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className={`flex size-14 items-center justify-center rounded-2xl transition-all duration-200 ${
                        isActive
                          ? `${activeBg} scale-110 shadow-card`
                          : 'bg-slate-100 dark:bg-slate-800 hover:scale-105'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-3xl transition-colors ${isActive ? activeColor : 'text-slate-400'}`}
                        style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                      >
                        {icon}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] font-bold transition-colors ${isActive ? activeColor : 'text-slate-400'}`}
                    >
                      {label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-6">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">
              Additional comments
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Tell us what we can improve or what you liked…"
              className="input-field w-full !h-auto resize-none pt-4 text-sm"
            />
          </div>

          {/* Tip */}
          <div className="flex items-start gap-2.5 p-3.5 bg-primary/5 rounded-2xl border border-primary/10 mb-8">
            <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">info</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Your feedback is anonymous and helps us provide better service to all passengers.
            </p>
          </div>

          {/* Submit */}
          <button
            onClick={() => navigate('/home')}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              send
            </span>
            Submit Feedback
          </button>
          <p className="text-center text-[11px] text-slate-400 mt-4">Powered by Ministry of Railways</p>
          </div>{/* end max-w content */}
        </div>

        <BottomNav />
      </div>
    </div>
  )
}
