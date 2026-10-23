import { useState } from 'react'
import { Info, Filter } from 'lucide-react'
import { Card, Badge } from '../../common'

const PRONOUN_DATA = [
  // 1st Person Singular
  { original: 'I (Subject)', person: '1st Person', case: 'Subjective', type: 'speaker' },
  { original: 'me (Object)', person: '1st Person', case: 'Objective', type: 'speaker' },
  { original: 'my (Possessive Adj)', person: '1st Person', case: 'Possessive Adj', type: 'speaker' },
  { original: 'mine (Possessive Pronoun)', person: '1st Person', case: 'Possessive Pronoun', type: 'speaker' },
  // 1st Person Plural
  { original: 'we (Subject)', person: '1st Person Plural', case: 'Subjective', type: 'speaker' },
  { original: 'us (Object)', person: '1st Person Plural', case: 'Objective', type: 'speaker' },
  { original: 'our (Possessive Adj)', person: '1st Person Plural', case: 'Possessive Adj', type: 'speaker' },
  // 2nd Person
  { original: 'you (Subject)', person: '2nd Person', case: 'Subjective', type: 'listener' },
  { original: 'you (Object)', person: '2nd Person', case: 'Objective', type: 'listener' },
  { original: 'your (Possessive Adj)', person: '2nd Person', case: 'Possessive Adj', type: 'listener' },
  // 3rd Person (Invariant)
  { original: 'he / him / his', person: '3rd Person Male', case: 'All Cases', type: 'invariant' },
  { original: 'she / her / hers', person: '3rd Person Female', case: 'All Cases', type: 'invariant' },
  { original: 'it / its', person: '3rd Person Neuter', case: 'All Cases', type: 'invariant' },
  { original: 'they / them / their', person: '3rd Person Plural', case: 'All Cases', type: 'invariant' },
]

export default function PronounMappingMatrix() {
  const [speakerConfig, setSpeakerConfig] = useState('male-sg') // 'male-sg' | 'female-sg' | 'plural' | 'first-person'
  const [listenerConfig, setListenerConfig] = useState('first-person') // 'first-person' | 'male-sg' | 'female-sg' | 'plural'

  // Resolver for pronoun shifts based on current speaker/listener state
  const resolveShift = (item) => {
    if (item.type === 'invariant') {
      return { result: item.original + ' (No Change)', note: '3rd person stays 3rd person' }
    }

    if (item.type === 'speaker') {
      if (item.original.startsWith('I')) {
        if (speakerConfig === 'male-sg') return { result: 'he', note: 'Matches male speaker' }
        if (speakerConfig === 'female-sg') return { result: 'she', note: 'Matches female speaker' }
        if (speakerConfig === 'plural') return { result: 'they', note: 'Group speaker' }
        return { result: 'I', note: 'Narrator speaking' }
      }
      if (item.original.startsWith('me')) {
        if (speakerConfig === 'male-sg') return { result: 'him', note: 'Objective male' }
        if (speakerConfig === 'female-sg') return { result: 'her', note: 'Objective female' }
        if (speakerConfig === 'plural') return { result: 'them', note: 'Objective group' }
        return { result: 'me', note: 'Narrator object' }
      }
      if (item.original.startsWith('my')) {
        if (speakerConfig === 'male-sg') return { result: 'his', note: 'Possessive male' }
        if (speakerConfig === 'female-sg') return { result: 'her', note: 'Possessive female' }
        if (speakerConfig === 'plural') return { result: 'their', note: 'Possessive group' }
        return { result: 'my', note: 'Narrator possessive' }
      }
      if (item.original.startsWith('mine')) {
        if (speakerConfig === 'male-sg') return { result: 'his', note: 'Possessive pronoun' }
        if (speakerConfig === 'female-sg') return { result: 'hers', note: 'Possessive pronoun' }
        return { result: 'theirs', note: 'Plural possessive' }
      }
      if (item.original.startsWith('we')) {
        if (speakerConfig === 'first-person') return { result: 'we', note: 'Includes narrator' }
        return { result: 'they', note: 'External group speaking' }
      }
      if (item.original.startsWith('us')) {
        if (speakerConfig === 'first-person') return { result: 'us', note: 'Includes narrator' }
        return { result: 'them', note: 'External group object' }
      }
      if (item.original.startsWith('our')) {
        if (speakerConfig === 'first-person') return { result: 'our', note: 'Includes narrator' }
        return { result: 'their', note: 'External group possessive' }
      }
    }

    if (item.type === 'listener') {
      if (item.original.startsWith('you (Subject)')) {
        if (listenerConfig === 'first-person') return { result: 'I', note: 'Spoken to narrator' }
        if (listenerConfig === 'male-sg') return { result: 'he', note: 'Spoken to a man' }
        if (listenerConfig === 'female-sg') return { result: 'she', note: 'Spoken to a woman' }
        return { result: 'they', note: 'Spoken to a group' }
      }
      if (item.original.startsWith('you (Object)')) {
        if (listenerConfig === 'first-person') return { result: 'me', note: 'Listener is me' }
        if (listenerConfig === 'male-sg') return { result: 'him', note: 'Listener is him' }
        if (listenerConfig === 'female-sg') return { result: 'her', note: 'Listener is her' }
        return { result: 'them', note: 'Listener is them' }
      }
      if (item.original.startsWith('your')) {
        if (listenerConfig === 'first-person') return { result: 'my', note: 'Possessive of me' }
        if (listenerConfig === 'male-sg') return { result: 'his', note: 'Possessive of him' }
        if (listenerConfig === 'female-sg') return { result: 'her', note: 'Possessive of her' }
        return { result: 'their', note: 'Possessive of them' }
      }
    }

    return { result: item.original, note: 'Standard' }
  }

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-200 dark:border-surface-700 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Visual Architecture • Model 3</Badge>
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-300">
              Interactive Pronoun Shifter
            </span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-white mt-1">
            Pronoun Reference Shift Matrix
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            Speaker aur listener ko select karke live dekhein ki quotation ke andar ka har pronoun kis form mein shift hota hai.
          </p>
        </div>
      </div>

      {/* Interactive Selectors Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-surface-50 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700">
        {/* Speaker Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-surface-800 dark:text-surface-200 flex items-center gap-1.5">
            <Filter size={14} className="text-primary-600 dark:text-primary-400" />
            <span>Select Reporting Speaker (Subject):</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: 'male-sg', label: 'Male (Amit / He)' },
              { id: 'female-sg', label: 'Female (Riya / She)' },
              { id: 'plural', label: 'Group (They / Clerks)' },
              { id: 'first-person', label: 'Narrator (I / Myself)' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSpeakerConfig(opt.id)}
                className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-left ${
                  speakerConfig === opt.id
                    ? 'bg-primary-600 text-white shadow-xs'
                    : 'bg-white dark:bg-surface-900 text-surface-700 dark:text-surface-300 border border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-800'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Listener Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-surface-800 dark:text-surface-200 flex items-center gap-1.5">
            <Filter size={14} className="text-amber-600 dark:text-amber-400" />
            <span>Select Addressee / Listener (Object):</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: 'first-person', label: 'Narrator ("to me")' },
              { id: 'male-sg', label: 'Male ("to Rohit")' },
              { id: 'female-sg', label: 'Female ("to Pooja")' },
              { id: 'plural', label: 'Group ("to staff")' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setListenerConfig(opt.id)}
                className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-left ${
                  listenerConfig === opt.id
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white dark:bg-surface-900 text-surface-700 dark:text-surface-300 border border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-800'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Shifting Matrix Table */}
      <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-700">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-100 dark:bg-surface-800/90 text-surface-700 dark:text-surface-300 uppercase text-[0.6875rem] font-bold border-b border-surface-200 dark:border-surface-700">
            <tr>
              <th className="py-2.5 px-3">Quoted Pronoun</th>
              <th className="py-2.5 px-3">Person & Case</th>
              <th className="py-2.5 px-3">Governing Source</th>
              <th className="py-2.5 px-3">Result in Indirect Speech</th>
              <th className="py-2.5 px-3">Grammar Rationale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-200 dark:divide-surface-700 bg-white dark:bg-surface-900">
            {PRONOUN_DATA.map((item, idx) => {
              const { result, note } = resolveShift(item)
              return (
                <tr
                  key={idx}
                  className="hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors"
                >
                  <td className="py-2.5 px-3 font-mono font-bold text-surface-900 dark:text-surface-100">
                    {item.original}
                  </td>
                  <td className="py-2.5 px-3 text-surface-600 dark:text-surface-400">
                    <span className="px-2 py-0.5 rounded bg-surface-100 dark:bg-surface-800 text-[0.6875rem] font-medium">
                      {item.person} • {item.case}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[0.6875rem] font-bold ${
                        item.type === 'speaker'
                          ? 'bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300'
                          : item.type === 'listener'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                          : 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                      }`}
                    >
                      {item.type === 'speaker'
                        ? 'Subject (Speaker)'
                        : item.type === 'listener'
                        ? 'Object (Listener)'
                        : 'Invariant (External)'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-mono font-extrabold text-success-700 dark:text-success-400 bg-success-50 dark:bg-success-950/60 px-2 py-0.5 rounded border border-success-200 dark:border-success-800">
                      {result}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-surface-500 dark:text-surface-400 text-[0.6875rem] italic">
                    {note}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 text-xs text-surface-600 dark:text-surface-400 bg-surface-50 dark:bg-surface-800/60 p-3 rounded-xl border border-surface-200 dark:border-surface-700">
        <Info size={16} className="text-primary-600 dark:text-primary-400 shrink-0" />
        <p className="leading-relaxed">
          <strong>Key Rule: </strong>Notice karein ki 3rd person pronouns (he, she, it, they) hamesha invariant rehte hain chahe speaker ya listener koi bhi ho. 1st person hamesha speaker ko follow karta hai, aur 2nd person listener ko.
        </p>
      </div>
    </Card>
  )
}
