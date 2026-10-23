import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Card, Badge } from '../../common'

const ROUTES = [
  {
    id: 'route-aff-neg',
    name: 'Affirmative ➔ Negative',
    inputSentence: 'He is an honest court employee.',
    targetMood: 'Negative Assertive',
    steps: [
      {
        stage: 'Stage 1: Truth & Polarity Audit',
        action: 'Sentence affirmative hai. Sirf "not" add karne se truth reverse ho jayega.',
        highlight: 'Target: Not + Compensatory Mechanism',
      },
      {
        stage: 'Stage 2: Mechanism Selection',
        action: 'Key adjective "honest" ka direct contextually valid antonym "dishonest" identify kiya.',
        highlight: 'Antonym: honest ➔ dishonest',
      },
      {
        stage: 'Stage 3: Negation Insertion',
        action: 'Auxiliary "is" ke turant baad negative particle "not" insert kiya.',
        highlight: 'is ➔ is not',
      },
      {
        stage: 'Stage 4: Final Synthesis',
        action: 'Output verify kiya: "He is not a dishonest court employee." Meaning 100% intact.',
        highlight: 'Meaning Invariant: Honest = Not dishonest',
      },
    ],
    finalOutput: 'He is not a dishonest court employee.',
    examTrap: 'DO NOT simply write "He is not an honest employee" (falsifies the original claim).',
  },
  {
    id: 'route-as-soon',
    name: 'As soon as ➔ No sooner',
    inputSentence: 'As soon as the judge arrived, the session began.',
    targetMood: 'Negative Temporal Inversion',
    steps: [
      {
        stage: 'Stage 1: Temporal Marker Isolation',
        action: '"As soon as" temporal immediacy express kar raha hai jise negative adverb "No sooner" chahiye.',
        highlight: 'Connective: As soon as ➔ No sooner',
      },
      {
        stage: 'Stage 2: Auxiliary Inversion',
        action: 'Past tense verb "arrived" (V2) ke liye auxiliary "did" ko subject "the judge" se pehle place kiya.',
        highlight: 'Inversion: did the judge arrive (V1)',
      },
      {
        stage: 'Stage 3: Correlative Conjunction Lock',
        action: 'Comma hatakar second clause ko link karne ke liye strictly "than" (T-H-A-N) lagaya.',
        highlight: 'Correlative: than (NOT when / then)',
      },
      {
        stage: 'Stage 4: Final Synthesis',
        action: '"No sooner did the judge arrive than the session began." Grammar aur meaning both intact.',
        highlight: 'Form: No sooner did + S + V1 + than...',
      },
    ],
    finalOutput: 'No sooner did the judge arrive than the session began.',
    examTrap: 'Examiner tests "when" or "then" in place of "than" - eliminate them instantly!',
  },
  {
    id: 'route-assert-interrog',
    name: 'Assertive ➔ Interrogative',
    inputSentence: 'Honesty is always valued in the legal profession.',
    targetMood: 'Negative Interrogative',
    steps: [
      {
        stage: 'Stage 1: Polarity Law Check',
        action: 'Original statement affirmative hai. Meaning preserve karne ke liye question NEGATIVE hona chahiye.',
        highlight: 'Polarity Flip: Affirmative Statement ➔ Negative Question',
      },
      {
        stage: 'Stage 2: Auxiliary Inversion',
        action: 'Copula verb "is" ko subject "Honesty" se pehle invert kiya.',
        highlight: 'Inversion: Is honesty...',
      },
      {
        stage: 'Stage 3: Negation Placement',
        action: 'Uncontracted "not" ko subject ke baad place kiya ("Is honesty not...").',
        highlight: 'Negation: Is honesty not...',
      },
      {
        stage: 'Stage 4: Punctuation Replacement',
        action: 'Full stop (.) ko drop karke question mark (?) lagaya.',
        highlight: 'Punctuation: . ➔ ?',
      },
    ],
    finalOutput: 'Is honesty not always valued in the legal profession?',
    examTrap: 'Writing "Is honesty always valued...?" turns an assertion into a genuine doubt!',
  },
  {
    id: 'route-rhetorical',
    name: 'Everyone ➔ Who does not',
    inputSentence: 'Everyone respects a fearless magistrate.',
    targetMood: 'Rhetorical Question',
    steps: [
      {
        stage: 'Stage 1: Universal Quantifier Scan',
        action: 'Subject universal affirmative quantifier "Everyone" hai.',
        highlight: 'Quantifier: Everyone (Positive Universal)',
      },
      {
        stage: 'Stage 2: Question Word Mapping',
        action: '"Everyone" ko rhetorical negative pronoun "Who does not" mein map kiya.',
        highlight: 'Mapping: Everyone ➔ Who does not',
      },
      {
        stage: 'Stage 3: Base Verb Restoration',
        action: 'Auxiliary "does" aane par 3rd person singular verb "respects" base form "respect" (V1) ban gayi.',
        highlight: 'Verb: respects ➔ does not respect',
      },
      {
        stage: 'Stage 4: Conversational Answer Check',
        action: 'Question "Who does not respect...?" ka natural obvious answer "Everyone does" hai.',
        highlight: 'Answer Test: Passed (Everyone does)',
      },
    ],
    finalOutput: 'Who does not respect a fearless magistrate?',
    examTrap: 'Writing "Who respects...?" implies "Nobody respects", which is a complete reversal!',
  },
  {
    id: 'route-exclam-assert',
    name: 'Exclamatory ➔ Assertive',
    inputSentence: 'What a blunder the typist made in the writ petition!',
    targetMood: 'Assertive Declarative',
    steps: [
      {
        stage: 'Stage 1: Subject-Verb Isolation',
        action: 'Sentence ke end mein situated subject "the typist" aur verb "made" ko identify kiya.',
        highlight: 'Subject & Verb: The typist made...',
      },
      {
        stage: 'Stage 2: Intensifier Selection',
        action: 'Target word "blunder" ek NOUN hai, isliye adverb "very" nahi, balki adjective "great" lagaya.',
        highlight: 'Intensifier: a great blunder (NOT a very blunder)',
      },
      {
        stage: 'Stage 3: Marker & Punctuation Drop',
        action: 'Fronted marker "What a" drop kiya aur exclamation mark (!) ko full stop (.) mein badla.',
        highlight: 'Punctuation: ! ➔ .',
      },
      {
        stage: 'Stage 4: Final Synthesis',
        action: '"The typist made a great blunder in the writ petition." Meaning & intensity preserved.',
        highlight: 'Assertive: Subject + Verb + Intensified Noun',
      },
    ],
    finalOutput: 'The typist made a great blunder in the writ petition.',
    examTrap: 'Writing "*made a very blunder" is an ungrammatical noun-collocation error!',
  },
]

export default function TransformationDecisionFlowchart() {
  const [activeRouteId, setActiveRouteId] = useState('route-aff-neg')
  const currentRoute = ROUTES.find((r) => r.id === activeRouteId) || ROUTES[0]

  return (
    <Card variant="default" padding="lg" className="border-primary-200 dark:border-surface-700 shadow-sm space-y-5 select-none">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Spatial Model 2</Badge>
            <span className="text-xs font-semibold text-surface-500 dark:text-surface-400">
              Interactive Decision Tree
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-heading text-surface-900 dark:text-surface-50">
            Transformation Decision Flowchart & Algorithm
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300 mt-0.5 max-w-[80ch]">
            5 standard transformation pipelines ke stage-by-stage cognitive derivation algorithm ko trace karein.
          </p>
        </div>
      </div>

      {/* Pipeline Selector Chips */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
        {ROUTES.map((route) => {
          const isActive = route.id === activeRouteId
          return (
            <button
              key={route.id}
              type="button"
              onClick={() => setActiveRouteId(route.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs border border-surface-200 dark:border-surface-700'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 hover:bg-surface-200/50 dark:hover:bg-surface-700/50'
              }`}
            >
              {route.name}
            </button>
          )
        })}
      </div>

      {/* Interactive Trace Board */}
      <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-4">
        {/* Source vs Target Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-1">
            <span className="text-[0.6875rem] font-bold text-surface-400 dark:text-surface-400 uppercase tracking-wider block">
              Input Sentence (Source Form)
            </span>
            <p className="font-mono text-xs font-bold text-surface-900 dark:text-surface-100">
              "{currentRoute.inputSentence}"
            </p>
          </div>
          <div className="p-3 rounded-lg bg-primary-50/40 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 space-y-1">
            <span className="text-[0.6875rem] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider block">
              Target Syntactic Mood
            </span>
            <p className="font-mono text-xs font-bold text-primary-900 dark:text-primary-200">
              {currentRoute.targetMood}
            </p>
          </div>
        </div>

        {/* 4-Stage Derivation Pathway */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-surface-700 dark:text-surface-300 block">
            4-Stage Cognitive Algorithm:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {currentRoute.steps.map((st, sIdx) => (
              <div
                key={sIdx}
                className="p-3 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 flex flex-col justify-between space-y-2 shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="w-5 h-5 rounded-md bg-primary-100 dark:bg-primary-900/60 text-primary-700 dark:text-primary-300 text-[0.6875rem] font-mono font-bold flex items-center justify-center">
                      0{sIdx + 1}
                    </span>
                    <span className="text-xs font-bold text-surface-900 dark:text-surface-100 truncate">
                      {st.stage.split(':')[1] || st.stage}
                    </span>
                  </div>
                  <p className="text-[0.6875rem] text-surface-600 dark:text-surface-300 leading-relaxed">
                    {st.action}
                  </p>
                </div>
                <div className="pt-2 border-t border-surface-100 dark:border-surface-700/60">
                  <span className="text-[0.6875rem] font-mono font-semibold text-primary-700 dark:text-primary-300 block bg-primary-50/60 dark:bg-primary-950/60 px-1.5 py-0.5 rounded">
                    {st.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Synthesized Output */}
        <div className="p-3.5 rounded-xl bg-success-50/50 dark:bg-success-950/30 border border-success-200 dark:border-success-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[0.6875rem] uppercase tracking-wider font-bold text-success-800 dark:text-success-300 block mb-0.5">
              Synthesized Transformation Result
            </span>
            <p className="font-mono text-sm font-bold text-success-900 dark:text-success-100">
              "{currentRoute.finalOutput}"
            </p>
          </div>
          <Badge variant="success" size="sm">
            Meaning 100% Preserved
          </Badge>
        </div>

        {/* Trap Warning Box */}
        <div className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200">
          <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Examiner Trap in this Pipeline:</strong>
            <span>{currentRoute.examTrap}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
