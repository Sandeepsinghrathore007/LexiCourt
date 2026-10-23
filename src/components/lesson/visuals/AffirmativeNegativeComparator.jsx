import { useState } from 'react'
import { XCircle, Scale } from 'lucide-react'
import { Card, Badge } from '../../common'

const COMPARISON_PATTERNS = [
  {
    id: 'pat-antonym',
    name: '1. Antonym + Not',
    formula: 'Subject + Helping Verb + NOT + Antonym',
    affirmative: 'The district judge is wise and prudent.',
    negative: 'The district judge is not foolish or rash.',
    changeKey: 'is wise ➔ is not foolish',
    balanceRationale: '"Wise" ka opposite "foolish" hai. "Not foolish" kehne se wahi positive truth affirm hoti hai ki judge buddhiman hai.',
    fatalBlunder: 'The district judge is not wise. (Simply adding "not" reverses the truth 180°).',
  },
  {
    id: 'pat-none-but',
    name: '2. Only (Persons) ➔ None but',
    formula: 'None but + Person + Predicate',
    affirmative: 'Only registered advocates can sign the vakalatnama.',
    negative: 'None but registered advocates can sign the vakalatnama.',
    changeKey: 'Only [advocates] ➔ None but [advocates]',
    balanceRationale: '"Only" doosre sabhi ko exclude karta hai; "None but" (unke alawa koi nahi) exact same exclusion aur exclusivity communicate karta hai.',
    fatalBlunder: 'Nothing but registered advocates can sign... ("Nothing but" is strictly for inanimate objects, not humans).',
  },
  {
    id: 'pat-nothing-but',
    name: '3. Only (Things) ➔ Nothing but',
    formula: 'Subject + Verb + nothing but + Thing',
    affirmative: 'The petitioner demanded only justice from the court.',
    negative: 'The petitioner demanded nothing but justice from the court.',
    changeKey: 'only justice ➔ nothing but justice',
    balanceRationale: '"Nothing but justice" ka arth hai nyay ke alawa aur kuch nahi, jo affirmative statement ke 100% barabar hai.',
    fatalBlunder: 'The petitioner demanded none but justice... ("None but" cannot be used for abstract concepts or things).',
  },
  {
    id: 'pat-no-sooner',
    name: '4. As soon as ➔ No sooner',
    formula: 'No sooner did + S + V1 + than... | No sooner had + S + V3 + than...',
    affirmative: 'As soon as the judge spoke, the courtroom became silent.',
    negative: 'No sooner did the judge speak than the courtroom became silent.',
    changeKey: 'As soon as + spoke ➔ No sooner did + speak + than',
    balanceRationale: 'Dono structures do sequential events ke beech zero-time gap (immediate sequence) communicate karte hain.',
    fatalBlunder: 'No sooner did the judge speak when / then... ("No sooner" strictly requires "THAN").',
  },
  {
    id: 'pat-every',
    name: '5. Every ➔ There is no...without',
    formula: 'There is no + Noun + who does not + V1 / without + Noun',
    affirmative: 'Every citizen loves peace and judicial order.',
    negative: 'There is no citizen who does not love peace and judicial order.',
    changeKey: 'Every citizen loves ➔ There is no citizen who does not love',
    balanceRationale: 'Double negative ("no citizen" + "does not love") mathematically aur semantically universal affirmative claim ko verify karta hai.',
    fatalBlunder: 'There is no citizen who loves peace... (Dropped the second negative, making it mean nobody loves peace!).',
  },
  {
    id: 'pat-too-to',
    name: '6. Too...to ➔ So...that cannot/could not',
    formula: 'Subject + Verb + so + Adj + that + S + cannot/could not + V1',
    affirmative: 'The key witness was too terrified to speak.',
    negative: 'The key witness was so terrified that he could not speak.',
    changeKey: 'too terrified to speak ➔ so terrified that he could not speak',
    balanceRationale: '"Too terrified to speak" inability denote karta hai; "so...that he could not speak" us inability ko explicit negative clause mein express karta hai.',
    fatalBlunder: '...was so terrified that he cannot speak. (Tense discord: Past "was" requires "could not", not "cannot").',
  },
  {
    id: 'pat-always',
    name: '7. Always ➔ Never + Antonym',
    formula: 'Subject + never + Antonym Verb/Adjective',
    affirmative: 'The High Court always upholds fundamental rights.',
    negative: 'The High Court never violates fundamental rights.',
    changeKey: 'always upholds ➔ never violates',
    balanceRationale: '"Always" (sadav) aur "uphold" (raksha karna) ko "never" (kabhi nahi) aur "violate" (ullanghan karna) se swap karne par proposition constant rehta hai.',
    fatalBlunder: 'The High Court never upholds fundamental rights. (Opposite meaning without antonym).',
  },
]

export default function AffirmativeNegativeComparator() {
  const [activePatId, setActivePatId] = useState('pat-antonym')
  const current = COMPARISON_PATTERNS.find((p) => p.id === activePatId) || COMPARISON_PATTERNS[0]

  return (
    <Card variant="default" padding="lg" className="border-primary-200 dark:border-surface-700 shadow-sm space-y-5 select-none">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Spatial Model 3</Badge>
            <span className="text-xs font-semibold text-surface-500 dark:text-surface-400">
              Side-by-Side Equivalence Comparator
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-heading text-surface-900 dark:text-surface-50">
            Affirmative-to-Negative Meaning Comparison
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300 mt-0.5 max-w-[80ch]">
            7 high-frequency affirmative-to-negative transformation patterns ke structure aur semantic balance ko inspect karein.
          </p>
        </div>
      </div>

      {/* Pattern Selector Chips */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
        {COMPARISON_PATTERNS.map((p) => {
          const isActive = p.id === activePatId
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePatId(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs border border-surface-200 dark:border-surface-700'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 hover:bg-surface-200/50 dark:hover:bg-surface-700/50'
              }`}
            >
              {p.name}
            </button>
          )
        })}
      </div>

      {/* Comparison Viewport */}
      <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-4">
        {/* Formula Bar */}
        <div className="p-2.5 rounded-lg bg-primary-50/50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 flex items-center justify-between gap-2 text-xs">
          <span className="font-bold text-primary-900 dark:text-primary-200">Transformation Formula:</span>
          <span className="font-mono text-primary-700 dark:text-primary-300 font-semibold">{current.formula}</span>
        </div>

        {/* Side-by-Side Sentence Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Affirmative Card */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <Badge variant="primary" size="sm">Affirmative Form (+)</Badge>
              <span className="text-[0.6875rem] text-surface-400">Positive Polarity</span>
            </div>
            <p className="font-mono text-xs font-bold text-surface-900 dark:text-surface-100 leading-relaxed">
              "{current.affirmative}"
            </p>
          </div>

          {/* Negative Card */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <Badge variant="neutral" size="sm">Transformed Negative Form (-)</Badge>
              <span className="text-[0.6875rem] text-surface-400">Compensated Negation</span>
            </div>
            <p className="font-mono text-xs font-bold text-primary-700 dark:text-primary-300 leading-relaxed">
              "{current.negative}"
            </p>
          </div>
        </div>

        {/* Structural Shift Key */}
        <div className="p-3 rounded-lg bg-surface-100 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <span className="text-surface-500 dark:text-surface-400 font-semibold">Syntactic Shift:</span>
          <span className="font-mono font-bold text-surface-900 dark:text-surface-100 bg-white dark:bg-surface-900 px-2 py-0.5 rounded border border-surface-200 dark:border-surface-700">
            {current.changeKey}
          </span>
        </div>

        {/* Semantic Balance Explanation */}
        <div className="p-3 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-1 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-surface-800 dark:text-surface-100">
            <Scale size={15} className="text-primary-600 dark:text-primary-400" />
            <span>Semantic Invariance Rationale (Meaning Balance):</span>
          </div>
          <p className="text-surface-600 dark:text-surface-300 leading-relaxed pl-5">
            {current.balanceRationale}
          </p>
        </div>

        {/* Fatal Blunder Alert */}
        <div className="p-3 rounded-lg bg-error-50/50 dark:bg-error-950/30 border border-error-200 dark:border-error-800/60 flex items-start gap-2.5 text-xs text-error-900 dark:text-error-200">
          <XCircle size={16} className="text-error-600 dark:text-error-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Fatal Exam Distractor Trap:</strong>
            <span className="font-mono">{current.fatalBlunder}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
