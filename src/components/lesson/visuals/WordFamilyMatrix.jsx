import { useState } from 'react'
import { GitBranch, Sparkles, AlertCircle, CheckCircle2, Search, ArrowRight } from 'lucide-react'
import { Card, Badge } from '../../common'

const FAMILIES_DATA = [
  {
    root: 'ACT',
    origin: 'Latin (agere = to do, drive)',
    baseSense: 'Doing, executing, performing deeds',
    members: {
      nouns: ['Action', 'Activity', 'Actor', 'Actress', 'Inaction', 'Inactivity', 'Enactment', 'Reaction', 'Interaction', 'Transaction'],
      verbs: ['Act', 'Activate', 'Deactivate', 'Enact', 'React', 'Transact', 'Overact'],
      adjectives: ['Active', 'Inactive', 'Actual', 'Actionable', 'Reactive', 'Interactive'],
      adverbs: ['Actively', 'Inactively', 'Actually']
    },
    examTrap: "'Actionable' ka matlab giving legal grounds for a lawsuit (actionable wrong / tort) hota hai, na ki 'able to act'.",
    sampleSentence: 'Publishing defamatory remarks without justification constitutes an actionable legal wrong.'
  },
  {
    root: 'LEGAL',
    origin: 'Latin (lex, legis = law)',
    baseSense: 'Conforming to or permitted by statutory law',
    members: {
      nouns: ['Legality', 'Illegality', 'Legalization', 'Paralegal'],
      verbs: ['Legalize', 'Outlaw'],
      adjectives: ['Legal', 'Illegal', 'Extralegal', 'Paralegal'],
      adverbs: ['Legally', 'Illegally']
    },
    examTrap: "'Illegal' mein assimilation ke karan double 'l' hota hai (in- + legal = illegal). 'Illegality' mein bhi double 'l' rehta hai.",
    sampleSentence: 'The High Court struck down the municipal notification on grounds of patent substantive illegality.'
  },
  {
    root: 'DEPEND',
    origin: 'Latin (dependere = hang from)',
    baseSense: 'Relying upon; hanging from',
    members: {
      nouns: ['Dependence', 'Dependency', 'Dependant (person)', 'Independence'],
      verbs: ['Depend'],
      adjectives: ['Dependent (condition)', 'Independent', 'Dependable', 'Undependable'],
      adverbs: ['Dependently', 'Independently', 'Dependably']
    },
    examTrap: "'Dependant' (Noun = a person who relies on another) vs 'Dependent' (Adjective = relying on). Notice the spelling difference with 'a' vs 'e'!",
    sampleSentence: 'The deceased clerk left behind three minor dependants who applied for compassionate appointment.'
  },
  {
    root: 'EMPLOY',
    origin: 'Latin (implicare = fold in, involve)',
    baseSense: 'Hiring; putting into productive use',
    members: {
      nouns: ['Employer', 'Employee', 'Employment', 'Unemployment', 'Underemployment', 'Employability'],
      verbs: ['Employ', 'Underemploy', 'Misemploy'],
      adjectives: ['Employed', 'Unemployed', 'Underemployed', 'Employable', 'Unemployable'],
      adverbs: ['Employably']
    },
    examTrap: "'Employer' (giver of work / active agent) vs 'Employee' (recipient worker). In legal statutes, these terms carry non-interchangeable obligations.",
    sampleSentence: 'The statutory provident fund scheme obligates every registered employer to deposit regular contributions.'
  },
  {
    root: 'SENSE',
    origin: 'Latin (sensus = feeling, perception, meaning)',
    baseSense: 'Perception, practical judgment, reason',
    members: {
      nouns: ['Sensation', 'Sensibility', 'Sensitivity', 'Insensitivity', 'Nonsense', 'Consensus', 'Dissension'],
      verbs: ['Sense', 'Sensitize', 'Desensitize'],
      adjectives: ['Sensible', 'Sensitive', 'Insensitive', 'Senseless', 'Sensational', 'Sensory'],
      adverbs: ['Sensibly', 'Sensitively', 'Insensitively', 'Senselessly']
    },
    examTrap: "'Sensible' (wise, practical, prudent) vs 'Sensitive' (delicate, easily hurt/affected). This is one of the highest-frequency distractor pairs!",
    sampleSentence: 'A sensible magistrate handles sensitive in-camera matrimonial depositions with utmost confidentiality.'
  },
  {
    root: 'FORM',
    origin: 'Latin (forma = shape, figure)',
    baseSense: 'Shape, structure, standard arrangement',
    members: {
      nouns: ['Formation', 'Formula', 'Formulation', 'Reformer', 'Reformation', 'Conformity', 'Deformity', 'Transformation', 'Uniformity'],
      verbs: ['Form', 'Formulate', 'Reform', 'Conform', 'Deform', 'Transform'],
      adjectives: ['Formal', 'Informal', 'Uniform', 'Deformed', 'Reformed', 'Conformist', 'Formative'],
      adverbs: ['Formally', 'Informally', 'Uniformly']
    },
    examTrap: "'Conform' (obey rules/standards, takes prep 'to': conform to rules) vs 'Confirm' (validate/verify facts).",
    sampleSentence: 'Every public procurement tender must strictly conform to the statutory guidelines issued by the finance department.'
  },
  {
    root: 'DICT',
    origin: 'Latin (dicere, dictus = to speak, declare)',
    baseSense: 'Authoritative speaking, proclaiming',
    members: {
      nouns: ['Dictation', 'Dictator', 'Dictum', 'Diction', 'Verdict', 'Jurisdiction', 'Indictment', 'Contradiction', 'Prediction'],
      verbs: ['Dictate', 'Indict', 'Contradict', 'Predict'],
      adjectives: ['Dictatorial', 'Contradictory', 'Predictable', 'Unpredictable'],
      adverbs: ['Dictatorially', 'Contradictorily', 'Predictably']
    },
    examTrap: "'Indict' is pronounced /ɪnˈdaɪt/ (silent 'c') and means to formally charge with a crime; 'Indictment' is /ɪnˈdaɪtmənt/.",
    sampleSentence: 'The grand jury issued a multi-count indictment against the accused for statutory tax fraud.'
  },
  {
    root: 'STRUCT',
    origin: 'Latin (struere, structus = to build, arrange)',
    baseSense: 'Building, assembling, erecting structures',
    members: {
      nouns: ['Structure', 'Construction', 'Destruction', 'Instruction', 'Obstruction', 'Infrastructure'],
      verbs: ['Construct', 'Destroy', 'Instruct', 'Obstruct', 'Restructure'],
      adjectives: ['Structural', 'Constructive', 'Destructive', 'Instructive', 'Obstructive'],
      adverbs: ['Structurally', 'Constructively', 'Destructively', 'Instructively']
    },
    examTrap: "In law, 'Constructive' means legal inference/fiction (constructive possession, constructive notice), NOT merely 'positive/helpful'.",
    sampleSentence: 'Constructive notice of an registered mortgage encumbrance is legally imputed to any subsequent purchaser.'
  }
]

export default function WordFamilyMatrix() {
  const [selectedRoot, setSelectedRoot] = useState(FAMILIES_DATA[0].root)
  const [searchQuery, setSearchQuery] = useState('')

  const active = FAMILIES_DATA.find((f) => f.root === selectedRoot) || FAMILIES_DATA[0]

  const displayedRoots = FAMILIES_DATA.filter((f) =>
    f.root.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.baseSense.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-100 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Architecture 4</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Morphological Field Matrix</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50">
            Word Family Matrix: 4-Quadrant Derivational Concord
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-400 mt-0.5">
            Ek single base root se Noun, Verb, Adjective aur Adverb branches ke expansive parivar aur unke competitive exam distractor traps ko visual matrix mein explore karein.
          </p>
        </div>
      </div>

      {/* Root Selector Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {FAMILIES_DATA.map((fam) => (
          <button
            key={fam.root}
            type="button"
            onClick={() => setSelectedRoot(fam.root)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              selectedRoot === fam.root
                ? 'bg-primary-600 text-white shadow-xs'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
            }`}
          >
            {fam.root}
          </button>
        ))}
      </div>

      {/* Root Details Header Bar */}
      <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-base font-extrabold text-primary-700 dark:text-primary-300">
              Root: {active.root}
            </span>
            <Badge variant="neutral" size="sm">{active.origin}</Badge>
          </div>
          <p className="text-xs text-surface-600 dark:text-surface-300 mt-1">
            <strong>Core Concept:</strong> {active.baseSense}
          </p>
        </div>
      </div>

      {/* 4-Quadrant Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Noun Quadrant */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-surface-900 border border-primary-200 dark:border-primary-800/80 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-primary-100 dark:border-primary-900/60">
            <span className="text-xs font-bold text-primary-800 dark:text-primary-300 uppercase tracking-wider">
              Nouns ({active.members.nouns.length})
            </span>
            <Badge variant="primary" size="sm">Slot: Subject/Obj</Badge>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {active.members.nouns.map((n, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded bg-primary-50 dark:bg-primary-950/60 text-primary-900 dark:text-primary-200 font-mono font-medium border border-primary-200/60 dark:border-primary-800/60"
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        {/* Verb Quadrant */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-surface-900 border border-emerald-200 dark:border-emerald-800/80 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-emerald-100 dark:border-emerald-900/60">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
              Verbs ({active.members.verbs.length})
            </span>
            <Badge variant="success" size="sm">Slot: Predicate</Badge>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {active.members.verbs.map((v, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-mono font-medium border border-emerald-200/60 dark:border-emerald-800/60"
              >
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* Adjective Quadrant */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-surface-900 border border-amber-200 dark:border-amber-800/80 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-amber-100 dark:border-amber-900/60">
            <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
              Adjectives ({active.members.adjectives.length})
            </span>
            <Badge variant="warning" size="sm">Slot: Modifier</Badge>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {active.members.adjectives.map((a, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-mono font-medium border border-amber-200/60 dark:border-amber-800/60"
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Adverb Quadrant */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-surface-900 border border-purple-200 dark:border-purple-800/80 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-purple-100 dark:border-purple-900/60">
            <span className="text-xs font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wider">
              Adverbs ({active.members.adverbs.length})
            </span>
            <Badge variant="secondary" size="sm">Slot: Manner</Badge>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {active.members.adverbs.map((adv, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 font-mono font-medium border border-purple-200/60 dark:border-purple-800/60"
              >
                {adv}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Exam Application Sentence & Trap Alert */}
      <div className="p-3.5 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-2.5">
        <div className="text-xs space-y-1">
          <span className="text-[0.6875rem] uppercase font-bold text-surface-500 dark:text-surface-400 block">
            Authentic Exam Deployment:
          </span>
          <p className="font-serif italic text-xs sm:text-sm text-surface-800 dark:text-surface-100 font-medium">
            "{active.sampleSentence}"
          </p>
        </div>

        <div className="pt-2 border-t border-surface-200 dark:border-surface-750 flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200 bg-amber-50/70 dark:bg-amber-950/40 p-2.5 rounded-lg border border-amber-200 dark:border-amber-800/60">
          <AlertCircle size={15} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>High Court Form Distractor Trap: </strong>
            <span>{active.examTrap}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
