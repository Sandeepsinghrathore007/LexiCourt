import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeProvider'
import { FontSizeProvider } from './context/FontSizeProvider'
import { ProgressProvider } from './context/ProgressProvider'
import { LessonProvider } from './context/LessonProvider'
import AppRoutes from './routes'

export default function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <FontSizeProvider>
          <ProgressProvider>
            <LessonProvider>
              <AppRoutes />
            </LessonProvider>
          </ProgressProvider>
        </FontSizeProvider>
      </ThemeProvider>
    </HashRouter>
  )
}
