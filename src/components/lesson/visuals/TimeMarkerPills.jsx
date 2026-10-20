import { useState } from 'react'
import { Tag, Sparkles } from 'lucide-react'
import { Badge, Card } from '../../common'

const TIME_MARKERS_DATA = [
  {
    marker: 'yesterday',
    tense: 'Simple Past / Past Continuous',
    category: 'Definite Past Reference',
    rule: 'Typically anchors a finished event in the past (Simple Past V₂). However, when specifying an ongoing activity in progress at a specific past point, Past Continuous is used (e.g., "At 4 PM yesterday, I was verifying the records"). Avoid Present Perfect with past points.',
    example: 'The bench delivered the order yesterday. / At 4 PM yesterday, I was verifying the records.',
  },
  {
    marker: 'ago',
    tense: 'Simple Past',
    category: 'Definite Past Interval',
    rule: 'Measures backward from the present to locate an action in finished past time; takes lexical V₂. Avoid pairing with Present Perfect.',
    example: 'The registrar signed the summons three days ago.',
  },
  {
    marker: 'for + duration',
    tense: 'Context-Dependent (Simple Past / Pres Perf / Perf Cont)',
    category: 'Duration Span',
    rule: 'Interpretation depends on whether the period is finished or extends to the present: a completed past period uses Simple Past ("He worked in Jaipur for three years"); a period extending to the present uses Present Perfect ("He has worked here for three years") or Present Perfect Continuous for dynamic ongoing activity ("The system has been scanning for 45 minutes").',
    example: '"He worked in Jaipur for three years" (finished period) vs. "He has worked here for three years" (extends to present).',
  },
  {
    marker: 'since + point of time',
    tense: 'Present Perfect / Perfect Continuous',
    category: 'Starting Point to Present',
    rule: 'Anchors an event to a starting point in the past that connects to the present moment. Dynamic verbs typically take Present Perfect Continuous; stative verbs take Present Perfect.',
    example: 'She has been practicing law since 2017. / He has known the facts since morning.',
  },
  {
    marker: 'already',
    tense: 'Present Perfect (or Past Perfect in past narrative)',
    category: 'Prior Completion',
    rule: 'Signals an action completed prior to the reference point, often earlier than expected. In present frames, takes has/have + V₃; in past narrative frames, can align with Past Perfect.',
    example: 'The petitioner has already deposited the security fee.',
  },
  {
    marker: 'yet',
    tense: 'Present Perfect',
    category: 'Negative / Question Clue',
    rule: 'Frequently used in negative clauses ("has/have not + V₃") and interrogative clauses to indicate expected completion up to the present moment.',
    example: 'Has the computer wing uploaded the key yet?',
  },
  {
    marker: 'recently / lately',
    tense: 'Present Perfect / Simple Past',
    category: 'Recent Past Anchor',
    rule: 'Expresses events completed in the recent past that retain present relevance (Present Perfect). In some contexts, Simple Past is also found when referring to a specific recent event.',
    example: 'The High Court has recently upgraded its IT infrastructure.',
  },
  {
    marker: 'always / daily / every week',
    tense: 'Simple Present / Present Continuous',
    category: 'Frequency & Habitual Recurrence',
    rule: 'Standard routines and scheduled habits take Simple Present (V₁ or V_s/es). Crucial contextual exception: frequency adverbs like "always" can be paired with Present Continuous to express emotional emphasis, habit, or speaker annoyance (e.g., "He is always interrupting").',
    example: '"The assistant checks server latency daily" (routine) vs. "He is always interrupting" (annoyance).',
  },
  {
    marker: 'now / currently',
    tense: 'Present Continuous (Simple Present for stative verbs)',
    category: 'Moment of Speaking',
    rule: 'Signals an action actively unfolding at or around the moment of speaking (is/am/are + V-ing). If the verb is stative (know, understand, believe), Simple Present is used instead.',
    example: 'The committee is evaluating the merit list currently. / I understand the issue now.',
  },
  {
    marker: 'by + future time',
    tense: 'Future Perfect',
    category: 'Future Completion Boundary',
    rule: 'Signals that an event will be completed on or before a specified future boundary or deadline, typically taking Future Perfect (will have + V₃).',
    example: 'They will have verified all applications by next Friday.',
  },
  {
    marker: 'by + past time',
    tense: 'Past Perfect',
    category: 'Past Completion Boundary',
    rule: 'Signals that an event was accomplished prior to a specified past point in time or deadline (had + V₃). Cross-clause sequence of tenses between two actions is explored in Lesson 02.',
    example: 'The team had finalized the draft by 3 PM yesterday.',
  },
  {
    marker: 'at this time tomorrow',
    tense: 'Future Continuous',
    category: 'Future Specific Instant',
    rule: 'Specifies an action that will be actively in progress at a particular temporal landmark in the future (will be + V-ing).',
    example: 'Candidates will be taking the test at this time tomorrow.',
  },
]

export default function TimeMarkerPills() {
  const [selectedMarker, setSelectedMarker] = useState(TIME_MARKERS_DATA[0])

  return (
    <Card variant="default" padding="lg" className="space-y-6 select-none border-surface-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-heading font-bold text-base text-surface-900 flex items-center gap-2">
            <Tag size={18} className="text-primary-600" />
            <span>Contextual Time Marker Decoder</span>
          </h3>
          <p className="text-xs text-surface-500">
            Click any time marker to see how its tense interpretation depends on context, duration, completion, and reference time.
          </p>
        </div>
        <Badge variant="primary" size="sm">Contextual Interpretation Guide</Badge>
      </div>

      {/* Pill Cloud */}
      <div className="flex flex-wrap gap-2">
        {TIME_MARKERS_DATA.map((item) => {
          const isSelected = selectedMarker.marker === item.marker
          return (
            <button
              key={item.marker}
              type="button"
              onClick={() => setSelectedMarker(item)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-primary-600 text-white border-primary-600 shadow-xs scale-105 ring-2 ring-primary-200'
                  : 'bg-surface-50 text-surface-700 border-surface-200 hover:bg-primary-50 hover:border-primary-300'
              }`}
            >
              "{item.marker}"
            </button>
          )
        })}
      </div>

      {/* Detail Card */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-surface-50 to-primary-50/30 border border-primary-200 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-primary-900 bg-white px-2.5 py-1 rounded-md border border-primary-200 shadow-2xs">
              "{selectedMarker.marker}"
            </span>
            <Badge variant="secondary" size="sm">{selectedMarker.category}</Badge>
          </div>
          <Badge variant="primary" size="md">
            Typical Tense: {selectedMarker.tense}
          </Badge>
        </div>

        <div className="text-xs space-y-2">
          <div className="flex items-start gap-2 text-surface-700">
            <Sparkles size={14} className="text-primary-600 shrink-0 mt-0.5" />
            <span><strong>Contextual Guide:</strong> {selectedMarker.rule}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white border border-surface-200 text-surface-800 italic">
            <strong>Exemplar:</strong> "{selectedMarker.example}"
          </div>
        </div>
      </div>
    </Card>
  )
}
