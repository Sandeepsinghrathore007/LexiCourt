import { useState } from 'react'
import { Check, X, ShieldAlert } from 'lucide-react'
import { Card, Badge } from '../../common'

const PUNCTUATION_RULES = [
  {
    id: 'comma-splice',
    name: '1. Comma Splice vs Valid Fixes',
    defectLabel: 'Fatal Error: Two Independent Clauses with ONLY a Comma',
    badExample: 'The high court pronounced its judgment, the news channels broadcasted it.',
    badExplanation: 'Do independent clauses ko sirf ek comma se nahi joda ja sakta. Ye comma splice error hai.',
    remedies: [
      { type: 'Option A: Add FANBOYS', text: 'The high court pronounced its judgment, and the news channels broadcasted it.' },
      { type: 'Option B: Use Semicolon', text: 'The high court pronounced its judgment; the news channels broadcasted it.' },
      { type: 'Option C: Subordinate Clause', text: 'When the high court pronounced its judgment, the news channels broadcasted it.' }
    ]
  },
  {
    id: 'conjunctive-adv',
    name: '2. Conjunctive Adverb Semicolon Formula',
    defectLabel: 'Trap: Using Comma before "However" or "Therefore"',
    badExample: 'The petition was legally sound, however the judge dismissed it on delay.',
    badExplanation: '"However" conjunctive adverb hai, conjunction nahi. Comma + however do clauses ko connect nahi kar sakta.',
    remedies: [
      { type: 'Standard Semicolon Formula', text: 'The petition was legally sound; however, the judge dismissed it on delay.' },
      { type: 'Two Distinct Sentences', text: 'The petition was legally sound. However, the judge dismissed it on delay.' },
      { type: 'Coordinating "But"', text: 'The petition was legally sound, but the judge dismissed it on delay.' }
    ]
  },
  {
    id: 'subordinating-comma',
    name: '3. Subordinating Clause Comma Rule',
    defectLabel: 'Trap: Adding a Comma before a Terminal Subordinate Clause',
    badExample: 'The registrar condoned the delay, although the appeal was filed beyond limitation.',
    badExplanation: 'Jab main clause pehle ho aur subordinate clause baad mein ho, toh beech mein comma lagana standard formal English mein error hai.',
    remedies: [
      { type: 'Correct Terminal Syntax', text: 'The registrar condoned the delay although the appeal was filed beyond limitation.' },
      { type: 'Initial Clause Inversion', text: 'Although the appeal was filed beyond limitation, the registrar condoned the delay.' }
    ]
  },
  {
    id: 'double-contrast',
    name: '4. The Although... But Pleonasm',
    defectLabel: 'Fatal Error: Using "Although" and "But" in the Same Sentence',
    badExample: 'Although the witness was cross-examined thoroughly, but he did not contradict himself.',
    badExplanation: 'Hindi ke "Yadyapi... parantu" ka literal translation English mein pleonasm hai. Ek hi marker kafi hota hai.',
    remedies: [
      { type: 'Drop "But"', text: 'Although the witness was cross-examined thoroughly, he did not contradict himself.' },
      { type: 'Optional "Yet"', text: 'Although the witness was cross-examined thoroughly, yet he did not contradict himself.' },
      { type: 'Drop "Although"', text: 'The witness was cross-examined thoroughly, but he did not contradict himself.' }
    ]
  }
]

export default function PunctuationReferenceDiagram() {
  const [selectedRuleId, setSelectedRuleId] = useState('comma-splice')

  const currentRule = PUNCTUATION_RULES.find((r) => r.id === selectedRuleId) || PUNCTUATION_RULES[0]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300">
              <ShieldAlert size={16} />
            </span>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Visual Map 5: Punctuation Reference & Comma Splice Inspector
            </h3>
          </div>
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
            Sentence correction mein aane wale recurring comma, semicolon, aur pleonasm traps ka visual diagnostic
          </p>
        </div>
        <Badge variant="error" size="sm">
          High-Yield Punctuation Laws
        </Badge>
      </div>

      {/* Selector Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
        {PUNCTUATION_RULES.map((rule) => {
          const isSelected = rule.id === selectedRuleId
          return (
            <button
              key={rule.id}
              type="button"
              onClick={() => setSelectedRuleId(rule.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-200 shadow-xs border border-surface-200 dark:border-surface-700'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 hover:bg-surface-200/50 dark:hover:bg-surface-700/60'
              }`}
            >
              {rule.name.split('.')[1]}
            </button>
          )
        })}
      </div>

      {/* Defect Box vs Solution Box */}
      <div className="space-y-4">
        {/* The Defect (Red) */}
        <div className="p-3.5 rounded-xl bg-danger-50/50 dark:bg-danger-950/30 border border-danger-200 dark:border-danger-800/60 space-y-2">
          <div className="flex items-center gap-2 text-danger-900 dark:text-danger-200 font-bold text-xs">
            <X size={15} className="text-danger-600 dark:text-danger-400 shrink-0" />
            <span>{currentRule.defectLabel}</span>
          </div>
          <p className="font-mono text-xs text-danger-800 dark:text-danger-300 bg-white dark:bg-surface-900 p-2.5 rounded-lg border border-danger-200 dark:border-danger-800/80">
            {currentRule.badExample}
          </p>
          <p className="text-xs text-danger-800 dark:text-danger-300 leading-relaxed">
            <strong>Kyun galat hai: </strong>
            {currentRule.badExplanation}
          </p>
        </div>

        {/* Valid Remedies (Green) */}
        <div className="p-3.5 rounded-xl bg-success-50/50 dark:bg-success-950/30 border border-success-200 dark:border-success-800/60 space-y-2.5">
          <div className="flex items-center gap-2 text-success-900 dark:text-success-200 font-bold text-xs">
            <Check size={15} className="text-success-600 dark:text-success-400 shrink-0" />
            <span>Authorized Grammatical Remedies:</span>
          </div>
          <div className="space-y-2">
            {currentRule.remedies.map((rem, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-success-200 dark:border-success-800/70 text-xs space-y-0.5 shadow-xs"
              >
                <span className="font-bold text-success-800 dark:text-success-300 block text-[0.6875rem]">
                  {rem.type}:
                </span>
                <p className="font-mono text-surface-900 dark:text-surface-100">{rem.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
