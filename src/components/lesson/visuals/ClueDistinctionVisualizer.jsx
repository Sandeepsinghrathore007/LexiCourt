import { useState } from 'react'
import { Sparkles, CheckCircle2 } from 'lucide-react'
import { Card, Badge } from '../../common'

const CLUE_SCENARIOS = [
  {
    basePhrase: 'An account of a person\'s life...',
    stemLabel: 'Base Concept: Life Writing',
    variants: [
      {
        clue: '...written by that person himself / herself',
        highlight: 'written by that person himself',
        resultWord: 'Autobiography',
        pos: 'Noun',
        why: 'Prefix "Auto-" (self) activates immediately when the subject and author are identical.'
      },
      {
        clue: '...written by someone else / an external biographer',
        highlight: 'written by someone else',
        resultWord: 'Biography',
        pos: 'Noun',
        why: 'Without "Auto-", life narrative composed by an outside writer is strictly a Biography.'
      }
    ]
  },
  {
    basePhrase: 'An independent person chosen to settle a dispute...',
    stemLabel: 'Base Concept: Dispute Settlement',
    variants: [
      {
        clue: '...whose decision (award) is LEGALLY BINDING on both parties',
        highlight: 'LEGALLY BINDING decision',
        resultWord: 'Arbitrator',
        pos: 'Noun (Adjudicator)',
        why: 'Binding adjudicative authority court-order level par sirf Arbitrator ke paas hoti hai.'
      },
      {
        clue: '...who facilitates mutual discussion to help parties reach an amicable compromise',
        highlight: 'facilitates mutual discussion / compromise',
        resultWord: 'Mediator',
        pos: 'Noun (Facilitator)',
        why: 'Mediator can never impose a binding ruling; they merely facilitate voluntary dialogue.'
      }
    ]
  },
  {
    basePhrase: 'A tribute or composition concerning a deceased person...',
    stemLabel: 'Base Concept: Memorial Tribute',
    variants: [
      {
        clue: '...inscribed directly upon a stone tomb or sepulchre',
        highlight: 'inscribed directly upon a tomb',
        resultWord: 'Epitaph',
        pos: 'Noun (Inscription)',
        why: 'Physical engraving on a tombstone distinguishes Epitaph from all oral or poetic tributes.'
      },
      {
        clue: '...delivered orally as a speech or written as a formal essay of high praise',
        highlight: 'speech or formal essay of high praise',
        resultWord: 'Eulogy',
        pos: 'Noun (Speech/Text)',
        why: 'Eu (good) + logos (speech) indicates formal commendation and celebration of life.'
      },
      {
        clue: '...composed as a formal poem or verse expressing melancholy grief and sorrow',
        highlight: 'composed as a formal poem / verse of grief',
        resultWord: 'Elegy',
        pos: 'Noun (Poem)',
        why: 'Elegy is defined by poetic meter and mournful lamentation (shok-kavita).'
      }
    ]
  },
  {
    basePhrase: 'An official event or publication taking place...',
    stemLabel: 'Base Concept: Recurrence Frequency',
    variants: [
      {
        clue: '...twice within a single year (semiannual)',
        highlight: 'twice within a single year',
        resultWord: 'Biannual',
        pos: 'Adjective',
        why: 'Interval = 6 months (occurring twice in 12 months).'
      },
      {
        clue: '...once every two years (every alternate year)',
        highlight: 'once every two years',
        resultWord: 'Biennial',
        pos: 'Adjective',
        why: 'Interval = 24 months (occurring once across 2 full years).'
      }
    ]
  }
]

export default function ClueDistinctionVisualizer() {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0)
  const [activeVariantIdx, setActiveVariantIdx] = useState(0)

  const scenario = CLUE_SCENARIOS[activeScenarioIdx]
  const variant = scenario.variants[activeVariantIdx] || scenario.variants[0]

  const handleScenarioChange = (idx) => {
    setActiveScenarioIdx(idx)
    setActiveVariantIdx(0)
  }

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-200 dark:border-surface-700/80 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-primary-600 dark:text-primary-400" />
          <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
            Limiting Clue Distinction Visualizer: How One Keyword Changes the Entire Answer
          </h3>
        </div>
        <Badge variant="primary" size="sm">Decisive Clue Simulator</Badge>
      </div>

      <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed">
        Dekhein ki base sentence vahi rehta hai, lekin ek limiting clause badal te hi answer 180 degrees shift ho jata hai:
      </p>

      {/* Scenario Tabs */}
      <div className="flex flex-wrap gap-2">
        {CLUE_SCENARIOS.map((sc, idx) => (
          <button
            key={sc.stemLabel}
            type="button"
            onClick={() => handleScenarioChange(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeScenarioIdx === idx
                ? 'bg-primary-600 text-white shadow-xs'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200'
            }`}
          >
            {sc.stemLabel}
          </button>
        ))}
      </div>

      {/* Base Sentence Display */}
      <div className="p-4 rounded-xl border border-primary-200 dark:border-primary-800/80 bg-primary-50/20 dark:bg-primary-950/20 space-y-2">
        <span className="text-[0.625rem] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 font-mono">
          Common Base Stem:
        </span>
        <p className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
          "{scenario.basePhrase}"
        </p>
      </div>

      {/* Limiting Clue Switcher Buttons */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-surface-700 dark:text-surface-300 block">
          Select the Limiting Clue attached to the stem:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {scenario.variants.map((v, vIdx) => {
            const isSelected = activeVariantIdx === vIdx
            return (
              <button
                key={v.resultWord}
                type="button"
                onClick={() => setActiveVariantIdx(vIdx)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'border-primary-500 bg-white dark:bg-surface-850 shadow-xs ring-2 ring-primary-500/20'
                    : 'border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/60 hover:border-surface-300'
                }`}
              >
                <div>
                  <span className="text-[0.6875rem] font-mono text-surface-400 block mb-0.5">
                    Clue Option {vIdx + 1}:
                  </span>
                  <p className="text-xs font-semibold text-surface-800 dark:text-surface-200">
                    {v.clue}
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  isSelected ? 'border-primary-600 bg-primary-600 text-white' : 'border-surface-300'
                }`}>
                  {isSelected && <CheckCircle2 size={12} />}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Dynamic Result Lock Display */}
      <div className="p-4 rounded-xl border border-success-300 dark:border-success-800/80 bg-success-50/30 dark:bg-success-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-success-700 dark:text-success-400">
              Decisive Limiting Clause:
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-xs font-mono font-bold">
              {variant.highlight}
            </span>
          </div>
          <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed max-w-xl">
            {variant.why}
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[0.625rem] uppercase font-bold text-surface-400 block font-mono">
            Locked Substitution:
          </span>
          <span className="font-heading font-black text-2xl text-success-700 dark:text-success-300 tracking-tight">
            {variant.resultWord}
          </span>
          <span className="text-[0.6875rem] text-surface-500 block font-mono">
            [{variant.pos}]
          </span>
        </div>
      </div>
    </Card>
  )
}
