import { useState } from 'react'
import { ChevronRight, ChevronLeft, Sparkles, AlertCircle } from 'lucide-react'
import { Card, Badge, Button } from '../../common'

const FLOW_STEPS = [
  {
    step: 1,
    title: 'Step 1: Clause Anatomy & Referent Isolation',
    tag: 'Anatomy Isolation',
    actionText: 'Quotation marks ke bahar aur andar ke key components ko alag karein:',
    directSentence: 'Rohan said to Priya, "I will submit this case report tomorrow."',
    breakdown: [
      { label: 'Reporting Subject (Speaker)', value: 'Rohan (3rd person singular, male)' },
      { label: 'Reporting Verb', value: 'said to (Past Tense)' },
      { label: 'Reporting Object (Listener)', value: 'Priya (3rd person singular, female)' },
      { label: 'Reported Subject & Pronoun', value: '"I" (1st person pronoun)' },
      { label: 'Reported Verb & Modals', value: '"will submit" (Modal future)' },
      { label: 'Time & Place Adverbs', value: '"this" (demonstrative) & "tomorrow" (time)' },
    ],
    highlight: 'Speaker Rohan hai, listener Priya hai, reporting verb Past ("said") hai, aur quotation ke andar 1st person pronoun "I" aur modal "will" hain.',
    ruleTip: 'Identification Rule: Tense backshift aur pronoun transformation ke liye speaker, listener, aur reporting verb ka tense sabse pehle pehchanna mandatory hai.',
  },
  {
    step: 2,
    title: 'Step 2: Reporting Verb & Conjunction Adjustment',
    tag: 'Verb & Conjunction',
    actionText: "Reporting verb ko listener ke sath coordinate karein aur conjunction 'that' lagayein:",
    directSentence: 'Rohan [told Priya that] ... "I will submit this case report tomorrow."',
    breakdown: [
      { label: 'Old Verb Form', value: 'said to Priya' },
      { label: 'Transformed Verb', value: 'told Priya (Transitive, no preposition "to")' },
      { label: 'Conjunction Added', value: 'that (Declarative sentence connector)' },
      { label: 'Punctuation Removed', value: 'Comma (,) aur Quotation Marks ("...") permanently dropped' },
    ],
    highlight: '"Said to Priya" ➔ "told Priya". Quotation marks drop ho gaye aur declarative conjunction "that" ne dono clauses ko link kiya.',
    ruleTip: 'Fatal Trap: "Rohan told to Priya" kabhi na likhein! "Told" ke baad preposition "to" lagana examination standard mein fatal error hai.',
  },
  {
    step: 3,
    title: 'Step 3: Pronoun Reference Realignment',
    tag: 'Pronoun Shift',
    actionText: 'Reported pronouns ko original speaker aur listener ke hisaab se adjust karein:',
    directSentence: 'Rohan told Priya that [he] ... submit this case report tomorrow.',
    breakdown: [
      { label: 'Reported Pronoun', value: '"I" (First Person Singular)' },
      { label: 'Governing Source', value: 'Speaker Rohan (Male Singular)' },
      { label: 'New Pronoun Form', value: '"he" (Third Person Singular Subjective Case)' },
    ],
    highlight: '1st person pronoun "I" speaker Rohan ke anusaar "he" ban gaya. Perspective narrator ki ban gayi.',
    ruleTip: 'SON Rule: First person (I, we) matches Subject (Speaker). Second person (you) matches Object (Listener). Third person (he, she, they) remains unchanged.',
  },
  {
    step: 4,
    title: 'Step 4: Tense Backshift & Modal Adjustment',
    tag: 'Tense Backshift',
    actionText: 'Past reporting verb ke under modal aur verb ko backshift karein:',
    directSentence: 'Rohan told Priya that he [would submit] ... this case report tomorrow.',
    breakdown: [
      { label: 'Reporting Verb Tense', value: 'Past Tense ("told")' },
      { label: 'Original Modal', value: '"will submit" (Future intention)' },
      { label: 'Backshifted Modal', value: '"would submit" (Past-perspective future)' },
      { label: 'Lexical Verb Form', value: '"submit" remains base infinitive after modal' },
    ],
    highlight: 'Past reporting verb "told" ke influence se future modal "will" ek step peeche past perspective "would" mein backshift ho gaya.',
    ruleTip: 'Backshift Matrix: will ➔ would, can ➔ could, may ➔ might, Simple Present ➔ Simple Past, Simple Past ➔ Past Perfect.',
  },
  {
    step: 5,
    title: 'Step 5: Time/Place Shift & Final Synthesis',
    tag: 'Adverbials & Synthesis',
    actionText: 'Demonstrative aur time expressions ko shift karke final sentence assemble karein:',
    directSentence: 'Rohan told Priya that he would submit [that] case report [the next day].',
    breakdown: [
      { label: 'Demonstrative Shift', value: '"this" ➔ "that"' },
      { label: 'Time Expression Shift', value: '"tomorrow" ➔ "the next day" (or "the following day")' },
      { label: 'Final Output Sentence', value: 'Rohan told Priya that he would submit that case report the next day.' },
    ],
    highlight: 'Demonstrative "this" distance mein shift hokar "that" bana, aur "tomorrow" relative time mein "the next day" ban gaya. Meaning faithfully preserve ho gaya.',
    ruleTip: 'Chronology Rule: Tomorrow hamesha "the next day" ya "the following day" banta hai. Kabhi "yesterday" ya unadjusted "tomorrow" na chunein.',
  },
]

export default function DirectIndirectFlowEngine() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const activeStep = FLOW_STEPS[currentStepIndex]

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-200 dark:border-surface-700 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Visual Architecture • Model 1</Badge>
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-300">
              Interactive Transformation Algorithm
            </span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-white mt-1">
            Direct-to-Indirect 5-Step Execution Engine
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            Kisi bhi assertive direct speech sentence ko bina confusion ke step-by-step indirect speech mein transform karein.
          </p>
        </div>

        {/* Step Progress Pills */}
        <div className="flex items-center gap-1">
          {FLOW_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setCurrentStepIndex(idx)}
              className={`w-7 h-7 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
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
            STAGE {activeStep.step} OF 5
          </Badge>
          <span className="text-xs font-bold text-primary-700 dark:text-primary-300">
            {activeStep.tag}
          </span>
        </div>

        <div>
          <h4 className="text-base font-bold font-heading text-surface-900 dark:text-white">
            {activeStep.title}
          </h4>
          <p className="text-xs text-surface-600 dark:text-surface-300 mt-0.5">
            {activeStep.actionText}
          </p>
        </div>

        {/* Dynamic Sentence State Display */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-surface-900 border border-primary-200 dark:border-primary-800 font-mono text-xs sm:text-sm text-surface-900 dark:text-surface-100 font-semibold shadow-xs">
          {activeStep.directSentence}
        </div>

        {/* Breakdown Key-Value Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {activeStep.breakdown.map((item, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-surface-100/70 dark:bg-surface-700/50 border border-surface-200 dark:border-surface-600"
            >
              <span className="text-primary-700 dark:text-primary-300 font-semibold block text-[0.6875rem]">
                {item.label}:
              </span>
              <span className="text-surface-800 dark:text-surface-200 font-medium">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Step Highlight Note */}
        <div className="flex items-start gap-2 p-3 rounded-xl bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 text-xs text-primary-950 dark:text-primary-200">
          <Sparkles size={16} className="text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Cognitive Action: </strong>
            {activeStep.highlight}
          </p>
        </div>

        {/* Rule Tip Callout */}
        <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200">
          <AlertCircle size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Examination Rule: </strong>
            {activeStep.ruleTip}
          </p>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="secondary"
          size="sm"
          icon={ChevronLeft}
          onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentStepIndex === 0}
        >
          Previous Transformation Step
        </Button>
        <span className="text-xs text-surface-500 dark:text-surface-400 font-mono">
          Step {activeStep.step} / {FLOW_STEPS.length}
        </span>
        <Button
          variant="primary"
          size="sm"
          iconRight={ChevronRight}
          onClick={() => setCurrentStepIndex((prev) => Math.min(FLOW_STEPS.length - 1, prev + 1))}
          disabled={currentStepIndex === FLOW_STEPS.length - 1}
        >
          Next Transformation Step
        </Button>
      </div>
    </Card>
  )
}
