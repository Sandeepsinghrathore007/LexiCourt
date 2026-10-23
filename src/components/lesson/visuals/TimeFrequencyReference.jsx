import { useState } from 'react'
import { Clock, Zap, AlertTriangle, Infinity, RotateCcw, ArrowRight } from 'lucide-react'
import { Card, Badge } from '../../common'

const TIME_CATEGORIES = [
  {
    title: 'Extreme Rarity (Frequency)',
    idioms: ['Once in a blue moon', 'Few and far between'],
    icon: RotateCcw,
    formula: 'Frequency -> Almost Never / Exceptional',
    description: 'Aisi ghatnayein jo saalon mein kabhi-kabhar durlabh avsar par hoti hain.',
    example: 'The registrar visits regional subordinate courts once in a blue moon.',
    examTrap: "'In no time' se confuse na karein; 'blue moon' frequency hai, speed nahi."
  },
  {
    title: 'Instantaneous Speed & Readiness',
    idioms: ['In no time', 'At the drop of a hat'],
    icon: Zap,
    formula: 'Speed / Promptness -> Zero Delay',
    description: 'Bina kisi jhijhak ya bina samay gavaye turant kaam shuru kar dena.',
    example: 'The emergency IT disaster team mobilizes at the drop of a hat.',
    examTrap: "'Nick of time' se alag karein; 'drop of a hat' prompt willingness hai."
  },
  {
    title: 'Critical Deadline Precision',
    idioms: ['In the nick of time', 'At the eleventh hour'],
    icon: AlertTriangle,
    formula: 'Deadline Boundary -> Just Before It Is Too Late',
    description: 'Bilkul theek aakhri pal par aakar disaster ya dismissal rokna.',
    example: 'The stay petition was delivered in the nick of time before the demolition begun.',
    examTrap: "'Eleventh hour' aakhri moment decision/action hai; 'nick of time' disaster prevention."
  },
  {
    title: 'Continuous 24-Hour Labor',
    idioms: ['Around the clock', 'Day and night'],
    icon: Infinity,
    formula: 'Duration -> 24 Hours Uninterrupted',
    description: 'Bina ruke din-raat lagatar 24 ghante chalne wala parishram.',
    example: 'Data entry operators worked around the clock to upload all case judgments.',
    examTrap: "'Against the clock' (race) vs 'around the clock' (24-hour uninterrupted shift)."
  },
  {
    title: 'Deadline Urgency (Time Pressure)',
    idioms: ['Work against the clock', 'Down to the wire'],
    icon: Clock,
    formula: 'Velocity -> Racing to Beat Imminent Expiry',
    description: 'Samay bohot kam hone ke karan deadline se race lagana.',
    example: 'The legislative committee worked against the clock to table the bill before adjournment.',
    examTrap: "Din ke waqt deadline se race lagana 'against the clock' hota hai, 'midnight oil' nahi."
  },
  {
    title: 'Long-Term Horizon',
    idioms: ['In the long run', 'Over time'],
    icon: ArrowRight,
    formula: 'Temporal Horizon -> Ultimate Cumulative Outcome',
    description: 'Tatkalik parinam ke bajaye aage chal kar lambe samay mein milne wala result.',
    example: 'Digital archives will save enormous public expenditure in the long run.',
    examTrap: "'In the short term' tatkalik parinam ke liye hota hai; 'long run' ultimate outcome ke liye."
  }
]

export default function TimeFrequencyReference() {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = TIME_CATEGORIES[activeIdx]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Model 6</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Chronological & Frequency Matrix</span>
          </div>
          <h3 className="text-xl font-bold font-heading text-surface-900 dark:text-surface-50 flex items-center gap-2">
            <Clock size={20} className="text-primary-600 dark:text-primary-400" />
            Time, Speed, Urgency & Frequency Reference Guide
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300 mt-1 max-w-3xl leading-relaxed">
            Time expressions mein candidate aksar 'frequency' (how often), 'speed' (how fast), aur 'deadline proximity' (how late) ke beech confuse ho jate hain. Yeh 6-dimensional reference matrix unhe clearly differentiate karta hai.
          </p>
        </div>
      </div>

      {/* Grid of Temporal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {TIME_CATEGORIES.map((cat, idx) => {
          const isActive = idx === activeIdx
          const Icon = cat.icon
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                isActive
                  ? 'border-primary-500 bg-primary-50/40 dark:bg-primary-950/50 shadow-xs ring-1 ring-primary-500/30'
                  : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-850 hover:bg-surface-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon size={18} className={isActive ? 'text-primary-600 dark:text-primary-400' : 'text-surface-500'} />
                <Badge variant={isActive ? 'primary' : 'neutral'} size="sm">
                  {cat.formula.split('->')[0].trim()}
                </Badge>
              </div>
              <div>
                <p className={`text-xs font-bold ${isActive ? 'text-primary-900 dark:text-primary-100' : 'text-surface-800 dark:text-surface-200'}`}>
                  {cat.title}
                </p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {cat.idioms.map((idm, i) => (
                    <span key={i} className="text-[0.625rem] font-bold px-1.5 py-0.5 rounded bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300">
                      {idm}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected Card Deep Dive */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-3">
        <div className="flex items-center justify-between border-b border-surface-200 dark:border-surface-700 pb-2">
          <span className="font-heading font-bold text-sm text-surface-900 dark:text-surface-100">
            {current.title} — Deep Analysis
          </span>
          <span className="text-xs font-mono font-bold text-primary-700 dark:text-primary-300">
            {current.formula}
          </span>
        </div>
        <p className="text-xs text-surface-700 dark:text-surface-300 leading-relaxed">
          {current.description}
        </p>
        <div className="p-3 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-xs italic text-surface-800 dark:text-surface-200">
          <strong>Natural Example:</strong> "{current.example}"
        </div>
        <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-[0.6875rem] text-rose-800 dark:text-rose-300">
          <strong>Exam Distractor Warning:</strong> {current.examTrap}
        </div>
      </div>
    </Card>
  )
}
