import { useState } from 'react'
import { ArrowLeftRight, Check, Sparkles } from 'lucide-react'
import { Card, Badge } from '../../common'

const PAIRS = [
  {
    pairName: 'Break the ice vs Bury the hatchet',
    termA: {
      idiom: 'Break the ice',
      target: 'Strangers / New Groups',
      meaning: 'Shuruati jhijhak aur social awkwardness ko door karna.',
      example: 'The trainer shared a joke to break the ice among new clerks.'
    },
    termB: {
      idiom: 'Bury the hatchet',
      target: 'Enemies / Litigants',
      meaning: 'Purani dushmani ya lamba mukadma bhulakar sulah karna.',
      example: 'After twenty years in court, the rival brothers buried the hatchet.'
    },
    distinguishingTest: 'Participant History: Pehle dushmani thi toh "Bury the hatchet"; agar pehle se ajnabi the toh "Break the ice".'
  },
  {
    pairName: 'Cold feet vs Cold shoulder',
    termA: {
      idiom: 'Get cold feet',
      target: 'Self (Fear / Hesitation)',
      meaning: 'Aakhri moment par dar ke karan himmat kho dena ya plan chhodna.',
      example: 'The witness got cold feet and refused to step into the box.'
    },
    termB: {
      idiom: 'Give the cold shoulder',
      target: 'Other Person (Rejection)',
      meaning: 'Kisi doosre vyakti ko jaanbujhkar ignore karna ya rukhapan dikhana.',
      example: 'The committee members gave the whistleblower the cold shoulder.'
    },
    distinguishingTest: 'Direction of Action: Apne dar se pichhe hatna "Cold feet" hai; kisi doosre ko ignore karna "Cold shoulder" hai.'
  },
  {
    pairName: 'Burn midnight oil vs Work against the clock',
    termA: {
      idiom: 'Burn the midnight oil',
      target: 'Time of Day (Late Night)',
      meaning: 'Der raat tak jaagkar kadi mehnat ya study karna.',
      example: 'He burned the midnight oil for months to clear the judiciary.'
    },
    termB: {
      idiom: 'Work against the clock',
      target: 'Speed Pressure (Imminent Expiry)',
      meaning: 'Deadline pass hone ke karan tezi se samay se race lagana.',
      example: 'The emergency staff worked against the clock before the 5 PM cutoff.'
    },
    distinguishingTest: 'Core Constraint: Raat ke ghanton ka parishram "Midnight oil" hai; deadline beat karne ki speed "Against the clock" hai.'
  },
  {
    pairName: 'Jump the gun vs Take the plunge',
    termA: {
      idiom: 'Jump the gun',
      target: 'Hasty Mistake (Premature)',
      meaning: 'Nirdharit samay ya anumati se pehle jaldbazi mein kadam uthana.',
      example: 'The press jumped the gun by announcing the verdict too early.'
    },
    termB: {
      idiom: 'Take the plunge',
      target: 'Bold Commitment (Decisive)',
      meaning: 'Soch-samajhkar kafi hichkichahat ke baad bada bold kadam uthana.',
      example: 'After years of contemplation, she took the plunge into civil litigation.'
    },
    distinguishingTest: 'Foresight vs Blunder: "Jump the gun" bina soche ki gayi jaldbazi hai; "Take the plunge" deliberate decisive decision hai.'
  },
  {
    pairName: 'Cost an arm and a leg vs Live from hand to mouth',
    termA: {
      idiom: 'Cost an arm and a leg',
      target: 'Inanimate Commodity (Price)',
      meaning: 'Kisi vastu ya service ka hadd se zyada mehanga hona.',
      example: 'Importing proprietary hardware costs an arm and a leg.'
    },
    termB: {
      idiom: 'Live from hand to mouth',
      target: 'Human Household (Poverty)',
      meaning: 'Roz kamana aur roz khana; bhavishya ke liye koi bachat na hona.',
      example: 'The daily wage laborer lived from hand to mouth during the lockdown.'
    },
    distinguishingTest: 'Subject Grammatical Entity: Commodity mehangi hai toh "Cost an arm and a leg"; insaan garib hai toh "Hand to mouth".'
  },
  {
    pairName: 'Beat around the bush vs Call a spade a spade',
    termA: {
      idiom: 'Beat around the bush',
      target: 'Evasive Obfuscation (Indirect)',
      meaning: 'Mukhya baat ko chhodkar idhar-udhar ki aspasht baatein karna.',
      example: 'The officer beat around the bush instead of admitting the audit shortfall.'
    },
    termB: {
      idiom: 'Call a spade a spade',
      target: 'Blunt Candor (Direct)',
      meaning: 'Sach ko bina kisi laag-lapet ke bilkul seedhe shabdon mein bolna.',
      example: 'The senior auditor called a spade a spade regarding missing files.'
    },
    distinguishingTest: 'Communicative Directness: Dono exact antonyms hain: Evasion vs Blunt Truth.'
  },
  {
    pairName: 'On cloud nine vs Head in the clouds',
    termA: {
      idiom: 'On cloud nine',
      target: 'Peak Emotion (Ecstasy)',
      meaning: 'Atyadhik anandit aur khush hona (overjoyed).',
      example: 'Upon securing the top rank, she was on cloud nine.'
    },
    termB: {
      idiom: 'Head in the clouds',
      target: 'Cognitive Disconnect (Impractical)',
      meaning: 'Avyavaharik sapnon mein khoye rehna aur reality se door hona.',
      example: 'He has his head in the clouds if he thinks revision is unnecessary.'
    },
    distinguishingTest: 'Joy vs Reality Check: Khushi hai toh "On cloud nine"; impractical daydreaming hai toh "Head in the clouds".'
  },
  {
    pairName: 'Put foot down vs Put foot in mouth',
    termA: {
      idiom: 'Put one\'s foot down',
      target: 'Firm Authority (Strict Refusal)',
      meaning: 'Kisi baat par sakhti se mana karna ya strict order dena.',
      example: 'The registrar put his foot down against unauthorized leaves.'
    },
    termB: {
      idiom: 'Put one\'s foot in one\'s mouth',
      target: 'Social Blunder (Embarrassing)',
      meaning: 'Anjaane mein aisi baat bol dena jisse sharmindgi ho ya bura lage.',
      example: 'He put his foot in his mouth by asking about the confidential inquiry.'
    },
    distinguishingTest: 'Discipline vs Embarrassment: Authority dikhana "Foot down" hai; embarrassing baat bolna "Foot in mouth" hai.'
  }
]

export default function ConfusingIdiomsTable() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const activePair = PAIRS[selectedIdx]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Model 7</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Examiner Distractor Traps</span>
          </div>
          <h3 className="text-xl font-bold font-heading text-surface-900 dark:text-surface-50 flex items-center gap-2">
            <ArrowLeftRight size={20} className="text-primary-600 dark:text-primary-400" />
            Commonly Confused Lookalike Idioms Comparison Table
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300 mt-1 max-w-3xl leading-relaxed">
            High Court aur Rajasthan state exams mein options aksar in lookalike pairs se banaye jaate hain. Yeh decisive comparison table unke beech ke subtle boundary differences ko highlight karta hai.
          </p>
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {PAIRS.map((p, idx) => {
          const isActive = idx === selectedIdx
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200'
              }`}
            >
              {p.pairName}
            </button>
          )
        })}
      </div>

      {/* Active Pair Side-by-Side Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Term A */}
        <div className="p-4 sm:p-5 rounded-2xl border border-blue-200 dark:border-blue-900/40 bg-blue-50/20 dark:bg-blue-950/20 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-blue-200/60 dark:border-blue-800/60">
            <span className="font-heading font-bold text-sm sm:text-base text-blue-900 dark:text-blue-100">
              {activePair.termA.idiom}
            </span>
            <Badge variant="primary" size="sm">
              {activePair.termA.target}
            </Badge>
          </div>
          <p className="text-xs text-surface-700 dark:text-surface-300 leading-relaxed font-medium">
            {activePair.termA.meaning}
          </p>
          <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-blue-100 dark:border-blue-900/30 text-xs italic text-surface-800 dark:text-surface-200">
            "{activePair.termA.example}"
          </div>
        </div>

        {/* Term B */}
        <div className="p-4 sm:p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60 dark:border-emerald-800/60">
            <span className="font-heading font-bold text-sm sm:text-base text-emerald-900 dark:text-emerald-100">
              {activePair.termB.idiom}
            </span>
            <Badge variant="success" size="sm">
              {activePair.termB.target}
            </Badge>
          </div>
          <p className="text-xs text-surface-700 dark:text-surface-300 leading-relaxed font-medium">
            {activePair.termB.meaning}
          </p>
          <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-emerald-100 dark:border-emerald-900/30 text-xs italic text-surface-800 dark:text-surface-200">
            "{activePair.termB.example}"
          </div>
        </div>
      </div>

      {/* Decisive Distinguishing Test Box */}
      <div className="p-4 rounded-xl bg-primary-50/40 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800/50 space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-primary-800 dark:text-primary-200">
          <Sparkles size={16} />
          <span>Decisive Test in Competitive Exam:</span>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-surface-900 dark:text-surface-50 leading-relaxed">
          {activePair.distinguishingTest}
        </p>
      </div>
    </Card>
  )
}
