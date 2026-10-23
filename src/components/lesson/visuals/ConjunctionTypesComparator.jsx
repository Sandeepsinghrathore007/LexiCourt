import { useState } from 'react'
import { Split } from 'lucide-react'
import { Card, Badge } from '../../common'

const FAMILIES = [
  {
    id: 'coordinating',
    title: '1. Coordinating Conjunctions',
    mnemonic: 'FANBOYS (For, And, Nor, But, Or, Yet, So)',
    rank: 'Grammatically Equal Ranks (Two Words, Two Phrases, Two Independent Clauses)',
    punctuation: 'Comma before conjunction ONLY when joining two independent clauses. Zero comma for compound verbs.',
    syntaxRule: '[Clause 1] , [FANBOYS] [Clause 2]',
    specialConcord: '"Nor" requires auxiliary inversion: "nor did he appear".',
    examTrap: 'Run-on sentence (omitting the comma) OR Comma splice (omitting the FANBOYS conjunction).',
    example: 'The bench heard the preliminary arguments, but the ruling was reserved.'
  },
  {
    id: 'subordinating',
    title: '2. Subordinating Conjunctions',
    mnemonic: 'Although, Because, Since, If, Unless, While, Whereas, Until, Before, After',
    rank: 'Unequal Rank: Embeds a Dependent Clause inside an Independent Main Clause',
    punctuation: 'Mandatory trailing comma when clause is initial; STRICTLY ZERO comma when clause is terminal.',
    syntaxRule: 'Initial: [Sub + Dep Clause] , [Main Clause]  |  Terminal: [Main Clause] [Sub + Dep Clause]',
    specialConcord: 'Subordinate clause alone cannot stand as a sentence (Sentence Fragment trap).',
    examTrap: 'Double contrast pleonasm ("Although... but") OR Comma splice before terminal clause.',
    example: 'Although the evidence was circumstantial, the trial court convicted the accused.'
  },
  {
    id: 'correlative',
    title: '3. Correlative Conjunctions',
    mnemonic: 'Either...or, Neither...nor, Not only...but also, Both...and, Whether...or',
    rank: 'Symmetrical Twins: Must connect two strictly identical grammatical structures',
    punctuation: 'Zero internal comma between paired items unless joining two full independent clauses.',
    syntaxRule: 'Not only [Structure A] but also [Structure B]  (where A and B are identical in rank)',
    specialConcord: 'Subject-Verb Agreement follows the NEAREST (second) subject (Proximity Rule).',
    examTrap: 'Nonparallel placement (verb before not only vs noun before but also) OR Illegal pair mixing (*both... as well as).',
    example: 'The bench reprimanded not only the investigating officer but also the public prosecutor.'
  },
  {
    id: 'conjunctive-adv',
    title: '4. Conjunctive Adverbs (Transitions)',
    mnemonic: 'However, Therefore, Moreover, Furthermore, Nevertheless, Consequently, Thus',
    rank: 'Independent Sentences: Adverbs showing semantic transition between complete ideas',
    punctuation: 'MANDATORY SEMICOLON (;) before the adverb and COMMA (,) immediately after it.',
    syntaxRule: '[Independent Clause 1] ; [however / therefore] , [Independent Clause 2]',
    specialConcord: 'Cannot act as coordinating conjunctions. Can be moved inside the clause with commas.',
    examTrap: 'The Classic Comma Splice: Joining two clauses with only a comma + however (*He was ill, however he came).',
    example: 'The limitation period had expired; however, the registrar condoned the delay under Section 5.'
  }
]

export default function ConjunctionTypesComparator() {
  const [selectedFamily, setSelectedFamily] = useState('coordinating')

  const current = FAMILIES.find((f) => f.id === selectedFamily) || FAMILIES[0]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300">
              <Split size={16} />
            </span>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Visual Map 4: Conjunction Families Comparative Matrix
            </h3>
          </div>
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
            Coordinating, Subordinating, Correlative, aur Conjunctive Adverbs ke structural rules ka deep contrast
          </p>
        </div>
        <Badge variant="primary" size="sm">
          4 Connective Classes
        </Badge>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {FAMILIES.map((fam) => {
          const isSelected = fam.id === selectedFamily
          return (
            <button
              key={fam.id}
              type="button"
              onClick={() => setSelectedFamily(fam.id)}
              className={`p-3 rounded-xl text-left transition-all border cursor-pointer space-y-1 ${
                isSelected
                  ? 'bg-primary-50 dark:bg-primary-950/80 border-primary-500 text-primary-900 dark:text-primary-100 shadow-xs ring-1 ring-primary-400'
                  : 'bg-surface-50 dark:bg-surface-850 border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:border-surface-300'
              }`}
            >
              <h4 className="font-heading font-bold text-xs line-clamp-1">{fam.title}</h4>
              <p className="font-mono text-[0.625rem] text-surface-500 dark:text-surface-400 line-clamp-1">
                {fam.mnemonic.split('(')[0]}
              </p>
            </button>
          )
        })}
      </div>

      {/* Deep Comparison Card */}
      <div className="p-4 rounded-xl bg-surface-50/70 dark:bg-surface-850/70 border border-surface-200 dark:border-surface-700 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-surface-200 dark:border-surface-700">
          <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-50">
            {current.title}
          </h4>
          <span className="font-mono text-xs font-semibold text-primary-700 dark:text-primary-300 bg-primary-100/60 dark:bg-primary-950 px-2 py-0.5 rounded border border-primary-200 dark:border-primary-800">
            {current.mnemonic}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1">
            <span className="font-bold text-surface-700 dark:text-surface-300 block">Grammatical Rank Joined:</span>
            <p className="text-surface-600 dark:text-surface-400 leading-relaxed">{current.rank}</p>
          </div>

          <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1">
            <span className="font-bold text-surface-700 dark:text-surface-300 block">Punctuation Mandate:</span>
            <p className="text-surface-600 dark:text-surface-400 leading-relaxed">{current.punctuation}</p>
          </div>

          <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1">
            <span className="font-bold text-surface-700 dark:text-surface-300 block">Special Agreement / Concord:</span>
            <p className="text-surface-600 dark:text-surface-400 leading-relaxed">{current.specialConcord}</p>
          </div>

          <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1">
            <span className="font-bold text-danger-700 dark:text-danger-400 block">Classic Exam Distractor Trap:</span>
            <p className="text-surface-600 dark:text-surface-400 leading-relaxed">{current.examTrap}</p>
          </div>
        </div>

        {/* Structural Syntax Box */}
        <div className="p-2.5 rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-1 font-mono text-xs">
          <span className="text-[0.625rem] uppercase font-bold text-surface-500 tracking-wider">Canonical Formula:</span>
          <p className="text-surface-900 dark:text-surface-100 font-bold">{current.syntaxRule}</p>
        </div>

        {/* Example Box */}
        <div className="p-3 rounded-lg bg-primary-50/40 dark:bg-primary-950/30 border border-primary-200 dark:border-primary-800/50 space-y-1 text-xs">
          <span className="font-bold text-primary-800 dark:text-primary-300">Natural Sentence Example:</span>
          <p className="italic text-surface-900 dark:text-surface-100 font-medium">"{current.example}"</p>
        </div>
      </div>
    </Card>
  )
}
