import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { Card, Badge } from '../../common'

export default function UniversalTruthsComparison() {
  const [selectedCategory, setSelectedCategory] = useState('scientific') // 'scientific' | 'historical' | 'temporary' | 'continuing'

  const categories = {
    scientific: {
      id: 'scientific',
      badge: 'Universal / Scientific Truth',
      badgeVariant: 'success',
      governingTense: 'Past (demonstrated, proved)',
      subordinateTense: 'Simple Present (V₁ / V_s/es) — Mandatory',
      correctSentence: 'Galileo proved that the earth revolves around the sun.',
      incorrectSentence: 'Galileo proved that the earth revolved around the sun.',
      distractorTrap: '"Revolved" mein backshift mat karein. Planets ka suraj ke chakkar lagana ek continuous cosmological law hai, koi aisa beeta hua event nahi jo khatam ho chuka ho.',
      rules: [
        'Water boils at 100°C',
        'Light travels faster than sound',
        'The earth rotates on its axis',
        'Honesty is the best policy',
      ],
    },
    historical: {
      id: 'historical',
      badge: 'Historical Fact (Definite Past)',
      badgeVariant: 'error',
      governingTense: 'Past (stated, taught)',
      subordinateTense: 'Simple Past (V₂) — Mandatory',
      correctSentence: 'The lecturer stated that India attained independence in 1947.',
      incorrectSentence: 'The lecturer stated that India attains independence in 1947.',
      distractorTrap: 'Historical facts past ke khatam ho chuke period mein huye the. Ye universal truths nahi hain. Inhe kabhi bhi Simple Present mein shift na karein!',
      rules: [
        'India attained freedom in 1947',
        'World War I ended in 1918',
        'Emperor Ashoka renounced warfare',
        'Tagore wrote the national anthem',
      ],
    },
    temporary: {
      id: 'temporary',
      badge: 'Temporary Past State',
      badgeVariant: 'primary',
      governingTense: 'Past (claimed, said)',
      subordinateTense: 'Past Tense (was / were / V₂) — Standard Backshift',
      correctSentence: 'The witness claimed that he was at home that evening.',
      incorrectSentence: 'The witness claimed that he is at home that evening.',
      distractorTrap: 'Us specific past evening par ghar par hona ek temporary situation thi. Ye present mein nahi reh sakti aur iska "was" mein backshift hona zaroori hai.',
      rules: [
        'He was unwell yesterday',
        'The applicant was waiting outside',
        'The internet connection was disrupted',
        'The clerk was preparing the list',
      ],
    },
    continuing: {
      id: 'continuing',
      badge: 'Continuing Current Reality',
      badgeVariant: 'secondary',
      governingTense: 'Past (explained, confirmed)',
      subordinateTense: 'Simple Present (is / exists) — Permissible if still true',
      correctSentence: 'The tourist guide pointed out that the High Court is located on High Court Road.',
      incorrectSentence: 'The tourist guide pointed out that the High Court was situated on High Court Road (implies it moved).',
      distractorTrap: 'Agar geographic location aaj bhi wahi hai, toh Simple Present current validity preserve karta hai. Standard exams backshift accept karte hain jab tak present persistence explicitly highlight na ho.',
      rules: [
        'Mount Everest is the highest peak',
        'Jodhpur is known as the Sun City',
        'The High Court has its principal seat in Jodhpur',
        'The Thar Desert lies in western Rajasthan',
      ],
    },
  }

  const current = categories[selectedCategory]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[0.625rem] font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/80 px-2 py-0.5 rounded">
              VISUAL MODEL 04
            </span>
            <span className="text-xs text-surface-500 dark:text-surface-400">Critical Discrimination</span>
          </div>
          <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
            Universal Truth vs. Historical Fact vs. Temporary State
          </h3>
        </div>

        <Badge variant={current.badgeVariant} size="sm">
          {current.badge}
        </Badge>
      </div>

      <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed max-w-[85ch]">
        State judicial exams ka sabse common distractor hota hai universal laws aur historical facts ke beech confusion create karna. Niche click karke inke structural rules ka contrast dekhein:
      </p>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { id: 'scientific', label: '1. Universal / Scientific' },
          { id: 'historical', label: '2. Historical Past Fact' },
          { id: 'temporary', label: '3. Temporary Past State' },
          { id: 'continuing', label: '4. Continuing Reality' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedCategory(tab.id)}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
              selectedCategory === tab.id
                ? 'bg-primary-600 text-white border-primary-600 shadow-xs'
                : 'bg-surface-50 dark:bg-surface-800/60 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Comparative Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Correct Structure Card */}
        <div className="p-4 rounded-xl bg-success-50/50 dark:bg-success-950/20 border-2 border-success-300 dark:border-success-800 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-success-800 dark:text-success-300">
            <Check size={16} className="text-success-600 dark:text-success-400" />
            <span>Grammatically Correct (Sahi Form):</span>
          </div>
          <p className="font-mono text-xs font-bold text-success-950 dark:text-success-100 bg-white dark:bg-surface-900 p-2.5 rounded-lg border border-success-200 dark:border-success-900/50">
            "{current.correctSentence}"
          </p>
          <div className="text-[0.6875rem] text-success-800/90 dark:text-success-300/90 space-y-0.5">
            <p><strong>Subordinate Tense:</strong> {current.subordinateTense}</p>
          </div>
        </div>

        {/* Incorrect Distractor Card */}
        <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border-2 border-rose-300 dark:border-rose-800 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 dark:text-rose-300">
            <X size={16} className="text-rose-600 dark:text-rose-400" />
            <span>Classic Exam Distractor (GALAT Form):</span>
          </div>
          <p className="font-mono text-xs font-bold text-rose-950 dark:text-rose-200 bg-white dark:bg-surface-900 p-2.5 rounded-lg border border-rose-200 dark:border-rose-900/50 line-through">
            "{current.incorrectSentence}"
          </p>
          <div className="text-[0.6875rem] text-rose-800/90 dark:text-rose-300/90 space-y-0.5">
            <p><strong>Ye galat kyun hai:</strong> {current.distractorTrap}</p>
          </div>
        </div>
      </div>

      {/* Examples Checklist */}
      <div className="p-4 rounded-xl bg-surface-100/70 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700 space-y-2">
        <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-surface-600 dark:text-surface-400 block">
          Is Category ke High-Yield Patterns:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {current.rules.map((rule, idx) => (
            <div
              key={idx}
              className="p-2 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-surface-800 dark:text-surface-200 flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary-600 shrink-0" />
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
