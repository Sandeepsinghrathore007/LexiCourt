import { useState, useMemo } from 'react'
import { Table, Search, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Card, Badge } from '../../common'

const CONFUSING_PAIRS = [
  {
    pair: 'Autobiography vs Biography',
    domain: 'Literature',
    term1: { word: 'Autobiography', meaning: 'Life story written by oneself (Auto = self)' },
    term2: { word: 'Biography', meaning: 'Life story written by someone else' },
    limitingClue: 'Author identity: "Written by HIMSELF" = Autobiography; "by another person" = Biography.',
    examTrap: 'Bina author check kiye generic word "Life story" dekh kar galat mark karna.'
  },
  {
    pair: 'Arbitrator vs Mediator',
    domain: 'Legal',
    term1: { word: 'Arbitrator', meaning: 'Official adjudicator whose verdict is legally binding' },
    term2: { word: 'Mediator', meaning: 'Neutral facilitator helping parties reach mutual compromise' },
    limitingClue: 'Authority level: "LEGALLY BINDING decision / award" = Arbitrator; "facilitate settlement" = Mediator.',
    examTrap: 'Mediator ko binding power assign karna.'
  },
  {
    pair: 'Epitaph vs Eulogy vs Elegy',
    domain: 'Memorial',
    term1: { word: 'Epitaph', meaning: 'Inscription carved on a tombstone or monument' },
    term2: { word: 'Eulogy', meaning: 'Speech or essay of high praise delivered after death' },
    term3: { word: 'Elegy', meaning: 'Poem or verse expressing grief and mourning for the dead' },
    limitingClue: 'Medium: Inscription on stone = Epitaph; Speech of praise = Eulogy; Poem = Elegy.',
    examTrap: 'Tombstone ke inscription ke liye Eulogy ya Elegy mark kar dena.'
  },
  {
    pair: 'Polyglot vs Linguist',
    domain: 'Language',
    term1: { word: 'Polyglot', meaning: 'Person who speaks, writes, or uses several languages' },
    term2: { word: 'Linguist', meaning: 'Scholar who scientifically studies the structure of language' },
    limitingClue: 'Skill vs Science: "Speaks many languages" = Polyglot; "Studies language scientifically" = Linguist.',
    examTrap: 'Linguist ko multilingual speaker samajhna.'
  },
  {
    pair: 'Atheist vs Agnostic',
    domain: 'Theology',
    term1: { word: 'Atheist', meaning: 'Person who does not believe in the existence of God' },
    term2: { word: 'Agnostic', meaning: 'Person claiming God is unknown or unknowable to human knowledge' },
    limitingClue: 'Belief vs Knowledge: "Does not believe" = Atheist; "Claims knowledge is unknowable" = Agnostic.',
    examTrap: 'Agnostic ko atheist ka synonym samajhna.'
  },
  {
    pair: 'Egoist vs Egotist',
    domain: 'Personality',
    term1: { word: 'Egoist', meaning: 'Self-centred person who puts own interests first in actions' },
    term2: { word: 'Egotist', meaning: 'Conceited person who constantly talks boastfully about himself' },
    limitingClue: 'Action vs Talk: Mnemonic "T" for Talk in Egotist (boastful talker).',
    examTrap: 'Selfish person aur boastful speaker ke subtle difference ko bhoolna.'
  },
  {
    pair: 'Apiary vs Aviary',
    domain: 'Enclosures',
    term1: { word: 'Apiary', meaning: 'Place where bees are kept in hives (Latin: apis)' },
    term2: { word: 'Aviary', meaning: 'Large cage or enclosure where birds are kept (Latin: avis)' },
    limitingClue: 'Species: Bees = Apiary; Birds = Aviary.',
    examTrap: 'Apiary aur Aviary ke spellings mein P aur V ka confusion.'
  },
  {
    pair: 'Biannual vs Biennial',
    domain: 'Time',
    term1: { word: 'Biannual', meaning: 'Occurring twice within a single year (semiannual)' },
    term2: { word: 'Biennial', meaning: 'Occurring once every two years (every alternate year)' },
    limitingClue: 'Interval: 2 times in 1 year = Biannual; 1 time in 2 years = Biennial.',
    examTrap: 'Do saal mein ek baar hone wale event ke liye Biannual mark karna.'
  },
  {
    pair: 'Emigrant vs Immigrant vs Refugee',
    domain: 'Migration',
    term1: { word: 'Emigrant', meaning: 'Person who leaves their own country to live abroad' },
    term2: { word: 'Immigrant', meaning: 'Person who comes into a foreign country to settle' },
    term3: { word: 'Refugee', meaning: 'Person fleeing home country due to war or persecution' },
    limitingClue: 'Vector: Exiting country = Emigrant; Coming in = Immigrant; Fleeing danger = Refugee.',
    examTrap: 'In-coming aur outgoing movement direction ko mix karna.'
  },
  {
    pair: 'Acquit vs Absolve',
    domain: 'Judicial',
    term1: { word: 'Acquit', meaning: 'Declare not guilty of criminal charges in a court of law' },
    term2: { word: 'Absolve', meaning: 'Declare free from moral guilt, blame, or spiritual sin' },
    limitingClue: 'Jurisdiction: Court trial verdict = Acquit; Moral/spiritual relief = Absolve.',
    examTrap: 'Adalat ke faisle ke liye Absolve mark kar dena.'
  },
  {
    pair: 'Prosecute vs Persecute',
    domain: 'Actions',
    term1: { word: 'Prosecute', meaning: 'Institute formal lawful legal proceedings against someone' },
    term2: { word: 'Persecute', meaning: 'Subject someone to persistent hostility, harassment, and ill-treatment' },
    limitingClue: 'Legality: Lawful court proceedings = Prosecute; Unlawful harassment = Persecute.',
    examTrap: 'Court trial ke liye soundalike Persecute chun lena.'
  },
  {
    pair: 'Mitigate vs Exacerbate',
    domain: 'Processes',
    term1: { word: 'Mitigate', meaning: 'Make something bad or painful less severe (alleviate)' },
    term2: { word: 'Exacerbate', meaning: 'Make a problem or bad condition worse and more severe' },
    limitingClue: 'Valence Direction: Make less severe = Mitigate; Make worse = Exacerbate.',
    examTrap: 'Problem badhane ke liye Mitigate mark karna.'
  },
  {
    pair: 'Abdicate vs Renounce',
    domain: 'Authority',
    term1: { word: 'Abdicate', meaning: 'Formally give up a monarchical throne or supreme royal post' },
    term2: { word: 'Renounce', meaning: 'Formally give up a general right, claim, belief, or possession' },
    limitingClue: 'Scope: Royal throne = Abdicate; General claims / rights = Renounce.',
    examTrap: 'Throne ke liye generic word Renounce chunna jabki Abdicate available ho.'
  },
  {
    pair: 'Imminent vs Immanent vs Eminent',
    domain: 'Phonetic',
    term1: { word: 'Imminent', meaning: 'About to happen very soon; impending' },
    term2: { word: 'Immanent', meaning: 'Existing or operating within; inherent, indwelling' },
    term3: { word: 'Eminent', meaning: 'Famous, distinguished, and respected in a profession' },
    limitingClue: 'Meaning: Turant hone wala = Imminent; Bheetar antarnihit = Immanent; Prasiddh = Eminent.',
    examTrap: 'Soundalike hone ki wajah se context mismatch.'
  }
]

export default function ConfusingSubstitutionsTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDomain, setSelectedDomain] = useState('All')

  const domains = useMemo(() => {
    return ['All', ...new Set(CONFUSING_PAIRS.map((p) => p.domain))]
  }, [])

  const filteredPairs = useMemo(() => {
    return CONFUSING_PAIRS.filter((p) => {
      const matchDomain = selectedDomain === 'All' || p.domain === selectedDomain
      const matchSearch =
        p.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.limitingClue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.examTrap.toLowerCase().includes(searchTerm.toLowerCase())
      return matchDomain && matchSearch
    })
  }, [searchTerm, selectedDomain])

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-200 dark:border-surface-700/80 pb-3">
        <div className="flex items-center gap-2">
          <Table size={18} className="text-primary-600 dark:text-primary-400" />
          <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
            Top 14 Confusing Substitution Pairs Comparison Table
          </h3>
        </div>
        <Badge variant="primary" size="sm">Mastery Distinctions</Badge>
      </div>

      {/* Search & Domain Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-2.5 top-2.5 text-surface-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search confusing pair or keyword..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
          />
        </div>

        <div className="flex flex-wrap gap-1 w-full sm:w-auto">
          {domains.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setSelectedDomain(d)}
              className={`px-2 py-1 rounded text-[0.6875rem] font-medium transition-colors cursor-pointer ${
                selectedDomain === d
                  ? 'bg-primary-600 text-white'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Items Table List */}
      <div className="space-y-3">
        {filteredPairs.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-850 hover:border-primary-300 dark:hover:border-primary-500/40 transition-all space-y-2.5 shadow-2xs"
          >
            <div className="flex items-center justify-between gap-2 border-b border-surface-100 dark:border-surface-750 pb-2">
              <span className="font-heading font-bold text-sm text-primary-700 dark:text-primary-300">
                {item.pair}
              </span>
              <Badge variant="neutral" size="sm">{item.domain}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-surface-50 dark:bg-surface-800/80 border border-surface-200/60 dark:border-surface-700/60 space-y-0.5">
                <strong className="text-surface-900 dark:text-white font-mono">{item.term1.word}:</strong>
                <p className="text-surface-600 dark:text-surface-300 leading-snug">{item.term1.meaning}</p>
              </div>

              <div className="p-2 rounded-lg bg-surface-50 dark:bg-surface-800/80 border border-surface-200/60 dark:border-surface-700/60 space-y-0.5">
                <strong className="text-surface-900 dark:text-white font-mono">{item.term2.word}:</strong>
                <p className="text-surface-600 dark:text-surface-300 leading-snug">{item.term2.meaning}</p>
              </div>

              {item.term3 && (
                <div className="p-2 rounded-lg bg-surface-50 dark:bg-surface-800/80 border border-surface-200/60 dark:border-surface-700/60 space-y-0.5 md:col-span-2">
                  <strong className="text-surface-900 dark:text-white font-mono">{item.term3.word}:</strong>
                  <p className="text-surface-600 dark:text-surface-300 leading-snug">{item.term3.meaning}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-xs">
              <div className="flex items-start gap-1.5 text-emerald-800 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 p-2 rounded-lg border border-emerald-200/60 dark:border-emerald-800/40">
                <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <span className="font-bold block text-[0.6875rem]">Decisive Limiting Clue:</span>
                  <span className="leading-snug">{item.limitingClue}</span>
                </div>
              </div>

              <div className="flex items-start gap-1.5 text-danger-800 dark:text-danger-300 bg-danger-50/50 dark:bg-danger-950/20 p-2 rounded-lg border border-danger-200/60 dark:border-danger-800/40">
                <AlertCircle size={14} className="shrink-0 mt-0.5 text-danger-600 dark:text-danger-400" />
                <div>
                  <span className="font-bold block text-[0.6875rem]">Common Exam Trap:</span>
                  <span className="leading-snug">{item.examTrap}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
