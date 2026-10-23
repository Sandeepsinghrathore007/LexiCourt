import { useState } from 'react'
import { CheckCircle2, XCircle, ShieldCheck, Users } from 'lucide-react'
import { Card, Badge } from '../../common'

const VISUALIZER_MODES = [
  {
    id: 'mode-any-other',
    title: '1. The "Any Other" Self-Exclusion Law',
    subtitle: 'Why "other" is mandatory to prevent illogical self-comparison',
    subject: 'Iron',
    group: 'Metals [Iron, Gold, Silver, Copper, Lead, Zinc]',
    invalidConstruction: 'Iron is more useful than any metal.',
    invalidResult: 'ILLOGICAL ERROR: Iron khud "any metal" ke set mein shamil ho jata hai, jiska literal meaning nikalta hai ki "Iron is more useful than Iron itself"!',
    validConstruction: 'Iron is more useful than any OTHER metal.',
    validResult: 'LOGICALLY SOUND: Word "OTHER" lagane se Iron metals ke set se exclude ho jata hai. Ab Iron ka comparison baaki sabhi metals (Gold, Silver, etc.) se hota hai.',
    keyRule: 'Always use "any other + singular noun" when comparing an entity within its own group.',
  },
  {
    id: 'mode-one-of-the',
    title: '2. The "One of the" Subset Bracket',
    subtitle: 'Why "One of the" represents an elite tier rather than a unique apex',
    subject: 'Ashoka',
    group: 'Great Kings of India [Akbar, Ashoka, Chandragupta, Harsha]',
    invalidConstruction: 'Ashoka was the greatest king of India. / No other king was as great as Ashoka.',
    invalidResult: 'SCOPE DISTORTION: Ye Ashoka ko akela number-1 king bana deta hai, jo original "One of the" meaning ko alter kar deta hai.',
    validConstruction: 'Ashoka was ONE OF THE greatest kings of India. ➔ Ashoka was greater than MOST OTHER kings... ➔ VERY FEW kings were as great as Ashoka.',
    validResult: 'PROPOSITION PRESERVED: Ashoka akela supreme nahi tha, balki top elite kings ke group mein shamil tha. Plural noun ("kings") aur plural verb ("were") mandatory hain.',
    keyRule: '"One of the" demands "than most other + plural noun" (comparative) and "Very few + plural noun" (positive). Never use "No other".',
  },
  {
    id: 'mode-binary',
    title: '3. The Binary Entity Boundary (N = 2)',
    subtitle: 'Why Superlative Degree is strictly prohibited when comparing two entities',
    subject: 'Rohan & Sohan (Total: 2 brothers)',
    group: 'Pair of Two Entities [Rohan, Sohan]',
    invalidConstruction: 'Of the two brothers, Rohan is the best / the wisest.',
    invalidResult: 'MATHEMATICAL GRAMMAR VIOLATION: Superlative degree minimum teen (N >= 3) entities demand karti hai. Do entities ke beech superlative lagana strict error hai.',
    validConstruction: 'Of the two brothers, Rohan is THE BETTER / THE WISER.',
    validResult: 'ACCURATE SYNTAX: Jab do entities mein se selection ho ("of the two"), toh Comparative degree use hoti hai aur usse pehle definite article "THE" lagta hai.',
    keyRule: 'When comparing exactly two entities, Superlative is IMPOSSIBLE. Use "THE + Comparative" for selection.',
  },
]

export default function ComparisonGroupVisualizer() {
  const [activeModeId, setActiveModeId] = useState('mode-any-other')
  const activeMode = VISUALIZER_MODES.find((m) => m.id === activeModeId) || VISUALIZER_MODES[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 flex items-center justify-center font-bold">
            <Users size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Interactive Comparison Scope & Group Membership Visualizer
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-400">
              "Any other" self-exclusion logic, "One of the" subset ranking, aur Two-entity boundary rules
            </p>
          </div>
        </div>
        <Badge variant="primary" size="sm">Spatial Model 3</Badge>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
        {VISUALIZER_MODES.map((mode) => (
          <button
            key={mode.id}
            type="button"
            onClick={() => setActiveModeId(mode.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeModeId === mode.id
                ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs border border-surface-200 dark:border-surface-700'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
            }`}
          >
            {mode.title.split('.')[1]}
          </button>
        ))}
      </div>

      {/* Visual Workspace */}
      <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 space-y-5">
        <div className="space-y-1">
          <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-100">
            {activeMode.title}: {activeMode.subtitle}
          </h4>
          <p className="text-xs text-surface-600 dark:text-surface-400 font-mono">
            Active Focus: <strong>{activeMode.subject}</strong> | Group Set: <strong>{activeMode.group}</strong>
          </p>
        </div>

        {/* Side-by-Side Logic Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Invalid Logic Card */}
          <div className="p-4 rounded-xl bg-danger-50/50 dark:bg-danger-950/20 border border-danger-200 dark:border-danger-900/50 space-y-3">
            <div className="flex items-center gap-2 text-danger-700 dark:text-danger-400 font-bold text-xs">
              <XCircle size={16} />
              <span>Flawed Formulation (Exam Trap)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-danger-100 dark:border-danger-900/30 text-xs font-mono text-danger-900 dark:text-danger-200 font-semibold">
              {activeMode.invalidConstruction}
            </div>
            <p className="text-xs text-danger-800 dark:text-danger-300 leading-relaxed">
              {activeMode.invalidResult}
            </p>
          </div>

          {/* Valid Logic Card */}
          <div className="p-4 rounded-xl bg-success-50/50 dark:bg-success-950/20 border border-success-200 dark:border-success-900/50 space-y-3">
            <div className="flex items-center gap-2 text-success-700 dark:text-success-400 font-bold text-xs">
              <CheckCircle2 size={16} />
              <span>Flawless Formulation (Syntactically Sound)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-success-100 dark:border-success-900/30 text-xs font-mono text-success-900 dark:text-success-200 font-semibold">
              {activeMode.validConstruction}
            </div>
            <p className="text-xs text-success-800 dark:text-success-300 leading-relaxed">
              {activeMode.validResult}
            </p>
          </div>
        </div>

        {/* Takeaway Rule Banner */}
        <div className="p-3 rounded-lg bg-primary-50/60 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 text-xs flex items-start gap-2.5">
          <ShieldCheck size={18} className="text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-primary-900 dark:text-primary-200 block mb-0.5">
              Examination Takeaway Law:
            </strong>
            <span className="text-primary-800 dark:text-primary-300 leading-relaxed">
              {activeMode.keyRule}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
