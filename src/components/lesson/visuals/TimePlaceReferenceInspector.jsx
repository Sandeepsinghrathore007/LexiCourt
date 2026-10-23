import { useState } from 'react'
import { Info } from 'lucide-react'
import { Card, Badge } from '../../common'

const ADVERBIALS = [
  { direct: 'today', indirect: 'that day', category: 'time', note: 'Standard shift when reported on a subsequent day' },
  { direct: 'yesterday', indirect: 'the previous day / the day before', category: 'time', note: 'Shifts anteriorly into relative past' },
  { direct: 'tomorrow', indirect: 'the next day / the following day', category: 'time', note: 'Shifts relatively into posterior future' },
  { direct: 'tonight', indirect: 'that night', category: 'time', note: 'Specific night of the past statement' },
  { direct: 'last night', indirect: 'the previous night / the night before', category: 'time', note: 'Past relative anteriority' },
  { direct: 'now', indirect: 'then', category: 'time', note: 'Shifts from present immediacy to narrative past' },
  { direct: 'ago', indirect: 'before / previously', category: 'time', note: 'Two years ago ➔ two years before' },
  { direct: 'here', indirect: 'there', category: 'place', note: 'Shifts from speaker location to distant location' },
  { direct: 'this', indirect: 'that', category: 'place', note: 'Shifts from proximal demonstrative to distal' },
  { direct: 'these', indirect: 'those', category: 'place', note: 'Plural demonstrative distance shift' },
  { direct: 'hither', indirect: 'thither', category: 'place', note: 'Archaic / legal formal English' },
  { direct: 'thus', indirect: 'so', category: 'place', note: 'Manner adverbial shift' },
]

export default function TimePlaceReferenceInspector() {
  const [filter, setFilter] = useState('all') // 'all' | 'time' | 'place'
  const [activeScenario, setActiveScenario] = useState('laterDay') // 'laterDay' | 'sameDay' | 'samePlace'

  const filteredAdverbials = ADVERBIALS.filter((a) => {
    if (filter === 'all') return true
    return a.category === filter
  })

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-200 dark:border-surface-700 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Visual Architecture • Model 5</Badge>
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-300">
              Deictic Adverbial Shift Inspector
            </span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-white mt-1">
            Time & Place Deictic Shifts Inspector
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            Adverbs of time and place speaker ke perspective se narrator ke perspective mein kaise shift hote hain.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
          {[
            { id: 'all', label: 'All Expressions' },
            { id: 'time', label: 'Time Adverbs' },
            { id: 'place', label: 'Place & Demonstratives' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs border border-surface-200 dark:border-surface-700'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contextual Scenario Switcher Banner */}
      <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-surface-700 dark:text-surface-200">
            Interactive Contextual Scenarios:
          </span>
          <Badge variant="neutral" size="sm">Context-Dependent Logic</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            {
              id: 'laterDay',
              title: 'Scenario 1: Later Day / Other Place',
              badge: 'Standard Exam Assumption',
              desc: 'Speech is reported on a different date and different location. All conventional shifts apply.',
            },
            {
              id: 'sameDay',
              title: 'Scenario 2: Reported on the Same Day',
              badge: 'Real-Life Context',
              desc: 'Agar subah ki baat sham ko usi din report ho rahi hai, toh "today" shifts to "today", not "that day".',
            },
            {
              id: 'samePlace',
              title: 'Scenario 3: Reported in the Same Place',
              badge: 'Spatial Continuity',
              desc: 'Agar reporter aur listener usi court room mein khade hain, toh "here" shifts to "here", not "there".',
            },
          ].map((sc) => (
            <button
              key={sc.id}
              onClick={() => setActiveScenario(sc.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                activeScenario === sc.id
                  ? 'bg-primary-50 dark:bg-primary-950/70 border-primary-300 dark:border-primary-600 shadow-xs'
                  : 'bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-800'
              }`}
            >
              <span className="font-bold text-xs text-surface-900 dark:text-white block">
                {sc.title}
              </span>
              <p className="text-[0.625rem] text-surface-600 dark:text-surface-400 leading-snug">
                {sc.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Adverbials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filteredAdverbials.map((adv, idx) => {
          let displayedIndirect = adv.indirect
          let contextualNote = adv.note

          if (activeScenario === 'sameDay' && adv.direct === 'today') {
            displayedIndirect = 'today (Retained!)'
            contextualNote = 'Same-day reporting preserves "today".'
          } else if (activeScenario === 'samePlace' && adv.direct === 'here') {
            displayedIndirect = 'here (Retained!)'
            contextualNote = 'Same-location reporting preserves "here".'
          }

          return (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1.5 shadow-xs"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-surface-900 dark:text-surface-100 bg-surface-100 dark:bg-surface-800 px-2 py-0.5 rounded">
                  {adv.direct}
                </span>
                <span className="text-surface-400 font-bold">➔</span>
                <span className="font-mono font-extrabold text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-950/60 px-2 py-0.5 rounded border border-primary-200 dark:border-primary-800">
                  {displayedIndirect}
                </span>
              </div>
              <p className="text-[0.625rem] text-surface-500 dark:text-surface-400 leading-relaxed italic">
                {contextualNote}
              </p>
            </div>
          )
        })}
      </div>

      <div className="flex items-start gap-2 text-xs text-surface-600 dark:text-surface-400 bg-surface-50 dark:bg-surface-800/60 p-3 rounded-xl border border-surface-200 dark:border-surface-700">
        <Info size={16} className="text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Exam Recommendation: </strong>Rajasthan High Court written exams ke standard multiple-choice questions mein jab tak specific context (jaise "he said this morning") explicitly mention na ho, tab tak conventional standard table shifts (today ➔ that day, yesterday ➔ the previous day, tomorrow ➔ the next day) hi expect ki jaati hain.
        </p>
      </div>
    </Card>
  )
}
