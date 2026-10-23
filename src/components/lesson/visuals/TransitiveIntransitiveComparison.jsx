import { useState } from 'react'
import { Check, X, AlertTriangle, Sparkles } from 'lucide-react'
import { Card, Badge } from '../../common'

const COMPARISON_ROWS = [
  {
    verb: 'Fly',
    transitiveSentence: 'The boy flies a colorful kite.',
    transitiveObject: 'a colorful kite (Direct Object)',
    transitivePassive: 'A colorful kite is flown by the boy. (VALID)',
    intransitiveSentence: 'Migratory birds fly in the sky.',
    intransitiveObject: 'in the sky (Place Adverbial — NO OBJECT)',
    intransitivePassive: 'NO PASSIVE POSSIBLE (Invalid: Birds are flown in sky)',
    explanation: "'Fly' jab object leti hai ('flies a kite') tab transitive hoti hai. Jab bina object ke aati hai ('birds fly') tab intransitive hoti hai."
  },
  {
    verb: 'Stop',
    transitiveSentence: 'The traffic police stopped the overspeeding bus.',
    transitiveObject: 'the overspeeding bus (Direct Object)',
    transitivePassive: 'The overspeeding bus was stopped by police. (VALID)',
    intransitiveSentence: 'The overspeeding bus stopped suddenly.',
    intransitiveObject: 'suddenly (Manner Adverbial — NO OBJECT)',
    intransitivePassive: 'NO PASSIVE POSSIBLE (Action complete within subject)',
    explanation: "'Stop' transitive mein action bus par transfer karta hai; intransitive mein bus khud rukti hai, isliye object nahi hota."
  },
  {
    verb: 'Die / Collapse',
    transitiveSentence: '— (Purely Intransitive Verb)',
    transitiveObject: 'No Direct Object is ever taken',
    transitivePassive: 'TRANSITIVE USAGE DOES NOT EXIST',
    intransitiveSentence: 'The critical witness died in the hospital yesterday.',
    intransitiveObject: 'in hospital / yesterday (Place/Time Adverbs — NO OBJECT)',
    intransitivePassive: 'NO PASSIVE POSSIBLE (Fatal Trap: "was died" is WRONG)',
    explanation: "'Die' purely intransitive verb hai. Iska koi passive voice exist nahi karta. 'The witness was died' kehna gross blunder hai."
  },
  {
    verb: 'Arrive / Go',
    transitiveSentence: '— (Purely Intransitive Verb)',
    transitiveObject: 'No Direct Object is ever taken',
    transitivePassive: 'TRANSITIVE USAGE DOES NOT EXIST',
    intransitiveSentence: 'The High Court judges arrived at the session house.',
    intransitiveObject: 'at the session house (Prepositional Place Adverbial)',
    intransitivePassive: 'NO PASSIVE POSSIBLE (Fatal Trap: "was arrived" is WRONG)',
    explanation: "'Arrive' aur 'Go' movement verbs hain jo destination (place) leti hain, direct object nahi. Inka passive nahi ban sakta."
  }
]

export default function TransitiveIntransitiveComparison() {
  const [activeVerbIndex, setActiveVerbIndex] = useState(0)

  const activeRow = COMPARISON_ROWS[activeVerbIndex]

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-200 dark:border-surface-700 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Visual Architecture • Model 5</Badge>
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-300">
              Transitivity & Feasibility Discrimination
            </span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-white mt-1">
            Transitive (Passivizable) vs. Intransitive (Non-Passivizable) Verbs
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            Kyun har sentence ka passive nahi banta? Direct Object requirement aur pseudo-passive traps ko visually distinguish karein.
          </p>
        </div>

        {/* Verb Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-100 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
          {COMPARISON_ROWS.map((r, idx) => (
            <button
              key={r.verb}
              onClick={() => setActiveVerbIndex(idx)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                activeVerbIndex === idx
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
              }`}
            >
              {r.verb}
            </button>
          ))}
        </div>
      </div>

      {/* Side by Side Comparative Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Transitive Box (Valid) */}
        <div className="p-4 rounded-xl bg-success-50/50 dark:bg-success-950/20 border-2 border-success-200 dark:border-success-800/60 space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="success" size="sm" className="font-mono flex items-center gap-1">
              <Check size={13} />
              <span>Transitive Usage (Object Present)</span>
            </Badge>
            <span className="text-2xs font-bold text-success-700 dark:text-success-300 uppercase">
              Passive Allowed
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-success-200 dark:border-success-900">
              <span className="text-2xs font-bold text-surface-500 uppercase block mb-0.5">Active</span>
              <p className="font-mono text-surface-900 dark:text-white font-medium">"{activeRow.transitiveSentence}"</p>
            </div>

            <div className="p-2 rounded-lg bg-success-100/60 dark:bg-success-900/40 text-success-950 dark:text-success-200">
              <strong className="text-2xs uppercase block">Receiver Test:</strong>
              {activeRow.transitiveObject}
            </div>

            <div className="p-2.5 rounded-lg bg-success-100 dark:bg-success-950/60 border border-success-300 dark:border-success-700">
              <span className="text-2xs font-bold text-success-800 dark:text-success-300 uppercase block mb-0.5">Passive Result</span>
              <p className="font-mono font-bold text-success-950 dark:text-success-100">{activeRow.transitivePassive}</p>
            </div>
          </div>
        </div>

        {/* Intransitive Box (Invalid) */}
        <div className="p-4 rounded-xl bg-error-50/50 dark:bg-error-950/20 border-2 border-error-200 dark:border-error-800/60 space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="error" size="sm" className="font-mono flex items-center gap-1">
              <X size={13} />
              <span>Intransitive Usage (No Object)</span>
            </Badge>
            <span className="text-2xs font-bold text-error-700 dark:text-error-300 uppercase">
              Passive Blocked
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-error-200 dark:border-error-900">
              <span className="text-2xs font-bold text-surface-500 uppercase block mb-0.5">Active</span>
              <p className="font-mono text-surface-900 dark:text-white font-medium">"{activeRow.intransitiveSentence}"</p>
            </div>

            <div className="p-2 rounded-lg bg-error-100/60 dark:bg-error-900/40 text-error-950 dark:text-error-200">
              <strong className="text-2xs uppercase block">Receiver Test:</strong>
              {activeRow.intransitiveObject}
            </div>

            <div className="p-2.5 rounded-lg bg-error-100 dark:bg-error-950/60 border border-error-300 dark:border-error-700">
              <span className="text-2xs font-bold text-error-800 dark:text-error-300 uppercase block mb-0.5">Passive Result</span>
              <p className="font-mono font-bold text-error-950 dark:text-error-100">{activeRow.intransitivePassive}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Insight Callout */}
      <div className="p-3.5 rounded-xl bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-xs text-surface-800 dark:text-surface-200 flex items-start gap-2.5">
        <Sparkles size={16} className="text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-surface-900 dark:text-white">Transitivity Rule: </strong>
          {activeRow.explanation}
        </div>
      </div>

      {/* Pure Intransitive Warning Banner */}
      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
        <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong>High Court Trap Alert: </strong>
          Purely intransitive verbs: <em>die, sleep, arrive, go, laugh, smile, happen, fall</em>. Inka passive kabhi nahi banta. 'He was died' ya 'The train was arrived' dekh kar foran eliminate karein!
        </div>
      </div>
    </Card>
  )
}
