import TenseMatrix from './visuals/TenseMatrix'
import TenseTimeline from './visuals/TenseTimeline'
import AuxiliaryFlowchart from './visuals/AuxiliaryFlowchart'
import TimeMarkerPills from './visuals/TimeMarkerPills'
import { Badge, Callout } from '../common'

export default function VisualArchitectureStep() {
  return (
    <div className="space-y-10 select-none">
      {/* Header */}
      <div className="pb-4 border-b border-surface-200">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="primary" size="sm">Step 3 • Visual Explanations</Badge>
          <span className="text-xs text-surface-500">Spatial Models of the Tense System</span>
        </div>
        <h2 className="text-2xl font-bold font-heading text-surface-900">
          Visual Concepts: The Tense System in Space & Time
        </h2>
        <p className="text-xs text-surface-600 mt-1">
          Internalize abstract grammatical rules through interactive structural matrices, timelines, and procedural flowcharts.
        </p>
      </div>

      {/* Visual Component 1: 3x4 Tense Matrix */}
      <section className="space-y-4">
        <TenseMatrix />
      </section>

      {/* Visual Component 2: Chronological SVG Timeline */}
      <section className="space-y-4">
        <TenseTimeline />
      </section>

      {/* Visual Component 3: Auxiliary Concord Decision Flowchart */}
      <section className="space-y-4">
        <AuxiliaryFlowchart />
      </section>

      {/* Visual Component 4: Signal Word Adverb Decoder */}
      <section className="space-y-4">
        <TimeMarkerPills />
      </section>

      <Callout type="tip" title="Pedagogical Reinforcement">
        Notice how all continuous tenses share the present participle (<em>V_ing</em>), while all perfect tenses share the past participle (<em>V₃</em>). It is ONLY the auxiliary verb (<em>be</em> vs. <em>have</em>) that shifts across Past, Present, and Future.
      </Callout>
    </div>
  )
}
