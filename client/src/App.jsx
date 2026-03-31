import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { DashboardLayout } from './components/layout'

// Public pages
import LandingPage from './pages/public/LandingPage'
import TrackComplaint from './pages/public/TrackComplaint'

// Auth pages
import { Login, CreateAccount } from './pages/auth'

// Dashboard pages
import {
  HomeDashboard,
  FileComplaint,
  MyComplaintsList,
  AIAnalysisResult,
  ChatSupport,
  FeedbackRating,
  Profile,
} from './pages/dashboard'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/track" element={<TrackComplaint />} />

          {/* Dashboard routes (with shared layout) */}
          <Route element={<DashboardLayout />}>
            <Route path="/home" element={<HomeDashboard />} />
            <Route path="/file-complaint" element={<FileComplaint />} />
            <Route path="/complaints" element={<MyComplaintsList />} />
            <Route path="/ai-analysis" element={<AIAnalysisResult />} />
            <Route path="/chat" element={<ChatSupport />} />
            <Route path="/feedback" element={<FeedbackRating />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}