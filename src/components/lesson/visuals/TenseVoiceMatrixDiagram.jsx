import { useState } from 'react'
import { ShieldAlert } from 'lucide-react'
import { Card, Badge } from '../../common'

const TENSE_MATRIX_DATA = [
  {
    id: 'sp',
    tense: 'Simple Present',
    group: 'present',
    activeFormula: 'S + V1 / V_s/es + O',
    passiveFormula: 'O + is / am / are + V3',
    beForm: 'is / am / are',
    activeEx: 'The clerk drafts the legal notice.',
    passiveEx: 'The legal notice is drafted by the clerk.',
    tip: 'Singular ke sath is, plural ke sath are.'
  },
  {
    id: 'pc',
    tense: 'Present Continuous',
    group: 'present',
    activeFormula: 'S + is/am/are + V-ing + O',
    passiveFormula: 'O + is/am/are + being + V3',
    beForm: 'is/am/are + being',
    activeEx: 'The technicians are upgrading the servers.',
    passiveEx: 'The servers are being upgraded by the technicians.',
    tip: "'being' continuous aspect ko preserve karta hai."
  },
  {
    id: 'pp',
    tense: 'Present Perfect',
    group: 'present',
    activeFormula: 'S + has/have + V3 + O',
    passiveFormula: 'O + has/have + been + V3',
    beForm: 'has/have + been',
    activeEx: 'The committee has approved the guidelines.',
    passiveEx: 'The guidelines have been approved by the committee.',
    tip: 'Plural object par have been lagega.'
  },
  {
    id: 'spast',
    tense: 'Simple Past',
    group: 'past',
    activeFormula: 'S + V2 + O',
    passiveFormula: 'O + was / were + V3',
    beForm: 'was / were',
    activeEx: 'The judge pronounced the verdict yesterday.',
    passiveEx: 'The verdict was pronounced by the judge yesterday.',
    tip: "No backshifting! 'had been' nahi lagana."
  },
  {
    id: 'pastc',
    tense: 'Past Continuous',
    group: 'past',
    activeFormula: 'S + was/were + V-ing + O',
    passiveFormula: 'O + was/were + being + V3',
    beForm: 'was/were + being',
    activeEx: 'The clerk was verifying the records.',
    passiveEx: 'The records were being verified by the clerk.',
    tip: "Plural records ke sath 'were being'."
  },
  {
    id: 'pastp',
    tense: 'Past Perfect',
    group: 'past',
    activeFormula: 'S + had + V3 + O',
    passiveFormula: 'O + had + been + V3',
    beForm: 'had + been',
    activeEx: 'The registrar had locked the treasury.',
    passiveEx: 'The treasury had been locked by the registrar.',
    tip: "'been' drop karne se active sense banta hai."
  },
  {
    id: 'sf',
    tense: 'Simple Future',
    group: 'future',
    activeFormula: 'S + will/shall + V1 + O',
    passiveFormula: 'O + will/shall + be + V3',
    beForm: 'will/shall + be',
    activeEx: 'The bench will declare the cutoffs tomorrow.',
    passiveEx: 'The cutoffs will be declared by the bench tomorrow.',
    tip: 'Modal ke baad base form be aati hai.'
  },
  {
    id: 'fp',
    tense: 'Future Perfect',
    group: 'future',
    activeFormula: 'S + will/shall + have + V3 + O',
    passiveFormula: 'O + will/shall + have + been + V3',
    beForm: 'will/shall + have + been',
    activeEx: 'The assistant will have sent files by 4 PM.',
    passiveEx: 'The files will have been sent by the assistant by 4 PM.',
    tip: "'will has been' exist nahi karta."
  }
]

const OMITTED_TENSES = [
  { tense: 'Present Perfect Continuous', active: 'has/have been + V-ing', reason: "'has been being + V3' double auxiliary repetition se clumsy ho jata hai." },
  { tense: 'Past Perfect Continuous', active: 'had been + V-ing', reason: "'had been being + V3' standard English mein unnaturally redundant hai." },
  { tense: 'Future Continuous', active: 'will be + V-ing', reason: "'will be being + V3' pronunciation aur grammar mein standardly avoided hai." },
  { tense: 'Future Perfect Continuous', active: 'will have been + V-ing', reason: "'will have been being + V3' heavily awkward construction hai." }
]

export default function TenseVoiceMatrixDiagram() {
  const [filterGroup, setFilterGroup] = useState('all')

  const filteredData = filterGroup === 'all'
    ? TENSE_MATRIX_DATA
    : TENSE_MATRIX_DATA.filter((item) => item.group === filterGroup)

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-200 dark:border-surface-700 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Visual Architecture • Model 2</Badge>
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-300">
              The 8-Tense Transformation Matrix
            </span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-white mt-1">
            Active vs. Passive Tense-by-Tense Structural Matrix
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            Auxiliary 'be' ka accurate form tense aur naye subject ke number/person ke anusar lagayein.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-100 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
          {[
            { id: 'all', label: 'All 8 Tenses' },
            { id: 'present', label: 'Present' },
            { id: 'past', label: 'Past' },
            { id: 'future', label: 'Future' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterGroup(f.id)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                filterGroup === f.id
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Tense Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredData.map((row) => (
          <div
            key={row.id}
            className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-sm text-surface-900 dark:text-white">
                {row.tense}
              </span>
              <Badge variant="neutral" size="sm" className="font-mono text-2xs">
                be: {row.beForm}
              </Badge>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="p-2 rounded-lg bg-surface-100 dark:bg-surface-900/60 text-surface-700 dark:text-surface-300">
                <span className="text-2xs font-sans uppercase font-bold text-surface-500 dark:text-surface-400 block mb-0.5">
                  Active Formula
                </span>
                {row.activeFormula}
              </div>
              <div className="p-2 rounded-lg bg-primary-50/70 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800/50 text-primary-900 dark:text-primary-200">
                <span className="text-2xs font-sans uppercase font-bold text-primary-600 dark:text-primary-400 block mb-0.5">
                  Passive Formula
                </span>
                {row.passiveFormula}
              </div>
            </div>

            <div className="pt-2 border-t border-surface-200 dark:border-surface-700/60 text-xs space-y-1">
              <p className="text-surface-600 dark:text-surface-400">
                <strong className="text-surface-800 dark:text-surface-200 font-sans">Act: </strong>
                {row.activeEx}
              </p>
              <p className="text-primary-800 dark:text-primary-300 font-medium">
                <strong className="font-sans">Pass: </strong>
                {row.passiveEx}
              </p>
            </div>

            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-2xs text-amber-900 dark:text-amber-200">
              <strong>Key Tip: </strong>{row.tip}
            </div>
          </div>
        ))}
      </div>

      {/* Untransformable Tenses Section */}
      <div className="p-4 rounded-xl bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-3">
        <div className="flex items-center gap-2 text-surface-900 dark:text-white font-bold text-xs">
          <ShieldAlert size={16} className="text-amber-600 dark:text-amber-400" />
          <span>The 4 Conventionally Omitted Tenses in Competitive Exams</span>
        </div>
        <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed">
          English grammar tables mein in 4 tenses ka passive aam taur par omit kiya jata hai kyunki double auxiliary ('being been' ya 'be being') awkward sounding hoti hai. Exam mein aane par inka answer 'No Passive' hota hai:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {OMITTED_TENSES.map((item, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1">
              <div className="flex items-center justify-between font-semibold text-surface-800 dark:text-surface-200">
                <span>{item.tense}</span>
                <Badge variant="error" size="sm" className="text-2xs">No Passive</Badge>
              </div>
              <p className="text-2xs text-surface-500 dark:text-surface-400 font-mono">Active: {item.active}</p>
              <p className="text-2xs text-surface-600 dark:text-surface-300">{item.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
