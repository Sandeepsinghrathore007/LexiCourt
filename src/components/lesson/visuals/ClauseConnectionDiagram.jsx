import { useState } from 'react'
import { Network, CheckCircle2, XCircle } from 'lucide-react'
import { Card, Badge } from '../../common'

const PATTERNS = [
  {
    id: 'fanboys',
    status: 'valid',
    title: 'Pattern 1: Comma + FANBOYS Conjunction',
    formula: '[Independent Clause 1]  +  ,  +  [FANBOYS]  +  [Independent Clause 2]',
    description: 'Do complete sentences (independent clauses) ko coordinating conjunction se pehle ek comma laga kar joda jata hai.',
    example: 'The bench heard the preliminary arguments, but the ruling was reserved.',
    breakdown: [
      { part: 'Independent Clause 1', text: 'The bench heard the preliminary arguments', type: 'ic' },
      { part: 'Punctuation', text: ',', type: 'punct' },
      { part: 'Coordinating Conjunction', text: 'but', type: 'conj' },
      { part: 'Independent Clause 2', text: 'the ruling was reserved', type: 'ic' }
    ],
    rule: 'Dono taraf complete subject aur verb hai, isliye conjunction se pehle comma mandatory hai.'
  },
  {
    id: 'sub-initial',
    status: 'valid',
    title: 'Pattern 2: Initial Dependent Clause + Comma',
    formula: '[Subordinating Conjunction + Dependent Clause]  +  ,  +  [Main Clause]',
    description: 'Jab sentence subordinate clause se shuru ho, toh dependent clause ke end mein aur main clause se pehle comma lagta hai.',
    example: 'Although the limitation period had expired, the registrar condoned the delay.',
    breakdown: [
      { part: 'Subordinating Conjunction', text: 'Although', type: 'conj' },
      { part: 'Dependent Clause', text: 'the limitation period had expired', type: 'dc' },
      { part: 'Mandatory Comma', text: ',', type: 'punct' },
      { part: 'Main Clause', text: 'the registrar condoned the delay', type: 'ic' }
    ],
    rule: 'Sentence-initial subordinate clause hamesha trailing comma demand karta hai.'
  },
  {
    id: 'sub-terminal',
    status: 'valid',
    title: 'Pattern 3: Main Clause + Terminal Dependent Clause (Zero Comma)',
    formula: '[Main Clause]  +  [Subordinating Conjunction]  +  [Dependent Clause]',
    description: 'Jab main clause pehle aaye aur subordinate clause baad mein aaye, toh beech mein comma LAGANA PROHIBITED hai.',
    example: 'The registrar condoned the delay although the limitation period had expired.',
    breakdown: [
      { part: 'Main Clause', text: 'The registrar condoned the delay', type: 'ic' },
      { part: 'Zero Comma Zone', text: '(No Comma)', type: 'zero' },
      { part: 'Subordinating Conjunction', text: 'although', type: 'conj' },
      { part: 'Dependent Clause', text: 'the limitation period had expired', type: 'dc' }
    ],
    rule: 'Standard formal English mein terminal subordinate clause se pehle comma drop kiya jata hai.'
  },
  {
    id: 'semicolon-adv',
    status: 'valid',
    title: 'Pattern 4: Semicolon + Conjunctive Adverb + Comma',
    formula: '[Independent Clause 1]  +  ;  +  [however / therefore]  +  ,  +  [Independent Clause 2]',
    description: 'Conjunctive adverbs (however, therefore, consequently) se pehle semicolon aur baad mein comma lagana mandatory hai.',
    example: 'The evidence was circumstantial; however, the chain of events was unbroken.',
    breakdown: [
      { part: 'Independent Clause 1', text: 'The evidence was circumstantial', type: 'ic' },
      { part: 'Semicolon', text: ';', type: 'punct' },
      { part: 'Conjunctive Adverb', text: 'however', type: 'adv' },
      { part: 'Comma', text: ',', type: 'punct' },
      { part: 'Independent Clause 2', text: 'the chain of events was unbroken', type: 'ic' }
    ],
    rule: 'Conjunctive adverbs coordinating conjunctions nahi hote; inke sath semicolon formula compulsory hai.'
  },
  {
    id: 'comma-splice',
    status: 'invalid',
    title: 'Fatal Error 1: The Comma Splice Trap',
    formula: '* [Independent Clause 1]  +  ,  +  [Independent Clause 2]   (ILLEGAL!)',
    description: 'Do independent clauses ko bina kisi conjunction ke sirf ek comma se jodhna severe grammatical error hai.',
    example: '* The court heard the arguments, the judge reserved the final verdict.',
    breakdown: [
      { part: 'Clause 1', text: 'The court heard the arguments', type: 'ic' },
      { part: 'Naked Comma Error', text: ', (Comma Splice)', type: 'error' },
      { part: 'Clause 2', text: 'the judge reserved the final verdict', type: 'ic' }
    ],
    rule: 'Remedy: Ya toh comma + and lagayein, ya semicolon lagayein, ya subordinating conjunction use karein.'
  },
  {
    id: 'run-on',
    status: 'invalid',
    title: 'Fatal Error 2: Run-on (Fused) Sentence',
    formula: '* [Independent Clause 1]  +  (Zero Punctuation / Conjunction)  +  [Independent Clause 2]   (ILLEGAL!)',
    description: 'Do independent clauses ko bina kisi punctuation mark ya conjunction ke ek sath merge kar dena.',
    example: '* The court heard the arguments the judge reserved the final verdict.',
    breakdown: [
      { part: 'Clause 1', text: 'The court heard the arguments', type: 'ic' },
      { part: 'Missing Boundary', text: '[FUSED ZERO JUNCTION]', type: 'error' },
      { part: 'Clause 2', text: 'the judge reserved the final verdict', type: 'ic' }
    ],
    rule: 'Remedy: Full stop (.) ya coordinating conjunction se clause boundary mark karein.'
  }
]

export default function ClauseConnectionDiagram() {
  const [selectedId, setSelectedId] = useState('fanboys')

  const currentPattern = PATTERNS.find((p) => p.id === selectedId) || PATTERNS[0]
  const isValid = currentPattern.status === 'valid'

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300">
              <Network size={16} />
            </span>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Visual Map 2: Clause Connection & Boundary Architecture
            </h3>
          </div>
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
            Independent aur Dependent clauses ke legal joining patterns aur fatal comma splice traps ka spatial view
          </p>
        </div>
        <Badge variant={isValid ? 'success' : 'error'} size="sm">
          {isValid ? 'Valid Clause Pattern' : 'Grammatical Error Trap'}
        </Badge>
      </div>

      {/* Pattern Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5">
        {PATTERNS.map((pat) => {
          const isSelected = pat.id === selectedId
          const patValid = pat.status === 'valid'

          return (
            <button
              key={pat.id}
              type="button"
              onClick={() => setSelectedId(pat.id)}
              className={`p-2 rounded-xl text-left text-xs font-semibold transition-all border cursor-pointer flex flex-col justify-between gap-1.5 ${
                isSelected
                  ? patValid
                    ? 'bg-primary-50 dark:bg-primary-950/70 border-primary-400 dark:border-primary-600 text-primary-900 dark:text-primary-100 shadow-xs'
                    : 'bg-danger-50 dark:bg-danger-950/70 border-danger-400 dark:border-danger-600 text-danger-900 dark:text-danger-100 shadow-xs'
                  : 'bg-surface-50 dark:bg-surface-850 border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:border-surface-300'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="font-mono text-[0.625rem] uppercase tracking-wider text-surface-500">
                  {pat.id.split('-')[0]}
                </span>
                {patValid ? (
                  <CheckCircle2 size={12} className="text-success-600 shrink-0" />
                ) : (
                  <XCircle size={12} className="text-danger-600 shrink-0" />
                )}
              </div>
              <span className="line-clamp-2 leading-snug">{pat.title.split(':')[0]}</span>
            </button>
          )
        })}
      </div>

      {/* Pattern Display Box */}
      <div
        className={`p-4 rounded-xl border space-y-4 ${
          isValid
            ? 'bg-surface-50/60 dark:bg-surface-850/60 border-surface-200 dark:border-surface-700'
            : 'bg-danger-50/40 dark:bg-danger-950/30 border-danger-200 dark:border-danger-800'
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-100">
              {currentPattern.title}
            </h4>
            <p className="text-xs text-surface-600 dark:text-surface-400 mt-0.5">
              {currentPattern.description}
            </p>
          </div>
          <Badge variant={isValid ? 'primary' : 'error'} size="sm">
            {isValid ? 'Legal Syntax' : 'Disallowed Syntax'}
          </Badge>
        </div>

        {/* Structural Formula Banner */}
        <div className="p-3 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 font-mono text-xs text-surface-900 dark:text-surface-100 overflow-x-auto shadow-xs">
          {currentPattern.formula}
        </div>

        {/* Interactive Segmented Breakdown */}
        <div className="space-y-1.5">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
            Syntactic Unit Breakdown
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {currentPattern.breakdown.map((b, idx) => {
              let badgeStyle = 'bg-surface-100 dark:bg-surface-800 border-surface-300 text-surface-800 dark:text-surface-200'
              if (b.type === 'ic') badgeStyle = 'bg-primary-50 dark:bg-primary-950/60 border-primary-300 dark:border-primary-700 text-primary-900 dark:text-primary-100'
              if (b.type === 'dc') badgeStyle = 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-100'
              if (b.type === 'conj') badgeStyle = 'bg-success-50 dark:bg-success-950/60 border-success-300 dark:border-success-700 text-success-900 dark:text-success-100 font-bold'
              if (b.type === 'punct') badgeStyle = 'bg-secondary-50 dark:bg-secondary-950/60 border-secondary-300 dark:border-secondary-700 text-secondary-900 dark:text-secondary-100 font-bold text-sm'
              if (b.type === 'error') badgeStyle = 'bg-danger-100 dark:bg-danger-950/80 border-danger-400 text-danger-900 dark:text-danger-100 font-bold'

              return (
                <div
                  key={idx}
                  className={`px-3 py-1.5 rounded-lg border text-xs flex flex-col items-start gap-0.5 shadow-xs ${badgeStyle}`}
                >
                  <span className="text-[0.625rem] opacity-75 font-mono">{b.part}</span>
                  <span className="font-semibold">{b.text}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Example String */}
        <div className="p-3 rounded-lg bg-surface-100 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 space-y-1">
          <span className="text-[0.6875rem] font-bold text-surface-500 uppercase">Realistic Sentence Example:</span>
          <p className="text-xs sm:text-sm font-medium text-surface-900 dark:text-surface-100 italic">
            {currentPattern.example}
          </p>
          <p className="text-xs text-primary-700 dark:text-primary-300 pt-1 font-medium">
            Rule Note: {currentPattern.rule}
          </p>
        </div>
      </div>
    </Card>
  )
}
