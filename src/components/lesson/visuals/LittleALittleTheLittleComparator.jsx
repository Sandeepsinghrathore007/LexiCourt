import { useState } from 'react'
import { Droplet } from 'lucide-react'
import { Card, Badge } from '../../common'

const LITTLE_DATA = [
  {
    id: 'little',
    title: 'LITTLE (Negative Scarcity)',
    formula: 'Little + Uncountable Noun',
    meaning: 'Almost none / Practically zero (lagbhag shunya matra)',
    tone: 'Negative Tone — focuses on extreme insufficiency and hopelessness',
    levelPct: 5,
    glassLabel: 'Near Empty (Dry)',
    color: 'bg-error-500',
    example: 'There was little hope of the patient’s recovery, so the family prepared for the worst.',
    explanation: 'Ummeed lagbhag na ke barabar thi. Consequence clause "prepared for the worst" ye prove karta hai ki quantity hopeless (negative) thi.',
    testClue: 'Look for defeatist or crisis words: "failed", "died", "impossible", "hopeless", "prepared for the worst".'
  },
  {
    id: 'a-little',
    title: 'A LITTLE (Positive Modest Amount)',
    formula: 'A little + Uncountable Noun',
    meaning: 'Some amount / A small quantity (thodi matra maujood hai)',
    tone: 'Positive Tone — focuses on existence, modesty, and potential solution',
    levelPct: 35,
    glassLabel: 'Partially Filled',
    color: 'bg-success-500',
    example: 'With a little patience and tact, the registrar amicably resolved the dispute.',
    explanation: 'Thoda sa dherya aur samajhdari kaam aayi aur vivad solve ho gaya. Positive outcome ke liye "a little" zaroori hai.',
    testClue: 'Look for encouraging or progressive words: "resolved", "helped", "managed to", "fortunately", "a little knowledge".'
  },
  {
    id: 'the-little',
    title: 'THE LITTLE (Specific Exhaustive Scope)',
    formula: 'The little + Uncountable Noun + Defining Relative Clause',
    meaning: 'All of that small amount (wo thodi si matra jo bachi thi, wo poori)',
    tone: 'Specific Scope — encompasses 100% of the small amount available',
    levelPct: 100,
    glassLabel: 'Whole Specific Amount',
    color: 'bg-primary-500',
    example: 'The thirsty traveller drank the little water that remained in the flask.',
    explanation: 'Flask mein paani thoda hi tha, lekin traveller ne wo pura ka pura pee liya jo wahan bacha hua tha (exhaustive consumption).',
    testClue: 'Look for specifying clauses immediately following the noun: "that was left", "that remained", "he had saved".'
  }
]

export default function LittleALittleTheLittleComparator() {
  const [activeId, setActiveId] = useState('little')
  const activeItem = LITTLE_DATA.find((item) => item.id === activeId) || LITTLE_DATA[0]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 flex items-center justify-center">
            <Droplet size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Interactive Little, A Little & The Little Liquid Container Model
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-300">
              Uncountable quantifiers: Visualizing the liquid level shift from near-dry to modest to exhaustive.
            </p>
          </div>
        </div>
        <Badge variant="primary" size="sm">Uncountable Only</Badge>
      </div>

      {/* Switcher Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {LITTLE_DATA.map((item) => {
          const isSelected = item.id === activeId
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-primary-500 bg-primary-50/40 dark:bg-primary-950/40 shadow-xs'
                  : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-850 hover:bg-surface-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-heading font-bold text-surface-900 dark:text-surface-50">
                  {item.title.split(' ')[0]} {item.title.split(' ')[1] || ''}
                </span>
                <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
              </div>
              <p className="text-[0.6875rem] text-surface-500 dark:text-surface-400 line-clamp-1">
                {item.meaning.split('(')[0]}
              </p>
            </button>
          )
        })}
      </div>

      {/* Container Visualization & Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
        {/* Left: Interactive Liquid Beaker */}
        <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-surface-850 rounded-xl border border-surface-200 dark:border-surface-700 space-y-2">
          <span className="text-[0.6875rem] font-bold text-surface-400 uppercase">Liquid Volume Gauge</span>
          <div className="w-20 h-36 border-2 border-surface-400 dark:border-surface-600 rounded-b-2xl relative overflow-hidden bg-surface-100 dark:bg-surface-800 flex flex-col justify-end p-1">
            <div
              className={`w-full rounded-b-xl transition-all duration-500 ${activeItem.color}`}
              style={{ height: `${activeItem.levelPct}%` }}
            />
          </div>
          <span className="text-xs font-bold text-surface-800 dark:text-surface-200 font-mono">
            {activeItem.glassLabel}
          </span>
        </div>

        {/* Right 2 columns: Semantic & Grammar Analysis */}
        <div className="md:col-span-2 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-white dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-1">
              <span className="text-[0.6875rem] font-bold text-surface-400 uppercase">Semantic Valuation</span>
              <p className="text-xs font-bold text-surface-900 dark:text-surface-100">
                {activeItem.meaning}
              </p>
              <p className="text-[0.6875rem] text-surface-600 dark:text-surface-300">
                {activeItem.tone}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-1">
              <span className="text-[0.6875rem] font-bold text-surface-400 uppercase">Exam Pattern & Clues</span>
              <p className="text-xs font-mono font-bold text-teal-700 dark:text-teal-300">
                {activeItem.formula}
              </p>
              <p className="text-[0.6875rem] text-surface-600 dark:text-surface-300">
                {activeItem.testClue}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-1">
            <span className="text-[0.6875rem] font-bold text-surface-400 uppercase">Annotated Example:</span>
            <p className="text-xs font-medium text-surface-900 dark:text-surface-50 italic">
              "{activeItem.example}"
            </p>
            <p className="text-xs text-surface-600 dark:text-surface-300 border-t border-surface-100 dark:border-surface-750 pt-1">
              <strong className="text-surface-800 dark:text-surface-200 font-heading">Cognitive Reasoning: </strong>
              {activeItem.explanation}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
