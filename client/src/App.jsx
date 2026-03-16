import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import SideNav from './components/SideNav'
import WelcomeScreen from './pages/WelcomeScreen'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import HomeDashboard from './pages/HomeDashboard'
import FileComplaint from './pages/FileComplaint'
import MyComplaintsList from './pages/MyComplaintsList'
import AIAnalysisResult from './pages/AIAnalysisResult'
import ChatSupport from './pages/ChatSupport'
import FeedbackRating from './pages/FeedbackRating'
import Profile from './pages/Profile'
import TrackComplaint from './pages/TrackComplaint'

import { useState } from 'react'

function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="relative min-h-screen bg-background-light dark:bg-background-dark">
      <SideNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="lg:ml-[240px]">
        <Outlet context={{ toggleSidebar }} />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/track" element={<TrackComplaint />} />
        <Route element={<AppShell />}>
          <Route path="/home" element={<HomeDashboard />} />
          <Route path="/file-complaint" element={<FileComplaint />} />
          <Route path="/complaints" element={<MyComplaintsList />} />
          <Route path="/ai-analysis" element={<AIAnalysisResult />} />
          <Route path="/chat" element={<ChatSupport />} />
          <Route path="/feedback" element={<FeedbackRating />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
