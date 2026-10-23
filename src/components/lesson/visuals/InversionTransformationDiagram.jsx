import { useState } from 'react'
import { ArrowDown, X, ShieldAlert, RefreshCw } from 'lucide-react'
import { Card, Badge, Button } from '../../common'

export default function InversionTransformationDiagram() {
  const [selectedInversion, setSelectedInversion] = useState('had') // 'had' | 'were' | 'should'
  const [isNegative, setIsNegative] = useState(false)

  const inversions = {
    had: {
      title: 'Had Inversion (Type 3 Unreal Past)',
      baseType: 'Type 3 Conditional',
      standardAffirmative: 'If the judicial magistrate had reviewed the evidence, he would have acquitted the accused.',
      standardNegative: 'If the judicial magistrate had not reviewed the evidence, the innocent would have suffered.',
      invertedAffirmative: 'Had the judicial magistrate reviewed the evidence, he would have acquitted the accused.',
      invertedNegative: 'Had the judicial magistrate not reviewed the evidence, the innocent would have suffered.',
      wrongNegative: 'Had not the judicial magistrate reviewed the evidence...',
      formula: isNegative ? 'Had + Subject + not + V3 ..., would have + V3' : 'Had + Subject + V3 ..., would have + V3',
      step1: 'Drop conjunction "If" from the condition clause.',
      step2: 'Auxiliary verb "Had" ko subject ke aage move karein (Inversion).',
      step3: isNegative ? 'Negative particle "not" hamesha subject ke baad hi rahega.' : 'Main verb V3 (reviewed) subject ke baad rehti hai.',
      examNote: 'Negative inversion mein "Had not the magistrate" likhna severe error hai. "Not" hamesha subject ke baad aayega: "Had the magistrate not...".',
    },
    were: {
      title: 'Were Inversion (Type 2 Hypothetical Present)',
      baseType: 'Type 2 Conditional',
      standardAffirmative: 'If he were present in court today, he would clarify the circular.',
      standardNegative: 'If he were not bound by official secrecy, he would disclose the investigation report.',
      invertedAffirmative: 'Were he present in court today, he would clarify the circular.',
      invertedNegative: 'Were he not bound by official secrecy, he would disclose the investigation report.',
      wrongNegative: 'Were not he bound by official secrecy...',
      formula: isNegative ? 'Were + Subject + not + complement ..., would + V1' : 'Were + Subject + complement / to + V1 ..., would + V1',
      step1: 'Drop conjunction "If" from the hypothetical clause.',
      step2: 'Subjunctive verb "Were" ko subject ke shuru mein shift karein.',
      step3: isNegative ? '"not" ko subject ke baad place karein ("Were he not...").' : 'Action verbs ke liye "Were + Subject + to + V1" use hota hai.',
      examNote: 'Action verbs mein inversion: "If the court sanctioned funds" ➔ "Were the court to sanction funds, the backlog would clear."',
    },
    should: {
      title: 'Should Inversion (Type 1 Contingency / Formal)',
      baseType: 'Type 1 Conditional',
      standardAffirmative: 'If you require any assistance with filing, contact the helpdesk.',
      standardNegative: 'If you do not receive the confirmation SMS, submit an offline complaint.',
      invertedAffirmative: 'Should you require any assistance with filing, contact the helpdesk.',
      invertedNegative: 'Should you not receive the confirmation SMS, submit an offline complaint.',
      wrongNegative: 'Should not you receive the confirmation SMS...',
      formula: isNegative ? 'Should + Subject + not + V1 ..., will / imperative' : 'Should + Subject + V1 ..., will / imperative',
      step1: 'Drop conjunction "If" from the future condition clause.',
      step2: 'Formal modal "Should" ko subject ke aage place karein.',
      step3: isNegative ? '"not" ko subject ke baad retain karein ("Should you not receive...").' : 'Main verb hamesha base form V1 mein rehti hai.',
      examNote: 'Yahan "Should" ka matlab obligation (chahiye) nahi hai, balki formal conditional "if by chance" hai.',
    },
  }

  const current = inversions[selectedInversion]

  return (
    <Card variant="default" padding="lg" className="space-y-6 select-none border-surface-200 dark:border-surface-700 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-100 dark:border-surface-700">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/80 border border-primary-300 dark:border-primary-500/50 text-primary-700 dark:text-primary-300 flex items-center justify-center font-bold">
            <RefreshCw size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Conditional Inversion Transformation Engine
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-300">
              Omitting 'if' and fronting auxiliary verbs (Had, Were, Should)
            </p>
          </div>
        </div>

        {/* Polarity Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={!isNegative ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setIsNegative(false)}
            className="text-xs"
          >
            Affirmative
          </Button>
          <Button
            variant={isNegative ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setIsNegative(true)}
            className="text-xs"
          >
            Negative (with not)
          </Button>
        </div>
      </div>

      {/* Inversion Selector Tabs */}
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(inversions).map(([key, item]) => {
          const isActive = selectedInversion === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedInversion(key)}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-950/70 border-primary-400 dark:border-primary-500 text-primary-900 dark:text-primary-100 font-bold shadow-xs'
                  : 'bg-surface-50 dark:bg-surface-800/60 border-surface-200 dark:border-surface-700 hover:bg-surface-100 text-surface-600 dark:text-surface-300'
              }`}
            >
              <span className="text-xs block uppercase font-mono tracking-wider mb-0.5">
                {key.toUpperCase()} INVERSION
              </span>
              <span className="text-xs block font-heading truncate">{item.baseType}</span>
            </button>
          )
        })}
      </div>

      {/* Transformation Visual Walkthrough */}
      <div className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-surface-200 dark:border-surface-700">
          <Badge variant="primary" size="sm">{current.title}</Badge>
          <span className="font-mono text-xs font-bold text-primary-700 dark:text-primary-300">
            {current.formula}
          </span>
        </div>

        {/* Stage 1: Standard Clause with IF */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-surface-700 dark:text-surface-300">
              Stage 1: Standard Sentence (with 'If')
            </span>
            <Badge variant="neutral" size="sm">Ordinary Clause Order</Badge>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 font-mono text-xs md:text-sm text-surface-900 dark:text-surface-100 shadow-xs">
            {isNegative ? current.standardNegative : current.standardAffirmative}
          </div>
        </div>

        {/* Transition Indicator */}
        <div className="flex items-center justify-center gap-3 py-1 text-primary-600 dark:text-primary-400 text-xs font-bold font-mono">
          <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/80 border border-primary-200 dark:border-primary-500/40 flex items-center gap-1.5">
            <ArrowDown size={14} />
            <span>Drop "If" & Front Auxiliary ({selectedInversion.toUpperCase()})</span>
          </span>
        </div>

        {/* Stage 2: Inverted Sentence (Omitting IF) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-success-800 dark:text-success-300">
              Stage 2: Formal Inverted Construction (Correct)
            </span>
            <Badge variant="success" size="sm">Exam Benchmark</Badge>
          </div>
          <div className="p-3.5 rounded-xl bg-success-50/60 dark:bg-success-950/40 border-2 border-success-300 dark:border-success-500/60 font-mono text-xs md:text-sm font-bold text-success-950 dark:text-success-100 shadow-xs">
            "{isNegative ? current.invertedNegative : current.invertedAffirmative}"
          </div>
        </div>

        {/* Negative Error Alert if Negative is selected */}
        {isNegative && (
          <div className="p-3.5 rounded-xl bg-error-50 dark:bg-error-950/40 border border-error-200 dark:border-error-500/40 text-xs text-error-800 dark:text-error-200 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold">
              <X size={15} className="text-error-600 dark:text-error-400" />
              <span>Common Fatal Distractor (Incorrect Word Order):</span>
            </div>
            <p className="font-mono text-error-900 dark:text-error-100 line-through">
              "{current.wrongNegative}"
            </p>
            <p className="text-[0.6875rem]">
              Negative inversion mein negative particle "not" hamesha subject ke baad aata hai, kabhi bhi auxiliary ke sath jodkar shuru mein nahi lagaya jata.
            </p>
          </div>
        )}

        {/* Step-by-Step Derivation Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-1">
            <strong className="text-primary-700 dark:text-primary-300 block font-mono">Step 1: Omission</strong>
            <p className="text-surface-600 dark:text-surface-300">{current.step1}</p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-1">
            <strong className="text-primary-700 dark:text-primary-300 block font-mono">Step 2: Inversion</strong>
            <p className="text-surface-600 dark:text-surface-300">{current.step2}</p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-1">
            <strong className="text-primary-700 dark:text-primary-300 block font-mono">Step 3: Concord</strong>
            <p className="text-surface-600 dark:text-surface-300">{current.step3}</p>
          </div>
        </div>

        {/* Exam Insight Callout */}
        <div className="flex items-start gap-2 text-xs text-surface-700 dark:text-surface-200 bg-amber-50/60 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-500/30">
          <ShieldAlert size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-amber-950 dark:text-amber-100 font-semibold">Exam Preparation Note:</strong>
            <p>{current.examNote}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
