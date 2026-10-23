import { useState, useMemo } from 'react'
import { Search, BookOpen, Filter } from 'lucide-react'
import studyData from '../../content/lessons/L19/study-document.json'
import vocabData from '../../content/lessons/L19/vocabulary-collection.json'
import { Card, Badge, Callout } from '../common'

export default function L19StudyGuideStep() {
  const [activeSectionId, setActiveSectionId] = useState(studyData.sections[0]?.id || 'sec-nature-of-idioms')
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
      const searchLower = vocabSearch.toLowerCase()
      const matchSearch =
        v.idiom.toLowerCase().includes(searchLower) ||
        v.definition.toLowerCase().includes(searchLower) ||
        v.hinglishExplanation.toLowerCase().includes(searchLower) ||
        (v.keyDistinction && v.keyDistinction.toLowerCase().includes(searchLower)) ||
        (v.contextNote && v.contextNote.toLowerCase().includes(searchLower))
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
            Idioms & Phrases Master Reference Guide across 14 Specialized Sections
          </span>
          <Badge variant="secondary" size="sm">{vocabData.length} Validated Idiom Entries</Badge>
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
                    : 'border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-850'
                }
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-[0.6875rem] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-surface-900 dark:text-surface-50">
                    {dim.title}
                  </h4>
                </div>
                <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed pl-7">
                  {dim.description}
                </p>
              </Card>
            ))}
          </div>
        )}

        {/* Key Takeaways Callout */}
        {activeSection.keyTakeaways && (
          <Callout variant="tip" title="Strategic Key Takeaways for High Court Exam">
            <ul className="list-disc list-inside space-y-1 text-xs text-surface-700 dark:text-surface-200">
              {activeSection.keyTakeaways.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </Callout>
        )}
      </div>

      {/* Searchable Idioms Collection Section */}
      <div className="pt-8 border-t border-surface-200 dark:border-surface-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Badge variant="primary" size="sm">Searchable Collection</Badge>
              <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Curated Dictionary</span>
            </div>
            <h3 className="text-xl font-bold font-heading text-surface-900 dark:text-surface-50 flex items-center gap-2">
              <BookOpen size={20} className="text-primary-600 dark:text-primary-400" />
              116 Curated & Validated Idiom Entries
            </h3>
          </div>
          <span className="text-xs font-semibold text-surface-500 dark:text-surface-400">
            Showing {filteredVocab.length} of {vocabData.length} Idioms
          </span>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Search by idiom, keyword, definition or Roman Hinglish explanation..."
              value={vocabSearch}
              onChange={(e) => setVocabSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-surface-600 dark:text-surface-300 shrink-0">
              <Filter size={14} className="text-primary-600 dark:text-primary-400" />
              <span>Category:</span>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-800 dark:text-surface-200 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>

            <div className="flex items-center gap-1.5 text-xs font-bold text-surface-600 dark:text-surface-300 shrink-0 ml-2">
              <span>Difficulty:</span>
            </div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-800 dark:text-surface-200 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="All">All Difficulties</option>
              <option value="Foundation">Foundation</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Filtered Idiom Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {filteredVocab.map((v) => (
            <Card
              key={v.id}
              variant="default"
              padding="sm"
              className="border-surface-200 dark:border-surface-700 flex flex-col justify-between hover:border-primary-300 dark:hover:border-primary-500/40 transition-colors space-y-2.5"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="font-mono text-[0.6875rem] font-bold text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-950 px-1.5 py-0.5 rounded border border-primary-200 dark:border-primary-800/40">
                    {v.id}
                  </span>
                  <Badge variant={v.difficulty === 'Foundation' ? 'neutral' : v.difficulty === 'Intermediate' ? 'primary' : 'secondary'} size="sm">
                    {v.difficulty}
                  </Badge>
                </div>
                <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-50 leading-snug">
                  {v.idiom}
                </h4>
                <span className="text-[0.625rem] font-semibold text-surface-500 dark:text-surface-400 block">
                  {v.category}
                </span>
                <p className="text-xs text-surface-700 dark:text-surface-300 font-medium leading-relaxed">
                  {v.definition}
                </p>
                <div className="p-2 rounded-lg bg-surface-50 dark:bg-surface-850 text-[0.6875rem] text-surface-600 dark:text-surface-300 leading-normal border border-surface-100 dark:border-surface-800">
                  <strong>Hinglish:</strong> {v.hinglishExplanation}
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-surface-100 dark:border-surface-800">
                <p className="text-[0.6875rem] italic text-surface-500 dark:text-surface-400">
                  "{v.example}"
                </p>
                {v.confusedWith && (
                  <div className="text-[0.625rem] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded border border-amber-200 dark:border-amber-800/40">
                    <strong>Contrast:</strong> {v.keyDistinction || `Confused with: ${v.confusedWith}`}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
