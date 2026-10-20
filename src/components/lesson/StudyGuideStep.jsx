import { BookOpen, Sparkles, Layers, AlertTriangle } from 'lucide-react'
import { Card, Badge, Callout } from '../common'

export default function StudyGuideStep() {
  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className="pb-4 border-b border-surface-200">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="primary" size="sm">Step 2 • Comprehensive Theory</Badge>
          <span className="text-xs text-surface-500">Authoritative English Grammar Study Document</span>
        </div>
        <h2 className="text-2xl font-bold font-heading text-surface-900">
          The Dual-Axis Architecture of the English Tense System
        </h2>
        <p className="text-xs text-surface-600 mt-1">
          Study the structural mechanics that produce all 12 tenses, their governing formulas, and auxiliary concord.
        </p>
      </div>

      {/* Chapter 1: Time vs Aspect */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary-600 text-white font-mono font-bold text-xs flex items-center justify-center">
            01
          </div>
          <h3 className="font-heading font-bold text-lg text-surface-900">
            Deconstructing Time vs. Aspect
          </h3>
        </div>

        <p className="text-xs text-surface-700 leading-relaxed">
          Most learners falsely equate <em>tense</em> simply with <em>time</em>. In descriptive linguistic grammar, the 12 tenses are formed by the mathematical intersection of two independent dimensions:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card variant="default" padding="md" className="space-y-2 border-primary-200 bg-primary-50/20">
            <span className="font-heading font-bold text-sm text-primary-950 flex items-center gap-2">
              <Layers size={16} className="text-primary-600" />
              Dimension 1: Time (When it occurs)
            </span>
            <p className="text-xs text-surface-600 leading-relaxed">
              Locates an event on the physical timeline relative to the moment of speaking:
            </p>
            <ul className="text-xs text-surface-700 space-y-1 list-disc list-inside">
              <li><strong>Past:</strong> Completed before the moment of speaking.</li>
              <li><strong>Present:</strong> Coincides with or contains the moment of speaking.</li>
              <li><strong>Future:</strong> Anticipated after the moment of speaking.</li>
            </ul>
          </Card>

          <Card variant="default" padding="md" className="space-y-2 border-amber-200 bg-amber-50/20">
            <span className="font-heading font-bold text-sm text-amber-950 flex items-center gap-2">
              <Sparkles size={16} className="text-amber-600" />
              Dimension 2: Aspect (How it unfolds)
            </span>
            <p className="text-xs text-surface-600 leading-relaxed">
              Describes the speaker's perspective on the internal temporal contour of the event:
            </p>
            <ul className="text-xs text-surface-700 space-y-1 list-disc list-inside">
              <li><strong>Simple:</strong> Fact/habit/point viewed as a whole.</li>
              <li><strong>Continuous:</strong> Incomplete, dynamic ongoing progression.</li>
              <li><strong>Perfect:</strong> Completed state with relevance to a reference point.</li>
              <li><strong>Perfect Continuous:</strong> Accumulation of duration spanning up to a point.</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Chapter 2: Verb Inflection Forms */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary-600 text-white font-mono font-bold text-xs flex items-center justify-center">
            02
          </div>
          <h3 className="font-heading font-bold text-lg text-surface-900">
            The Five Verb Inflection Forms ($V_1$ through $V_5$)
          </h3>
        </div>

        <p className="text-xs text-surface-700 leading-relaxed">
          Every English verb conjugates into five distinct grammatical forms that populate the slots of the 12 tense formulas:
        </p>

        <div className="overflow-x-auto pb-2">
          <table className="w-full text-xs text-left border-collapse border border-surface-200 rounded-xl overflow-hidden min-w-[600px]">
            <thead className="bg-surface-100 font-heading font-bold text-surface-800">
              <tr>
                <th className="p-3 border-b border-surface-200">Notation</th>
                <th className="p-3 border-b border-surface-200">Grammatical Term</th>
                <th className="p-3 border-b border-surface-200">Regular Verb Example</th>
                <th className="p-3 border-b border-surface-200">Irregular Verb Example</th>
                <th className="p-3 border-b border-surface-200">Governing Tense Roles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 font-mono text-surface-700">
              <tr className="hover:bg-surface-50">
                <td className="p-3 font-bold text-primary-700">V₁</td>
                <td className="p-3 font-sans">Base Form / Infinitive</td>
                <td className="p-3">submit</td>
                <td className="p-3 font-bold text-amber-700">write / go</td>
                <td className="p-3 font-sans">Simple Present (Plural/I), Simple Future (will + V₁)</td>
              </tr>
              <tr className="hover:bg-surface-50">
                <td className="p-3 font-bold text-primary-700">V₂</td>
                <td className="p-3 font-sans">Simple Past Form</td>
                <td className="p-3">submitted</td>
                <td className="p-3 font-bold text-amber-700">wrote / went</td>
                <td className="p-3 font-sans">Simple Past Affirmative exclusively</td>
              </tr>
              <tr className="hover:bg-surface-50">
                <td className="p-3 font-bold text-primary-700">V₃</td>
                <td className="p-3 font-sans">Past Participle Form</td>
                <td className="p-3">submitted</td>
                <td className="p-3 font-bold text-amber-700">written / gone</td>
                <td className="p-3 font-sans">All Perfect Tenses (has/have/had/will have + V₃)</td>
              </tr>
              <tr className="hover:bg-surface-50">
                <td className="p-3 font-bold text-primary-700">V_ing</td>
                <td className="p-3 font-sans">Present Participle Form</td>
                <td className="p-3">submitting</td>
                <td className="p-3 font-bold text-amber-700">writing / going</td>
                <td className="p-3 font-sans">All 6 Continuous and Perfect Continuous Tenses</td>
              </tr>
              <tr className="hover:bg-surface-50">
                <td className="p-3 font-bold text-primary-700">V_s/es</td>
                <td className="p-3 font-sans">3rd-Person Singular Present</td>
                <td className="p-3">submits</td>
                <td className="p-3 font-bold text-amber-700">writes / goes</td>
                <td className="p-3 font-sans">Simple Present (He/She/It/Singular) Affirmative</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Chapter 3: Syntactic Sentence Polarity Patterns */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary-600 text-white font-mono font-bold text-xs flex items-center justify-center">
            03
          </div>
          <h3 className="font-heading font-bold text-lg text-surface-900">
            Sentence Polarity: Affirmative, Negative & Interrogative Syntax
          </h3>
        </div>

        <p className="text-xs text-surface-700 leading-relaxed">
          Questions in competitive exams frequently test syntactic word-order shifts when negating sentences or forming questions:
        </p>

        <div className="space-y-3">
          <Card variant="default" padding="md" className="border-l-4 border-l-success-500">
            <span className="text-xs font-bold text-success-800 uppercase tracking-wider block mb-1">
              1. Affirmative (Positive) Pattern
            </span>
            <p className="font-mono text-xs text-surface-800 bg-surface-50 p-2.5 rounded-lg border border-surface-200">
              Subject + [Auxiliary Verb] + [Main Verb Inflection] + Object / Complement
            </p>
            <p className="text-xs text-surface-600 mt-1 italic">
              Example: "The registrar has verified the electronic docket."
            </p>
          </Card>

          <Card variant="default" padding="md" className="border-l-4 border-l-error-500">
            <span className="text-xs font-bold text-error-800 uppercase tracking-wider block mb-1">
              2. Negative Pattern (Insertion of 'not')
            </span>
            <p className="font-mono text-xs text-surface-800 bg-surface-50 p-2.5 rounded-lg border border-surface-200">
              Subject + Auxiliary Verb + <strong>not</strong> + [Main Verb Inflection] + Object
            </p>
            <p className="text-xs text-surface-600 mt-1 italic">
              Example: "The registrar has <strong>not</strong> verified the electronic docket."
            </p>
          </Card>

          <Card variant="default" padding="md" className="border-l-4 border-l-primary-500">
            <span className="text-xs font-bold text-primary-800 uppercase tracking-wider block mb-1">
              3. Interrogative Pattern (Inversion Rule)
            </span>
            <p className="font-mono text-xs text-surface-800 bg-surface-50 p-2.5 rounded-lg border border-surface-200">
              [Wh-word] + <strong>Auxiliary Verb</strong> + <strong>Subject</strong> + [Main Verb Inflection] + Object?
            </p>
            <p className="text-xs text-surface-600 mt-1 italic">
              Example: "<strong>Has</strong> the registrar verified the electronic docket?"
            </p>
          </Card>
        </div>
      </section>

      {/* Chapter 4: Summary Table */}
      <Callout type="info" title="Retention Checkpoint">
        Before proceeding to Step 3 (*Visual Architecture*), ensure you can mentally recite the formulas for the three perfect tenses: Present Perfect (<em>has/have + V₃</em>), Past Perfect (<em>had + V₃</em>), and Future Perfect (<em>will have + V₃</em>).
      </Callout>
    </div>
  )
}
