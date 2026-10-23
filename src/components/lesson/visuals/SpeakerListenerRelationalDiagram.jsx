import { useState } from 'react'
import { User, Users, ArrowRight, ShieldCheck } from 'lucide-react'
import { Card, Badge } from '../../common'

const PRESETS = [
  {
    id: 'preset-1',
    label: 'Rohan ➔ Priya',
    speaker: { name: 'Rohan', role: 'Speaker (Subject)', gender: 'Male Singular', pronoun: 'he' },
    reportingVerb: 'said to ➔ told',
    listener: { name: 'Priya', role: 'Listener (Object)', gender: 'Female Singular', pronoun: 'she' },
    directQuote: '"I respect your legal analysis, and he agrees with us."',
    mapping: [
      { quoted: '"I" (1st Person)', target: 'Rohan (Speaker)', becomes: '"he"', logic: 'Speaker male hai, isliye "I" ➔ "he"' },
      { quoted: '"your" (2nd Person)', target: 'Priya (Listener)', becomes: '"her"', logic: 'Listener female hai, isliye "your" ➔ "her"' },
      { quoted: '"he" (3rd Person)', target: 'Third Person', becomes: '"he" (No Change)', logic: '3rd person external entity hai, invariant rehta hai' },
      { quoted: '"us" (1st Person Plural)', target: 'Rohan + others', becomes: '"them"', logic: 'Speaker group ko represent kar raha hai ➔ "them"' },
    ],
    indirectSentence: 'Rohan told Priya that he respected her legal analysis, and he agreed with them.',
  },
  {
    id: 'preset-2',
    label: 'Meera ➔ Me (Listener)',
    speaker: { name: 'Meera', role: 'Speaker (Subject)', gender: 'Female Singular', pronoun: 'she' },
    reportingVerb: 'said to me ➔ told me',
    listener: { name: 'Me (Narrator)', role: 'Listener (Object)', gender: '1st Person Singular', pronoun: 'I / me' },
    directQuote: '"I will assist you in your court filing."',
    mapping: [
      { quoted: '"I" (1st Person)', target: 'Meera (Speaker)', becomes: '"she"', logic: 'Speaker Meera hai ➔ "she"' },
      { quoted: '"you" (2nd Person)', target: 'Me (Listener)', becomes: '"me" (object) / "I"', logic: 'Listener "me" hai, isliye "assist you" ➔ "assist me"' },
      { quoted: '"your" (2nd Person)', target: 'Me (Listener)', becomes: '"my"', logic: 'Listener "me" hai, isliye "your filing" ➔ "my filing"' },
    ],
    indirectSentence: 'Meera told me that she would assist me in my court filing.',
  },
  {
    id: 'preset-3',
    label: 'Advocates (Plural) ➔ Judge',
    speaker: { name: 'The Advocates', role: 'Speaker (Subject)', gender: 'Plural Group', pronoun: 'they' },
    reportingVerb: 'said to the judge ➔ told the judge',
    listener: { name: 'The Judge', role: 'Listener (Object)', gender: 'Singular Dignitary', pronoun: 'he / she' },
    directQuote: '"We have submitted our petition before you."',
    mapping: [
      { quoted: '"We" (1st Person Plural)', target: 'The Advocates (Speaker)', becomes: '"they"', logic: 'Plural speaker group hai ➔ "they"' },
      { quoted: '"our" (1st Person Plural)', target: 'The Advocates (Speaker)', becomes: '"their"', logic: 'Plural speaker possessive ➔ "their"' },
      { quoted: '"you" (2nd Person)', target: 'The Judge (Listener)', becomes: '"him" / "her"', logic: 'Listener the judge hai ➔ "before him/her"' },
    ],
    indirectSentence: 'The advocates told the judge that they had submitted their petition before him/her.',
  },
  {
    id: 'preset-4',
    label: 'Third Person Invariance',
    speaker: { name: 'Vikram', role: 'Speaker (Subject)', gender: 'Male Singular', pronoun: 'he' },
    reportingVerb: 'said ➔ said that',
    listener: { name: 'General Audience', role: 'Unspecified', gender: 'None', pronoun: 'N/A' },
    directQuote: '"She had already drafted their joint affidavit."',
    mapping: [
      { quoted: '"She" (3rd Person)', target: 'External Person', becomes: '"she" (No Change)', logic: '3rd person external entity hai, invariant rehta hai' },
      { quoted: '"their" (3rd Person Plural)', target: 'External Group', becomes: '"their" (No Change)', logic: '3rd person possessive unchanged rehta hai' },
    ],
    indirectSentence: 'Vikram said that she had already drafted their joint affidavit.',
  },
]

export default function SpeakerListenerRelationalDiagram() {
  const [activePresetId, setActivePresetId] = useState('preset-1')
  const currentPreset = PRESETS.find((p) => p.id === activePresetId) || PRESETS[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-200 dark:border-surface-700 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Visual Architecture • Model 2</Badge>
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-300">
              Relational Referent Architecture
            </span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-white mt-1">
            Speaker & Listener Relational Mapping Diagram
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            Pronouns mechanically nahi badalte—wo speaker aur listener ki real-world identity se track hote hain.
          </p>
        </div>

        {/* Preset Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePresetId(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                p.id === activePresetId
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs border border-surface-200 dark:border-surface-700'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Spatial Relationship Model Canvas */}
      <div className="p-6 rounded-2xl bg-surface-50 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 space-y-6">
        {/* Top Node Bar: Speaker ➔ Verb ➔ Listener */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Speaker Node */}
          <div className="p-4 rounded-xl bg-primary-100/70 dark:bg-primary-950/70 border-2 border-primary-300 dark:border-primary-700 text-center space-y-1 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-primary-600 text-white mx-auto flex items-center justify-center">
              <User size={20} />
            </div>
            <div className="text-[0.6875rem] font-bold uppercase tracking-wider text-primary-700 dark:text-primary-300">
              {currentPreset.speaker.role}
            </div>
            <div className="text-base font-extrabold text-surface-900 dark:text-white">
              {currentPreset.speaker.name}
            </div>
            <span className="text-[0.625rem] text-primary-800 dark:text-primary-300 font-mono">
              {currentPreset.speaker.gender} • {currentPreset.speaker.pronoun}
            </span>
          </div>

          {/* Verb Connector Bridge */}
          <div className="p-3 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-center space-y-1">
            <span className="text-[0.625rem] font-bold uppercase text-surface-500 dark:text-surface-400">
              Reporting Verb Bridge
            </span>
            <div className="font-mono text-xs font-bold text-primary-700 dark:text-primary-300">
              {currentPreset.reportingVerb}
            </div>
            <div className="flex items-center justify-center gap-1 text-surface-400">
              <ArrowRight size={16} />
            </div>
          </div>

          {/* Listener Node */}
          <div className="p-4 rounded-xl bg-amber-100/70 dark:bg-amber-950/70 border-2 border-amber-300 dark:border-amber-700 text-center space-y-1 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-amber-600 text-white mx-auto flex items-center justify-center">
              <Users size={20} />
            </div>
            <div className="text-[0.6875rem] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              {currentPreset.listener.role}
            </div>
            <div className="text-base font-extrabold text-surface-900 dark:text-white">
              {currentPreset.listener.name}
            </div>
            <span className="text-[0.625rem] text-amber-800 dark:text-amber-300 font-mono">
              {currentPreset.listener.gender} • {currentPreset.listener.pronoun}
            </span>
          </div>
        </div>

        {/* Quoted Sentence Visual Anchor */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-surface-900 border border-primary-200 dark:border-primary-800 text-center space-y-1">
          <span className="text-[0.625rem] uppercase font-bold text-surface-500 dark:text-surface-400">
            Original Direct Quoted Statement
          </span>
          <p className="font-mono text-sm font-bold text-surface-900 dark:text-surface-100">
            {currentPreset.directQuote}
          </p>
        </div>

        {/* Relational Shift Mappings Table */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-surface-600 dark:text-surface-300 block">
            Syntactic Referent Alignments:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentPreset.mapping.map((m, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1 shadow-xs"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-surface-900 dark:text-surface-100 bg-surface-100 dark:bg-surface-800 px-2 py-0.5 rounded">
                    {m.quoted}
                  </span>
                  <span className="text-surface-400 font-bold">➔</span>
                  <span className="font-mono font-extrabold text-success-700 dark:text-success-400 bg-success-50 dark:bg-success-950/60 px-2 py-0.5 rounded border border-success-200 dark:border-success-800">
                    {m.becomes}
                  </span>
                </div>
                <div className="text-[0.6875rem] text-surface-600 dark:text-surface-400 pt-1">
                  <strong>Referent: </strong>{m.target}
                </div>
                <p className="text-[0.625rem] text-surface-500 dark:text-surface-400 italic">
                  {m.logic}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Output Synthesis Banner */}
        <div className="p-3.5 rounded-xl bg-success-50 dark:bg-success-950/40 border border-success-200 dark:border-success-800 flex items-start gap-2.5">
          <ShieldCheck size={18} className="text-success-600 dark:text-success-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <span className="font-bold text-success-900 dark:text-success-200 uppercase text-[0.625rem] tracking-wider block">
              Resulting Indirect Sentence Synthesis:
            </span>
            <p className="font-mono font-semibold text-success-950 dark:text-success-100">
              {currentPreset.indirectSentence}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
