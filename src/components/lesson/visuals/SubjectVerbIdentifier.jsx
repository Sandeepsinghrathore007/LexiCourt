import { useState } from 'react'
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { Card, Badge } from '../../common'

const EXAMPLES = [
  {
    id: 'ex-1',
    label: 'Prepositional Complement',
    sentence: 'The quality of these newly procured computer monitors is exceptionally high.',
    headNoun: 'The quality',
    headNumber: 'Singular',
    interveningPhrase: 'of these newly procured computer monitors',
    interveningRole: 'Prepositional Modifier (Object: monitors [Plural])',
    verb: 'is',
    verbNumber: 'Singular',
    explanation: 'Sentence ka true subject "The quality" (singular) hai. Preposition "of" ke baad aane wala plural noun "monitors" preposition ka object hai. Verb strictly "is" aayegi.'
  },
  {
    id: 'ex-2',
    label: 'Parenthetical "Along with"',
    sentence: 'The Chief Justice, along with three senior judges, has arrived at the convention hall.',
    headNoun: 'The Chief Justice',
    headNumber: 'Singular',
    interveningPhrase: ', along with three senior judges,',
    interveningRole: 'Parenthetical Connective (First Subject Rule)',
    verb: 'has arrived',
    verbNumber: 'Singular',
    explanation: '"Along with" coordinating conjunction nahi hai. Ye parenthetical phrase hai. Agreement strictly First Subject ("The Chief Justice" [singular]) se hota hai.'
  },
  {
    id: 'ex-3',
    label: 'Plural Head with Singular Complement',
    sentence: 'The members of the high-level judicial commission were fully convinced.',
    headNoun: 'The members',
    headNumber: 'Plural',
    interveningPhrase: 'of the high-level judicial commission',
    interveningRole: 'Prepositional Modifier (Object: commission [Singular])',
    verb: 'were',
    verbNumber: 'Plural',
    explanation: 'Head noun "members" (plural) hai. "Commission" singular hone ke bavajood verb ko alter nahi kar sakta. Plural verb "were" sahi hai.'
  },
  {
    id: 'ex-4',
    label: 'Inverted Construction ("There")',
    sentence: 'There are five critical discrepancies identified in the official chargesheet.',
    headNoun: 'five critical discrepancies',
    headNumber: 'Plural',
    interveningPhrase: 'There [Dummy Introductory Adverb]',
    interveningRole: 'Placeholder Adverb (Verb precedes subject)',
    verb: 'are',
    verbNumber: 'Plural',
    explanation: '"There" subject nahi hai. True subject verb ke theek baad aane wala noun phrase "five critical discrepancies" (plural) hai. Isliye "are" aayega.'
  }
]

export default function SubjectVerbIdentifier() {
  const [activeId, setActiveId] = useState('ex-1')
  const [stripIntervening, setStripIntervening] = useState(true)

  const activeExample = EXAMPLES.find((e) => e.id === activeId) || EXAMPLES[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Engine 1</Badge>
            <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
              Interactive Subject-Verb Dissection
            </span>
          </div>
          <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
            Head Noun Isolation & Distractor Stripper
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300 mt-0.5">
            Sentence mein se intervening prepositional phrases aur parenthetical connectives ko filter karke true subject identify karein.
          </p>
        </div>

        {/* Toggle Stripper Button */}
        <button
          type="button"
          onClick={() => setStripIntervening((prev) => !prev)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary-100 dark:bg-primary-900/60 text-primary-800 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors cursor-pointer"
        >
          {stripIntervening ? <EyeOff size={14} /> : <Eye size={14} />}
          <span>{stripIntervening ? 'Hide Distractor (Stripped Mode)' : 'Show Full Sentence'}</span>
        </button>
      </div>

      {/* Tab Selector */}
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex.id}
            type="button"
            onClick={() => setActiveId(ex.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeId === ex.id
                ? 'bg-primary-600 text-white shadow-xs'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
            }`}
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Sentence Visual Breakdown Stage */}
      <div className="p-6 rounded-2xl bg-surface-50 dark:bg-surface-900/90 border border-surface-200 dark:border-surface-700 space-y-6">
        {/* Rendered Sentence */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-surface-500 dark:text-surface-400">
            Interactive Syntax Dissection:
          </span>
          <div className="text-base md:text-lg font-heading leading-relaxed text-surface-900 dark:text-surface-100 p-4 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-xs">
            <span className="px-2 py-1 rounded bg-primary-100 dark:bg-primary-900/80 text-primary-800 dark:text-primary-200 font-bold border border-primary-300 dark:border-primary-600">
              {activeExample.headNoun}
            </span>{' '}
            <span
              className={`px-2 py-1 rounded transition-all duration-200 ${
                stripIntervening
                  ? 'bg-surface-200/50 dark:bg-surface-700/50 text-surface-400 dark:text-surface-500 line-through opacity-60'
                  : 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-600'
              }`}
            >
              {activeExample.interveningPhrase}
            </span>{' '}
            <span className="px-2 py-1 rounded bg-success-100 dark:bg-success-950/80 text-success-800 dark:text-success-200 font-bold border border-success-300 dark:border-success-600">
              {activeExample.verb}
            </span>{' '}
            <span>
              {activeExample.sentence.replace(
                `${activeExample.headNoun} ${activeExample.interveningPhrase} ${activeExample.verb} `,
                ''
              ).replace(
                `${activeExample.interveningPhrase} ${activeExample.verb} ${activeExample.headNoun} `,
                ''
              )}
            </span>
          </div>
        </div>

        {/* Component Analysis Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-primary-50/60 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 space-y-1">
            <span className="text-[0.6875rem] font-bold text-primary-700 dark:text-primary-300 uppercase">
              1. Grammatical Head Noun
            </span>
            <p className="text-sm font-bold text-primary-900 dark:text-primary-100">
              {activeExample.headNoun}
            </p>
            <Badge variant="primary" size="sm">Number: {activeExample.headNumber}</Badge>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-1">
            <span className="text-[0.6875rem] font-bold text-amber-700 dark:text-amber-300 uppercase">
              2. Intervening Distractor
            </span>
            <p className="text-xs font-semibold text-amber-900 dark:text-amber-100 truncate">
              {activeExample.interveningPhrase}
            </p>
            <Badge variant="neutral" size="sm">{activeExample.interveningRole}</Badge>
          </div>

          <div className="p-3 rounded-xl bg-success-50/60 dark:bg-success-950/40 border border-success-200 dark:border-success-800 space-y-1">
            <span className="text-[0.6875rem] font-bold text-success-700 dark:text-success-300 uppercase">
              3. Governed Finite Verb
            </span>
            <p className="text-sm font-bold text-success-900 dark:text-success-100">
              {activeExample.verb}
            </p>
            <Badge variant="success" size="sm">Agreed Concord: {activeExample.verbNumber}</Badge>
          </div>
        </div>

        {/* Roman Hinglish Pedagogical Rationale */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 flex items-start gap-3">
          <CheckCircle2 size={18} className="text-success-600 dark:text-success-400 shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-surface-700 dark:text-surface-200 leading-relaxed">
            <strong>Diagnostic Takeaway:</strong> {activeExample.explanation}
          </p>
        </div>
      </div>
    </Card>
  )
}
