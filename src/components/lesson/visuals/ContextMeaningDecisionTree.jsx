import { useState } from 'react'
import { GitBranch, CheckCircle2, XCircle } from 'lucide-react'
import { Card, Badge } from '../../common'

const DECISION_STEPS = [
  {
    step: 1,
    title: 'Literal vs Figurative Screening',
    question: 'Kya sentence physical concrete reality describe kar raha hai (jaise cooking, gardening, ice-cutting)?',
    branches: [
      {
        choice: 'YES — Physical Action',
        action: 'Direct literal dictionary meaning select karein. Idiom tabhi active hota hai jab context abstract ya metaphorical ho.',
        outcome: 'Literal Meaning (e.g. ice cutter ship)',
        type: 'danger'
      },
      {
        choice: 'NO — Social / Legal / Emotional Context',
        action: 'Figurative established idiom sense active hai. Literal translation wale options turant eliminate karein.',
        outcome: 'Proceed to Step 2: Emotional Valence',
        type: 'success'
      }
    ]
  },
  {
    step: 2,
    title: 'Sentence Polarity & Emotional Tone',
    question: 'Sentence ka overall communicative tone kaisa hai: positive accomplishment ya negative setback?',
    branches: [
      {
        choice: 'POSITIVE (+) Accomplishment',
        action: 'Negative failure idioms eliminate karein (e.g. eliminate "back to square one", "fall flat").',
        outcome: 'Filter: "make it", "pull it off", "on cloud nine"',
        type: 'success'
      },
      {
        choice: 'NEGATIVE (-) Setback / Failure',
        action: 'Positive celebration idioms eliminate karein (e.g. eliminate "on cloud nine", "over the moon").',
        outcome: 'Filter: "down in the dumps", "miss the mark", "face the music"',
        type: 'danger'
      }
    ]
  },
  {
    step: 3,
    title: 'Target Entity & Subject Category',
    question: 'Sentence ka subject aur target entity kaun hai: Human agent ya inanimate commodity?',
    branches: [
      {
        choice: 'Inanimate Commodity / Project',
        action: 'Personal livelihood idioms eliminate karein (e.g. "live from hand to mouth"). Use price/utility idioms.',
        outcome: 'Filter: "cost an arm and a leg", "get off the ground"',
        type: 'primary'
      },
      {
        choice: 'Human Agent / Official',
        action: 'Evaluate psychological state or behavioral action (e.g. composure, diligence, ethical choice).',
        outcome: 'Filter: "keep one\'s cool", "by the book", "bite the bullet"',
        type: 'primary'
      }
    ]
  },
  {
    step: 4,
    title: 'Back-Substitution & Coherence Verification',
    question: 'Kya chuninda meaning ko sentence mein replace karne par sentence ka logical aur formal flow 100% natural rehta hai?',
    branches: [
      {
        choice: 'YES — Sentence Flows Flawlessly',
        action: 'Final answer lock karein. OMR sheet ya test portal par submit karein.',
        outcome: '100% Guaranteed Correct MCQ Selection',
        type: 'success'
      },
      {
        choice: 'NO — Slight Logical Discord',
        action: 'Distractor lookalike pair check karein (e.g. check "break the ice" vs "bury the hatchet").',
        outcome: 'Re-inspect Lookalike Pair Disambiguation',
        type: 'danger'
      }
    ]
  }
]

export default function ContextMeaningDecisionTree() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Model 3</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Systematic Deduction Architecture</span>
          </div>
          <h3 className="text-xl font-bold font-heading text-surface-900 dark:text-surface-50 flex items-center gap-2">
            <GitBranch size={20} className="text-primary-600 dark:text-primary-400" />
            Context-to-Meaning Elimination Decision Tree
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300 mt-1 max-w-3xl leading-relaxed">
            Idiom MCQs mein guesswork ko eliminate karne ke liye is 4-stage algorithmic decision tree ko follow karein. Har step candidate ko wrong options se door aur correct answer ke paas le jata hai.
          </p>
        </div>
      </div>

      {/* Step Stepper Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {DECISION_STEPS.map((s) => {
          const isActive = s.step === activeStep
          return (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStep(s.step)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isActive
                  ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/50 ring-1 ring-primary-500/30'
                  : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-850 hover:bg-surface-50 dark:hover:bg-surface-800'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  isActive ? 'bg-primary-600 text-white' : 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                }`}>
                  {s.step}
                </span>
                <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
                  Stage {s.step}
                </span>
              </div>
              <p className={`text-xs font-bold line-clamp-1 ${isActive ? 'text-primary-900 dark:text-primary-100' : 'text-surface-700 dark:text-surface-300'}`}>
                {s.title}
              </p>
            </button>
          )
        })}
      </div>

      {/* Current Step Active Inspection Box */}
      {(() => {
        const cur = DECISION_STEPS.find((s) => s.step === activeStep) || DECISION_STEPS[0]
        return (
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-4">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700">
              <span className="text-xs font-bold text-primary-700 dark:text-primary-300 font-heading">
                Step {cur.step} of 4: {cur.title}
              </span>
              <Badge variant="primary" size="sm">Verification Check</Badge>
            </div>

            <div className="space-y-1">
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
                Diagnostic Question:
              </span>
              <p className="text-sm font-semibold text-surface-900 dark:text-surface-100">
                "{cur.question}"
              </p>
            </div>

            {/* Branch Dual Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {cur.branches.map((b, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border space-y-2 ${
                    b.type === 'success'
                      ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/20 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-100'
                      : b.type === 'danger'
                      ? 'border-rose-200 dark:border-rose-900/50 bg-rose-50/20 dark:bg-rose-950/20 text-rose-900 dark:text-rose-100'
                      : 'border-blue-200 dark:border-blue-900/50 bg-blue-50/20 dark:bg-blue-950/20 text-blue-900 dark:text-blue-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    {b.type === 'success' ? <CheckCircle2 size={16} className="text-emerald-600" /> : <XCircle size={16} className="text-rose-600" />}
                    <span>{b.choice}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-surface-700 dark:text-surface-300">
                    {b.action}
                  </p>
                  <div className="pt-2 border-t border-surface-200/50 dark:border-surface-700/50 text-[0.6875rem] font-bold opacity-80">
                    Target Outcome: {b.outcome}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })()}
    </Card>
  )
}
