import { useState } from 'react'
import { Clock, Calendar } from 'lucide-react'
import { Card, Badge } from '../../common'

export default function ConditionalTimeline() {
  const [activeZone, setActiveZone] = useState('type3') // 'type3' | 'type2' | 'type0' | 'type1'

  const zones = {
    type3: {
      id: 'type3',
      name: 'Unreal Finished Past (Type 3)',
      timeFrame: 'Past (Finished & Unchangeable)',
      marker: 'Yesterday / Last Year / During Trial',
      verbPattern: 'If + had + V3 ..., would have + V3',
      color: 'error',
      narrative: 'Ye event past mein khatam ho chuka hai aur isko badla nahi ja sakta. Hum sirf beete huye waqt ka ek imaginary alternative imagine kar rahe hain.',
      realFact: 'In Reality: Advocate did not submit the document, and the judge did not stay the order.',
      conditionalForm: '"If the advocate had submitted the document, the judge would have stayed the order."',
    },
    type2: {
      id: 'type2',
      name: 'Hypothetical Present (Type 2)',
      timeFrame: 'Present (Contrary-to-Fact Now)',
      marker: 'Right Now / Today / At Present',
      verbPattern: 'If + V2 (subjunctive were) ..., would + V1',
      color: 'secondary',
      narrative: 'Ye situation beete waqt ki nahi hai, balki present moment par reality ke opposite (contrary-to-fact) hai. Past form (knew/were) time ke past hone ko nahi, balki reality se imaginary doori ko darshata hai.',
      realFact: 'In Reality: I am not the Chief Justice right now.',
      conditionalForm: '"If I were the Chief Justice today, I would reform the listing system."',
    },
    type0: {
      id: 'type0',
      name: 'Universal / Timeless Fact (Type 0)',
      timeFrame: 'Timeless Axis (Past, Present & Future Always)',
      marker: 'Always / At Any Time / As a Law',
      verbPattern: 'If + Simple Present ..., Simple Present',
      color: 'neutral',
      narrative: 'Ye timeline par kisi specific point par bandha nahi hai. Ye kal bhi sach tha, aaj bhi sach hai, aur aage bhi hamesha sach rahega.',
      realFact: 'In Reality: Scientific law is permanently operative.',
      conditionalForm: '"If you heat ice above zero degrees, it melts."',
    },
    type1: {
      id: 'type1',
      name: 'Realistic Future Possibility (Type 1)',
      timeFrame: 'Future (Probable & Attainable)',
      marker: 'Tomorrow / Next Week / Soon',
      verbPattern: 'If + Simple Present ..., will + V1',
      color: 'primary',
      narrative: 'Condition future mein reality mein poori ho sakti hai. Isliye condition ko present form mein anchor karke result mein future modal "will" use kiya jata hai.',
      realFact: 'In Reality: The candidate can prepare and realistic success is achievable.',
      conditionalForm: '"If the candidate practices typing daily, he will qualify the HSA test."',
    },
  }

  const current = zones[activeZone]

  return (
    <Card variant="default" padding="lg" className="space-y-6 select-none border-surface-200 dark:border-surface-700 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-100 dark:border-surface-700">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/80 border border-primary-300 dark:border-primary-500/50 text-primary-700 dark:text-primary-300 flex items-center justify-center font-bold">
            <Clock size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Temporal Anchors & Reality Timeline
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-300">
              Finished Past (Type 3) ➔ Hypothetical Present (Type 2) ➔ Timeless (Type 0) ➔ Future Possibility (Type 1)
            </p>
          </div>
        </div>
      </div>

      {/* SVG Interactive Timeline Graphic */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-6">
        <div className="relative pt-6 pb-2">
          {/* Main Horizontal Timeline Bar */}
          <div className="h-2 w-full bg-surface-200 dark:bg-surface-700 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-error-400 via-amber-400 to-primary-500 opacity-60" />
          </div>

          {/* Timeline Nodes */}
          <div className="grid grid-cols-4 gap-2 pt-4 text-center">
            {/* Node 1: Type 3 */}
            <button
              type="button"
              onClick={() => setActiveZone('type3')}
              className={`flex flex-col items-center gap-1.5 cursor-pointer p-2 rounded-xl transition-all ${
                activeZone === 'type3'
                  ? 'bg-error-50 dark:bg-error-950/60 border border-error-300 dark:border-error-600/50 scale-105'
                  : 'hover:bg-surface-100 dark:hover:bg-surface-800'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono text-white ${
                activeZone === 'type3' ? 'bg-error-600 ring-4 ring-error-100 dark:ring-error-950' : 'bg-error-400'
              }`}>
                3
              </div>
              <span className="text-xs font-bold text-surface-900 dark:text-surface-100">Past Unreal</span>
              <span className="text-[0.625rem] text-surface-500 dark:text-surface-400">Finished Event</span>
            </button>

            {/* Node 2: Type 2 */}
            <button
              type="button"
              onClick={() => setActiveZone('type2')}
              className={`flex flex-col items-center gap-1.5 cursor-pointer p-2 rounded-xl transition-all ${
                activeZone === 'type2'
                  ? 'bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-600/50 scale-105'
                  : 'hover:bg-surface-100 dark:hover:bg-surface-800'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono text-white ${
                activeZone === 'type2' ? 'bg-amber-600 ring-4 ring-amber-100 dark:ring-amber-950' : 'bg-amber-400'
              }`}>
                2
              </div>
              <span className="text-xs font-bold text-surface-900 dark:text-surface-100">Hypothetical</span>
              <span className="text-[0.625rem] text-surface-500 dark:text-surface-400">Present Unreal</span>
            </button>

            {/* Node 3: Type 0 */}
            <button
              type="button"
              onClick={() => setActiveZone('type0')}
              className={`flex flex-col items-center gap-1.5 cursor-pointer p-2 rounded-xl transition-all ${
                activeZone === 'type0'
                  ? 'bg-surface-200 dark:bg-surface-700/80 border border-surface-300 dark:border-surface-600 scale-105'
                  : 'hover:bg-surface-100 dark:hover:bg-surface-800'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono text-surface-900 dark:text-white ${
                activeZone === 'type0' ? 'bg-surface-600 ring-4 ring-surface-200 dark:ring-surface-700 text-white' : 'bg-surface-400'
              }`}>
                0
              </div>
              <span className="text-xs font-bold text-surface-900 dark:text-surface-100">Timeless</span>
              <span className="text-[0.625rem] text-surface-500 dark:text-surface-400">Always True</span>
            </button>

            {/* Node 4: Type 1 */}
            <button
              type="button"
              onClick={() => setActiveZone('type1')}
              className={`flex flex-col items-center gap-1.5 cursor-pointer p-2 rounded-xl transition-all ${
                activeZone === 'type1'
                  ? 'bg-primary-50 dark:bg-primary-950/60 border border-primary-300 dark:border-primary-600/50 scale-105'
                  : 'hover:bg-surface-100 dark:hover:bg-surface-800'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono text-white ${
                activeZone === 'type1' ? 'bg-primary-600 ring-4 ring-primary-100 dark:ring-primary-950' : 'bg-primary-400'
              }`}>
                1
              </div>
              <span className="text-xs font-bold text-surface-900 dark:text-surface-100">Real Future</span>
              <span className="text-[0.625rem] text-surface-500 dark:text-surface-400">Probable Outcome</span>
            </button>
          </div>
        </div>

        {/* Selected Zone Detail Panel */}
        <div className="p-4 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-3 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-100 dark:border-surface-700 pb-2.5">
            <div>
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Active Zone Analysis
              </span>
              <h4 className="font-heading font-bold text-sm md:text-base text-surface-900 dark:text-surface-50">
                {current.name}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-surface-500 dark:text-surface-400 flex items-center gap-1">
                <Calendar size={13} /> {current.timeFrame}
              </span>
              <Badge variant={current.color} size="sm">{current.marker}</Badge>
            </div>
          </div>

          <p className="text-xs text-surface-700 dark:text-surface-200 leading-relaxed">
            {current.narrative}
          </p>

          {/* Reality vs Conditional Sentence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-lg bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-1">
              <strong className="text-surface-700 dark:text-surface-300 block">Actual Ground Reality:</strong>
              <p className="text-surface-600 dark:text-surface-400 italic">
                {current.realFact}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-primary-50/40 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-500/30 space-y-1">
              <strong className="text-primary-950 dark:text-primary-200 block">Conditional Construction:</strong>
              <p className="font-mono font-bold text-surface-900 dark:text-surface-50">
                {current.conditionalForm}
              </p>
            </div>
          </div>

          {/* Formula Pill */}
          <div className="flex items-center gap-2 pt-1 text-xs">
            <span className="font-bold text-surface-700 dark:text-surface-300">Mandatory Formula:</span>
            <code className="px-2 py-0.5 rounded bg-surface-100 dark:bg-surface-700 text-primary-700 dark:text-primary-300 font-mono font-bold">
              {current.verbPattern}
            </code>
          </div>
        </div>
      </div>
    </Card>
  )
}
