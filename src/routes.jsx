import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from './components/layout'
import DashboardPage from './pages/DashboardPage'
import LessonPage from './pages/LessonPage'
import DesignSystemPage from './pages/DesignSystemPage'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Standalone Design System Showcase */}
      <Route path="/design-system" element={<DesignSystemPage />} />

      {/* Main App Layout Routes */}
      <Route element={<AppShell />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
