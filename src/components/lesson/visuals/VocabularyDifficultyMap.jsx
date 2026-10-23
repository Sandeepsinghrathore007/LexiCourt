import { useState } from 'react'
import { BarChart3 } from 'lucide-react'
import { Card, Badge } from '../../common'

const BANDS = [
  {
    level: 'Foundation',
    badge: 'secondary',
    description: 'High-frequency, direct, single-concept substitutions with unambiguous definitions.',
    targetAccuracy: '100% Mandatory',
    examRelevance: '35% of exam vocabulary items',
    exemplars: ['Optimist', 'Autobiography', 'Democracy', 'Aquarium', 'Novice', 'Annual', 'Quadruped', 'Plagiarism', 'Inevitable', 'Acquit'],
    strategy: 'Direct recall. Inme zero second-guessing honi chahiye; questions dekhte hi 5-8 seconds mein lock karein.'
  },
  {
    level: 'Intermediate',
    badge: 'primary',
    description: 'Frequently tested words with distinct limiting clauses and common distractor pairs.',
    targetAccuracy: '95%+ Precision',
    examRelevance: '50% of exam vocabulary items',
    exemplars: ['Agnostic', 'Polyglot', 'Egotist', 'Apiary', 'Aviary', 'Biannual', 'Biennial', 'Eulogy', 'Elegy', 'Mitigate', 'Abdicate', 'Immigrant'],
    strategy: 'Boundary verification. Near-synonyms ke beech limiting clue (e.g. binding decision, twice a year) ko double-check karein.'
  },
  {
    level: 'Advanced',
    badge: 'warning',
    description: 'Lookalikes, clinical conditions, subtle jurisdictional nuances aur context-dependent vocabulary.',
    targetAccuracy: '85%+ Mastery',
    examRelevance: '15% of exam vocabulary items',
    exemplars: ['Connoisseur', 'Iconoclast', 'Imminent vs Immanent', 'Absolve vs Acquit', 'Kleptomania', 'Persecute vs Prosecute', 'Antediluvian', 'Exacerbate'],
    strategy: 'Contextual elimination. Orthographic soundalikes aur medical/legal boundaries ko root word logic se dissect karein.'
  }
]

export default function VocabularyDifficultyMap() {
  const [activeBand, setActiveBand] = useState('Intermediate')
  const current = BANDS.find((b) => b.level === activeBand) || BANDS[1]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-200 dark:border-surface-700/80 pb-3">
        <div className="flex items-center gap-2">
          <BarChart3 size={18} className="text-primary-600 dark:text-primary-400" />
          <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
            Vocabulary Difficulty Map & High Court Preparation Hierarchy
          </h3>
        </div>
        <Badge variant="primary" size="sm">3-Tier Mastery Architecture</Badge>
      </div>

      {/* 3 Tier Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {BANDS.map((band) => {
          const isSelected = band.level === activeBand
          return (
            <button
              key={band.level}
              type="button"
              onClick={() => setActiveBand(band.level)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/50 shadow-xs ring-1 ring-primary-500/30'
                  : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 hover:border-primary-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-heading font-bold text-sm text-surface-900 dark:text-white">
                  Tier {band.level === 'Foundation' ? '1' : band.level === 'Intermediate' ? '2' : '3'}: {band.level}
                </span>
                <Badge variant={band.badge} size="sm">{band.targetAccuracy}</Badge>
              </div>
              <span className="text-[0.6875rem] text-surface-500 dark:text-surface-400">
                {band.examRelevance}
              </span>
            </button>
          )
        })}
      </div>

      {/* Detailed Tier Card */}
      <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50/50 dark:bg-surface-850 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-white">
            {current.level} Vocabulary Characteristics & Strategic Focus
          </h4>
          <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
            Target: {current.targetAccuracy}
          </span>
        </div>

        <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed">
          {current.description}
        </p>

        <div className="p-3 rounded-lg bg-white dark:bg-surface-800 border border-surface-200/80 dark:border-surface-700 text-xs space-y-1">
          <strong className="text-primary-700 dark:text-primary-400 block font-heading">
            Recommended Exam Strategy:
          </strong>
          <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
            {current.strategy}
          </p>
        </div>

        <div>
          <span className="text-[0.625rem] font-bold uppercase tracking-wider text-surface-400 block mb-1.5">
            Key Exam Exemplars in {current.level} Tier:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {current.exemplars.map((w) => (
              <span
                key={w}
                className="px-2 py-0.5 rounded bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-xs font-mono font-medium text-surface-800 dark:text-surface-200"
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
