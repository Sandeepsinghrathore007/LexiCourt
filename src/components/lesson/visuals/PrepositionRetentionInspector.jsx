import { useState } from 'react'
import { XCircle, CheckCircle2 } from 'lucide-react'
import { Card, Badge } from '../../common'

const VERB_CASES = [
  {
    id: 'look-into',
    verb: 'look into',
    meaning: 'investigate / probe',
    activeSentence: 'The High Court committee looked into the scam.',
    correctPassive: 'The scam was looked into by the High Court committee.',
    incorrectPassive: 'The scam was looked by the High Court committee.',
    prep: 'into',
    whyIncorrect: '"Look into" ek single semantic unit hai jiska matlab investigate karna hota hai. "into" drop karne se "was looked" meaningless ho jata hai.',
    doublePrepNote: '"looked into by": "into" verb ka hissa hai aur "by" agent marker hai. Dono prepositions saath aana 100% valid hai.',
  },
  {
    id: 'laugh-at',
    verb: 'laugh at',
    meaning: 'mock / ridicule',
    activeSentence: 'The audience laughed at the counsel\'s funny blunder.',
    correctPassive: 'The counsel\'s funny blunder was laughed at by the audience.',
    incorrectPassive: 'The counsel\'s funny blunder was laughed by the audience.',
    prep: 'at',
    whyIncorrect: '"Laugh at" ridicule karna express karta hai. Preposition "at" hatane se sentence incomplete aur grammatically distorted ban jata hai.',
    doublePrepNote: '"laughed at by": Candidates aksar sochte hain do prepositions saath nahi aa sakti, lekin yahan "at by" perfectly correct hai.',
  },
  {
    id: 'deal-with',
    verb: 'deal with',
    meaning: 'handle / take action on',
    activeSentence: 'The administrative bench will deal with the service grievances.',
    correctPassive: 'The service grievances will be dealt with by the administrative bench.',
    incorrectPassive: 'The service grievances will be dealt by the administrative bench.',
    prep: 'with',
    whyIncorrect: '"Deal with" administrative action express karta hai. "with" drop karna passive sentence ko non-idiomatic aur incorrect banata hai.',
    doublePrepNote: '"dealt with by": "with" passive V3 participle ke theek baad chipki rahegi.',
  },
  {
    id: 'account-for',
    verb: 'account for',
    meaning: 'explain / give justification for',
    activeSentence: 'The clerk could not account for the missing cash.',
    correctPassive: 'The missing cash could not be accounted for by the clerk.',
    incorrectPassive: 'The missing cash could not be accounted by the clerk.',
    prep: 'for',
    whyIncorrect: '"Account for" justification demand karta hai. "for" ke bina "accounted" ka passive sense adhoora rehta hai.',
    doublePrepNote: '"accounted for by": Preposition retention rule har modal aur tense mein strictly apply hota hai.',
  },
  {
    id: 'listen-to',
    verb: 'listen to',
    meaning: 'pay attention / heed',
    activeSentence: 'The magistrate listened to the witness carefully.',
    correctPassive: 'The witness was listened to carefully by the magistrate.',
    incorrectPassive: 'The witness was listened carefully by the magistrate.',
    prep: 'to',
    whyIncorrect: 'Active mein "listened to" tha, isliye passive mein preposition "to" verb ke baad aana mandatory hai.',
    doublePrepNote: '"listened to ... by": Adverb beech mein aa sakta hai lekin preposition "to" omit nahi ho sakti.',
  },
]

export default function PrepositionRetentionInspector() {
  const [selectedCaseId, setSelectedCaseId] = useState('look-into')

  const currentCase = VERB_CASES.find((c) => c.id === selectedCaseId) || VERB_CASES[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-surface-200 dark:border-surface-700 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Model 3</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">
              Prepositional Verb Mechanics
            </span>
          </div>
          <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
            Fixed Preposition Retention Inspector
          </h3>
        </div>
        <Badge variant="error" size="sm" className="w-fit text-xs">
          Classic Exam Omission Trap
        </Badge>
      </div>

      <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed max-w-[85ch]">
        Jab kisi verb ke sath fixed preposition judti hai (jaise <code className="font-mono font-bold">look into</code>, <code className="font-mono font-bold">laugh at</code>), toh wo composite prepositional verb ban jati hai. Passive Voice mein preposition drop karna fatal blunder hai. Niche verb select karke correct vs incorrect comparison dekhein:
      </p>

      {/* Verb Switcher Pills */}
      <div className="flex flex-wrap gap-2">
        {VERB_CASES.map((item) => {
          const isSelected = item.id === selectedCaseId
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedCaseId(item.id)}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold font-mono transition-all cursor-pointer ${
                isSelected
                  ? 'bg-primary-600 text-white border-primary-700 shadow-xs'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 border-surface-200 dark:border-surface-700 hover:bg-surface-200/60'
              }`}
            >
              {item.verb} ({item.meaning})
            </button>
          )
        })}
      </div>

      {/* Comparison Display Canvas */}
      <div className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-5">
        {/* Active Input */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono uppercase font-bold text-surface-500 dark:text-surface-400">
            Active Voice Sentence (Verb: {currentCase.verb})
          </span>
          <div className="p-3 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-xs sm:text-sm font-semibold font-mono text-surface-900 dark:text-surface-100 shadow-xs">
            "{currentCase.activeSentence}"
          </div>
        </div>

        {/* Contrast Grid: Correct vs Incorrect */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Correct with Retained Preposition */}
          <div className="p-4 rounded-xl bg-success-50/40 dark:bg-success-950/20 border border-success-300 dark:border-success-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-success-800 dark:text-success-300">
                <CheckCircle2 size={16} />
                <span>CORRECT (Preposition Retained)</span>
              </span>
              <Badge variant="success" size="sm">✓ Valid</Badge>
            </div>
            <p className="text-xs font-mono font-bold text-success-950 dark:text-success-100 bg-white dark:bg-surface-900 p-2.5 rounded-lg border border-success-200 dark:border-success-900">
              "{currentCase.correctPassive}"
            </p>
            <p className="text-[11px] text-success-900 dark:text-success-200 leading-relaxed">
              {currentCase.doublePrepNote}
            </p>
          </div>

          {/* Incorrect with Dropped Preposition */}
          <div className="p-4 rounded-xl bg-error-50/40 dark:bg-error-950/20 border border-error-300 dark:border-error-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-error-800 dark:text-error-300">
                <XCircle size={16} />
                <span>INCORRECT (Preposition Dropped)</span>
              </span>
              <Badge variant="error" size="sm">✗ Fatal Error</Badge>
            </div>
            <p className="text-xs font-mono font-bold text-error-950 dark:text-error-100 bg-white dark:bg-surface-900 p-2.5 rounded-lg border border-error-200 dark:border-error-900 line-through">
              "{currentCase.incorrectPassive}"
            </p>
            <p className="text-[11px] text-error-900 dark:text-error-200 leading-relaxed">
              {currentCase.whyIncorrect}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
