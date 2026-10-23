import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { Card, Badge } from '../../common'

const MODAL_DATA = {
  simple: [
    {
      modal: 'can',
      meaning: 'Present Ability / Capacity',
      activeEx: 'The registrar can verify the original credentials.',
      passiveEx: 'The original credentials can be verified by the registrar.',
      formula: 'can + be + V3',
      trap: 'Narration rule mat lagayein; "can" "could" mein nahi badlega.',
    },
    {
      modal: 'must',
      meaning: 'Mandatory Legal Obligation',
      activeEx: 'Candidates must submit affidavits before 5 PM.',
      passiveEx: 'Affidavits must be submitted by candidates before 5 PM.',
      formula: 'must + be + V3',
      trap: '"should be" se replace karke meaning dilute na karein.',
    },
    {
      modal: 'may',
      meaning: 'Formal Possibility / Permission',
      activeEx: 'The division bench may admit the special appeal.',
      passiveEx: 'The special appeal may be admitted by the division bench.',
      formula: 'may + be + V3',
      trap: '"might" mein backshift karna Voice mein forbidden hai.',
    },
    {
      modal: 'should',
      meaning: 'Advice / Expected Duty',
      activeEx: 'The clerk should review the cause list.',
      passiveEx: 'The cause list should be reviewed by the clerk.',
      formula: 'should + be + V3',
      trap: 'Passive mein "be" aana mandatory hai: "should be reviewed".',
    },
    {
      modal: 'ought to',
      meaning: 'Moral Duty / Civic Obligation',
      activeEx: 'Citizens ought to obey the high court orders.',
      passiveEx: 'The high court orders ought to be obeyed by citizens.',
      formula: 'ought to + be + V3',
      trap: '"ought be" likhna error hai; "to" retain rahega ("ought to be").',
    },
    {
      modal: 'could',
      meaning: 'Past Ability / Polite Possibility',
      activeEx: 'The police could not recover the stolen case files.',
      passiveEx: 'The stolen case files could not be recovered by the police.',
      formula: 'could + be + V3',
      trap: 'Negative order: "could not be recovered", not "could be not".',
    },
  ],
  perfect: [
    {
      modal: 'should have',
      meaning: 'Unfulfilled Past Obligation',
      activeEx: 'The registry should have issued the summons yesterday.',
      passiveEx: 'The summons should have been issued by the registry yesterday.',
      formula: 'should have been + V3',
      trap: '"been" drop karne se sentence active hi reh jata hai.',
    },
    {
      modal: 'must have',
      meaning: 'Strong Past Logical Deduction',
      activeEx: 'Someone must have stolen the confidential cipher.',
      passiveEx: 'The confidential cipher must have been stolen.',
      formula: 'must have been + V3',
      trap: 'Modal ke baad "has been" kabhi nahi lagta ("must have been" strictly).',
    },
    {
      modal: 'could have',
      meaning: 'Unrealized Past Possibility',
      activeEx: 'The engineer could have prevented the server outage.',
      passiveEx: 'The server outage could have been prevented by the engineer.',
      formula: 'could have been + V3',
      trap: '"could be" lagana past temporal meaning ko destroy kar deta hai.',
    },
    {
      modal: 'might have',
      meaning: 'Weak Past Possibility / Speculation',
      activeEx: 'The messenger might have misdelivered the court notice.',
      passiveEx: 'The court notice might have been misdelivered by the messenger.',
      formula: 'might have been + V3',
      trap: 'Always preserve modal identity: "might have been misdelivered".',
    },
  ],
}

export default function ModalPassiveMatrix() {
  const [aspectMode, setAspectMode] = useState('simple') // 'simple' | 'perfect'
  const [activeModalIndex, setActiveModalIndex] = useState(0)

  const currentList = MODAL_DATA[aspectMode]
  const currentItem = currentList[activeModalIndex] || currentList[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-surface-200 dark:border-surface-700 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Model 2</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">
              Modal Auxiliaries Architecture
            </span>
          </div>
          <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
            Simple Modals vs Modal-Perfect Voice Matrix
          </h3>
        </div>

        {/* Aspect Toggle Pill */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 w-fit">
          <button
            type="button"
            onClick={() => {
              setAspectMode('simple')
              setActiveModalIndex(0)
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              aspectMode === 'simple'
                ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs border border-surface-200 dark:border-surface-700'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900'
            }`}
          >
            Simple Modals (be + V3)
          </button>
          <button
            type="button"
            onClick={() => {
              setAspectMode('perfect')
              setActiveModalIndex(0)
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              aspectMode === 'perfect'
                ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs border border-surface-200 dark:border-surface-700'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900'
            }`}
          >
            Modal Perfects (have been + V3)
          </button>
        </div>
      </div>

      <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed max-w-[85ch]">
        Modal helping verbs active voice mein auxiliary ka role play karte hain. Simple modals present/future context mein <code className="font-mono font-bold text-primary-700 dark:text-primary-300">modal + be + V3</code> lete hain, jabki past actions ke liye <code className="font-mono font-bold text-amber-700 dark:text-amber-300">modal + have been + V3</code> bante hain. Niche kisi modal par click karke comparison dekhein:
      </p>

      {/* Modal Quick Pills */}
      <div className="flex flex-wrap gap-2">
        {currentList.map((item, idx) => {
          const isSelected = idx === activeModalIndex
          return (
            <button
              key={item.modal}
              type="button"
              onClick={() => setActiveModalIndex(idx)}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold font-mono transition-all cursor-pointer ${
                isSelected
                  ? 'bg-primary-600 text-white border-primary-700 shadow-xs'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 border-surface-200 dark:border-surface-700 hover:bg-surface-200/60'
              }`}
            >
              {item.modal}
            </button>
          )
        })}
      </div>

      {/* Comparative Active vs Passive Inspection Card */}
      <div className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-200 dark:border-surface-700 pb-3">
          <div>
            <span className="text-xs font-bold text-surface-900 dark:text-surface-100">
              Selected Modal: <span className="font-mono uppercase text-primary-600 dark:text-primary-400">{currentItem.modal}</span>
            </span>
            <span className="text-xs text-surface-500 dark:text-surface-400 ml-2">
              ({currentItem.meaning})
            </span>
          </div>
          <Badge variant={aspectMode === 'simple' ? 'primary' : 'warning'} size="sm">
            Formula: {currentItem.formula}
          </Badge>
        </div>

        {/* Side-by-Side Active vs Passive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-2 shadow-xs">
            <span className="text-[10px] font-mono uppercase font-bold text-surface-500">
              Active Voice Input
            </span>
            <p className="font-semibold text-surface-900 dark:text-surface-100 leading-snug">
              "{currentItem.activeEx}"
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-surface-900 border border-success-300 dark:border-success-800 space-y-2 shadow-xs">
            <span className="text-[10px] font-mono uppercase font-bold text-success-600 dark:text-success-400">
              Passive Voice Output
            </span>
            <p className="font-bold text-success-950 dark:text-success-100 leading-snug">
              "{currentItem.passiveEx}"
            </p>
          </div>
        </div>

        {/* Invariant Trap Note */}
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-xs flex items-start gap-2 text-amber-900 dark:text-amber-200">
          <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Exam Critical Trap:</strong> {currentItem.trap}
          </span>
        </div>
      </div>
    </Card>
  )
}
