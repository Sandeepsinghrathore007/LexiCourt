import { useState } from 'react'
import { GitBranch, Sparkles } from 'lucide-react'
import { Card, Badge } from '../../common'

const GERUND_PATTERNS = [
  {
    phrase: 'look forward to',
    isPreposition: true,
    testPhrase: 'look forward to [the vacation / IT]',
    testResult: 'Valid Noun substitution ➔ "TO" is a Preposition!',
    correctExample: 'I look forward to meeting the Registrar General tomorrow.',
    wrongExample: 'I look forward to meet the Registrar General. (WRONG)',
    explanation: '"To" yahan preposition of orientation hai, isliye iske baad mandatory Gerund (-ing) aayega.'
  },
  {
    phrase: 'be accustomed to',
    isPreposition: true,
    testPhrase: 'accustomed to [hard work / IT]',
    testResult: 'Valid Noun substitution ➔ "TO" is a Preposition!',
    correctExample: 'He is accustomed to handling high volumes of judicial filings.',
    wrongExample: 'He is accustomed to handle high volumes. (WRONG)',
    explanation: '"Accustomed to" ke baad hamesha noun ya gerund (-ing) lagta hai.'
  },
  {
    phrase: 'object to',
    isPreposition: true,
    testPhrase: 'object to [the decision / IT]',
    testResult: 'Valid Noun substitution ➔ "TO" is a Preposition!',
    correctExample: 'The public prosecutor strongly objected to granting interim relief.',
    wrongExample: 'The prosecutor objected to grant interim relief. (WRONG)',
    explanation: '"Object to" ka target action hamesha gerund (-ing) hota hai.'
  },
  {
    phrase: 'with a view to',
    isPreposition: true,
    testPhrase: 'with a view to [economic growth / IT]',
    testResult: 'Valid Noun substitution ➔ "TO" is a Preposition!',
    correctExample: 'The rules were revised with a view to streamlining recruitment.',
    wrongExample: 'The rules were revised with a view to streamline. (FATAL EXAM ERROR)',
    explanation: '"With a view to" ke turant baad 100% strictly Gerund (-ing) aana mandatory hai.'
  },
  {
    phrase: 'prone to',
    isPreposition: true,
    testPhrase: 'prone to [accidents / IT]',
    testResult: 'Valid Noun substitution ➔ "TO" is a Preposition!',
    correctExample: 'Unpatched servers are prone to crashing during peak load.',
    wrongExample: 'Servers are prone to crash during peak load. (NON-STANDARD)',
    explanation: 'Risk tendency prepositional target gerund ya noun hota hai.'
  },
  {
    phrase: 'decide to',
    isPreposition: false,
    testPhrase: 'decide to [IT] ❌ (Invalid English!)',
    testResult: 'Cannot take a direct noun ➔ "TO" is an Infinitive Particle!',
    correctExample: 'The bench decided to adjourn the matter until Friday.',
    wrongExample: 'The bench decided to adjourning the matter. (WRONG)',
    explanation: '"Decide" ke baad bare infinitive (to + V1) aana standard rule hai.'
  },
  {
    phrase: 'hope to',
    isPreposition: false,
    testPhrase: 'hope to [IT] ❌ (Invalid English!)',
    testResult: 'Cannot take a direct noun ➔ "TO" is an Infinitive Particle!',
    correctExample: 'Candidates hope to clear the written exam in the first attempt.',
    wrongExample: 'Candidates hope to clearing the exam. (WRONG)',
    explanation: '"Hope" intention verb hai jo infinitive (to + V1) demand karti hai.'
  }
]

export default function GerundPrepositionBridge() {
  const [selectedIdx, setSelectedIdx] = useState(0)

  const active = GERUND_PATTERNS[selectedIdx]

  return (
    <Card variant="default" padding="lg" className="border-purple-200 dark:border-surface-700 select-none shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GitBranch size={18} className="text-purple-600 dark:text-purple-400" />
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              The 'TO' Bridge: Preposition + Gerund (-ing) vs Infinitive (to + V1)
            </h3>
          </div>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            Aamtaur par "to" dekhkar sab V1 sochte hain. Interactive Noun Substitution Test se pehchanein ki "to" kab Preposition hai aur kab Infinitive!
          </p>
        </div>
        <Badge variant={active.isPreposition ? 'primary' : 'neutral'} size="md">
          {active.isPreposition ? 'Preposition (Takes -ing)' : 'Infinitive (Takes V1)'}
        </Badge>
      </div>

      {/* Button Row */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
        {GERUND_PATTERNS.map((p, idx) => (
          <button
            key={p.phrase}
            type="button"
            onClick={() => setSelectedIdx(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
              selectedIdx === idx
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white dark:bg-surface-900 text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 border border-surface-200 dark:border-surface-700'
            }`}
          >
            <span>{p.phrase}</span>
            <span className={`text-[0.625rem] px-1 py-0.2 rounded font-mono ${
              p.isPreposition
                ? 'bg-purple-700/80 text-purple-100'
                : 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
            }`}>
              {p.isPreposition ? '-ing' : 'V1'}
            </span>
          </button>
        ))}
      </div>

      {/* Interactive Verification Canvas */}
      <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-800/60 bg-purple-50/20 dark:bg-purple-950/20 space-y-4">
        {/* Noun Test Simulator */}
        <div className="p-3 rounded-lg bg-white dark:bg-surface-900 border border-purple-200 dark:border-purple-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
            <span className="flex items-center gap-1.5">
              <Sparkles size={14} /> Cognitive Noun Substitution Test:
            </span>
            <span>{active.isPreposition ? '✓ Passes Test' : '✗ Fails Test'}</span>
          </div>

          <p className="text-xs font-mono text-surface-800 dark:text-surface-200 bg-surface-100 dark:bg-surface-800 p-2 rounded">
            Test Formula: <strong>"{active.testPhrase}"</strong> ➔ {active.testResult}
          </p>

          <p className="text-xs text-surface-600 dark:text-surface-300">
            {active.explanation}
          </p>
        </div>

        {/* Examples Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800 text-xs space-y-1">
            <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
              ✓ Grammatically Correct:
            </span>
            <p className="text-surface-900 dark:text-surface-100 font-medium">
              "{active.correctExample}"
            </p>
          </div>

          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 text-xs space-y-1">
            <span className="font-bold text-red-800 dark:text-red-300 block">
              ✗ Frequent Exam Pitfall:
            </span>
            <p className="text-red-700 dark:text-red-300 font-medium">
              "{active.wrongExample}"
            </p>
          </div>
        </div>
      </div>

      <div className="text-xs text-surface-500 dark:text-surface-400 p-2.5 rounded-lg bg-surface-100 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700">
        💡 <strong>Remember:</strong> Whenever "to" is followed by a verb in expressions like <em>look forward to</em>, <em>accustomed to</em>, <em>object to</em>, and <em>with a view to</em>, the verb must end in <strong>-ing</strong>!
      </div>
    </Card>
  )
}
