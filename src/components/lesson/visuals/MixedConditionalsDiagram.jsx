import { useState } from 'react'
import { GitCompare, Sparkles } from 'lucide-react'
import { Card, Badge, Button } from '../../common'

export default function MixedConditionalsDiagram() {
  const [activePattern, setActivePattern] = useState('patternA') // 'patternA' | 'patternB'

  const patterns = {
    patternA: {
      title: 'Pattern A: Past Condition ➔ Present Result',
      subtitle: 'Type 3 Condition Clause + Type 2 Result Clause',
      formula: 'If + Past Perfect (had + V3), Subject + would + V1 (now / today)',
      conditionTime: 'Past (Finished / Last Year / Yesterday)',
      resultTime: 'Present (Current State / Now / Today)',
      standardComparison: {
        title: 'Standard Type 3 (Pure Past):',
        sentence: '"If I had cleared the exam last year, I would have joined the department in 2024."',
        note: 'Dono clauses beete waqt ke hain.',
      },
      mixedSentence: {
        title: 'Mixed Conditional (Past ➔ Present):',
        sentence: '"If I had cleared the exam last year, I would be working as a System Assistant now."',
        note: 'Condition past ki hai lekin uska natija aaj present moment par dekha ja raha hai.',
      },
      timeMarkers: ['last year ➔ now', 'yesterday ➔ today', 'in the past ➔ at present'],
      explanation: 'Jab kisi beete huye unfulfilled action ka asar current reality par padta hai, toh if-clause mein Past Perfect ("had cleared") aur result clause mein present modal "would + V1" ("would be working") lagta hai.',
    },
    patternB: {
      title: 'Pattern B: Permanent Present Trait ➔ Past Result',
      subtitle: 'Type 2 Condition Clause + Type 3 Result Clause',
      formula: 'If + Simple Past (were / V2), Subject + would have + V3 (yesterday / then)',
      conditionTime: 'Present (Continuing Trait / General State)',
      resultTime: 'Past (Specific Event in History / Yesterday)',
      standardComparison: {
        title: 'Standard Type 2 (Pure Present):',
        sentence: '"If he were attentive, he would understand the case files today."',
        note: 'Dono clauses present state par centered hain.',
      },
      mixedSentence: {
        title: 'Mixed Conditional (Present Trait ➔ Past Event):',
        sentence: '"If he were not so careless, he would not have lost the case diary yesterday."',
        note: 'Condition uski permanent habit/trait hai, jabki result kal beete huye event ka hai.',
      },
      timeMarkers: ['general habit ➔ yesterday', 'permanent trait ➔ on that day'],
      explanation: 'Speaker ki permanent personality ya ongoing state agar past ke kisi specific event ka kaaran bani ho, toh if-clause mein "were/V2" aur result mein "would have + V3" lagta hai.',
    },
  }

  const current = patterns[activePattern]

  return (
    <Card variant="default" padding="lg" className="space-y-6 select-none border-surface-200 dark:border-surface-700 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-100 dark:border-surface-700">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/80 border border-primary-300 dark:border-primary-500/50 text-primary-700 dark:text-primary-300 flex items-center justify-center font-bold">
            <GitCompare size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Mixed Conditionals: Cross-Time Structural Bridges
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-300">
              Coordinating clauses that span across different temporal reference frames
            </p>
          </div>
        </div>

        {/* Pattern Switcher */}
        <div className="flex items-center gap-1.5">
          <Button
            variant={activePattern === 'patternA' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActivePattern('patternA')}
            className="text-xs"
          >
            Past ➔ Present (Pattern A)
          </Button>
          <Button
            variant={activePattern === 'patternB' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActivePattern('patternB')}
            className="text-xs"
          >
            Present ➔ Past (Pattern B)
          </Button>
        </div>
      </div>

      {/* Main Visual Display */}
      <div className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-surface-200 dark:border-surface-700">
          <div>
            <Badge variant="primary" size="sm">{current.title}</Badge>
            <p className="text-xs text-surface-500 dark:text-surface-300 mt-0.5">{current.subtitle}</p>
          </div>
          <code className="text-xs font-mono font-bold text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-950/60 px-2.5 py-1 rounded-lg border border-primary-200 dark:border-primary-500/30">
            {current.formula}
          </code>
        </div>

        {/* Cross-Time Visual Bridge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Condition Box */}
          <div className="p-4 rounded-xl bg-white dark:bg-surface-800 border-2 border-primary-300 dark:border-primary-500/50 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-primary-700 dark:text-primary-300">
                Condition Clause Anchor
              </span>
              <Badge variant="neutral" size="sm">{current.conditionTime}</Badge>
            </div>
            <p className="text-xs font-semibold text-surface-900 dark:text-surface-100">
              {activePattern === 'patternA' ? 'If + Past Perfect (had + V3)' : 'If + Simple Past (were / V2)'}
            </p>
            <p className="text-[0.6875rem] text-surface-500 dark:text-surface-400">
              {activePattern === 'patternA'
                ? 'Past finished event jo actual mein nahi hua.'
                : 'Current continuous trait jo abhi present mein active hai.'}
            </p>
          </div>

          {/* Result Box */}
          <div className="p-4 rounded-xl bg-white dark:bg-surface-800 border-2 border-success-300 dark:border-success-500/50 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-success-700 dark:text-success-300">
                Result Clause Consequence
              </span>
              <Badge variant="success" size="sm">{current.resultTime}</Badge>
            </div>
            <p className="text-xs font-semibold text-surface-900 dark:text-surface-100">
              {activePattern === 'patternA' ? 'Subject + would + V1 (now)' : 'Subject + would have + V3 (past)'}
            </p>
            <p className="text-[0.6875rem] text-surface-500 dark:text-surface-400">
              {activePattern === 'patternA'
                ? 'Present current state jo aaj exist kar raha hota.'
                : 'Past finished result jo beete kal par hua.'}
            </p>
          </div>
        </div>

        {/* Side-by-Side: Standard vs Mixed Comparison */}
        <div className="space-y-3 pt-2">
          <div className="p-3.5 rounded-xl bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-surface-700 dark:text-surface-300">
                {current.standardComparison.title}
              </span>
              <Badge variant="neutral" size="sm">Single-Time Framework</Badge>
            </div>
            <p className="font-mono text-xs font-bold text-surface-800 dark:text-surface-200">
              {current.standardComparison.sentence}
            </p>
            <p className="text-[0.6875rem] text-surface-500 dark:text-surface-400">
              {current.standardComparison.note}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-primary-50/50 dark:bg-primary-950/40 border-2 border-primary-300 dark:border-primary-500/50 space-y-1 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-primary-900 dark:text-primary-100 flex items-center gap-1.5">
                <Sparkles size={14} className="text-primary-600 dark:text-primary-400" />
                <span>{current.mixedSentence.title}</span>
              </span>
              <Badge variant="primary" size="sm">Exam Level Target</Badge>
            </div>
            <p className="font-mono text-xs md:text-sm font-bold text-primary-950 dark:text-primary-50">
              {current.mixedSentence.sentence}
            </p>
            <p className="text-[0.6875rem] text-primary-800 dark:text-primary-300">
              {current.mixedSentence.note}
            </p>
          </div>
        </div>

        {/* Time Marker Diagnostic Clue */}
        <div className="p-3 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <span className="font-bold text-surface-700 dark:text-surface-300">
            Decisive Adverbial Signal Pairs:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {current.timeMarkers.map((marker, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-surface-100 dark:bg-surface-700 font-mono text-primary-700 dark:text-primary-300 font-bold text-[0.6875rem]">
                {marker}
              </span>
            ))}
          </div>
        </div>

        <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed bg-surface-100/60 dark:bg-surface-800/60 p-3 rounded-xl">
          <strong>Key Rule:</strong> {current.explanation}
        </p>
      </div>
    </Card>
  )
}
