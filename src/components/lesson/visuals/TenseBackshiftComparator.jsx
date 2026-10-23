import { useState } from 'react'
import { ArrowRight, AlertTriangle } from 'lucide-react'
import { Card, Badge } from '../../common'

const COMPARATOR_DATA = {
  standard: [
    {
      directTense: 'Simple Present (V1 / V1+s/es)',
      directExample: 'He said, "I file the petition."',
      indirectTense: 'Simple Past (V2)',
      indirectExample: 'He said that he filed the petition.',
      formula: 'V1 ➔ V2',
      trap: 'Failure to backshift V1 into V2 is common when sentences are long.',
    },
    {
      directTense: 'Present Continuous (is/am/are + V4)',
      directExample: 'She said, "The clerk is typing."',
      indirectTense: 'Past Continuous (was/were + V4)',
      indirectExample: 'She said that the clerk was typing.',
      formula: 'is/am/are + V4 ➔ was/were + V4',
      trap: 'Watch subject-verb concord: singular subject gets was, plural gets were.',
    },
    {
      directTense: 'Present Perfect (has/have + V3)',
      directExample: 'They said, "We have verified it."',
      indirectTense: 'Past Perfect (had + V3)',
      indirectExample: 'They said that they had verified it.',
      formula: 'has/have + V3 ➔ had + V3',
      trap: 'Do not confuse had + V3 with had been + V3.',
    },
    {
      directTense: 'Simple Past (V2)',
      directExample: 'He said, "I lost the seal."',
      indirectTense: 'Past Perfect (had + V3)',
      indirectExample: 'He said that he had lost the seal.',
      formula: 'V2 ➔ had + V3',
      trap: 'Top Exam Trap: Candidates leave V2 as V2. Simple Past must shift to Past Perfect.',
    },
    {
      directTense: 'Past Continuous (was/were + V4)',
      directExample: 'She said, "They were checking files."',
      indirectTense: 'Past Perfect Continuous (had been + V4)',
      indirectExample: 'She said that they had been checking files.',
      formula: 'was/were + V4 ➔ had been + V4',
      trap: 'Dropping continuous aspect to simple past perfect is incorrect.',
    },
    {
      directTense: 'Past Perfect (had + V3)',
      directExample: 'He said, "I had filed it already."',
      indirectTense: 'Past Perfect (had + V3) [NO CHANGE]',
      indirectExample: 'He said that he had filed it already.',
      formula: 'had + V3 ➔ had + V3 (Freeze)',
      trap: 'No further past exists; do not attempt to change Past Perfect.',
    },
    {
      directTense: 'Modal Will / Shall',
      directExample: 'He said, "The judge will decide."',
      indirectTense: 'Modal Would',
      indirectExample: 'He said that the judge would decide.',
      formula: 'will / shall ➔ would',
      trap: 'Do not change will to should unless offering advice or suggestion.',
    },
    {
      directTense: 'Modal Can / May',
      directExample: 'She said, "I can access the server."',
      indirectTense: 'Modal Could / Might',
      indirectExample: 'She said that she could access the server.',
      formula: 'can ➔ could | may ➔ might',
      trap: 'Modals backshift directly: can ➔ could, may ➔ might.',
    },
  ],
  exceptions: [
    {
      directTense: 'Universal Truth (Simple Present)',
      directExample: 'The teacher said, "The Earth is round."',
      indirectTense: 'Simple Present [ZERO BACKSHIFT]',
      indirectExample: 'The teacher said that the Earth is round.',
      formula: 'Eternal Fact ➔ Simple Present Retained',
      trap: '"Earth was round" implies it is no longer round. Always retain Simple Present.',
    },
    {
      directTense: 'Scientific Law (Simple Present)',
      directExample: 'The professor said, "Water boils at 100°C."',
      indirectTense: 'Simple Present [ZERO BACKSHIFT]',
      indirectExample: 'The professor said that water boils at 100°C.',
      formula: 'Scientific Law ➔ Simple Present Retained',
      trap: 'Scientific constants never shift into the past.',
    },
    {
      directTense: 'Proverb / Moral Maxim',
      directExample: 'He said, "Honesty is the best policy."',
      indirectTense: 'Simple Present [ZERO BACKSHIFT]',
      indirectExample: 'He said that honesty is the best policy.',
      formula: 'Proverb ➔ Simple Present Retained',
      trap: 'Changing proverb tense distorts timeless wisdom.',
    },
  ],
  presentReporting: [
    {
      directTense: 'Present Reporting Verb: says',
      directExample: 'The clerk says, "I am ready."',
      indirectTense: 'Original Tense Retained (am ➔ is)',
      indirectExample: 'The clerk says that he is ready.',
      formula: 'Says ➔ Zero Tense Backshift',
      trap: 'Candidates mechanically write "was ready". If reporting verb is "says", tense does NOT backshift!',
    },
    {
      directTense: 'Future Reporting Verb: will say',
      directExample: 'The lawyer will say, "I have completed the brief."',
      indirectTense: 'Original Tense Retained (have ➔ has)',
      indirectExample: 'The lawyer will say that he has completed the brief.',
      formula: 'Will say ➔ Zero Tense Backshift',
      trap: 'Future reporting verb freezes the tense; only pronouns shift.',
    },
  ],
}

export default function TenseBackshiftComparator() {
  const [activeMode, setActiveMode] = useState('standard') // 'standard' | 'exceptions' | 'presentReporting'
  const [selectedRowIndex, setSelectedRowIndex] = useState(0)

  const rows = COMPARATOR_DATA[activeMode]
  const activeRow = rows[selectedRowIndex] || rows[0]

  const handleModeChange = (mode) => {
    setActiveMode(mode)
    setSelectedRowIndex(0)
  }

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-200 dark:border-surface-700 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Visual Architecture • Model 4</Badge>
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-300">
              Cross-Clause Tense Comparator
            </span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-white mt-1">
            Tense Backshift & Exception Comparator
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            Compare karein ki past reporting verb kab tense ko peeche kheenchti hai aur kab exceptions tense ko freeze kar dete hain.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
          {[
            { id: 'standard', label: 'Past Verb (Standard Backshift)' },
            { id: 'exceptions', label: 'Universal Truth Exceptions' },
            { id: 'presentReporting', label: 'Present/Future Reporting Verb' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleModeChange(mode.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeMode === mode.id
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs border border-surface-200 dark:border-surface-700'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Tense Mapping Selector List */}
        <div className="lg:col-span-5 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-surface-600 dark:text-surface-300 block">
            Select Tense Pair to Inspect:
          </span>
          <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
            {rows.map((row, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedRowIndex(idx)}
                className={`w-full p-2.5 rounded-xl text-left transition-all border cursor-pointer flex items-center justify-between gap-2 ${
                  idx === selectedRowIndex
                    ? 'bg-primary-50 dark:bg-primary-950/70 border-primary-300 dark:border-primary-600 text-primary-900 dark:text-primary-100 shadow-xs'
                    : 'bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800'
                }`}
              >
                <div className="min-w-0">
                  <span className="font-bold text-xs block truncate">{row.directTense}</span>
                  <span className="text-[0.625rem] text-surface-500 dark:text-surface-400 font-mono">
                    ➔ {row.indirectTense}
                  </span>
                </div>
                <ArrowRight size={14} className="shrink-0 text-primary-600 dark:text-primary-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Comparative Viewport */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-surface-50 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 space-y-4">
          <div className="flex items-center justify-between border-b border-surface-200 dark:border-surface-700 pb-3">
            <span className="font-mono text-xs font-bold text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-950 px-2 py-0.5 rounded">
              {activeRow.formula}
            </span>
            <Badge variant={activeMode === 'standard' ? 'primary' : 'success'} size="sm">
              {activeMode === 'standard' ? 'Past Backshift' : 'Invariance Retained'}
            </Badge>
          </div>

          {/* Direct Speech Example Box */}
          <div className="space-y-1">
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
              Direct Speech (Original):
            </span>
            <div className="p-3 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 font-mono text-xs font-semibold text-surface-900 dark:text-surface-100">
              {activeRow.directExample}
            </div>
          </div>

          {/* Indirect Speech Example Box */}
          <div className="space-y-1">
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-success-700 dark:text-success-400">
              Indirect Speech (Transformed):
            </span>
            <div className="p-3 rounded-xl bg-success-50 dark:bg-success-950/40 border border-success-200 dark:border-success-800 font-mono text-xs font-bold text-success-950 dark:text-success-100">
              {activeRow.indirectExample}
            </div>
          </div>

          {/* Trap & Rule Warning Alert */}
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2">
            <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="font-bold text-[0.6875rem] uppercase block">
                Competitive Exam Pitfall to Avoid:
              </strong>
              <p className="leading-relaxed">{activeRow.trap}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
