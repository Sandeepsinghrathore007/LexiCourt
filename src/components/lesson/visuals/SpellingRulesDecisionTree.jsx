import { useState } from 'react'
import { GitFork, CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertTriangle, HelpCircle } from 'lucide-react'
import { Card, Badge, Button } from '../../common'

const DECISION_TREES = [
  {
    id: 'silent-e',
    name: 'Rule 1: Final Silent "e"',
    badge: 'RC-11 Law',
    description: 'Determine whether to DROP or RETAIN the terminal silent "e" when adding a suffix.',
    presets: [
      { base: 'hope', suffix: '-ing', expected: 'hoping', path: ['Ends in silent e?', 'Yes', 'Is suffix starting with Vowel or Consonant?', 'Vowel Suffix (-ing)', 'Does root end in soft ce/ge?', 'No', 'Verdict: DROP e ➔ hoping'] },
      { base: 'hope', suffix: '-ful', expected: 'hopeful', path: ['Ends in silent e?', 'Yes', 'Is suffix starting with Vowel or Consonant?', 'Consonant Suffix (-ful)', 'Is it an exception (argument/truly)?', 'No', 'Verdict: RETAIN e ➔ hopeful'] },
      { base: 'notice', suffix: '-able', expected: 'noticeable', path: ['Ends in silent e?', 'Yes', 'Is suffix starting with Vowel or Consonant?', 'Vowel Suffix (-able)', 'Does root end in soft ce/ge?', 'Yes (soft ce)', 'Verdict: RETAIN e to preserve soft /s/ ➔ noticeable'] },
      { base: 'true', suffix: '-ly', expected: 'truly', path: ['Ends in silent e?', 'Yes', 'Is suffix starting with Vowel or Consonant?', 'Consonant Suffix (-ly)', 'Is it an exception (argument/truly)?', 'Yes (True/Due)', 'Verdict: DROP e (Strict Exception) ➔ truly'] },
      { base: 'argue', suffix: '-ment', expected: 'argument', path: ['Ends in silent e?', 'Yes', 'Is suffix starting with Vowel or Consonant?', 'Consonant Suffix (-ment)', 'Is it an exception (argument/truly)?', 'Yes (Argue)', 'Verdict: DROP e (Strict Exception) ➔ argument'] }
    ]
  },
  {
    id: 'y-to-i',
    name: 'Rule 2: Final "y" to "i"',
    badge: 'RC-12 Law',
    description: 'Determine whether "y" transforms into "i" or remains unchanged.',
    presets: [
      { base: 'rely', suffix: '-able', expected: 'reliable', path: ['Ends in terminal y?', 'Yes', 'Preceding letter is Vowel or Consonant?', 'Consonant (l + y)', 'Does suffix start with "i" (-ing)?', 'No (-able)', 'Verdict: CHANGE y to i ➔ reliable'] },
      { base: 'play', suffix: '-ful', expected: 'playful', path: ['Ends in terminal y?', 'Yes', 'Preceding letter is Vowel or Consonant?', 'Vowel (a + y)', 'Does suffix start with "i"?', 'No', 'Verdict: RETAIN y (No change) ➔ playful'] },
      { base: 'carry', suffix: '-ing', expected: 'carrying', path: ['Ends in terminal y?', 'Yes', 'Preceding letter is Vowel or Consonant?', 'Consonant (r + y)', 'Does suffix start with "i" (-ing)?', 'Yes (-ing)', 'Verdict: RETAIN y (Avoid double ii) ➔ carrying'] },
      { base: 'happy', suffix: '-ness', expected: 'happiness', path: ['Ends in terminal y?', 'Yes', 'Preceding letter is Vowel or Consonant?', 'Consonant (p + y)', 'Does suffix start with "i"?', 'No (-ness)', 'Verdict: CHANGE y to i ➔ happiness'] }
    ]
  },
  {
    id: 'consonant-doubling',
    name: 'Rule 3: 1-1-1 Consonant Doubling',
    badge: 'RC-13 Law',
    description: 'Determine whether to DOUBLE the final consonant before a vowel suffix.',
    presets: [
      { base: 'occur', suffix: '-ed', expected: 'occurred', path: ['Single final consonant preceded by 1 vowel?', 'Yes (u + r)', 'Is suffix starting with a vowel?', 'Yes (-ed)', 'Is stress on the FINAL syllable?', 'Yes: oc-CUR (final stress)', 'Verdict: DOUBLE final consonant ➔ occurred'] },
      { base: 'benefit', suffix: '-ed', expected: 'benefited', path: ['Single final consonant preceded by 1 vowel?', 'Yes (i + t)', 'Is suffix starting with a vowel?', 'Yes (-ed)', 'Is stress on the FINAL syllable?', 'No: BÉN-e-fit (initial stress)', 'Verdict: DO NOT DOUBLE (single t) ➔ benefited'] },
      { base: 'commit', suffix: '-ment', expected: 'commitment', path: ['Single final consonant preceded by 1 vowel?', 'Yes (i + t)', 'Is suffix starting with a vowel?', 'No (-ment is consonant suffix)', 'Is stress on final syllable?', 'N/A', 'Verdict: DO NOT DOUBLE (consonant suffix) ➔ commitment'] },
      { base: 'plan', suffix: '-ing', expected: 'planning', path: ['Single final consonant preceded by 1 vowel?', 'Yes (a + n, 1 syllable)', 'Is suffix starting with a vowel?', 'Yes (-ing)', 'Is it a 1-1-1 monosyllable?', 'Yes (plan)', 'Verdict: DOUBLE final consonant ➔ planning'] }
    ]
  }
]

export default function SpellingRulesDecisionTree() {
  const [activeTreeId, setActiveTreeId] = useState(DECISION_TREES[0].id)
  const [activePresetIdx, setActivePresetIdx] = useState(0)

  const activeTree = DECISION_TREES.find((t) => t.id === activeTreeId) || DECISION_TREES[0]
  const activePreset = activeTree.presets[activePresetIdx] || activeTree.presets[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-100 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Architecture 5</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Algorithmic Spelling Verification</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50">
            Spelling Rules Decision Tree: 3 Golden Orthographic Algorithms
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-400 mt-0.5">
            Silent 'e' Deletion, 'y' to 'i' Transformation aur 1-1-1 Consonant Doubling ke step-by-step decision trees ke sath spelling errors ko zero karein.
          </p>
        </div>
      </div>

      {/* Rule Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {DECISION_TREES.map((tree) => (
          <button
            key={tree.id}
            type="button"
            onClick={() => {
              setActiveTreeId(tree.id)
              setActivePresetIdx(0)
            }}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeTreeId === tree.id
                ? 'bg-primary-50 dark:bg-primary-950/80 border-primary-400 dark:border-primary-500 shadow-xs'
                : 'bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-surface-900 dark:text-surface-100">
                {tree.name}
              </span>
              <Badge variant="neutral" size="sm">{tree.badge}</Badge>
            </div>
            <p className="text-[0.6875rem] text-surface-500 dark:text-surface-400">
              {tree.description}
            </p>
          </button>
        ))}
      </div>

      {/* Interactive Word Presets Bar */}
      <div className="p-3.5 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-2">
        <span className="text-xs uppercase font-bold text-surface-600 dark:text-surface-300 block">
          Select Exemplar Test Case:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {activeTree.presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActivePresetIdx(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activePresetIdx === idx
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'bg-white dark:bg-surface-900 text-surface-700 dark:text-surface-300 border border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-800'
              }`}
            >
              {p.base} + {p.suffix} ➔ {p.expected}
            </button>
          ))}
        </div>
      </div>

      {/* Decision Tree Stepper Execution Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-surface-100 dark:border-surface-800">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-950 px-2 py-0.5 rounded border border-primary-200 dark:border-primary-800">
              Target: {activePreset.base} + {activePreset.suffix}
            </span>
            <span className="text-xs text-surface-500 dark:text-surface-400">Algorithm Traversal</span>
          </div>
          <span className="text-xs font-mono font-bold text-success-700 dark:text-success-400">
            Expected Output: {activePreset.expected}
          </span>
        </div>

        {/* Vertical Decision Path Steps */}
        <div className="space-y-3">
          {activePreset.path.map((node, i) => {
            const isLast = i === activePreset.path.length - 1
            const isQuestion = node.includes('?')

            return (
              <div key={i} className="flex items-start gap-3">
                {/* Node Step Indicator */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0 ${
                      isLast
                        ? 'bg-success-600 text-white'
                        : isQuestion
                        ? 'bg-primary-100 dark:bg-primary-900/80 text-primary-700 dark:text-primary-300'
                        : 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                    }`}
                  >
                    {isLast ? '✓' : i + 1}
                  </div>
                  {!isLast && <div className="w-0.5 h-6 bg-surface-200 dark:bg-surface-700 my-0.5" />}
                </div>

                {/* Node Content Card */}
                <div
                  className={`flex-1 p-2.5 sm:p-3 rounded-xl border text-xs leading-relaxed ${
                    isLast
                      ? 'bg-success-50 dark:bg-success-950/40 border-success-300 dark:border-success-800 text-success-950 dark:text-success-100 font-bold font-mono'
                      : isQuestion
                      ? 'bg-surface-50 dark:bg-surface-850 border-surface-200 dark:border-surface-700 text-surface-800 dark:text-surface-100 font-semibold'
                      : 'bg-primary-50/60 dark:bg-primary-950/40 border-primary-200/80 dark:border-primary-800/60 text-primary-900 dark:text-primary-200 font-medium'
                  }`}
                >
                  {node}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
