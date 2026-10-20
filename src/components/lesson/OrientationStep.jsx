import { Target, CheckCircle2, ShieldCheck } from 'lucide-react'
import { Card, Badge, Callout } from '../common'

export default function OrientationStep({ metadata }) {
  return (
    <div className="space-y-6 select-none">
      {/* Intro Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-900 via-primary-800 to-indigo-950 text-white shadow-md space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="primary" className="bg-primary-700 text-primary-100 border-primary-500">
            Step 1 • Orientation
          </Badge>
          <span className="text-xs text-primary-200">The Cornerstone of English Grammar</span>
        </div>
        <h2 className="text-2xl font-bold font-heading text-white">
          Why Tenses Form the Mathematical Core of the High Court Exam
        </h2>
        <p className="text-xs md:text-sm text-primary-100/90 leading-relaxed max-w-3xl">
          In the Rajasthan High Court System Assistant examination, Part-B carries 20 marks for General Knowledge and English combined (with preparation strategy commonly targeting ~10 pivotal English questions). Master teachers recognize that <strong>Tenses</strong> are not an isolated chapter—they are the underlying syntactical foundation that directly governs Active & Passive Voice, Direct & Indirect Narration, Conditional Clauses, and Subject-Verb Agreement.
        </p>
      </div>

      {/* 6 Curricular Learning Objectives */}
      <Card variant="default" padding="lg" className="space-y-4">
        <div className="flex items-center gap-2 border-b border-surface-200 pb-3">
          <Target size={20} className="text-primary-600" />
          <h3 className="font-heading font-bold text-base text-surface-900">
            Authoritative Learning Objectives for Lesson 01
          </h3>
        </div>

        <p className="text-xs text-surface-600 leading-relaxed">
          By completing this lesson, you will achieve structural and conceptual mastery over the following 6 core competences:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {metadata?.learningObjectives?.map((obj, i) => (
            <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-50 border border-surface-200">
              <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-xs text-surface-700 font-medium leading-snug">
                {obj}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Scope Boundaries: Included vs Excluded */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="success" padding="md" className="space-y-3 border-success-300">
          <div className="flex items-center gap-2 text-success-800 font-bold text-sm">
            <CheckCircle2 size={18} className="text-success-600" />
            <h4>Strictly Included in Lesson 01</h4>
          </div>
          <ul className="text-xs text-success-900/90 space-y-2 list-disc list-inside">
            <li>The 3×4 Tense Matrix (Past, Present, Future × 4 Aspects)</li>
            <li>Auxiliary verb rules across person and number concord</li>
            <li>Affirmative, Negative, and Interrogative syntax structures</li>
            <li>Contextual temporal time markers (signal adverbs)</li>
            <li>Disambiguating Simple Past vs Present Perfect</li>
          </ul>
        </Card>

        <Card variant="filled" padding="md" className="space-y-3 border-surface-300 bg-surface-100/70">
          <div className="flex items-center gap-2 text-surface-800 font-bold text-sm">
            <ShieldCheck size={18} className="text-surface-600" />
            <h4>Deferred to Subsequent Lessons</h4>
          </div>
          <ul className="text-xs text-surface-600 space-y-2 list-disc list-inside">
            <li>Sequence of Tenses & Cross-Clause Harmony ➔ <em>Lesson 02</em></li>
            <li>Universal Truth Exceptions in Subordinate Clauses ➔ <em>Lesson 02</em></li>
            <li>Conditional Sentences (Types 0, 1, 2, 3) ➔ <em>Lesson 03</em></li>
            <li>Future Time Clauses with Temporal Conjunctions ➔ <em>Lesson 03</em></li>
            <li>Inverted Conditionals (Had I..., Were he...) ➔ <em>Lesson 03</em></li>
          </ul>
        </Card>
      </div>

      {/* Strategic Exam Tip */}
      <Callout type="tip" title="Strategic High Court Insight">
        In multiple-choice examinations, question-setters deliberately insert <strong>time markers</strong> (such as <em>yesterday, already, since, by the time</em>) as contextual clues. Their interpretation depends on meaning, event duration, completion, and sentence structure. Once you master interpreting time markers in context, you will quickly eliminate inconsistent options.
      </Callout>
    </div>
  )
}
