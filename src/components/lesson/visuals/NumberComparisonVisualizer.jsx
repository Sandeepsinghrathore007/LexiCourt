import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Card, Badge } from '../../common'

const COMPARISON_CASES = [
  {
    topic: 'Judicial Petitions',
    aNumber: {
      phrase: 'A number of writ petitions',
      meaning: 'Many writ petitions (Plural count focus)',
      verb: 'HAVE BEEN DISMISSED',
      fullSentence: 'A number of writ petitions have been dismissed by the division bench today.'
    },
    theNumber: {
      phrase: 'The number of writ petitions',
      meaning: 'A single numerical total (e.g. 542 petitions)',
      verb: 'HAS INCREASED',
      fullSentence: 'The number of writ petitions has increased significantly this year.'
    }
  },
  {
    topic: 'System Assistants',
    aNumber: {
      phrase: 'A number of system assistants',
      meaning: 'Several assistants (Plural individuals)',
      verb: 'ARE CONFIGURED / ARE WORKING',
      fullSentence: 'A number of system assistants are working on the server migration.'
    },
    theNumber: {
      phrase: 'The number of system assistants',
      meaning: 'The sanctioned cadre strength (e.g. 230 posts)',
      verb: 'IS INSUFFICIENT',
      fullSentence: 'The number of system assistants is insufficient to handle all district courts.'
    }
  },
  {
    topic: 'Clerical Errors',
    aNumber: {
      phrase: 'A number of typographic errors',
      meaning: 'Multiple errors (Countable mistakes)',
      verb: 'WERE FOUND',
      fullSentence: 'A number of typographic errors were found in the uploaded cause-list.'
    },
    theNumber: {
      phrase: 'The number of typographic errors',
      meaning: 'The total error tally (e.g. 14 errors)',
      verb: 'WAS ALARMING',
      fullSentence: 'The number of typographic errors was alarming for the registrar.'
    }
  }
]

export default function NumberComparisonVisualizer() {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0)

  const activeCase = COMPARISON_CASES[activeCaseIdx]

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700 shadow-xs">
      <div className="pb-4 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="primary" size="sm">Visual Engine 5</Badge>
          <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
            Polar Quantifier Contrast
          </span>
        </div>
        <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
          "A Number of" (Plural) vs "The Number of" (Singular)
        </h3>
        <p className="text-xs text-surface-600 dark:text-surface-300 mt-0.5">
          Examiner ke sabse frequent quantifier trap ka visual comparison engine.
        </p>
      </div>

      {/* Case Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {COMPARISON_CASES.map((c, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveCaseIdx(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeCaseIdx === idx
                ? 'bg-primary-600 text-white shadow-xs'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
            }`}
          >
            Case {idx + 1}: {c.topic}
          </button>
        ))}
      </div>

      {/* Side-by-Side Dual Engine Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: A NUMBER OF (Plural) */}
        <div className="p-5 rounded-2xl bg-primary-50/50 dark:bg-primary-950/40 border-2 border-primary-300 dark:border-primary-700 space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="primary" size="sm">A NUMBER OF</Badge>
            <span className="text-xs font-mono font-bold text-primary-700 dark:text-primary-300">
              ➔ PLURAL CONCORD
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-mono text-surface-500 dark:text-surface-400 uppercase">
              Semantic Meaning:
            </p>
            <p className="text-sm font-semibold text-surface-900 dark:text-surface-100">
              {activeCase.aNumber.meaning}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-surface-800 border border-primary-200 dark:border-primary-800 space-y-1">
            <span className="text-[0.625rem] font-bold text-primary-600 dark:text-primary-400 uppercase">
              Required Verb:
            </span>
            <p className="text-sm font-mono font-extrabold text-primary-800 dark:text-primary-200">
              {activeCase.aNumber.verb}
            </p>
          </div>

          <p className="text-xs text-surface-700 dark:text-surface-300 italic p-3 rounded-lg bg-white/70 dark:bg-surface-900/60 border border-surface-200 dark:border-surface-700">
            "{activeCase.aNumber.fullSentence}"
          </p>

          <div className="text-[0.6875rem] text-primary-800 dark:text-primary-300 font-medium">
            ✓ Formula: <code className="font-mono bg-white dark:bg-surface-800 px-1 py-0.5 rounded">A number of + Plural Noun + PLURAL VERB</code>
          </div>
        </div>

        {/* Right Column: THE NUMBER OF (Singular) */}
        <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700 space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" size="sm">THE NUMBER OF</Badge>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-300">
              ➔ SINGULAR CONCORD
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-mono text-surface-500 dark:text-surface-400 uppercase">
              Semantic Meaning:
            </p>
            <p className="text-sm font-semibold text-surface-900 dark:text-surface-100">
              {activeCase.theNumber.meaning}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-surface-800 border border-amber-200 dark:border-amber-800 space-y-1">
            <span className="text-[0.625rem] font-bold text-amber-600 dark:text-amber-400 uppercase">
              Required Verb:
            </span>
            <p className="text-sm font-mono font-extrabold text-amber-800 dark:text-amber-200">
              {activeCase.theNumber.verb}
            </p>
          </div>

          <p className="text-xs text-surface-700 dark:text-surface-300 italic p-3 rounded-lg bg-white/70 dark:bg-surface-900/60 border border-surface-200 dark:border-surface-700">
            "{activeCase.theNumber.fullSentence}"
          </p>

          <div className="text-[0.6875rem] text-amber-800 dark:text-amber-300 font-medium">
            ✓ Formula: <code className="font-mono bg-white dark:bg-surface-800 px-1 py-0.5 rounded">The number of + Plural Noun + SINGULAR VERB</code>
          </div>
        </div>
      </div>

      {/* Memory Anchor */}
      <div className="p-3.5 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 flex items-start gap-3">
        <CheckCircle2 size={18} className="text-success-600 dark:text-success-400 shrink-0 mt-0.5" />
        <p className="text-xs md:text-sm text-surface-700 dark:text-surface-200 leading-relaxed">
          <strong>Exam Memory Anchor:</strong> "A number" = Indefinite quantifier (= Many) ➔ Plural verb. "THE number" = Definite numerical count (One figure) ➔ Singular verb!
        </p>
      </div>
    </Card>
  )
}
