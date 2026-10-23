import { useState } from 'react'
import { Flame, Sparkles, AlertCircle, ArrowRight } from 'lucide-react'
import { Card, Badge } from '../../common'

const SPECTRUM_CATEGORIES = [
  {
    id: 'anger',
    title: 'Anger & Displeasure',
    description: 'Mild irritation se lekar blind judicial rage tak ke gradation.',
    levels: [
      { step: 1, label: 'Mild / Low', word: 'Irritated / Annoyed', nuance: 'Chhoti si baat par asantosh hona; mild discomfort.', pos: 'Adjective' },
      { step: 2, label: 'Moderate', word: 'Angry / Vexed', nuance: 'Standard displeasure ya narazgi; visible resentment.', pos: 'Adjective' },
      { step: 3, label: 'Strong', word: 'Furious / Irate', nuance: 'High degree of intense anger; vocal protest.', pos: 'Adjective' },
      { step: 4, label: 'Extreme', word: 'Enraged / Incensed', nuance: 'Violently angry; uncontrollable indignation.', pos: 'Adjective' }
    ],
    rule: 'Question stem mein agar "Incensed" hai, toh "Annoyed" pick karna degree mismatch error hai; "Furious" ya "Enraged" hi acceptable hai.'
  },
  {
    id: 'praise',
    title: 'Praise & Approval',
    description: 'Normal tareef se lekar formal devtulya eulogy tak ke levels.',
    levels: [
      { step: 1, label: 'Mild / Low', word: 'Approve / Commend', nuance: 'Basic endorsement ya positive acknowledgment.', pos: 'Verb' },
      { step: 2, label: 'Moderate', word: 'Praise / Applaud', nuance: 'Standard tareef; clear expression of admiration.', pos: 'Verb' },
      { step: 3, label: 'Strong', word: 'Extol / Acclaim', nuance: 'Highly enthusiastic praise in public discourse.', pos: 'Verb' },
      { step: 4, label: 'Extreme', word: 'Eulogize / Venerate', nuance: 'Highest possible reverence; sacred or posthumous praise.', pos: 'Verb' }
    ],
    rule: 'Administrative judgment contexts mein judges decisions ko "commend" karte hain, jabki heroic sacrifice ko "extol" ya "venerate" kiya jata hai.'
  },
  {
    id: 'size',
    title: 'Magnitude & Proportions',
    description: 'Chhote se vishalkay dimensions tak ke exact scale terms.',
    levels: [
      { step: 1, label: 'Microscopic', word: 'Minute / Infinitesimal', nuance: 'Extremely small; barely perceptible to human eye.', pos: 'Adjective' },
      { step: 2, label: 'Small', word: 'Diminutive / Petite', nuance: 'Below standard physical stature or size.', pos: 'Adjective' },
      { step: 3, label: 'Large', word: 'Substantial / Sizable', nuance: 'Considerably large in quantity, degree, or volume.', pos: 'Adjective' },
      { step: 4, label: 'Colossal', word: 'Gargantuan / Immense', nuance: 'Massive, gigantic scale resembling mythological stature.', pos: 'Adjective' }
    ],
    rule: 'Statistical loss ke context mein "minute loss" opposite of "substantial loss" hota hai, "gargantuan" literary exaggeration ban sakta hai.'
  },
  {
    id: 'spending',
    title: 'Wealth Management (Tone Spectrum)',
    description: 'Insult se lekar praise tak ke evaluative valence shifts.',
    levels: [
      { step: 1, label: 'Extreme Negative', word: 'Miserly / Parsimonious', nuance: 'Unwilling to spend even on bare food or medicine (Greedy).', pos: 'Adjective' },
      { step: 2, label: 'Moderate Negative', word: 'Stingy / Close-fisted', nuance: 'Hesitant to part with money; lacking generosity.', pos: 'Adjective' },
      { step: 3, label: 'Golden Positive', word: 'Frugal / Economical', nuance: 'Sensible, disciplined, eliminating wasteful expenditure.', pos: 'Adjective' },
      { step: 4, label: 'Extreme Negative', word: 'Profligate / Extravagant', nuance: 'Recklessly squandering wealth without forethought.', pos: 'Adjective' }
    ],
    rule: 'Exam alert: "Frugal" is a compliment; "Miserly" is an insult. Do not treat them as synonyms in positive recommendation questions!'
  }
]

export default function MeaningSpectrumVisualizer() {
  const [selectedCatId, setSelectedCatId] = useState('anger')
  const [activeStep, setActiveStep] = useState(2)

  const currentCat = SPECTRUM_CATEGORIES.find((c) => c.id === selectedCatId) || SPECTRUM_CATEGORIES[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-100 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Visual 2 • Semantic Gradients</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Intensity & Degree Spectrum</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50 mt-1">
            Meaning Spectrum Visualizer: Semantic Intensity & Connotative Temperature
          </h3>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 text-xs">
          {SPECTRUM_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => { setSelectedCatId(cat.id); setActiveStep(2) }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                selectedCatId === cat.id
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-surface-600 dark:text-surface-300">
        {currentCat.description} Click on any intensity stage to inspect its precise semantic temperature.
      </p>

      {/* Visual Step Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
        {currentCat.levels.map((lvl) => {
          const isSelected = activeStep === lvl.step
          const intensityColor =
            lvl.step === 1
              ? 'border-blue-300 bg-blue-50/50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-100'
              : lvl.step === 2
              ? 'border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-100'
              : lvl.step === 3
              ? 'border-amber-300 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-100'
              : 'border-rose-400 bg-rose-50/50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-100'

          return (
            <button
              key={lvl.step}
              type="button"
              onClick={() => setActiveStep(lvl.step)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'ring-2 ring-primary-500 shadow-md scale-[1.02] bg-white dark:bg-surface-850'
                  : `${intensityColor} opacity-90 hover:opacity-100`
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[0.625rem] font-bold uppercase tracking-wider font-mono">
                    Level {lvl.step} • {lvl.label}
                  </span>
                  <Flame
                    size={14}
                    className={
                      lvl.step === 4
                        ? 'text-rose-600 animate-pulse'
                        : lvl.step === 3
                        ? 'text-amber-500'
                        : 'text-surface-400'
                    }
                  />
                </div>
                <h4 className="text-sm font-bold font-heading text-surface-900 dark:text-white">
                  {lvl.word}
                </h4>
              </div>
              <p className="text-[0.6875rem] text-surface-600 dark:text-surface-300 mt-2 leading-relaxed">
                {lvl.nuance}
              </p>
            </button>
          )
        })}
      </div>

      {/* Selected Stage Detail & Exam Golden Rule */}
      <div className="p-4 rounded-xl bg-primary-50/60 dark:bg-primary-950/30 border border-primary-200 dark:border-primary-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <span className="font-bold text-primary-900 dark:text-primary-200 block uppercase tracking-wider text-[0.6875rem]">
            High Court Precision Principle:
          </span>
          <p className="text-primary-800 dark:text-primary-300 leading-relaxed">
            {currentCat.rule}
          </p>
        </div>
        <Badge variant="primary" size="sm" className="shrink-0 self-start sm:self-auto">
          Degree Concord Mandatory
        </Badge>
      </div>
    </Card>
  )
}
