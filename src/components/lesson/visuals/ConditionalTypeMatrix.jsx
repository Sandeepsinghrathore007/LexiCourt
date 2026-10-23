import { useState } from 'react'
import { ShieldAlert, Layers } from 'lucide-react'
import { Card, Badge } from '../../common'

export default function ConditionalTypeMatrix() {
  const [activeType, setActiveType] = useState('all') // 'all' | '0' | '1' | '2' | '3'

  const matrixData = [
    {
      id: '0',
      type: 'Zero Conditional (Type 0)',
      tag: 'Universal Truth',
      badgeVariant: 'neutral',
      useCase: 'Scientific laws, universal physical truths, recurring automatic cause-and-effect',
      realityLevel: 'Timeless Fact (100% Certainty)',
      ifFormula: 'Simple Present (V1 / V_s/es)',
      resultFormula: 'Simple Present (V1 / V_s/es)',
      example: 'If water freezes under normal pressure, it expands in volume.',
      hinglishAnalysis: 'Condition hote hi result automatically aur hamesha hota hai. Kisi future prediction ki baat nahi hai, isliye result clause mein "will" lagana galat hai.',
      examTrap: 'Result mein "will" lagana: "it will expand" bilkul galat hai.',
    },
    {
      id: '1',
      type: 'First Conditional (Type 1)',
      tag: 'Realistic Future',
      badgeVariant: 'primary',
      useCase: 'Realistic present/future condition aur uska highly probable future result',
      realityLevel: 'Future Possible (High Probability)',
      ifFormula: 'Simple Present (V1 / V_s/es)',
      resultFormula: 'will / shall / can / may + V1',
      example: 'If the petitioner files the reply tomorrow, the High Court will list the matter.',
      hinglishAnalysis: 'Future mein hone ki genuine possibility hai. Condition clause Simple Present leta hai aur result clause future modal "will + V1" leta hai.',
      examTrap: 'If-clause mein "will" lagana: "If the petitioner will file" fatal error hai.',
    },
    {
      id: '2',
      type: 'Second Conditional (Type 2)',
      tag: 'Hypothetical Present',
      badgeVariant: 'secondary',
      useCase: 'Hypothetical, contrary-to-fact present situation ya unlikely future scenario',
      realityLevel: 'Present / Future (Unreal / Imaginary)',
      ifFormula: 'Simple Past (V2) / Subjunctive were',
      resultFormula: 'would / could / might + V1',
      example: 'If I were the Chief Judicial Magistrate, I would expedite all bail applications.',
      hinglishAnalysis: 'Reality ke opposite present situation hai. Yahan "Simple Past" beete waqt ko nahi, balki reality se imaginary doori ko darshata hai.',
      examTrap: 'Hypothetical state mein "was" lagana: "If I was" exam standard par galat hai.',
    },
    {
      id: '3',
      type: 'Third Conditional (Type 3)',
      tag: 'Unreal Past',
      badgeVariant: 'error',
      useCase: 'Unreal, counterfactual, unfulfilled past condition aur uska imagined past result',
      realityLevel: 'Finished Past (Impossible to Change)',
      ifFormula: 'Past Perfect (had + V3)',
      resultFormula: 'would have / could have + V3',
      example: 'If the police had preserved the CCTV footage, the court would have convicted the accused.',
      hinglishAnalysis: 'Past ka aisa event jo actually nahi hua (footage preserve nahi hui). Ab isko badla nahi ja sakta. If-clause mein "had + V3" aur result mein "would have + V3" lagta hai.',
      examTrap: 'If-clause mein "would have" lagana: "If the police would have preserved" sabse common error hai.',
    },
  ]

  const displayedData = activeType === 'all' ? matrixData : matrixData.filter((m) => m.id === activeType)

  return (
    <Card variant="default" padding="lg" className="space-y-6 select-none border-surface-200 dark:border-surface-700 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-100 dark:border-surface-700">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/80 border border-primary-300 dark:border-primary-500/50 text-primary-700 dark:text-primary-300 flex items-center justify-center font-bold">
            <Layers size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Comparative Matrix: Types 0, 1, 2, and 3
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-300">
              Formulas, time/reality axes, aur exam traps ka structured comparison
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-surface-100 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
          <button
            type="button"
            onClick={() => setActiveType('all')}
            className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-all ${
              activeType === 'all'
                ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
            }`}
          >
            All Types
          </button>
          {['0', '1', '2', '3'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveType(id)}
              className={`px-2 py-1 rounded text-xs font-semibold cursor-pointer transition-all ${
                activeType === id
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
              }`}
            >
              Type {id}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Comparative Cards */}
      <div className={`grid gap-4 ${activeType === 'all' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {displayedData.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700 space-y-4 shadow-xs hover:border-primary-300 dark:hover:border-primary-600/50 transition-colors"
          >
            {/* Title & Tag */}
            <div className="flex items-center justify-between pb-2 border-b border-surface-200/60 dark:border-surface-700">
              <div>
                <span className="text-[0.6875rem] font-bold font-mono text-primary-600 dark:text-primary-400 block mb-0.5">
                  TYPE {item.id}
                </span>
                <h4 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
                  {item.type}
                </h4>
              </div>
              <Badge variant={item.badgeVariant} size="sm">{item.tag}</Badge>
            </div>

            {/* Core Formulas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white dark:bg-surface-850 border border-surface-200 dark:border-surface-700">
                <span className="text-[0.625rem] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 block mb-1">
                  Condition (If-Clause):
                </span>
                <p className="font-mono font-bold text-surface-900 dark:text-surface-100">
                  {item.ifFormula}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-surface-850 border border-surface-200 dark:border-surface-700">
                <span className="text-[0.625rem] font-bold uppercase tracking-wider text-success-600 dark:text-success-400 block mb-1">
                  Result Clause (Main):
                </span>
                <p className="font-mono font-bold text-surface-900 dark:text-surface-100">
                  {item.resultFormula}
                </p>
              </div>
            </div>

            {/* Time / Reality Description */}
            <div className="text-xs space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-surface-700 dark:text-surface-300">Time & Reality:</span>
                <span className="text-surface-600 dark:text-surface-400">{item.realityLevel}</span>
              </div>
              <p className="text-surface-600 dark:text-surface-300 leading-relaxed">
                {item.useCase}
              </p>
            </div>

            {/* Concrete Example */}
            <div className="p-3 rounded-xl bg-primary-50/40 dark:bg-primary-950/40 border border-primary-200/80 dark:border-primary-500/30 text-xs space-y-1">
              <span className="text-[0.625rem] font-bold uppercase tracking-wider text-primary-700 dark:text-primary-300">
                Correct Example:
              </span>
              <p className="font-mono font-bold text-surface-900 dark:text-surface-50">
                "{item.example}"
              </p>
              <p className="text-surface-600 dark:text-surface-300 text-[0.6875rem] pt-1">
                {item.hinglishAnalysis}
              </p>
            </div>

            {/* Exam Trap Alert */}
            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-error-50 dark:bg-error-950/40 border border-error-200 dark:border-error-500/30 text-xs text-error-800 dark:text-error-200">
              <ShieldAlert size={16} className="text-error-600 dark:text-error-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Recurring Exam Distractor:</strong>
                <span>{item.examTrap}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
