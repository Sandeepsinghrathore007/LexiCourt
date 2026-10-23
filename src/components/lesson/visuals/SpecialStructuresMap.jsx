import { useState } from 'react'
import { Layers } from 'lucide-react'
import { Card, Badge } from '../../common'

const SPECIAL_STRUCTURES = [
  {
    id: 'rel-one-of',
    title: '"One of the..." Relative Clause Concord',
    formula: 'One of the [Plural Noun] + WHO/THAT + [PLURAL VERB]',
    contrastFormula: 'THE ONLY ONE of the [Plural Noun] + WHO/THAT + [SINGULAR VERB]',
    contrastReason: 'Standard relative clause mein antecedent plural noun hota hai ➔ Plural verb. Lekin "The only" lagte hi antecedent sirf single individual par restrict ho jata hai ➔ Singular verb.',
    standardExample: 'He is one of those advocates who have argued constitutional matters.',
    contrastExample: 'She is the only one of the applicants who has passed with zero typing errors.'
  },
  {
    id: 'distributive-each',
    title: '"Each of" Distributive vs Post-Posed "Each"',
    formula: 'Each of the + [Plural Noun] ➔ [SINGULAR VERB]',
    contrastFormula: '[Plural Noun] + each ➔ [PLURAL VERB]',
    contrastReason: 'Jab "Each of" pehle aaye, toh subject "Each" (singular) hota hai. Jab plural noun pehle aaye aur "each" baad mein, toh subject plural noun hi rehta hai.',
    standardExample: 'Each of the computers has been scanned for malware.',
    contrastExample: 'The computers each have independent power backups.'
  },
  {
    id: 'many-a',
    title: '"Many a" vs "More than one"',
    formula: 'Many a + [Singular Noun] ➔ [SINGULAR VERB]',
    contrastFormula: 'More than one + [Singular Noun] ➔ [SINGULAR VERB]',
    contrastReason: 'Dono idioms ka meaning plural ("many") hota hai, lekin English syntax form-driven hai—noun aur verb dono strictly singular rehte hain.',
    standardExample: 'Many a promising candidate has failed the speed test.',
    contrastExample: 'More than one computer was damaged during the heavy thunderstorm.'
  },
  {
    id: 'gerund-subject',
    title: 'Gerund & Infinitive Phrase Subjects',
    formula: 'V-ing Phrase / To + V1 Phrase ➔ [SINGULAR VERB]',
    contrastFormula: 'Compound Gerunds (A and B) ➔ [PLURAL VERB]',
    contrastReason: 'Ek single gerund phrase (bhale hi uske andar multiple plural objects hon) ek single abstract concept represent karta hai.',
    standardExample: 'Maintaining high-speed typing records requires continuous daily practice.',
    contrastExample: 'Drafting petitions and verifying case records are essential judicial skills.'
  }
]

export default function SpecialStructuresMap() {
  const [activeStructId, setActiveStructId] = useState('rel-one-of')

  const currentStruct = SPECIAL_STRUCTURES.find((s) => s.id === activeStructId) || SPECIAL_STRUCTURES[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700 shadow-xs">
      <div className="pb-4 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="primary" size="sm">Visual Engine 6</Badge>
          <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
            Advanced Syntax Compass
          </span>
        </div>
        <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
          Special-Construction Reference Map
        </h3>
        <p className="text-xs text-surface-600 dark:text-surface-300 mt-0.5">
          High Court competitive exams ke subtle relative, distributive aur idiomatic structures ka reference guide.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {SPECIAL_STRUCTURES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveStructId(s.id)}
            className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeStructId === s.id
                ? 'bg-primary-600 text-white shadow-xs'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
            }`}
          >
            <Layers size={14} className="mb-1" />
            <span className="truncate">{s.title.split(' ')[0]} {s.title.split(' ')[1]}</span>
          </button>
        ))}
      </div>

      {/* Structure Visual Container */}
      <div className="p-6 rounded-2xl bg-surface-50 dark:bg-surface-900/90 border border-surface-200 dark:border-surface-700 space-y-6">
        <div className="space-y-1">
          <Badge variant="primary" size="sm">Active Special Construction</Badge>
          <h4 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
            {currentStruct.title}
          </h4>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            {currentStruct.contrastReason}
          </p>
        </div>

        {/* Dual Structure Formulas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-primary-50/60 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 space-y-2">
            <span className="text-[0.625rem] font-bold text-primary-700 dark:text-primary-300 uppercase block font-mono">
              Pattern 1: Standard Construction
            </span>
            <div className="p-2 rounded bg-white dark:bg-surface-800 font-mono text-xs font-bold text-primary-900 dark:text-primary-100 border border-primary-200 dark:border-primary-700">
              {currentStruct.formula}
            </div>
            <p className="text-xs text-surface-700 dark:text-surface-300 italic pt-1">
              "{currentStruct.standardExample}"
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
            <span className="text-[0.625rem] font-bold text-amber-700 dark:text-amber-300 uppercase block font-mono">
              Pattern 2: The Critical Nuance / Contrast
            </span>
            <div className="p-2 rounded bg-white dark:bg-surface-800 font-mono text-xs font-bold text-amber-900 dark:text-amber-100 border border-amber-200 dark:border-amber-700">
              {currentStruct.contrastFormula}
            </div>
            <p className="text-xs text-surface-700 dark:text-surface-300 italic pt-1">
              "{currentStruct.contrastExample}"
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
