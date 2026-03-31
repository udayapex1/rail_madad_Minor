import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideNav from '../navigation/SideNav'
import BottomNav from '../navigation/BottomNav'

/**
 * Dashboard shell layout.
 * Renders SideNav + BottomNav + page content via <Outlet>.
 * Pages receive `toggleSidebar` via outlet context.
 */
export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="relative min-h-screen bg-background-light dark:bg-background-dark">
      <SideNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="lg:ml-[240px] min-h-screen flex flex-col">
        <Outlet context={{ toggleSidebar }} />
      </div>

      <BottomNav />
    </div>
  )
}
