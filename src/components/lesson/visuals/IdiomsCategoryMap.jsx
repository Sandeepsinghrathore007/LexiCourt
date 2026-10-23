import { useState } from 'react'
import {
  FolderTree,
  Trophy,
  Briefcase,
  Lock,
  Smile,
  DollarSign,
  Clock,
  HeartHandshake,
  Compass,
  Scale,
  FileCheck
} from 'lucide-react'
import { Card, Badge } from '../../common'

const CATEGORIES = [
  {
    id: 'cat-success',
    name: 'Success & Achievement',
    icon: Trophy,
    color: 'border-amber-300 dark:border-amber-800 bg-amber-50/20 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300',
    count: 15,
    examples: ['Hit the jackpot', 'Make it', 'Get off the ground', 'Go places', 'Come out on top', 'Pull it off', 'Rise to the occasion', 'Be on the right track'],
    coreSituation: 'Reaching a milestone, overcoming severe obstacles, or launching a successful venture.',
    examTrap: "'Make it' (accomplish goal) ko 'make do' (manage somehow with deficiency) se confuse na karein."
  },
  {
    id: 'cat-effort',
    name: 'Effort, Work & Determination',
    icon: Briefcase,
    color: 'border-blue-300 dark:border-blue-800 bg-blue-50/20 dark:bg-blue-950/20 text-blue-800 dark:text-blue-300',
    count: 15,
    examples: ['Burn the midnight oil', 'Go the extra mile', 'Leave no stone unturned', 'Pull one\'s weight', 'Get down to business', 'Bite the bullet', 'Cut corners'],
    coreSituation: 'Rigorous diligence, late night study, team equity, facing unpleasant tasks, or improper shortcuts.',
    examTrap: "'Burn the midnight oil' (working late) vs 'work against the clock' (working fast against a deadline)."
  },
  {
    id: 'cat-secrets',
    name: 'Secrets & Communication',
    icon: Lock,
    color: 'border-purple-300 dark:border-purple-800 bg-purple-50/20 dark:bg-purple-950/20 text-purple-800 dark:text-purple-300',
    count: 15,
    examples: ['Spill the beans', 'Let the cat out of the bag', 'Keep under wraps', 'Beat around the bush', 'Get straight to the point', 'Hear through the grapevine', 'Clear the air'],
    coreSituation: 'Confidentiality, premature disclosure, indirect evasion, candor, and rumor networks.',
    examTrap: "Whistleblower disclosure ('spill the beans') vs external gossip reception ('hear through grapevine')."
  },
  {
    id: 'cat-emotions',
    name: 'Emotions & Personality',
    icon: Smile,
    color: 'border-rose-300 dark:border-rose-800 bg-rose-50/20 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300',
    count: 15,
    examples: ['Lose one\'s temper', 'Keep one\'s cool', 'Down in the dumps', 'On cloud nine', 'Butterflies in stomach', 'Get cold feet', 'A blessing in disguise', 'Chip on one\'s shoulder'],
    coreSituation: 'Anger, composure, depression, peak joy, anticipatory anxiety, hesitation, or chronic grievance.',
    examTrap: "'On cloud nine' (extreme joy) vs 'head in the clouds' (impractical daydreaming)."
  },
  {
    id: 'cat-money',
    name: 'Money & Resources',
    icon: DollarSign,
    color: 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300',
    count: 12,
    examples: ['Cost an arm and a leg', 'Break the bank', 'Make ends meet', 'Live from hand to mouth', 'Save for a rainy day', 'Worth weight in gold', 'Tighten one\'s belt', 'On a shoestring'],
    coreSituation: 'High commodity prices, living on small incomes, emergency savings, austerity, and lean budgets.',
    examTrap: "Expensive purchase ('cost an arm and a leg') vs human poverty ('live from hand to mouth')."
  },
  {
    id: 'cat-time',
    name: 'Time & Frequency',
    icon: Clock,
    color: 'border-indigo-300 dark:border-indigo-800 bg-indigo-50/20 dark:bg-indigo-950/20 text-indigo-800 dark:text-indigo-300',
    count: 12,
    examples: ['Once in a blue moon', 'In the nick of time', 'Around the clock', 'At the eleventh hour', 'Time flies', 'Ahead of one\'s time', 'In no time', 'Call it a day'],
    coreSituation: 'Extremely rare intervals, last-minute prevention, 24-hour labor, rapid speed, and end of day.',
    examTrap: "'Once in a blue moon' = Frequency (rarely); 'in the nick of time' = Deadline precision (just in time)."
  },
  {
    id: 'cat-relationships',
    name: 'Relationships & Conflict',
    icon: HeartHandshake,
    color: 'border-teal-300 dark:border-teal-800 bg-teal-50/20 dark:bg-teal-950/20 text-teal-800 dark:text-teal-300',
    count: 12,
    examples: ['See eye to eye', 'Bury the hatchet', 'Break the ice', 'Extend an olive branch', 'Cold shoulder', 'Through thick and thin', 'At loggerheads', 'Two peas in a pod'],
    coreSituation: 'Consensus, peacemaking after feud, initial ice-breaking, rejection, steadfast loyalty, and dispute.',
    examTrap: "'Break the ice' (strangers) vs 'bury the hatchet' (warring enemies reconciling)."
  },
  {
    id: 'cat-decisions',
    name: 'Decisions & Risk',
    icon: Compass,
    color: 'border-orange-300 dark:border-orange-800 bg-orange-50/20 dark:bg-orange-950/20 text-orange-800 dark:text-orange-300',
    count: 10,
    examples: ['Jump the gun', 'Play it by ear', 'Take the plunge', 'In two minds', 'Sit on the fence', 'A double-edged sword', 'Face the music', 'Put all eggs in one basket'],
    coreSituation: 'Premature haste, improvisation, bold commitments, hesitation, neutrality, and facing consequences.',
    examTrap: "'Jump the gun' (premature mistake) vs 'take the plunge' (bold calculated commitment)."
  },
  {
    id: 'cat-honesty',
    name: 'Honesty & Judgment',
    icon: Scale,
    color: 'border-cyan-300 dark:border-cyan-800 bg-cyan-50/20 dark:bg-cyan-950/20 text-cyan-800 dark:text-cyan-300',
    count: 10,
    examples: ['Turn a blind eye', 'Call a spade a spade', 'Tip of the iceberg', 'Let sleeping dogs lie', 'Pot calling kettle black', 'By the book', 'The writing is on the wall'],
    coreSituation: 'Deliberate oversight of wrong, blunt candor, latent problems, hypocrisy, and strict regulatory adherence.',
    examTrap: "'Turn a blind eye' (ignoring wrong) vs 'call a spade a spade' (bluntly exposing truth)."
  },
  {
    id: 'cat-admin',
    name: 'Courtroom & Administrative Phrases',
    icon: FileCheck,
    color: 'border-lime-300 dark:border-lime-800 bg-lime-50/20 dark:bg-lime-950/20 text-lime-800 dark:text-lime-300',
    count: 6,
    examples: ['In black and white', 'Null and void', 'By the book', 'Iron out', 'Safe and sound', 'Through and through'],
    coreSituation: 'Statutory compliance, legal validity, written documentation, and procedural consensus.',
    examTrap: "'Null and void' (no legal force) ko administrative delay ya temporary abeyance se alag rakhein."
  }
]

export default function IdiomsCategoryMap() {
  const [activeCatId, setActiveCatId] = useState(CATEGORIES[0].id)
  const activeCat = CATEGORIES.find((c) => c.id === activeCatId) || CATEGORIES[0]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Model 2</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">10 Situational Domains</span>
          </div>
          <h3 className="text-xl font-bold font-heading text-surface-900 dark:text-surface-50 flex items-center gap-2">
            <FolderTree size={20} className="text-primary-600 dark:text-primary-400" />
            Idioms Semantic Domain & Situation Map
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300 mt-1 max-w-3xl leading-relaxed">
            Idioms random lists nahi hote; ve 10 specific situational domains mein operate karte hain. Sentence ki situation identify karke direct target domain mein land karein.
          </p>
        </div>
      </div>

      {/* Domain Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCatId
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCatId(cat.id)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                isActive
                  ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/60 shadow-xs ring-1 ring-primary-500/30'
                  : 'border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600 bg-white dark:bg-surface-850'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Icon size={16} className={isActive ? 'text-primary-600 dark:text-primary-400' : 'text-surface-500'} />
                <span className="text-[0.625rem] font-bold text-surface-500 dark:text-surface-400">
                  {cat.count} items
                </span>
              </div>
              <p className={`text-xs font-bold leading-tight line-clamp-1 ${isActive ? 'text-primary-900 dark:text-primary-100' : 'text-surface-800 dark:text-surface-200'}`}>
                {cat.name}
              </p>
            </button>
          )
        })}
      </div>

      {/* Active Domain Detail Card */}
      <div className={`p-4 sm:p-5 rounded-2xl border ${activeCat.color} space-y-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700/60">
          <div className="flex items-center gap-2">
            <activeCat.icon size={20} />
            <h4 className="font-heading font-bold text-base sm:text-lg">
              {activeCat.name} Domain Architecture
            </h4>
          </div>
          <Badge variant="secondary" size="sm">
            {activeCat.count} Tested Expressions
          </Badge>
        </div>

        {/* Situational Context */}
        <div className="space-y-1">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider opacity-75">
            Core Situational Trigger:
          </span>
          <p className="text-xs sm:text-sm font-medium leading-relaxed">
            {activeCat.coreSituation}
          </p>
        </div>

        {/* Examples Pills */}
        <div className="space-y-1.5">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider opacity-75">
            Key Exam Idioms in this Domain:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeCat.examples.map((ex, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-white/80 dark:bg-surface-900/80 border border-surface-200 dark:border-surface-700 text-xs font-bold shadow-2xs"
              >
                {ex}
              </span>
            ))}
          </div>
        </div>

        {/* High Court Exam Trap Warning */}
        <div className="p-3 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-xs space-y-1">
          <span className="font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider text-[0.6875rem] block">
            High Court Exam Distractor Trap:
          </span>
          <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
            {activeCat.examTrap}
          </p>
        </div>
      </div>
    </Card>
  )
}
