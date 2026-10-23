import { useState, useMemo } from 'react'
import { Search, Filter, AlertTriangle } from 'lucide-react'
import studyData from '../../content/lessons/L18/study-document.json'
import vocabData from '../../content/lessons/L18/vocabulary-collection.json'
import { Card, Badge, Callout } from '../common'

export default function L18StudyGuideStep() {
  const [activeSectionId, setActiveSectionId] = useState(studyData.sections[0]?.id || 'sec-morphological-foundations')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [collectionTab, setCollectionTab] = useState('affixes') // 'affixes' | 'families'

  const activeSection = studyData.sections.find((s) => s.id === activeSectionId) || studyData.sections[0]

  const affixCategories = useMemo(() => {
    const cats = (vocabData.affixes || []).map((a) => a.category)
    return ['All', ...new Set(cats)]
  }, [])

  const filteredAffixes = useMemo(() => {
    return (vocabData.affixes || []).filter((a) => {
      const matchCat = selectedCategory === 'All' || a.category === selectedCategory
      const q = searchQuery.toLowerCase()
      const matchSearch =
        a.affix.toLowerCase().includes(q) ||
        a.meaning.toLowerCase().includes(q) ||
        a.hinglishMeaning.toLowerCase().includes(q) ||
        (a.examTrap && a.examTrap.toLowerCase().includes(q)) ||
        (a.spellingNote && a.spellingNote.toLowerCase().includes(q))
      return matchCat && matchSearch
    })
  }, [selectedCategory, searchQuery])

  const filteredFamilies = useMemo(() => {
    const q = searchQuery.toLowerCase()
    return (vocabData.wordFamilies || []).filter((f) => {
      return (
        f.root.toLowerCase().includes(q) ||
        f.rootMeaning.toLowerCase().includes(q) ||
        (f.examTraps && f.examTraps.toLowerCase().includes(q)) ||
        (f.exampleSentence && f.exampleSentence.toLowerCase().includes(q))
      )
    })
  }, [searchQuery])

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="pb-4 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <Badge variant="primary" size="sm">Step 2 • Comprehensive Study Guide</Badge>
          <span className="text-xs text-surface-500 dark:text-surface-300">
            Prefixes & Suffixes Master Reference Guide across 12 Pedagogical Sections (A–L)
          </span>
          <Badge variant="secondary" size="sm">{vocabData.totalAffixes || 68} Affixes • {vocabData.totalWordFamilies || 32} Word Families</Badge>
        </div>
        <h2 className="text-2xl font-bold font-heading text-surface-900 dark:text-surface-50">
          {studyData.title}
        </h2>
        <p className="text-xs text-surface-700 dark:text-surface-200 mt-1 max-w-[85ch] leading-relaxed">
          {studyData.overview}
        </p>
      </div>

      {/* Section Quick Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
        {studyData.sections.map((sec) => {
          const isActive = sec.id === activeSectionId
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSectionId(sec.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-200 shadow-xs border border-surface-200 dark:border-surface-700'
                  : 'text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-surface-50 hover:bg-surface-200/50 dark:hover:bg-surface-700/60'
              }`}
            >
              {sec.letter || sec.number}. {sec.title.split(':')[0]}
            </button>
          )
        })}
      </div>

      {/* Active Section Content Viewport */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
            {activeSection.letter || activeSection.number}
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
              {activeSection.title}
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-300">{activeSection.summary}</p>
          </div>
        </div>

        <p className="text-xs md:text-sm text-surface-700 dark:text-surface-200 leading-relaxed max-w-[85ch] whitespace-pre-line">
          {activeSection.content}
        </p>

        {/* Core Rules Display */}
        {activeSection.coreRules && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeSection.coreRules.map((rule, idx) => (
              <Card
                key={idx}
                variant="default"
                padding="md"
                className={
                  idx % 2 === 0
                    ? 'border-primary-200 dark:border-primary-500/40 bg-primary-50/20 dark:bg-primary-950/40 shadow-xs'
                    : 'border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-850'
                }
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-[0.6875rem] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-surface-900 dark:text-surface-50">
                    {rule.name}
                  </h4>
                </div>
                <div className="pl-7 space-y-1 text-xs">
                  <p className="font-mono font-bold text-primary-800 dark:text-primary-300">
                    Formula: {rule.formula}
                  </p>
                  <p className="text-surface-600 dark:text-surface-300 leading-relaxed">
                    {rule.description}
                  </p>
                  {rule.examExample && (
                    <p className="text-[0.6875rem] font-mono text-surface-500 dark:text-surface-400 bg-white/60 dark:bg-surface-900/60 p-1.5 rounded border border-surface-200/50 dark:border-surface-700/50">
                      Ex: {rule.examExample}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Key Takeaways Callout */}
        {activeSection.keyTakeaways && (
          <Callout variant="tip" title="High Court Exam Strategy & Key Takeaways">
            <ul className="list-disc list-inside space-y-1 text-xs text-surface-700 dark:text-surface-200">
              {activeSection.keyTakeaways.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </Callout>
        )}
      </div>

      {/* Searchable Affix & Vocabulary Collection Section */}
      <div className="pt-8 border-t border-surface-200 dark:border-surface-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Badge variant="primary" size="sm">Searchable Collection</Badge>
              <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Curated Morphology Dictionary</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
              Affixes & Word Families Quick Reference Database
            </h3>
            <p className="text-xs text-surface-600 dark:text-surface-300">
              Exam patterns, origins, spelling constraints aur distractor warnings search karein.
            </p>
          </div>

          {/* Collection Tab Toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-surface-100 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
            <button
              type="button"
              onClick={() => {
                setCollectionTab('affixes')
                setSearchQuery('')
              }}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                collectionTab === 'affixes'
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900'
              }`}
            >
              Affixes ({vocabData.totalAffixes || 68})
            </button>
            <button
              type="button"
              onClick={() => {
                setCollectionTab('families')
                setSearchQuery('')
              }}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                collectionTab === 'families'
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900'
              }`}
            >
              Word Families ({vocabData.totalWordFamilies || 32})
            </button>
          </div>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-surface-50 dark:bg-surface-850 rounded-xl border border-surface-200 dark:border-surface-700">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={collectionTab === 'affixes' ? "Search affixes by name, meaning, or spelling rule..." : "Search word families by root, meaning, or usage..."}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-800 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:border-primary-500"
            />
          </div>

          {collectionTab === 'affixes' && (
            <div className="flex items-center gap-2 shrink-0">
              <Filter size={15} className="text-surface-400 shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs px-2.5 py-2 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-800 dark:text-surface-100 focus:outline-none focus:border-primary-500"
              >
                {affixCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Affixes View */}
        {collectionTab === 'affixes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredAffixes.map((aff) => (
              <Card
                key={aff.id}
                variant="default"
                padding="md"
                className="border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-surface-100 dark:border-surface-800">
                    <span className="font-mono text-base font-extrabold text-primary-700 dark:text-primary-300">
                      {aff.affix}
                    </span>
                    <Badge variant="neutral" size="sm">{aff.category}</Badge>
                  </div>
                  <div className="text-xs space-y-1 mt-2">
                    <p className="text-surface-800 dark:text-surface-100">
                      <strong>Meaning:</strong> {aff.meaning}
                    </p>
                    <p className="text-surface-600 dark:text-surface-300 italic text-[0.6875rem]">
                      {aff.hinglishMeaning}
                    </p>
                    <p className="text-surface-500 dark:text-surface-400 font-mono text-[0.6875rem] pt-1">
                      Origin: {aff.origin}
                    </p>
                  </div>
                </div>

                {aff.examTrap && (
                  <div className="pt-2 border-t border-surface-100 dark:border-surface-800 text-[0.6875rem] text-amber-900 dark:text-amber-200 bg-amber-50/70 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200/60 dark:border-amber-800/60 flex items-start gap-1.5">
                    <AlertTriangle size={13} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Trap: </strong>{aff.examTrap}</span>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Word Families View */}
        {collectionTab === 'families' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFamilies.map((fam) => (
              <Card
                key={fam.id}
                variant="default"
                padding="md"
                className="border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-surface-100 dark:border-surface-800">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-extrabold text-primary-700 dark:text-primary-300 uppercase">
                        {fam.root}
                      </span>
                      <span className="text-xs text-surface-500 dark:text-surface-400">({fam.basePos})</span>
                    </div>
                    <Badge variant="primary" size="sm">{fam.id}</Badge>
                  </div>

                  <p className="text-xs text-surface-700 dark:text-surface-300 mt-2">
                    <strong>Core Meaning:</strong> {fam.rootMeaning}
                  </p>

                  {/* Derivatives Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                    <div className="p-2 rounded bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700">
                      <span className="font-bold text-primary-700 dark:text-primary-300 block mb-1">Nouns:</span>
                      <span className="font-mono text-[0.6875rem] text-surface-700 dark:text-surface-300">
                        {Array.isArray(fam.derivatives?.noun) ? fam.derivatives.noun.join(', ') : '—'}
                      </span>
                    </div>

                    <div className="p-2 rounded bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700">
                      <span className="font-bold text-emerald-700 dark:text-emerald-300 block mb-1">Verbs:</span>
                      <span className="font-mono text-[0.6875rem] text-surface-700 dark:text-surface-300">
                        {Array.isArray(fam.derivatives?.verb) ? fam.derivatives.verb.join(', ') : '—'}
                      </span>
                    </div>

                    <div className="p-2 rounded bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700">
                      <span className="font-bold text-amber-700 dark:text-amber-300 block mb-1">Adjectives:</span>
                      <span className="font-mono text-[0.6875rem] text-surface-700 dark:text-surface-300">
                        {Array.isArray(fam.derivatives?.adjective) ? fam.derivatives.adjective.join(', ') : '—'}
                      </span>
                    </div>

                    <div className="p-2 rounded bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700">
                      <span className="font-bold text-purple-700 dark:text-purple-300 block mb-1">Adverbs:</span>
                      <span className="font-mono text-[0.6875rem] text-surface-700 dark:text-surface-300">
                        {Array.isArray(fam.derivatives?.adverb) ? fam.derivatives.adverb.join(', ') : '—'}
                      </span>
                    </div>
                  </div>
                </div>

                {fam.examTraps && (
                  <div className="p-2 rounded-lg bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-[0.6875rem] text-amber-900 dark:text-amber-200 flex items-start gap-1.5">
                    <AlertTriangle size={13} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Trap Alert: </strong>{fam.examTraps}</span>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
