import { useState } from 'react'
import { AlertTriangle, GitBranch } from 'lucide-react'
import { Card, Badge } from '../../common'

const TRANSFORMATION_ENGINES = [
  {
    id: 'engine-binary-disparity',
    name: '1. Binary Disparity (Comparative ➔ Positive)',
    sourceDegree: 'Comparative Degree',
    targetDegree: 'Positive Degree',
    sourceSentence: 'An aeroplane flies faster than birds.',
    targetSentence: 'Birds do not fly as/so fast as an aeroplane.',
    steps: [
      { step: 1, title: 'Entity Count Check', detail: 'Total entities = 2 (aeroplane & birds). Superlative is IMPOSSIBLE.' },
      { step: 2, title: 'Subject Transposition', detail: 'Second entity "Birds" becomes primary subject; "aeroplane" shifts to the end.' },
      { step: 3, title: 'Polarity Reversal', detail: 'Original is affirmative disparity (aeroplane > birds); Positive must become negative ("do not fly").' },
      { step: 4, title: 'Adjective Decoupling', detail: 'Comparative "faster" converts back to base positive "fast" inside "as/so fast as".' },
      { step: 5, title: 'Truth Verification', detail: 'Birds are not as fast as aeroplane = Aeroplane is faster. Truth preserved 100%.' },
    ],
    topTrap: 'Forgetting subject transposition ("*An aeroplane does not fly as fast as birds") reverses the factual claim 180°.'
  },
  {
    id: 'engine-binary-parity',
    name: '2. Binary Parity (Positive ➔ Comparative)',
    sourceDegree: 'Positive Degree (Equality)',
    targetDegree: 'Comparative Degree',
    sourceSentence: 'Rohan is as diligent as Sohan.',
    targetSentence: 'Sohan is not more diligent than Rohan.',
    steps: [
      { step: 1, title: 'Entity Count Check', detail: 'Total entities = 2 (Rohan & Sohan). Scope is binary.' },
      { step: 2, title: 'Subject Transposition', detail: 'Sohan shifts to the front; Rohan moves to the object position.' },
      { step: 3, title: 'Negative Insertion', detail: 'To preserve equality, comparative must state Sohan is NOT more diligent.' },
      { step: 4, title: 'Comparative Formation', detail: 'Adjective "diligent" takes periphrastic "more diligent" + conjunction "than".' },
      { step: 5, title: 'Truth Verification', detail: 'Sohan is not more diligent than Rohan = Both are equally diligent.' },
    ],
    topTrap: 'Writing affirmative comparative ("*Sohan is more diligent than Rohan") destroys the equality and creates superiority.'
  },
  {
    id: 'engine-unique-apex',
    name: '3. Unique Apex (Superlative ➔ Comparative ➔ Positive)',
    sourceDegree: 'Superlative Degree',
    targetDegree: 'Comparative & Positive',
    sourceSentence: 'Lead is the heaviest of all metals.',
    targetSentence: 'Lead is heavier than any other metal.  |  No other metal is as heavy as lead.',
    steps: [
      { step: 1, title: 'Scope Analysis', detail: 'Lead is the unique apex of all metals (number-1 in the set).' },
      { step: 2, title: 'Comparative Derivation', detail: 'Use "heavier than" + compulsory self-exclusion "ANY OTHER" + singular noun "metal".' },
      { step: 3, title: 'Positive Derivation', detail: 'Start with negative universal "NO OTHER" + singular noun "metal" + "is as heavy as lead".' },
      { step: 4, title: 'Singular Concord Check', detail: '"Any other metal" (NOT *metals) and "No other metal" (NOT *metals).' },
      { step: 5, title: 'Truth Verification', detail: 'All three structures assert that lead holds the absolute maximum weight.' },
    ],
    topTrap: 'Omitting "other" in comparative ("*heavier than any metal") or pluralizing noun ("*any other metals").'
  },
  {
    id: 'engine-subset-bracket',
    name: '4. Subset Bracket ("One of the" Superlative ➔ Comp ➔ Pos)',
    sourceDegree: 'Superlative ("One of the")',
    targetDegree: 'Comparative & Positive',
    sourceSentence: 'Ashoka was one of the greatest kings of India.',
    targetSentence: 'Ashoka was greater than most other kings...  |  Very few kings of India were as great as Ashoka.',
    steps: [
      { step: 1, title: 'Scope Analysis', detail: 'Ashoka is NOT unique apex; he belongs to an elite top-tier group of kings.' },
      { step: 2, title: 'Plural Concord Check', detail: 'Superlative takes plural noun ("kings"). Never write *one of the greatest king.' },
      { step: 3, title: 'Comparative Derivation', detail: 'Use "greater than MOST OTHER" (not any other) + plural noun "kings".' },
      { step: 4, title: 'Positive Derivation', detail: 'Start with "VERY FEW" (not No other) + plural noun "kings" + plural verb "were".' },
      { step: 5, title: 'Truth Verification', detail: 'Ashoka is among the elite, surpassing the vast majority of historical rulers.' },
    ],
    topTrap: 'Choosing "No other" for "one of the" (alters ranking) or singularizing noun ("*very few king was...").'
  },
]

export default function DegreeTransformationFlowchart() {
  const [activeEngineId, setActiveEngineId] = useState('engine-unique-apex')
  const activeEngine = TRANSFORMATION_ENGINES.find((e) => e.id === activeEngineId) || TRANSFORMATION_ENGINES[2]

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 flex items-center justify-center font-bold">
            <GitBranch size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Interactive Sentence Transformation Flowchart & Cognitive Engine
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-400">
              Step-by-step algorithm: Entity analysis, polarity shifts, quantifier selection, aur meaning verification
            </p>
          </div>
        </div>
        <Badge variant="primary" size="sm">Spatial Model 4</Badge>
      </div>

      {/* Engine Switcher */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
        {TRANSFORMATION_ENGINES.map((eng) => (
          <button
            key={eng.id}
            type="button"
            onClick={() => setActiveEngineId(eng.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeEngineId === eng.id
                ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs border border-surface-200 dark:border-surface-700'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
            }`}
          >
            {eng.name.split('.')[1]}
          </button>
        ))}
      </div>

      {/* Dynamic Workflow Area */}
      <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 space-y-5">
        {/* Source vs Target Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-surface-500 dark:text-surface-400 font-mono">
                Source: {activeEngine.sourceDegree}
              </span>
              <Badge variant="neutral" size="sm">INPUT</Badge>
            </div>
            <p className="font-mono text-sm font-bold text-surface-900 dark:text-surface-100">
              "{activeEngine.sourceSentence}"
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-primary-50/50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-primary-700 dark:text-primary-300 font-mono">
                Target: {activeEngine.targetDegree}
              </span>
              <Badge variant="primary" size="sm">OUTPUT</Badge>
            </div>
            <p className="font-mono text-sm font-bold text-primary-950 dark:text-primary-100">
              "{activeEngine.targetSentence}"
            </p>
          </div>
        </div>

        {/* 5-Step Derivation Track */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-surface-700 dark:text-surface-300 uppercase tracking-wider block">
            5-Stage Cognitive Derivation Algorithm:
          </span>
          <div className="grid grid-cols-1 gap-2">
            {activeEngine.steps.map((st) => (
              <div
                key={st.step}
                className="p-3 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 flex items-start gap-3 text-xs"
              >
                <span className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 flex items-center justify-center font-bold shrink-0 mt-0.5">
                  {st.step}
                </span>
                <div className="flex-1 min-w-0">
                  <strong className="text-surface-900 dark:text-surface-100 block mb-0.5 font-heading">
                    {st.title}:
                  </strong>
                  <span className="text-surface-600 dark:text-surface-300 leading-relaxed font-mono text-[0.8125rem]">
                    {st.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Trap Warning */}
        <div className="p-3 rounded-lg bg-danger-50 dark:bg-danger-950/30 border border-danger-200 dark:border-danger-800 text-xs flex items-start gap-2.5">
          <AlertTriangle size={18} className="text-danger-600 dark:text-danger-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-danger-900 dark:text-danger-200 block mb-0.5">
              Examiner Distractor Trap:
            </strong>
            <span className="text-danger-800 dark:text-danger-300 leading-relaxed">
              {activeEngine.topTrap}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
