import { useState } from 'react'
import { XCircle, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react'
import { Card, Badge } from '../../common'

const ROUTES = [
  {
    id: 'route-standard',
    title: 'Route A: Standard "Not to + V1"',
    reportingVerb: 'ordered / told / advised / warned',
    syntax: 'Subject + Reporting Verb + Object + NOT to + V1',
    example: 'The judge ordered the witness not to leave the courtroom.',
    direct: 'The judge said to the witness, "Do not leave the courtroom."',
    breakdown: [
      { part: 'Reporting Verb', value: 'ordered (Past transitive)' },
      { part: 'Object', value: 'the witness (Listener)' },
      { part: 'Negative Particle', value: 'not (Placed BEFORE "to")' },
      { part: 'Infinitive', value: 'to leave (Base verb infinitive)' },
    ],
    ruleNote: 'Exam English mein "not to leave" standard hota hai. "To not leave" (split infinitive) avoid karein.',
    trap: 'Examiner aksar "to leave not" ya "that he does not leave" dekar confuse karta hai.',
  },
  {
    id: 'route-forbade',
    title: 'Route B: The "Forbade" Zero-Negative Pattern',
    reportingVerb: 'forbade (Past of forbid)',
    syntax: 'Subject + FORBADE + Object + to + V1 (NO "not")',
    example: 'The judge forbade the witness to leave the courtroom.',
    direct: 'The judge said to the witness, "Do not leave the courtroom."',
    breakdown: [
      { part: 'Reporting Verb', value: 'forbade (Already negative: meaning "mana kiya")' },
      { part: 'Object', value: 'the witness (Listener)' },
      { part: 'Negative Particle', value: 'NONE (Strictly zero "not")' },
      { part: 'Infinitive', value: 'to leave (Positive infinitive)' },
    ],
    ruleNote: 'Kyunki "forbade" ka matlab hi mana karna hai, iske sath dobara "not" lagane se meaning ulta ho jata hai (Double Negative blunder!).',
    trap: 'Classic High Court Trap: "*The judge forbade the witness NOT to leave..." is 100% incorrect!',
  },
  {
    id: 'route-prohibited',
    title: 'Route C: "Prohibited / Prevented from + V-ing"',
    reportingVerb: 'prohibited / prevented',
    syntax: 'Subject + prohibited + Object + from + V-ing',
    example: 'The judge prohibited the witness from leaving the courtroom.',
    direct: 'The judge said to the witness, "Do not leave the courtroom."',
    breakdown: [
      { part: 'Reporting Verb', value: 'prohibited (Negative verb)' },
      { part: 'Object', value: 'the witness' },
      { part: 'Preposition', value: 'from (Mandatory preposition)' },
      { part: 'Gerund', value: 'leaving (V-ing form)' },
    ],
    ruleNote: 'Jab verb "prohibit" ya "prevent" aati hai toh preposition "from" ke sath gerund ("leaving") lagta hai.',
    trap: 'Missing preposition: "*prohibited the witness to leave" is non-standard compared to "from leaving".',
  },
]

export default function NegativeImperativeFlow() {
  const [activeRouteId, setActiveRouteId] = useState('route-standard')

  const current = ROUTES.find((r) => r.id === activeRouteId) || ROUTES[0]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="error" size="sm">Visual Engine 4</Badge>
            <span className="text-xs font-bold text-surface-500 dark:text-surface-400">Prohibition Mechanics</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50">
            Negative Imperatives: "Not to + V1" vs "Forbade" Zero-Negative Flow
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-surface-500">
          <ShieldAlert size={14} className="text-error-600" />
          <span>Double Negative Prevention Guide</span>
        </div>
      </div>

      {/* Direct Sentence Display */}
      <div className="p-3 rounded-lg bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
        <span className="text-[0.6875rem] font-bold text-surface-500 uppercase tracking-wider block mb-1">
          Common Direct Command:
        </span>
        <span className="font-mono text-xs font-bold text-primary-700 dark:text-primary-300">
          {current.direct}
        </span>
      </div>

      {/* Route Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {ROUTES.map((r) => {
          const isSelected = r.id === activeRouteId
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setActiveRouteId(r.id)}
              className={`p-3 rounded-xl text-left text-xs font-bold transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-primary-50 dark:bg-primary-950/70 text-primary-700 dark:text-primary-300 border-primary-300 dark:border-primary-600 shadow-xs'
                  : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300 border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-750'
              }`}
            >
              <div>{r.title}</div>
            </button>
          )
        })}
      </div>

      {/* Active Route Analysis */}
      <div className="space-y-4">
        {/* Syntax Formula */}
        <div className="p-3.5 rounded-lg bg-primary-50/50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800">
          <span className="text-[0.6875rem] font-bold text-surface-500 uppercase tracking-wider block mb-1">
            Syntactic Structure:
          </span>
          <span className="font-mono text-xs font-bold text-primary-800 dark:text-primary-200">
            {current.syntax}
          </span>
        </div>

        {/* Synthesized Output */}
        <div className="p-3.5 rounded-lg bg-success-50/50 dark:bg-success-950/40 border border-success-200 dark:border-success-800">
          <span className="text-[0.6875rem] font-bold text-success-700 dark:text-success-400 uppercase tracking-wider block mb-1">
            Correct Indirect Conversion:
          </span>
          <span className="font-mono text-xs font-bold text-success-900 dark:text-success-100">
            {current.example}
          </span>
        </div>

        {/* Breakdown Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {current.breakdown.map((b, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-xs"
            >
              <div className="text-[0.6875rem] text-surface-500 font-medium">{b.part}</div>
              <div className="font-mono font-bold text-surface-800 dark:text-surface-100 mt-0.5">
                {b.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Side-by-Side Comparison for Forbade */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="p-3 rounded-lg bg-error-50 dark:bg-error-950/30 border border-error-200 dark:border-error-800 text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-error-800 dark:text-error-300 font-bold">
            <XCircle size={14} />
            <span>Fatal Double Negative Error:</span>
          </div>
          <p className="font-mono text-[0.6875rem] text-error-900 dark:text-error-200 line-through">
            *The judge forbade the witness NOT to leave the courtroom.
          </p>
          <p className="text-[0.6875rem] text-error-700 dark:text-error-400">
            Meaning distort: "Gawah ko na jaane se mana kiya" (yaani jaane ko bola!).
          </p>
        </div>

        <div className="p-3 rounded-lg bg-success-50 dark:bg-success-950/30 border border-success-200 dark:border-success-800 text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-success-800 dark:text-success-300 font-bold">
            <CheckCircle2 size={14} />
            <span>Grammatically Flawless:</span>
          </div>
          <p className="font-mono text-[0.6875rem] text-success-900 dark:text-success-100">
            The judge forbade the witness to leave the courtroom.
          </p>
          <p className="text-[0.6875rem] text-success-700 dark:text-success-400">
            "Forbade" ke baad positive infinitive "to leave" lagane se negative intention preserve rehti hai.
          </p>
        </div>
      </div>

      {/* Warning Callout */}
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
        <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Examination Takeaway:</strong> {current.trap}
        </div>
      </div>
    </Card>
  )
}
