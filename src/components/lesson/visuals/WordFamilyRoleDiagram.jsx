import { useState } from 'react'
import { Network } from 'lucide-react'
import { Card, Badge } from '../../common'

const FAMILIES = [
  {
    root: 'Philanthro- (Love of humans)',
    agent: { word: 'Philanthropist', pos: 'Noun (Agent)', formula: 'Phil- + Anthropos + -ist', cue: 'A person who promotes human welfare through donations' },
    abstract: { word: 'Philanthropy', pos: 'Noun (Abstract/Activity)', formula: 'Phil- + Anthropos + -y', cue: 'The practice or desire to promote welfare of others' },
    adjective: { word: 'Philanthropic', pos: 'Adjective (Descriptor)', formula: 'Philanthrop- + -ic', cue: 'Showing generous concern for human welfare' },
    verb: { word: 'Act philanthropically', pos: 'Verb Phrase', formula: 'Donate generously', cue: 'To engage in charitable endowment' }
  },
  {
    root: 'Misanthro- (Hatred of humans)',
    agent: { word: 'Misanthrope', pos: 'Noun (Agent)', formula: 'Mis- + Anthropos', cue: 'A person who dislikes or distrusts humankind' },
    abstract: { word: 'Misanthropy', pos: 'Noun (Abstract/Attitude)', formula: 'Misanthrop- + -y', cue: 'A general hatred, dislike, or distrust of humankind' },
    adjective: { word: 'Misanthropic', pos: 'Adjective (Descriptor)', formula: 'Misanthrop- + -ic', cue: 'Having or showing a dislike of other people' },
    verb: { word: 'Shun humanity', pos: 'Verb Phrase', formula: 'Withdraw in distrust', cue: 'To avoid society in cynicism' }
  },
  {
    root: 'Arbitr- (Judgment / Dispute)',
    agent: { word: 'Arbitrator', pos: 'Noun (Agent)', formula: 'Arbitr- + -or', cue: 'An independent person officially appointed to settle a dispute' },
    abstract: { word: 'Arbitration', pos: 'Noun (Process)', formula: 'Arbitr- + -ation', cue: 'The formal hearing and settling of a dispute out of court' },
    adjective: { word: 'Arbitral', pos: 'Adjective (Descriptor)', formula: 'Arbitr- + -al', cue: 'Relating to arbitration or an arbitral tribunal' },
    verb: { word: 'Arbitrate', pos: 'Verb (Action)', formula: 'Arbitr- + -ate', cue: 'To act as an arbitrator and decide a dispute' }
  },
  {
    root: 'Autocr- (Self-rule / Absolute power)',
    agent: { word: 'Autocrat', pos: 'Noun (Agent)', formula: 'Auto- + -crat', cue: 'A ruler who has absolute, unchecked governing power' },
    abstract: { word: 'Autocracy', pos: 'Noun (System)', formula: 'Auto- + -cracy', cue: 'A system of government where power is held by one person' },
    adjective: { word: 'Autocratic', pos: 'Adjective (Descriptor)', formula: 'Autocrat- + -ic', cue: 'Taking no account of other people\'s wishes or opinions' },
    verb: { word: 'Rule autocratically', pos: 'Verb Phrase', formula: 'Dictate without check', cue: 'To govern with absolute authority' }
  }
]

export default function WordFamilyRoleDiagram() {
  const [activeFamilyIdx, setActiveFamilyIdx] = useState(0)
  const current = FAMILIES[activeFamilyIdx]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-200 dark:border-surface-700/80 pb-3">
        <div className="flex items-center gap-2">
          <Network size={18} className="text-primary-600 dark:text-primary-400" />
          <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
            Word-Family Morphological Diagram & Grammatical Roles
          </h3>
        </div>
        <Badge variant="primary" size="sm">Part of Speech Harmony</Badge>
      </div>

      <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed">
        Examiners option list mein same root ke Noun, Adjective, aur Abstract Noun daal dete hain. Niche diye gaye chart se dekhein ki definition ka grammatical question stem kaise target word ki POS lock karta hai:
      </p>

      {/* Family Selector */}
      <div className="flex flex-wrap gap-2">
        {FAMILIES.map((f, idx) => (
          <button
            key={f.root}
            type="button"
            onClick={() => setActiveFamilyIdx(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFamilyIdx === idx
                ? 'bg-primary-600 text-white shadow-xs'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200'
            }`}
          >
            {f.root}
          </button>
        ))}
      </div>

      {/* Morphological Flow Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
        {/* Step 1: Agent Noun */}
        <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/20 dark:bg-blue-950/20 space-y-2">
          <span className="text-[0.625rem] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-300">
            1. Agent Noun (Who?)
          </span>
          <p className="font-heading font-bold text-base text-surface-900 dark:text-white">
            {current.agent.word}
          </p>
          <span className="text-[0.6875rem] font-mono text-surface-500 block">
            {current.agent.formula}
          </span>
          <div className="pt-2 border-t border-blue-100 dark:border-blue-900/60 text-xs text-surface-700 dark:text-surface-300">
            <strong>Target Definition:</strong>
            <p className="mt-0.5 text-[0.6875rem] leading-snug">"{current.agent.cue}"</p>
          </div>
        </div>

        {/* Step 2: Abstract Noun */}
        <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/20 dark:bg-purple-950/20 space-y-2">
          <span className="text-[0.625rem] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-300">
            2. Abstract Noun (What?)
          </span>
          <p className="font-heading font-bold text-base text-surface-900 dark:text-white">
            {current.abstract.word}
          </p>
          <span className="text-[0.6875rem] font-mono text-surface-500 block">
            {current.abstract.formula}
          </span>
          <div className="pt-2 border-t border-purple-100 dark:border-purple-900/60 text-xs text-surface-700 dark:text-surface-300">
            <strong>Target Definition:</strong>
            <p className="mt-0.5 text-[0.6875rem] leading-snug">"{current.abstract.cue}"</p>
          </div>
        </div>

        {/* Step 3: Adjective */}
        <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/20 dark:bg-amber-950/20 space-y-2">
          <span className="text-[0.625rem] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-300">
            3. Adjective (Which trait?)
          </span>
          <p className="font-heading font-bold text-base text-surface-900 dark:text-white">
            {current.adjective.word}
          </p>
          <span className="text-[0.6875rem] font-mono text-surface-500 block">
            {current.adjective.formula}
          </span>
          <div className="pt-2 border-t border-amber-100 dark:border-amber-900/60 text-xs text-surface-700 dark:text-surface-300">
            <strong>Target Definition:</strong>
            <p className="mt-0.5 text-[0.6875rem] leading-snug">"{current.adjective.cue}"</p>
          </div>
        </div>

        {/* Step 4: Verb Action */}
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-2">
          <span className="text-[0.625rem] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-300">
            4. Verb / Action (To do what?)
          </span>
          <p className="font-heading font-bold text-base text-surface-900 dark:text-white">
            {current.verb.word}
          </p>
          <span className="text-[0.6875rem] font-mono text-surface-500 block">
            {current.verb.formula}
          </span>
          <div className="pt-2 border-t border-emerald-100 dark:border-emerald-900/60 text-xs text-surface-700 dark:text-surface-300">
            <strong>Target Definition:</strong>
            <p className="mt-0.5 text-[0.6875rem] leading-snug">"{current.verb.cue}"</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
