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
    <nav className="w-[280px] shrink-0 bg-white border border-surface-200 rounded-2xl p-3.5 shadow-xs select-none">
      <div className="mb-3 px-2 flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-surface-900">
            Learning Journey
          </h3>
          <p className="text-[11px] text-surface-500">10 Structured Steps</p>
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

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => goToStep(idx)}
              className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 cursor-pointer group ${
                isActive
                  ? 'bg-primary-50/90 border border-primary-300 shadow-xs'
                  : 'hover:bg-surface-50 border border-transparent'
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
                        ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                        : 'bg-surface-100 text-surface-500 group-hover:bg-surface-200'
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
                      isActive ? 'text-primary-950 font-heading' : 'text-surface-800'
                    }`}
                  >
                    {step.title}
                  </span>
                  <Badge variant={typeMeta.variant} size="sm" className="scale-90 origin-right">
                    {typeMeta.label}
                  </Badge>
                </div>
                <p className="text-[11px] text-surface-500 truncate leading-tight">
                  {step.subtitle}
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] text-surface-400">
                  <Clock size={11} />
                  <span>{step.durationMin} mins</span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
