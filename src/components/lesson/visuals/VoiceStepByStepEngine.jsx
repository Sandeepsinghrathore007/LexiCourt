import { useState } from 'react'
import { ChevronRight, ChevronLeft, Sparkles, AlertCircle } from 'lucide-react'
import { Card, Badge, Button } from '../../common'

const STEPS = [
  {
    step: 1,
    title: 'Step 1: Verb & Transitivity Isolation',
    tag: 'S-V-O Check',
    actionText: "Verb dhundein aur 'What?' / 'Whom?' test karein:",
    sentenceState: "The High Court committee [approved] [the revised rules] yesterday.",
    highlight: 'Verb = approved (Simple Past, V2). Approved WHAT? ➔ the revised rules (Direct Object). Transitive check: PASS.',
    ruleTip: "Agar verb ke baad 'What' ya 'Whom' ka answer nahi milta, toh sentence intransitive hai aur passive possible nahi hai."
  },
  {
    step: 2,
    title: 'Step 2: Object to Subject Transposition',
    tag: 'New Subject',
    actionText: "Original object ko sentence ke shuru mein naya subject banayein:",
    sentenceState: "[The revised rules] ... [the High Court committee] yesterday.",
    highlight: "'The revised rules' (Plural Noun) sentence ka naya primary focus aur syntactic subject ban gaya.",
    ruleTip: "Pronoun ho toh subjective case use karein (jaise 'him' ➔ 'He', 'me' ➔ 'I')."
  },
  {
    step: 3,
    title: "Step 3: Auxiliary 'Be' Form Selection",
    tag: 'Tense & Concord',
    actionText: "Tense freeze karein aur naye subject ke number ke anusar 'be' chunein:",
    sentenceState: "The revised rules [were] ... [the High Court committee] yesterday.",
    highlight: "Tense Simple Past hai aur naya subject plural ('rules') hai ➔ Auxiliary = 'were'.",
    ruleTip: "Agreement Alert: Active subject singular ('committee') tha, lekin passive auxiliary naye plural subject ('rules') ke according 'were' bani."
  },
  {
    step: 4,
    title: 'Step 4: Lexical Verb to Past Participle V3',
    tag: 'Mandatory V3',
    actionText: "Main lexical verb ko strictly V3 form mein badlein:",
    sentenceState: "The revised rules were [approved] ... [the High Court committee] yesterday.",
    highlight: "Base verb 'approve' ka Past Participle V3 form 'approved' hai. 'be + V3' complete ho gaya.",
    ruleTip: "Passive voice mein V1, V2, ya V-ing main verb ki jagah lagana strictly impossible hai."
  },
  {
    step: 5,
    title: 'Step 5: Agent Attachment & Modifiers',
    tag: 'Agent Assignment',
    actionText: "Original subject ko 'by' ke baad agent banayein aur modifiers jodein:",
    sentenceState: "The revised rules were approved [by the High Court committee] [yesterday].",
    highlight: "Original subject specific authority hai, isliye 'by the High Court committee' retain hua. Time adverbial 'yesterday' apni place par aaya.",
    ruleTip: "Agar subject 'someone' ya 'people' hota toh 'by + agent' naturally omit kar diya jata."
  }
]

export default function VoiceStepByStepEngine() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const activeStep = STEPS[currentStepIndex]

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-200 dark:border-surface-700 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Visual Architecture • Model 3</Badge>
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-300">
              Cognitive Conversion Algorithm
            </span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-white mt-1">
            Active-to-Passive 5-Step Execution Engine
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            Kisi bhi active sentence ko bina guessing kiye mathematically passive mein convert karne ka exact algorithm.
          </p>
        </div>

        {/* Step Progress Pills */}
        <div className="flex items-center gap-1">
          {STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setCurrentStepIndex(idx)}
              className={`w-7 h-7 rounded-lg text-xs font-bold font-mono transition-all ${
                idx === currentStepIndex
                  ? 'bg-primary-600 text-white shadow-xs'
                  : idx < currentStepIndex
                  ? 'bg-success-100 dark:bg-success-950/60 text-success-700 dark:text-success-300 border border-success-300 dark:border-success-800'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400'
              }`}
            >
              {s.step}
            </button>
          ))}
        </div>
      </div>

      {/* Active Step Workspace */}
      <div className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="neutral" size="sm" className="font-mono">
            {activeStep.tag}
          </Badge>
          <span className="text-xs text-surface-500 dark:text-surface-400 font-mono">
            Stage {activeStep.step} of 5
          </span>
        </div>

        <div>
          <h4 className="font-heading font-bold text-base text-surface-900 dark:text-white">
            {activeStep.title}
          </h4>
          <p className="text-xs text-surface-600 dark:text-surface-300 mt-0.5">
            {activeStep.actionText}
          </p>
        </div>

        {/* Live Sentence State Box */}
        <div className="p-4 rounded-xl bg-white dark:bg-surface-900 border-2 border-primary-200 dark:border-primary-800 font-mono text-sm sm:text-base text-surface-900 dark:text-white shadow-xs">
          {activeStep.sentenceState}
        </div>

        {/* Step Insight */}
        <div className="p-3 rounded-xl bg-primary-50/60 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800/60 text-xs text-primary-950 dark:text-primary-100 flex items-start gap-2.5">
          <Sparkles size={16} className="text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
          <div>
            <strong>Step Analysis: </strong>{activeStep.highlight}
          </div>
        </div>

        {/* Rule Tip Callout */}
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
          <AlertCircle size={15} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <span><strong>Exam Rule: </strong>{activeStep.ruleTip}</span>
        </div>
      </div>

      {/* Stepper Controls */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          icon={ChevronLeft}
          disabled={currentStepIndex === 0}
          onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
        >
          Previous Step
        </Button>

        <span className="text-xs font-semibold text-surface-600 dark:text-surface-400">
          Source: "The High Court committee approved the revised rules yesterday."
        </span>

        <Button
          variant="primary"
          size="sm"
          iconRight={ChevronRight}
          disabled={currentStepIndex === STEPS.length - 1}
          onClick={() => setCurrentStepIndex((prev) => Math.min(STEPS.length - 1, prev + 1))}
        >
          Next Step
        </Button>
      </div>
    </Card>
  )
}
