import { useState } from 'react'
import { Tag, Sparkles } from 'lucide-react'
import { Badge, Card } from '../../common'

const TIME_MARKERS_DATA = [
  {
    marker: 'yesterday',
    tense: 'Simple Past',
    category: 'Definite Past Point',
    rule: 'Mandates Simple Past (V₂). Never pair with Present Perfect.',
    example: 'The bench delivered the order yesterday.',
  },
  {
    marker: 'ago',
    tense: 'Simple Past',
    category: 'Definite Past Point',
    rule: 'Counts backward from now into the finished past; requires V₂.',
    example: 'The registrar signed the summons three days ago.',
  },
  {
    marker: 'already',
    tense: 'Present Perfect',
    category: 'Prior Completion',
    rule: 'Indicates action occurred sooner than expected, with present relevance (has/have + V₃).',
    example: 'The petitioner has already deposited the security fee.',
  },
  {
    marker: 'yet',
    tense: 'Present Perfect',
    category: 'Negative/Question Anchor',
    rule: 'Used in negative and interrogative Present Perfect sentences.',
    example: 'Has the computer wing uploaded the key yet?',
  },
  {
    marker: 'recently / lately',
    tense: 'Present Perfect',
    category: 'Recent Past Anchor',
    rule: 'Expresses events completed in the recent past that remain fresh.',
    example: 'The High Court has recently upgraded its IT infrastructure.',
  },
  {
    marker: 'since + point of time',
    tense: 'Present Perfect Continuous',
    category: 'Duration from Origin',
    rule: 'Pins an unbroken event to a specific historical calendar origin.',
    example: 'She has been practicing law since 2017.',
  },
  {
    marker: 'for + duration',
    tense: 'Present Perfect Continuous',
    category: 'Duration Span',
    rule: 'Pins an unbroken ongoing event to a count of hours/days/years.',
    example: 'The system has been scanning for 45 minutes.',
  },
  {
    marker: 'by + future time',
    tense: 'Future Perfect',
    category: 'Future Completion Boundary',
    rule: 'Mandates Future Perfect (will have + V₃). Do not use Simple Future.',
    example: 'They will have verified all applications by next Friday.',
  },
  {
    marker: 'now / currently',
    tense: 'Present Continuous',
    category: 'Moment of Speaking',
    rule: 'Demands is/am/are + V-ing. (Unless the verb is stative).',
    example: 'The committee is evaluating the merit list currently.',
  },
  {
    marker: 'daily / every week',
    tense: 'Simple Present',
    category: 'Habitual Recurrence',
    rule: 'Mandates base V₁ or 3rd-person singular V_s/es. Never use continuous aspect.',
    example: 'The System Assistant checks network latency daily.',
  },
  {
    marker: 'before + Simple Past',
    tense: 'Past Perfect',
    category: 'Sequential Past',
    rule: 'The action completed prior to the "before" clause takes had + V₃.',
    example: 'The witness had departed before the judge arrived.',
  },
  {
    marker: 'at this time tomorrow',
    tense: 'Future Continuous',
    category: 'Future Specific Instant',
    rule: 'Mandates will be + V-ing for an event ongoing at that future time.',
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
            <span>Deterministic Time Marker Decoder</span>
          </h3>
          <p className="text-xs text-surface-500">
            Click any signal word to identify the mandatory verb tense trigger in exam questions.
          </p>
        </div>
        <Badge variant="primary" size="sm">Signal Adverb Dictionary</Badge>
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
            Mandatory Tense: {selectedMarker.tense}
          </Badge>
        </div>

        <div className="text-xs space-y-2">
          <div className="flex items-start gap-2 text-surface-700">
            <Sparkles size={14} className="text-primary-600 shrink-0 mt-0.5" />
            <span><strong>Exam Rule:</strong> {selectedMarker.rule}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white border border-surface-200 text-surface-800 italic">
            <strong>Exemplar:</strong> "{selectedMarker.example}"
          </div>
        </div>
      </div>
    </Card>
  )
}
