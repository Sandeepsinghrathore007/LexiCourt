import { useState } from 'react'
import { Split, User, Sparkles, MapPin, PlayCircle } from 'lucide-react'
import { Card, Badge } from '../../common'

const COMPARISON_MODELS = [
  {
    theme: 'Attitude & Outlook',
    root: 'Optim-',
    person: { word: 'Optimist', type: 'Agent Noun', meaning: 'The person who expects favourable outcomes', cue: 'A person who...' },
    quality: { word: 'Optimism', type: 'Abstract Noun', meaning: 'The state or philosophical attitude of looking on the bright side', cue: 'The state or feeling of...' },
    descriptor: { word: 'Optimistic', type: 'Adjective', meaning: 'Characterized by hope and confident expectation', cue: 'Having or showing...' },
    action: { word: 'Look favourably', type: 'Verb Phrase', meaning: 'To view situations with positive confidence', cue: 'To anticipate with hope...' }
  },
  {
    theme: 'Religious Community',
    root: 'Monast-',
    person: { word: 'Monk / Nun', type: 'Agent Noun', meaning: 'The individual living under religious vows in seclusion', cue: 'A member of a religious order...' },
    quality: { word: 'Monasticism', type: 'Abstract Noun', meaning: 'The religious way of life characterized by ascetic renunciation', cue: 'The system, habit, or life of...' },
    descriptor: { word: 'Monastic', type: 'Adjective', meaning: 'Pertaining to monks, nuns, or religious seclusion', cue: 'Relating to monks...' },
    action: { word: 'Monastery / Convent', type: 'Place Noun', meaning: 'The physical building or community where monks/nuns reside', cue: 'A building or residence where...' }
  },
  {
    theme: 'Dispute Settlement',
    root: 'Arbitr-',
    person: { word: 'Arbitrator', type: 'Agent Noun', meaning: 'The neutral adjudicator empowered to issue a binding ruling', cue: 'A person officially appointed to...' },
    quality: { word: 'Arbitration', type: 'Abstract Noun / Process', meaning: 'The legal process of settling a dispute out of court by an arbitrator', cue: 'The formal hearing or process of...' },
    descriptor: { word: 'Arbitral', type: 'Adjective', meaning: 'Relating to arbitration or the arbitrator\'s award', cue: 'Relating to an arbitrator...' },
    action: { word: 'Arbitrate', type: 'Verb', meaning: 'To hear and settle a dispute as an arbitrator', cue: 'To act as an arbitrator / to settle...' }
  },
  {
    theme: 'Authoritarian Power',
    root: 'Autocr-',
    person: { word: 'Autocrat', type: 'Agent Noun', meaning: 'The ruler who holds absolute, unchecked political power', cue: 'A ruler who has absolute power...' },
    quality: { word: 'Autocracy', type: 'Abstract Noun / System', meaning: 'The system of government where power is concentrated in one person', cue: 'A system of government ruled by...' },
    descriptor: { word: 'Autocratic', type: 'Adjective', meaning: 'Characterized by dictatorial or arbitrary rule', cue: 'Relating to an autocrat...' },
    action: { word: 'Dominate arbitrarily', type: 'Verb Phrase', meaning: 'To govern without constitutional limits', cue: 'To rule with unchecked power...' }
  }
]

export default function ConceptDimensionComparator() {
  const [activeModelIndex, setActiveModelIndex] = useState(0)
  const current = COMPARISON_MODELS[activeModelIndex]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-200 dark:border-surface-700/80 pb-3">
        <div className="flex items-center gap-2">
          <Split size={18} className="text-primary-600 dark:text-primary-400" />
          <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
            Concept Dimension Comparator: Person vs State vs Place vs Process
          </h3>
        </div>
        <Badge variant="neutral" size="sm">Grammar Role Concord</Badge>
      </div>

      <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed">
        Examiners ka favorite trap hota hai ek hi concept ke 4 different grammatical roles ko options mein daalna. Definition ka opening stem check karein taaki sahi category lock ho sake:
      </p>

      {/* Model Switcher Tabs */}
      <div className="flex flex-wrap gap-2">
        {COMPARISON_MODELS.map((model, idx) => (
          <button
            key={model.theme}
            type="button"
            onClick={() => setActiveModelIndex(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeModelIndex === idx
                ? 'bg-primary-600 text-white shadow-xs'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200'
            }`}
          >
            {model.theme} (Root: {model.root})
          </button>
        ))}
      </div>

      {/* 4-Column Dimensional Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Person / Agent */}
        <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-800/80 bg-blue-50/20 dark:bg-blue-950/20 space-y-2">
          <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-300 font-bold text-xs">
            <User size={15} />
            <span>Dimension 1: The Human Agent</span>
          </div>
          <p className="font-heading font-extrabold text-base text-surface-900 dark:text-surface-50">
            {current.person.word}
          </p>
          <span className="text-[0.625rem] font-mono uppercase bg-blue-100 dark:bg-blue-900/60 px-1.5 py-0.5 rounded text-blue-800 dark:text-blue-200">
            {current.person.type}
          </span>
          <p className="text-xs text-surface-600 dark:text-surface-300 leading-snug">
            {current.person.meaning}
          </p>
          <div className="pt-2 border-t border-blue-100 dark:border-blue-900 text-[0.6875rem] text-blue-900 dark:text-blue-200 font-medium">
            Question Stem: <span className="font-bold underline">{current.person.cue}</span>
          </div>
        </div>

        {/* Quality / System / Abstract */}
        <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-800/80 bg-purple-50/20 dark:bg-purple-950/20 space-y-2">
          <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-300 font-bold text-xs">
            <Sparkles size={15} />
            <span>Dimension 2: The State / System</span>
          </div>
          <p className="font-heading font-extrabold text-base text-surface-900 dark:text-surface-50">
            {current.quality.word}
          </p>
          <span className="text-[0.625rem] font-mono uppercase bg-purple-100 dark:bg-purple-900/60 px-1.5 py-0.5 rounded text-purple-800 dark:text-purple-200">
            {current.quality.type}
          </span>
          <p className="text-xs text-surface-600 dark:text-surface-300 leading-snug">
            {current.quality.meaning}
          </p>
          <div className="pt-2 border-t border-purple-100 dark:border-purple-900 text-[0.6875rem] text-purple-900 dark:text-purple-200 font-medium">
            Question Stem: <span className="font-bold underline">{current.quality.cue}</span>
          </div>
        </div>

        {/* Descriptor / Adjective */}
        <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-800/80 bg-amber-50/20 dark:bg-amber-950/20 space-y-2">
          <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-bold text-xs">
            <MapPin size={15} />
            <span>Dimension 3: The Descriptor</span>
          </div>
          <p className="font-heading font-extrabold text-base text-surface-900 dark:text-surface-50">
            {current.descriptor.word}
          </p>
          <span className="text-[0.625rem] font-mono uppercase bg-amber-100 dark:bg-amber-900/60 px-1.5 py-0.5 rounded text-amber-800 dark:text-amber-200">
            {current.descriptor.type}
          </span>
          <p className="text-xs text-surface-600 dark:text-surface-300 leading-snug">
            {current.descriptor.meaning}
          </p>
          <div className="pt-2 border-t border-amber-100 dark:border-amber-900 text-[0.6875rem] text-amber-900 dark:text-amber-200 font-medium">
            Question Stem: <span className="font-bold underline">{current.descriptor.cue}</span>
          </div>
        </div>

        {/* Place / Action Process */}
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-2">
          <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
            <PlayCircle size={15} />
            <span>Dimension 4: Place or Action</span>
          </div>
          <p className="font-heading font-extrabold text-base text-surface-900 dark:text-surface-50">
            {current.action.word}
          </p>
          <span className="text-[0.625rem] font-mono uppercase bg-emerald-100 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded text-emerald-800 dark:text-emerald-200">
            {current.action.type}
          </span>
          <p className="text-xs text-surface-600 dark:text-surface-300 leading-snug">
            {current.action.meaning}
          </p>
          <div className="pt-2 border-t border-emerald-100 dark:border-emerald-900 text-[0.6875rem] text-emerald-900 dark:text-emerald-200 font-medium">
            Question Stem: <span className="font-bold underline">{current.action.cue}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
