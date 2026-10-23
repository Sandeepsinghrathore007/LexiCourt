import { useState } from 'react'
import { Hourglass, AlertTriangle } from 'lucide-react'
import { Card, Badge } from '../../common'

const COMPARATOR_MODES = [
  {
    id: 'since-for',
    title: 'Since vs For (Origin Point vs Measured Duration)',
    type: 'Anchor vs Quantity',
    rule1: {
      marker: 'SINCE',
      nature: 'Point in Time (Origin Anchor)',
      question: 'Answers: "From when did it start?"',
      examples: ['since 2021', 'since Monday', 'since morning', 'since he retired'],
      tenseLaw: 'Strictly requires Perfect / Perfect Continuous tense (has been living since 2021).',
      formula: 'SINCE + Exact Named Starting Point'
    },
    rule2: {
      marker: 'FOR',
      nature: 'Period of Time (Total Duration)',
      question: 'Answers: "How long did it last?"',
      examples: ['for 5 years', 'for 3 days', 'for two hours', 'for a long time'],
      tenseLaw: 'Used with Perfect Continuous for continuing actions, AND with Simple Past for completed past periods!',
      formula: 'FOR + Number + Time Unit'
    },
    examTip: 'Past Duration Nuance: "He lived in Jaipur for 5 years" (Simple Past) is 100% correct if he no longer lives there. Do not blindly force perfect tense on "for"!'
  },
  {
    id: 'by-until',
    title: 'By vs Until (Latest Deadline vs Ongoing Continuity)',
    type: 'Deadline vs Duration',
    rule1: {
      marker: 'BY',
      nature: 'Deadline / Not Later Than',
      question: 'Answers: "What is the latest cut-off time?"',
      examples: ['submit by Friday', 'arrive by 5 PM', 'finish by tomorrow'],
      tenseLaw: 'Demands Point-Action / Completion verbs (submit, finish, complete, arrive).',
      formula: 'BY + Cut-off Threshold'
    },
    rule2: {
      marker: 'UNTIL',
      nature: 'Terminal Point of Ongoing Duration',
      question: 'Answers: "How long does the state continue?"',
      examples: ['stayed until 8 PM', 'wait until Monday', 'worked until dusk'],
      tenseLaw: 'Demands Continuous Durative verbs (stay, wait, remain, work, continue).',
      formula: 'UNTIL + Terminal End Event'
    },
    examTip: 'Verb Nature Check: Point verbs (submit, finish) strictly take "BY". Continuous durative verbs (stay, wait) strictly take "UNTIL". Never interchange them!'
  }
]

export default function TimeBoundariesComparator() {
  const [activeModeId, setActiveModeId] = useState('since-for')
  const activeMode = COMPARATOR_MODES.find((m) => m.id === activeModeId) || COMPARATOR_MODES[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold">
            <Hourglass size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Temporal Boundaries & Duration Comparator
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-400">
              Since vs For aur By vs Until ke aspectual differences aur tense concord rules ka visual matrix
            </p>
          </div>
        </div>
        <Badge variant="primary" size="sm">Temporal Concord</Badge>
      </div>

      {/* Mode Switcher */}
      <div className="flex gap-2">
        {COMPARATOR_MODES.map((mode) => (
          <button
            key={mode.id}
            type="button"
            onClick={() => setActiveModeId(mode.id)}
            className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
              activeModeId === mode.id
                ? 'bg-primary-600 text-white shadow-xs'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200'
            }`}
          >
            {mode.title.split('(')[0]}
          </button>
        ))}
      </div>

      {/* Active Mode Dual Cards */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Rule 1 */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/60 to-white dark:from-indigo-950/30 dark:to-surface-900 border border-indigo-200 dark:border-indigo-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-mono font-bold text-sm">
                {activeMode.rule1.marker}
              </span>
              <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                {activeMode.rule1.nature}
              </span>
            </div>

            <p className="text-xs font-bold text-surface-800 dark:text-surface-100">
              {activeMode.rule1.question}
            </p>

            <div className="p-2 rounded-lg bg-white dark:bg-surface-850 border border-indigo-100 dark:border-indigo-900 text-xs font-mono text-indigo-950 dark:text-indigo-200">
              Formula: {activeMode.rule1.formula}
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-[0.6875rem] font-bold text-surface-500 uppercase tracking-wider">
                Standard Examples:
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-surface-700 dark:text-surface-300 font-mono text-[0.75rem]">
                {activeMode.rule1.examples.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </div>

            <p className="text-[0.75rem] text-surface-600 dark:text-surface-400 italic pt-1 border-t border-indigo-100 dark:border-indigo-900/60">
              {activeMode.rule1.tenseLaw}
            </p>
          </div>

          {/* Rule 2 */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-teal-50/60 to-white dark:from-teal-950/30 dark:to-surface-900 border border-teal-200 dark:border-teal-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-lg bg-teal-600 text-white font-mono font-bold text-sm">
                {activeMode.rule2.marker}
              </span>
              <span className="text-xs font-semibold text-teal-700 dark:text-teal-300">
                {activeMode.rule2.nature}
              </span>
            </div>

            <p className="text-xs font-bold text-surface-800 dark:text-surface-100">
              {activeMode.rule2.question}
            </p>

            <div className="p-2 rounded-lg bg-white dark:bg-surface-850 border border-teal-100 dark:border-teal-900 text-xs font-mono text-teal-950 dark:text-teal-200">
              Formula: {activeMode.rule2.formula}
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-[0.6875rem] font-bold text-surface-500 uppercase tracking-wider">
                Standard Examples:
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-surface-700 dark:text-surface-300 font-mono text-[0.75rem]">
                {activeMode.rule2.examples.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </div>

            <p className="text-[0.75rem] text-surface-600 dark:text-surface-400 italic pt-1 border-t border-teal-100 dark:border-teal-900/60">
              {activeMode.rule2.tenseLaw}
            </p>
          </div>
        </div>

        {/* Exam Tip Callout */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs flex items-start gap-2.5 text-amber-900 dark:text-amber-200">
          <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>High Court Exam Strategy: </strong>{activeMode.examTip}
          </p>
        </div>
      </div>
    </Card>
  )
}
