import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Award, RotateCcw, Palette, ShieldCheck, Sun, Moon } from 'lucide-react'
import { Badge, Button, ProgressBar, FontSizeControl } from '../common'
import { useProgress } from '../../hooks/useProgress'
import { useLesson } from '../../hooks/useLesson'
import { useTheme } from '../../hooks/useTheme'

export default function AppHeader() {
  const location = useLocation()
  const { getOverallProgress, resetProgress } = useProgress()
  const lessonContext = useLesson()
  const { isDark, toggleTheme } = useTheme()
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const overallPct = getOverallProgress()

  const handleReset = () => {
    resetProgress()
    if (lessonContext?.goToStep) {
      lessonContext.goToStep(0)
    }
    setShowResetConfirm(false)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-surface-900/95 backdrop-blur-md border-b border-surface-200 dark:border-surface-700 transition-colors duration-200">
      <div className="w-full px-4 lg:px-6 h-16 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Brand */}
        <div className="flex items-center gap-4 shrink-0">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-xs group-hover:shadow-md transition-all shrink-0 ring-1 ring-primary-500/20 bg-primary-950 flex items-center justify-center">
              <img src="/favicon.svg" alt="LexiCourt Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-lg text-surface-900 dark:text-surface-50 tracking-tight">
                  <span className="text-primary-600 dark:text-primary-400">Lexi</span>Court
                </span>
                <Badge variant="primary" size="sm">HSA 2026</Badge>
              </div>
              <p className="text-xs text-surface-500 dark:text-surface-400 font-medium">Rajasthan High Court System Assistant</p>
            </div>
          </Link>
        </div>

        {/* Center: Exam Context Pill */}
        <div className="hidden lg:flex items-center gap-3 bg-surface-50 dark:bg-surface-800/80 border border-surface-200/80 dark:border-surface-700/80 px-4 py-1.5 rounded-full shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-surface-700 dark:text-surface-200">
            <ShieldCheck size={16} className="text-primary-600 dark:text-primary-400" />
            <span>Part-B: GK & English (20 Marks Combined)</span>
          </div>
          <span className="text-surface-300 dark:text-surface-600">•</span>
          <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 font-medium">
            <Award size={14} className="text-amber-500 dark:text-amber-400" />
            <span>Prep Target: Flawless English Score</span>
          </div>
        </div>

        {/* Right: Metrics & Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Overall Progress */}
          <div className="hidden xl:flex flex-col items-end gap-1 min-w-[130px]">
            <div className="flex items-center justify-between w-full text-xs font-medium text-surface-600 dark:text-surface-400">
              <span>Curriculum</span>
              <span className="font-bold text-primary-600 dark:text-primary-400">{overallPct}%</span>
            </div>
            <div className="w-full">
              <ProgressBar value={overallPct} size="sm" variant="primary" />
            </div>
          </div>

          <div className="hidden xl:block h-6 w-px bg-surface-200 dark:bg-surface-700" />

          {/* Font Size Control */}
          <FontSizeControl />

          <div className="h-6 w-px bg-surface-200 dark:bg-surface-700" />

          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="sm"
            icon={isDark ? Sun : Moon}
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="text-surface-600 dark:text-surface-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-surface-100 dark:hover:bg-surface-800"
          >
            <span className="sr-only">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </Button>

          {/* Design System Link */}
          <Link to="/design-system">
            <Button
              variant={location.pathname === '/design-system' ? 'primary' : 'ghost'}
              size="sm"
              icon={Palette}
              title="Inspect Design System Tokens & Components"
            >
              <span className="hidden sm:inline">Design System</span>
            </Button>
          </Link>

          {/* Reset Progress Button */}
          <Button
            variant="ghost"
            size="sm"
            icon={RotateCcw}
            onClick={() => setShowResetConfirm(true)}
            title="Reset All Study Progress"
            className="text-surface-500 dark:text-surface-400 hover:text-error-600 dark:hover:text-error-400 hover:bg-error-50 dark:hover:bg-error-950/40"
          >
            <span className="hidden sm:inline">Reset</span>
            <span className="sm:hidden sr-only">Reset Progress</span>
          </Button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-surface-900 rounded-2xl p-6 max-w-sm w-full shadow-xl border border-surface-200 dark:border-surface-800 space-y-4">
            <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">Reset Study Progress?</h3>
            <p className="text-sm text-surface-600 dark:text-surface-300 leading-relaxed">
              This will clear all completed steps, quiz attempts, and saved progress from your browser. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setShowResetConfirm(false)}>
                Cancel
              </Button>
              <Button variant="error" size="sm" onClick={handleReset}>
                Yes, Reset
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
