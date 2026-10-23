import { useState } from 'react'
import { FolderTree, Users, Shield, Compass, Landmark, Home, BookOpen, Clock, Activity, Zap, Binary } from 'lucide-react'
import { Card, Badge } from '../../common'

const DOMAINS = [
  {
    id: 'people',
    name: 'People & Personality',
    icon: Users,
    color: 'border-blue-300 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20 text-blue-800 dark:text-blue-300',
    wordsCount: 30,
    examples: ['Optimist', 'Pessimist', 'Introvert', 'Misanthrope', 'Philanthropist', 'Egotist', 'Taciturn', 'Sagacious'],
    coreClue: 'A person who behaves, speaks, or views the world in a specific habitual way.',
    examTrap: 'Person (agent noun) ko trait (adjective: Optimistic) ya philosophy (abstract noun: Optimism) se confuse na karein.'
  },
  {
    id: 'roles',
    name: 'Beliefs & Professions',
    icon: Shield,
    color: 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300',
    wordsCount: 20,
    examples: ['Atheist', 'Agnostic', 'Polyglot', 'Linguist', 'Connoisseur', 'Arbitrator', 'Mediator', 'Iconoclast'],
    coreClue: 'Technical titles based on specialized training, theological stand, or dispute resolution function.',
    examTrap: 'Arbitrator binding order deta hai jabki Mediator voluntary negotiation karwata hai.'
  },
  {
    id: 'phobias',
    name: 'Phobias & Preferences',
    icon: Compass,
    color: 'border-purple-300 dark:border-purple-800 bg-purple-50/30 dark:bg-purple-950/20 text-purple-800 dark:text-purple-300',
    wordsCount: 15,
    examples: ['Claustrophobia', 'Acrophobia', 'Hydrophobia', 'Xenophobia', 'Kleptomania', 'Hedonist', 'Ascetic'],
    coreClue: '-phobia (irrational dread), -mania (compulsive impulse), aur extreme lifestyle choices.',
    examTrap: 'Clinical conditions (Kleptomania, Pyromania) ko casual criminal theft ya simple interest se alag rakhein.'
  },
  {
    id: 'government',
    name: 'Government & Systems',
    icon: Landmark,
    color: 'border-amber-300 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300',
    wordsCount: 22,
    examples: ['Democracy', 'Autocracy', 'Oligarchy', 'Theocracy', 'Bureaucracy', 'Plutocracy', 'Anarchy', 'Amnesty'],
    coreClue: 'Who holds supreme sovereign rule: the people, one dictator, the rich, priests, or an administrative apparatus.',
    examTrap: 'Sovereign rule (Republic/Monarchy) aur administrative structure (Bureaucracy) ke beech ka farq samjhein.'
  },
  {
    id: 'places',
    name: 'Places & Repositories',
    icon: Home,
    color: 'border-teal-300 dark:border-teal-800 bg-teal-50/30 dark:bg-teal-950/20 text-teal-800 dark:text-teal-300',
    wordsCount: 22,
    examples: ['Apiary', 'Aviary', 'Aquarium', 'Sanatorium', 'Arsenal', 'Mint', 'Mausoleum', 'Granary', 'Sanctuary'],
    coreClue: 'A designated enclosure or facility based on species housed, goods stored, or medical/religious purpose.',
    examTrap: 'Apiary = Bees (apis); Aviary = Birds (avis). Mint = Coins; Arsenal = Weapons.'
  },
  {
    id: 'literature',
    name: 'Books, Speech & Rhetoric',
    icon: BookOpen,
    color: 'border-rose-300 dark:border-rose-800 bg-rose-50/30 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300',
    wordsCount: 26,
    examples: ['Autobiography', 'Biography', 'Epitaph', 'Eulogy', 'Elegy', 'Plagiarism', 'Pseudonym', 'Monologue'],
    coreClue: 'Authorship origin, memorial format (stone vs speech vs poem), and rhetorical speech devices.',
    examTrap: 'Epitaph = Tomb inscription; Eulogy = Praise speech; Elegy = Mourning poem.'
  },
  {
    id: 'time',
    name: 'Time, Frequency & Sequence',
    icon: Clock,
    color: 'border-indigo-300 dark:border-indigo-800 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-800 dark:text-indigo-300',
    wordsCount: 20,
    examples: ['Annual', 'Biannual', 'Biennial', 'Decade', 'Millennium', 'Ephemeral', 'Predecessor', 'Successor'],
    coreClue: 'Mathematical frequency intervals and chronological sequence directionality.',
    examTrap: 'Biannual = 2 times per year (semi-annual); Biennial = Once every 2 years.'
  },
  {
    id: 'conditions',
    name: 'Conditions & Qualities',
    icon: Activity,
    color: 'border-cyan-300 dark:border-cyan-800 bg-cyan-50/30 dark:bg-cyan-950/20 text-cyan-800 dark:text-cyan-300',
    wordsCount: 25,
    examples: ['Inevitable', 'Infallible', 'Illegible', 'Imminent', 'Immanent', 'Immigrant', 'Emigrant', 'Obsolete'],
    coreClue: 'States of capability, sensory perception, impending time, and territorial borders.',
    examTrap: 'Imminent (about to happen) vs Immanent (inherent within) vs Eminent (distinguished).'
  },
  {
    id: 'actions',
    name: 'Actions & Judicial Verbs',
    icon: Zap,
    color: 'border-orange-300 dark:border-orange-800 bg-orange-50/30 dark:bg-orange-950/20 text-orange-800 dark:text-orange-300',
    wordsCount: 28,
    examples: ['Acquit', 'Convict', 'Absolve', 'Prosecute', 'Persecute', 'Mitigate', 'Exacerbate', 'Abdicate'],
    coreClue: 'Formal courtroom actions, problem severity modulation, and royal power cessions.',
    examTrap: 'Prosecute = Lawful trial; Persecute = Unlawful oppression. Abdicate = Throne; Renounce = General claim.'
  },
  {
    id: 'biology',
    name: 'Biology & Classifiers',
    icon: Binary,
    color: 'border-lime-300 dark:border-lime-800 bg-lime-50/30 dark:bg-lime-950/20 text-lime-800 dark:text-lime-300',
    wordsCount: 15,
    examples: ['Quadruped', 'Biped', 'Herbivore', 'Carnivore', 'Omnivore', 'Nocturnal', 'Diurnal', 'Arboreal'],
    coreClue: 'Zoological taxonomy of limbs, dietary sources, and daily activity cycles.',
    examTrap: 'Omnivore plants aur meat dono khata hai; Herbivore sirf plants; Carnivore sirf meat.'
  }
]

export default function SubstitutionsCategoryMap() {
  const [activeDomainId, setActiveDomainId] = useState('people')
  const activeDomain = DOMAINS.find((d) => d.id === activeDomainId) || DOMAINS[0]
  const Icon = activeDomain.icon

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-200 dark:border-surface-700/80 pb-3">
        <div className="flex items-center gap-2">
          <FolderTree size={18} className="text-primary-600 dark:text-primary-400" />
          <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
            One-Word Substitution Master Category Map (10 Semantic Domains)
          </h3>
        </div>
        <Badge variant="primary" size="sm">Interactive Taxonomies</Badge>
      </div>

      {/* Domain Selection Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {DOMAINS.map((domain) => {
          const isSelected = domain.id === activeDomainId
          const DomainIcon = domain.icon
          return (
            <button
              key={domain.id}
              type="button"
              onClick={() => setActiveDomainId(domain.id)}
              className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/60 text-primary-900 dark:text-primary-100 shadow-xs ring-1 ring-primary-500/30'
                  : 'border-surface-200 dark:border-surface-700/70 bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:border-primary-300'
              }`}
            >
              <DomainIcon size={16} className={isSelected ? 'text-primary-600 dark:text-primary-400 shrink-0' : 'text-surface-400 shrink-0'} />
              <div className="min-w-0">
                <p className="text-xs font-bold truncate">{domain.name}</p>
                <span className="text-[0.625rem] text-surface-400 block">{domain.wordsCount}+ words</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Active Domain Spotlight Viewport */}
      <div className={`p-4 rounded-xl border ${activeDomain.color} space-y-3`}>
        <div className="flex items-center gap-2">
          <Icon size={20} className="shrink-0" />
          <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-50">
            {activeDomain.name} Domain Architecture
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-white/80 dark:bg-surface-850/80 border border-surface-200/60 dark:border-surface-700/60 space-y-1">
            <span className="text-[0.625rem] font-bold uppercase tracking-wider text-surface-400">Defining Parameter:</span>
            <p className="text-surface-800 dark:text-surface-200 leading-relaxed font-medium">
              {activeDomain.coreClue}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-white/80 dark:bg-surface-850/80 border border-surface-200/60 dark:border-surface-700/60 space-y-1">
            <span className="text-[0.625rem] font-bold uppercase tracking-wider text-danger-500">Critical Exam Trap:</span>
            <p className="text-surface-800 dark:text-surface-200 leading-relaxed font-medium">
              {activeDomain.examTrap}
            </p>
          </div>
        </div>

        <div>
          <span className="text-[0.625rem] font-bold uppercase tracking-wider text-surface-500 block mb-1.5">
            Key High-Yield Exemplars in this Domain:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeDomain.examples.map((ex) => (
              <span
                key={ex}
                className="px-2.5 py-1 rounded-md bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-xs font-mono font-bold text-surface-800 dark:text-surface-100 shadow-2xs"
              >
                {ex}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
