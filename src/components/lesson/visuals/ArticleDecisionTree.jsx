import { useState } from 'react'
import { GitBranch, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react'
import { Card, Badge } from '../../common'

const TEST_SCENARIOS = [
  {
    id: 'sc-univ',
    name: 'university',
    label: 'a university',
    type: 'Singular Countable',
    isSpecific: false,
    sound: 'Consonant sound /j/ ("yu")',
    result: 'A',
    path: ['General Reference', 'Singular Countable', 'Consonant Opening Sound /j/'],
    explanation: 'Written letter "u" hai, lekin spoken sound /juː/ (consonant sound "yu") hai. Isliye "a university" correct hai.'
  },
  {
    id: 'sc-honest',
    name: 'honest judge',
    label: 'an honest judge',
    type: 'Singular Countable',
    isSpecific: false,
    sound: 'Vowel sound /ɒ/ (silent "h")',
    result: 'AN',
    path: ['General Reference', 'Singular Countable', 'Vocalic Opening Sound /ɒ/'],
    explanation: 'Written letter "h" silent hai aur spoken sound vowel /ɒ/ se start hota hai. Isliye "an honest judge" correct hai.'
  },
  {
    id: 'sc-fir',
    name: 'FIR',
    label: 'an FIR',
    type: 'Singular Countable Initialism',
    isSpecific: false,
    sound: 'Vowel sound /e/ ("Ef")',
    result: 'AN',
    path: ['General Reference', 'Singular Countable', 'Vocalic Initialism Sound /ef/'],
    explanation: 'Letter "F" bolte waqt opening sound /ef/ ("e" swar) nikalta hai. Isliye "an FIR" correct hai.'
  },
  {
    id: 'sc-himalayas',
    name: 'Himalayas',
    label: 'the Himalayas',
    type: 'Mountain Range Proper Noun',
    isSpecific: true,
    sound: 'Conventional Specific',
    result: 'THE',
    path: ['Specific Reference', 'Mountain Range (Chain)', 'Definite Article Law'],
    explanation: 'Continuous mountain chains convention ke mutabiq definite article "The" leti hain. Isliye "the Himalayas" correct hai.'
  },
  {
    id: 'sc-everest',
    name: 'Mount Everest',
    label: 'Mount Everest (Ø)',
    type: 'Individual Mountain Peak',
    isSpecific: true,
    sound: 'Geographical Exception',
    result: 'ZERO ARTICLE (Ø)',
    path: ['Specific Reference', 'Single Mountain Peak', 'Proper Noun Omission Rule'],
    explanation: 'Single mountain peaks ("Mount Everest", "Mount Abu") ke aage "The" KABHI NAHI lagta. Zero Article (Ø) standard hai.'
  },
  {
    id: 'sc-water-bottle',
    name: 'water in this bottle',
    label: 'the water in this bottle',
    type: 'Particularized Uncountable',
    isSpecific: true,
    sound: 'Restricted Context',
    result: 'THE',
    path: ['Specific Reference', 'Post-modified with Prepositional Phrase', 'Definite Article Law'],
    explanation: 'Phrase "in this bottle" ne paani ko specific container tak restrict kar diya hai. Particularized uncountables "The" lete hain.'
  },
  {
    id: 'sc-gold-general',
    name: 'Gold (is valuable)',
    label: 'Gold (Ø)',
    type: 'General Material Uncountable',
    isSpecific: false,
    sound: 'Generic Class',
    result: 'ZERO ARTICLE (Ø)',
    path: ['General Reference', 'General Uncountable Material Noun', 'Zero Article Law'],
    explanation: 'Jab material noun poori category ko represent kare bina kisi local container ke, toh Zero Article lagta hai.'
  },
  {
    id: 'sc-hospital-patient',
    name: 'hospital (as patient for treatment)',
    label: 'in hospital (Ø)',
    type: 'Institutional Primary Purpose',
    isSpecific: false,
    sound: 'Primary Functional Role',
    result: 'ZERO ARTICLE (Ø)',
    path: ['Institutional Expression', 'Primary Purpose (Medical Treatment)', 'Zero Article Law'],
    explanation: 'Patient bankar ilaj karwane jana hospital ka primary purpose hai. Primary functional purpose mein Zero Article lagta hai.'
  },
  {
    id: 'sc-hospital-visitor',
    name: 'hospital (as visitor to meet doctor)',
    label: 'to the hospital',
    type: 'Institutional Secondary Visit',
    isSpecific: true,
    sound: 'Physical Building Location',
    result: 'THE',
    path: ['Institutional Expression', 'Secondary Visit (Visitor / Meeting)', 'Definite Article Law'],
    explanation: 'Kisi se milne ya building visit karne ke liye jana secondary purpose hai. Isliye "the hospital" lagana zaroori hai.'
  }
]

export default function ArticleDecisionTree() {
  const [activeScenarioId, setActiveScenarioId] = useState('sc-univ')
  const activeScenario = TEST_SCENARIOS.find((s) => s.id === activeScenarioId) || TEST_SCENARIOS[0]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/60 text-primary-700 dark:text-primary-300 flex items-center justify-center">
            <GitBranch size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Interactive Article Decision Tree: A, An, The, or Zero Article (Ø)
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-300">
              Select a noun scenario to trace its exact grammatical decision path through the 4-stage algorithm.
            </p>
          </div>
        </div>
        <Badge variant="primary" size="sm">4-Stage Algorithm</Badge>
      </div>

      {/* Scenario Selector Pills */}
      <div>
        <span className="text-xs font-bold text-surface-600 dark:text-surface-400 block mb-2">
          Select Exam Word or Context to Test:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {TEST_SCENARIOS.map((sc) => {
            const isSelected = sc.id === activeScenarioId
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => setActiveScenarioId(sc.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary-600 text-white shadow-xs'
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
                }`}
              >
                {sc.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Decision Pipeline Stages */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Stage 1: Reference Specificity */}
        <div className="p-3.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[0.6875rem] font-bold text-surface-500 dark:text-surface-400 uppercase">Stage 1</span>
            <HelpCircle size={14} className="text-surface-400" />
          </div>
          <h4 className="font-heading font-bold text-xs text-surface-900 dark:text-surface-100">
            Reference Scope
          </h4>
          <p className="text-[0.6875rem] text-surface-600 dark:text-surface-300 leading-tight">
            Is the noun already identified, unique, or modified by a defining clause?
          </p>
          <div className="pt-2">
            <span className={`inline-block px-2 py-0.5 rounded text-[0.6875rem] font-bold ${
              activeScenario.isSpecific
                ? 'bg-primary-100 dark:bg-primary-950 text-primary-800 dark:text-primary-300 border border-primary-300'
                : 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
            }`}>
              {activeScenario.isSpecific ? 'Specific / Defined' : 'General / Indefinite'}
            </span>
          </div>
        </div>

        {/* Stage 2: Countability Classification */}
        <div className="p-3.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[0.6875rem] font-bold text-surface-500 dark:text-surface-400 uppercase">Stage 2</span>
            <HelpCircle size={14} className="text-surface-400" />
          </div>
          <h4 className="font-heading font-bold text-xs text-surface-900 dark:text-surface-100">
            Countability Check
          </h4>
          <p className="text-[0.6875rem] text-surface-600 dark:text-surface-300 leading-tight">
            Can the entity be pluralized or counted in discrete numeric units?
          </p>
          <div className="pt-2">
            <span className="inline-block px-2 py-0.5 rounded text-[0.6875rem] font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300/60">
              {activeScenario.type}
            </span>
          </div>
        </div>

        {/* Stage 3: Phonetic Opening Sound */}
        <div className="p-3.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[0.6875rem] font-bold text-surface-500 dark:text-surface-400 uppercase">Stage 3</span>
            <HelpCircle size={14} className="text-surface-400" />
          </div>
          <h4 className="font-heading font-bold text-xs text-surface-900 dark:text-surface-100">
            Spoken Phoneme
          </h4>
          <p className="text-[0.6875rem] text-surface-600 dark:text-surface-300 leading-tight">
            What is the initial sound produced when pronouncing the word aloud?
          </p>
          <div className="pt-2">
            <span className="inline-block px-2 py-0.5 rounded text-[0.6875rem] font-bold bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border border-purple-300/60">
              {activeScenario.sound}
            </span>
          </div>
        </div>

        {/* Stage 4: Final Determiner Lock */}
        <div className="p-3.5 rounded-xl border border-success-300 dark:border-success-800 bg-success-50/50 dark:bg-success-950/30 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[0.6875rem] font-bold text-success-700 dark:text-success-400 uppercase">Stage 4</span>
            <CheckCircle2 size={14} className="text-success-600 dark:text-success-400" />
          </div>
          <h4 className="font-heading font-bold text-xs text-surface-900 dark:text-surface-100">
            Final Article Output
          </h4>
          <p className="text-[0.6875rem] text-surface-600 dark:text-surface-300 leading-tight">
            The mandatory determiner required in standard grammar:
          </p>
          <div className="pt-1">
            <span className="inline-block px-3 py-1 rounded-lg text-sm font-extrabold bg-success-600 text-white shadow-xs">
              {activeScenario.result}
            </span>
          </div>
        </div>
      </div>

      {/* Decision Path Breadcrumb & Reasoning */}
      <div className="p-4 rounded-xl bg-white dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-surface-500 dark:text-surface-400">Decision Path:</span>
          {activeScenario.path.map((p, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-surface-100 dark:bg-surface-800 text-surface-800 dark:text-surface-200 font-medium">
                {p}
              </span>
              {idx < activeScenario.path.length - 1 && (
                <ArrowRight size={12} className="text-surface-400" />
              )}
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-surface-100 dark:border-surface-750">
          <h5 className="text-xs font-bold text-surface-800 dark:text-surface-200 mb-1">
            Grammar Derivation & Reasoning:
          </h5>
          <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed">
            {activeScenario.explanation}
          </p>
        </div>
      </div>
    </Card>
  )
}
