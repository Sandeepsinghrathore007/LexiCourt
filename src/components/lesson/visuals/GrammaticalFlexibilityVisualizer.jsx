import { useState } from 'react'
import { Sliders, ShieldCheck } from 'lucide-react'
import { Card, Badge } from '../../common'

const FLEXIBLE_RULES = [
  {
    title: '1. Verb Tense & Aspect Inflection',
    status: 'Permitted',
    badgeVariant: 'success',
    rule: 'Idiom ka main verb sentence ke time aur aspect ke hisaab se V1, V2, V3, V-ing mein badal sakta hai.',
    examples: [
      { text: 'Present: "He always keeps his cool under pressure."', note: 'Base verb (keeps)' },
      { text: 'Past: "He kept his cool during cross-examination yesterday."', note: 'Past tense (kept)' },
      { text: 'Continuous: "She is keeping her cool despite provocations."', note: 'Present Participle (keeping)' },
      { text: 'Modal-Perfect: "They should have kept their cool."', note: 'Modal chained (have kept)' }
    ],
    verdict: 'Core figurative meaning bilkul preserve rehta hai.'
  },
  {
    title: '2. Subject-Possessive Concord (\'One\'s\' Pronoun)',
    status: 'Permitted & Mandatory',
    badgeVariant: 'success',
    rule: 'Jin idioms mein template placeholder "one\'s" hota hai, wahan pronoun subject se agree karega.',
    examples: [
      { text: 'Subject "The judge" -> "The judge lost his temper."', note: '3rd person singular masculine' },
      { text: 'Subject "The advocate" -> "The advocate lost her temper."', note: '3rd person singular feminine' },
      { text: 'Subject "The clerks" -> "The clerks lost their tempers."', note: 'Plural concord' },
      { text: 'Subject "One" -> "One must hold one\'s tongue."', note: 'Impersonal subject "one"' }
    ],
    verdict: 'Grammatical concord maintain karna compulsory hai; "*He lost one\'s temper*" invalid hota hai.'
  },
  {
    title: '3. Immutable Articles & Determiners',
    status: 'Strictly Prohibited',
    badgeVariant: 'danger',
    rule: 'Articles (a/an/the) frozen hote hain. Unhe badalna ya hatana sentence correction error banata hai.',
    examples: [
      { text: 'CORRECT: "In a nutshell" | WRONG: "*In the nutshell*"', note: 'Definite article substitution trap' },
      { text: 'CORRECT: "At the eleventh hour" | WRONG: "*At an eleventh hour*"', note: 'Indefinite article distortion' },
      { text: 'CORRECT: "In the nick of time" | WRONG: "*In a nick of time*"', note: 'Article mismatch' }
    ],
    verdict: 'Articles cannot be altered under any circumstances.'
  },
  {
    title: '4. Frozen Noun Numbers (Singular vs Plural)',
    status: 'Strictly Prohibited',
    badgeVariant: 'danger',
    rule: 'Idiom ke noun ka number (singular ya plural) frozen hota hai; ise change nahi kiya ja sakta.',
    examples: [
      { text: 'CORRECT: "Spill the beans" | WRONG: "*Spill the bean*"', note: 'Singularization error' },
      { text: 'CORRECT: "Burn the midnight oil" | WRONG: "*Burn midnight oils*"', note: 'Pluralization error' },
      { text: 'CORRECT: "Turn a blind eye" | WRONG: "*Turn blind eyes*"', note: 'Pluralization error' }
    ],
    verdict: 'Noun numbers are grammatically locked.'
  },
  {
    title: '5. Synonym Replacement Fallacy',
    status: 'Strictly Prohibited',
    badgeVariant: 'danger',
    rule: 'Idiom ke shabdon ko unke dictionary synonyms se replace karna English usage mein strictly invalid hai.',
    examples: [
      { text: 'CORRECT: "A piece of cake" | WRONG: "*A slice of pastry*"', note: 'Food synonym substitution' },
      { text: 'CORRECT: "Hit the nail on the head" | WRONG: "*Hit the pin on the top*"', note: 'Tool synonym substitution' },
      { text: 'CORRECT: "Bury the hatchet" | WRONG: "*Bury the axe*"', note: 'Weapon synonym substitution' }
    ],
    verdict: 'Words cannot be substituted with synonyms.'
  }
]

export default function GrammaticalFlexibilityVisualizer() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const current = FLEXIBLE_RULES[selectedIdx]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Model 8</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Syntax & Structural Boundaries</span>
          </div>
          <h3 className="text-xl font-bold font-heading text-surface-900 dark:text-surface-50 flex items-center gap-2">
            <Sliders size={20} className="text-primary-600 dark:text-primary-400" />
            Grammatical Flexibility vs Frozen Structure Visualizer
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300 mt-1 max-w-3xl leading-relaxed">
            Sentence correction mein candidate ko pata hona chahiye ki idiom ka kaunsa hissa badal sakta hai (flexibility) aur kaunsa hissa 100% frozen hota hai (invariance).
          </p>
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {FLEXIBLE_RULES.map((rule, idx) => {
          const isActive = idx === selectedIdx
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                isActive
                  ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/60 shadow-xs ring-1 ring-primary-500/30'
                  : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-850 hover:bg-surface-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[0.625rem] font-bold text-surface-500 dark:text-surface-400">
                  Rule {idx + 1}
                </span>
                <Badge variant={rule.badgeVariant} size="sm">
                  {rule.status}
                </Badge>
              </div>
              <p className={`text-xs font-bold leading-tight line-clamp-1 ${isActive ? 'text-primary-900 dark:text-primary-100' : 'text-surface-800 dark:text-surface-200'}`}>
                {rule.title.split('.')[1]?.trim() || rule.title}
              </p>
            </button>
          )
        })}
      </div>

      {/* Active Rule Deep Dive Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700">
          <div>
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
              Grammatical Principle:
            </span>
            <h4 className="font-heading font-bold text-base sm:text-lg text-surface-900 dark:text-surface-50">
              {current.title}
            </h4>
          </div>
          <Badge variant={current.badgeVariant} size="sm">
            Status: {current.status}
          </Badge>
        </div>

        <p className="text-xs sm:text-sm text-surface-700 dark:text-surface-300 leading-relaxed font-medium">
          {current.rule}
        </p>

        {/* Examples Grid */}
        <div className="space-y-2 pt-1">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400 block">
            Sentence Demonstrations:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {current.examples.map((ex, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1 text-xs"
              >
                <div className="font-mono font-bold text-surface-900 dark:text-surface-100">
                  {ex.text}
                </div>
                <div className="text-[0.6875rem] text-surface-500 dark:text-surface-400 italic">
                  Note: {ex.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verdict Box */}
        <div className="p-3 rounded-xl bg-primary-50/40 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800/40 text-xs text-primary-900 dark:text-primary-100 font-semibold flex items-center gap-2">
          <ShieldCheck size={16} className="text-primary-600 dark:text-primary-400 shrink-0" />
          <span>Verdict: {current.verdict}</span>
        </div>
      </div>
    </Card>
  )
}
