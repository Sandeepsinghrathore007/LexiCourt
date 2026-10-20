import { CheckCircle, XCircle, ShieldAlert } from 'lucide-react'
import pitfallsData from '../../content/lessons/L01/pitfalls.json'
import { Card, Badge, Callout } from '../common'

export default function CommonPitfallsStep() {
  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="pb-4 border-b border-surface-200">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="error" size="sm">Step 6 • Exam Traps & Pitfalls</Badge>
          <span className="text-xs text-surface-500">6 Recurring High Court Distractor Patterns</span>
        </div>
        <h2 className="text-2xl font-bold font-heading text-surface-900">
          Common Mistakes & Competitive Exam Traps
        </h2>
        <p className="text-xs text-surface-600 mt-1">
          Exam-setters design multiple-choice options specifically targeting these 6 universal confusion points.
        </p>
      </div>

      {/* Intro Warning Callout */}
      <Callout type="warning" title="Negative Marking Neutralizer">
        Even though the High Court System Assistant examination has no negative marking penalty, choosing distractors costs precious marks needed to clear high merit cutoffs in Part-B. Study these 6 traps to build instant immunity.
      </Callout>

      {/* Pitfall Cards Grid */}
      <div className="space-y-6">
        {pitfallsData.map((pitfall, index) => (
          <Card
            key={pitfall.id}
            variant="default"
            padding="lg"
            className="border-surface-200 hover:border-error-200 transition-colors space-y-4"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-error-100 text-error-700 flex items-center justify-center font-bold text-xs font-mono">
                  {index + 1}
                </div>
                <h3 className="font-heading font-bold text-base text-surface-900">
                  {pitfall.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="error" size="sm">{pitfall.category}</Badge>
                <Badge variant="neutral" size="sm">{pitfall.frequency}</Badge>
              </div>
            </div>

            {/* In-depth Explanation */}
            <p className="text-xs md:text-sm text-surface-700 leading-relaxed">
              {pitfall.explanation}
            </p>

            {/* Side-by-Side Comparison Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {/* Incorrect */}
              <div className="p-3.5 rounded-xl bg-error-50/70 border border-error-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-error-700">
                  <XCircle size={15} />
                  <span>INCORRECT (Common Distractor):</span>
                </div>
                <p className="font-mono text-xs text-error-900 line-through">
                  "{pitfall.incorrectExample}"
                </p>
              </div>

              {/* Correct */}
              <div className="p-3.5 rounded-xl bg-success-50/70 border border-success-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-success-700">
                  <CheckCircle size={15} />
                  <span>CORRECT (Syllabus Standard):</span>
                </div>
                <p className="font-mono text-xs text-success-900 font-semibold">
                  "{pitfall.correctExample}"
                </p>
              </div>
            </div>

            {/* Trap Rule Bottom Pill */}
            <div className="p-3 rounded-lg bg-surface-900 text-white text-xs flex items-center gap-2 shadow-inner">
              <ShieldAlert size={16} className="text-amber-400 shrink-0" />
              <span className="font-mono text-[11px] font-bold text-amber-200">
                GOLDEN RULE: {pitfall.trapRule}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
