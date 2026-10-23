import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Card, Badge } from '../../common'

const EXCLAMATION_PRESETS = [
  {
    id: 'how-adj',
    type: 'How + Adjective',
    exclamatory: 'How melodious the singer\'s voice was!',
    focusWord: 'melodious',
    wordType: 'Adjective',
    rule: 'Adjective ke aage modifying adverb "very" lagta hai.',
    intensifierUsed: 'very',
    subjectVerb: 'The singer\'s voice was...',
    assertive: 'The singer\'s voice was very melodious.',
    trapAlert: 'Punctuation check: End ka exclamation mark (!) drop hokar full stop (.) lagega.',
  },
  {
    id: 'what-noun',
    type: 'What a + Qualifying Noun',
    exclamatory: 'What a fool the clerk made of himself!',
    focusWord: 'fool',
    wordType: 'Direct Noun',
    rule: 'Direct noun ke aage adverb "very" nahi lagta; descriptive adjective "great" lagta hai.',
    intensifierUsed: 'a great',
    subjectVerb: 'The clerk made of himself...',
    assertive: 'The clerk made a great fool of himself.',
    trapAlert: 'DO NOT say "*a very fool" (adverbs cannot directly modify nouns!).',
  },
  {
    id: 'what-tragedy',
    type: 'What a + Noun of Magnitude',
    exclamatory: 'What a disaster the sudden fire in the registry was!',
    focusWord: 'disaster',
    wordType: 'Noun of Magnitude',
    rule: 'Magnitude/catastrophe nouns ke sath "terrible" ya "great" intensify karta hai.',
    intensifierUsed: 'a terrible',
    subjectVerb: 'The sudden fire in the registry was...',
    assertive: 'The sudden fire in the registry was a terrible disaster.',
    trapAlert: 'Never use "*a very disaster". Choose "terrible" or "dreadful".',
  },
  {
    id: 'interjection-joy',
    type: 'Interjection (Joy)',
    exclamatory: 'Hurrah! We won the High Court moot court trophy.',
    focusWord: 'Hurrah!',
    wordType: 'Joy Interjection',
    rule: 'Interjection "Hurrah!" assertive clause "It is a matter of great joy that..." mein badalta hai.',
    intensifierUsed: 'It is a matter of great joy that',
    subjectVerb: 'we won the High Court moot court trophy.',
    assertive: 'It is a matter of great joy that we won the High Court moot court trophy.',
    trapAlert: 'Emotion check: Interjection ka primary emotion identify karein (Hurrah ➔ joy, Alas ➔ sorrow).',
  },
  {
    id: 'wish-if-only',
    type: 'Unfulfilled Wish',
    exclamatory: 'If only I had verified the serial number yesterday!',
    focusWord: 'If only',
    wordType: 'Optative Desire Marker',
    rule: '"If only" ko assertive desire clause "I earnestly wish that..." mein convert kiya jata hai.',
    intensifierUsed: 'I earnestly wish that',
    subjectVerb: 'I had verified the serial number yesterday.',
    assertive: 'I earnestly wish that I had verified the serial number yesterday.',
    trapAlert: 'Subjunctive/past perfect "had verified" tense strictly intact rehna chahiye.',
  },
]

export default function ExclamatoryAssertiveConverter() {
  const [activePresetId, setActivePresetId] = useState('how-adj')
  const current = EXCLAMATION_PRESETS.find((p) => p.id === activePresetId) || EXCLAMATION_PRESETS[0]

  return (
    <Card variant="default" padding="lg" className="border-primary-200 dark:border-surface-700 shadow-sm space-y-5 select-none">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Spatial Model 5</Badge>
            <span className="text-xs font-semibold text-surface-500 dark:text-surface-400">
              Intensifier Collocation Engine
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-heading text-surface-900 dark:text-surface-50">
            Exclamatory-to-Assertive Transformation Engine
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300 mt-0.5 max-w-[80ch]">
            Adjective ke sath "very" vs Noun ke sath "great/terrible" intensifier selection matrix ko visually samjhein.
          </p>
        </div>
      </div>

      {/* Exclamation Presets */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
        {EXCLAMATION_PRESETS.map((p) => {
          const isActive = p.id === activePresetId
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePresetId(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs border border-surface-200 dark:border-surface-700'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 hover:bg-surface-200/50 dark:hover:bg-surface-700/50'
              }`}
            >
              {p.type}
            </button>
          )
        })}
      </div>

      {/* Transformation Display Box */}
      <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-4">
        {/* Source Exclamatory Statement */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-1.5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[0.6875rem] font-bold text-surface-500 uppercase tracking-wider">
              Original Exclamatory Structure (!)
            </span>
            <Badge variant="neutral" size="sm">
              Emotional Inversion
            </Badge>
          </div>
          <p className="font-mono text-sm font-bold text-primary-700 dark:text-primary-300">
            "{current.exclamatory}"
          </p>
        </div>

        {/* 3-Part Syntactic Dissection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-1 text-xs">
            <span className="text-[0.6875rem] font-bold text-surface-400 uppercase tracking-wider block">
              1. Focus Word & Category
            </span>
            <p className="font-mono font-bold text-surface-900 dark:text-surface-100">
              "{current.focusWord}" ({current.wordType})
            </p>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-1 text-xs">
            <span className="text-[0.6875rem] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider block">
              2. Selected Intensifier
            </span>
            <p className="font-mono font-bold text-primary-700 dark:text-primary-300">
              {current.intensifierUsed}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-1 text-xs">
            <span className="text-[0.6875rem] font-bold text-surface-400 uppercase tracking-wider block">
              3. Subject-Verb Shift
            </span>
            <p className="font-mono text-[0.6875rem] text-surface-700 dark:text-surface-300">
              Shifted to start of sentence (.)
            </p>
          </div>
        </div>

        {/* Rule Rationale Note */}
        <div className="p-3 rounded-lg bg-primary-50/50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 text-xs">
          <strong className="text-primary-900 dark:text-primary-200 block mb-0.5 font-bold">
            Intensifier Collocation Rule:
          </strong>
          <span className="text-surface-700 dark:text-surface-300 leading-relaxed">
            {current.rule}
          </span>
        </div>

        {/* Transformed Assertive Sentence */}
        <div className="p-3.5 rounded-xl bg-success-50/50 dark:bg-success-950/30 border border-success-200 dark:border-success-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[0.6875rem] uppercase tracking-wider font-bold text-success-800 dark:text-success-300 block mb-0.5">
              Transformed Assertive Statement (.)
            </span>
            <p className="font-mono text-sm font-bold text-success-900 dark:text-success-100">
              "{current.assertive}"
            </p>
          </div>
          <Badge variant="success" size="sm">
            Valid Assertive Equivalent
          </Badge>
        </div>

        {/* Trap Alert */}
        <div className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200">
          <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Examiner Distractor Trap:</strong>
            <span>{current.trapAlert}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
