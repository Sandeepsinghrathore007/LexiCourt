import { useState } from 'react'
import { Scale, ShieldCheck, Equal, ArrowUpDown } from 'lucide-react'
import { Card, Badge } from '../../common'

const COMPARATOR_MODES = [
  {
    id: 'mode-equality',
    title: 'Parity / Equality (A = B)',
    icon: Equal,
    badge: 'Affirmative Parity',
    originalDegree: 'Positive Degree',
    originalFormula: 'Subject 1 + is + as + [Positive Adj] + as + Subject 2',
    originalSentence: 'Ramesh is as intelligent as Suresh.',
    originalMeaning: 'Ramesh aur Suresh dono ki intelligence 100% barabar hai.',
    targetDegree: 'Comparative Degree (Negative Polarity)',
    targetFormula: 'Subject 2 + is NOT + [Comparative Adj] + than + Subject 1',
    targetSentence: 'Suresh is not more intelligent than Ramesh.',
    targetMeaning: 'Suresh Ramesh se zyada intelligent nahi hai (yaani dono barabar hain).',
    polarityRule: 'Affirmative Equality (as...as) ➔ Negative Comparative (not more...than).',
    trapWarning: 'Choosing affirmative comparative ("Suresh is more intelligent...") destroys the equality.'
  },
  {
    id: 'mode-disparity-superior',
    title: 'Disparity: Superiority (A > B)',
    icon: ArrowUpDown,
    badge: 'Affirmative Superiority',
    originalDegree: 'Comparative Degree',
    originalFormula: 'Subject 1 + is + [Comparative Adj] + than + Subject 2',
    originalSentence: 'Ravi is taller than Aman.',
    originalMeaning: 'Ravi ki height Aman se zyada hai (Ravi > Aman).',
    targetDegree: 'Positive Degree (Negative Inequality)',
    targetFormula: 'Subject 2 + is NOT + as/so + [Positive Adj] + as + Subject 1',
    targetSentence: 'Aman is not as tall as Ravi.',
    targetMeaning: 'Aman utna lamba nahi hai jitna Ravi (yaani Ravi zyada lamba hai).',
    polarityRule: 'Affirmative Comparative (A > B) ➔ Transposed Negative Positive (B is not as...as A).',
    trapWarning: 'Forgetting to transpose subjects ("Ravi is not as tall as Aman") reverses the truth 180°.'
  },
  {
    id: 'mode-disparity-inferior',
    title: 'Disparity: Inferiority (A < B)',
    icon: ArrowUpDown,
    badge: 'Negative Disparity',
    originalDegree: 'Positive Degree',
    originalFormula: 'Subject 1 + is NOT + as/so + [Positive Adj] + as + Subject 2',
    originalSentence: 'Jaipur is not as large as Kolkata.',
    originalMeaning: 'Jaipur Kolkata jitna bada nahi hai (Jaipur < Kolkata).',
    targetDegree: 'Comparative Degree (Affirmative Superiority)',
    targetFormula: 'Subject 2 + is + [Comparative Adj] + than + Subject 1',
    targetSentence: 'Kolkata is larger than Jaipur.',
    targetMeaning: 'Kolkata Jaipur se bada hai (Kolkata > Jaipur).',
    polarityRule: 'Negative Positive (A < B) ➔ Transposed Affirmative Comparative (B > A).',
    trapWarning: 'Omitting subject reversal or creating a negative comparative ("Kolkata is not larger than Jaipur").'
  },
]

export default function EqualityInequalityComparator() {
  const [activeComparatorId, setActiveComparatorId] = useState('mode-equality')
  const activeComparator = COMPARATOR_MODES.find((c) => c.id === activeComparatorId) || COMPARATOR_MODES[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 flex items-center justify-center font-bold">
            <Scale size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Equality vs Inequality Logical Equivalence Comparator
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-400">
              Parity ('as...as') aur disparity ('not as...as' / 'than') ke beech truth-preserving polarity inversion
            </p>
          </div>
        </div>
        <Badge variant="primary" size="sm">Spatial Model 5</Badge>
      </div>

      {/* Mode Selector */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
        {COMPARATOR_MODES.map((mode) => (
          <button
            key={mode.id}
            type="button"
            onClick={() => setActiveComparatorId(mode.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeComparatorId === mode.id
                ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs border border-surface-200 dark:border-surface-700'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
            }`}
          >
            <mode.icon size={13} />
            <span>{mode.title}</span>
          </button>
        ))}
      </div>

      {/* Comparison Engine Interface */}
      <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-surface-600 dark:text-surface-400 uppercase tracking-wider">
            Semantic Truth Preservation Protocol:
          </span>
          <Badge variant="secondary" size="sm">{activeComparator.badge}</Badge>
        </div>

        {/* Side by Side Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Source Box */}
          <div className="p-4 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-2">
            <span className="text-[0.6875rem] font-bold text-surface-400 uppercase tracking-wider block">
              1. Original Form ({activeComparator.originalDegree})
            </span>
            <p className="font-mono text-sm font-bold text-surface-900 dark:text-surface-100">
              "{activeComparator.originalSentence}"
            </p>
            <div className="p-2 rounded bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-xs font-mono text-surface-600 dark:text-surface-300">
              {activeComparator.originalFormula}
            </div>
            <p className="text-xs text-surface-600 dark:text-surface-400 italic pt-1">
              Truth Value: {activeComparator.originalMeaning}
            </p>
          </div>

          {/* Transformed Box */}
          <div className="p-4 rounded-xl bg-primary-50/40 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 space-y-2">
            <span className="text-[0.6875rem] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider block">
              2. Equivalent Transformation ({activeComparator.targetDegree})
            </span>
            <p className="font-mono text-sm font-bold text-primary-950 dark:text-primary-100">
              "{activeComparator.targetSentence}"
            </p>
            <div className="p-2 rounded bg-white dark:bg-surface-900 border border-primary-100 dark:border-primary-800 text-xs font-mono text-primary-800 dark:text-primary-200">
              {activeComparator.targetFormula}
            </div>
            <p className="text-xs text-primary-800 dark:text-primary-300 italic pt-1">
              Preserved Truth: {activeComparator.targetMeaning}
            </p>
          </div>
        </div>

        {/* Rule Summary Callout */}
        <div className="p-3.5 rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-surface-900 dark:text-surface-100">
            <ShieldCheck size={15} className="text-primary-600 dark:text-primary-400" />
            <span>The Polarity Reversal Law:</span>
          </div>
          <p className="text-surface-700 dark:text-surface-300 font-mono text-[0.8125rem]">
            {activeComparator.polarityRule}
          </p>
          <p className="text-danger-700 dark:text-danger-400 font-medium pt-1">
            ⚠️ Warning: {activeComparator.trapWarning}
          </p>
        </div>
      </div>
    </Card>
  )
}
