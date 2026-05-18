import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import SideNav from './components/navigation/SideNav'
import { useAuth } from './context/AuthContext'
import LandingPage from './pages/public/LandingPage/LandingPage'
import Login from './pages/auth/Login'
import CreateAccount from './pages/auth/CreateAccount'
import HomeDashboard from './pages/dashboard/HomeDashboard'
import FileComplaint from './pages/dashboard/FileComplaint'
import MyComplaintsList from './pages/dashboard/MyComplaintsList'
import AIAnalysisResult from './pages/dashboard/AIAnalysisResult'
import ChatSupport from './pages/dashboard/ChatSupport'
import FeedbackRating from './pages/dashboard/FeedbackRating'
import Profile from './pages/dashboard/Profile'
import TrackComplaint from './pages/public/TrackComplaint'

import { useState } from 'react'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  return user ? children : <Navigate to="/login" />
}

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
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/track" element={<TrackComplaint />} />
        <Route element={<PrivateRoute><AppShell /></PrivateRoute>}>
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