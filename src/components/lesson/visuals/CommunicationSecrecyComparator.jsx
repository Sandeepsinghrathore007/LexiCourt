import { useState } from 'react'
import { MessageSquare } from 'lucide-react'
import { Card, Badge } from '../../common'

const MODES = [
  {
    mode: 'Active Secret Disclosure',
    agentRole: 'Insider Whistleblower / Careless Speaker',
    idioms: ['Spill the beans', 'Let the cat out of the bag'],
    definition: 'Confidential ya secret information ko galti se ya samay se pehle doosron ke samne bol dena.',
    example: 'The clerk accidentally spilled the beans about the confidential inquiry panel.',
    intent: 'Accidental or indiscreet revelation of truth.'
  },
  {
    mode: 'Strict Confidentiality',
    agentRole: 'Official Authority / Custodian',
    idioms: ['Keep under wraps', 'Behind closed doors'],
    definition: 'Kisi ahem document ya plan ko janta ki nazar se chhipa kar gupt banaye rakhna.',
    example: 'The sealed cover judicial recommendations were kept strictly under wraps.',
    intent: 'Deliberate secrecy and administrative protection.'
  },
  {
    mode: 'Indirect Evasion',
    agentRole: 'Reluctant or Evasive Witness/Speaker',
    idioms: ['Beat around the bush'],
    definition: 'Mukhya mudde ko taal kar idhar-udhar ki aspasht baatein karna taaki seedha jawab na dena pade.',
    example: 'The witness beat around the bush instead of answering whether he received the payment.',
    intent: 'Delaying, obfuscating, and avoiding direct truth.'
  },
  {
    mode: 'Direct Candor & Blunt Truth',
    agentRole: 'Fearless Auditor / Presiding Judge',
    idioms: ['Get straight to the point', 'Call a spade a spade', 'Speak one\'s mind'],
    definition: 'Bina kisi laag-lapet ya bhumika ke seedhe sateek aur kadvay sach ko spasht kehna.',
    example: 'The senior judge always called a spade a spade regarding procedural corruption.',
    intent: 'Absolute transparency, honesty, and efficiency.'
  },
  {
    mode: 'Informal Rumors & Gossip',
    agentRole: 'Third-party Observer / Rumor Network',
    idioms: ['Hear it through the grapevine'],
    definition: 'Anaupcharik baatchit, unverified sources ya afwahon ke madhyam se khabar sunna.',
    example: 'We heard it through the grapevine that judicial transfers are scheduled next week.',
    intent: 'Passive reception of unverified informal information.'
  },
  {
    mode: 'Subtext Comprehension',
    agentRole: 'Analytical Lawyer / Astute Reader',
    idioms: ['Read between the lines'],
    definition: 'Written text ya bhashan ke ankahe ya chhipe huye arth ko samajhna.',
    example: 'If you read between the lines of the rejoinder, tacit admissions of delay are visible.',
    intent: 'Deducing latent implications from formal statements.'
  }
]

export default function CommunicationSecrecyComparator() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const current = MODES[selectedIdx]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Model 5</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Information Flow Architecture</span>
          </div>
          <h3 className="text-xl font-bold font-heading text-surface-900 dark:text-surface-50 flex items-center gap-2">
            <MessageSquare size={20} className="text-primary-600 dark:text-primary-400" />
            Communication, Disclosure & Secrecy Comparison Matrix
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300 mt-1 max-w-3xl leading-relaxed">
            Information domain ke idioms mein source (revealing insider vs passive listener) aur tone (direct candor vs evasive talk) sabse decisive criteria hote hain.
          </p>
        </div>
      </div>

      {/* Mode Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {MODES.map((m, idx) => {
          const isActive = idx === selectedIdx
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                isActive
                  ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/60 shadow-xs ring-1 ring-primary-500/30'
                  : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-850 hover:bg-surface-50'
              }`}
            >
              <span className={`text-[0.6875rem] font-bold leading-tight ${isActive ? 'text-primary-900 dark:text-primary-100' : 'text-surface-700 dark:text-surface-300'}`}>
                {m.mode}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active Mode Detailed Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700">
          <div>
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
              Communication Vector:
            </span>
            <h4 className="font-heading font-bold text-base sm:text-lg text-surface-900 dark:text-surface-50">
              {current.mode}
            </h4>
          </div>
          <Badge variant="primary" size="sm">
            Agent Role: {current.agentRole}
          </Badge>
        </div>

        {/* Idiom Tags */}
        <div className="space-y-1.5">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
            Applicable Established Idioms:
          </span>
          <div className="flex flex-wrap gap-2">
            {current.idioms.map((idm, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-xs font-bold text-primary-700 dark:text-primary-300 shadow-2xs"
              >
                {idm}
              </span>
            ))}
          </div>
        </div>

        {/* Definition & Intent */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1">
            <strong className="text-surface-900 dark:text-surface-100 block">Core Semantic Function:</strong>
            <p className="text-surface-600 dark:text-surface-300 leading-relaxed">{current.definition}</p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1">
            <strong className="text-surface-900 dark:text-surface-100 block">Communicative Intent:</strong>
            <p className="text-surface-600 dark:text-surface-300 leading-relaxed">{current.intent}</p>
          </div>
        </div>

        {/* Context Demonstration */}
        <div className="p-3 rounded-xl bg-primary-50/40 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800/40 text-xs text-surface-800 dark:text-surface-200 italic">
          <strong>Context Example:</strong> "{current.example}"
        </div>
      </div>
    </Card>
  )
}
