import { useState } from 'react'
import { Tag, Sparkles } from 'lucide-react'
import { Badge, Card } from '../../common'

const TIME_MARKERS_DATA = [
  {
    marker: 'yesterday',
    tense: 'Simple Past / Past Continuous',
    category: 'Definite Past Reference',
    rule: 'Aamtaur par past ke finished event ko anchor karta hai (Simple Past V₂). Lekin kisi specific past point par chal rahe ongoing action ke liye Past Continuous use hota hai (jaise "At 4 PM yesterday, I was verifying the records"). Past time markers ke sath Present Perfect kabhi use na karein.',
    example: 'The bench delivered the order yesterday. / At 4 PM yesterday, I was verifying the records.',
  },
  {
    marker: 'ago',
    tense: 'Simple Past',
    category: 'Definite Past Interval',
    rule: 'Present se peeche ki taraf time napta hai aur beete huye past action ko locate karta hai (V₂). Iske sath Present Perfect kabhi pair na karein.',
    example: 'The registrar signed the summons three days ago.',
  },
  {
    marker: 'for + duration',
    tense: 'Context-Dependent (Simple Past / Pres Perf / Perf Cont)',
    category: 'Duration Span',
    rule: 'Interpretation is baat par depend karta hai ki period khatam ho chuka hai ya present tak chal raha hai: agar period past mein khatam ho gaya toh Simple Past ("He worked in Jaipur for three years"); agar period present tak jari hai toh Present Perfect ("He has worked here for three years") ya ongoing dynamic activity ke liye Present Perfect Continuous use karein.',
    example: '"He worked in Jaipur for three years" (finished period) vs. "He has worked here for three years" (extends to present).',
  },
  {
    marker: 'since + point of time',
    tense: 'Present Perfect / Perfect Continuous',
    category: 'Starting Point to Present',
    rule: 'Past ke starting point ko present moment se jodta hai. Dynamic verbs aamtaur par Present Perfect Continuous lete hain; stative verbs Present Perfect lete hain.',
    example: 'She has been practicing law since 2017. / He has known the facts since morning.',
  },
  {
    marker: 'already',
    tense: 'Present Perfect (or Past Perfect in past narrative)',
    category: 'Prior Completion',
    rule: 'Reference point se pehle complete huye action ko darshata hai, aksar umeed se pehle. Present frame mein has/have + V₃ lagta hai; past narrative frame mein Past Perfect ke sath align hota hai.',
    example: 'The petitioner has already deposited the security fee.',
  },
  {
    marker: 'yet',
    tense: 'Present Perfect',
    category: 'Negative / Question Clue',
    rule: 'Aamtaur par negative clauses ("has/have not + V₃") aur interrogative clauses mein aane wale expected completion ko darshata hai.',
    example: 'Has the computer wing uploaded the key yet?',
  },
  {
    marker: 'recently / lately',
    tense: 'Present Perfect / Simple Past',
    category: 'Recent Past Anchor',
    rule: 'Hali-filhal mein complete huye actions ko express karta hai jinki present relevance bani hui hai (Present Perfect).',
    example: 'The High Court has recently upgraded its IT infrastructure.',
  },
  {
    marker: 'always / daily / every week',
    tense: 'Simple Present / Present Continuous',
    category: 'Frequency & Habitual Recurrence',
    rule: 'Standard routines aur scheduled habits ke liye Simple Present (V₁ ya V_s/es) lagta hai. Important exception: "always" ko annoyance ya emotional emphasis show karne ke liye Present Continuous ke sath bhi use kiya ja sakta hai (jaise "He is always interrupting").',
    example: '"The assistant checks server latency daily" (routine) vs. "He is always interrupting" (annoyance).',
  },
  {
    marker: 'now / currently',
    tense: 'Present Continuous (Simple Present for stative verbs)',
    category: 'Moment of Speaking',
    rule: 'Bolte waqt chal rahe ongoing action ko point karta hai (is/am/are + V-ing). Agar verb stative ho (know, understand, believe), toh continuous ke bajaye Simple Present use hota hai.',
    example: 'The committee is evaluating the merit list currently. / I understand the issue now.',
  },
  {
    marker: 'by + future time',
    tense: 'Future Perfect',
    category: 'Future Completion Boundary',
    rule: 'Future deadline tak complete hone wale action ko point karta hai, isliye yahan Future Perfect (will have + V₃) use hota hai.',
    example: 'They will have verified all applications by next Friday.',
  },
  {
    marker: 'by + past time',
    tense: 'Past Perfect',
    category: 'Past Completion Boundary',
    rule: 'Past ke kisi specific time se pehle complete huye action ko point karta hai (had + V₃).',
    example: 'The team had finalized the draft by 3 PM yesterday.',
  },
  {
    marker: 'at this time tomorrow',
    tense: 'Future Continuous',
    category: 'Future Specific Instant',
    rule: 'Future ke kisi specific instant par chal rahe ongoing action ko darshata hai (will be + V-ing).',
    example: 'Candidates will be taking the test at this time tomorrow.',
  },
]

export default function TimeMarkerPills() {
  const [selectedMarker, setSelectedMarker] = useState(TIME_MARKERS_DATA[0])

  return (
    <Card variant="default" padding="lg" className="space-y-6 select-none border-surface-200 dark:border-surface-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50 flex items-center gap-2">
            <Tag size={18} className="text-primary-600 dark:text-primary-400" />
            <span>Contextual Time Marker Decoder</span>
          </h3>
          <p className="text-xs text-surface-500 dark:text-surface-400">
            Tense interpretation context, duration, aur reference time par kaise depend karta hai, ye dekhne ke liye kisi bhi time marker par click karein.
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
                  ? 'bg-primary-600 text-white border-primary-600 shadow-xs scale-105 ring-2 ring-primary-200 dark:ring-primary-900'
                  : 'bg-surface-50 dark:bg-surface-800/80 text-surface-700 dark:text-surface-300 border-surface-200 dark:border-surface-700 hover:bg-primary-50 dark:hover:bg-primary-950/40 hover:border-primary-300 dark:hover:border-primary-700'
              }`}
            >
              "{item.marker}"
            </button>
          )
        })}
      </div>

      {/* Detail Card */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-surface-50 to-primary-50/30 dark:from-surface-900 dark:to-primary-950/30 border border-primary-200 dark:border-primary-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-primary-900 dark:text-primary-100 bg-white dark:bg-surface-800 px-2.5 py-1 rounded-md border border-primary-200 dark:border-primary-700 shadow-2xs">
              "{selectedMarker.marker}"
            </span>
            <Badge variant="secondary" size="sm">{selectedMarker.category}</Badge>
          </div>
          <Badge variant="primary" size="md">
            Typical Tense: {selectedMarker.tense}
          </Badge>
        </div>

        <div className="text-xs space-y-2">
          <div className="flex items-start gap-2 text-surface-700 dark:text-surface-300">
            <Sparkles size={14} className="text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
            <span><strong>Contextual Guide:</strong> {selectedMarker.rule}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 text-surface-800 dark:text-surface-200 italic">
            <strong>Example:</strong> "{selectedMarker.example}"
          </div>
        </div>
      </div>
    </Card>
  )
}
