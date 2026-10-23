import { useState } from 'react'
import { ArrowRight, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react'
import { Card, Badge, Button } from '../../common'

const PRESETS = [
  {
    id: 'preset-1',
    label: 'Be-Verb: "Are you ready?"',
    direct: 'He said to me, "Are you ready for the hearing?"',
    speaker: 'He',
    listener: 'me',
    reportingVerb: 'asked me',
    auxiliary: 'Are',
    subject: 'you (2nd person ➔ I)',
    rest: 'ready for the hearing',
    connective: 'if / whether',
    backshiftedVerb: 'was ready for the hearing',
    indirect: 'He asked me if I was ready for the hearing.',
    note: 'Auxiliary "are" backshift hokar "was" ban gayi aur subject "I" ke BAAD shift ho gayi. End ka question mark drop ho gaya.',
  },
  {
    id: 'preset-2',
    label: 'Do/Does: "Do you know him?"',
    direct: 'The judge said to the witness, "Do you know the defendant?"',
    speaker: 'The judge',
    listener: 'the witness',
    reportingVerb: 'asked the witness',
    auxiliary: 'Do',
    subject: 'you (2nd person ➔ he)',
    rest: 'know the defendant',
    connective: 'if / whether',
    backshiftedVerb: 'knew the defendant (V2)',
    indirect: 'The judge asked the witness if he knew the defendant.',
    note: 'Affirmative reported question mein auxiliary "do" drop ho jati hai aur main verb "know" Simple Past "knew" ban jati hai.',
  },
  {
    id: 'preset-3',
    label: 'Did: "Did you verify the file?"',
    direct: 'The officer said to the clerk, "Did you verify the case diary?"',
    speaker: 'The officer',
    listener: 'the clerk',
    reportingVerb: 'asked the clerk',
    auxiliary: 'Did (Simple Past)',
    subject: 'you (2nd person ➔ he)',
    rest: 'verify the case diary',
    connective: 'whether / if',
    backshiftedVerb: 'had verified the case diary (Past Perfect)',
    indirect: 'The officer asked the clerk whether he had verified the case diary.',
    note: 'Simple Past question ("did verify") backshift hokar Past Perfect ("had verified") banta hai. Statement order follow hota hai.',
  },
  {
    id: 'preset-4',
    label: 'Choice: "Will you accept or not?"',
    direct: 'The registrar said to the applicant, "Will you accept this date or not?"',
    speaker: 'The registrar',
    listener: 'the applicant',
    reportingVerb: 'asked the applicant',
    auxiliary: 'Will (Modal)',
    subject: 'you (2nd person ➔ he)',
    rest: 'accept this date or not',
    connective: 'whether or not (Mandatory)',
    backshiftedVerb: 'would accept that date',
    indirect: 'The registrar asked the applicant whether or not he would accept that date.',
    note: 'Jab explicit "or not" jud raha ho, toh connective "whether" mandatory hota hai ("if or not" is non-standard in exam English).',
  },
]

export default function YesNoQuestionFlowEngine() {
  const [activePresetId, setActivePresetId] = useState('preset-1')
  const [activeStep, setActiveStep] = useState(0)

  const current = PRESETS.find((p) => p.id === activePresetId) || PRESETS[0]

  const steps = [
    {
      title: 'Step 1: Direct Question Isolation',
      desc: 'Quotation marks ke andar auxiliary aur subject ko isolate karein:',
      content: (
        <div className="p-3 rounded-lg bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-1.5 font-mono text-xs">
          <div><span className="text-surface-500">Direct:</span> <strong className="text-primary-700 dark:text-primary-300">{current.direct}</strong></div>
          <div className="flex flex-wrap gap-2 pt-1 font-sans">
            <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold text-[0.6875rem]">Auxiliary: {current.auxiliary}</span>
            <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-semibold text-[0.6875rem]">Subject: {current.subject}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Step 2: Connective & Reporting Verb',
      desc: 'Reporting verb "said to" ko "asked" mein badlein aur connective lagayein:',
      content: (
        <div className="p-3 rounded-lg bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-surface-600 dark:text-surface-400">Reporting Clause:</span>
            <span className="font-bold text-success-700 dark:text-success-400 font-mono">{current.reportingVerb}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-surface-600 dark:text-surface-400">Connective:</span>
            <Badge variant="primary" size="sm">{current.connective}</Badge>
            <span className="text-[0.6875rem] text-error-600 dark:text-error-400 font-semibold">(NO "that" allowed!)</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Step 3: Inversion Removal (Subject + Verb)',
      desc: 'Question syntax ko declarative statement syntax mein convert karein:',
      content: (
        <div className="p-3 rounded-lg bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-mono">
            <span className="text-error-600 dark:text-error-400 line-through">[{current.auxiliary} + Subject]</span>
            <ArrowRight size={14} className="text-surface-400" />
            <span className="text-success-700 dark:text-success-400 font-bold">[Subject + Verb]</span>
          </div>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            Subject pehle aayega aur verb backshift hokar subject ke BAAD lagegi.
          </p>
        </div>
      ),
    },
    {
      title: 'Step 4: Final Synthesized Statement',
      desc: 'Quotation marks hatakar end mein Full Stop (.) lagayein:',
      content: (
        <div className="p-3.5 rounded-lg bg-success-50/50 dark:bg-success-950/40 border border-success-200 dark:border-success-800 space-y-2">
          <div className="text-xs font-semibold text-success-900 dark:text-success-100 font-mono">
            {current.indirect}
          </div>
          <div className="text-[0.6875rem] text-surface-600 dark:text-surface-300 flex items-start gap-1.5">
            <CheckCircle2 size={13} className="text-success-600 shrink-0 mt-0.5" />
            <span>{current.note}</span>
          </div>
        </div>
      ),
    },
  ]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Engine 1</Badge>
            <span className="text-xs font-bold text-surface-500 dark:text-surface-400">Yes/No Question Architecture</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50">
            Yes/No Question ➔ Reported Statement Transformation Flow
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-surface-500">
          <HelpCircle size={14} />
          <span>If / Whether Connective Guide</span>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-surface-700 dark:text-surface-300 uppercase tracking-wider">
          Select Exam Sentence Type:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRESETS.map((p) => {
            const isSelected = p.id === activePresetId
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setActivePresetId(p.id)
                  setActiveStep(0)
                }}
                className={`p-2 rounded-lg text-left text-xs font-semibold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-primary-50 dark:bg-primary-950/70 text-primary-700 dark:text-primary-300 border-primary-300 dark:border-primary-600 shadow-xs'
                    : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300 border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-750'
                }`}
              >
                {p.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Step Tracker */}
      <div className="flex items-center justify-between gap-1 p-1 rounded-xl bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
        {steps.map((st, sIdx) => {
          const isDone = sIdx <= activeStep
          const isCurrent = sIdx === activeStep
          return (
            <button
              key={sIdx}
              type="button"
              onClick={() => setActiveStep(sIdx)}
              className={`flex-1 py-1.5 px-2 rounded-lg text-center text-[0.6875rem] font-bold transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs border border-surface-200 dark:border-surface-700'
                  : isDone
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-surface-400 dark:text-surface-500'
              }`}
            >
              Step {sIdx + 1}
            </button>
          )
        })}
      </div>

      {/* Active Step Content */}
      <div className="space-y-3 min-h-[140px]">
        <div>
          <h4 className="text-sm font-bold text-surface-900 dark:text-surface-100">
            {steps[activeStep].title}
          </h4>
          <p className="text-xs text-surface-500 dark:text-surface-400">{steps[activeStep].desc}</p>
        </div>
        {steps[activeStep].content}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-surface-100 dark:border-surface-700">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
          disabled={activeStep === 0}
        >
          Previous
        </Button>
        <span className="text-xs text-surface-400">
          Step {activeStep + 1} of {steps.length}
        </span>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
          disabled={activeStep === steps.length - 1}
        >
          Next Step
        </Button>
      </div>

      {/* Fatal Trap Callout */}
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
        <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Exam Distractor Warning:</strong> Multiple-choice options mein examiner aksar{' '}
          <code className="px-1 py-0.5 rounded bg-amber-200/50 dark:bg-amber-900/60 font-mono text-[0.6875rem]">
            *He asked me that if I was ready
          </code>{' '}
          deta hai. Conjunction "that" aur "if" ko ek sath kabhi na jodein!
        </div>
      </div>
    </Card>
  )
}
