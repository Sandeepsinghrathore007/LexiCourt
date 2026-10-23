import { useState } from 'react'
import { Network, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react'
import { Card, Badge } from '../../common'

const WORD_FAMILIES = [
  {
    root: 'LUCID',
    concept: 'Clear / Transparent / Intellectually Intelligible',
    members: {
      noun: { word: 'Lucidity', role: 'Clarity of thought/expression', example: 'The judge praised the lucidity of the brief.' },
      verb: { word: 'Elucidate', role: 'To make clear, explain', example: 'Counsel was asked to elucidate the statutory proviso.' },
      adjective: { word: 'Lucid', role: 'Clear, easily understood', example: 'The judgment provided a lucid interpretation.' },
      adverb: { word: 'Lucidly', role: 'In a clear, transparent manner', example: 'The witness testified lucidly on cross-examination.' }
    },
    examTrap: 'Agar question mein "Find the synonym of LUCID" pucha hai, aur Option A "Lucidity" hai, toh wo form distractor hai! Answer "Clear" (Adjective) hoga, "Lucidity" (Noun) nahi.'
  },
  {
    root: 'BENEVOLENT',
    concept: 'Well-wishing / Charitable / Altruistic',
    members: {
      noun: { word: 'Benevolence', role: 'Disposition to do good; kindness', example: 'The trust was founded on genuine benevolence.' },
      verb: { word: '— (No standard modern verb)', role: 'Expressed periphrastically', example: 'Act with benevolence.' },
      adjective: { word: 'Benevolent', role: 'Charitable, kindly disposed', example: 'The bench adopted a benevolent attitude toward the destitute.' },
      adverb: { word: 'Benevolently', role: 'In a kindly, altruistic manner', example: 'The funds were benevolently disbursed.' }
    },
    examTrap: 'Question: "Antonym of BENEVOLENT" ➔ Correct: "Malevolent" (Adj). Trap option: "Malevolence" (Noun).'
  },
  {
    root: 'DILIGENT',
    concept: 'Hard-working / Painstaking / Thorough',
    members: {
      noun: { word: 'Diligence', role: 'Persistent careful effort', example: 'Due diligence is required before property acquisition.' },
      verb: { word: '—', role: 'Expressed periphrastically', example: 'Exercise diligence.' },
      adjective: { word: 'Diligent', role: 'Industrious, conscientious', example: 'The assistant was diligent in maintaining case files.' },
      adverb: { word: 'Diligently', role: 'With steady, earnest effort', example: 'The clerk verified the records diligently.' }
    },
    examTrap: '"Diligent" (Adj) ka synonym "Assiduous" (Adj) hai. Option mein "Assiduity" (Noun) deliberate trap hota hai.'
  },
  {
    root: 'AMBIGUOUS',
    concept: 'Equivocal / Having Multiple Obscure Interpretations',
    members: {
      noun: { word: 'Ambiguity', role: 'Uncertainty of meaning', example: 'The statutory clause contained patent ambiguity.' },
      verb: { word: '—', role: 'Periphrastic: render ambiguous', example: 'Obscure the meaning.' },
      adjective: { word: 'Ambiguous', role: 'Open to several meanings', example: 'The contractual warranty was ambiguous.' },
      adverb: { word: 'Ambiguously', role: 'In an equivocal, vague manner', example: 'The clause was drafted ambiguously.' }
    },
    examTrap: '"Antonym of AMBIGUITY (Noun)" ➔ Correct: "Clarity / Lucidity (Noun)". Distractor: "Clear / Lucid (Adj)". Match parts of speech!'
  }
]

export default function WordFamilyGrammarBridge() {
  const [selectedIdx, setSelectedIdx] = useState(0)

  const family = WORD_FAMILIES[selectedIdx] || WORD_FAMILIES[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-100 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Visual 6 • Grammatical Concord</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Morphological Part-of-Speech Concord</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50 mt-1">
            Word Family Grammar Bridge: Part-of-Speech Concord & Derivational Traps
          </h3>
        </div>
      </div>

      {/* Root Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {WORD_FAMILIES.map((fam, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedIdx(idx)}
            className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
              selectedIdx === idx
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-950 text-primary-900 dark:text-primary-100 shadow-xs ring-1 ring-primary-500'
                : 'border-surface-200 dark:border-surface-750 bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:border-surface-300'
            }`}
          >
            <span className="font-mono font-bold block">{fam.root}</span>
            <span className="text-[0.625rem] text-surface-500 truncate block mt-0.5">{fam.concept.split('/')[0]}</span>
          </button>
        ))}
      </div>

      {/* 4-Corner Morphological Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Noun */}
        <div className="p-3.5 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-primary-700 dark:text-primary-300 font-mono">
              Noun Form
            </span>
            <Badge variant="neutral" size="sm">Entity / Concept</Badge>
          </div>
          <h4 className="text-base font-bold font-heading text-surface-900 dark:text-white">
            {family.members.noun.word}
          </h4>
          <p className="text-xs text-surface-600 dark:text-surface-400">{family.members.noun.role}</p>
          <p className="text-[0.6875rem] text-surface-500 italic pt-1 border-t border-surface-200/60 dark:border-surface-750">
            &ldquo;{family.members.noun.example}&rdquo;
          </p>
        </div>

        {/* Verb */}
        <div className="p-3.5 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 font-mono">
              Verb Form
            </span>
            <Badge variant="neutral" size="sm">Action / Process</Badge>
          </div>
          <h4 className="text-base font-bold font-heading text-surface-900 dark:text-white">
            {family.members.verb.word}
          </h4>
          <p className="text-xs text-surface-600 dark:text-surface-400">{family.members.verb.role}</p>
          <p className="text-[0.6875rem] text-surface-500 italic pt-1 border-t border-surface-200/60 dark:border-surface-750">
            &ldquo;{family.members.verb.example}&rdquo;
          </p>
        </div>

        {/* Adjective */}
        <div className="p-3.5 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 font-mono">
              Adjective Form
            </span>
            <Badge variant="neutral" size="sm">Quality / Attribute</Badge>
          </div>
          <h4 className="text-base font-bold font-heading text-surface-900 dark:text-white">
            {family.members.adjective.word}
          </h4>
          <p className="text-xs text-surface-600 dark:text-surface-400">{family.members.adjective.role}</p>
          <p className="text-[0.6875rem] text-surface-500 italic pt-1 border-t border-surface-200/60 dark:border-surface-750">
            &ldquo;{family.members.adjective.example}&rdquo;
          </p>
        </div>

        {/* Adverb */}
        <div className="p-3.5 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 font-mono">
              Adverb Form
            </span>
            <Badge variant="neutral" size="sm">Manner / Degree</Badge>
          </div>
          <h4 className="text-base font-bold font-heading text-surface-900 dark:text-white">
            {family.members.adverb.word}
          </h4>
          <p className="text-xs text-surface-600 dark:text-surface-400">{family.members.adverb.role}</p>
          <p className="text-[0.6875rem] text-surface-500 italic pt-1 border-t border-surface-200/60 dark:border-surface-750">
            &ldquo;{family.members.adverb.example}&rdquo;
          </p>
        </div>
      </div>

      {/* Golden Exam POS Rule */}
      <div className="p-3.5 rounded-xl bg-danger-50/50 dark:bg-danger-950/20 border border-danger-200 dark:border-danger-900/60 text-xs text-danger-900 dark:text-danger-200 flex items-start gap-2.5">
        <AlertCircle size={16} className="text-danger-600 dark:text-danger-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold block uppercase tracking-wider text-[0.6875rem]">
            High Court Grammatical Concord Law:
          </strong>
          <span className="leading-relaxed">{family.examTrap}</span>
        </div>
      </div>
    </Card>
  )
}
