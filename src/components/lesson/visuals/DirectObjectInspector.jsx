import { useState } from 'react'
import { ShieldAlert, CheckCircle2, XCircle, Info } from 'lucide-react'
import { Card, Badge } from '../../common'

const DIRECT_VERBS = [
  {
    verb: 'discuss',
    redundant: 'discuss about',
    hindiSource: '"mudde ke baare mein charcha ki" ➔ literal translation se log "about" laga dete hain',
    correct: 'We will discuss the pending recruitment rules tomorrow.',
    incorrect: 'We will discuss about the pending recruitment rules tomorrow. (WRONG)',
    validException: 'None for core verb. But Noun form: "have a discussion ABOUT the rules".'
  },
  {
    verb: 'enter',
    redundant: 'enter into (physical space)',
    hindiSource: '"kamre mein pravesh kiya" ➔ "into" laga dete hain, jabki enter ka matlab hi hota hai "go into"',
    correct: 'The Chief Justice entered the courtroom promptly at 10:30 AM.',
    incorrect: 'The Chief Justice entered into the courtroom promptly. (FATAL ERROR)',
    validException: 'Legal/Abstract: "The firm entered INTO a service contract." (Entering agreement is valid).'
  },
  {
    verb: 'reach',
    redundant: 'reach to',
    hindiSource: '"station par pahunchna" ➔ "reach to the station" bol dete hain',
    correct: 'The judicial inquiry team reached the district headquarters safely.',
    incorrect: 'The judicial inquiry team reached to the district headquarters. (WRONG)',
    validException: 'Phrasal Verb: "reach OUT to the public" (meaning: connect/assist).'
  },
  {
    verb: 'order',
    redundant: 'order for (goods/food)',
    hindiSource: '"khana mangwana / order dena" ➔ "ordered for lunch" bolte hain',
    correct: 'The registry ordered fifty new high-speed biometric scanners.',
    incorrect: 'The registry ordered for fifty new high-speed biometric scanners. (WRONG)',
    validException: 'Noun form: "placed an order FOR fifty scanners" (Noun takes "for", Verb takes nothing!).'
  },
  {
    verb: 'resemble',
    redundant: 'resemble to / resemble with',
    hindiSource: '"shakal milna / jaisa dikhna" ➔ "resembles with his father" likh dete hain',
    correct: 'The cloned user interface closely resembles the official portal.',
    incorrect: 'The cloned user interface closely resembles to/with the official portal. (WRONG)',
    validException: 'Noun form: "bears a striking resemblance TO the original".'
  },
  {
    verb: 'approach',
    redundant: 'approach to',
    hindiSource: '"court ke paas jana" ➔ "approached to the court" bol dete hain',
    correct: 'Aggrieved employees may directly approach the High Court under Article 226.',
    incorrect: 'Aggrieved employees may directly approach to the High Court. (WRONG)',
    validException: 'Noun form: "an innovative approach TO judicial file archiving".'
  },
  {
    verb: 'emphasize',
    redundant: 'emphasize on',
    hindiSource: '"baat par zor dena" ➔ "emphasized on speedy trials" likh dete hain',
    correct: 'The administrative circular emphasized the strict maintenance of attendance.',
    incorrect: 'The administrative circular emphasized on the strict maintenance. (WRONG)',
    validException: 'Noun form: "The circular laid great emphasis ON attendance" (Noun takes "on").'
  },
  {
    verb: 'demand',
    redundant: 'demand for',
    hindiSource: '"spashtikaran ki maang ki" ➔ "demanded for an explanation"',
    correct: 'The Registrar demanded an immediate explanation from the absent staff.',
    incorrect: 'The Registrar demanded for an immediate explanation. (WRONG)',
    validException: 'Noun form: "There is an urgent demand FOR system assistants".'
  },
  {
    verb: 'accompany',
    redundant: 'accompany with',
    hindiSource: '"kisi ke sath jana" ➔ "accompanied with his junior"',
    correct: 'The senior standing counsel accompanied his junior to the registrar chamber.',
    incorrect: 'The senior standing counsel accompanied with his junior. (WRONG)',
    validException: 'Passive Voice: "The file was accompanied BY supporting vouchers".'
  }
]

export default function DirectObjectInspector() {
  const [selectedVerb, setSelectedVerb] = useState(DIRECT_VERBS[0].verb)

  const active = DIRECT_VERBS.find((v) => v.verb === selectedVerb) || DIRECT_VERBS[0]

  return (
    <Card variant="default" padding="lg" className="border-red-200 dark:border-surface-700 select-none shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert size={18} className="text-red-600 dark:text-red-400" />
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Direct-Object Inspector: Zero Preposition Transitive Verbs
            </h3>
          </div>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            Aise transitive verbs jahan standard English mein direct object aata hai aur unnecessary extra preposition lagana strictly prohibited hai.
          </p>
        </div>
        <Badge variant="error" size="md">
          Zero Preposition Law
        </Badge>
      </div>

      {/* Selector Pills */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
        {DIRECT_VERBS.map((v) => (
          <button
            key={v.verb}
            type="button"
            onClick={() => setSelectedVerb(v.verb)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
              selectedVerb === v.verb
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-white dark:bg-surface-900 text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
            }`}
          >
            {v.verb}
          </button>
        ))}
      </div>

      {/* Active Inspector Display */}
      <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-surface-100 dark:border-surface-800">
          <div>
            <span className="text-xs font-mono text-red-600 dark:text-red-400 font-bold uppercase tracking-wider block">
              Direct Transitive Rule
            </span>
            <h4 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-100">
              VERB: <span className="text-primary-600 dark:text-primary-400">{active.verb}</span> + [Direct Object]
            </h4>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-xs font-mono font-bold text-red-700 dark:text-red-300">
            Redundant Trap: *{active.redundant}
          </div>
        </div>

        {/* Why the error happens */}
        <div className="p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 text-xs text-surface-700 dark:text-surface-300">
          <strong className="text-amber-800 dark:text-amber-300 block mb-1">Kyun Hoti Hai Ye Galti? (Mother Tongue Interference)</strong>
          {active.hindiSource}
        </div>

        {/* Correct vs Incorrect */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800/80 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
              <CheckCircle2 size={16} />
              <span>Standard English (Correct):</span>
            </div>
            <p className="text-surface-800 dark:text-surface-200 italic font-medium">
              "{active.correct}"
            </p>
          </div>

          <div className="p-3 rounded-lg bg-red-50/50 dark:bg-red-950/20 border border-red-300 dark:border-red-800/80 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-red-700 dark:text-red-400 font-bold">
              <XCircle size={16} />
              <span>Exam Distractor (Incorrect):</span>
            </div>
            <p className="text-red-700 dark:text-red-300 italic font-medium">
              "{active.incorrect}"
            </p>
          </div>
        </div>

        {/* Valid Exception Note */}
        <div className="p-3 rounded-lg bg-surface-50 dark:bg-surface-800/70 border border-surface-200 dark:border-surface-700 text-xs text-surface-600 dark:text-surface-300 flex items-start gap-2">
          <Info size={16} className="text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-surface-900 dark:text-surface-100 block mb-0.5">Legitimate Grammatical Variations:</strong>
            {active.validException}
          </div>
        </div>
      </div>
    </Card>
  )
}
