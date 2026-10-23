import { useState } from 'react'
import { ArrowLeftRight, Check, AlertTriangle, Layers, BookOpen } from 'lucide-react'
import { Card, Badge } from '../../common'

const COMPARISON_DATA = {
  synonyms: [
    {
      target: 'Commence vs Begin',
      pos: 'Verb',
      word1: { word: 'Commence', register: 'Formal / Judicial', context: 'High Court, statutory proceedings, formal ceremonies', example: 'The judicial bench will commence arguments at 10:30 AM sharp.' },
      word2: { word: 'Begin', register: 'Neutral / General', context: 'Everyday conversations, casual tasks, general events', example: 'Let us begin writing our rough practice notes.' },
      nuance: 'Dono ka denotative meaning "shuru hona" hai, lekin High Court administrative aur exam contexts mein "commence" formal register demand karta hai.',
      trap: 'Exam mein formal context hone par casual word "start/begin" distractor hota hai.'
    },
    {
      target: 'Economical vs Stingy / Miserly',
      pos: 'Adjective',
      word1: { word: 'Economical / Thrifty', register: 'Positive / Commendatory', context: 'Sensible resource utilization, efficient financial stewardship', example: 'The government initiated an economical procurement policy.' },
      word2: { word: 'Stingy / Miserly', register: 'Negative / Pejorative', context: 'Greedy, unwilling to spend even on essential necessities', example: 'The miserly contractor refused to supply safe helmets to workers.' },
      nuance: 'Ye core exam trap hai: "Economical" praise hai jabki "Miserly" contempt/gussa express karta hai. Dono interchangeable synonyms nahi ho sakte.',
      trap: 'Positive sentence context mein "economical" ki jagah "stingy" chunna -0.25 negative trap hai.'
    },
    {
      target: 'Courageous vs Foolhardy / Reckless',
      pos: 'Adjective',
      word1: { word: 'Courageous / Brave', register: 'Positive / Virtuous', context: 'Facing real danger with calculated, noble moral strength', example: 'The courageous whistleblower exposed internal corruption.' },
      word2: { word: 'Foolhardy / Reckless', register: 'Negative / Irrational', context: 'Senseless risk-taking without thinking of fatal consequences', example: 'It was a foolhardy decision to cross the flooded railway bridge.' },
      nuance: 'Dono danger face karte hain, lekin "Courageous" mein wisdom hoti hai jabki "Foolhardy" mein bevkufi aur rashness hoti hai.',
      trap: 'Descriptive context check karein: kya danger noble hai ya careless blunder?'
    },
    {
      target: 'Slender vs Emaciated / Scrawny',
      pos: 'Adjective',
      word1: { word: 'Slender / Slim', register: 'Positive / Aesthetic', context: 'Gracefully thin, healthy, elegant physical build', example: 'The dancer possessed a slender, athletic posture.' },
      word2: { word: 'Emaciated / Skeletal', register: 'Negative / Pathological', context: 'Abnormally thin due to severe starvation or chronic illness', example: 'The famine victims were severely emaciated upon rescue.' },
      nuance: 'Denotation "thin" hai, lekin "Slender" attractiveness darshata hai jabki "Emaciated" starvation/illness darshata hai.',
      trap: 'Medical ya poverty context mein "slender" galat hai; aesthetic context mein "emaciated" galat hai.'
    }
  ],
  antonyms: [
    {
      target: 'Innocent vs Guilty (Binary) vs Culpable',
      pos: 'Adjective',
      word1: { word: 'Innocent', type: 'Complementary / Binary Opposite', meaning: 'Free from guilt, not convicted', opposite: 'Guilty' },
      word2: { word: 'Blameless', type: 'Contextual / Moral Opposite', meaning: 'Free from moral censure', opposite: 'Culpable / Censurable' },
      nuance: 'Court of law mein status strictly binary hota hai: either Innocent or Guilty (koi middle ground nahi).',
      trap: 'Legal verdict context mein "Innocent" ka exact exam antonym "Guilty" hota hai, "Sinful" ya "Cruel" nahi.'
    },
    {
      target: 'Candid vs Evasive vs Deceitful',
      pos: 'Adjective',
      word1: { word: 'Candid / Frank', type: 'Gradable Quality', meaning: 'Direct, honest, outspoken in expression', opposite: 'Evasive / Guarded / Secretive' },
      word2: { word: 'Truthful', type: 'Fact-based Polarity', meaning: 'Conforming strictly to objective facts', opposite: 'False / Dishonest / Mendacious' },
      nuance: '"Candid" ka direct opposite "Evasive" ya "Secretive" hota hai (expression level), jabki "Mendacious" deliberate jhooth par focus karta hai.',
      trap: 'Exam mein "Candid" ke antonym mein "Dishonest" se behtar option "Guarded" ya "Secretive" hota hai agar communication style target ho.'
    },
    {
      target: 'Miserly vs Generous vs Extravagant',
      pos: 'Adjective',
      word1: { word: 'Miserly (Too little spending)', type: 'Extreme Negative End', meaning: 'Hoarding wealth, hating to spend', opposite: 'Extravagant / Profligate (Too much spending)' },
      word2: { word: 'Frugal (Balanced sensible spending)', type: 'Virtuous Golden Mean', meaning: 'Careful with money', opposite: 'Wasteful / Spendthrift' },
      nuance: 'Spending spectrum par teen points hote hain: Miserly (Extreme low) ➔ Frugal (Balanced) ➔ Extravagant (Extreme high). Opposite chunte waqt intensity polarity match karein.',
      trap: '"Miserly" (extreme minus) ka true antonym "Extravagant" (extreme plus) hota hai, sirf general "kind" nahi.'
    },
    {
      target: 'Transient vs Permanent vs Eternal',
      pos: 'Adjective',
      word1: { word: 'Transient / Ephemeral', type: 'Temporal Duration', meaning: 'Lasting for a brief, fleeting moment', opposite: 'Permanent / Perennial / Enduring' },
      word2: { word: 'Temporary', type: 'Scheduled Provision', meaning: 'Arranged for a limited term', opposite: 'Permanent' },
      nuance: '"Transient" life ya beauty ki fleeting nature ke liye use hota hai; "Temporary" administrative posts ya injunctions ke liye use hota hai.',
      trap: 'Nature / philosophical context mein "Transient" ka best opposite "Enduring / Eternal" hota hai.'
    }
  ]
}

export default function SynonymAntonymComparator() {
  const [activeTab, setActiveTab] = useState('synonyms')
  const [selectedIdx, setSelectedIdx] = useState(0)

  const list = COMPARISON_DATA[activeTab]
  const currentItem = list[selectedIdx] || list[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-100 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Visual 1 • Architectural Comparator</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Near-Synonym Nuance & Antonym Typologies</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50 mt-1">
            Exact vs Near-Synonym & Direct vs Contextual Antonym Comparative Matrix
          </h3>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 text-xs">
          <button
            type="button"
            onClick={() => { setActiveTab('synonyms'); setSelectedIdx(0) }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'synonyms'
                ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900'
            }`}
          >
            Near-Synonyms Nuance (4)
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('antonyms'); setSelectedIdx(0) }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'antonyms'
                ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900'
            }`}
          >
            Antonym Contrasts (4)
          </button>
        </div>
      </div>

      {/* Item Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {list.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedIdx(idx)}
            className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
              selectedIdx === idx
                ? 'border-primary-500 bg-primary-50/70 dark:bg-primary-950/40 text-primary-950 dark:text-primary-200 shadow-xs'
                : 'border-surface-200 dark:border-surface-750 bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:border-surface-300'
            }`}
          >
            <span className="block truncate">{item.target}</span>
            <span className="text-[0.625rem] text-surface-500 font-mono mt-0.5 block">{item.pos}</span>
          </button>
        ))}
      </div>

      {/* Side-by-Side Comparison Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Word 1 Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50/60 to-surface-50 dark:from-blue-950/20 dark:to-surface-850 border border-blue-200 dark:border-blue-900/60 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold font-heading text-blue-950 dark:text-blue-100">
              {activeTab === 'synonyms' ? currentItem.word1.word : currentItem.word1.word}
            </span>
            <Badge variant="primary" size="sm">
              {activeTab === 'synonyms' ? currentItem.word1.register : currentItem.word1.type}
            </Badge>
          </div>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            {activeTab === 'synonyms' ? (
              <><strong>Proper Context:</strong> {currentItem.word1.context}</>
            ) : (
              <><strong>Core Meaning:</strong> {currentItem.word1.meaning}</>
            )}
          </p>
          {activeTab === 'synonyms' ? (
            <div className="p-2 rounded-lg bg-white dark:bg-surface-900 border border-blue-100 dark:border-blue-900/40 text-[0.75rem] text-surface-700 dark:text-surface-300 italic">
              &ldquo;{currentItem.word1.example}&rdquo;
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-danger-600 dark:text-danger-400">Direct Opposite:</span>
              <span className="px-2 py-0.5 rounded bg-danger-50 dark:bg-danger-950/60 text-danger-800 dark:text-danger-200 font-mono font-bold">
                {currentItem.word1.opposite}
              </span>
            </div>
          )}
        </div>

        {/* Word 2 Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50/60 to-surface-50 dark:from-amber-950/20 dark:to-surface-850 border border-amber-200 dark:border-amber-900/60 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold font-heading text-amber-950 dark:text-amber-100">
              {activeTab === 'synonyms' ? currentItem.word2.word : currentItem.word2.word}
            </span>
            <Badge variant="secondary" size="sm">
              {activeTab === 'synonyms' ? currentItem.word2.register : currentItem.word2.type}
            </Badge>
          </div>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            {activeTab === 'synonyms' ? (
              <><strong>Proper Context:</strong> {currentItem.word2.context}</>
            ) : (
              <><strong>Core Meaning:</strong> {currentItem.word2.meaning}</>
            )}
          </p>
          {activeTab === 'synonyms' ? (
            <div className="p-2 rounded-lg bg-white dark:bg-surface-900 border border-amber-100 dark:border-amber-900/40 text-[0.75rem] text-surface-700 dark:text-surface-300 italic">
              &ldquo;{currentItem.word2.example}&rdquo;
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-danger-600 dark:text-danger-400">Contextual Opposite:</span>
              <span className="px-2 py-0.5 rounded bg-danger-50 dark:bg-danger-950/60 text-danger-800 dark:text-danger-200 font-mono font-bold">
                {currentItem.word2.opposite}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Critical Exam Nuance & Trap Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        <div className="p-3 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 text-xs text-surface-700 dark:text-surface-300 leading-relaxed">
          <strong className="text-primary-700 dark:text-primary-300 font-bold block mb-1">
            Linguistic Nuance Distinction:
          </strong>
          {currentItem.nuance}
        </div>
        <div className="p-3 rounded-xl bg-danger-50/40 dark:bg-danger-950/20 border border-danger-200 dark:border-danger-900/60 text-xs text-danger-900 dark:text-danger-200 leading-relaxed">
          <strong className="text-danger-700 dark:text-danger-400 font-bold block mb-1 flex items-center gap-1.5">
            <AlertTriangle size={13} />
            High Court Exam Distractor Trap:
          </strong>
          {currentItem.trap}
        </div>
      </div>
    </Card>
  )
}
