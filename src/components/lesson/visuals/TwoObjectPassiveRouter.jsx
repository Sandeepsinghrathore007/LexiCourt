import { useState } from 'react'
import { Card, Badge } from '../../common'

const TWO_OBJECT_SAMPLES = [
  {
    id: 'give',
    verb: 'give',
    activeSentence: 'The registry gave the petitioner an acknowledgment slip.',
    subject: 'The registry',
    verbWord: 'gave',
    io: 'the petitioner',
    do: 'an acknowledgment slip',
    routeA: {
      promoted: 'the petitioner (Indirect Object / Person)',
      passive: 'The petitioner was given an acknowledgment slip by the registry.',
      formula: 'IO + was + given + DO + by-agent',
      naturalness: 'Highest Naturalness (Standard Exam Preference)',
      note: 'English mein person (receiver) ko passive subject banana zyada natural mana jata hai.',
    },
    routeB: {
      promoted: 'an acknowledgment slip (Direct Object / Thing)',
      passive: 'An acknowledgment slip was given TO the petitioner by the registry.',
      formula: 'DO + was + given + TO + IO + by-agent',
      naturalness: 'Valid with Preposition "TO"',
      note: 'Direct Object aage aane par person ke aage preposition "TO" lagana compulsory hai.',
      trap: '"An acknowledgment slip was given the petitioner" bina "to" ke fatal error hai.',
    },
  },
  {
    id: 'grant',
    verb: 'grant',
    activeSentence: 'The division bench granted the applicant interim relief.',
    subject: 'The division bench',
    verbWord: 'granted',
    io: 'the applicant',
    do: 'interim relief',
    routeA: {
      promoted: 'the applicant (Indirect Object / Person)',
      passive: 'The applicant was granted interim relief by the division bench.',
      formula: 'IO + was + granted + DO + by-agent',
      naturalness: 'High Court Standard Form',
      note: 'Legal judgments mein petitioner/applicant ko subject banakar orders pass hote hain.',
    },
    routeB: {
      promoted: 'interim relief (Direct Object / Thing)',
      passive: 'Interim relief was granted TO the applicant by the division bench.',
      formula: 'DO + was + granted + TO + IO + by-agent',
      naturalness: 'Alternative Form with "TO"',
      note: 'Thing promote hone par preposition "TO" lagti hai.',
      trap: 'Bina "TO" ke sentence grammatically incomplete rehta hai.',
    },
  },
  {
    id: 'buy',
    verb: 'buy',
    activeSentence: 'The IT department bought the new assistant a laptop.',
    subject: 'The IT department',
    verbWord: 'bought',
    io: 'the new assistant',
    do: 'a laptop',
    routeA: {
      promoted: 'the new assistant (Person)',
      passive: 'The new assistant was bought a laptop by the IT department.',
      formula: 'IO + was + bought + DO',
      naturalness: 'Awkward / Unnatural',
      note: 'Verbs of buying/making mein person ko subject banana awkward hota hai (aisa lagta hai assistant ko khareeda gaya).',
    },
    routeB: {
      promoted: 'a laptop (Thing)',
      passive: 'A laptop was bought FOR the new assistant by the IT department.',
      formula: 'DO + was + bought + FOR + IO',
      naturalness: 'Highly Preferred Form with "FOR"',
      note: 'Buy, make, cook, build verbs ke sath Direct Object promote hokar "FOR" leta hai.',
      trap: '"bought to the assistant" galat hai; buy ke sath strictly "FOR" aayega.',
    },
  },
]

export default function TwoObjectPassiveRouter() {
  const [selectedSampleId, setSelectedSampleId] = useState('give')

  const currentSample = TWO_OBJECT_SAMPLES.find((s) => s.id === selectedSampleId) || TWO_OBJECT_SAMPLES[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-surface-200 dark:border-surface-700 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Model 4</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">
              Bi-Transitive Architecture
            </span>
          </div>
          <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
            Two-Object Passive Dual-Route Selector
          </h3>
        </div>
        <Badge variant="neutral" size="sm" className="w-fit text-xs">
          Direct vs Indirect Object Routes
        </Badge>
      </div>

      <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed max-w-[85ch]">
        Bi-transitive verbs mein do objects hote hain: Indirect Object (aam taur par person) aur Direct Object (aam taur par thing). Dono objects se do alag-alag valid passive constructions banti hain. Niche sample verb select karke dono pathways dekhein:
      </p>

      {/* Verb Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {TWO_OBJECT_SAMPLES.map((s) => {
          const isSelected = s.id === selectedSampleId
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedSampleId(s.id)}
              className={`px-4 py-1.5 rounded-xl border text-xs font-bold font-mono transition-all cursor-pointer ${
                isSelected
                  ? 'bg-primary-600 text-white border-primary-700 shadow-xs'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 border-surface-200 dark:border-surface-700 hover:bg-surface-200/60'
              }`}
            >
              Verb: "{s.verbWord}" ({s.activeSentence.split(' ')[0]}...)
            </button>
          )
        })}
      </div>

      {/* Active Decomposition Box */}
      <div className="p-4 rounded-xl bg-surface-100 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700 space-y-2 text-xs">
        <span className="text-[10px] font-mono uppercase font-bold text-surface-500">
          Active Sentence S-V-IO-DO Anatomy:
        </span>
        <div className="flex flex-wrap items-center gap-2 font-mono">
          <span className="px-2.5 py-1 rounded-md bg-white dark:bg-surface-900 border text-surface-700 dark:text-surface-300">
            Sub: <strong>{currentSample.subject}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-md bg-white dark:bg-surface-900 border text-primary-700 dark:text-primary-300 font-bold">
            Verb: {currentSample.verbWord}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200 font-bold">
            IO (Person): {currentSample.io}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 font-bold">
            DO (Thing): {currentSample.do}
          </span>
        </div>
      </div>

      {/* Two Routes Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Route A: Promoting IO */}
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-900 border border-blue-300 dark:border-blue-800 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <Badge variant="primary" size="sm">Route A: IO Promoted</Badge>
            <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">
              {currentSample.routeA.naturalness}
            </span>
          </div>

          <div className="text-xs font-mono font-bold text-surface-900 dark:text-surface-100 p-2.5 rounded-lg bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
            "{currentSample.routeA.passive}"
          </div>

          <div className="text-xs text-surface-600 dark:text-surface-300 space-y-1">
            <p className="font-semibold text-surface-800 dark:text-surface-200">
              Formula: <code className="font-mono text-primary-600 dark:text-primary-400">{currentSample.routeA.formula}</code>
            </p>
            <p className="leading-relaxed">{currentSample.routeA.note}</p>
          </div>
        </div>

        {/* Route B: Promoting DO */}
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-900 border border-amber-300 dark:border-amber-800 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <Badge variant="warning" size="sm">Route B: DO Promoted</Badge>
            <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
              {currentSample.routeB.naturalness}
            </span>
          </div>

          <div className="text-xs font-mono font-bold text-surface-900 dark:text-surface-100 p-2.5 rounded-lg bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
            "{currentSample.routeB.passive}"
          </div>

          <div className="text-xs text-surface-600 dark:text-surface-300 space-y-1">
            <p className="font-semibold text-surface-800 dark:text-surface-200">
              Formula: <code className="font-mono text-amber-600 dark:text-amber-400">{currentSample.routeB.formula}</code>
            </p>
            <p className="leading-relaxed">{currentSample.routeB.note}</p>
            {currentSample.routeB.trap && (
              <p className="text-[11px] text-error-700 dark:text-error-300 font-semibold pt-1">
                ⚠️ Trap: {currentSample.routeB.trap}
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
