import { useState } from 'react'
import { Layers, Award, Sparkles } from 'lucide-react'
import { Card, Badge } from '../../common'

const DEGREES = [
  {
    id: 'positive',
    name: 'Positive Degree',
    levelBadge: 'Base Attribution (Level 1)',
    entities: '1 Entity (or Equality / Inequality between 2)',
    definition: 'Kisi quality ya characteristic ka basic unmodified form state karta hai bina directly superiority ya inferiority bataye.',
    formula: 'Subject + Verb + [as + Adjective + as / not as/so + Adjective + as]',
    example: 'Ravi is tall. / Suresh is as intelligent as Ramesh.',
    markers: ['as...as (equality)', 'not as/so...as (inequality)', 'base adjective'],
    scopeSummary: 'Quality maujood hai; superiority declare nahi hoti.',
    barHeight: 'h-24',
    barColor: 'bg-primary-500',
  },
  {
    id: 'comparative',
    name: 'Comparative Degree',
    levelBadge: 'Binary Comparison (Level 2)',
    entities: 'Strictly 2 Entities (or 2 Defined Groups / Qualities)',
    definition: 'Do entities ke beech kisi quality ka direct comparison karke ek ko greater ya lesser degree par establish karta hai.',
    formula: 'Subject 1 + Verb + [Adjective-er / more + Adjective] + THAN + Subject 2',
    example: 'Ravi is taller than Aman. / Iron is more useful than gold.',
    markers: ['-er suffix', 'more / less periphrastic', 'conjunction than'],
    scopeSummary: 'Entity A > Entity B (disparity established).',
    barHeight: 'h-36',
    barColor: 'bg-amber-500',
  },
  {
    id: 'superlative',
    name: 'Superlative Degree',
    levelBadge: 'Group Apex (Level 3)',
    entities: '3 or More Entities (Group N >= 3)',
    definition: 'Teen ya teen se zyada members ke defined group mein se highest ya lowest quality level wale apex member ko identify karta hai.',
    formula: 'Subject + Verb + THE + [Adjective-est / most + Adjective] + [in / of + Group]',
    example: 'Ravi is the tallest boy in the class. / Everest is the highest peak in the world.',
    markers: ['definite article THE', '-est suffix', 'most / least periphrastic', 'in/of group'],
    scopeSummary: 'Entity A is the ultimate apex of the defined group.',
    barHeight: 'h-48',
    barColor: 'bg-emerald-500',
  },
]

export default function DegreesRelationshipDiagram() {
  const [activeDegreeId, setActiveDegreeId] = useState('comparative')
  const activeDegree = DEGREES.find((d) => d.id === activeDegreeId) || DEGREES[1]

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 flex items-center justify-center font-bold">
            <Layers size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              The Three Degrees Hierarchy & Entity Scope
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-400">
              Entity count (1, 2, 3+) ke hisaab se degree ka functional scope aur grammatical limits
            </p>
          </div>
        </div>
        <Badge variant="primary" size="sm">Spatial Model 1</Badge>
      </div>

      {/* 3-Column Interactive Visual Scale */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-4">
        {DEGREES.map((deg) => {
          const isSelected = deg.id === activeDegreeId
          return (
            <div
              key={deg.id}
              onClick={() => setActiveDegreeId(deg.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-primary-500 bg-primary-50/30 dark:bg-primary-950/40 ring-2 ring-primary-500/20 shadow-md'
                  : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 hover:border-surface-300'
              }`}
            >
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-surface-500 dark:text-surface-400 font-mono">
                    {deg.levelBadge}
                  </span>
                  {isSelected && <Sparkles size={14} className="text-primary-600 dark:text-primary-400" />}
                </div>
                <h4 className="font-heading font-extrabold text-lg text-surface-900 dark:text-surface-100">
                  {deg.name}
                </h4>
                <p className="text-xs text-surface-600 dark:text-surface-300">
                  {deg.entities}
                </p>
              </div>

              {/* Graphic Scale Bar */}
              <div className="w-full bg-surface-100 dark:bg-surface-700/50 rounded-lg p-2 flex flex-col items-center justify-end">
                <div
                  className={`w-full rounded-md transition-all duration-300 flex items-center justify-center text-white text-xs font-bold font-mono ${deg.barHeight} ${deg.barColor}`}
                >
                  {deg.id.toUpperCase()}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Degree Detail Inspector */}
      <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center gap-2">
            <Award size={18} className="text-primary-600 dark:text-primary-400" />
            <span className="font-heading font-bold text-sm text-surface-900 dark:text-surface-100">
              {activeDegree.name} — Detailed Specifications
            </span>
          </div>
          <Badge variant="secondary" size="sm">{activeDegree.scopeSummary}</Badge>
        </div>

        <p className="text-xs text-surface-700 dark:text-surface-200 leading-relaxed">
          {activeDegree.definition}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1">
            <strong className="text-primary-700 dark:text-primary-300 font-mono block">
              Syntactic Formula:
            </strong>
            <p className="text-surface-800 dark:text-surface-200 font-mono text-[0.8125rem]">
              {activeDegree.formula}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1">
            <strong className="text-amber-700 dark:text-amber-300 font-mono block">
              Representative Sentences:
            </strong>
            <p className="text-surface-800 dark:text-surface-200 italic">
              {activeDegree.example}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="font-semibold text-surface-600 dark:text-surface-400">Key Markers:</span>
          {activeDegree.markers.map((m, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md bg-surface-200/60 dark:bg-surface-700 text-surface-800 dark:text-surface-200 font-mono text-[0.6875rem]"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </Card>
  )
}
