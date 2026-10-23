import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, ArrowLeftRight, Sparkles } from 'lucide-react'
import { Card, Badge, Button } from '../../common'

const SAMPLE_SENTENCES = [
  {
    id: 's1',
    label: 'Standard S-V-O',
    subject: 'The court clerk',
    verb: 'prepared',
    object: 'the official report',
    passiveSubject: 'The official report',
    passiveAux: 'was',
    passiveV3: 'prepared',
    passiveAgent: 'by the court clerk',
    tense: 'Simple Past',
    hinglishNote: "'The official report' naya subject ban kar shuruat mein aaya, 'prepared' (V2) passive mein 'was prepared' (be + V3) bana, aur clerk 'by' ke baad agent bana."
  },
  {
    id: 's2',
    label: 'Pronoun Shift (She -> me)',
    subject: 'She',
    verb: 'helped',
    object: 'me',
    passiveSubject: 'I',
    passiveAux: 'was',
    passiveV3: 'helped',
    passiveAgent: 'by her',
    tense: 'Simple Past',
    hinglishNote: "Object 'me' subjective case 'I' ban gaya, aur subject 'She' objective case 'by her' ban kar agent bana."
  },
  {
    id: 's3',
    label: 'Plural Number Inversion',
    subject: 'The committee',
    verb: 'has approved',
    object: 'the new rules',
    passiveSubject: 'The new rules',
    passiveAux: 'have been',
    passiveV3: 'approved',
    passiveAgent: 'by the committee',
    tense: 'Present Perfect',
    hinglishNote: "Active subject singular ('committee' -> 'has') tha, lekin naya subject plural ('the new rules') hai, isliye passive auxiliary plural 'have been' bani."
  }
]

const PRONOUN_PAIRS = [
  { activeSub: 'I', passiveAgent: 'by me', activeObj: 'me', passiveSub: 'I' },
  { activeSub: 'We', passiveAgent: 'by us', activeObj: 'us', passiveSub: 'We' },
  { activeSub: 'You', passiveAgent: 'by you', activeObj: 'you', passiveSub: 'You' },
  { activeSub: 'He', passiveAgent: 'by him', activeObj: 'him', passiveSub: 'He' },
  { activeSub: 'She', passiveAgent: 'by her', activeObj: 'her', passiveSub: 'She' },
  { activeSub: 'They', passiveAgent: 'by them', activeObj: 'them', passiveSub: 'They' },
  { activeSub: 'Who', passiveAgent: 'by whom', activeObj: 'whom', passiveSub: 'Who' }
]

export default function VoiceTranspositionDiagram() {
  const [selectedExample, setSelectedExample] = useState(SAMPLE_SENTENCES[0])
  const [showPronounsTable, setShowPronounsTable] = useState(false)

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-200 dark:border-surface-700 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Visual Architecture • Model 1</Badge>
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-300">
              Spatial Transposition Engine
            </span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-white mt-1">
            Subject–Verb–Object (S-V-O) Transposition Architecture
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            Active se Passive bante waqt sentence ke teen structural blocks cross-transpose hote hain.
          </p>
        </div>

        {/* Example Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-100 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
          {SAMPLE_SENTENCES.map((ex) => (
            <button
              key={ex.id}
              onClick={() => setSelectedExample(ex)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                selectedExample.id === ex.id
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
              }`}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Spatial Comparison Canvas */}
      <div className="space-y-6">
        {/* Active Box */}
        <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="neutral" size="sm" className="font-mono">
              ACTIVE VOICE (Doer Focus)
            </Badge>
            <span className="text-xs font-mono text-surface-500 dark:text-surface-400">
              Pattern: Subject + Verb + Object
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-800/60">
              <span className="text-2xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                1. Subject (Doer)
              </span>
              <p className="text-sm font-bold text-primary-900 dark:text-primary-100 mt-0.5">
                {selectedExample.subject}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60">
              <span className="text-2xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                2. Active Verb ({selectedExample.tense})
              </span>
              <p className="text-sm font-bold text-amber-900 dark:text-amber-100 mt-0.5 font-mono">
                {selectedExample.verb}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-success-50 dark:bg-success-950/50 border border-success-200 dark:border-success-800/60">
              <span className="text-2xs font-bold uppercase tracking-wider text-success-600 dark:text-success-400">
                3. Direct Object (Receiver)
              </span>
              <p className="text-sm font-bold text-success-900 dark:text-success-100 mt-0.5">
                {selectedExample.object}
              </p>
            </div>
          </div>
        </div>

        {/* Transition Arrows Indicator */}
        <div className="relative py-2 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dashed border-surface-300 dark:border-surface-600" />
          </div>
          <div className="relative z-10 px-4 py-1 rounded-full bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-200 text-xs font-bold flex items-center gap-2">
            <ArrowDownRight size={14} className="text-success-600 dark:text-success-400" />
            <span>Transposition Mechanism ('be' + V3)</span>
            <ArrowUpRight size={14} className="text-primary-600 dark:text-primary-400" />
          </div>
        </div>

        {/* Passive Box */}
        <div className="p-4 rounded-xl bg-primary-50/50 dark:bg-primary-950/20 border-2 border-primary-300 dark:border-primary-700 space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="primary" size="sm" className="font-mono">
              PASSIVE VOICE (Receiver Focus)
            </Badge>
            <span className="text-xs font-mono text-primary-700 dark:text-primary-300 font-semibold">
              Pattern: New Subject + 'be' + V3 + (by + Agent)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
            {/* New Subject from Object */}
            <div className="p-3 rounded-lg bg-success-50 dark:bg-success-950/60 border border-success-300 dark:border-success-700 md:col-span-1">
              <span className="text-2xs font-bold uppercase tracking-wider text-success-700 dark:text-success-300">
                New Subject (Old Object)
              </span>
              <p className="text-sm font-bold text-success-950 dark:text-success-100 mt-0.5">
                {selectedExample.passiveSubject}
              </p>
            </div>

            {/* Form of BE */}
            <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-300 dark:border-indigo-700">
              <span className="text-2xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                Form of 'be' (Tense/Number)
              </span>
              <p className="text-sm font-bold text-indigo-950 dark:text-indigo-100 mt-0.5 font-mono">
                {selectedExample.passiveAux}
              </p>
            </div>

            {/* Past Participle V3 */}
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700">
              <span className="text-2xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                Lexical Verb (Strictly V3)
              </span>
              <p className="text-sm font-bold text-amber-950 dark:text-amber-100 mt-0.5 font-mono">
                {selectedExample.passiveV3}
              </p>
            </div>

            {/* Agent with BY */}
            <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-950/60 border border-primary-300 dark:border-primary-700">
              <span className="text-2xs font-bold uppercase tracking-wider text-primary-700 dark:text-primary-300">
                Optional Agent (by + Doer)
              </span>
              <p className="text-sm font-bold text-primary-950 dark:text-primary-100 mt-0.5">
                {selectedExample.passiveAgent}
              </p>
            </div>
          </div>
        </div>

        {/* Roman Hinglish Dynamic Rationale Callout */}
        <div className="p-3.5 rounded-xl bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-xs text-surface-800 dark:text-surface-200 leading-relaxed flex items-start gap-2.5">
          <Sparkles size={16} className="text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-surface-900 dark:text-white">Transformation Logic: </strong>
            {selectedExample.hinglishNote}
          </div>
        </div>
      </div>

      {/* Pronoun Transformation Sub-Table Toggle */}
      <div className="pt-2 border-t border-surface-200 dark:border-surface-700">
        <Button
          variant="outline"
          size="sm"
          icon={ArrowLeftRight}
          onClick={() => setShowPronounsTable((prev) => !prev)}
        >
          {showPronounsTable ? 'Pronoun Shift Matrix Chhupayein' : 'Pronoun Shift Matrix Dekhein (I ↔ me, he ↔ him)'}
        </Button>

        {showPronounsTable && (
          <div className="mt-4 overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-700">
            <table className="w-full text-xs text-left">
              <thead className="bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 font-semibold border-b border-surface-200 dark:border-surface-700">
                <tr>
                  <th className="py-2.5 px-3">Active Subject (Doer)</th>
                  <th className="py-2.5 px-3">Passive Agent (by + Obj)</th>
                  <th className="py-2.5 px-3">Active Object (Receiver)</th>
                  <th className="py-2.5 px-3">Passive Subject (New Sub)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-700/60 font-mono">
                {PRONOUN_PAIRS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface-50 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2 px-3 font-semibold text-primary-700 dark:text-primary-300">{row.activeSub}</td>
                    <td className="py-2 px-3 text-amber-700 dark:text-amber-300">{row.passiveAgent}</td>
                    <td className="py-2 px-3 text-success-700 dark:text-success-300">{row.activeObj}</td>
                    <td className="py-2 px-3 font-semibold text-indigo-700 dark:text-indigo-300">{row.passiveSub}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Card>
  )
}
