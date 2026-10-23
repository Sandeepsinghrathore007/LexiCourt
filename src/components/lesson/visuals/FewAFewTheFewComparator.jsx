import { useState } from 'react'
import { Users } from 'lucide-react'
import { Card, Badge } from '../../common'

const COMPARISON_DATA = [
  {
    id: 'few',
    title: 'FEW (Negative Implication)',
    formula: 'Few + Plural Countable Noun',
    meaning: 'Almost none / Hardly any (na ke barabar sankhya)',
    tone: 'Negative Tone — focuses on deficit, lack, or shortage',
    percentage: 8,
    color: 'bg-error-500',
    example: 'He has few friends in the city, so he feels lonely and depressed.',
    explanation: 'Dost itne kam hain ki lagbhag na ke barabar hain. Isliye result clause mein "lonely and depressed" aana justify hota hai.',
    testClue: 'Look for words expressing sorrow, loneliness, failure, or deficit: "lonely", "disappointed", "complained", "failed".'
  },
  {
    id: 'a-few',
    title: 'A FEW (Positive Implication)',
    formula: 'A few + Plural Countable Noun',
    meaning: 'Some / A small number (thodi sankhya available hai)',
    tone: 'Positive Tone — focuses on availability, existence, or adequacy',
    percentage: 35,
    color: 'bg-success-500',
    example: 'Although he is new to Jaipur, he has a few friends who regularly help him.',
    explanation: 'Dost chahe kam hon, lekin kuch dost maujood hain jo zaroorat padne par madad karte hain (support system exists).',
    testClue: 'Look for words expressing satisfaction, gratitude, assistance, or relief: "helped him", "thanked", "pleased", "survived".'
  },
  {
    id: 'the-few',
    title: 'THE FEW (Specific & Exhaustive)',
    formula: 'The few + Plural Countable Noun + Defining Relative Clause',
    meaning: 'All of that small number (wo thode se jo the, aur wo saare ke saare)',
    tone: 'Specific / Inclusive Tone — covers 100% of the small identified group',
    percentage: 100,
    color: 'bg-primary-500',
    example: 'The few books the poor student possessed were destroyed in the fire.',
    explanation: 'Kitabein sankhya mein kam thi (small number), lekin wo saari ki saari jo uske paas thi wo aag mein jal gayi.',
    testClue: 'Look for qualifying clauses right after the noun: "that he had", "which were present", "he possessed", "who attended".'
  }
]

export default function FewAFewTheFewComparator() {
  const [activeId, setActiveId] = useState('few')
  const activeItem = COMPARISON_DATA.find((c) => c.id === activeId) || COMPARISON_DATA[0]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center">
            <Users size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Interactive Few, A Few & The Few Visual Comparator
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-300">
              Plural countable quantifiers: Visualizing the semantic shift from deficit to existence to exhaustion.
            </p>
          </div>
        </div>
        <Badge variant="primary" size="sm">Plural Countable Only</Badge>
      </div>

      {/* Switcher Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {COMPARISON_DATA.map((item) => {
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

      {/* Visual Meter & Details Card */}
      <div className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 space-y-4">
        {/* Quantity Meter */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-surface-700 dark:text-surface-300">
              Effective Availability Spectrum:
            </span>
            <span className="font-mono font-bold text-surface-900 dark:text-surface-100">
              {activeItem.id === 'few'
                ? '5% — Deficit (Almost None)'
                : activeItem.id === 'a-few'
                ? '35% — Adequate (Some available)'
                : '100% — Specific All (Every single one of that small group)'}
            </span>
          </div>
          <div className="w-full h-3.5 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${activeItem.color}`}
              style={{ width: `${activeItem.percentage}%` }}
            />
          </div>
        </div>

        {/* Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-white dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-1">
            <span className="text-[0.6875rem] font-bold text-surface-400 uppercase">Semantic Meaning & Tone</span>
            <p className="text-xs font-semibold text-surface-800 dark:text-surface-100">
              {activeItem.meaning}
            </p>
            <p className="text-[0.6875rem] text-surface-600 dark:text-surface-300">
              {activeItem.tone}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-1">
            <span className="text-[0.6875rem] font-bold text-surface-400 uppercase">Examination Clue Formula</span>
            <p className="text-xs font-mono font-bold text-primary-700 dark:text-primary-300">
              {activeItem.formula}
            </p>
            <p className="text-[0.6875rem] text-surface-600 dark:text-surface-300">
              {activeItem.testClue}
            </p>
          </div>
        </div>

        {/* Contextual Sentence Box */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-1.5">
          <span className="text-[0.6875rem] font-bold text-surface-400 uppercase">Annotated Exam Example:</span>
          <p className="text-xs font-medium text-surface-900 dark:text-surface-50 italic">
            "{activeItem.example}"
          </p>
          <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed border-t border-surface-100 dark:border-surface-750 pt-1.5">
            <strong className="text-surface-800 dark:text-surface-200 font-heading">Cognitive Reasoning: </strong>
            {activeItem.explanation}
          </p>
        </div>
      </div>
    </Card>
  )
}
