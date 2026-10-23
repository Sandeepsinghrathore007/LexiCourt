import { useState } from 'react'
import { GitBranch, CheckCircle2 } from 'lucide-react'
import { Card, Badge } from '../../common'

const DECISION_PATHS = [
  {
    id: 'path-and',
    title: 'Compound Subject with "AND"',
    question: 'Sentence mein subjects "AND" se jude hain?',
    conditionA: 'Do alag-alag vyakti / entities hain ("The clerk and the peon")',
    outcomeA: 'PLURAL VERB ("The clerk and the peon ARE present")',
    conditionB: 'Single concept / food dish / same office ("Bread and butter" / "The Director and Producer")',
    outcomeB: 'SINGULAR VERB ("Bread and butter IS served" / "The Director and Producer HAS arrived")',
    examTip: 'Check articles: Agar sirf ek "The" hai ➔ Singular. Agar do "The" hain ➔ Plural.'
  },
  {
    id: 'path-or-nor',
    title: 'Correlatives: "Either...or / Neither...nor"',
    question: 'Sentence mein "or", "nor", "either...or", "neither...nor" use hua hai?',
    conditionA: 'Verb ke sabse paas wala subject PLURAL hai',
    outcomeA: 'PLURAL VERB ("Neither the teacher nor the students ARE...")',
    conditionB: 'Verb ke sabse paas wala subject SINGULAR hai',
    outcomeB: 'SINGULAR VERB ("Neither the students nor the teacher IS...")',
    examTip: 'Proximity Rule: Verb ko sirf paas wale subject se matlab hai, pehle subject ko ignore karein.'
  },
  {
    id: 'path-parenthetical',
    title: 'Parenthetical Connectives: "As well as / Along with"',
    question: 'Sentence mein "along with", "as well as", "together with", "in addition to" aaya hai?',
    conditionA: 'Pehla subject (Subject 1) SINGULAR hai',
    outcomeA: 'SINGULAR VERB ("The Judge, along with three clerks, WAS...")',
    conditionB: 'Pehla subject (Subject 1) PLURAL hai',
    outcomeB: 'PLURAL VERB ("The clerks, along with the judge, WERE...")',
    examTip: 'First Subject Rule: Parenthetical phrase ko ignore karein, verb strictly Subject 1 ke hisaab se lagayein.'
  },
  {
    id: 'path-distributive',
    title: 'Distributives: "Each of / Neither of / Every"',
    question: 'Sentence "Each of...", "Neither of...", ya "Every..." se shuru ho raha hai?',
    conditionA: 'Standard Distributive Phrase ("Each of the candidates", "Neither of the plans")',
    outcomeA: 'STRICTLY SINGULAR VERB ("Each of the candidates HAS passed")',
    conditionB: 'Post-posed "each" ("The candidates each...")',
    outcomeB: 'PLURAL VERB ("The candidates each HAVE a computer")',
    examTip: '"Each of" ke baad plural noun dekhkar attract na hon. Subject "Each" hai ➔ Singular Verb!'
  },
  {
    id: 'path-number',
    title: 'The Number Concord: "A number of" vs "The number of"',
    question: 'Sentence mein "number of" phrase aaya hai?',
    conditionA: '"A number of + Plural Noun" (Meaning: Many / Several)',
    outcomeA: 'PLURAL VERB ("A number of petitions HAVE BEEN filed")',
    conditionB: '"The number of + Plural Noun" (Meaning: Numerical count)',
    outcomeB: 'SINGULAR VERB ("The number of petitions HAS increased")',
    examTip: '"A number" = Many (Plural). "THE number" = One single count (Singular).'
  }
]

export default function SVADecisionTree() {
  const [selectedPathId, setSelectedPathId] = useState('path-and')

  const currentPath = DECISION_PATHS.find((p) => p.id === selectedPathId) || DECISION_PATHS[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700 shadow-xs">
      <div className="pb-4 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="primary" size="sm">Visual Engine 2</Badge>
          <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
            Interactive Branching Logic
          </span>
        </div>
        <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
          SVA Step-by-Step Decision Tree
        </h3>
        <p className="text-xs text-surface-600 dark:text-surface-300 mt-0.5">
          Competitive exam questions ko solve karte waqt sahi rule branch choose karne ka algorithmic roadmap.
        </p>
      </div>

      {/* Pathway Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {DECISION_PATHS.map((path) => (
          <button
            key={path.id}
            type="button"
            onClick={() => setSelectedPathId(path.id)}
            className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer flex flex-col justify-between ${
              selectedPathId === path.id
                ? 'bg-primary-600 text-white shadow-xs'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
            }`}
          >
            <GitBranch size={14} className="mb-1" />
            <span className="truncate">{path.title}</span>
          </button>
        ))}
      </div>

      {/* Decision Tree Branching Visualizer */}
      <div className="p-6 rounded-2xl bg-surface-50 dark:bg-surface-900/90 border border-surface-200 dark:border-surface-700 space-y-6">
        {/* Core Question Node */}
        <div className="p-4 rounded-xl bg-white dark:bg-surface-800 border-2 border-primary-500/50 dark:border-primary-500/70 shadow-xs space-y-1">
          <Badge variant="primary" size="sm">Diagnostic Question Node</Badge>
          <h4 className="text-base font-bold text-surface-900 dark:text-surface-50 font-heading">
            {currentPath.question}
          </h4>
        </div>

        {/* Binary Outcome Branches */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Branch A */}
          <div className="p-4 rounded-xl bg-primary-50/60 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 space-y-3">
            <div className="flex items-center gap-2 text-primary-800 dark:text-primary-200 font-bold text-xs">
              <span className="w-5 h-5 rounded-full bg-primary-600 text-white flex items-center justify-center text-[0.625rem]">A</span>
              <span>Branch Condition A</span>
            </div>
            <p className="text-xs text-surface-700 dark:text-surface-300 font-medium">
              {currentPath.conditionA}
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-surface-800 border border-primary-300 dark:border-primary-700 font-mono text-xs text-primary-900 dark:text-primary-100 font-bold">
              ➔ {currentPath.outcomeA}
            </div>
          </div>

          {/* Branch B */}
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 font-bold text-xs">
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[0.625rem]">B</span>
              <span>Branch Condition B</span>
            </div>
            <p className="text-xs text-surface-700 dark:text-surface-300 font-medium">
              {currentPath.conditionB}
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-surface-800 border border-amber-300 dark:border-amber-700 font-mono text-xs text-amber-900 dark:text-amber-100 font-bold">
              ➔ {currentPath.outcomeB}
            </div>
          </div>
        </div>

        {/* Master Strategy Tip */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 flex items-start gap-3">
          <CheckCircle2 size={18} className="text-success-600 dark:text-success-400 shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-surface-700 dark:text-surface-200 leading-relaxed">
            <strong>Exam Decision Algorithm:</strong> {currentPath.examTip}
          </p>
        </div>
      </div>
    </Card>
  )
}
