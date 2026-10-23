import { useState } from 'react'
import { CheckCircle2, RotateCcw } from 'lucide-react'
import { Card, Badge, Button } from '../../common'

export default function BackshiftDecisionFlowchart() {
  const [currentStep, setCurrentStep] = useState(1) // 1, 2, 3, 4
  const [mainTense, setMainTense] = useState(null) // 'past' | 'present_future'
  const [isException, setIsException] = useState(null) // 'yes' | 'no'
  const [relation, setRelation] = useState(null) // 'earlier' | 'simultaneous' | 'later' | 'purpose'

  const resetFlow = () => {
    setCurrentStep(1)
    setMainTense(null)
    setIsException(null)
    setRelation(null)
  }

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[0.625rem] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
              VISUAL MODEL 03
            </span>
            <span className="text-xs text-surface-500 dark:text-surface-400">Algorithmic Decision Tree</span>
          </div>
          <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
            Interactive Tense-Backshift Decision Flowchart
          </h3>
        </div>

        <Button variant="ghost" size="sm" icon={RotateCcw} onClick={resetFlow}>
          Reset Flowchart
        </Button>
      </div>

      <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed">
        Kisi bhi complex sentence ke liye mandatory verb tense pata karne ke liye is interactive 3-step decision path ko follow karein:
      </p>

      {/* Interactive Step Navigator */}
      <div className="space-y-4">
        {/* Step 1: Main Verb Tense */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            currentStep === 1
              ? 'border-primary-500 bg-primary-50/30 dark:bg-primary-950/20 ring-1 ring-primary-500/20'
              : 'border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/40 opacity-90'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-primary-700 dark:text-primary-300">
              Step 1: Governing Main Clause Verb ko Check Karein
            </span>
            {mainTense && (
              <Badge variant="primary" size="sm">
                Selected: {mainTense === 'past' ? 'Past (e.g. said, knew)' : 'Present / Future (e.g. says, will state)'}
              </Badge>
            )}
          </div>
          <p className="text-xs text-surface-600 dark:text-surface-300 mb-3">
            Governing principal verb ka grammatical tense kya hai?
          </p>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={mainTense === 'present_future' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => {
                setMainTense('present_future')
                setCurrentStep(4) // Directly jump to open sequence result
              }}
            >
              A. Present ya Future Tense (says, believes, will announce)
            </Button>
            <Button
              variant={mainTense === 'past' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => {
                setMainTense('past')
                setCurrentStep(2)
              }}
            >
              B. Past Tense (said, discovered, knew, promised)
            </Button>
          </div>
        </div>

        {/* Step 2: Exception Check (Only if Past) */}
        {mainTense === 'past' && (
          <div
            className={`p-4 rounded-xl border transition-all ${
              currentStep === 2
                ? 'border-amber-500 bg-amber-50/30 dark:bg-amber-950/20 ring-1 ring-amber-500/20'
                : 'border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/40 opacity-90'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                Step 2: Universal Truth ya Comparison Exemption Check Karein
              </span>
              {isException && (
                <Badge variant="secondary" size="sm">
                  {isException === 'yes' ? 'Exemption Detected' : 'No Exemption (Past Harmony Applies)'}
                </Badge>
              )}
            </div>
            <p className="text-xs text-surface-600 dark:text-surface-300 mb-3">
              Kya subordinate clause koi universal truth, scientific law, mathematical axiom express karta hai, ya 'than' ke baad aata hai?
            </p>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={isException === 'yes' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => {
                  setIsException('yes')
                  setCurrentStep(4) // Directly to Universal Truth Result
                }}
              >
                Yes (Universal Truth / Scientific Law / 'Than' comparison)
              </Button>
              <Button
                variant={isException === 'no' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => {
                  setIsException('no')
                  setCurrentStep(3)
                }}
              >
                No (Normal narrative situation)
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Chronological Relative Alignment */}
        {mainTense === 'past' && isException === 'no' && (
          <div
            className={`p-4 rounded-xl border transition-all ${
              currentStep === 3
                ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20 ring-1 ring-emerald-500/20'
                : 'border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/40 opacity-90'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                Step 3: Past Main Anchor ke hisaab se Relative Time decide karein
              </span>
              {relation && (
                <Badge variant="success" size="sm">
                  Relation: {relation}
                </Badge>
              )}
            </div>
            <p className="text-xs text-surface-600 dark:text-surface-300 mb-3">
              Past governing verb ke mukable subordinate event kab hua?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button
                variant={relation === 'earlier' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => {
                  setRelation('earlier')
                  setCurrentStep(4)
                }}
              >
                1. Earlier (Pehle hua) Event (had + V3)
              </Button>
              <Button
                variant={relation === 'simultaneous' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => {
                  setRelation('simultaneous')
                  setCurrentStep(4)
                }}
              >
                2. Simultaneous (Sath-sath hua) Event (V2 / was, were)
              </Button>
              <Button
                variant={relation === 'later' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => {
                  setRelation('later')
                  setCurrentStep(4)
                }}
              >
                3. Later (Baad mein hone wala) / Future-in-the-Past (would + V1)
              </Button>
              <Button
                variant={relation === 'purpose' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => {
                  setRelation('purpose')
                  setCurrentStep(4)
                }}
              >
                4. Purpose Clause with 'so that' (might + V1)
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Final Deductive Conclusion */}
        {currentStep === 4 && (
          <div className="p-5 rounded-2xl bg-white dark:bg-surface-800 border-2 border-primary-500 dark:border-primary-400 shadow-md space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-success-600 dark:text-success-400" />
              <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-white">
                Grammar Conclusion:
              </h4>
            </div>

            {mainTense === 'present_future' && (
              <div className="space-y-2">
                <Badge variant="success">Open Sequence Governed</Badge>
                <p className="text-xs text-surface-700 dark:text-surface-200 leading-relaxed font-semibold">
                  Rule: Subordinate clause intended timeframe ke hisaab se KOI BHI tense le sakta hai. Mechanical backshift ki zaroorat nahi hoti.
                </p>
                <p className="font-mono text-xs text-primary-800 dark:text-primary-300 bg-surface-100 dark:bg-surface-900 p-2.5 rounded-lg border border-surface-200 dark:border-surface-700">
                  Example: "The Registrar says that the server was restored yesterday (past) / is operating now (present) / will upgrade tomorrow (future)."
                </p>
              </div>
            )}

            {mainTense === 'past' && isException === 'yes' && (
              <div className="space-y-2">
                <Badge variant="secondary">Universal Truth Exemption</Badge>
                <p className="text-xs text-surface-700 dark:text-surface-200 leading-relaxed font-semibold">
                  Rule: Immutable scientific, mathematical, aur moral truths Simple Present (V₁ / V_s/es) mein hi REHNE CHAHIYE.
                </p>
                <p className="font-mono text-xs text-amber-800 dark:text-amber-300 bg-surface-100 dark:bg-surface-900 p-2.5 rounded-lg border border-surface-200 dark:border-surface-700">
                  Example: "The professor proved that water boils at 100°C (NOT 'boiled')."
                </p>
              </div>
            )}

            {mainTense === 'past' && isException === 'no' && relation === 'earlier' && (
              <div className="space-y-2">
                <Badge variant="primary">Anterior Past Rule</Badge>
                <p className="text-xs text-surface-700 dark:text-surface-200 leading-relaxed font-semibold">
                  Mandatory Structure: Past Perfect → <code className="font-mono text-primary-700 dark:text-primary-300">had + V₃</code>
                </p>
                <p className="font-mono text-xs text-primary-800 dark:text-primary-300 bg-surface-100 dark:bg-surface-900 p-2.5 rounded-lg border border-surface-200 dark:border-surface-700">
                  Example: "The registrar discovered that the clerk had misplaced the document."
                </p>
              </div>
            )}

            {mainTense === 'past' && isException === 'no' && relation === 'simultaneous' && (
              <div className="space-y-2">
                <Badge variant="primary">Simultaneous Past Rule</Badge>
                <p className="text-xs text-surface-700 dark:text-surface-200 leading-relaxed font-semibold">
                  Mandatory Structure: Simple Past (<code className="font-mono">V₂</code>) ya Past Continuous (<code className="font-mono">was/were + V-ing</code>).
                </p>
                <p className="font-mono text-xs text-primary-800 dark:text-primary-300 bg-surface-100 dark:bg-surface-900 p-2.5 rounded-lg border border-surface-200 dark:border-surface-700">
                  Example: "The magistrate observed that the witness was trembling with fear."
                </p>
              </div>
            )}

            {mainTense === 'past' && isException === 'no' && relation === 'later' && (
              <div className="space-y-2">
                <Badge variant="primary">Future-in-the-Past Rule</Badge>
                <p className="text-xs text-surface-700 dark:text-surface-200 leading-relaxed font-semibold">
                  Mandatory Structure: Modal Backshift → <code className="font-mono text-primary-700 dark:text-primary-300">would + V₁</code> ('will' kabhi nahi).
                </p>
                <p className="font-mono text-xs text-primary-800 dark:text-primary-300 bg-surface-100 dark:bg-surface-900 p-2.5 rounded-lg border border-surface-200 dark:border-surface-700">
                  Example: "The advocate promised that he would file the affidavit tomorrow."
                </p>
              </div>
            )}

            {mainTense === 'past' && isException === 'no' && relation === 'purpose' && (
              <div className="space-y-2">
                <Badge variant="primary">Purpose Clause Concord Rule</Badge>
                <p className="text-xs text-surface-700 dark:text-surface-200 leading-relaxed font-semibold">
                  Mandatory Structure: Past Main + 'so that' → <code className="font-mono text-primary-700 dark:text-primary-300">might + V₁</code> ('may' kabhi nahi).
                </p>
                <p className="font-mono text-xs text-primary-800 dark:text-primary-300 bg-surface-100 dark:bg-surface-900 p-2.5 rounded-lg border border-surface-200 dark:border-surface-700">
                  Example: "The clerk worked overtime so that he might clear the backlog."
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
