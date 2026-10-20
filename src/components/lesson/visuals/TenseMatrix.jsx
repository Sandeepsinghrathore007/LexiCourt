import { useState } from 'react'
import { Sparkles, Check, ArrowRight } from 'lucide-react'
import { Badge, Card } from '../../common'

const TIMES = ['Present', 'Past', 'Future']
const ASPECTS = ['Simple', 'Continuous', 'Perfect', 'Perfect Continuous']

const MATRIX_DATA = {
  'Present-Simple': {
    tense: 'Simple Present',
    formula: 'S + V₁ / V_s/es',
    aux: 'do / does',
    example: 'The bench convenes daily at 10:30 AM.',
    markers: 'daily, always, usually, often, every week',
    color: 'border-primary-400 bg-primary-50/70',
  },
  'Present-Continuous': {
    tense: 'Present Continuous',
    formula: 'S + is/am/are + V_ing',
    aux: 'is / am / are',
    example: 'The system assistant is updating the server now.',
    markers: 'now, right now, currently, at present',
    color: 'border-primary-400 bg-primary-50/70',
  },
  'Present-Perfect': {
    tense: 'Present Perfect',
    formula: 'S + has/have + V₃',
    aux: 'has / have',
    example: 'The registrar has verified all documents already.',
    markers: 'already, just, yet, recently, so far',
    color: 'border-primary-400 bg-primary-50/70',
  },
  'Present-Perfect Continuous': {
    tense: 'Present Perfect Continuous',
    formula: 'S + has/have + been + V_ing',
    aux: 'has been / have been',
    example: 'They have been auditing the logs for two hours.',
    markers: 'since, for, all morning, how long',
    color: 'border-primary-400 bg-primary-50/70',
  },
  'Past-Simple': {
    tense: 'Simple Past',
    formula: 'S + V₂ (Affirmative) | did not + V₁',
    aux: 'did',
    example: 'The court issued the summon yesterday.',
    markers: 'yesterday, ago, last year, in 2021',
    color: 'border-amber-400 bg-amber-50/70',
  },
  'Past-Continuous': {
    tense: 'Past Continuous',
    formula: 'S + was/were + V_ing',
    aux: 'was / were',
    example: 'The clerk was filing petitions when the alarm rang.',
    markers: 'while, at that time, at 4 PM yesterday',
    color: 'border-amber-400 bg-amber-50/70',
  },
  'Past-Perfect': {
    tense: 'Past Perfect',
    formula: 'S + had + V₃',
    aux: 'had',
    example: 'The accused had fled before the police arrived.',
    markers: 'before, after, by the time, until then',
    color: 'border-amber-400 bg-amber-50/70',
  },
  'Past-Perfect Continuous': {
    tense: 'Past Perfect Continuous',
    formula: 'S + had + been + V_ing',
    aux: 'had been',
    example: 'They had been waiting for three hours before the hearing started.',
    markers: 'for + duration + before',
    color: 'border-amber-400 bg-amber-50/70',
  },
  'Future-Simple': {
    tense: 'Simple Future',
    formula: 'S + will/shall + V₁',
    aux: 'will / shall',
    example: 'The administration will declare results tomorrow.',
    markers: 'tomorrow, next week, soon, shortly',
    color: 'border-emerald-400 bg-emerald-50/70',
  },
  'Future-Continuous': {
    tense: 'Future Continuous',
    formula: 'S + will/shall + be + V_ing',
    aux: 'will be / shall be',
    example: 'Candidates will be appearing for typing test at 10 AM.',
    markers: 'at this time tomorrow, during next week',
    color: 'border-emerald-400 bg-emerald-50/70',
  },
  'Future-Perfect': {
    tense: 'Future Perfect',
    formula: 'S + will/shall + have + V₃',
    aux: 'will have / shall have',
    example: 'The team will have scanned all files by 5 PM.',
    markers: 'by tomorrow, by next month, by 2028',
    color: 'border-emerald-400 bg-emerald-50/70',
  },
  'Future-Perfect Continuous': {
    tense: 'Future Perfect Continuous',
    formula: 'S + will/shall + have + been + V_ing',
    aux: 'will have been',
    example: 'By next July, she will have been teaching for 5 years.',
    markers: 'by + future time ... for + duration',
    color: 'border-emerald-400 bg-emerald-50/70',
  },
}

export default function TenseMatrix() {
  const [selectedCell, setSelectedCell] = useState('Present-Perfect')
  const activeData = MATRIX_DATA[selectedCell]

  return (
    <div className="space-y-6 select-none">
      {/* Matrix Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-heading font-bold text-base text-surface-900 flex items-center gap-2">
            <Sparkles size={18} className="text-primary-600" />
            <span>The 3×4 Tense Matrix (Time × Aspect)</span>
          </h3>
          <p className="text-xs text-surface-500">
            Click any cell to inspect its structural formula, auxiliary concord, and exam example.
          </p>
        </div>
        <Badge variant="primary" size="sm">
          Interactive Architecture
        </Badge>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto pb-2">
        <table className="w-full border-collapse text-left min-w-[700px]">
          <thead>
            <tr>
              <th className="p-3 bg-surface-100 text-xs font-bold text-surface-700 uppercase tracking-wider rounded-tl-xl border-b border-surface-200">
                Time \ Aspect
              </th>
              {ASPECTS.map((aspect) => (
                <th
                  key={aspect}
                  className="p-3 bg-surface-100 text-xs font-bold text-surface-800 uppercase tracking-wider text-center border-b border-surface-200"
                >
                  {aspect}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIMES.map((time, rowIdx) => (
              <tr key={time} className="border-b border-surface-100 hover:bg-surface-50/50">
                <td className={`p-3 font-heading font-bold text-xs text-surface-900 bg-surface-50/80 border-r border-surface-200 ${
                  rowIdx === TIMES.length - 1 ? 'rounded-bl-xl' : ''
                }`}>
                  {time}
                </td>
                {ASPECTS.map((aspect) => {
                  const key = `${time}-${aspect}`
                  const item = MATRIX_DATA[key]
                  const isSelected = selectedCell === key

                  return (
                    <td key={aspect} className="p-2">
                      <button
                        type="button"
                        onClick={() => setSelectedCell(key)}
                        className={`w-full text-left p-3 rounded-xl border-2 transition-all cursor-pointer ${
                          isSelected
                            ? `${item.color} shadow-sm ring-2 ring-primary-500 scale-[1.02]`
                            : 'border-surface-200 bg-white hover:border-surface-300 hover:bg-surface-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-heading font-bold text-xs text-surface-900 truncate">
                            {item.tense.replace(time, '').trim() || time}
                          </span>
                          {isSelected && <Check size={12} className="text-primary-600 shrink-0" />}
                        </div>
                        <p className="font-mono text-[11px] text-surface-600 font-medium truncate">
                          {item.formula.replace('Subject', 'S')}
                        </p>
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Cell Detail Inspector */}
      {activeData && (
        <Card variant="default" padding="lg" className="border-primary-200 bg-gradient-to-br from-primary-50/40 via-white to-primary-50/20">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="primary">{activeData.tense}</Badge>
                <span className="text-xs text-surface-500">
                  Time: <strong>{selectedCell.split('-')[0]}</strong> • Aspect: <strong>{selectedCell.split('-')[1]}</strong>
                </span>
              </div>
              <p className="font-mono text-sm md:text-base font-bold text-primary-800 bg-white px-3 py-1.5 rounded-lg border border-primary-200 inline-block shadow-2xs">
                {activeData.formula}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-surface-500 block">Auxiliary Concord</span>
              <span className="font-mono text-xs font-bold text-surface-800 bg-surface-100 px-2 py-1 rounded">
                {activeData.aux}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2 border-t border-surface-200">
            <div>
              <span className="font-bold text-surface-700 block mb-1">Exemplar Sentence:</span>
              <p className="p-2.5 rounded-lg bg-white border border-surface-200 font-medium text-surface-800 italic">
                "{activeData.example}"
              </p>
            </div>
            <div>
              <span className="font-bold text-surface-700 block mb-1">Deterministic Signal Markers:</span>
              <p className="p-2.5 rounded-lg bg-white border border-surface-200 text-surface-600">
                {activeData.markers}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
