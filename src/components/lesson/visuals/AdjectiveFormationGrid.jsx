import { useState, useMemo } from 'react'
import { Sparkles, Search } from 'lucide-react'
import { Card, Badge } from '../../common'

const ADJECTIVE_DATA = [
  // Monosyllable
  { positive: 'tall', comparative: 'taller', superlative: 'tallest', rule: 'Monosyllable Direct -er/-est', category: 'monosyllable', note: 'Standard single-syllable direct suffix addition.' },
  { positive: 'bold', comparative: 'bolder', superlative: 'boldest', rule: 'Monosyllable Direct -er/-est', category: 'monosyllable', note: 'Long vowel/consonant cluster; no doubling.' },
  { positive: 'fast', comparative: 'faster', superlative: 'fastest', rule: 'Monosyllable Direct -er/-est', category: 'monosyllable', note: 'Dual consonant ending (-st); direct addition.' },
  { positive: 'small', comparative: 'smaller', superlative: 'smallest', rule: 'Monosyllable Direct -er/-est', category: 'monosyllable', note: 'Ending in -ll; direct addition.' },

  // Silent -e
  { positive: 'brave', comparative: 'braver', superlative: 'bravest', rule: 'Silent -e (Drop extra e)', category: 'silent-e', note: 'Ends in silent -e; add only -r and -st.' },
  { positive: 'wise', comparative: 'wiser', superlative: 'wisest', rule: 'Silent -e (Drop extra e)', category: 'silent-e', note: 'Silent -e; no double "ee" allowed.' },
  { positive: 'fine', comparative: 'finer', superlative: 'finest', rule: 'Silent -e (Drop extra e)', category: 'silent-e', note: 'Silent -e; direct -r/-st.' },
  { positive: 'large', comparative: 'larger', superlative: 'largest', rule: 'Silent -e (Drop extra e)', category: 'silent-e', note: 'Silent -e; direct -r/-st.' },

  // CVC Doubling
  { positive: 'big', comparative: 'bigger', superlative: 'biggest', rule: 'CVC Consonant Doubling', category: 'cvc-doubling', note: 'Short vowel + single consonant; double final "g".' },
  { positive: 'hot', comparative: 'hotter', superlative: 'hottest', rule: 'CVC Consonant Doubling', category: 'cvc-doubling', note: 'Short vowel + single consonant; double final "t".' },
  { positive: 'fat', comparative: 'fatter', superlative: 'fattest', rule: 'CVC Consonant Doubling', category: 'cvc-doubling', note: 'Short vowel + single consonant; double final "t".' },
  { positive: 'thin', comparative: 'thinner', superlative: 'thinnest', rule: 'CVC Consonant Doubling', category: 'cvc-doubling', note: 'Short vowel + single consonant; double final "n".' },
  { positive: 'sad', comparative: 'sadder', superlative: 'saddest', rule: 'CVC Consonant Doubling', category: 'cvc-doubling', note: 'Short vowel + single consonant; double final "d".' },

  // Consonant + Y
  { positive: 'heavy', comparative: 'heavier', superlative: 'heaviest', rule: 'Consonant + y ➔ -ier/-iest', category: 'y-to-ier', note: 'Consonant "v" + y; y changes to i.' },
  { positive: 'happy', comparative: 'happier', superlative: 'happiest', rule: 'Consonant + y ➔ -ier/-iest', category: 'y-to-ier', note: 'Consonant "p" + y; y changes to i.' },
  { positive: 'easy', comparative: 'easier', superlative: 'easiest', rule: 'Consonant + y ➔ -ier/-iest', category: 'y-to-ier', note: 'Consonant "s" + y; y changes to i.' },
  { positive: 'dirty', comparative: 'dirtier', superlative: 'dirtiest', rule: 'Consonant + y ➔ -ier/-iest', category: 'y-to-ier', note: 'Consonant "t" + y; y changes to i.' },

  // Multi-syllabic (3+ syllables)
  { positive: 'beautiful', comparative: 'more beautiful', superlative: 'most beautiful', rule: 'Multi-Syllabic Periphrastic', category: 'multi-syllabic', note: '3 syllables; uses "more" and "most".' },
  { positive: 'diligent', comparative: 'more diligent', superlative: 'most diligent', rule: 'Multi-Syllabic Periphrastic', category: 'multi-syllabic', note: '3 syllables; uses "more" and "most".' },
  { positive: 'courageous', comparative: 'more courageous', superlative: 'most courageous', rule: 'Multi-Syllabic Periphrastic', category: 'multi-syllabic', note: 'Suffix -ous; uses "more" and "most".' },
  { positive: 'persuasive', comparative: 'more persuasive', superlative: 'most persuasive', rule: 'Multi-Syllabic Periphrastic', category: 'multi-syllabic', note: 'Suffix -ive; uses "more" and "most".' },

  // Irregular Suppletion
  { positive: 'good / well', comparative: 'better', superlative: 'best', rule: 'Irregular Suppletion', category: 'irregular', note: 'Completely different root words. Never *gooder.' },
  { positive: 'bad / ill', comparative: 'worse', superlative: 'worst', rule: 'Irregular Suppletion', category: 'irregular', note: 'Completely different root words. Never *badder.' },
  { positive: 'little', comparative: 'less / lesser', superlative: 'least', rule: 'Irregular Suppletion', category: 'irregular', note: 'Refers to quantity/amount. Never *littler.' },
  { positive: 'much / many', comparative: 'more', superlative: 'most', rule: 'Irregular Suppletion', category: 'irregular', note: 'Much (uncountable) / Many (countable).' },
  { positive: 'far', comparative: 'farther / further', superlative: 'farthest / furthest', rule: 'Irregular Suppletion', category: 'irregular', note: 'Farther (physical distance) / Further (additional/abstract).' },
  { positive: 'late', comparative: 'later / latter', superlative: 'latest / last', rule: 'Irregular Suppletion', category: 'irregular', note: 'Later/latest (time) vs Latter/last (order/position).' },
  { positive: 'old', comparative: 'older / elder', superlative: 'oldest / eldest', rule: 'Irregular Suppletion', category: 'irregular', note: 'Elder/eldest strictly for family relations without "than".' },
]

const CATEGORIES = [
  { id: 'all', label: 'All Adjectives' },
  { id: 'monosyllable', label: 'Monosyllables (-er/-est)' },
  { id: 'silent-e', label: 'Silent -e' },
  { id: 'cvc-doubling', label: 'CVC Doubling' },
  { id: 'y-to-ier', label: 'Consonant + y' },
  { id: 'multi-syllabic', label: '3+ Syllables (More/Most)' },
  { id: 'irregular', label: 'Irregular Suppletion' },
]

export default function AdjectiveFormationGrid() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAdjectives = useMemo(() => {
    return ADJECTIVE_DATA.filter((adj) => {
      const matchCategory = activeCategory === 'all' || adj.category === activeCategory
      const matchSearch =
        searchTerm === '' ||
        adj.positive.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adj.comparative.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adj.superlative.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adj.rule.toLowerCase().includes(searchTerm.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [activeCategory, searchTerm])

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 flex items-center justify-center font-bold">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Interactive Adjective Formation & Spelling Rules Explorer
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-400">
              Regular suffixes, CVC consonant doubling, -y shifts, aur high-frequency irregular adjectives
            </p>
          </div>
        </div>
        <Badge variant="primary" size="sm">Spatial Model 2</Badge>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-60">
          <Search size={14} className="absolute left-3 top-2.5 text-surface-400" />
          <input
            type="text"
            placeholder="Search adjective..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-surface-800 dark:text-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Adjectives Table */}
      <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-700">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-100 dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 font-heading font-bold">
            <tr>
              <th className="p-3">Positive Degree</th>
              <th className="p-3">Comparative Degree</th>
              <th className="p-3">Superlative Degree</th>
              <th className="p-3">Morphological Rule</th>
              <th className="p-3">Exam Nuance Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-200 dark:divide-surface-700 bg-white dark:bg-surface-850">
            {filteredAdjectives.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors"
              >
                <td className="p-3 font-semibold font-mono text-surface-900 dark:text-surface-100">
                  {item.positive}
                </td>
                <td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-300">
                  {item.comparative}
                </td>
                <td className="p-3 font-mono font-bold text-emerald-700 dark:text-emerald-300">
                  {item.superlative}
                </td>
                <td className="p-3 text-surface-600 dark:text-surface-400 font-medium">
                  <span className="px-2 py-0.5 rounded bg-surface-100 dark:bg-surface-700 text-[0.6875rem]">
                    {item.rule}
                  </span>
                </td>
                <td className="p-3 text-surface-500 dark:text-surface-400 text-[0.6875rem] max-w-xs">
                  {item.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
