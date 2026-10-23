import { useState } from 'react'
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react'
import { Card, Badge } from '../../common'

const AGENT_SCENARIOS = [
  {
    id: 'unknown',
    label: 'Someone / Somebody',
    category: 'Unknown Indefinite Agent',
    recommendation: 'OMIT (Naturally Drop Agent)',
    activeSentence: 'Someone has stolen the original court stamp.',
    bestPassive: 'The original court stamp has been stolen.',
    inferiorPassive: 'The original court stamp has been stolen by someone.',
    reason: "Jab doer unknown ya indefinite pronoun ho, toh 'by someone' likhna redundant wordiness hai aur exam keys mein inferior mana jata hai."
  },
  {
    id: 'obvious',
    label: 'The Police / The Doctor',
    category: 'Contextually Obvious Professional Authority',
    recommendation: 'OMIT (Doer Inherent in the Action)',
    activeSentence: 'The police arrested the prime suspect yesterday.',
    bestPassive: 'The prime suspect was arrested yesterday.',
    inferiorPassive: 'The prime suspect was arrested by the police yesterday.',
    reason: "Arrest karne ka action solely police dwara hi hota hai. Professional doer obvious hone par 'by the police' naturally omit kiya jata hai."
  },
  {
    id: 'generic',
    label: 'People / They',
    category: 'Generic Human Population',
    recommendation: 'OMIT (Generic Agent)',
    activeSentence: 'People speak English all over the world.',
    bestPassive: 'English is spoken all over the world.',
    inferiorPassive: 'English is spoken by people all over the world.',
    reason: "Generic population 'people' ya vague 'they' ko passive mein 'by people' likhna childish aur clumsy English style hai."
  },
  {
    id: 'essential',
    label: 'Specific Author / Institution',
    category: 'Essential Specific Identity',
    recommendation: 'RETAIN with "by + Agent"',
    activeSentence: 'William Shakespeare wrote Hamlet.',
    bestPassive: 'Hamlet was written by William Shakespeare.',
    inferiorPassive: 'Hamlet was written. (Information incomplete!)',
    reason: "Yahan doer ki specific identity hi sentence ka primary factual value hai. Agar 'by Shakespeare' hata diya toh critical information destroy ho jayegi."
  }
]

export default function AgentRetentionDecisionGuide() {
  const [activeScenario, setActiveScenario] = useState(AGENT_SCENARIOS[0])

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-200 dark:border-surface-700 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Visual Architecture • Model 4</Badge>
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-300">
              Agent Pragmatics & Omission Engine
            </span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-white mt-1">
            Agent Retention vs. Omission Decision Architecture
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            Janiye kab 'by + agent' lagana mandatory hai aur kab use naturally omit karna superior English hai.
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-surface-100 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
          {AGENT_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setActiveScenario(sc)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                activeScenario.id === sc.id
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Decision Branch Visualization */}
      <div className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700 space-y-4">
        <div className="flex items-center justify-between">
          <Badge
            variant={activeScenario.recommendation.startsWith('OMIT') ? 'warning' : 'success'}
            size="sm"
            className="font-mono"
          >
            Recommendation: {activeScenario.recommendation}
          </Badge>
          <span className="text-xs font-semibold text-surface-500 dark:text-surface-400">
            {activeScenario.category}
          </span>
        </div>

        {/* Comparison Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Active Sentence */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1">
            <span className="text-2xs font-bold uppercase text-surface-500 dark:text-surface-400 block">
              Active Source Sentence
            </span>
            <p className="text-sm font-semibold text-surface-900 dark:text-white font-mono">
              "{activeScenario.activeSentence}"
            </p>
          </div>

          {/* Recommended Standard Passive */}
          <div className="p-3.5 rounded-xl bg-success-50 dark:bg-success-950/40 border border-success-300 dark:border-success-800 space-y-1">
            <div className="flex items-center gap-1.5 text-success-800 dark:text-success-300 font-bold text-2xs uppercase">
              <CheckCircle2 size={14} />
              <span>Standard Formal Passive (Recommended)</span>
            </div>
            <p className="text-sm font-bold text-success-950 dark:text-success-100 font-mono">
              "{activeScenario.bestPassive}"
            </p>
          </div>
        </div>

        {/* Inferior / Suboptimal Option */}
        <div className="p-3 rounded-xl bg-surface-100 dark:bg-surface-900/40 border border-surface-200 dark:border-surface-700/60 text-xs flex items-start gap-2.5">
          <XCircle size={15} className="text-surface-400 dark:text-surface-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-surface-700 dark:text-surface-300">Suboptimal / Clumsy Construction: </strong>
            <span className="text-surface-600 dark:text-surface-400 line-through">"{activeScenario.inferiorPassive}"</span>
          </div>
        </div>

        {/* Roman Hinglish Explanation Callout */}
        <div className="p-3.5 rounded-xl bg-primary-50/60 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800/60 text-xs text-primary-950 dark:text-primary-100 flex items-start gap-2.5">
          <Sparkles size={16} className="text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
          <div>
            <strong>Grammatical Rationale: </strong>
            {activeScenario.reason}
          </div>
        </div>
      </div>
    </Card>
  )
}
