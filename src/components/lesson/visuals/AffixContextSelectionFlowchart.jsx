import { useState } from 'react'
import { CheckCircle2, ChevronRight, HelpCircle, Sparkles, AlertCircle, ArrowDown } from 'lucide-react'
import { Card, Badge, Button } from '../../common'

const EXAM_FLOWCHART_STEPS = [
  {
    step: 1,
    title: 'Step 1: Syntactic Sentence Slot Audit',
    description: 'Sentence ka blank space kis Part of Speech ki maang kar raha hai?',
    rules: [
      'Subject / Direct Object position ➔ Noun slot (e.g. require -tion, -ment, -ness, -ity, -ance)',
      'Directly modifying a noun ➔ Adjective slot (e.g. require -able, -al, -ous, -ic, -ive, -ful)',
      'Action / Predicate verb slot ➔ Verb slot (e.g. require -ize, -ify, -en, -ate)',
      'Modifying verb, adjective or sentence ➔ Adverb slot (e.g. require -ly, -ward, -wise)'
    ],
    distractorAlert: 'Eliminate options that have the wrong grammatical form, even if their meaning looks familiar!'
  },
  {
    step: 2,
    title: 'Step 2: Contextual Polarity & Valence Analysis',
    description: 'Sentence ka overall meaning positive, negative, intensive, ya objective fact demand kar raha hai?',
    rules: [
      'If context indicates opposition, failure, or wrongness ➔ Apply Negative prefix (un-, in-, dis-, mis-)',
      'If context indicates neutral classification without moral tone ➔ Apply non- (non-bailable, non-resident)',
      'If context indicates extreme praise or priceless value ➔ Watch out for intensive in- (invaluable = priceless!)',
      'If context indicates total absence of concept ➔ Apply privative a-/an- (amoral, atheist)'
    ],
    distractorAlert: "Beware of false negative traps like 'invaluable' and 'inflammable'!"
  },
  {
    step: 3,
    title: 'Step 3: Base Word & Etymological Origin Audit',
    description: 'Base word ko isolate karein aur uski linguistic origin check karein.',
    rules: [
      'Germanic base words take native affixes: un- + happy; care + -ful; sharp + -en',
      'Latin roots take Latin prefixes & suffixes: in- + legal ➔ illegal; pure + -ify ➔ purify; act + -ion',
      'Greek roots take Greek prefixes & suffixes: a- + theist ➔ atheist; chron + -ic ➔ chronic; auto + graph',
      'Assimilation triggers: before b/m/p ➔ im-; before l ➔ il-; before r ➔ ir-'
    ],
    distractorAlert: 'Do not pair mismatched Germanic prefixes with Latin bound roots unless standard usage permits!'
  },
  {
    step: 4,
    title: 'Step 4: Orthographic Spelling Boundary Verification',
    description: 'Affix judne ke boundary junction par spelling rules verify karein.',
    rules: [
      'Prefix Invariance: un- + necessary = unnecessary (double n); mis- + spell = misspell (double s)',
      'Silent "e" Rule: Drop before vowel suffix (hope -> hoping); Retain before consonant suffix (hope -> hopeful)',
      'Soft c/g Exception: Retain "e" before -able/-ous (noticeable, courageous)',
      '1-1-1 Doubling Rule: Double if stress on final syllable (occurred); Do NOT double if stress on initial syllable (benefited)'
    ],
    distractorAlert: 'Spelling distractors (*unecessary, *mispell, *noticable, *truely) are examiners\' primary weapons!'
  },
  {
    step: 5,
    title: 'Step 5: Distractor Elimination & Sentence Integration',
    description: 'Final selected word ko sentence mein fit karke read karein aur cross-verify karein.',
    rules: [
      'Check concord and sense: Does the completed sentence read fluently without syntactic friction?',
      'Verify lookalikes: Did you choose sensible (wise) instead of sensitive (delicate)?',
      'Verify historic (epoch-making) instead of historical (study of past)?',
      'Ensure no double conjunctions or grammatical redundancies were inadvertently introduced.'
    ],
    distractorAlert: 'Read the complete sentence with your chosen option to confirm absolute syntactic concord!'
  }
]

const DEMO_QUESTIONS = [
  {
    id: 'demo-1',
    prompt: 'Sentence: "The high court registry considered the handwritten revenue notes completely _______ (LEGIBLE)."',
    solution: [
      { step: 1, action: 'Slot Check: Predicate adjective following "considered ... completely". Target POS = Adjective.' },
      { step: 2, action: 'Polarity Check: Hand-written notes with complaints are usually unreadable. Negative polarity needed.' },
      { step: 3, action: 'Root Origin: "Legible" is a Latin adjective beginning with liquid consonant "l".' },
      { step: 4, action: 'Assimilation Law: "in-" + "legible" assimilates to "il-" + "legible" = "illegible" (double l).' },
      { step: 5, action: 'Final Synthesis: "illegible". Distractors like *unlegible, *inlegible, *eligible eliminated.' }
    ]
  },
  {
    id: 'demo-2',
    prompt: 'Sentence: "The senior advocate offered _______ (VALUE) guidance that proved decisive in winning the writ appeal."',
    solution: [
      { step: 1, action: 'Slot Check: Attributive adjective modifying noun "guidance". Target POS = Adjective.' },
      { step: 2, action: 'Polarity Check: "proved decisive in winning" signifies extreme, priceless help. Intensive positive polarity needed.' },
      { step: 3, action: 'Root Origin: Base is "value" + suffix "-able" = valuable.' },
      { step: 4, action: 'Prefix Selection: Intensive "in-" + "valuable" = "invaluable" (priceless / beyond calculation).' },
      { step: 5, action: 'Final Synthesis: "invaluable". Distractors like "valueless" and "worthless" completely rejected.' }
    ]
  }
]

export default function AffixContextSelectionFlowchart() {
  const [activeStep, setActiveStep] = useState(1)
  const [selectedDemoId, setSelectedDemoId] = useState(DEMO_QUESTIONS[0].id)

  const activeDemo = DEMO_QUESTIONS.find((d) => d.id === selectedDemoId) || DEMO_QUESTIONS[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-100 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Architecture 7</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Cognitive Exam Protocol</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50">
            Affix Context Selection Flowchart: 5-Step Derivation Algorithm
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-400 mt-0.5">
            Competitive exam questions mein zero guesswork ke sath sahi affix aur spelling derive karne ka cognitive solving protocol.
          </p>
        </div>
      </div>

      {/* 5-Step Horizontal Flow Indicator */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {EXAM_FLOWCHART_STEPS.map((s) => (
          <button
            key={s.step}
            type="button"
            onClick={() => setActiveStep(s.step)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeStep === s.step
                ? 'bg-primary-50 dark:bg-primary-950/80 border-primary-400 dark:border-primary-500 shadow-xs'
                : 'bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[0.6875rem] font-mono font-bold text-primary-700 dark:text-primary-300">
                STEP {s.step}
              </span>
              <span className="text-xs">{activeStep === s.step ? '●' : '○'}</span>
            </div>
            <h5 className="text-xs font-bold text-surface-900 dark:text-surface-100 leading-tight">
              {s.title.split(': ')[1]}
            </h5>
          </button>
        ))}
      </div>

      {/* Active Step Deep-Dive Card */}
      {(() => {
        const current = EXAM_FLOWCHART_STEPS.find((s) => s.step === activeStep) || EXAM_FLOWCHART_STEPS[0]
        return (
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-surface-200 dark:border-surface-700">
              <h4 className="text-sm font-bold text-surface-900 dark:text-surface-50">
                {current.title}
              </h4>
              <Badge variant="primary" size="sm">Phase {current.step} of 5</Badge>
            </div>

            <p className="text-xs text-surface-700 dark:text-surface-200 font-medium">
              {current.description}
            </p>

            {/* Rules List */}
            <div className="space-y-1.5 pt-1">
              {current.rules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-surface-700 dark:text-surface-300 bg-white dark:bg-surface-900 p-2.5 rounded-lg border border-surface-200 dark:border-surface-750">
                  <CheckCircle2 size={14} className="text-success-600 dark:text-success-400 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>

            {/* Distractor Alert */}
            <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <AlertCircle size={15} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Distractor Elimination Strategy: </strong>
                <span>{current.distractorAlert}</span>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Live Exam Derivation Walkthrough */}
      <div className="p-4 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-surface-100 dark:border-surface-800">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-primary-600 dark:text-primary-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-surface-700 dark:text-surface-300">
              Interactive Exam Question Walkthrough:
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {DEMO_QUESTIONS.map((d, idx) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDemoId(d.id)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedDemoId === d.id
                    ? 'bg-primary-600 text-white shadow-2xs'
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
                }`}
              >
                Question {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Question Prompt */}
        <div className="p-3 rounded-xl bg-surface-50 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 font-mono text-xs sm:text-sm font-semibold text-surface-900 dark:text-surface-100">
          {activeDemo.prompt}
        </div>

        {/* 5-Step Solution Progression */}
        <div className="space-y-2 pt-1">
          {activeDemo.solution.map((s, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs p-2 rounded-lg bg-surface-50/70 dark:bg-surface-850/60 border border-surface-200/70 dark:border-surface-750">
              <span className="font-mono text-[0.6875rem] font-bold text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-950 px-1.5 py-0.5 rounded shrink-0">
                S{s.step}
              </span>
              <span className="text-surface-700 dark:text-surface-200 leading-normal">{s.action}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
