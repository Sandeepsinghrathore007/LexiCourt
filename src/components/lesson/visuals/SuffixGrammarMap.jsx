import { useState } from 'react'
import { Network, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react'
import { Card, Badge } from '../../common'

const SUFFIX_CATEGORIES = [
  {
    id: 'nouns',
    title: 'Noun-Forming Suffixes (Nominalization)',
    badge: '9 Suffix Families',
    targetPos: 'NOUN (Subject, Object, Head Word)',
    description: 'Verbs aur Adjectives ko abstract nouns, states, actions ya agent persons mein convert karne wale suffixes.',
    items: [
      {
        suffix: '-tion / -sion',
        formula: 'Verb + -tion/-sion = Action/State Noun',
        basePos: 'Verb (adjudicate, conclude)',
        derived: 'Adjudication, Conclusion, Prescription',
        orthographyNote: 'Verbs ending in -de/-se usually take -sion (decide -> decision); verbs in -ate/-t take -tion (hesitate -> hesitation).',
        examTrap: 'Pronunciation (pronounced with "un", not *"pronounciation") is a perpetual exam spelling trap.'
      },
      {
        suffix: '-ment',
        formula: 'Verb + -ment = Result/Instrument Noun',
        basePos: 'Verb (appoint, judge, settle)',
        derived: 'Appointment, Judgment, Settlement',
        orthographyNote: 'Consonant suffix: silent "e" is usually retained (settlement, achievement). Exceptions: argument, judgment.',
        examTrap: 'Argument (drops "e"!) and Judgment (legal standard drops "e" in India/US) are top test traps.'
      },
      {
        suffix: '-ness',
        formula: 'Adjective + -ness = Quality Noun',
        basePos: 'Adjective (fair, happy, dark)',
        derived: 'Fairness, Happiness, Darkness',
        orthographyNote: 'Consonant + y changes to "i" before -ness (happy -> happiness). Vowel + y stays unchanged.',
        examTrap: 'Happiness and Business change "y" to "i". Shyness and Dryness retain "y" as exceptions.'
      },
      {
        suffix: '-ity / -ty',
        formula: 'Adjective + -ity = Abstract Quality Noun',
        basePos: 'Adjective (valid, pure, scarce)',
        derived: 'Validity, Purity, Scarcity',
        orthographyNote: 'Silent "e" drops before -ity (pure -> purity; sane -> sanity). Stress shifts to preceding syllable.',
        examTrap: 'Curiosity drops the "u" from curious (c-u-r-i-o-s-i-t-y, NOT *curiousity!).'
      },
      {
        suffix: '-ance / -ence',
        formula: 'Verb/Adj + -ance/-ence = State/Action Noun',
        basePos: 'Verb (maintain, occur, attend)',
        derived: 'Maintenance, Occurrence, Attendance',
        orthographyNote: '-ance verbs often end in -ate; -ence verbs from Latin 2nd/3rd conjugation. Consonant doubling in occurrence.',
        examTrap: 'Maintenance changes "ai" to "e" (m-a-i-n-t-e-n-a-n-c-e). Occurrence has double "c" and double "r".'
      },
      {
        suffix: '-er / -or',
        formula: 'Verb + -er/-or = Active Agent Noun',
        basePos: 'Verb (prosecute, counsel, inspect)',
        derived: 'Prosecutor, Counselor, Inspector',
        orthographyNote: 'Germanic bases take -er (worker); Latin legal bases take -or (donor, grantor, executor).',
        examTrap: 'Confusing legal pairs: Mortgagor (gives mortgage) vs Mortgagee (receives mortgage).'
      },
      {
        suffix: '-ee',
        formula: 'Verb + -ee = Passive Recipient Noun',
        basePos: 'Verb (employ, nominate, pay)',
        derived: 'Employee, Nominee, Payee',
        orthographyNote: 'Stress always falls heavily on the final -ee suffix (/ˌɛmplɔɪˈiː/).',
        examTrap: 'Employer (active giver of work) vs Employee (recipient worker). Never invert in legal definitions!'
      },
      {
        suffix: '-ism / -ist',
        formula: 'Root + -ism (Doctrine) / -ist (Practitioner)',
        basePos: 'Noun/Root (capital, altru, social)',
        derived: 'Capitalism/Capitalist, Altruism/Altruist',
        orthographyNote: '-ism denotes the abstract philosophy or practice; -ist denotes the living practitioner.',
        examTrap: 'Candidates often confuse doctrine with person in MCQs: Altruism = philosophy; Altruist = the person.'
      }
    ]
  },
  {
    id: 'adjectives',
    title: 'Adjective-Forming Suffixes (Descriptive Shift)',
    badge: '7 Suffix Families',
    targetPos: 'ADJECTIVE (Noun Modifier, Predicate Complement)',
    description: 'Nouns aur Verbs ko descriptive, capability ya attribution modifiers mein badalne wale suffixes.',
    items: [
      {
        suffix: '-able / -ible',
        formula: 'Verb/Noun + -able/-ible = Capability Adjective',
        basePos: 'Verb/Root (depend, access, sense)',
        derived: 'Dependable, Accessible, Sensible',
        orthographyNote: 'Standalone English words take -able (dependable); non-standalone roots or soft c/s take -ible (edible, sensible).',
        examTrap: 'Indispensable ends in -ABLE (never *-ible!). Sensible vs Sensitive distinction.'
      },
      {
        suffix: '-al / -ial',
        formula: 'Noun + -al/-ial = Relational Adjective',
        basePos: 'Noun (statute, nature, office)',
        derived: 'Statutory, Natural, Official',
        orthographyNote: 'Silent "e" drops before -al (nature -> natural; culture -> cultural).',
        examTrap: 'Beneficent (person doing good) vs Beneficial (producing advantageous results).'
      },
      {
        suffix: '-ful',
        formula: 'Noun + -ful = Characterized by / Full of',
        basePos: 'Noun (care, resource, skill)',
        derived: 'Careful, Resourceful, Skillful',
        orthographyNote: 'Suffix -ful ALWAYS has a SINGLE "l" (careful, grateful). Double "l" only occurs in -fully (carefully).',
        examTrap: 'Spelling blunders like *carefull, *gratefull, *skilfull are common exam distractors.'
      },
      {
        suffix: '-less',
        formula: 'Noun + -less = Without / Lacking',
        basePos: 'Noun (merit, help, price)',
        derived: 'Meritless, Helpless, Priceless',
        orthographyNote: 'Always spelled with double "s" (-less). Does not modify base word spelling.',
        examTrap: 'Priceless does NOT mean worthless! It means invaluable / beyond any monetary measure.'
      },
      {
        suffix: '-ous / -ious',
        formula: 'Noun + -ous = Full of Quality / Nature',
        basePos: 'Noun (peril, courage, malice)',
        derived: 'Perilous, Courageous, Malicious',
        orthographyNote: 'Silent "e" drops (fame -> famous). Soft "ce" and "ge" retain "e" (courageous, noticeable).',
        examTrap: 'Courageous retains the "e" (c-o-u-r-a-g-e-o-u-s). Mischievous is spelled -vous (NOT *-vious!).'
      },
      {
        suffix: '-ic / -ical',
        formula: 'Noun + -ic/-ical = Nuance Gradient Adjective',
        basePos: 'Noun (history, economy, classic)',
        derived: 'Historic / Historical, Economic / Economical',
        orthographyNote: 'Adverbs formed from -ic end in -ically (tragic -> tragically; exception: public -> publicly).',
        examTrap: 'Historic (momentous/famous in history) vs Historical (concerning the study of past facts).'
      },
      {
        suffix: '-ive',
        formula: 'Verb + -ive = Tendency / Capacity Adjective',
        basePos: 'Verb (persuade, conclude, prohibit)',
        derived: 'Persuasive, Conclusive, Prohibitive',
        orthographyNote: 'Final "d/de" turns into "s" before -ive (decide -> decisive; persuade -> persuasive).',
        examTrap: 'Decisive (resolute/final) vs Divisive (creating factional discord).'
      }
    ]
  },
  {
    id: 'verbs',
    title: 'Verb-Forming Suffixes (Causative & Dynamic)',
    badge: '4 Suffix Families',
    targetPos: 'VERB (Predicate Action, Process, Causative)',
    description: 'Nouns aur Adjectives ko dynamic actions aur causatives mein badalne wale suffixes.',
    items: [
      {
        suffix: '-ize / -ise',
        formula: 'Adj/Noun + -ize/-ise = To cause to become',
        basePos: 'Adj/Noun (legal, standard, modern)',
        derived: 'Legalize, Standardize, Modernize',
        orthographyNote: 'US uses -ize; UK allows -ise and -ize. But words with Latin root "s" must ALWAYS use -ise (supervise, exercise).',
        examTrap: 'Never write *supervize, *exercize, or *recompence with "z". Root "s" words are non-negotiable!'
      },
      {
        suffix: '-ify',
        formula: 'Adj/Noun + -ify = To make / produce',
        basePos: 'Adj/Noun (simple, pure, clear)',
        derived: 'Simplify, Purify, Clarify',
        orthographyNote: 'Final "e" or "y" transforms: pure -> purify; beauty -> beautify. Nouns end in -ification.',
        examTrap: 'Clarify -> Clarification; Verify -> Verification; Justify -> Justification.'
      },
      {
        suffix: '-en',
        formula: 'Adj/Noun + -en = To make or become',
        basePos: 'Adj/Noun (strength, sharp, wide)',
        derived: 'Strengthen, Sharpen, Widen',
        orthographyNote: 'Consonant doubles if base ends in 1 vowel + 1 consonant (flat -> flatten; fat -> fatten).',
        examTrap: 'Fasten and Glisten have silent "t" in pronunciation (/ˈfɑːsən/, /ˈɡlɪsən/).'
      },
      {
        suffix: '-ate',
        formula: 'Latin Root + -ate = Formal Action / State',
        basePos: 'Latin Root (valid, origin, alien)',
        derived: 'Validate, Originate, Alienate',
        orthographyNote: 'Verb -ate is pronounced /eɪt/ (advocate = to plead); noun/adj -ate is pronounced /ət/ (advocate = lawyer).',
        examTrap: 'Heteronym pronunciation shifts between verb and noun forms ending in -ate.'
      }
    ]
  },
  {
    id: 'adverbs',
    title: 'Adverb-Forming Suffixes (Manner & Vector)',
    badge: '3 Suffix Families',
    targetPos: 'ADVERB (Verb/Adjective Modifier, Manner)',
    description: 'Adjectives aur Nouns ko manner, direction aur reference modifiers mein badalne wale suffixes.',
    items: [
      {
        suffix: '-ly',
        formula: 'Adjective + -ly = Adverb of Manner',
        basePos: 'Adjective (meticulous, strict, true)',
        derived: 'Meticulously, Strictly, Truly',
        orthographyNote: 'Consonant + y changes to "i" (easy -> easily). True -> truly and Due -> duly drop silent "e".',
        examTrap: 'Truly (no "e") and Duly (no "e")! Also beware: Friendly, Cowardly, Lonely are ADJECTIVES, NOT adverbs.'
      },
      {
        suffix: '-ward / -wards',
        formula: 'Noun/Prep + -ward = Direction Vector',
        basePos: 'Noun/Prep (in, out, back, home)',
        derived: 'Inward, Outward, Backward, Homeward',
        orthographyNote: 'Without "s" is preferred as adjective (a backward step); with "s" can be adverb (step backwards).',
        examTrap: 'Toward vs Towards is US vs UK stylistic variation, both are grammatically sound.'
      },
      {
        suffix: '-wise',
        formula: 'Noun + -wise = Manner / Reference',
        basePos: 'Noun (clock, other, length)',
        derived: 'Clockwise, Otherwise, Lengthwise',
        orthographyNote: 'Directly attaches without hyphen in established English words.',
        examTrap: 'Otherwise acts as a conjunctive adverb requiring semicolon + comma syntax in compound sentences.'
      }
    ]
  }
]

export default function SuffixGrammarMap() {
  const [activeTabId, setActiveTabId] = useState(SUFFIX_CATEGORIES[0].id)

  const activeCategory = SUFFIX_CATEGORIES.find((c) => c.id === activeTabId) || SUFFIX_CATEGORIES[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-100 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Architecture 3</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Part of Speech Transformation Engine</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50">
            Suffix Grammar Map: Part-of-Speech Shifting Matrix
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-400 mt-0.5">
            Suffixes ke dwara Noun, Adjective, Verb aur Adverb ke structural conversions, orthographic shifts aur exam traps ko master karein.
          </p>
        </div>
      </div>

      {/* POS Category Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {SUFFIX_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveTabId(cat.id)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeTabId === cat.id
                ? 'bg-primary-50 dark:bg-primary-950/80 border-primary-400 dark:border-primary-500 shadow-xs'
                : 'bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-surface-900 dark:text-surface-100 truncate">
                {cat.title.split(' ')[0]} Suffixes
              </span>
              <span className="text-[0.625rem] font-mono px-1.5 py-0.2 rounded bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400">
                {cat.badge.split(' ')[0]}
              </span>
            </div>
            <p className="text-[0.6875rem] text-surface-500 dark:text-surface-400 truncate">
              Target: {cat.targetPos.split(' ')[0]}
            </p>
          </button>
        ))}
      </div>

      {/* Target POS Banner */}
      <div className="p-3.5 rounded-xl bg-primary-50/70 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-800 text-xs text-primary-950 dark:text-primary-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="font-bold text-sm block">{activeCategory.title}</span>
          <p className="text-surface-600 dark:text-surface-300 mt-0.5">{activeCategory.description}</p>
        </div>
        <div className="shrink-0 px-2.5 py-1 rounded-md bg-white dark:bg-surface-900 border border-primary-200 dark:border-primary-700 font-mono font-bold text-primary-700 dark:text-primary-300">
          Target: {activeCategory.targetPos}
        </div>
      </div>

      {/* Suffix Detail Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {activeCategory.items.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all space-y-2.5 shadow-2xs flex flex-col justify-between"
          >
            <div>
              {/* Suffix Header */}
              <div className="flex items-center justify-between pb-2 border-b border-surface-100 dark:border-surface-800">
                <span className="font-mono text-base font-extrabold text-primary-700 dark:text-primary-300">
                  {item.suffix}
                </span>
                <span className="text-[0.6875rem] px-2 py-0.5 rounded-md bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 font-mono">
                  {item.basePos}
                </span>
              </div>

              {/* Structural Formula */}
              <div className="mt-2 p-2 rounded-lg bg-surface-50 dark:bg-surface-800/60 font-mono text-xs text-surface-800 dark:text-surface-200 font-semibold">
                {item.formula}
              </div>

              {/* Derived Examples */}
              <div className="mt-2 text-xs text-surface-700 dark:text-surface-200">
                <strong className="text-surface-900 dark:text-surface-100">Exemplars: </strong>
                <span className="font-mono text-primary-800 dark:text-primary-200">{item.derived}</span>
              </div>

              {/* Orthographic Note */}
              <p className="mt-1.5 text-[0.6875rem] text-surface-600 dark:text-surface-400 leading-relaxed">
                <strong>Spelling Mechanics: </strong>{item.orthographyNote}
              </p>
            </div>

            {/* High Court Exam Trap Pill */}
            <div className="mt-2 p-2 rounded-lg bg-amber-50/80 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/70 text-[0.6875rem] text-amber-900 dark:text-amber-200 flex items-start gap-1.5">
              <AlertTriangle size={13} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Exam Distractor Trap: </strong>
                {item.examTrap}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
