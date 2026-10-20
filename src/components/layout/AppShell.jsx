import { Outlet } from 'react-router-dom'
import AppHeader from './AppHeader'
import CurriculumSidebar from './CurriculumSidebar'

export default function AppShell() {
  return (
    <div className="min-h-screen bg-surface-50 flex flex-col font-sans text-surface-800">
      <AppHeader />
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <CurriculumSidebar />
        <main className="flex-1 min-w-0 p-8 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
