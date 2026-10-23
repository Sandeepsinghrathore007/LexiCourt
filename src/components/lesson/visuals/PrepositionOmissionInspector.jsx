import { useState } from 'react'
import { ShieldAlert, CheckCircle2, XCircle } from 'lucide-react'
import { Card, Badge } from '../../common'

const OMISSION_VERBS = [
  {
    verb: 'discuss',
    redundantPrep: 'about',
    incorrect: 'The Bench discussed about the constitutional matter.',
    correct: 'The Bench discussed the constitutional matter.',
    etymologyReason: '"Discuss" ka root meaning hi hota hai "to talk about / examine in detail". Isliye "about" lagana redundant repetition (pleonasm) hota hai.',
    exceptionNote: 'Noun construction mein "about" valid hai: "had a long discussion about the matter". Verb ke sath strictly prohibited hai.'
  },
  {
    verb: 'enter (physical)',
    redundantPrep: 'into',
    incorrect: 'The advocate entered into the courtroom without his band.',
    correct: 'The advocate entered the courtroom without his band.',
    etymologyReason: '"Enter" ka literal meaning hi hota hai "to go / come INTO". Physical enclosure (room, hall, building) ke liye "into" lagana double boundary error hai.',
    exceptionNote: 'Figurative / Legal contexts mein "into" valid hota hai: "entered into an agreement / contract / negotiations / alliance".'
  },
  {
    verb: 'order',
    redundantPrep: 'for',
    incorrect: 'He ordered for two sets of certified court copies.',
    correct: 'He ordered two sets of certified court copies.',
    etymologyReason: '"Order" direct transitive verb hai jo commodity ya service ko direct object ke taur par leti hai.',
    exceptionNote: 'Noun construction mein "for" lagta hai: "He placed an order for three computers". Verb mein strictly prohibited hai.'
  },
  {
    verb: 'attack',
    redundantPrep: 'on',
    incorrect: 'The rioters attacked on the police checkpoint.',
    correct: 'The rioters attacked the police checkpoint.',
    etymologyReason: 'Verb "attack" ka matlab hi hota hai kisi target par physical assault launch karna. Direct object leti hai.',
    exceptionNote: 'Noun construction mein "on" lagta hai: "The army launched a fierce attack on the enemy base". Verb mein NO "on".'
  },
  {
    verb: 'reach',
    redundantPrep: 'to / at',
    incorrect: 'The judicial delegation reached to Jaipur at midnight.',
    correct: 'The judicial delegation reached Jaipur at midnight.',
    etymologyReason: '"Reach" ka matlab hota hai "arrive at destination". Iske baad preposition lagana redundant hai.',
    exceptionNote: 'Verb "arrive" preposition leti hai ("arrived at Jaipur" / "arrived in India"), lekin "reach" bilkul koi preposition nahi leti.'
  },
  {
    verb: 'resemble',
    redundantPrep: 'with / to',
    incorrect: 'The junior assistant closely resembles with his father.',
    correct: 'The junior assistant closely resembles his father.',
    etymologyReason: '"Resemble" means "to be similar to in appearance". Iske baad "with" ya "to" lagana redundant error hai.',
    exceptionNote: 'Noun construction "have a resemblance to" valid hai, lekin verb "resemble" zero preposition leti hai.'
  },
  {
    verb: 'marry (active)',
    redundantPrep: 'with',
    incorrect: 'Ramesh married with Sita in a traditional ceremony.',
    correct: 'Ramesh married Sita in a traditional ceremony.',
    etymologyReason: 'Active voice mein verb "marry" direct object leti hai bina kisi preposition ke.',
    exceptionNote: 'Passive voice mein strictly "married TO" lagta hai (NOT *married with): "Sita was married to Ramesh".'
  },
  {
    verb: 'accompany',
    redundantPrep: 'with',
    incorrect: 'The police officer accompanied with the witness to the court.',
    correct: 'The police officer accompanied the witness to the court.',
    etymologyReason: '"Accompany" means "to go with someone". Isme "with" already semantic core mein embedded hai.',
    exceptionNote: 'Passive voice mein "accompanied by" lagta hai: "The Chief Minister was accompanied by his legal advisor".'
  },
]

export default function PrepositionOmissionInspector() {
  const [activeVerbIndex, setActiveVerbIndex] = useState(0)
  const activeItem = OMISSION_VERBS[activeVerbIndex]

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 flex items-center justify-center font-bold">
            <ShieldAlert size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Zero Preposition Inspector (Transitive Verb Omission Law)
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-400">
              Direct transitive verbs jo bina kisi preposition ke direct object lete hain aur unke exam traps
            </p>
          </div>
        </div>
        <Badge variant="error" size="sm">Omission Law</Badge>
      </div>

      {/* Verb Selector Pills */}
      <div className="flex flex-wrap gap-1.5 p-2 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
        {OMISSION_VERBS.map((item, index) => {
          const isActive = index === activeVerbIndex
          return (
            <button
              key={item.verb}
              type="button"
              onClick={() => setActiveVerbIndex(index)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white hover:bg-surface-200/60 dark:hover:bg-surface-700/60'
              }`}
            >
              {item.verb} (NO {item.redundantPrep})
            </button>
          )
        })}
      </div>

      {/* Active Verb Inspector Card */}
      <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-850/60 border border-surface-200 dark:border-surface-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-base text-red-600 dark:text-red-400 uppercase">
              Verb: {activeItem.verb}
            </span>
            <Badge variant="error" size="sm">
              Strictly NO "{activeItem.redundantPrep}"
            </Badge>
          </div>
          <span className="text-xs font-semibold text-surface-500">
            Transitive Verb + Direct Object
          </span>
        </div>

        {/* Incorrect vs Correct Comparative Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Incorrect */}
          <div className="p-3 rounded-lg bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-red-700 dark:text-red-400 font-bold">
              <XCircle size={15} />
              <span>Common Exam Error (Pleonasm):</span>
            </div>
            <p className="font-mono text-surface-800 dark:text-surface-200 line-through">
              {activeItem.incorrect}
            </p>
          </div>

          {/* Correct */}
          <div className="p-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
              <CheckCircle2 size={15} />
              <span>Correct Standard Formulation:</span>
            </div>
            <p className="font-mono text-surface-900 dark:text-surface-100 font-semibold">
              {activeItem.correct}
            </p>
          </div>
        </div>

        {/* Linguistic Reason & Exception */}
        <div className="space-y-2 text-xs pt-1">
          <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
            <strong className="text-surface-900 dark:text-white">Linguistic Rationale: </strong>
            {activeItem.etymologyReason}
          </p>

          <div className="p-2.5 rounded-lg bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 text-primary-900 dark:text-primary-200">
            <strong>Noun / Figurative Exception: </strong>
            {activeItem.exceptionNote}
          </div>
        </div>
      </div>
    </Card>
  )
}
