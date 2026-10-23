import { useState } from 'react'
import { GitBranch, CheckCircle2 } from 'lucide-react'
import { Card, Badge } from '../../common'

const TEST_SCENARIOS = [
  {
    id: 'scen-1',
    sentence: 'The disciplinary committee\'s verdict will not ___ his pension eligibility.',
    options: ['affect', 'effect'],
    correct: 'affect',
    phase1: 'Slot Audit: "will not" auxiliary chain ke baad base form finite VERB (V1) required hai.',
    phase2: 'Part of Speech Test: "Affect" verb hai (to influence); "Effect" noun hai (result).',
    phase3: 'Direct Object Check: "his pension eligibility" verb ka direct object hai.',
    phase4: 'Synthesis: Auxiliary "will not" + Verb "AFFECT". Answer: affect.',
    trapNote: 'Examiner determiner ke bina "effect" daalta hai. Yahan action required hai, isliye "affect" aayega.'
  },
  {
    id: 'scen-2',
    sentence: 'Yesterday, the original title deed ___ in the locker room all morning.',
    options: ['lay', 'laid'],
    correct: 'lay',
    phase1: 'Slot Audit: "Yesterday" past time marker hai, verb slot past tense mein hona chahiye.',
    phase2: 'Transitivity Audit: Blank ke baad prepositional phrase "in the locker room" hai; zero direct object.',
    phase3: 'Intransitive Verb Conjugation: "Lie" (letna/pada rehna, intransitive) ka past tense "LAY" hota hai.',
    phase4: 'Synthesis: Title deed khud locker room mein padi thi (no direct object). Answer: lay.',
    trapNote: 'Transitive "laid" tab lagta jab koi clerk deed ko locker mein rakhta ("The clerk laid the deed").'
  },
  {
    id: 'scen-3',
    sentence: 'Due to computerization, ___ procedural errors occurred during cause-list preparation.',
    options: ['fewer', 'less'],
    correct: 'fewer',
    phase1: 'Slot Audit: Blank noun phrase "procedural errors" ko quantify karne ke liye determiner slot mein hai.',
    phase2: 'Countability Audit: "Errors" plural countable noun hai (ending in plural "-s").',
    phase3: 'Diction Concord: Plural countable nouns ke sath strictly "FEWER" lagta hai; "less" mass uncountable ke sath lagta hai.',
    phase4: 'Synthesis: Countable errors = "FEWER procedural errors". Answer: fewer.',
    trapNote: 'Spoken English mein "less errors" bolna aam hai, lekin written examination mein ye 100% error hai.'
  },
  {
    id: 'scen-4',
    sentence: 'The government advocate ___ the single bench that compliance would be filed by Friday.',
    options: ['assured', 'ensured', 'insured'],
    correct: 'assured',
    phase1: 'Slot Audit: Past tense reporting verb required hai jiske baad personal recipient object hai.',
    phase2: 'Recipient Check: "the single bench" recipient hai jise vishwas dilaya ja raha hai.',
    phase3: 'Lexical Distinction: "Assure someone that..." (aashwasan dena); "Ensure that..." (kisi ghatna ko sunishchit karna).',
    phase4: 'Synthesis: Personal object "the single bench" ke sath strictly "ASSURED" aayega. Answer: assured.',
    trapNote: '"Ensure" ke baad personal pronoun/object nahi lagta (*ensured the judge is incorrect).'
  }
]

export default function WordSelectionFlowchart() {
  const [activeScenarioId, setActiveScenarioId] = useState('scen-1')

  const currentScen = TEST_SCENARIOS.find((s) => s.id === activeScenarioId) || TEST_SCENARIOS[0]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300">
              <GitBranch size={16} />
            </span>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Visual Map 7: Context-Based Word-Selection Flowchart
            </h3>
          </div>
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
            4-Phase Contextual Algorithm: Syntactic Slot $\to$ Transitivity $\to$ Countability $\to$ Lexical Synthesis
          </p>
        </div>
        <Badge variant="primary" size="sm">
          Interactive Algorithmic Engine
        </Badge>
      </div>

      {/* Scenario Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {TEST_SCENARIOS.map((scen, idx) => {
          const isSelected = scen.id === activeScenarioId
          return (
            <button
              key={scen.id}
              type="button"
              onClick={() => setActiveScenarioId(scen.id)}
              className={`p-2.5 rounded-xl text-left text-xs transition-all border cursor-pointer space-y-1 ${
                isSelected
                  ? 'bg-primary-50 dark:bg-primary-950/80 border-primary-500 text-primary-900 dark:text-primary-100 shadow-xs ring-1 ring-primary-400'
                  : 'bg-surface-50 dark:bg-surface-850 border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:border-surface-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.625rem] font-bold text-surface-500 uppercase">Case {idx + 1}</span>
                <span className="font-mono font-bold text-primary-700 dark:text-primary-300">{scen.options.join(' / ')}</span>
              </div>
              <p className="line-clamp-1 italic text-surface-700 dark:text-surface-300">{scen.sentence.split('___')[0]}...</p>
            </button>
          )
        })}
      </div>

      {/* Flowchart Execution Box */}
      <div className="p-4 rounded-xl bg-surface-50/70 dark:bg-surface-850/70 border border-surface-200 dark:border-surface-700 space-y-4">
        {/* Sentence Banner */}
        <div className="p-3 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1 shadow-xs">
          <span className="text-[0.6875rem] font-bold text-surface-500 uppercase">Problem Sentence:</span>
          <p className="text-xs sm:text-sm font-semibold text-surface-900 dark:text-surface-50">
            "{currentScen.sentence}"
          </p>
        </div>

        {/* 4 Sequential Flow Phases */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div className="p-3 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1 shadow-xs">
            <span className="font-bold text-primary-700 dark:text-primary-300 block text-[0.6875rem]">Phase 1: Syntactic Slot Isolation</span>
            <p className="text-surface-700 dark:text-surface-300 leading-relaxed">{currentScen.phase1}</p>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1 shadow-xs">
            <span className="font-bold text-amber-700 dark:text-amber-300 block text-[0.6875rem]">Phase 2: Transitivity / Part-of-Speech</span>
            <p className="text-surface-700 dark:text-surface-300 leading-relaxed">{currentScen.phase2}</p>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1 shadow-xs">
            <span className="font-bold text-secondary-700 dark:text-secondary-300 block text-[0.6875rem]">Phase 3: Countability / Concord</span>
            <p className="text-surface-700 dark:text-surface-300 leading-relaxed">{currentScen.phase3}</p>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1 shadow-xs">
            <span className="font-bold text-success-700 dark:text-success-300 block text-[0.6875rem]">Phase 4: Synthesis & Verification</span>
            <p className="text-surface-700 dark:text-surface-300 leading-relaxed">{currentScen.phase4}</p>
          </div>
        </div>

        {/* Final Selection Result & Trap */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg bg-success-50/50 dark:bg-success-950/30 border border-success-200 dark:border-success-800/60">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-success-600 dark:text-success-400 shrink-0" />
            <span className="text-xs font-bold text-success-900 dark:text-success-200">
              Verified Solution: <strong className="font-mono text-sm underline">{currentScen.correct.toUpperCase()}</strong>
            </span>
          </div>
          <span className="text-[0.6875rem] text-surface-600 dark:text-surface-400 italic">
            {currentScen.trapNote}
          </span>
        </div>
      </div>
    </Card>
  )
}
