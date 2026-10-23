import { useState } from 'react'
import { Sparkles, Heart, CheckCircle2, AlertTriangle, Filter } from 'lucide-react'
import { Card, Badge } from '../../common'

const MATRIX_ITEMS = [
  {
    category: 'exclamatory',
    trigger: 'Hurrah! / Ha!',
    emotion: 'Joy / Celebration',
    reportingVerb: 'exclaimed with joy / delight that...',
    directExample: 'The team said, "Hurrah! We have won the championship!"',
    indirectExample: 'The team exclaimed with joy that they had won the championship.',
    intensifierRule: 'Interjection "Hurrah!" drop ho jata hai; conjunction "that" lagta hai; tense backshift hota hai.',
    trap: 'Examiner aksar contextually opposite emotion "exclaimed with sorrow" dekar distract karta hai.',
  },
  {
    category: 'exclamatory',
    trigger: 'Alas! / Ah!',
    emotion: 'Sorrow / Grief / Loss',
    reportingVerb: 'exclaimed with sorrow / grief that...',
    directExample: 'The clerk said, "Alas! The critical backup hard drive has crashed!"',
    indirectExample: 'The clerk exclaimed with sorrow that the critical backup hard drive had crashed.',
    intensifierRule: '"Alas!" drop ho jata hai; "that" conjunction lagta hai; Present Perfect ➔ Past Perfect.',
    trap: 'Option mein "Alas" ko sentence ke andar retain kar lena (*exclaimed with sorrow that alas...) blunder hai.',
  },
  {
    category: 'exclamatory',
    trigger: 'Bravo! / Well done!',
    emotion: 'Applause / High Praise',
    reportingVerb: 'applauded + object + saying that...',
    directExample: 'The judge said to the lawyer, "Bravo! You argued the writ petition exceptionally well!"',
    indirectExample: 'The judge applauded the lawyer saying that he had argued the writ petition exceptionally well.',
    intensifierRule: 'Formula: "applauded [object] saying that [subject] had + V3".',
    trap: 'Generic "said Bravo to" ya "exclaimed with joy to" likhna examination standard mein non-standard hai.',
  },
  {
    category: 'exclamatory',
    trigger: 'What a...! (with Noun)',
    emotion: 'Wonder / Surprise / Magnitude',
    reportingVerb: 'exclaimed that... [a great + Noun]',
    directExample: 'The lawyer said, "What a blunder you made in the affidavit!"',
    indirectExample: 'The lawyer exclaimed that he had made a great blunder in the affidavit.',
    intensifierRule: 'Nouns ke sath intensity express karne ke liye "great" lagta hai ("a great blunder / a great tragedy").',
    trap: '"What a blunder" ko indirect mein verbatim repeat karna galat hai; assertive form mein "great" lagayein.',
  },
  {
    category: 'exclamatory',
    trigger: 'How...! (with Adjective/Adverb)',
    emotion: 'Admiration / Wonder',
    reportingVerb: 'exclaimed that... [very + Adjective/Adverb]',
    directExample: 'She said, "How eloquently the senior counsel argued!"',
    indirectExample: 'She exclaimed with admiration that the senior counsel had argued very eloquently.',
    intensifierRule: 'Adjectives/Adverbs ke sath intensity express karne ke liye "very" lagta hai ("very eloquently").',
    trap: 'Inverted order retain karna (*exclaimed how eloquently had he argued) fatal error hai.',
  },
  {
    category: 'optative',
    trigger: 'May God...! (Divine Prayer)',
    emotion: 'Solemn Prayer to God',
    reportingVerb: 'prayed that God might + V1...',
    directExample: 'The elderly litigant said to the judge, "May God bless you with good health!"',
    indirectExample: 'The elderly litigant prayed that God might bless the judge with good health.',
    intensifierRule: '"May" backshift hokar "might" banega aur subject "God" ke BAAD shift hoga ("that God might bless").',
    trap: 'Inversion trap: "*prayed that might God bless...". Indirect mein subject pehle aur modal baad mein aayega.',
  },
  {
    category: 'optative',
    trigger: 'May you...! (Human Well-Wish)',
    emotion: 'Wish / Blessing for Success',
    reportingVerb: 'wished that + Subject + might + V1...',
    directExample: 'The mentor said to the apprentice, "May you achieve judicial excellence!"',
    indirectExample: 'The mentor wished that the apprentice might achieve judicial excellence.',
    intensifierRule: 'Human well-wishes ke liye reporting verb "wished" lagti hai; "May" ➔ "might".',
    trap: 'Unshifted "may" chhod dena (*wished that he may achieve) past reporting verb ke sath invalid hai.',
  },
  {
    category: 'optative',
    trigger: 'Farewell! / Good night!',
    emotion: 'Parting / Goodbyes',
    reportingVerb: 'bade + object + farewell / good night',
    directExample: 'The officer said to his colleagues, "Farewell, my friends!"',
    indirectExample: 'The officer bade his friends farewell.',
    intensifierRule: 'Parting ke liye verb "bid" ka past "bade" use hota hai. Yahan "that" clause nahi lagta.',
    trap: '"*He said farewell to" ya "*he prayed farewell" likhna colloquial blunder hai; "bade" standard hai.',
  },
]

export default function ExclamatoryOptativeMatrix() {
  const [filter, setFilter] = useState('all') // 'all' | 'exclamatory' | 'optative'
  const [selectedIdx, setSelectedIdx] = useState(0)

  const filteredItems = MATRIX_ITEMS.filter((item) => {
    if (filter === 'all') return true
    return item.category === filter
  })

  const current = filteredItems[selectedIdx] || filteredItems[0]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Engine 5</Badge>
            <span className="text-xs font-bold text-surface-500 dark:text-surface-400">Emotional Discourse Matrix</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50">
            Exclamatory & Optative Emotion-to-Reporting-Verb Concord Matrix
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-surface-500">
          <Heart size={14} className="text-rose-500" />
          <span>Interjections & Prayer Architecture</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <Filter size={14} className="text-surface-400 shrink-0" />
        <span className="text-xs font-bold text-surface-600 dark:text-surface-400">Filter By Mode:</span>
        <div className="flex items-center gap-1.5">
          {['all', 'exclamatory', 'optative'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => {
                setFilter(mode)
                setSelectedIdx(0)
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer capitalize ${
                filter === mode
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-750'
              }`}
            >
              {mode === 'all' ? 'All (8 Patterns)' : mode}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Triggers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {filteredItems.map((item, idx) => {
          const isSelected = idx === selectedIdx
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-primary-50 dark:bg-primary-950/70 text-primary-700 dark:text-primary-300 border-primary-300 dark:border-primary-600 shadow-xs'
                  : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300 border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-750'
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[0.625rem] uppercase font-semibold text-surface-400">
                  {item.category}
                </span>
                {isSelected && <Sparkles size={12} className="text-primary-600" />}
              </div>
              <div className="font-mono text-xs truncate">{item.trigger}</div>
              <div className="text-[0.6875rem] font-normal text-surface-500 truncate mt-0.5">
                {item.emotion}
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected Item Breakdown Box */}
      {current && (
        <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-surface-200 dark:border-surface-700">
            <div>
              <span className="text-xs font-bold text-surface-500 uppercase tracking-wider">Trigger Interjection:</span>
              <span className="font-mono font-extrabold text-sm text-primary-700 dark:text-primary-300 ml-2">
                {current.trigger}
              </span>
            </div>
            <Badge variant={current.category === 'optative' ? 'secondary' : 'primary'} size="sm">
              {current.emotion}
            </Badge>
          </div>

          <div className="space-y-1.5">
            <span className="text-[0.6875rem] font-bold text-surface-500 uppercase tracking-wider">Reporting Formula:</span>
            <div className="p-2.5 rounded-lg bg-primary-50/50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 font-mono text-xs font-bold text-primary-800 dark:text-primary-200">
              {current.reportingVerb}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-xs">
              <span className="text-[0.6875rem] font-bold text-surface-400 block mb-1">Direct Speech:</span>
              <span className="font-mono text-surface-800 dark:text-surface-200">{current.directExample}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-success-50/50 dark:bg-success-950/40 border border-success-200 dark:border-success-800 text-xs">
              <span className="text-[0.6875rem] font-bold text-success-700 dark:text-success-400 block mb-1">Indirect Speech:</span>
              <span className="font-mono font-bold text-success-900 dark:text-success-100">{current.indirectExample}</span>
            </div>
          </div>

          <div className="text-xs text-surface-600 dark:text-surface-300 pt-1 flex items-start gap-1.5">
            <CheckCircle2 size={13} className="text-success-600 shrink-0 mt-0.5" />
            <span><strong>Grammar Rule:</strong> {current.intensifierRule}</span>
          </div>
        </div>
      )}

      {/* Exam Distractor Callout */}
      {current && (
        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
          <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Exam Trap:</strong> {current.trap}
          </div>
        </div>
      )}
    </Card>
  )
}
