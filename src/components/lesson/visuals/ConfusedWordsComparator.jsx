import { useState, useMemo } from 'react'
import { Search, BookOpen } from 'lucide-react'
import { Card, Badge } from '../../common'

const CONFUSED_PAIRS = [
  {
    pair: 'Affect vs Effect',
    category: 'pos',
    word1: { word: 'Affect', pos: 'Verb', meaning: 'To influence or alter (asar daalna)', example: 'The court\'s new guidelines will directly affect all pending appeals.' },
    word2: { word: 'Effect', pos: 'Noun', meaning: 'The result, outcome, or impact (nateeja/prabhav)', example: 'The landmark verdict had an immediate effect on administrative policies.' },
    distinction: 'Determiner ya adjective ke baad NOUN "effect" aayega; auxiliary verb ke baad ACTION "affect" aayega.',
    mistake: '*The new rule had no affect (Incorrect!). Sahi: had no EFFECT.'
  },
  {
    pair: 'Advice vs Advise',
    category: 'pos',
    word1: { word: 'Advice', pos: 'Noun (Uncountable)', meaning: 'Guidance, recommendation (salah/mashwara)', example: 'The senior counsel gave him sound advice on cross-examination.' },
    word2: { word: 'Advise', pos: 'Verb', meaning: 'To recommend or suggest (salah dena)', example: 'I strongly advise you to file the vakalatnama today.' },
    distinction: 'Advice uncountable noun hai (never *an advice or *advices). Advise action verb hai.',
    mistake: '*He gave me an advice (Incorrect!). Sahi: gave me ADVICE / a piece of advice.'
  },
  {
    pair: 'Principal vs Principle',
    category: 'pos',
    word1: { word: 'Principal', pos: 'Noun / Adjective', meaning: 'Head of institution, main/primary, capital sum', example: 'The principal bench of the High Court is situated in Jodhpur.' },
    word2: { word: 'Principle', pos: 'Noun only', meaning: 'Fundamental rule, law, doctrine, moral belief (sidhant)', example: 'Natural justice is an inviolable principle of administrative law.' },
    distinction: 'Principal can be an adjective (main issue); Principle is strictly a noun (rule ends in -le).',
    mistake: '*The principle reason for appeal (Incorrect!). Sahi: the PRINCIPAL reason.'
  },
  {
    pair: 'Accept vs Except',
    category: 'pos',
    word1: { word: 'Accept', pos: 'Verb', meaning: 'To receive willingly or consent to (swikar karna)', example: 'The court accepted the certified copy of the decree.' },
    word2: { word: 'Except', pos: 'Preposition / Conjunction', meaning: 'Excluding, apart from (chhodkar / ke alawa)', example: 'All respondents were served notice except the fifth defendant.' },
    distinction: 'Accept with A is to receive; Except with Ex is to exclude.',
    mistake: '*The judge excepts the apology (Incorrect!). Sahi: ACCEPTS the apology.'
  },
  {
    pair: 'Lie vs Lay',
    category: 'action',
    word1: { word: 'Lie (lie, lay, lain)', pos: 'Intransitive Verb', meaning: 'To recline, rest, or be situated (letna; NO OBJECT)', example: 'The case files lay on the bench all afternoon yesterday.' },
    word2: { word: 'Lay (lay, laid, laid)', pos: 'Transitive Verb', meaning: 'To place or set something down (rakhna; REQUIRES OBJECT)', example: 'The clerk laid the affidavits on the magistrate\'s table.' },
    distinction: 'Lie ka past tense LAY hota hai! Agar direct object nahi hai, toh past mein "lay" lagayein, "laid" nahi.',
    mistake: '*The file was laying on the table (Incorrect!). Sahi: was LYING on the table.'
  },
  {
    pair: 'Rise vs Raise',
    category: 'action',
    word1: { word: 'Rise (rise, rose, risen)', pos: 'Intransitive Verb', meaning: 'To move upward on its own (khud uthna; NO OBJECT)', example: 'Litigants must rise when the judicial bench enters.' },
    word2: { word: 'Raise (raise, raised, raised)', pos: 'Transitive Verb', meaning: 'To elevate or present something (uthana; REQUIRES OBJECT)', example: 'The defense counsel raised a preliminary objection on maintainability.' },
    distinction: 'Rise requires zero object; Raise must take a direct object (raised his hand, raised an objection).',
    mistake: '*The lawyer rose an objection (Incorrect!). Sahi: RAISED an objection.'
  },
  {
    pair: 'Borrow vs Lend',
    category: 'action',
    word1: { word: 'Borrow', pos: 'Verb', meaning: 'To take temporarily with promise to return (udhaar lena)', example: 'The junior advocate borrowed the law report from the library.' },
    word2: { word: 'Lend', pos: 'Verb', meaning: 'To give temporarily expecting return (udhaar dena)', example: 'The librarian agreed to lend him the reference manual for three days.' },
    distinction: 'Borrow is inward transfer (taking); Lend is outward transfer (giving).',
    mistake: '*Can you borrow me your manual? (Incorrect!). Sahi: Can you LEND me your manual?'
  },
  {
    pair: 'Fewer vs Less',
    category: 'count',
    word1: { word: 'Fewer', pos: 'Determiner', meaning: 'Smaller number of plural countable items (sankhya mein kam)', example: 'There were fewer writ petitions filed this week than last week.' },
    word2: { word: 'Less', pos: 'Determiner', meaning: 'Smaller amount of uncountable mass/abstract items (matra mein kam)', example: 'The summary trial required less judicial time than a regular suit.' },
    distinction: 'Plural countable nouns taking "s" demand FEWER. Mass/abstract nouns demand LESS.',
    mistake: '*Less applicants cleared the test (Incorrect!). Sahi: FEWER applicants.'
  },
  {
    pair: 'Beside vs Besides',
    category: 'count',
    word1: { word: 'Beside', pos: 'Preposition', meaning: 'Next to, by the side of (paas mein / bagal mein)', example: 'The defense attorney stood beside the accused at the bar.' },
    word2: { word: 'Besides', pos: 'Preposition / Adverb', meaning: 'In addition to, apart from (ke atirikt / ke alawa)', example: 'Besides criminal appeals, he regularly argues tax revision matters.' },
    distinction: 'Beside without "s" is physical spatial location; Besides with "s" is addition.',
    mistake: '*Beside criminal law, he knows civil law (Incorrect!). Sahi: BESIDES criminal law.'
  },
  {
    pair: 'Its vs It\'s',
    category: 'orthography',
    word1: { word: 'Its', pos: 'Possessive Determiner', meaning: 'Belonging to it (iska/unki; zero apostrophe)', example: 'The high court delivered its landmark judgment in open court.' },
    word2: { word: 'It\'s', pos: 'Contraction', meaning: 'Short form of "it is" or "it has"', example: 'It\'s evident from the order sheet that notice was properly served.' },
    distinction: 'Possessive pronouns never take an apostrophe. Expand to "it is" to verify.',
    mistake: '*The court issued it\'s warrant (Incorrect!). Sahi: issued ITS warrant.'
  },
  {
    pair: 'Stationary vs Stationery',
    category: 'orthography',
    word1: { word: 'Stationary', pos: 'Adjective', meaning: 'Fixed, immobile, not moving (sthir/achala)', example: 'The prison transport van remained stationary outside the gate.' },
    word2: { word: 'Stationery', pos: 'Noun', meaning: 'Writing materials, paper, envelopes, pens (likhne ka samaan)', example: 'The registrar approved the annual indent for court stationery.' },
    distinction: 'StationAry with A means immovAble; StationEry with E is for Envelopes.',
    mistake: '*Purchased legal stationary (Incorrect!). Sahi: legal STATIONERY.'
  },
  {
    pair: 'Farther vs Further',
    category: 'count',
    word1: { word: 'Farther', pos: 'Adverb / Adjective', meaning: 'Greater physical measurable distance in km/miles', example: 'The district jail is five kilometers farther down the bypass road.' },
    word2: { word: 'Further', pos: 'Adverb / Adjective', meaning: 'Additional, to a greater degree, extension of time', example: 'The magistrate ordered further investigation into the allegations.' },
    distinction: 'Farther is for road distance; Further is for additional progress or depth.',
    mistake: '*Until farther orders (Incorrect!). Sahi: until FURTHER orders.'
  }
]

const CATEGORIES = [
  { id: 'all', label: 'All Pairs (12)' },
  { id: 'pos', label: 'Part of Speech Clashes' },
  { id: 'action', label: 'Action & Transitivity' },
  { id: 'count', label: 'Countability & Nuance' },
  { id: 'orthography', label: 'Orthography & Homophones' }
]

export default function ConfusedWordsComparator() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPairs = useMemo(() => {
    return CONFUSED_PAIRS.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory
      const query = searchQuery.toLowerCase().trim()
      const matchSearch =
        !query ||
        item.pair.toLowerCase().includes(query) ||
        item.word1.word.toLowerCase().includes(query) ||
        item.word2.word.toLowerCase().includes(query) ||
        item.distinction.toLowerCase().includes(query)
      return matchCat && matchSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300">
              <BookOpen size={16} />
            </span>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Visual Map 6: Commonly Confused Words Comparator
            </h3>
          </div>
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
            Affect/Effect, Lie/Lay, Principal/Principle, Its/It's jaise high-frequency paronyms aur homophones ka exact syntactic audit
          </p>
        </div>
        <Badge variant="primary" size="sm">
          {filteredPairs.length} Active Pairs
        </Badge>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search word pair (e.g. affect, lie, principal)..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <div className="flex flex-wrap gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2.5 py-1 rounded-lg text-[0.6875rem] font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pairs Grid */}
      <div className="space-y-3">
        {filteredPairs.map((p, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50/60 dark:bg-surface-850/60 space-y-3"
          >
            <div className="flex items-center justify-between gap-2 border-b border-surface-200 dark:border-surface-700 pb-2">
              <span className="font-heading font-bold text-sm text-surface-900 dark:text-surface-50">
                {p.pair}
              </span>
              <Badge variant="secondary" size="sm">
                Exam Pair
              </Badge>
            </div>

            {/* Two Columns for the two words */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-primary-700 dark:text-primary-300 font-mono text-sm">{p.word1.word}</strong>
                  <span className="text-[0.625rem] px-1.5 py-0.5 rounded bg-surface-100 dark:bg-surface-800 text-surface-600 font-medium">{p.word1.pos}</span>
                </div>
                <p className="text-surface-700 dark:text-surface-300">{p.word1.meaning}</p>
                <p className="text-surface-500 italic text-[0.6875rem]">"{p.word1.example}"</p>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-amber-700 dark:text-amber-300 font-mono text-sm">{p.word2.word}</strong>
                  <span className="text-[0.625rem] px-1.5 py-0.5 rounded bg-surface-100 dark:bg-surface-800 text-surface-600 font-medium">{p.word2.pos}</span>
                </div>
                <p className="text-surface-700 dark:text-surface-300">{p.word2.meaning}</p>
                <p className="text-surface-500 italic text-[0.6875rem]">"{p.word2.example}"</p>
              </div>
            </div>

            {/* Distinction & Mistake */}
            <div className="space-y-1 text-xs">
              <p className="text-primary-800 dark:text-primary-200 leading-relaxed font-medium">
                <strong>Crucial Distinction: </strong>
                {p.distinction}
              </p>
              <p className="text-danger-700 dark:text-danger-400 font-mono text-[0.6875rem]">
                {p.mistake}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
