import { useState } from 'react'
import { Hash, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react'
import { Card, Badge } from '../../common'

const PREFIX_RULES = [
  {
    prefix: 'un-',
    rule: 'Most productive Germanic prefix for adjectives and participles.',
    examples: ['Unbiased', 'Unjust', 'Unambiguous', 'Unprecedented'],
    exception: 'Usually attaches to native Germanic bases, but extends to Latinate roots freely.'
  },
  {
    prefix: 'in-',
    rule: 'Attaches to Latinate roots. Changes phonetically based on initial consonant.',
    examples: ['Infallible', 'Inadvertent', 'Innocuous', 'Incorrigible'],
    exception: 'Phonetic assimilations: im- before p/b/m; il- before l; ir- before r.'
  },
  {
    prefix: 'im-',
    rule: 'Phonetic variant of in- before bilabial consonants (p, b, m).',
    examples: ['Impartial (p)', 'Impeccable (p)', 'Immutable (m)', 'Imbalance (b)'],
    exception: 'Never *inpartial or *inmutable (impossible mouth movement).'
  },
  {
    prefix: 'il-',
    rule: 'Phonetic variant of in- before lateral consonant "l".',
    examples: ['Illegible', 'Illicit', 'Illogical', 'Illegitimate'],
    exception: 'Never *inlegible or *inlicit.'
  },
  {
    prefix: 'ir-',
    rule: 'Phonetic variant of in- before rhotic consonant "r".',
    examples: ['Irrevocable', 'Irresolute', 'Irreparable', 'Irrelevant'],
    exception: 'Never *inrevocable.'
  },
  {
    prefix: 'dis-',
    rule: 'Expresses separation, negation, or reversal of action.',
    examples: ['Dispassionate', 'Disparate', 'Disavow', 'Dissent'],
    exception: 'Note: Dispassionate = impartial / calm (not lacking passion in a negative way).'
  },
  {
    prefix: 'mis-',
    rule: 'Indicates bad, wrong, erroneous, or astray action.',
    examples: ['Misconstrue', 'Miscreant', 'Misgiving', 'Mishap'],
    exception: 'Differs from un-: Misinformed (wrong info) vs Uninformed (no info at all).'
  },
  {
    prefix: 'non-',
    rule: 'Purely objective, neutral, non-judgmental negation.',
    examples: ['Nonchalant', 'Noncommittal', 'Non-statutory', 'Non-compliance'],
    exception: 'Creates non-gradable complementary classifications.'
  }
]

const FALSE_FRIENDS = [
  {
    word: 'Inflammable',
    looksLike: 'In- + flammable (Looks like NOT flammable)',
    reality: 'FLAMMABLE (Catches fire easily; from Latin inflammare)',
    trueOpposite: 'Non-flammable / Flame-retardant',
    examTrap: 'Exam mein "The liquid is inflammable" ka antonym "flammable" kabhi mat lagayein!'
  },
  {
    word: 'Invaluable',
    looksLike: 'In- + valuable (Looks like without value / worthless)',
    reality: 'PRICELESS (So valuable that price cannot be calculated)',
    trueOpposite: 'Worthless / Valueless',
    examTrap: 'Invaluable ka meaning "worthless" samajhna sabse fatal High Court trap hai.'
  },
  {
    word: 'Ingenious',
    looksLike: 'In- + genius (Looks like lacking genius)',
    reality: 'CLEVER & INVENTIVE (Brilliant solution)',
    trueOpposite: 'Unimaginative / Clumsy',
    examTrap: 'Do not confuse with "Ingenuous" (naive, innocent, unsophisticated).'
  },
  {
    word: 'Disinterested',
    looksLike: 'Dis- + interested (Looks like bored / uninterested)',
    reality: 'IMPARTIAL & UNBIASED (Having no personal financial stake)',
    trueOpposite: 'Biased / Prejudiced / Self-interested',
    examTrap: 'A judge must be DISINTERESTED (impartial), but never UNINTERESTED (bored)!'
  }
]

export default function PrefixReferenceMap() {
  const [activeTab, setActiveTab] = useState('prefixes')

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-100 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Visual 5 • Morphological Clues</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Affix Clues & False Prefix Traps</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50 mt-1">
            Negative Prefix Reference Map & Notorious False-Friend Deceptions
          </h3>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('prefixes')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'prefixes'
                ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900'
            }`}
          >
            Prefix Rules (8)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('traps')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'traps'
                ? 'bg-white dark:bg-surface-900 text-rose-700 dark:text-rose-300 shadow-xs'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900'
            }`}
          >
            False-Prefix Traps (4)
          </button>
        </div>
      </div>

      {activeTab === 'prefixes' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PREFIX_RULES.map((p, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-base text-primary-700 dark:text-primary-400">
                    {p.prefix}
                  </span>
                  <span className="text-[0.625rem] font-mono text-surface-400">Phonetic Rule</span>
                </div>
                <p className="text-xs text-surface-700 dark:text-surface-300 mt-1 leading-relaxed">
                  {p.rule}
                </p>
                <div className="flex flex-wrap gap-1 pt-2">
                  {p.examples.map((ex, eIdx) => (
                    <span
                      key={eIdx}
                      className="px-1.5 py-0.5 rounded bg-white dark:bg-surface-800 text-[0.6875rem] font-mono border border-surface-200 dark:border-surface-700 text-surface-800 dark:text-surface-200"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[0.6875rem] text-surface-500 italic pt-2 border-t border-surface-200/60 dark:border-surface-750">
                {p.exception}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FALSE_FRIENDS.map((trap, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-bold font-heading text-rose-950 dark:text-rose-100">
                  {trap.word}
                </span>
                <Badge variant="error" size="sm">
                  Deceptive Root
                </Badge>
              </div>

              <div className="text-xs space-y-1">
                <p className="text-surface-600 dark:text-surface-400">
                  <strong className="text-surface-900 dark:text-surface-100">Surface Deception: </strong>
                  {trap.looksLike}
                </p>
                <p className="text-emerald-700 dark:text-emerald-300 font-semibold">
                  <strong>Actual Meaning: </strong>
                  {trap.reality}
                </p>
                <p className="text-surface-700 dark:text-surface-300 font-mono text-[0.6875rem]">
                  <strong>True Antonym: </strong>
                  {trap.trueOpposite}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-rose-200 dark:border-rose-900/40 text-[0.75rem] text-rose-900 dark:text-rose-200 font-medium">
                {trap.examTrap}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
