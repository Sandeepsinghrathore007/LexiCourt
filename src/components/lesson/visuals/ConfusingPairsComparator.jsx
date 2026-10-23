import { useState } from 'react'
import { Check, X, AlertTriangle, Scale } from 'lucide-react'
import { Card, Badge } from '../../common'

const CONFUSING_PAIRS = [
  {
    id: 'pair-agree',
    title: 'Agree WITH vs Agree TO',
    concept: 'Person/Opinion vs Proposal/Plan',
    left: {
      formula: 'Agree WITH + Person / Opinion',
      meaning: 'Kisi vyakti ya uske vichar se sahmat hona',
      example: 'The senior advocate agreed with me on the constitutional issue.',
      wrong: 'The senior advocate agreed to me on this issue. (WRONG)',
      targetType: 'Human / Personal View'
    },
    right: {
      formula: 'Agree TO + Proposal / Scheme / Terms',
      meaning: 'Kisi formal prastav, schedule ya sharton ko accept karna',
      example: 'The registry agreed to the revised court calendar.',
      wrong: 'The registry agreed with the proposal. (UNCONVENTIONAL)',
      targetType: 'Plan / Proposal / Document'
    },
    examTip: 'Examiner "proposal" ya "terms" ke aage jaldbazi mein "with" lagwata hai. Proposal = strictly "TO"!'
  },
  {
    id: 'pair-apply',
    title: 'Apply TO vs Apply FOR',
    concept: 'Authority vs Position/Purpose',
    left: {
      formula: 'Apply FOR + Post / Job / Leave / Grant',
      meaning: 'Jis pad, vacancy ya chhutti ke liye aavedan kiya ja raha hai',
      example: 'Over five thousand candidates applied for the System Assistant post.',
      wrong: 'Candidates applied to the System Assistant post. (WRONG)',
      targetType: 'Target Objective / Post'
    },
    right: {
      formula: 'Apply TO + Official Body / Authority',
      meaning: 'Jis aadhikarik sanstha ya officer ke paas aavedan submit kiya ja raha hai',
      example: 'The petitioner applied to the High Court Registrar for inspection.',
      wrong: 'The petitioner applied for the Registrar General. (DISTORTED)',
      targetType: 'Receiving Authority'
    },
    examTip: 'Agar target person/officer hai toh "TO"; agar target vacancy/post hai toh "FOR".'
  },
  {
    id: 'pair-accuse-blame',
    title: 'Accuse OF vs Blame FOR',
    concept: 'Criminal Charge vs Fault Attribution',
    left: {
      formula: 'Accuse [Person] OF + Crime / Wrongdoing',
      meaning: 'Aarop lagana (Legal allegation)',
      example: 'The police accused the junior accountant of tampering with vouchers.',
      wrong: 'The police accused him for tampering with vouchers. (FATAL EXAM ERROR)',
      targetType: 'Specific Offence / Crime'
    },
    right: {
      formula: 'Blame [Person] FOR + Mistake / Loss',
      meaning: 'Doshi thehrana ya zimmedari dalna',
      example: 'The supervisor blamed the technical team for the server downtime.',
      wrong: 'The supervisor blamed the team of the server downtime. (WRONG)',
      targetType: 'Loss / Cause / Failure'
    },
    examTip: 'Accused hamesha "OF" leta hai (accused of theft/bribery). Blamed hamesha "FOR" leta hai.'
  },
  {
    id: 'pair-result',
    title: 'Result IN vs Result FROM',
    concept: 'Outcome (Forward) vs Cause (Backward)',
    left: {
      formula: 'Subject (Cause) + Resulted IN + Object (Outcome)',
      meaning: 'Ka parinaam hona / Produce karna (Leads to)',
      example: 'Careless data entry resulted in the rejection of thirty applications.',
      wrong: 'Careless data entry resulted from the rejection. (LOGIC INVERTED)',
      targetType: 'Produces Effect'
    },
    right: {
      formula: 'Subject (Outcome) + Resulted FROM + Object (Cause)',
      meaning: 'Ki wajah se paida hona / Originate karna (Caused by)',
      example: 'The rejection of thirty applications resulted from careless data entry.',
      wrong: 'The rejection resulted in careless data entry. (LOGIC INVERTED)',
      targetType: 'Originates from Cause'
    },
    examTip: 'Dekhein subject cause hai ya outcome! Cause pehle hai toh "RESULTED IN"; outcome pehle hai toh "RESULTED FROM".'
  },
  {
    id: 'pair-good',
    title: 'Good AT vs Good FOR',
    concept: 'Proficiency/Skill vs Health/Benefit',
    left: {
      formula: 'Good AT + Skill / Subject / Activity',
      meaning: 'Kisi subject, talent ya kaam mein kushal hona',
      example: 'The selected candidate is exceptionally good at keyboard transcription.',
      wrong: 'The candidate is good in keyboard transcription. (VERY COMMON MISTAKE)',
      targetType: 'Skill / Competence'
    },
    right: {
      formula: 'Good FOR + Health / Benefit / Validity',
      meaning: 'Kisi ke fayde, swasthya ya upyog ke liye labhdayak hona',
      example: 'Daily keyboard practice is good for your accuracy and speed.',
      wrong: 'Daily practice is good at your accuracy. (WRONG)',
      targetType: 'Welfare / Utility'
    },
    examTip: 'Subject ya skill mein "good IN" bolna bolchal ki galti hai; standard English strictly "GOOD AT" maanti hai.'
  },
  {
    id: 'pair-angry',
    title: 'Angry WITH vs Angry AT / ABOUT',
    concept: 'Person vs Conduct/Matter',
    left: {
      formula: 'Angry WITH + Person',
      meaning: 'Kisi vyakti par gussa hona',
      example: 'The judge was visibly angry with the defense advocate for being tardy.',
      wrong: 'The judge was angry at the advocate. (NON-STANDARD IN FORMAL EXAM)',
      targetType: 'Individual Human'
    },
    right: {
      formula: 'Angry AT / ABOUT + Behavior / Event / Conduct',
      meaning: 'Kisi aacharan, faisle ya sthiti par gussa hona',
      example: 'The Division Bench was angry at the unreasonable bureaucratic delay.',
      wrong: 'The Bench was angry with the delay. (WRONG)',
      targetType: 'Situation / Conduct'
    },
    examTip: 'Human entity = "angry WITH"; Action / Situation = "angry AT / ABOUT".'
  },
  {
    id: 'pair-prefer',
    title: 'Prefer X TO Y (Never Than)',
    concept: 'Two-Entity Preference Concord',
    left: {
      formula: 'Prefer [Noun/Gerund] TO [Noun/Gerund]',
      meaning: 'Ek chiz ko doosri chiz ke mukable prathmikta dena',
      example: 'The judicial bench prefers electronic submissions to manual paper filing.',
      wrong: 'Prefers electronic submissions than manual paper filing. (NUMBER 1 EXAM TRAP)',
      targetType: 'Standard English Preposition'
    },
    right: {
      formula: 'Preferable TO (Adjective Form)',
      meaning: 'Adjective form bhi strictly "TO" leta hai',
      example: 'Summary dismissal is preferable to endless litigation.',
      wrong: 'Summary dismissal is preferable than endless litigation. (WRONG)',
      targetType: 'Comparative Adjective'
    },
    examTip: '"Prefer" aur "preferable" ke sath "THAN" lagana Rajasthan competitive exams ka sabse common distractor hai!'
  },
  {
    id: 'pair-latin',
    title: 'Senior / Junior TO (Latin Comparatives)',
    concept: 'Latin Adjectives Ending in -or',
    left: {
      formula: 'Senior / Junior / Superior / Inferior + TO',
      meaning: 'Pad, aayu ya quality mein uncha ya neecha hona',
      example: 'The System Officer is two years senior to the newly joined assistant.',
      wrong: 'He is two years senior than the newly joined assistant. (FATAL ERROR)',
      targetType: 'Latin Comparative'
    },
    right: {
      formula: 'Regular English Comparatives + THAN',
      meaning: 'English "-er" adjectives regular "than" lete hain',
      example: 'He is older than me, but junior to me in official service.',
      wrong: 'He is older to me. (WRONG)',
      targetType: 'Germanic Comparative'
    },
    examTip: 'Jis comparative ke aage "-or" ho (senior, junior, prior, superior, inferior), wahan bina soche "TO" select karein!'
  }
]

export default function ConfusingPairsComparator() {
  const [selectedPairId, setSelectedPairId] = useState(CONFUSING_PAIRS[0].id)

  const activePair = CONFUSING_PAIRS.find((p) => p.id === selectedPairId) || CONFUSING_PAIRS[0]

  return (
    <Card variant="default" padding="lg" className="border-amber-200 dark:border-surface-700 select-none shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Scale size={18} className="text-amber-600 dark:text-amber-400" />
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Confusing Pairs Precision Comparator
            </h3>
          </div>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            Aamtaur par confuse karne wale preposition pairs ke contextual differences aur exam traps ko compare karein.
          </p>
        </div>
        <Badge variant="warning" size="md">
          {CONFUSING_PAIRS.length} High-Yield Contrasts
        </Badge>
      </div>

      {/* Switcher Buttons */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
        {CONFUSING_PAIRS.map((pair) => (
          <button
            key={pair.id}
            type="button"
            onClick={() => setSelectedPairId(pair.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              selectedPairId === pair.id
                ? 'bg-white dark:bg-surface-900 text-amber-700 dark:text-amber-300 shadow-xs border border-surface-200 dark:border-surface-700'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
            }`}
          >
            {pair.title.split(' vs ')[0]} vs {pair.title.split(' vs ')[1]?.split(' (')[0]}
          </button>
        ))}
      </div>

      {/* Comparative Cards Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Side: Variant A */}
        <div className="p-4 rounded-xl border border-primary-200 dark:border-primary-800 bg-primary-50/20 dark:bg-primary-950/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs font-bold font-mono">
              Variant A
            </span>
            <span className="text-[0.6875rem] font-semibold text-primary-600 dark:text-primary-400">
              {activePair.left.targetType}
            </span>
          </div>

          <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-100">
            {activePair.left.formula}
          </h4>

          <p className="text-xs text-surface-700 dark:text-surface-300">
            <strong>Meaning:</strong> {activePair.left.meaning}
          </p>

          <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-success-200 dark:border-success-800 text-xs text-surface-800 dark:text-surface-200 space-y-1">
            <div className="flex items-start gap-1.5 text-success-700 dark:text-success-400 font-medium">
              <Check size={14} className="shrink-0 mt-0.5" />
              <span>Correct: "{activePair.left.example}"</span>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 flex items-start gap-1.5">
            <X size={14} className="shrink-0 mt-0.5" />
            <span>{activePair.left.wrong}</span>
          </div>
        </div>

        {/* Right Side: Variant B */}
        <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/20 dark:bg-amber-950/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs font-bold font-mono">
              Variant B
            </span>
            <span className="text-[0.6875rem] font-semibold text-amber-600 dark:text-amber-400">
              {activePair.right.targetType}
            </span>
          </div>

          <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-100">
            {activePair.right.formula}
          </h4>

          <p className="text-xs text-surface-700 dark:text-surface-300">
            <strong>Meaning:</strong> {activePair.right.meaning}
          </p>

          <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-success-200 dark:border-success-800 text-xs text-surface-800 dark:text-surface-200 space-y-1">
            <div className="flex items-start gap-1.5 text-success-700 dark:text-success-400 font-medium">
              <Check size={14} className="shrink-0 mt-0.5" />
              <span>Correct: "{activePair.right.example}"</span>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 flex items-start gap-1.5">
            <X size={14} className="shrink-0 mt-0.5" />
            <span>{activePair.right.wrong}</span>
          </div>
        </div>
      </div>

      {/* Exam Trap Warning Footnote */}
      <div className="p-3 rounded-xl bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 flex items-start gap-2.5 text-xs text-surface-700 dark:text-surface-300">
        <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-surface-900 dark:text-surface-100 block mb-0.5">Rajasthan High Court Trap Alert:</strong>
          {activePair.examTip}
        </div>
      </div>
    </Card>
  )
}
