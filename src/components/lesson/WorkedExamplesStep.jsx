import { useState } from 'react'
import { CheckCircle2, ChevronDown, ChevronRight, Eye, EyeOff, AlertTriangle } from 'lucide-react'
import examplesData from '../../content/lessons/L01/worked-examples.json'
import { Card, Badge, Button } from '../common'

export default function WorkedExamplesStep() {
  const [revealedIds, setRevealedIds] = useState({ 'WE-01': true, 'WE-02': true })

  const toggleReveal = (id) => {
    setRevealedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const revealAll = () => {
    const all = {}
    examplesData.forEach((e) => {
      all[e.id] = true
    })
    setRevealedIds(all)
  }

  const hideAll = () => {
    setRevealedIds({})
  }

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Step 5 • Derivation Logic</Badge>
            <span className="text-xs text-surface-500">15 Annotated Competitive Exam Questions</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-surface-900">
            Step-by-Step Derivation Logic
          </h2>
          <p className="text-xs text-surface-600 mt-1">
            Learn the exact 5-step cognitive algorithm to deduce the correct verb tense form without guessing.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="secondary" size="sm" icon={Eye} onClick={revealAll}>
            Reveal All
          </Button>
          <Button variant="ghost" size="sm" icon={EyeOff} onClick={hideAll}>
            Hide All
          </Button>
        </div>
      </div>

      {/* 5-Step Derivation Method Banner */}
      <Card variant="filled" padding="md" className="border-surface-200 bg-surface-100/70">
        <h3 className="text-xs font-bold uppercase tracking-wider text-surface-700 mb-2">
          The 5-Step Solving Algorithm for Tense Questions:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
          <div className="p-2 rounded bg-white border border-surface-200 text-center">
            <span className="font-bold text-primary-700 block">1. Marker</span>
            <span className="text-[10px] text-surface-500">Contextual Clue</span>
          </div>
          <div className="p-2 rounded bg-white border border-surface-200 text-center">
            <span className="font-bold text-primary-700 block">2. Time</span>
            <span className="text-[10px] text-surface-500">Past / Pres / Fut</span>
          </div>
          <div className="p-2 rounded bg-white border border-surface-200 text-center">
            <span className="font-bold text-primary-700 block">3. Aspect</span>
            <span className="text-[10px] text-surface-500">Simp / Cont / Perf</span>
          </div>
          <div className="p-2 rounded bg-white border border-surface-200 text-center">
            <span className="font-bold text-primary-700 block">4. Inflection</span>
            <span className="text-[10px] text-surface-500">Aux & Lexical V</span>
          </div>
          <div className="p-2 rounded bg-white border border-surface-200 text-center">
            <span className="font-bold text-success-700 block">5. Synthesis</span>
            <span className="text-[10px] text-surface-500">Final Answer</span>
          </div>
        </div>
      </Card>

      {/* Examples List */}
      <div className="space-y-4">
        {examplesData.map((example) => {
          const isRevealed = revealedIds[example.id]

          return (
            <Card
              key={example.id}
              variant="default"
              padding="lg"
              className={`transition-all border-surface-200 ${
                isRevealed ? 'bg-white shadow-xs' : 'bg-surface-50/60'
              }`}
            >
              <div className="space-y-3">
                {/* Question Stem Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary-700 bg-primary-100 px-2 py-0.5 rounded">
                      {example.id}
                    </span>
                    <Badge variant="secondary" size="sm">{example.tense}</Badge>
                  </div>
                  <Button
                    variant={isRevealed ? 'ghost' : 'secondary'}
                    size="sm"
                    icon={isRevealed ? ChevronDown : ChevronRight}
                    onClick={() => toggleReveal(example.id)}
                  >
                    {isRevealed ? 'Collapse Derivation' : 'Show Derivation Steps'}
                  </Button>
                </div>

                {/* Sentence Sentence */}
                <p className="font-sans text-sm md:text-base font-medium text-surface-900 bg-white p-3.5 rounded-xl border border-surface-200 shadow-2xs">
                  {example.sentence}
                </p>

                {/* Revealed Derivation Pipeline */}
                {isRevealed && (
                  <div className="pt-3 border-t border-surface-100 space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-success-600" />
                      <span className="text-xs font-bold text-surface-800">
                        Correct Answer: <span className="font-mono text-success-700 bg-success-50 px-2 py-0.5 rounded border border-success-200">{example.correctAnswer}</span>
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-surface-50 border border-surface-200 text-xs space-y-2">
                      <p className="text-surface-700 leading-relaxed">
                        • <strong>Step 1 (Signal Marker):</strong> {example.steps.step1_marker}
                      </p>
                      <p className="text-surface-700 leading-relaxed">
                        • <strong>Step 2 & 3 (Time & Aspect):</strong> {example.steps.step2_time} | {example.steps.step3_aspect}
                      </p>
                      <p className="text-surface-700 leading-relaxed">
                        • <strong>Step 4 (Conjugation):</strong> {example.steps.step4_inflection}
                      </p>
                      <p className="text-primary-900 font-semibold pt-1 border-t border-surface-200">
                        • <strong>Step 5 (Synthesis):</strong> {example.steps.step5_synthesis}
                      </p>
                    </div>

                    {example.trapWarning && (
                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                        <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                        <span><strong>Exam Trap Warning:</strong> {example.trapWarning}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
