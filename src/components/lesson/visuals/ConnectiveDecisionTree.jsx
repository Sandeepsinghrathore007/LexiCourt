import { useState } from 'react'
import { GitCommit, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react'
import { Card, Badge } from '../../common'

const DECISION_DATA = {
  contrast: {
    label: 'Contrast / Concession (Virodh / Unexpected Outcome)',
    options: [
      {
        unit: 'clause',
        label: 'Followed by Complete Clause (Subject + Finite Verb)',
        recommended: 'ALTHOUGH / EVEN THOUGH',
        structure: 'Although + [Subject + Finite Verb] , [Main Clause]',
        example: 'Although the appellant raised valid questions of law, the high court dismissed the appeal.',
        trap: 'Never add "but" in the main clause (*Although... but is a fatal pleonasm).'
      },
      {
        unit: 'phrase',
        label: 'Followed by Noun Phrase or Gerund (-ing) [No Finite Verb]',
        recommended: 'DESPITE / IN SPITE OF',
        structure: 'Despite + [Noun Phrase / V-ing] , [Main Clause]',
        example: 'Despite the advocate\'s vehement protest, the magistrate remanded the accused to custody.',
        trap: 'Never say "*despite of". "Despite" takes no "of", while "in spite" must take "of".'
      },
      {
        unit: 'two-ic',
        label: 'Between Two Independent Clauses with Semicolon (;)',
        recommended: 'HOWEVER / NEVERTHELESS',
        structure: '[Independent Clause 1] ; however, [Independent Clause 2]',
        example: 'The decree was lawful; however, its execution was barred by statutory limitation.',
        trap: 'Joining two independent clauses with only a comma + however creates a Comma Splice.'
      }
    ]
  },
  cause: {
    label: 'Cause / Reason (Karan)',
    options: [
      {
        unit: 'clause',
        label: 'Followed by Complete Clause (Subject + Finite Verb)',
        recommended: 'BECAUSE / SINCE / AS',
        structure: '[Main Clause] because [Subject + Verb]',
        example: 'The bail plea was allowed because the charge-sheet was not filed within ninety days.',
        trap: 'Never write "*The reason was because". Use "The reason was that".'
      },
      {
        unit: 'phrase',
        label: 'Followed by Noun Phrase (No Finite Verb)',
        recommended: 'BECAUSE OF / DUE TO / OWING TO',
        structure: '[Main Clause] because of [Noun Phrase]',
        example: 'The court proceedings were adjourned because of the demise of a senior advocate.',
        trap: '"Because" cannot introduce a lonely noun phrase (*because the rain). Use "because of".'
      }
    ]
  },
  result: {
    label: 'Result / Consequence (Nateeja)',
    options: [
      {
        unit: 'fanboys',
        label: 'Joined by Coordinating Conjunction with Comma',
        recommended: 'SO',
        structure: '[Clause 1] , so [Clause 2]',
        example: 'The petitioner failed to deposit process fees, so the court dismissed the revision petition.',
        trap: 'Do not reverse cause and result. Reason + so + Result.'
      },
      {
        unit: 'two-ic',
        label: 'Joined by Semicolon & Conjunctive Adverb',
        recommended: 'THEREFORE / CONSEQUENTLY / THUS',
        structure: '[Clause 1] ; therefore, [Clause 2]',
        example: 'The key witness turned hostile; therefore, the prosecution sought leave to cross-examine him.',
        trap: 'Never use "therefore" with only a comma when joining two independent sentences.'
      }
    ]
  },
  condition: {
    label: 'Condition / Precaution (Shart / Bachaav)',
    options: [
      {
        unit: 'real-condition',
        label: 'Trigger Condition (Action happens only AFTER condition is met)',
        recommended: 'IF / PROVIDED THAT',
        structure: 'If + [Present Clause] , [Future Main Clause]',
        example: 'If the government issues the notification today, the new court bench will sit tomorrow.',
        trap: 'Do not use future "will/would" inside the if-clause (*If the government will issue).'
      },
      {
        unit: 'negative-condition',
        label: 'Negative Condition (If Not)',
        recommended: 'UNLESS',
        structure: 'Unless + [Positive Clause] , [Main Clause]',
        example: 'You cannot enter the judicial record room unless you produce an authorized entry pass.',
        trap: 'Never add "not" in the unless-clause (*Unless you do not produce is double negative).'
      },
      {
        unit: 'precaution',
        label: 'Advance Precautionary Measure (Action taken beforehand)',
        recommended: 'IN CASE',
        structure: '[Action Taken Beforehand] in case [Contingency Occurs]',
        example: 'The clerk kept extra certified copies in case the original file was requisitioned.',
        trap: '"In case" is for precaution taken in advance, whereas "if" is for action triggered by the condition.'
      }
    ]
  }
}

export default function ConnectiveDecisionTree() {
  const [selectedRel, setSelectedRel] = useState('contrast')
  const [selectedUnit, setSelectedUnit] = useState(0)

  const currentRelData = DECISION_DATA[selectedRel]
  const currentOutcome = currentRelData.options[selectedUnit] || currentRelData.options[0]

  const handleRelChange = (relKey) => {
    setSelectedRel(relKey)
    setSelectedUnit(0)
  }

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300">
              <GitCommit size={16} />
            </span>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Visual Map 3: Connective Selection Decision Tree
            </h3>
          </div>
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
            Sentence logic aur following grammatical unit ke hisaab se exact connective select karein
          </p>
        </div>
        <Badge variant="primary" size="sm">
          Interactive Decision Engine
        </Badge>
      </div>

      {/* Step 1: Select Logical Intent */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-surface-600 dark:text-surface-300 block">
          Step 1: Dono Clauses ke Beech Logical Relationship Chunein
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {Object.entries(DECISION_DATA).map(([key, data]) => {
            const isSelected = key === selectedRel
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleRelChange(key)}
                className={`p-2.5 rounded-xl text-left text-xs font-semibold transition-all border cursor-pointer flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'bg-primary-50 dark:bg-primary-950/80 border-primary-500 text-primary-900 dark:text-primary-100 shadow-xs ring-1 ring-primary-400'
                    : 'bg-white dark:bg-surface-850 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:border-surface-300'
                }`}
              >
                <span>{data.label.split('(')[0]}</span>
                {isSelected && <CheckCircle2 size={14} className="text-primary-600 shrink-0" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Step 2: Select Following Grammatical Unit */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-surface-600 dark:text-surface-300 block">
          Step 2: Connective ke Baad Aane Wala Grammatical Unit Select Karein
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {currentRelData.options.map((opt, idx) => {
            const isSelected = idx === selectedUnit
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedUnit(idx)}
                className={`p-3 rounded-xl text-left text-xs transition-all border cursor-pointer space-y-1 ${
                  isSelected
                    ? 'bg-amber-50 dark:bg-amber-950/70 border-amber-500 text-amber-900 dark:text-amber-100 shadow-xs ring-1 ring-amber-400'
                    : 'bg-surface-50 dark:bg-surface-850 border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:border-surface-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.625rem] font-bold uppercase tracking-wider text-surface-500">
                    Option {idx + 1}
                  </span>
                  {isSelected && <CheckCircle2 size={14} className="text-amber-600 shrink-0" />}
                </div>
                <p className="font-medium leading-relaxed">{opt.label}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Decision Output Card */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50/50 via-white to-amber-50/30 dark:from-surface-900 dark:via-surface-850 dark:to-surface-900 border border-primary-200 dark:border-surface-700 space-y-3 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-primary-600 dark:text-primary-400" />
            <span className="text-xs font-bold text-surface-500 uppercase tracking-wider">Recommended Connective Solution:</span>
          </div>
          <span className="font-mono font-extrabold text-sm text-primary-700 dark:text-primary-300 bg-primary-100/70 dark:bg-primary-950 px-2.5 py-0.5 rounded border border-primary-300 dark:border-primary-700">
            {currentOutcome.recommended}
          </span>
        </div>

        {/* Structural Formula */}
        <div className="p-2.5 rounded-lg bg-surface-100 dark:bg-surface-800 font-mono text-xs text-surface-900 dark:text-surface-100 border border-surface-200 dark:border-surface-700">
          {currentOutcome.structure}
        </div>

        {/* Natural Example */}
        <div className="text-xs space-y-0.5">
          <span className="font-semibold text-surface-600 dark:text-surface-400">Exam-Caliber Example:</span>
          <p className="text-surface-900 dark:text-surface-100 italic font-medium leading-relaxed">
            "{currentOutcome.example}"
          </p>
        </div>

        {/* Fatal Trap Warning */}
        <div className="p-2.5 rounded-lg bg-danger-50 dark:bg-danger-950/40 border border-danger-200 dark:border-danger-800/60 flex items-start gap-2 text-xs text-danger-900 dark:text-danger-200">
          <AlertCircle size={14} className="shrink-0 text-danger-600 dark:text-danger-400 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Trap Warning: </strong>
            {currentOutcome.trap}
          </p>
        </div>
      </div>
    </Card>
  )
}
