import { Outlet } from 'react-router-dom'
import AppHeader from './AppHeader'
import CurriculumSidebar from './CurriculumSidebar'

export default function AppShell() {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col font-sans text-surface-800 dark:text-surface-100 transition-colors duration-200">
      <AppHeader />
      <div className="flex-1 flex w-full min-w-0">
        <CurriculumSidebar />
        <main className="flex-1 min-w-0 p-4 md:px-5 md:py-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
