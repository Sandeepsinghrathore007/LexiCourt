import { useState } from 'react'
import { XCircle, CheckCircle2, AlertTriangle, Layers } from 'lucide-react'
import { Card, Badge } from '../../common'

const WH_EXAMPLES = [
  {
    word: 'Where',
    type: 'Location / Adverbial',
    direct: 'The judge said to the witness, "Where do you work?"',
    whWord: 'where',
    auxDirect: 'do (Auxiliary)',
    subjDirect: 'you (Subject)',
    verbDirect: 'work (Main Verb)',
    indirectSubj: 'he (Subject)',
    indirectVerb: 'worked (V2 Past)',
    fullIndirect: 'The judge asked the witness where he worked.',
    note: 'Auxiliary "do" drop ho gayi aur verb "work" Simple Past "worked" ban gayi. Subject "he" Wh-word ke turant baad aaya.',
  },
  {
    word: 'Why',
    type: 'Reason / Cause',
    direct: 'The registrar said, "Why are you submitting this late?"',
    whWord: 'why',
    auxDirect: 'are (Auxiliary)',
    subjDirect: 'you (Subject)',
    verbDirect: 'submitting (V-ing)',
    indirectSubj: 'I (Subject)',
    indirectVerb: 'was submitting (Past Continuous)',
    fullIndirect: 'The registrar asked why I was submitting that late.',
    note: 'Continuous auxiliary "are" backshift hokar "was" ban gayi aur subject "I" ke BAAD shift ho gayi: "why I was submitting".',
  },
  {
    word: 'When',
    type: 'Temporal Marker',
    direct: 'The clerk said to Mohan, "When did you dispatch the files?"',
    whWord: 'when',
    auxDirect: 'did (Past Aux)',
    subjDirect: 'you (Subject)',
    verbDirect: 'dispatch (Main Verb)',
    indirectSubj: 'he (Subject)',
    indirectVerb: 'had dispatched (Past Perfect)',
    fullIndirect: 'The clerk asked Mohan when he had dispatched the files.',
    note: 'Simple Past question ("did dispatch") Past Perfect ("had dispatched") mein backshift hua. "When he had dispatched".',
  },
  {
    word: 'What',
    type: 'Object / Action',
    direct: 'She said to me, "What can I do for you?"',
    whWord: 'what',
    auxDirect: 'can (Modal Aux)',
    subjDirect: 'I (Subject)',
    verbDirect: 'do (Main Verb)',
    indirectSubj: 'she (Subject)',
    indirectVerb: 'could do for me (Modal Past)',
    fullIndirect: 'She asked me what she could do for me.',
    note: 'Modal "can" backshift hokar "could" bana aur subject "she" ke BAAD aaya: "what she could do for me".',
  },
  {
    word: 'Who',
    type: 'Subject Question',
    direct: 'The inspector said, "Who broke the court seal?"',
    whWord: 'who (Subject)',
    auxDirect: '— (No Aux)',
    subjDirect: 'who (functions as Subject)',
    verbDirect: 'broke (V2)',
    indirectSubj: 'who (Subject)',
    indirectVerb: 'had broken the court seal (Past Perfect)',
    fullIndirect: 'The inspector enquired who had broken the court seal.',
    note: '"Who" jab khud grammatical subject hota hai, toh statement syntax mein auxiliary pehle se nahi hoti. Past V2 seedha Past Perfect ("had broken") ban jata hai.',
  },
  {
    word: 'How',
    type: 'Manner / Method',
    direct: 'The advocate said, "How will the bench resolve this conflict?"',
    whWord: 'how',
    auxDirect: 'will (Modal Aux)',
    subjDirect: 'the bench (Subject)',
    verbDirect: 'resolve (Main Verb)',
    indirectSubj: 'the bench (Subject)',
    indirectVerb: 'would resolve that conflict',
    fullIndirect: 'The advocate enquired how the bench would resolve that conflict.',
    note: 'Modal "will" backshift hokar "would" bana aur subject "the bench" ke baad shift hua.',
  },
]

export default function WhQuestionInversionDiagram() {
  const [activeWord, setActiveWord] = useState('Where')

  const current = WH_EXAMPLES.find((w) => w.word === activeWord) || WH_EXAMPLES[0]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Engine 2</Badge>
            <span className="text-xs font-bold text-surface-500 dark:text-surface-400">Wh-Question Syntax</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50">
            Wh-Question Inversion Removal & Word-Order Architecture
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-surface-500">
          <Layers size={14} />
          <span>Statement Order Inspector</span>
        </div>
      </div>

      {/* Wh-Word Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-surface-700 dark:text-surface-300 uppercase tracking-wider">
          Select Wh-Question Word:
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {WH_EXAMPLES.map((w) => {
            const isSelected = w.word === activeWord
            return (
              <button
                key={w.word}
                type="button"
                onClick={() => setActiveWord(w.word)}
                className={`py-2 px-3 rounded-lg text-center text-xs font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-primary-600 text-white border-primary-700 shadow-sm'
                    : 'bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300 border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-750'
                }`}
              >
                {w.word}
              </button>
            )
          })}
        </div>
      </div>

      {/* Direct Speech Inverted Word Order Box */}
      <div className="p-4 rounded-xl bg-error-50/40 dark:bg-error-950/20 border border-error-200 dark:border-error-800 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-error-800 dark:text-error-300">
            <XCircle size={15} />
            <span>DIRECT SPEECH: Inverted Question Word Order (Auxiliary before Subject)</span>
          </div>
          <span className="text-[0.6875rem] font-mono text-error-700 dark:text-error-400">End with: (?)</span>
        </div>

        <div className="font-mono text-xs text-surface-800 dark:text-surface-200 bg-white dark:bg-surface-900 p-2.5 rounded-lg border border-surface-200 dark:border-surface-700">
          {current.direct}
        </div>

        {/* Visual Blocks */}
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
          <span className="px-2.5 py-1 rounded bg-surface-200 dark:bg-surface-700 text-surface-800 dark:text-surface-100 font-bold">
            [{current.whWord}]
          </span>
          <span className="text-surface-400 font-sans">+</span>
          <span className="px-2.5 py-1 rounded bg-error-100 dark:bg-error-900/60 text-error-800 dark:text-error-200 font-bold border border-error-300">
            {current.auxDirect}
          </span>
          <span className="text-surface-400 font-sans">+</span>
          <span className="px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 font-bold border border-blue-300">
            {current.subjDirect}
          </span>
          <span className="text-surface-400 font-sans">+</span>
          <span className="px-2.5 py-1 rounded bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300">
            {current.verbDirect}...?
          </span>
        </div>
      </div>

      {/* Downward Transition Indicator */}
      <div className="flex items-center justify-center gap-2 text-xs font-bold text-primary-700 dark:text-primary-300 py-1">
        <span>Inversion Removed • Auxiliary shifts AFTER Subject • ? ➔ Full Stop</span>
      </div>

      {/* Indirect Speech Declarative Statement Box */}
      <div className="p-4 rounded-xl bg-success-50/40 dark:bg-success-950/20 border border-success-200 dark:border-success-800 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-success-800 dark:text-success-300">
            <CheckCircle2 size={15} />
            <span>INDIRECT SPEECH: Declarative Statement Word Order (Subject before Verb)</span>
          </div>
          <span className="text-[0.6875rem] font-mono text-success-700 dark:text-success-400">End with: (.)</span>
        </div>

        <div className="font-mono text-xs font-semibold text-success-900 dark:text-success-100 bg-white dark:bg-surface-900 p-2.5 rounded-lg border border-surface-200 dark:border-surface-700">
          {current.fullIndirect}
        </div>

        {/* Visual Blocks */}
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
          <span className="px-2.5 py-1 rounded bg-surface-200 dark:bg-surface-700 text-surface-800 dark:text-surface-100 font-bold">
            [{current.whWord}]
          </span>
          <span className="text-surface-400 font-sans">+</span>
          <span className="px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 font-bold border border-blue-300">
            {current.indirectSubj}
          </span>
          <span className="text-surface-400 font-sans">+</span>
          <span className="px-2.5 py-1 rounded bg-success-100 dark:bg-success-900/60 text-success-800 dark:text-success-200 font-bold border border-success-300">
            {current.indirectVerb}
          </span>
          <span className="text-surface-400 font-sans">.</span>
        </div>
      </div>

      {/* Explanatory Takeaway */}
      <div className="text-xs text-surface-600 dark:text-surface-300 p-3 rounded-lg bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 leading-relaxed">
        <strong>Grammar Logic:</strong> {current.note}
      </div>

      {/* Fatal Trap Callout */}
      <div className="p-3 rounded-lg bg-error-50 dark:bg-error-950/40 border border-error-200 dark:border-error-800 text-xs text-error-900 dark:text-error-200 flex items-start gap-2">
        <AlertTriangle size={16} className="text-error-600 shrink-0 mt-0.5" />
        <div>
          <strong>Double Conjunction Fatal Trap:</strong> Exam papers mein aksar{' '}
          <code className="px-1 py-0.5 rounded bg-error-200/60 dark:bg-error-900/60 font-mono text-[0.6875rem]">
            *He asked me that why I was late
          </code>{' '}
          likha hota hai. Conjunction "that" ko Wh-word ke pehle dekhte hi us option ko turant reject karein!
        </div>
      </div>
    </Card>
  )
}
