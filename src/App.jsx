import { BrowserRouter } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressProvider'
import { LessonProvider } from './context/LessonProvider'
import AppRoutes from './routes'

export default function App() {
  return (
    <BrowserRouter>
      <ProgressProvider>
        <LessonProvider>
          <AppRoutes />
        </LessonProvider>
      </ProgressProvider>
    </BrowserRouter>
  )
}
