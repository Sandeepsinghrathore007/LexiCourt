import { useState } from 'react'
import { CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react'
import { Card, Badge, Button } from '../../common'

const DECISION_STEPS = [
  {
    stepNum: 1,
    question: 'Kya sentence mein koi overt (written) subject maujood hai?',
    options: [
      {
        text: 'NO (Subject hidden hai, sentence direct verb se start ho raha hai)',
        next: 'imperative-branch',
        badge: 'Imperative Sentence Detected',
      },
      {
        text: 'YES (Subject explicitly likha hua hai: The court, She, The clerk...)',
        next: 2,
        badge: 'Assertive / Standard Sentence',
      },
    ],
  },
  {
    stepNum: 2,
    question: 'Kya verb phrase mein koi Modal Auxiliary (can, may, must, should, would...) hai?',
    options: [
      {
        text: 'YES (Sentence contains a Modal verb)',
        next: 'modal-branch',
        badge: 'Modal Passive Architecture',
      },
      {
        text: 'NO (Verb standard finite tense form mein hai)',
        next: 3,
        badge: 'Non-Modal Verb',
      },
    ],
  },
  {
    stepNum: 3,
    question: 'Kya verb ke sath koi fixed preposition ya phrasal particle laga hai (look into, laugh at, call off)?',
    options: [
      {
        text: 'YES (Prepositional / Phrasal Verb present hai)',
        next: 'prep-branch',
        badge: 'Preposition Retention Rule',
      },
      {
        text: 'NO (Verb standard single word hai)',
        next: 4,
        badge: 'Standard Single Verb',
      },
    ],
  },
  {
    stepNum: 4,
    question: 'Kya sentence mein do objects hain (Indirect Object: person + Direct Object: thing)?',
    options: [
      {
        text: 'YES (Bi-Transitive: e.g. gave him a certificate)',
        next: 'two-object-branch',
        badge: 'Two-Object Dual Route',
      },
      {
        text: 'NO (Single Direct Object present hai)',
        next: 'standard-tense-branch',
        badge: 'Lesson 04 Standard Tense Matrix',
      },
    ],
  },
]

const TERMINAL_BRANCHES = {
  'imperative-branch': {
    title: 'Branch A: Imperative Sentence Decision',
    formula: 'Tone Check: Command ➔ Let + Obj + be + V3 | Request ➔ You are requested to + V1 | Advice ➔ Obj + should be + V3 | Negative ➔ Let + Obj + not + be + V3 | Intransitive ➔ You are ordered to + V1',
    ruleTip: 'Sentence ki communicative tone check karein. Formal polite request mein "requested to", direct command mein "Let... be", aur civic advice mein "should be" apply karein.',
    example: 'Active: "Submit the report." ➔ Passive: "Let the report be submitted."',
  },
  'modal-branch': {
    title: 'Branch B: Modal Auxiliary Decision',
    formula: 'Simple Modal: Modal + be + V3 | Modal Perfect: Modal + have been + V3',
    ruleTip: 'Voice mein modal backshift nahi hota ("can" "could" nahi banega). Agar active mein past deduction/duty hai ("should have"), toh passive mein "should have BEEN" aana mandatory hai.',
    example: 'Active: "They should have informed the court." ➔ Passive: "The court should have been informed by them."',
  },
  'prep-branch': {
    title: 'Branch C: Prepositional Verb Decision',
    formula: 'Preposition Retention: Object + appropriate be + V3 + Preposition + (by + Subject)',
    ruleTip: 'Verb ke sath lagi fixed preposition (into, at, with, for, to) passive mein bhi V3 ke theek baad chipki rahegi. "into by" do prepositions ek sath aana perfectly valid hai.',
    example: 'Active: "The bench looked into the matter." ➔ Passive: "The matter was looked into by the bench."',
  },
  'two-object-branch': {
    title: 'Branch D: Two-Object Bi-Transitive Decision',
    formula: 'Route A (Preferred): IO + be + V3 + DO | Route B: DO + be + V3 + to/for + IO',
    ruleTip: 'Agar Indirect Object (person) ko promote karein toh koi preposition nahi lagti. Lekin agar Direct Object (thing) promote karein toh IO se pehle "to" ya "for" lagana compulsory hai.',
    example: 'Active: "The judge gave him relief." ➔ Passive: "He was given relief by the judge." / "Relief was given to him by the judge."',
  },
  'standard-tense-branch': {
    title: 'Branch E: Standard Tense Matrix (Lesson 04 Foundation)',
    formula: 'Object + appropriate form of be + V3 + (by + agent)',
    ruleTip: 'Tense strictly freeze rakhein. Simple Present ➔ is/are + V3, Simple Past ➔ was/were + V3, Continuous ➔ being + V3, Perfect ➔ been + V3.',
    example: 'Active: "The clerk prepares the cause list." ➔ Passive: "The cause list is prepared by the clerk."',
  },
}

export default function AdvancedVoiceDecisionTree() {
  const [currentStepId, setCurrentStepId] = useState(1) // 1, 2, 3, 4, or terminal string
  const [history, setHistory] = useState([])

  const handleOptionSelect = (nextTarget) => {
    setHistory((prev) => [...prev, currentStepId])
    setCurrentStepId(nextTarget)
  }

  const handleReset = () => {
    setCurrentStepId(1)
    setHistory([])
  }

  const handleBack = () => {
    if (history.length === 0) return
    const prev = history[history.length - 1]
    setHistory((prevHistory) => prevHistory.slice(0, -1))
    setCurrentStepId(prev)
  }

  const isTerminal = typeof currentStepId === 'string'
  const activeQuestion = !isTerminal ? DECISION_STEPS.find((s) => s.stepNum === currentStepId) : null
  const terminalData = isTerminal ? TERMINAL_BRANCHES[currentStepId] : null

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-surface-200 dark:border-surface-700 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Model 5</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">
              Cognitive Algorithm
            </span>
          </div>
          <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
            Advanced Voice Decision Tree (Cognitive Solver)
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <Button variant="ghost" size="sm" icon={ChevronLeft} onClick={handleBack}>
              Pichhla Step
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleReset}>
            Reset Tree
          </Button>
        </div>
      </div>

      <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed max-w-[85ch]">
        Kisi bhi competitive exam question ko bina kisi confusion ke solve karne ke liye is decision flowchart ka use karein. Har question ka jawab dete huye aap accurate transformation formula tak pahunch jayenge:
      </p>

      {/* Decision Flow Viewport */}
      {!isTerminal && activeQuestion && (
        <div className="p-6 rounded-2xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              0{activeQuestion.stepNum}
            </div>
            <span className="text-xs font-mono uppercase font-bold text-surface-500">
              Checkpoint {activeQuestion.stepNum} of 4
            </span>
          </div>

          <h4 className="text-sm md:text-base font-bold text-surface-900 dark:text-surface-50">
            {activeQuestion.question}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {activeQuestion.options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleOptionSelect(opt.next)}
                className="p-4 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 hover:border-primary-400 hover:bg-primary-50/20 dark:hover:bg-primary-950/20 text-left transition-all cursor-pointer space-y-2 group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="neutral" size="sm">
                    {opt.badge}
                  </Badge>
                  <ChevronRight size={16} className="text-surface-400 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-xs font-semibold text-surface-800 dark:text-surface-100 leading-snug">
                  {opt.text}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Terminal Branch Result View */}
      {isTerminal && terminalData && (
        <div className="p-6 rounded-2xl bg-success-50/40 dark:bg-success-950/20 border border-success-300 dark:border-success-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-success-600 dark:text-success-400" />
              <h4 className="font-heading font-bold text-base text-success-950 dark:text-success-100">
                {terminalData.title}
              </h4>
            </div>
            <Badge variant="success" size="sm">Final Transformation Rule</Badge>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-surface-900 border border-success-200 dark:border-success-900 text-xs font-mono font-bold text-primary-700 dark:text-primary-300 shadow-xs">
            {terminalData.formula}
          </div>

          <div className="space-y-2 text-xs text-surface-700 dark:text-surface-300">
            <p className="leading-relaxed">
              <strong>Strategic Takeaway:</strong> {terminalData.ruleTip}
            </p>
            <p className="font-mono text-surface-800 dark:text-surface-200 bg-surface-100/60 dark:bg-surface-800/60 p-2.5 rounded-lg border border-surface-200 dark:border-surface-700">
              {terminalData.example}
            </p>
          </div>

          <Button variant="primary" size="sm" onClick={handleReset} className="mt-2">
            Dusra Question Solve Karein (Start Again)
          </Button>
        </div>
      )}
    </Card>
  )
}
