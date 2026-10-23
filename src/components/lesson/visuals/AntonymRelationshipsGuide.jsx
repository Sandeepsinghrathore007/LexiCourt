import { useState } from 'react'
import { Split, GitCommit, Check, HelpCircle } from 'lucide-react'
import { Card, Badge } from '../../common'

const ANTONYM_TYPES = [
  {
    id: 'gradable',
    name: 'Gradable Antonyms',
    tagline: 'Continuous Scale with Middle Ground',
    heuristic: 'Test: Kya aap iske aage "Very" ya "Extremely" laga sakte hain? Agar haan, toh ye Gradable hai.',
    explanation: 'Ye opposites ek continuous spectrum ke do ends par hote hain. Inke beech intermediate stages hoti hain. Agar koi cheez "hot" nahi hai, iska matlab ye zaroori nahi ki wo "freezing cold" ho (wo "warm" ya "tepid" ho sakti hai).',
    examples: [
      { pair: 'Rich vs Poor', middle: 'Middle-class / Moderate', nuance: 'Not rich does not guarantee destitute poverty.' },
      { pair: 'Hot vs Cold', middle: 'Warm / Tepid / Cool', nuance: 'Continuous thermal gradient.' },
      { pair: 'Fast vs Slow', middle: 'Moderate pace', nuance: 'Speed spectrum allows intermediate velocities.' },
      { pair: 'Generous vs Miserly', middle: 'Frugal / Economical', nuance: 'Spending habits permit balanced moderation.' }
    ],
    examTip: 'Gradable antonyms mein question stem ke intensity level se match karta hua opposite chunein (e.g. Freezing ka opposite Boiling, na ki sirf Warm).'
  },
  {
    id: 'complementary',
    name: 'Complementary / Binary Antonyms',
    tagline: 'Absolute Either / Or (Zero Middle Ground)',
    heuristic: 'Test: Kya kisi ek ka negation doosre ka 100% confirmation banata hai? Agar haan, toh ye Complementary hai.',
    explanation: 'Ye pairs strictly mutually exclusive hote hain. Yahan koi beech ka rasta nahi hota. Agar koi vyakti "alive" nahi hai, toh wo strictly "dead" hai. Courtroom verdicts mein "innocent" vs "guilty" complementary pair hai.',
    examples: [
      { pair: 'Alive vs Dead', middle: 'None (Absolute binary)', nuance: 'Not alive strictly entails dead.' },
      { pair: 'Pass vs Fail', middle: 'None (Institutional cutoff)', nuance: 'Examination outcome is strictly binary.' },
      { pair: 'True vs False', middle: 'None (Logical dichotomy)', nuance: 'Propositional truth-value is non-gradable.' },
      { pair: 'Innocent vs Guilty', middle: 'None (Judicial determination)', nuance: 'Legal conviction is complementary.' }
    ],
    examTip: 'Complementary antonyms ke sath "very" ya "more" lagana illogical hota hai (*very dead, *more innocent). Exam mein modifier-based trap questions se bachein.'
  },
  {
    id: 'relational',
    name: 'Relational / Converse Antonyms',
    tagline: 'Reciprocal Relationship from Opposite Perspectives',
    heuristic: 'Test: Kya A aur B ek hi transaction ya relation ko do alag angles se describe karte hain?',
    explanation: 'Ye pairs ek reciprocal relationship express karte hain. Ek ka hona doosre ke bina sambhav hi nahi hai. Agar X ne Y ko car bechi (sell), toh Y ne X se car khareedi (buy). High Court legal hierarchies mein "appellant" vs "respondent" relational opposite hai.',
    examples: [
      { pair: 'Buy vs Sell', middle: 'Reciprocal economic transaction', nuance: 'If A buys from B, B necessarily sells to A.' },
      { pair: 'Lend vs Borrow', middle: 'Custodial asset transfer', nuance: 'Lending implies a concurrent borrowing party.' },
      { pair: 'Teacher vs Student', middle: 'Pedagogical relationship', nuance: 'Instruction requires a recipient learner.' },
      { pair: 'Appellant vs Respondent', middle: 'Judicial litigation contest', nuance: 'Legal petition demands an opposing party.' }
    ],
    examTip: 'Relational pairs mein perspective identify karein: inward action vs outward action.'
  },
  {
    id: 'directional',
    name: 'Directional / Reverse Antonyms',
    tagline: 'Opposite Movements, Actions, or Processes',
    heuristic: 'Test: Kya ek action doosre action ke physical ya metaphorical asar ko undo/reverse karta hai?',
    explanation: 'Ye verbs ya directional nouns ek doosre ke movement vectors ko reverse karte hain. E.g., Assemble (jodna) vs Dismantle (alag karna); Expand (phailna) vs Contract (sikudna).',
    examples: [
      { pair: 'Assemble vs Dismantle', middle: 'Physical structural state', nuance: 'Dismantle reverses the act of assembling.' },
      { pair: 'Ascend vs Descend', middle: 'Vertical spatial vector', nuance: 'Ascend moves upward; descend moves downward.' },
      { pair: 'Expand vs Contract', middle: 'Volume / territorial dimension', nuance: 'Contract reverses expansion.' },
      { pair: 'Admit vs Deny', middle: 'Pleading assertion', nuance: 'Denial refutes what admission conceded.' }
    ],
    examTip: 'Action verbs mein process-reversal verbs chunein (e.g. Invalidate / Repeal a statute).'
  }
]

export default function AntonymRelationshipsGuide() {
  const [activeTypeId, setActiveTypeId] = useState('gradable')

  const currentType = ANTONYM_TYPES.find((t) => t.id === activeTypeId) || ANTONYM_TYPES[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-100 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Visual 4 • Linguistic Classification</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">4 Antonym Relationship Typologies</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50 mt-1">
            Antonym Relationships Guide: Gradable, Complementary, Relational & Reverse Typologies
          </h3>
        </div>
      </div>

      {/* Type Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {ANTONYM_TYPES.map((t) => {
          const isActive = t.id === activeTypeId
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTypeId(t.id)}
              className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                isActive
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-950 text-primary-900 dark:text-primary-100 shadow-xs ring-1 ring-primary-500'
                  : 'border-surface-200 dark:border-surface-750 bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:border-surface-300'
              }`}
            >
              <span className="block font-bold">{t.name}</span>
              <span className="text-[0.625rem] text-surface-500 font-mono mt-0.5 block truncate">{t.tagline}</span>
            </button>
          )
        })}
      </div>

      {/* Heuristic Diagnostic Test Box */}
      <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <HelpCircle size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold block uppercase tracking-wider text-[0.6875rem]">
            Diagnostic Litmus Test:
          </strong>
          <span className="leading-relaxed">{currentType.heuristic}</span>
        </div>
      </div>

      {/* Detailed Description & Pairs */}
      <div className="space-y-4">
        <p className="text-xs text-surface-700 dark:text-surface-300 leading-relaxed">
          {currentType.explanation}
        </p>

        {/* 4 Representative Pairs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentType.examples.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-surface-900 dark:text-white font-mono">
                  {item.pair}
                </span>
                <span className="text-[0.625rem] px-2 py-0.5 rounded-full bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 font-mono">
                  {item.middle}
                </span>
              </div>
              <p className="text-[0.75rem] text-surface-600 dark:text-surface-400 leading-relaxed">
                {item.nuance}
              </p>
            </div>
          ))}
        </div>

        {/* High Court Exam Tip */}
        <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-900 text-xs text-primary-900 dark:text-primary-200 leading-relaxed">
          <strong className="font-bold">Exam Trap Alert: </strong>
          {currentType.examTip}
        </div>
      </div>
    </Card>
  )
}
