import { Check, Clock } from 'lucide-react'
import { Badge } from '../common'
import { useLesson } from '../../hooks/useLesson'
import { useProgress } from '../../hooks/useProgress'

const STEP_TYPE_BADGES = {
  orientation: { label: 'Orientation', variant: 'neutral' },
  'study-doc': { label: 'Theory', variant: 'primary' },
  visuals: { label: 'Visual', variant: 'secondary' },
  'rule-cards': { label: 'Formula', variant: 'secondary' },
  'worked-examples': { label: 'Examples', variant: 'neutral' },
  'common-mistakes': { label: 'Traps', variant: 'error' },
  'guided-practice': { label: 'Guided', variant: 'primary' },
  'independent-practice': { label: 'Practice', variant: 'primary' },
  'mastery-assessment': { label: 'Test', variant: 'success' },
  'error-review': { label: 'Review', variant: 'neutral' },
}

export default function LessonSubNav() {
  const { steps, currentStepIndex, goToStep, activeLessonId } = useLesson()
  const { isStepCompleted } = useProgress()

  return (
    <nav className="w-full lg:w-[260px] xl:w-[275px] shrink-0 lg:sticky lg:top-2 z-20 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl p-3 shadow-xs select-none transition-all duration-200 lg:max-h-[calc(100vh-5.5rem)] lg:overflow-y-auto">
      <div className="mb-3 px-1.5 flex items-center justify-between sticky top-0 bg-white dark:bg-surface-900 pb-2 z-10 border-b border-surface-100 dark:border-surface-800">
        <div>
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-surface-900 dark:text-surface-50">
            Learning Journey
          </h3>
          <p className="text-[0.6875rem] text-surface-500 dark:text-surface-300">10 Structured Steps</p>
        </div>
        <Badge variant="primary" size="sm">
          Step {currentStepIndex + 1} of 10
        </Badge>
      </div>

      <div className="space-y-1">
        {steps.map((step, idx) => {
          const isActive = currentStepIndex === idx
          const isDone = isStepCompleted(activeLessonId, step.id)
          const typeMeta = STEP_TYPE_BADGES[step.type] || { label: step.type, variant: 'neutral' }
          const duration = step.durationMin || step.durationMinutes || step.estimatedMinutes || 10

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => goToStep(idx)}
              className={`w-full text-left p-2 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer group ${
                isActive
                  ? 'bg-primary-50/90 dark:bg-primary-950/70 border border-primary-300 dark:border-primary-500/50 shadow-xs'
                  : 'hover:bg-surface-50 dark:hover:bg-surface-800/80 border border-transparent'
              }`}
            >
              {/* Step Status Indicator Circle */}
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <div className="w-6 h-6 rounded-full bg-success-500 text-white flex items-center justify-center shadow-xs">
                    <Check size={14} strokeWidth={3} />
                  </div>
                ) : (
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                      isActive
                        ? 'bg-primary-600 text-white ring-4 ring-primary-100 dark:ring-primary-900/60'
                        : 'bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-200 group-hover:bg-surface-200 dark:group-hover:bg-surface-700'
                    }`}
                  >
                    {step.index}
                  </div>
                )}
              </div>

              {/* Step Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span
                    className={`text-xs font-bold truncate ${
                      isActive ? 'text-primary-950 dark:text-primary-200 font-heading' : 'text-surface-800 dark:text-surface-100'
                    }`}
                  >
                    {step.title}
                  </span>
                  <Badge variant={typeMeta.variant} size="sm" className="scale-90 origin-right shrink-0">
                    {typeMeta.label}
                  </Badge>
                </div>
                <p className="text-[0.6875rem] text-surface-500 dark:text-surface-300 truncate leading-tight">
                  {step.subtitle}
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-[0.625rem] text-surface-400 dark:text-surface-400">
                  <Clock size={11} />
                  <span>{duration} mins</span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
