import { Clock } from 'lucide-react'
import { Card, Badge, Callout } from '../common'

export default function PracticePlaceholderStep({ step }) {
  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="pb-4 border-b border-surface-200">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="primary" size="sm">Step {step.index} • {step.title}</Badge>
          <span className="text-xs text-surface-500">Practice Engine Architecture</span>
        </div>
        <h2 className="text-2xl font-bold font-heading text-surface-900">
          {step.subtitle}
        </h2>
        <p className="text-xs text-surface-600 mt-1">
          {step.summary}
        </p>
      </div>

      {/* Phase 04 Engine Activation Notice */}
      <Callout type="info" title="Interactive Practice Engine Activation in Phase 04">
        This stage ({step.title}) connects directly to the <strong>Interactive Practice Engine</strong> scheduled for full activation in <strong>Phase 04</strong>. It will feature real-time option selection, automated distracter elimination, OMR simulation bubbling mode, per-question rule references, and automated Error Bank logging.
      </Callout>

      {/* Stage Specification Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <Card variant="filled" padding="md" className="space-y-1.5 border-surface-200">
          <span className="font-bold text-surface-700 block">Assessment Format:</span>
          <p className="text-surface-600">Single-answer Multiple Choice Questions (MCQs) calibrated to RPSC/RSMSSB standards.</p>
        </Card>

        <Card variant="filled" padding="md" className="space-y-1.5 border-surface-200">
          <span className="font-bold text-surface-700 block">Estimated Time:</span>
          <p className="text-surface-600 flex items-center gap-1">
            <Clock size={13} />
            <span>{step.durationMin} minutes allocated under exam conditions.</span>
          </p>
        </Card>

        <Card variant="filled" padding="md" className="space-y-1.5 border-surface-200">
          <span className="font-bold text-surface-700 block">Mastery Benchmark:</span>
          <p className="text-surface-600">≥80% required on Mastery Assessment to certify full lesson proficiency.</p>
        </Card>
      </div>

      {/* Preview Question Card Mockup */}
      <Card variant="default" padding="lg" className="border-surface-200 space-y-4">
        <div className="flex items-center justify-between text-xs pb-3 border-b border-surface-100">
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Preview Item</Badge>
            <span className="font-bold text-surface-700">Question 1 of 12</span>
          </div>
          <Badge variant="secondary" size="sm">Medium Difficulty</Badge>
        </div>

        <p className="text-sm font-semibold text-surface-900 leading-relaxed">
          The judicial commission ___ (inquire) into the administrative discrepancy for three weeks before submitting its interim findings.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          <div className="p-3 rounded-xl border border-surface-200 bg-surface-50 text-xs font-medium text-surface-700 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-white border border-surface-300 flex items-center justify-center font-bold font-mono">A</span>
            <span>has been inquiring</span>
          </div>
          <div className="p-3 rounded-xl border-2 border-success-400 bg-success-50 text-xs font-bold text-success-900 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-success-500 text-white flex items-center justify-center font-bold font-mono">B</span>
            <span>had been inquiring (Correct)</span>
          </div>
          <div className="p-3 rounded-xl border border-surface-200 bg-surface-50 text-xs font-medium text-surface-700 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-white border border-surface-300 flex items-center justify-center font-bold font-mono">C</span>
            <span>was inquiring</span>
          </div>
          <div className="p-3 rounded-xl border border-surface-200 bg-surface-50 text-xs font-medium text-surface-700 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-white border border-surface-300 flex items-center justify-center font-bold font-mono">D</span>
            <span>inquired</span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-success-50 border border-success-200 text-xs text-success-900">
          <strong>Rule Reference:</strong> 'For three weeks' combined with a past interrupting landmark ('before submitting') demands <em>Past Perfect Continuous</em> ('had been inquiring').
        </div>
      </Card>
    </div>
  )
}
