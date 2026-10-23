import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Card, Badge } from '../../common'

export default function TenseHarmonyTimeline() {
  const [activeZone, setActiveZone] = useState('anterior') // 'anterior' | 'simultaneous' | 'posterior'

  const zones = {
    anterior: {
      id: 'anterior',
      title: '1. Anterior Past (Earlier Event)',
      formula: 'had + Past Participle (V₃)',
      exampleMain: 'The judicial auditor revealed (11:00 AM)',
      exampleSub: 'that the cashier had embezzled the funds (Prior Days / Weeks)',
      chronology: 'Past reference anchor se PEHLE hua tha',
      explanation: 'Jab past ke do events coordinate hote hain, toh chronological priority establish karne ke liye pehle complete huye event ke liye Past Perfect use karna zaroori hai.',
      color: 'amber',
      sampleSentence: 'The registrar discovered that the peon had misplaced the original case file.',
    },
    simultaneous: {
      id: 'simultaneous',
      title: '2. Simultaneous Past (Co-Occurring Event)',
      formula: 'Simple Past (V₂) OR Past Continuous (was/were + V-ing)',
      exampleMain: 'The judge observed (10:30 AM)',
      exampleSub: 'that the witness was trembling with fear (10:30 AM concurrently)',
      chronology: 'Past reference anchor ke theek USI WAQT par hua tha',
      explanation: 'Jab subordinate event past ke theek usi samay hua ho jab main clause ka action ho raha tha, toh dono clauses Simple ya Continuous Past tense lete hain.',
      color: 'emerald',
      sampleSentence: 'The clerk noticed that the applicant looked nervous during the document verification.',
    },
    posterior: {
      id: 'posterior',
      title: '3. Posterior Past (Future-in-the-Past)',
      formula: 'would / should + Base Verb (V₁)',
      exampleMain: 'The advocate assured the bench (Monday)',
      exampleSub: 'that he would present the verified evidence (Tuesday)',
      chronology: 'Past reference anchor ke BAAD hona projected ya anticipated tha',
      explanation: 'Past moment ke perspective se aage aane wale action ke liye "will" use nahi ho sakta; "will" backshift hokar "would" (Future-in-the-Past) ban jata hai.',
      color: 'primary',
      sampleSentence: 'The registrar promised that the IT wing would restore the database by midnight.',
    },
  }

  const current = zones[activeZone]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[0.625rem] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded">
              VISUAL MODEL 02
            </span>
            <span className="text-xs text-surface-500 dark:text-surface-400">Chronological Axis</span>
          </div>
          <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
            The Three Temporal Axes from a Past Reference Anchor
          </h3>
        </div>

        <Badge variant="primary" size="sm">Past Reference Frame</Badge>
      </div>

      <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed">
        Jab governing verb past mein hota hai, toh time us past reference point (<strong>T_ref</strong>) se naapa jata hai, na ki speech ke present moment se. Grammatical formula dekhne ke liye timeline zone par click karein:
      </p>

      {/* SVG Interactive Timeline Diagram */}
      <div className="p-4 rounded-2xl bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 select-none">
        <svg
          viewBox="0 0 900 240"
          className="w-full h-auto text-xs font-sans"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Chronological Line */}
          <line x1="40" y1="120" x2="860" y2="120" stroke="currentColor" className="text-surface-300 dark:text-surface-700" strokeWidth="4" />
          <polygon points="865,120 850,113 850,127" className="fill-surface-400 dark:fill-surface-600" />

          {/* Point NOW (Present Speech Moment) */}
          <circle cx="800" cy="120" r="7" className="fill-surface-400 dark:fill-surface-500 stroke-white dark:stroke-surface-900" strokeWidth="3" />
          <text x="800" y="100" textAnchor="middle" className="font-bold fill-surface-600 dark:fill-surface-400 text-[12px]">
            Point NOW
          </text>
          <text x="800" y="145" textAnchor="middle" className="fill-surface-400 dark:fill-surface-500 text-[10px]">
            (Bolte waqt ka moment)
          </text>

          {/* Past Reference Anchor: T_ref (Governing Verb) */}
          <g>
            <circle cx="500" cy="120" r="10" className="fill-primary-600 dark:fill-primary-500 stroke-white dark:stroke-surface-900" strokeWidth="3" />
            <text x="500" y="90" textAnchor="middle" className="font-extrabold fill-primary-700 dark:fill-primary-300 text-[13px]">
              T_ref: Past Anchor
            </text>
            <text x="500" y="105" textAnchor="middle" className="fill-surface-500 dark:fill-surface-400 text-[10px] font-mono">
              Main Verb (e.g. said, knew)
            </text>
            <line x1="500" y1="130" x2="500" y2="175" stroke="currentColor" className="text-primary-500 dark:text-primary-400" strokeDasharray="3 3" />
          </g>

          {/* Zone 1: Earlier / Anterior (0 to 500) */}
          <g
            onClick={() => setActiveZone('anterior')}
            className="cursor-pointer group"
          >
            <rect
              x="80"
              y="40"
              width="360"
              height="150"
              rx="12"
              className={`transition-all ${
                activeZone === 'anterior'
                  ? 'fill-amber-500/15 stroke-amber-500 dark:stroke-amber-400 stroke-2'
                  : 'fill-transparent hover:fill-surface-200/40 dark:hover:fill-surface-800/40 stroke-surface-200 dark:stroke-surface-700 stroke-1'
              }`}
            />
            <circle cx="260" cy="120" r="8" className="fill-amber-500 dark:fill-amber-400 stroke-white dark:stroke-surface-900" strokeWidth="2" />
            <text x="260" y="70" textAnchor="middle" className="font-bold fill-amber-700 dark:fill-amber-300 text-[12px]">
              1. Anterior (Earlier) Action
            </text>
            <text x="260" y="90" textAnchor="middle" className="font-mono font-bold fill-amber-900 dark:fill-amber-200 text-[11px]">
              had + V₃ (Past Perfect)
            </text>
            <text x="260" y="150" textAnchor="middle" className="fill-surface-600 dark:fill-surface-400 text-[10px]">
              e.g., "...had filed the writ"
            </text>
          </g>

          {/* Zone 2: Simultaneous (At 500) */}
          <g
            onClick={() => setActiveZone('simultaneous')}
            className="cursor-pointer group"
          >
            <rect
              x="450"
              y="180"
              width="100"
              height="45"
              rx="8"
              className={`transition-all ${
                activeZone === 'simultaneous'
                  ? 'fill-emerald-500/20 stroke-emerald-500 stroke-2'
                  : 'fill-transparent hover:fill-surface-200/40 dark:hover:fill-surface-800/40 stroke-surface-300 dark:stroke-surface-700'
              }`}
            />
            <text x="500" y="200" textAnchor="middle" className="font-bold fill-emerald-700 dark:fill-emerald-300 text-[10px]">
              2. Simultaneous
            </text>
            <text x="500" y="215" textAnchor="middle" className="font-mono fill-emerald-900 dark:fill-emerald-200 text-[9px]">
              V₂ / was, were
            </text>
          </g>

          {/* Zone 3: Posterior / Future-in-the-Past (500 to 800) */}
          <g
            onClick={() => setActiveZone('posterior')}
            className="cursor-pointer group"
          >
            <rect
              x="560"
              y="40"
              width="200"
              height="150"
              rx="12"
              className={`transition-all ${
                activeZone === 'posterior'
                  ? 'fill-primary-500/15 stroke-primary-500 dark:stroke-primary-400 stroke-2'
                  : 'fill-transparent hover:fill-surface-200/40 dark:hover:fill-surface-800/40 stroke-surface-200 dark:stroke-surface-700 stroke-1'
              }`}
            />
            <circle cx="660" cy="120" r="8" className="fill-primary-600 dark:fill-primary-400 stroke-white dark:stroke-surface-900" strokeWidth="2" />
            <text x="660" y="70" textAnchor="middle" className="font-bold fill-primary-700 dark:fill-primary-300 text-[12px]">
              3. Posterior (Later) Action
            </text>
            <text x="660" y="90" textAnchor="middle" className="font-mono font-bold fill-primary-900 dark:fill-primary-200 text-[11px]">
              would + V₁ (Future-in-Past)
            </text>
            <text x="660" y="150" textAnchor="middle" className="fill-surface-600 dark:fill-surface-400 text-[10px]">
              e.g., "...would deliver judgment"
            </text>
          </g>
        </svg>
      </div>

      {/* Zone Switcher Button Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {Object.values(zones).map((z) => (
          <button
            key={z.id}
            type="button"
            onClick={() => setActiveZone(z.id)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeZone === z.id
                ? 'bg-white dark:bg-surface-800 border-primary-500 dark:border-primary-400 shadow-xs ring-1 ring-primary-500/20'
                : 'bg-surface-50 dark:bg-surface-800/50 border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-surface-900 dark:text-white">
                {z.title.split(' ')[1]} {z.title.split(' ')[2]}
              </span>
              {activeZone === z.id && (
                <CheckCircle2 size={14} className="text-primary-600 dark:text-primary-400" />
              )}
            </div>
            <span className="font-mono text-[0.6875rem] font-bold text-primary-700 dark:text-primary-300 block">
              {z.formula}
            </span>
          </button>
        ))}
      </div>

      {/* Active Zone Detail Card */}
      <div className="p-4 rounded-xl bg-surface-100/70 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-white">
            {current.title}
          </h4>
          <span className="font-mono text-xs font-bold text-primary-700 dark:text-primary-300 bg-white dark:bg-surface-900 px-2 py-0.5 rounded border border-surface-200 dark:border-surface-700">
            Formula: {current.formula}
          </span>
        </div>

        <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed">
          {current.explanation}
        </p>

        <div className="p-3 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1">
          <span className="text-[0.625rem] uppercase font-bold text-surface-400 dark:text-surface-500">
            Exam Sample Sentence:
          </span>
          <p className="font-mono text-xs font-bold text-surface-900 dark:text-surface-100">
            "{current.sampleSentence}"
          </p>
        </div>
      </div>
    </Card>
  )
}
