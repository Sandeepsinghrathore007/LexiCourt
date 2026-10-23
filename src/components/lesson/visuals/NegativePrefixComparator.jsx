import { useState } from 'react'
import { ShieldAlert } from 'lucide-react'
import { Card, Badge } from '../../common'

const NEGATIVE_COMPARISONS = [
  {
    id: 'un-vs-non',
    title: 'UN- vs NON- (Moral/Conduct vs Neutral Fact)',
    prefix1: {
      name: 'un-',
      origin: 'Old English (Germanic)',
      tone: 'Subjective, negative evaluation, unethical, contrary to expectations',
      example: 'Unprofessional behaviour',
      exampleMeaning: 'Behaving unethically, rudely, or in violation of professional codes of conduct.'
    },
    prefix2: {
      name: 'non-',
      origin: 'Latin (non = not)',
      tone: 'Objective fact, neutral non-belonging, technical classification',
      example: 'Non-professional member',
      exampleMeaning: 'Someone who simply does not belong to that profession (e.g., a lay person or amateur), without moral blame.'
    },
    examTrap: 'Examiner tests: "The judge condemned the advocate\'s _______ conduct." Answer is "unprofessional" (unethical). Using "non-professional" is an error because the advocate IS a professional whose conduct was improper.'
  },
  {
    id: 'dis-vs-un',
    title: 'DIS- vs UN- (Impartiality vs Indifference)',
    prefix1: {
      name: 'dis- (in Disinterested)',
      origin: 'Latin (dis- = apart, unbiased)',
      tone: 'Impartial, free from selfish interest or personal financial stake',
      example: 'A disinterested arbitrator',
      exampleMeaning: 'An arbitrator who has no personal bias or financial stake in either party.'
    },
    prefix2: {
      name: 'un- (in Uninterested)',
      origin: 'Old English',
      tone: 'Bored, lacking interest, careless, paying no attention',
      example: 'An uninterested juror',
      exampleMeaning: 'A juror who is bored, distracted, or asleep during testimony.'
    },
    examTrap: 'A judge MUST be DISINTERESTED (impartial), but must NEVER be UNINTERESTED (bored/inattentive). This is tested in 80% of competitive vocab exams.'
  },
  {
    id: 'in-vs-worthless',
    title: 'IN- (Invaluable) vs WORTHLESS (Pseudo-Negation)',
    prefix1: {
      name: 'in- (in Invaluable)',
      origin: 'Latin (intensive/incalculable)',
      tone: 'Priceless, of incalculable value, beyond monetary calculation',
      example: 'Invaluable constitutional guidance',
      exampleMeaning: 'Advice so precious that money cannot buy it.'
    },
    prefix2: {
      name: 'worthless / valueless',
      origin: 'Old English (-less)',
      tone: 'Having zero worth, useless, trash',
      example: 'Worthless counterfeit currency',
      exampleMeaning: 'Currency having zero financial or legal validity.'
    },
    examTrap: "'Invaluable' does NOT mean worthless! Candidates choose 'valuable' as the antonym of 'invaluable'. The TRUE antonym of 'invaluable' is 'worthless' or 'valueless'."
  },
  {
    id: 'amoral-vs-immoral',
    title: 'A- vs IM- (Amoral vs Immoral)',
    prefix1: {
      name: 'a- (in Amoral)',
      origin: 'Greek (privative = without)',
      tone: 'Lacking moral awareness completely; outside the moral category',
      example: 'Amoral natural phenomena',
      exampleMeaning: 'Earthquakes, predatory animals, or toddlers who have no concept of morality.'
    },
    prefix2: {
      name: 'im- (in Immoral)',
      origin: 'Latin (in- + moral)',
      tone: 'Violating moral rules; unethical, corrupt, wicked',
      example: 'Immoral public corruption',
      exampleMeaning: 'A public officer who knows bribery is illegal and sinful, but accepts it anyway.'
    },
    examTrap: "'Amoral' is neither good nor bad because the moral sense is absent. 'Immoral' is deliberate evil by a moral agent. Don't interchange them!"
  },
  {
    id: 'mis-vs-mal',
    title: 'MIS- vs MAL- (Error/Mistake vs Malice/Defect)',
    prefix1: {
      name: 'mis-',
      origin: 'Old English',
      tone: 'Wrongly, mistakenly, erroneously, by misjudgment',
      example: 'Misinterpret a statutory clause',
      exampleMeaning: 'To understand or interpret the words incorrectly due to honest error or confusion.'
    },
    prefix2: {
      name: 'mal-',
      origin: 'Latin (malus = bad/evil)',
      tone: 'Ill, corrupt, diseased, professional misconduct, malice',
      example: 'Medical malpractice',
      exampleMeaning: 'Gross professional negligence, illegal conduct, or intentional dereliction of duty.'
    },
    examTrap: "'Misfortune' (bad luck) vs 'Malice' (evil intent); 'Mismanagement' (poor handling) vs 'Malpractice' (actionable illegal professional misconduct)."
  }
]

export default function NegativePrefixComparator() {
  const [selectedPairId, setSelectedPairId] = useState(NEGATIVE_COMPARISONS[0].id)

  const activePair = NEGATIVE_COMPARISONS.find((c) => c.id === selectedPairId) || NEGATIVE_COMPARISONS[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-100 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Architecture 6</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Polarity & Nuance Comparator</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50">
            Negative Prefix Comparator: Subtle Polarity & Antonym Nuances
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-400 mt-0.5">
            un-, in-, dis-, non-, a-, mis- aur mal- ke beech ke subtle semantic, moral aur legal distinctions ko systematically compare karein.
          </p>
        </div>
      </div>

      {/* Comparison Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {NEGATIVE_COMPARISONS.map((pair) => (
          <button
            key={pair.id}
            type="button"
            onClick={() => setSelectedPairId(pair.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              selectedPairId === pair.id
                ? 'bg-primary-600 text-white shadow-xs'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
            }`}
          >
            {pair.title.split(' ')[0]} {pair.title.split(' ')[1]} {pair.title.split(' ')[2]}
          </button>
        ))}
      </div>

      {/* Active Comparison Banner */}
      <div className="p-3.5 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700">
        <h4 className="text-sm font-bold text-surface-900 dark:text-surface-100">
          {activePair.title}
        </h4>
      </div>

      {/* Side-by-Side Comparison Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Prefix 1 Column */}
        <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-amber-200/60 dark:border-amber-800/60">
            <span className="font-mono text-base font-extrabold text-amber-800 dark:text-amber-300">
              {activePair.prefix1.name}
            </span>
            <Badge variant="warning" size="sm">{activePair.prefix1.origin}</Badge>
          </div>

          <div className="text-xs space-y-2 text-surface-700 dark:text-surface-300">
            <p>
              <strong className="text-surface-900 dark:text-surface-100">Semantic Valence: </strong>
              {activePair.prefix1.tone}
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-amber-200 dark:border-amber-800 space-y-1">
              <span className="font-mono font-bold text-amber-900 dark:text-amber-200 block">
                "{activePair.prefix1.example}"
              </span>
              <p className="text-[0.6875rem] text-surface-600 dark:text-surface-400">
                {activePair.prefix1.exampleMeaning}
              </p>
            </div>
          </div>
        </div>

        {/* Prefix 2 Column */}
        <div className="p-4 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/80 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-cyan-200/60 dark:border-cyan-800/60">
            <span className="font-mono text-base font-extrabold text-cyan-800 dark:text-cyan-300">
              {activePair.prefix2.name}
            </span>
            <Badge variant="secondary" size="sm">{activePair.prefix2.origin}</Badge>
          </div>

          <div className="text-xs space-y-2 text-surface-700 dark:text-surface-300">
            <p>
              <strong className="text-surface-900 dark:text-surface-100">Semantic Valence: </strong>
              {activePair.prefix2.tone}
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-cyan-200 dark:border-cyan-800 space-y-1">
              <span className="font-mono font-bold text-cyan-900 dark:text-cyan-200 block">
                "{activePair.prefix2.example}"
              </span>
              <p className="text-[0.6875rem] text-surface-600 dark:text-surface-400">
                {activePair.prefix2.exampleMeaning}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Golden Exam Distractor Trap Box */}
      <div className="p-3.5 rounded-xl bg-surface-900 dark:bg-surface-850 text-white border border-surface-800 dark:border-surface-700 space-y-1.5 shadow-xs">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
          <ShieldAlert size={16} />
          <span className="font-mono uppercase tracking-wider">High Court Exam Trap Strategy</span>
        </div>
        <p className="text-xs text-surface-200 leading-relaxed font-sans">
          {activePair.examTrap}
        </p>
      </div>
    </Card>
  )
}
