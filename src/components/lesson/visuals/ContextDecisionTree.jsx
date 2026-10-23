import { useState } from 'react'
import { ArrowRight, CornerDownRight } from 'lucide-react'
import { Card, Badge } from '../../common'

const DECISION_STEPS = [
  {
    step: 1,
    title: 'Grammatical Class Concord',
    question: 'Target word sentence mein kaunsa Part of Speech (Noun, Verb, Adjective, Adverb) play kar raha hai?',
    guidance: 'Agar stem word Adjective hai (e.g. "lucid"), toh Noun option ("lucidity") ya Verb option ("elucidate") ko pehle hi second mein eliminate karein.',
    action: 'Filter options to match the exact Part of Speech.',
    sample: 'Question: "The counsel offered a lucid explanation." ➔ Target: Adjective.'
  },
  {
    step: 2,
    title: 'Sentence Valence & Tone Anchor',
    question: 'Surrounding context ka sentiment positive, negative, ya neutral hai?',
    guidance: 'Contrasting connectives (however, although, yet) ya intensifying adverbs se sentence ki polarity lock karein. Positive context mein derogatory word kabhi fit nahi hoga.',
    action: 'Determine whether the required substitute must be commendatory or pejorative.',
    sample: '"Despite intense public criticism, the magistrate remained ___." ➔ Demands positive/steadfast quality.'
  },
  {
    step: 3,
    title: 'Intensity & Temperature Matching',
    question: 'Target word ka emotional force / intensity level kya hai (Mild vs Moderate vs Extreme)?',
    guidance: 'High Court examiners often place mild synonyms as distractors for extreme words. "Enraged" ka synonym "Annoyed" nahi ho sakta; "Incensed" ya "Furious" hona chahiye.',
    action: 'Match the severity/magnitude scale of the target word.',
    sample: '"The petitioner was incensed by the repeated delays." ➔ Level 4 Extreme Anger.'
  },
  {
    step: 4,
    title: 'Collocation & Sociolinguistic Register',
    question: 'Kya candidate option natural legal / formal English mein target context ke sath collocate karta hai?',
    guidance: 'Har word har noun ke sath nahi baithta. High Court "dismisses a petition", "quashes an FIR", "adjourns a hearing". Common informal words ("cancel", "stop") options mein distractor hote hain.',
    action: 'Verify collocational naturalness and formal judicial register.',
    sample: '"The High Court decided to ___ the fraudulent tender." ➔ "Quash / Annul" (Formal Legal), not "break".'
  },
  {
    step: 5,
    title: 'Process of Elimination (POE)',
    question: 'Final 2 close choices mein se lookalikes aur antonym traps ko kaise eliminate karein?',
    guidance: 'Ek option aksar target word ka direct antonym hota hai (speed test trap). Dusra option lookalike false friend hota hai (e.g., ingenuous vs ingenious). Bacha hua option 100% verified answer hai.',
    action: 'Eliminate opposite trap and morphological impostors.',
    sample: 'Target: "Adverse" ➔ Eliminate "Averse" (lookalike) and "Favorable" (opposite trap) ➔ Choose "Detrimental".'
  }
]

export default function ContextDecisionTree() {
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  const currentStep = DECISION_STEPS[activeStepIndex]

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-100 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Visual 3 • Cognitive Algorithm</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">5-Step Contextual Elimination Tree</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50 mt-1">
            Context Decision Tree: Algorithmic Vocabulary Resolution Protocol
          </h3>
        </div>
        <Badge variant="success" size="sm" className="self-start sm:self-auto">
          Zero Rat-Ta Guarantee
        </Badge>
      </div>

      {/* Decision Flow Pipeline */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {DECISION_STEPS.map((s, idx) => {
          const isActive = idx === activeStepIndex
          const isPassed = idx < activeStepIndex

          return (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStepIndex(idx)}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-950 text-primary-900 dark:text-primary-100 shadow-sm ring-1 ring-primary-500'
                  : isPassed
                  ? 'border-success-300 dark:border-success-900 bg-success-50/50 dark:bg-success-950/20 text-success-800 dark:text-success-300'
                  : 'border-surface-200 dark:border-surface-750 bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-surface-200 dark:bg-surface-700 font-mono text-[0.625rem] flex items-center justify-center font-bold">
                {s.step}
              </span>
              <span>{s.title.split(' ')[0]} {s.title.split(' ')[1] || ''}</span>
            </button>
          )
        })}
      </div>

      {/* Active Step Detailed Card */}
      <div className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[0.6875rem] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider font-mono">
              Diagnostic Phase 0{currentStep.step} of 05
            </span>
            <h4 className="text-base font-bold font-heading text-surface-900 dark:text-surface-50 mt-0.5">
              {currentStep.title}
            </h4>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-lg bg-surface-200/60 dark:bg-surface-800 text-surface-700 dark:text-surface-300 font-mono">
            Step {currentStep.step} / 5
          </span>
        </div>

        {/* Core Question */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-750 text-xs sm:text-sm font-semibold text-surface-900 dark:text-surface-100 flex items-start gap-2.5">
          <CornerDownRight size={16} className="text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
          <span>{currentStep.question}</span>
        </div>

        {/* Guidance & Concrete Sample */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-primary-50/50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-900/50 space-y-1">
            <strong className="text-primary-950 dark:text-primary-200 font-bold block">
              Cognitive Exam Heuristic:
            </strong>
            <p className="text-primary-800 dark:text-primary-300 leading-relaxed">
              {currentStep.guidance}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-surface-100/70 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-1">
            <strong className="text-surface-900 dark:text-surface-100 font-bold block">
              Realistic Question Walkthrough:
            </strong>
            <p className="text-surface-600 dark:text-surface-300 leading-relaxed italic">
              {currentStep.sample}
            </p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            disabled={activeStepIndex === 0}
            onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
            className="text-xs font-semibold text-surface-500 hover:text-surface-800 dark:hover:text-surface-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            Previous Step
          </button>
          <button
            type="button"
            disabled={activeStepIndex === DECISION_STEPS.length - 1}
            onClick={() => setActiveStepIndex((prev) => Math.min(DECISION_STEPS.length - 1, prev + 1))}
            className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            Next Decision Node <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </Card>
  )
}
