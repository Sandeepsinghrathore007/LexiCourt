import { useState } from 'react'
import { CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react'
import { Card, Badge } from '../../common'

const IMPERATIVE_CATEGORIES = [
  {
    id: 'command',
    title: 'Command / Strict Order',
    reportingVerb: 'ordered / commanded / directed',
    context: 'Judicial authority, superior officer, commander, court master.',
    directExample: 'The judge said to the witness, "Speak clearly and face the bench."',
    transformation: 'The judge ordered the witness to speak clearly and face the bench.',
    formula: 'ordered + Listener Object + to + V1',
    politeDrop: 'N/A (No polite words in commands)',
    examTrap: 'Examiner aksar "*The judge ordered to the witness..." likhta hai. "Ordered" transitive verb hai, listener se pehle "to" lagana fatal error hai.',
  },
  {
    id: 'request',
    title: 'Polite Request / Appeal',
    reportingVerb: 'requested / begged / implored',
    context: 'Subordinates to authority, citizens to court clerks, polite inquiries with "please" or "kindly".',
    directExample: 'The litigant said to the clerk, "Please provide me a certified copy of the decree."',
    transformation: 'The litigant requested the clerk to provide him a certified copy of the decree.',
    formula: 'requested + Listener Object + to + V1',
    politeDrop: '"Please" aur "Kindly" ko 100% drop kar diya jata hai.',
    examTrap: 'Examiner option deta hai: "*requested the clerk to please provide him...". "Requested" aane ke baad "please" dobara lagana redundant blunder hai.',
  },
  {
    id: 'advice',
    title: 'Advice / Professional Counsel',
    reportingVerb: 'advised / urged / counselled',
    context: 'Doctor to patient, senior advocate to junior, teacher to student on good practice.',
    directExample: 'The doctor said to the patient, "Take this medicine after your dinner."',
    transformation: 'The doctor advised the patient to take that medicine after his dinner.',
    formula: 'advised + Listener Object + to + V1',
    politeDrop: 'Demonstrative shifts: "this" ➔ "that"',
    examTrap: 'Professional advice ko authoritarian "ordered" mat banayein. Tone of welfare identify karein.',
  },
  {
    id: 'instruction',
    title: 'Procedural Instruction / Direction',
    reportingVerb: 'instructed / directed / guided',
    context: 'Examination hall rules, technical guidelines, system operations.',
    directExample: 'The invigilator said to the candidates, "Fill your roll numbers in the OMR sheet."',
    transformation: 'The invigilator instructed the candidates to fill their roll numbers in the OMR sheet.',
    formula: 'instructed + Listener Object + to + V1',
    politeDrop: 'Pronoun shift: "your roll numbers" ➔ "their roll numbers"',
    examTrap: 'Procedural steps ke liye "instructed" sabse exact verb hoti hai.',
  },
  {
    id: 'warning',
    title: 'Warning / Caution',
    reportingVerb: 'warned / cautioned',
    context: 'Security guards, danger notices, regulatory warnings.',
    directExample: 'The guard said to the visitor, "Do not touch the high-voltage server cabinet."',
    transformation: 'The guard warned the visitor not to touch the high-voltage server cabinet.',
    formula: 'warned + Listener Object + not to + V1',
    politeDrop: 'Negative command ➔ "not to + V1"',
    examTrap: '"To not touch" (split infinitive) ke bajaye formal English mein "not to touch" use karein.',
  },
]

export default function ImperativeCommandRequestGuide() {
  const [activeCategoryId, setActiveCategoryId] = useState('command')

  const current = IMPERATIVE_CATEGORIES.find((c) => c.id === activeCategoryId) || IMPERATIVE_CATEGORIES[0]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Engine 3</Badge>
            <span className="text-xs font-bold text-surface-500 dark:text-surface-400">Imperative Intent Engine</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50">
            Imperative Reporting Verbs & Communicative Purpose Guide
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-surface-500">
          <ShieldCheck size={14} className="text-success-600" />
          <span>Infinitive (To + V1) Architecture</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {IMPERATIVE_CATEGORIES.map((cat) => {
          const isSelected = cat.id === activeCategoryId
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategoryId(cat.id)}
              className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-primary-50 dark:bg-primary-950/70 text-primary-700 dark:text-primary-300 border-primary-300 dark:border-primary-600 shadow-xs'
                  : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300 border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-750'
              }`}
            >
              <div className="text-[0.6875rem] text-surface-500 font-normal">Intent:</div>
              <div>{cat.title.split('/')[0]}</div>
            </button>
          )
        })}
      </div>

      {/* Active Category Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: Direct vs Indirect Transformation */}
        <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-3">
          <div>
            <Badge variant="neutral" size="sm">Context & Authority</Badge>
            <p className="text-xs text-surface-600 dark:text-surface-300 mt-1">{current.context}</p>
          </div>

          <div className="space-y-1.5">
            <span className="text-[0.6875rem] font-bold text-surface-500 uppercase tracking-wider">Direct Speech:</span>
            <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 font-mono text-xs text-surface-800 dark:text-surface-200">
              {current.directExample}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[0.6875rem] font-bold text-success-600 dark:text-success-400 uppercase tracking-wider">Indirect Speech:</span>
            <div className="p-2.5 rounded-lg bg-success-50/50 dark:bg-success-950/40 border border-success-200 dark:border-success-800 font-mono text-xs font-semibold text-success-900 dark:text-success-100">
              {current.transformation}
            </div>
          </div>
        </div>

        {/* Right Column: Grammar Mechanics & Formula */}
        <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-3">
          <div>
            <span className="text-[0.6875rem] font-bold text-surface-500 uppercase tracking-wider">Standard Formula:</span>
            <div className="mt-1 p-2.5 rounded-lg bg-primary-50/50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 font-mono text-xs font-bold text-primary-800 dark:text-primary-200">
              {current.formula}
            </div>
          </div>

          <div>
            <span className="text-[0.6875rem] font-bold text-surface-500 uppercase tracking-wider">Applicable Reporting Verbs:</span>
            <p className="text-xs font-mono font-bold text-surface-800 dark:text-surface-200 mt-0.5">
              {current.reportingVerb}
            </p>
          </div>

          <div>
            <span className="text-[0.6875rem] font-bold text-surface-500 uppercase tracking-wider">Polite / Adverbial Rule:</span>
            <p className="text-xs text-surface-600 dark:text-surface-300 mt-0.5 flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-success-600 shrink-0" />
              <span>{current.politeDrop}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Fatal Exam Trap Callout */}
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
        <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Exam Distractor Warning:</strong> {current.examTrap}
        </div>
      </div>
    </Card>
  )
}
