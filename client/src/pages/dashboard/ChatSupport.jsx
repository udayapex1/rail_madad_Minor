import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GradientPanel } from '../../components/layout'
import Icon from '../../components/common/Icon'
import { INITIAL_CHAT_MESSAGES } from '../../constants/mockData'

export default function ChatSupport() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(INITIAL_CHAT_MESSAGES)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, from: 'user', text: input.trim(), time: 'Now' },
    ])
    setInput('')
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header
        className="shrink-0 pt-4 pb-4"
        style={{ background: 'linear-gradient(135deg, #000099 0%, #1500cc 55%, #2800ff 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center mb-3">
            <button
              onClick={() => navigate(-1)}
              className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15 border border-white/20 text-white hover:bg-white/25 transition-colors"
            >
              <Icon name="arrow_back" size="text-xl" />
            </button>
            <h2 className="text-white font-black flex-1 text-center text-base">Chat Support</h2>
            <div className="size-10" />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/20 border border-white/30">
              <Icon name="smart_toy" fill className="text-white" size="text-2xl" />
              <span className="absolute -bottom-0.5 -right-0.5 size-3 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-base leading-tight">Rail Madad Assistant</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="size-1.5 bg-green-400 rounded-full" />
                <span className="text-white/70 text-xs font-medium">Online · Typically replies instantly</span>
              </div>
            </div>
            <button className="flex size-10 items-center justify-center rounded-2xl bg-white/15 border border-white/20 text-white hover:bg-white/25 transition-colors">
              <Icon name="info" size="text-xl" />
            </button>
          </div>
        </div>
      </header>

      {/* Chat scroll area */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="max-w-4xl mx-auto px-4 py-4 space-y-5">
          <div className="flex justify-center">
            <span className="px-3 py-1 bg-slate-200/80 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[11px] font-bold rounded-full uppercase tracking-wider">
              Today
            </span>
          </div>

          {messages.map((msg) =>
            msg.from === 'bot' ? (
              <div key={msg.id} className="flex items-end gap-2.5 max-w-[75%] animate-slide-up">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#1500cc] shadow-glow">
                  <Icon name="smart_toy" fill className="text-white" size="text-base" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="rounded-2xl rounded-bl-sm px-4 py-3 bg-white dark:bg-slate-800 shadow-card border border-slate-100 dark:border-slate-700">
                    <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-100">{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 ml-1">{msg.time}</span>
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex items-end gap-2.5 justify-end ml-auto max-w-[75%] animate-slide-up">
                <div className="flex flex-col gap-1 items-end">
                  <div className="rounded-2xl rounded-br-sm px-4 py-3 bg-gradient-to-br from-primary to-[#1500cc] shadow-glow">
                    <p className="text-sm leading-relaxed text-white">{msg.text}</p>
                  </div>
                  <div className="flex items-center gap-1 mr-1">
                    <span className="text-[10px] text-slate-400">{msg.time}</span>
                    <Icon name="done_all" fill className="text-primary" size="text-[13px]" />
                  </div>
                </div>
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-800 shadow-sm">
                  <Icon name="person" className="text-slate-600 dark:text-slate-300" size="text-lg" />
                </div>
              </div>
            )
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="shrink-0 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200/60 dark:border-slate-800 pb-[84px] lg:pb-4">
        <div className="max-w-4xl mx-auto px-4 pt-3">
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 rounded-2xl px-3 py-2 border-2 border-slate-200 dark:border-slate-700 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-slate-100 text-sm py-1.5 outline-none placeholder:text-slate-400"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#2800ff] text-white shadow-glow transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:scale-100"
            >
              <Icon name="send" size="text-lg" />
            </button>
          </div>
          <div className="mt-2.5 mb-1 flex justify-center gap-6">
            <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">View Ticket</button>
            <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:underline">End Chat</button>
          </div>
        </div>
      </div>
    </div>
  )
}
