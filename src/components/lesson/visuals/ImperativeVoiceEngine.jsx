import { useState } from 'react'
import { Sparkles, ShieldCheck, AlertTriangle } from 'lucide-react'
import { Card, Badge } from '../../common'

const IMPERATIVE_MODES = [
  {
    id: 'command',
    title: 'Command with Object',
    activeSentence: 'Shut the courtroom door immediately.',
    verb: 'Shut',
    object: 'the courtroom door',
    type: 'Direct Transitive Command',
    passiveSentence: 'Let the courtroom door be opened / shut immediately.',
    formula: 'Let + Object + be + V3',
    components: [
      { role: 'Prefix', val: 'Let', color: 'primary' },
      { role: 'New Subject', val: 'the courtroom door', color: 'blue' },
      { role: 'Passive Aux', val: 'be', color: 'amber' },
      { role: 'V3 Participle', val: 'shut', color: 'success' },
      { role: 'Complement', val: 'immediately', color: 'neutral' },
    ],
    explanation: 'Transitive imperative sentences mein direct command ke liye textbook pattern "Let + Object + be + V3" use hota hai. Subject "You" hidden rehta hai.',
    trapNote: 'Agar object pronoun ho toh objective case aayega: "Let him be called" (not "Let he be called").',
  },
  {
    id: 'request',
    title: 'Polite Request (Please / Kindly)',
    activeSentence: 'Please upload the certified affidavit on the portal.',
    verb: 'upload',
    object: 'the certified affidavit',
    type: 'Courteous Judicial Request',
    passiveSentence: 'You are requested to upload the certified affidavit on the portal.',
    formula: 'You are requested to + V1 + Object',
    components: [
      { role: 'Passive Intro', val: 'You are requested to', color: 'primary' },
      { role: 'Base Infinitive', val: 'upload', color: 'success' },
      { role: 'Object', val: 'the certified affidavit', color: 'blue' },
      { role: 'Complement', val: 'on the portal', color: 'neutral' },
    ],
    explanation: '"Please" ya "Kindly" aane par "Let" structure unnatural ho jata hai. Situational passive "You are requested to + V1" standard choice hai.',
    trapNote: '"You are requested to please upload..." likhna redundant blunder hai. "Please" passive mein drop ho jata hai.',
  },
  {
    id: 'negative',
    title: 'Negative Imperative (Do not)',
    activeSentence: 'Do not tamper with the digital case evidence.',
    verb: 'Do not tamper with',
    object: 'the digital case evidence',
    type: 'Negative Prohibition',
    passiveSentence: 'Let the digital case evidence not be tampered with.',
    formula: 'Let + Object + not + be + V3',
    components: [
      { role: 'Prefix', val: 'Let', color: 'primary' },
      { role: 'Object', val: 'the digital case evidence', color: 'blue' },
      { role: 'Negation', val: 'not', color: 'error' },
      { role: 'Passive Aux', val: 'be', color: 'amber' },
      { role: 'V3 + Prep', val: 'tampered with', color: 'success' },
    ],
    explanation: 'Negative imperatives mein "not" hamesha helping verb "be" se theek pehle aayega. Preposition "with" bhi retain rahegi.',
    trapNote: '"Let the evidence be not tampered" galat word order hai. "not be" strict formula hai.',
  },
  {
    id: 'advice',
    title: 'Advice & Moral Duty',
    activeSentence: 'Help the destitute litigants with free legal aid.',
    verb: 'Help',
    object: 'the destitute litigants',
    type: 'Social / Moral Welfare Duty',
    passiveSentence: 'The destitute litigants should be helped with free legal aid.',
    formula: 'Object + should be + V3',
    components: [
      { role: 'New Subject', val: 'The destitute litigants', color: 'blue' },
      { role: 'Modal Aux', val: 'should be', color: 'amber' },
      { role: 'V3 Participle', val: 'helped', color: 'success' },
      { role: 'Complement', val: 'with free legal aid', color: 'neutral' },
    ],
    explanation: 'Moral duties aur compassion wale sentences mein "Let" cold aur mechanical lagta hai. "should be + V3" contextually sabse natural hota hai.',
    trapNote: '"Respect your elders" ko "You are ordered to respect your elders" banana examination option trap hai.',
  },
  {
    id: 'intransitive',
    title: 'Intransitive Order (No Object)',
    activeSentence: 'Leave the courtroom immediately.',
    verb: 'Leave',
    object: 'None (Intransitive Command)',
    type: 'Coercive Judicial Order',
    passiveSentence: 'You are ordered to leave the courtroom immediately.',
    formula: 'You are ordered to + V1',
    components: [
      { role: 'Passive Intro', val: 'You are ordered to', color: 'primary' },
      { role: 'Base Verb', val: 'leave', color: 'success' },
      { role: 'Complement', val: 'the courtroom immediately', color: 'neutral' },
    ],
    explanation: 'Jab verb ke baad direct object na ho toh "Let" fail ho jata hai. Wahan speaker ki authority ke according "You are ordered to + V1" lagta hai.',
    trapNote: '"Let the courtroom be left" pseudo-passive blunder hai. Intransitive commands strictly situational passive demand karte hain.',
  },
]

export default function ImperativeVoiceEngine() {
  const [selectedId, setSelectedId] = useState('command')

  const currentMode = IMPERATIVE_MODES.find((m) => m.id === selectedId) || IMPERATIVE_MODES[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-surface-200 dark:border-surface-700 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Model 1</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">
              Communicative Function Architecture
            </span>
          </div>
          <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
            Interactive Imperative Voice Transformation Engine
          </h3>
        </div>
        <Badge variant="neutral" className="w-fit text-xs">
          Formula Routing by Sentence Tone
        </Badge>
      </div>

      <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed max-w-[85ch]">
        Imperative sentences ka koi overt subject nahi hota ("You" understood hota hai). Niche diye gaye 5 categories mein se kisi par click karke dekhein ki sentence ki tone aur transitivity ke hisaab se passive formula kaise change hota hai:
      </p>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {IMPERATIVE_MODES.map((mode) => {
          const isSelected = mode.id === selectedId
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => setSelectedId(mode.id)}
              className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-primary-50 dark:bg-primary-950/40 border-primary-500 text-primary-700 dark:text-primary-300 shadow-xs ring-1 ring-primary-400'
                  : 'bg-surface-50 dark:bg-surface-800/60 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:border-surface-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase text-surface-400">
                  {mode.id}
                </span>
                {isSelected && <Sparkles size={13} className="text-primary-600 dark:text-primary-400" />}
              </div>
              <div className="font-bold truncate">{mode.title}</div>
            </button>
          )
        })}
      </div>

      {/* Main Transformation Flow Canvas */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-5">
        {/* Active Stage */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase font-bold text-surface-500 dark:text-surface-400">
              Active Voice Input ({currentMode.type})
            </span>
            <Badge variant="primary" size="sm">Active</Badge>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-sm md:text-base font-semibold text-surface-900 dark:text-surface-100 font-mono shadow-xs">
            "{currentMode.activeSentence}"
          </div>
        </div>

        {/* Transition Connector */}
        <div className="flex items-center justify-center gap-3 text-xs font-semibold text-primary-600 dark:text-primary-400">
          <div className="h-px bg-surface-300 dark:bg-surface-700 flex-1" />
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-950/70 border border-primary-300 dark:border-primary-700 text-[11px]">
            <span>Applied Rule:</span>
            <code className="font-mono font-bold">{currentMode.formula}</code>
          </div>
          <div className="h-px bg-surface-300 dark:bg-surface-700 flex-1" />
        </div>

        {/* Passive Deconstruction */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase font-bold text-success-700 dark:text-success-400">
              Passive Output Synthesis
            </span>
            <Badge variant="success" size="sm">Passive Voice</Badge>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-surface-900 border border-success-300 dark:border-success-800 text-sm md:text-base font-bold text-success-900 dark:text-success-100 font-mono shadow-xs">
            "{currentMode.passiveSentence}"
          </div>

          {/* Component Pills Breakdown */}
          <div className="pt-2">
            <div className="text-[11px] font-semibold text-surface-500 dark:text-surface-400 mb-2">
              Syntactic Building Blocks:
            </div>
            <div className="flex flex-wrap gap-2">
              {currentMode.components.map((c, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-xs flex flex-col items-center"
                >
                  <span className="text-[9px] uppercase font-mono text-surface-400">{c.role}</span>
                  <span className="font-bold text-surface-800 dark:text-surface-100">{c.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Explanation & Trap Warning Callout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-blue-800 dark:text-blue-300">
            <ShieldCheck size={16} />
            <span>Grammar & Rationale</span>
          </div>
          <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
            {currentMode.explanation}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
            <AlertTriangle size={16} />
            <span>Exam Distractor Trap</span>
          </div>
          <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
            {currentMode.trapNote}
          </p>
        </div>
      </div>
    </Card>
  )
}
