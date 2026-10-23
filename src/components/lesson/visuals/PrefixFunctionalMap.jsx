import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Card, Badge } from '../../common'

const PREFIX_DOMAINS = [
  {
    id: 'negation',
    name: '1. Negation & Reversal',
    subtitle: 'Polarity Reversal, Pejoratives & Privation',
    badge: '10 Core Prefixes',
    description: 'Yeh prefixes base word ke meaning ko opposite, reverse, defective ya completely absent bana dete hain.',
    prefixes: [
      { prefix: 'un-', origin: 'Old English', meaning: 'Not / Action reversal', example: 'unhappy, unnecessary, undo', trap: 'Double n in unnecessary' },
      { prefix: 'in-', origin: 'Latin', meaning: 'Not / Lack of', example: 'inaccurate, incapable, infinite', trap: 'Invaluable = priceless (NOT worthless!)' },
      { prefix: 'im-', origin: 'Latin (assimilated)', meaning: 'Not (before b, m, p)', example: 'impossible, immature, immortal', trap: 'Double m in immature, immortal' },
      { prefix: 'il-', origin: 'Latin (assimilated)', meaning: 'Not (before l)', example: 'illegal, illiterate, illegible', trap: 'Double l in illegal, illegible' },
      { prefix: 'ir-', origin: 'Latin (assimilated)', meaning: 'Not (before r)', example: 'irregular, irresponsible, irrelevant', trap: 'Double r in irresponsible, irrelevant' },
      { prefix: 'dis-', origin: 'Latin', meaning: 'Apart / Reversal', example: 'disapprove, disqualify, dissatisfied', trap: 'Disinterested (impartial) vs Uninterested (bored)' },
      { prefix: 'non-', origin: 'Latin', meaning: 'Neutral non-belonging', example: 'non-bailable, non-resident', trap: 'Objective classification without moral tone' },
      { prefix: 'a- / an-', origin: 'Greek', meaning: 'Without / Lacking', example: 'amoral, atheist, anonymous', trap: 'Amoral (no moral sense) vs Immoral (evil conduct)' },
      { prefix: 'mis-', origin: 'Old English', meaning: 'Wrongly / Badly', example: 'misspell, misinterpret, mislead', trap: 'Double s in misspell, misstatement' },
      { prefix: 'mal-', origin: 'Latin', meaning: 'Bad / Defective', example: 'malpractice, malnutrition, malfunction', trap: 'Direct antonym of bene- (malefactor vs benefactor)' }
    ]
  },
  {
    id: 'degree',
    name: '2. Size, Degree & Quantity',
    subtitle: 'Magnitude, Scalar Intensity & Number',
    badge: '10 Scalar Prefixes',
    description: 'Yeh prefixes scale, size ya quantity ka magnitude define karte hain.',
    prefixes: [
      { prefix: 'hyper-', origin: 'Greek', meaning: 'Over / Excessive', example: 'hypertension, hypercritical, hyperbole', trap: 'Direct opposite of hypo-' },
      { prefix: 'hypo-', origin: 'Greek', meaning: 'Under / Deficient', example: 'hypotension, hypothesis, hypodermic', trap: 'Hypocrisy spelling with y and o' },
      { prefix: 'super-', origin: 'Latin', meaning: 'Above / Beyond', example: 'supervise, supersede, superfluous', trap: 'Supersede ends in -SEDE (never *-cede!)' },
      { prefix: 'sub-', origin: 'Latin', meaning: 'Under / Subordinate', example: 'subpoena, subordinate, submerge', trap: 'Subpoena spelling (s-u-b-p-o-e-n-a)' },
      { prefix: 'ultra-', origin: 'Latin', meaning: 'Beyond / Extreme', example: 'ultra vires, ultrasound, ultramodern', trap: 'Ultra vires = beyond legal power (two words)' },
      { prefix: 'omni-', origin: 'Latin', meaning: 'All / Everywhere', example: 'omniscient, omnipotent, omnipresent', trap: 'Omniscient (all-knowing) vs Omnipotent (all-powerful)' },
      { prefix: 'micro-', origin: 'Greek', meaning: 'Extremely small', example: 'microscope, microcosm, microfilm', trap: 'Direct contrast with macro-' },
      { prefix: 'macro-', origin: 'Greek', meaning: 'Large-scale / Broad', example: 'macroeconomics, macrostructure', trap: 'Macro vs Micro economic terminology' },
      { prefix: 'multi-', origin: 'Latin', meaning: 'Many / Several', example: 'multilateral, multifaceted, multilingual', trap: 'Latin multi- vs Greek poly-' },
      { prefix: 'poly-', origin: 'Greek', meaning: 'Many / Multiple', example: 'polyglot, polygon, polygamy', trap: 'Polyglot = person speaking many languages' }
    ]
  },
  {
    id: 'time',
    name: '3. Time & Sequence',
    subtitle: 'Temporal Anchoring, Order & Repetition',
    badge: '6 Temporal Prefixes',
    description: 'Yeh prefixes action ya event ki chronological placement batate hain.',
    prefixes: [
      { prefix: 'pre-', origin: 'Latin', meaning: 'Before / Prior to', example: 'precedent, prerequisite, preliminary', trap: 'Precedent (legal rule) vs President (head of state)' },
      { prefix: 'post-', origin: 'Latin', meaning: 'After / Subsequent', example: 'postpone, posthumous, postmortem', trap: 'Posthumous (after death of father/author)' },
      { prefix: 'ante-', origin: 'Latin', meaning: 'Before in time', example: 'antedate, antecedent, anteroom', trap: 'Ante- (before) vs Anti- (against)' },
      { prefix: 'fore-', origin: 'Old English', meaning: 'Before in time/place', example: 'foresee, forecast, forerunner', trap: 'Forego (go before) vs Forgo (relinquish)' },
      { prefix: 're-', origin: 'Latin', meaning: 'Again / Backward', example: 're-examine, revoke, recover', trap: 'Hyphen disambiguation: re-sign vs resign' },
      { prefix: 'neo-', origin: 'Greek', meaning: 'New / Recent form of', example: 'neologism, neoclassical, neonatal', trap: 'Neologism = a newly coined word or expression' }
    ]
  },
  {
    id: 'location',
    name: '4. Location & Scope',
    subtitle: 'Spatial Vectors, Boundaries & Movement',
    badge: '6 Spatial Prefixes',
    description: 'Yeh prefixes geographical, jurisdictional aur boundary relations ko map karte hain.',
    prefixes: [
      { prefix: 'inter-', origin: 'Latin', meaning: 'Between / Reciprocal', example: 'interstate, intervene, interlocutory', trap: 'Interstate (between 2+ states) vs Intrastate' },
      { prefix: 'intra-', origin: 'Latin', meaning: 'Within / Inside', example: 'intradepartmental, intravenous', trap: 'Within single entity boundary only' },
      { prefix: 'trans-', origin: 'Latin', meaning: 'Across / Beyond', example: 'transfer, transgress, transparent', trap: 'Transgress = cross moral/legal boundary' },
      { prefix: 'circum-', origin: 'Latin', meaning: 'Around / Roundabout', example: 'circumference, circumvent, circumlocution', trap: 'Circumlocution = using too many words' },
      { prefix: 'extra-', origin: 'Latin', meaning: 'Outside / Beyond', example: 'extrajudicial, extraordinary, extraterritorial', trap: 'Extrajudicial confession needs corroboration' },
      { prefix: 'tele-', origin: 'Greek', meaning: 'At a distance / Far off', example: 'telescope, teleconference, telepathy', trap: 'Telepathy = feeling at a distance' }
    ]
  }
]

export default function PrefixFunctionalMap() {
  const [activeDomainId, setActiveDomainId] = useState(PREFIX_DOMAINS[0].id)
  const [searchFilter, setSearchFilter] = useState('')

  const activeDomain = PREFIX_DOMAINS.find((d) => d.id === activeDomainId) || PREFIX_DOMAINS[0]

  const filteredPrefixes = activeDomain.prefixes.filter((p) => {
    const q = searchFilter.toLowerCase()
    return (
      p.prefix.toLowerCase().includes(q) ||
      p.meaning.toLowerCase().includes(q) ||
      p.example.toLowerCase().includes(q) ||
      p.trap.toLowerCase().includes(q)
    )
  })

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-100 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Architecture 2</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Functional Domain Taxonomy</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50">
            Prefix Functional Map: 4 Classical Semantic Domains
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-400 mt-0.5">
            English prefixes ko unke 4 pramukh functional domains (Negation, Degree, Time, Location) mein categorize karke examinees ke distractor traps ko eliminate karein.
          </p>
        </div>
      </div>

      {/* Domain Navigation Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {PREFIX_DOMAINS.map((domain) => (
          <button
            key={domain.id}
            type="button"
            onClick={() => {
              setActiveDomainId(domain.id)
              setSearchFilter('')
            }}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeDomainId === domain.id
                ? 'bg-primary-50 dark:bg-primary-950/80 border-primary-400 dark:border-primary-500 shadow-xs'
                : 'bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-surface-900 dark:text-surface-100 truncate">
                {domain.name}
              </span>
              <span className="text-[0.625rem] font-mono px-1.5 py-0.2 rounded bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400">
                {domain.badge.split(' ')[0]}
              </span>
            </div>
            <p className="text-[0.6875rem] text-surface-500 dark:text-surface-400 truncate">
              {domain.subtitle}
            </p>
          </button>
        ))}
      </div>

      {/* Active Domain Detail Banner */}
      <div className="p-3.5 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-bold text-surface-900 dark:text-surface-100">
            {activeDomain.name} • {activeDomain.subtitle}
          </h4>
          <p className="text-xs text-surface-600 dark:text-surface-300 mt-0.5">
            {activeDomain.description}
          </p>
        </div>
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="Filter prefixes..."
          className="text-xs px-3 py-1.5 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-800 dark:text-surface-200 w-full sm:w-48 focus:outline-none focus:border-primary-500"
        />
      </div>

      {/* Prefix Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredPrefixes.map((p, i) => (
          <div
            key={i}
            className="p-3.5 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all space-y-2 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-base font-extrabold text-primary-700 dark:text-primary-300">
                {p.prefix}
              </span>
              <Badge variant="neutral" size="sm">{p.origin}</Badge>
            </div>

            <div className="text-xs space-y-1">
              <p className="text-surface-700 dark:text-surface-200">
                <strong className="text-surface-900 dark:text-surface-100">Core Sense: </strong>
                {p.meaning}
              </p>
              <p className="text-surface-600 dark:text-surface-400 font-mono text-[0.6875rem]">
                <strong className="text-surface-800 dark:text-surface-200 font-sans">Examples: </strong>
                {p.example}
              </p>
            </div>

            {/* High Court Exam Trap Footer */}
            <div className="pt-2 border-t border-surface-100 dark:border-surface-800 flex items-start gap-1.5 text-[0.6875rem] text-amber-900 dark:text-amber-200 bg-amber-50/60 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200/60 dark:border-amber-800/60">
              <AlertTriangle size={13} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>High Court Alert: </strong>
                {p.trap}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
