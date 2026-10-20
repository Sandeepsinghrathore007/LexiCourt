import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Award, RotateCcw, Palette, ShieldCheck } from 'lucide-react'
import { Badge, Button, ProgressBar } from '../common'
import { useProgress } from '../../hooks/useProgress'

export default function AppHeader() {
  const location = useLocation()
  const { getOverallProgress, resetProgress } = useProgress()
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const overallPct = getOverallProgress()

  const handleReset = () => {
    resetProgress()
    setShowResetConfirm(false)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-surface-200">
      <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Left: Brand */}
        <div className="flex items-center gap-4 shrink-0">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
              <BookOpen className="text-white" size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-lg text-surface-900 tracking-tight">
                  HSA EnglishMaster
                </span>
                <Badge variant="primary" size="sm">2026</Badge>
              </div>
              <p className="text-xs text-surface-500 font-medium">Rajasthan High Court System Assistant</p>
            </div>
          </Link>
        </div>

        {/* Center: Exam Context Pill */}
        <div className="hidden lg:flex items-center gap-3 bg-surface-50 border border-surface-200/80 px-4 py-1.5 rounded-full shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-surface-700">
            <ShieldCheck size={16} className="text-primary-600" />
            <span>Part-B: English Section (10 MCQs / 10 Marks)</span>
          </div>
          <span className="text-surface-300">•</span>
          <div className="flex items-center gap-1.5 text-xs text-amber-700 font-medium">
            <Award size={14} className="text-amber-500" />
            <span>10/10 Target Blueprint</span>
          </div>
        </div>

        {/* Right: Metrics & Controls */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Overall Progress */}
          <div className="hidden md:flex flex-col items-end gap-1 min-w-[140px]">
            <div className="flex items-center justify-between w-full text-xs font-medium text-surface-600">
              <span>Curriculum</span>
              <span className="font-bold text-primary-600">{overallPct}%</span>
            </div>
            <div className="w-full">
              <ProgressBar value={overallPct} size="sm" variant="primary" />
            </div>
          </div>

          <div className="h-6 w-px bg-surface-200" />

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
            className="text-surface-500 hover:text-error-600 hover:bg-error-50"
          >
            <span className="sr-only">Reset Progress</span>
          </Button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-surface-200 space-y-4">
            <h3 className="font-heading font-bold text-lg text-surface-900">Reset Study Progress?</h3>
            <p className="text-sm text-surface-600 leading-relaxed">
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
