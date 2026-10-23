import { useState } from 'react'
import { BookOpen, Sparkles } from 'lucide-react'
import { Card, Badge } from '../../common'

const CLASSIFICATIONS = [
  {
    id: 'assertive',
    title: 'Assertive / Declarative',
    subtitle: 'Statements of fact, opinion, or universal truths',
    punctuation: 'Full Stop (.)',
    polarity: 'Affirmative & Negative',
    primaryPurpose: 'Kisi information, thought, belief ya factual statement ko communicate karna.',
    examples: [
      {
        type: 'Affirmative',
        text: 'The High Court upholds constitutional validity.',
        breakdown: 'Subject (The High Court) + Verb (upholds) + Object (constitutional validity). No negative words.',
      },
      {
        type: 'Negative',
        text: 'The High Court does not violate constitutional validity.',
        breakdown: 'Subject + Auxiliary + NOT + Opposite Verb. Meaning remains 100% same as affirmative.',
      },
    ],
    transformationNote: 'Assertive sentences ko Interrogative mein badalte waqt Golden Polarity Law follow hota hai (Positive ➔ Negative Question).',
  },
  {
    id: 'interrogative',
    title: 'Interrogative',
    subtitle: 'Inquiries, questions, and rhetorical assertions',
    punctuation: 'Question Mark (?)',
    polarity: 'Inverted Auxiliaries (Positive / Negative)',
    primaryPurpose: 'Information maangna (genuine) ya statement ko dramatic emphasis ke sath assert karna (rhetorical).',
    examples: [
      {
        type: 'Information Query',
        text: 'When will the bench deliver the reserved judgment?',
        breakdown: 'Wh-word + Auxiliary (will) + Subject (the bench) + Main Verb (deliver). Genuine inquiry for facts.',
      },
      {
        type: 'Rhetorical Assertion',
        text: 'Does truth not always triumph in the end?',
        breakdown: 'Auxiliary (Does) + Subject (truth) + NOT + Main Verb. Implies emphatic assertion: "Truth always triumphs."',
      },
    ],
    transformationNote: 'Rhetorical questions assertive statements ke barabar hote hain kyunki unka obvious answer sabko pata hota hai.',
  },
  {
    id: 'exclamatory',
    title: 'Exclamatory',
    subtitle: 'Outburst of sudden emotion, surprise, or admiration',
    punctuation: 'Exclamation Mark (!)',
    polarity: 'Fronted Intensifiers ("What a", "How", Interjections)',
    primaryPurpose: 'Speaker ki sudden feeling (joy, sorrow, admiration, wonder, regret) ko intensely express karna.',
    examples: [
      {
        type: 'Adjective Focus ("How")',
        text: 'How prompt the registry was in issuing the notice!',
        breakdown: 'How + Adjective (prompt) + Subject (the registry) + Verb (was)! Ends with exclamation mark.',
      },
      {
        type: 'Noun Focus ("What a")',
        text: 'What a magnificent verdict the Chief Justice delivered!',
        breakdown: 'What a + Adjective + Noun (verdict) + Subject + Verb! Expresses immense admiration.',
      },
    ],
    transformationNote: 'Assertive mein convert karte waqt emotional marker drop hokar appropriate intensifier ("very", "great") lagta hai.',
  },
  {
    id: 'imperative',
    title: 'Imperative',
    subtitle: 'Commands, requests, advice, and legal prohibitions',
    punctuation: 'Full Stop (.)',
    polarity: 'Base Verb V1 / Do not + V1 (Subject "You" implied)',
    primaryPurpose: 'Listener ko action perform karne ya refrain karne ka nirdesh dena.',
    examples: [
      {
        type: 'Command / Instruction',
        text: 'Maintain strict silence inside the court hall.',
        breakdown: 'Base Verb (Maintain) + Object. Subject "(You)" is grammatically unexpressed.',
      },
      {
        type: 'Prohibition',
        text: 'Do not cross the bar without permission.',
        breakdown: 'Negative Imperative: Do not + Base Verb (cross). Handled in Voice and Narration.',
      },
    ],
    transformationNote: 'Imperatives primary focus Voice (Lesson 05) aur Narration (Lesson 07) mein hote hain; L08 mein core focus Assertive, Negative, Interrogative & Exclamatory par hai.',
  },
]

export default function SentenceClassificationMap() {
  const [activeId, setActiveId] = useState('assertive')
  const activeClass = CLASSIFICATIONS.find((c) => c.id === activeId) || CLASSIFICATIONS[0]

  return (
    <Card variant="default" padding="lg" className="border-primary-200 dark:border-surface-700 shadow-sm space-y-5 select-none">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Spatial Model 1</Badge>
            <span className="text-xs font-semibold text-surface-500 dark:text-surface-400">
              Functional & Structural Classification
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-heading text-surface-900 dark:text-surface-50">
            Sentence-Form Classification & Polarity Map
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300 mt-0.5 max-w-[80ch]">
            Chaar core sentence structures ke form, punctuation, polarity aur communicative function ko compare karein.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {CLASSIFICATIONS.map((c) => {
          const isActive = c.id === activeId
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveId(c.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-950/70 border-primary-400 dark:border-primary-500 shadow-xs ring-2 ring-primary-500/20'
                  : 'bg-white dark:bg-surface-800/80 border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${isActive ? 'text-primary-800 dark:text-primary-200' : 'text-surface-800 dark:text-surface-200'}`}>
                  {c.title}
                </span>
                <span className="text-[0.6875rem] font-mono px-1.5 py-0.5 rounded bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 font-bold">
                  {c.punctuation.split(' ')[0]}
                </span>
              </div>
              <p className="text-[0.6875rem] text-surface-500 dark:text-surface-400 line-clamp-1">
                {c.subtitle}
              </p>
            </button>
          )
        })}
      </div>

      {/* Selected Category Deep Dive Panel */}
      <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-4">
        {/* Quick Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-2.5 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-xs">
            <span className="text-[0.6875rem] font-bold text-surface-400 dark:text-surface-400 uppercase tracking-wider block mb-0.5">
              Punctuation Rule
            </span>
            <span className="font-bold text-primary-700 dark:text-primary-300 font-mono text-sm">
              {activeClass.punctuation}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-xs">
            <span className="text-[0.6875rem] font-bold text-surface-400 dark:text-surface-400 uppercase tracking-wider block mb-0.5">
              Polarity Range
            </span>
            <span className="font-bold text-surface-800 dark:text-surface-100">
              {activeClass.polarity}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-xs">
            <span className="text-[0.6875rem] font-bold text-surface-400 dark:text-surface-400 uppercase tracking-wider block mb-0.5">
              Core Purpose
            </span>
            <span className="text-surface-700 dark:text-surface-300 leading-snug">
              {activeClass.primaryPurpose}
            </span>
          </div>
        </div>

        {/* Real Examples Breakdown */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-surface-700 dark:text-surface-300 flex items-center gap-1.5">
            <BookOpen size={14} className="text-primary-600 dark:text-primary-400" />
            Syntactic Examples & Structural Dissection:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeClass.examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-1.5 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <Badge variant={idx === 0 ? 'primary' : 'neutral'} size="sm">
                    {ex.type}
                  </Badge>
                </div>
                <p className="text-xs font-bold font-mono text-surface-900 dark:text-surface-100">
                  "{ex.text}"
                </p>
                <p className="text-[0.6875rem] text-surface-600 dark:text-surface-300 leading-relaxed">
                  {ex.breakdown}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Transformation Takeaway Callout */}
        <div className="p-3 rounded-lg bg-primary-50/50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 flex items-start gap-2.5 text-xs">
          <Sparkles size={16} className="text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-primary-900 dark:text-primary-200 block mb-0.5 font-bold">
              Transformation Takeaway:
            </strong>
            <span className="text-surface-700 dark:text-surface-300 leading-relaxed">
              {activeClass.transformationNote}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
