import { useState } from 'react'
import { ArrowRight, GitFork, ArrowLeftRight, Check, AlertCircle } from 'lucide-react'
import { Card, Badge, Button } from '../../common'

export default function ConditionResultFlowDiagram() {
  const [selectedType, setSelectedType] = useState('type1') // 'type0' | 'type1' | 'type2' | 'type3'
  const [isIfClauseFirst, setIsIfClauseFirst] = useState(true)

  const data = {
    type0: {
      label: 'Type 0: Zero Conditional',
      reality: 'Timeless / 100% Certain Fact',
      ifClauseVerb: 'Simple Present (V1 / V_s/es)',
      resultClauseVerb: 'Simple Present (V1 / V_s/es)',
      ifText: 'If water reaches 100°C',
      resultText: 'it boils immediately',
      explanation: 'Condition (paani ka 100°C par aana) hote hi result (ubalna) automatic aur certain hota hai. Dono jagah strictly Simple Present lagega.',
      commaRule: 'If-clause shuru mein hai, isliye comma (,) mandatory hai.',
    },
    type1: {
      label: 'Type 1: First Conditional',
      reality: 'Realistic / Probable Future',
      ifClauseVerb: 'Simple Present (V1 / V_s/es)',
      resultClauseVerb: 'will / can / may + V1',
      ifText: 'If the applicant submits the document tomorrow',
      resultText: 'the registrar will issue the certificate',
      explanation: 'Condition future mein realistic hai, isliye if-clause mein Simple Present aur result mein future modal "will + V1" lagta hai.',
      commaRule: 'If-clause shuru mein hai, isliye comma (,) mandatory hai.',
    },
    type2: {
      label: 'Type 2: Second Conditional',
      reality: 'Hypothetical / Unreal Present or Future',
      ifClauseVerb: 'Simple Past (V2) / Subjunctive were',
      resultClauseVerb: 'would / could / might + V1',
      ifText: 'If he knew the administrative password today',
      resultText: 'he would resolve the server glitch',
      explanation: 'Reality se imaginary distance dikhane ke liye past verb form (knew) lagti hai, aur result mein "would + V1" lagta hai.',
      commaRule: 'If-clause shuru mein hai, isliye comma (,) mandatory hai.',
    },
    type3: {
      label: 'Type 3: Third Conditional',
      reality: 'Counterfactual Unreal Finished Past',
      ifClauseVerb: 'Past Perfect (had + V3)',
      resultClauseVerb: 'would have / could have + V3',
      ifText: 'If the counsel had filed the appeal last week',
      resultText: 'the bench would have stayed the eviction',
      explanation: 'Past ka aisa unfulfilled event jo khatam ho chuka hai: if-clause mein "had + V3" aur result mein "would have + V3" lagta hai.',
      commaRule: 'If-clause shuru mein hai, isliye comma (,) mandatory hai.',
    },
  }

  const current = data[selectedType]

  return (
    <Card variant="default" padding="lg" className="space-y-6 select-none border-surface-200 dark:border-surface-700 shadow-xs">
      {/* Component Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-100 dark:border-surface-700">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/80 border border-primary-300 dark:border-primary-500/50 text-primary-700 dark:text-primary-300 flex items-center justify-center font-bold">
            <GitFork size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Condition ➔ Result Syntactic Flow Architecture
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-300">
              Clauses ke beech causal relationship aur comma order rules
            </p>
          </div>
        </div>

        {/* Clause Order Switcher */}
        <Button
          variant="outline"
          size="sm"
          icon={ArrowLeftRight}
          onClick={() => setIsIfClauseFirst(!isIfClauseFirst)}
          className="text-xs shrink-0"
        >
          {isIfClauseFirst ? 'Order: If-Clause First (with comma)' : 'Order: Main Clause First (no comma)'}
        </Button>
      </div>

      {/* Conditional Type Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Object.entries(data).map(([key, item]) => {
          const isActive = selectedType === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedType(key)}
              className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-950/70 border-primary-400 dark:border-primary-500 text-primary-900 dark:text-primary-100 shadow-xs'
                  : 'bg-surface-50 dark:bg-surface-800/60 border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-750 text-surface-700 dark:text-surface-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold font-heading">{item.label.split(':')[0]}</span>
                {isActive && <Check size={14} className="text-primary-600 dark:text-primary-300" />}
              </div>
              <p className="text-[0.6875rem] text-surface-500 dark:text-surface-400 truncate">
                {item.label.split(':')[1]?.trim()}
              </p>
            </button>
          )
        })}
      </div>

      {/* Dynamic Visual Flow Representation */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-surface-50 to-primary-50/30 dark:from-surface-900 dark:to-surface-850 border border-surface-200 dark:border-surface-700 space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="primary" size="sm">{current.label}</Badge>
          <span className="text-xs font-medium text-surface-600 dark:text-surface-300">
            Reality Status: <strong className="text-surface-900 dark:text-surface-100">{current.reality}</strong>
          </span>
        </div>

        {/* Clause Flow Cards */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {isIfClauseFirst ? (
            <>
              {/* Box 1: Condition Clause */}
              <div className="flex-1 p-4 rounded-xl bg-white dark:bg-surface-800 border-2 border-primary-300 dark:border-primary-500/60 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-primary-700 dark:text-primary-300">
                    Condition Clause (Subordinate)
                  </span>
                  <Badge variant="primary" size="sm">Verb: {current.ifClauseVerb.split('(')[0]}</Badge>
                </div>
                <p className="font-heading font-bold text-sm text-surface-900 dark:text-surface-50">
                  "{current.ifText}"
                </p>
                <p className="text-xs text-surface-500 dark:text-surface-400 font-mono">
                  Formula: {current.ifClauseVerb}
                </p>
              </div>

              {/* Arrow with Comma Indicator */}
              <div className="flex md:flex-col items-center justify-center gap-1 shrink-0 text-primary-600 dark:text-primary-400 py-1">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-primary-100 dark:bg-primary-900/80 border border-primary-200 dark:border-primary-500/40">
                  comma ( , )
                </span>
                <ArrowRight size={20} className="hidden md:block" />
              </div>

              {/* Box 2: Result Clause */}
              <div className="flex-1 p-4 rounded-xl bg-white dark:bg-surface-800 border-2 border-success-300 dark:border-success-500/60 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-success-700 dark:text-success-300">
                    Result Clause (Main)
                  </span>
                  <Badge variant="success" size="sm">Verb: {current.resultClauseVerb.split('(')[0]}</Badge>
                </div>
                <p className="font-heading font-bold text-sm text-surface-900 dark:text-surface-50">
                  "{current.resultText}."
                </p>
                <p className="text-xs text-surface-500 dark:text-surface-400 font-mono">
                  Formula: {current.resultClauseVerb}
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Box 1: Result Clause (Main) */}
              <div className="flex-1 p-4 rounded-xl bg-white dark:bg-surface-800 border-2 border-success-300 dark:border-success-500/60 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-success-700 dark:text-success-300">
                    Result Clause (Main)
                  </span>
                  <Badge variant="success" size="sm">Verb: {current.resultClauseVerb.split('(')[0]}</Badge>
                </div>
                <p className="font-heading font-bold text-sm text-surface-900 dark:text-surface-50">
                  "{current.resultText.charAt(0).toUpperCase() + current.resultText.slice(1)}"
                </p>
                <p className="text-xs text-surface-500 dark:text-surface-400 font-mono">
                  Formula: {current.resultClauseVerb}
                </p>
              </div>

              {/* Arrow without Comma */}
              <div className="flex md:flex-col items-center justify-center gap-1 shrink-0 text-surface-400 dark:text-surface-500 py-1">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-300">
                  no comma
                </span>
                <ArrowRight size={20} className="hidden md:block" />
              </div>

              {/* Box 2: Condition Clause (If-Clause) */}
              <div className="flex-1 p-4 rounded-xl bg-white dark:bg-surface-800 border-2 border-primary-300 dark:border-primary-500/60 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-primary-700 dark:text-primary-300">
                    Condition Clause (Subordinate)
                  </span>
                  <Badge variant="primary" size="sm">Verb: {current.ifClauseVerb.split('(')[0]}</Badge>
                </div>
                <p className="font-heading font-bold text-sm text-surface-900 dark:text-surface-50">
                  "{current.ifText.toLowerCase()}."
                </p>
                <p className="text-xs text-surface-500 dark:text-surface-400 font-mono">
                  Formula: {current.ifClauseVerb}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Synthesized Sentence Display */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-1">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
            Synthesized Complete Sentence:
          </span>
          <p className="font-mono text-xs md:text-sm font-bold text-surface-900 dark:text-surface-50">
            {isIfClauseFirst
              ? `"${current.ifText}, ${current.resultText}."`
              : `"${current.resultText.charAt(0).toUpperCase() + current.resultText.slice(1)} ${current.ifText.toLowerCase()}."`}
          </p>
        </div>

        {/* Explanatory Note */}
        <div className="flex items-start gap-2 text-xs text-surface-700 dark:text-surface-200 bg-primary-50/50 dark:bg-primary-950/40 p-3 rounded-xl border border-primary-200 dark:border-primary-500/30">
          <AlertCircle size={16} className="text-primary-600 dark:text-primary-300 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-primary-950 dark:text-primary-100">Grammar Rationale:</p>
            <p>{current.explanation}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
