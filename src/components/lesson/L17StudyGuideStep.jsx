import { useState, useMemo } from 'react'
import { Layers, Search, BookOpen, Filter } from 'lucide-react'
import studyData from '../../content/lessons/L17/study-document.json'
import vocabData from '../../content/lessons/L17/vocabulary-collection.json'
import { Card, Badge, Callout } from '../common'

export default function L17StudyGuideStep() {
  const [activeSectionId, setActiveSectionId] = useState(studyData.sections[0]?.id || 'sec-nature-of-substitutions')
  const [vocabSearch, setVocabSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')

  const activeSection = studyData.sections.find((s) => s.id === activeSectionId) || studyData.sections[0]

  const categories = useMemo(() => {
    return ['All', ...new Set(vocabData.map((v) => v.category))]
  }, [])

  const filteredVocab = useMemo(() => {
    return vocabData.filter((v) => {
      const matchCat = selectedCategory === 'All' || v.category === selectedCategory
      const matchDiff = selectedDifficulty === 'All' || v.difficulty === selectedDifficulty
      const matchSearch =
        v.word.toLowerCase().includes(vocabSearch.toLowerCase()) ||
        v.definition.toLowerCase().includes(vocabSearch.toLowerCase()) ||
        v.hinglishExplanation.toLowerCase().includes(vocabSearch.toLowerCase()) ||
        v.keyDistinction.toLowerCase().includes(vocabSearch.toLowerCase())
      return matchCat && matchDiff && matchSearch
    })
  }, [selectedCategory, selectedDifficulty, vocabSearch])

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="pb-4 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <Badge variant="primary" size="sm">Step 2 • Comprehensive Study Guide</Badge>
          <span className="text-xs text-surface-500 dark:text-surface-300">
            One-Word Substitutions Reference Guide across 12 Specialized Sections
          </span>
          <Badge variant="secondary" size="sm">{vocabData.length} Validated Entries</Badge>
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
              {sec.number}. {sec.title.split(':')[0]}
            </button>
          )
        })}
      </div>

      {/* Active Section Content Viewport */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
            {activeSection.number < 10 ? `0${activeSection.number}` : activeSection.number}
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

        {/* Dimensions Display */}
        {activeSection.dimensions && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeSection.dimensions.map((dim, idx) => (
              <Card
                key={idx}
                variant="default"
                padding="md"
                className={
                  idx % 2 === 0
                    ? 'border-primary-200 dark:border-primary-500/40 bg-primary-50/20 dark:bg-primary-950/40 shadow-xs'
                    : 'border-amber-200 dark:border-amber-500/40 bg-amber-50/20 dark:bg-amber-950/40 shadow-xs'
                }
              >
                <div className="flex items-center gap-2 mb-2 font-heading font-bold text-sm text-surface-900 dark:text-surface-50">
                  <Layers size={18} className="text-primary-600 dark:text-primary-300 shrink-0" />
                  <span>{dim.name}</span>
                </div>
                {dim.description && (
                  <p className="text-xs text-surface-700 dark:text-surface-200 mb-3 leading-relaxed">
                    {dim.description}
                  </p>
                )}
                <div className="space-y-2">
                  {dim.categories?.map((cat, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-2.5 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-xs shadow-xs"
                    >
                      <strong className="text-surface-800 dark:text-surface-100 block mb-0.5 font-heading">
                        {cat.name}:
                      </strong>
                      <span className="text-surface-600 dark:text-surface-300 leading-relaxed whitespace-pre-line">
                        {cat.detail || cat.definition}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Live Searchable & Filterable Vocabulary Directory */}
        <div className="pt-6 border-t border-surface-200 dark:border-surface-700 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-primary-600 dark:text-primary-400" />
                <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
                  Curated Vocabulary Directory ({filteredVocab.length} of {vocabData.length})
                </h3>
              </div>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Filter by semantic domain, difficulty band, or search keyword
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search size={15} className="absolute left-2.5 top-2.5 text-surface-400" />
              <input
                type="text"
                value={vocabSearch}
                onChange={(e) => setVocabSearch(e.target.value)}
                placeholder="Search word, meaning, clue..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-surface-500">
              <Filter size={13} />
              <span>Category:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-1 rounded-md text-[0.6875rem] font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-surface-500">Difficulty:</span>
            {['All', 'Foundation', 'Intermediate', 'Advanced'].map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2 py-0.5 rounded text-[0.6875rem] font-medium transition-colors cursor-pointer ${
                  selectedDifficulty === diff
                    ? 'bg-surface-800 dark:bg-surface-200 text-white dark:text-surface-900'
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Vocabulary Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {filteredVocab.slice(0, 36).map((v) => (
              <Card
                key={v.id}
                variant="default"
                padding="sm"
                className="border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-850 hover:border-primary-300 dark:hover:border-primary-500/40 transition-all flex flex-col justify-between space-y-2 shadow-2xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-1.5">
                    <span className="font-heading font-bold text-sm text-primary-700 dark:text-primary-300">
                      {v.word}
                    </span>
                    <Badge variant={v.difficulty === 'Foundation' ? 'secondary' : v.difficulty === 'Intermediate' ? 'primary' : 'warning'} size="sm">
                      {v.difficulty}
                    </Badge>
                  </div>
                  <span className="text-[0.625rem] text-surface-400 uppercase tracking-wider font-mono">
                    [{v.partOfSpeech}] • {v.category}
                  </span>
                  <p className="text-xs font-medium text-surface-900 dark:text-surface-100 mt-1 leading-snug">
                    {v.definition}
                  </p>
                  <p className="text-[0.6875rem] text-surface-600 dark:text-surface-300 mt-1 italic leading-relaxed">
                    "{v.example}"
                  </p>
                </div>

                <div className="pt-2 border-t border-surface-100 dark:border-surface-750 text-[0.6875rem] space-y-1">
                  <p className="text-surface-600 dark:text-surface-300">
                    <strong className="text-surface-800 dark:text-surface-200">Hinglish: </strong>
                    {v.hinglishExplanation}
                  </p>
                  {v.confusedWith && (
                    <div className="p-1.5 rounded bg-amber-50/60 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 border border-amber-200/50 dark:border-amber-800/40">
                      <strong>Confused with {v.confusedWith}: </strong>
                      {v.keyDistinction}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
          {filteredVocab.length > 36 && (
            <p className="text-center text-xs text-surface-500 italic pt-2">
              Showing first 36 of {filteredVocab.length} results. Use the search box above to narrow down terms.
            </p>
          )}
        </div>

        <Callout type="tip" title="Rajasthan High Court Preparation Insight">
          One-word substitution mein examiners do main traps use karte hain: pehla, soundalike words (jaise Imminent vs Immanent, Acquit vs Absolve), aur doosra, broad synonym vs exact definition trap (jaise Altruist vs Philanthropist). Question solve karte waqt hamesha definition ke saare restricting keywords check karein aur part of speech (agent noun vs abstract noun vs adjective) verify karein.
        </Callout>
      </div>
    </div>
  )
}
