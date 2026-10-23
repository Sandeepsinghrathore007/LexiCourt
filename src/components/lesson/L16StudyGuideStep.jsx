import { useState, useMemo } from 'react'
import { Layers, Search, BookOpen, Sparkles, Filter, ChevronRight, Bookmark } from 'lucide-react'
import studyData from '../../content/lessons/L16/study-document.json'
import vocabCollection from '../../content/lessons/L16/vocabulary-collection.json'
import { Card, Badge, Callout } from '../common'

export default function L16StudyGuideStep() {
  const [activeSectionId, setActiveSectionId] = useState(studyData.sections[0]?.id || 'sec-philosophy')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTier, setSelectedTier] = useState('All')
  const [selectedPos, setSelectedPos] = useState('All')

  const activeSection = studyData.sections.find((s) => s.id === activeSectionId) || studyData.sections[0]

  // Filtered vocabulary list
  const filteredVocab = useMemo(() => {
    return vocabCollection.filter((item) => {
      const matchesTier = selectedTier === 'All' || item.tier === selectedTier
      const matchesPos = selectedPos === 'All' || item.pos.toLowerCase().includes(selectedPos.toLowerCase())
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        item.word.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.hinglishMeaning.toLowerCase().includes(q) ||
        item.synonyms.some((s) => s.toLowerCase().includes(q)) ||
        item.antonyms.some((a) => a.toLowerCase().includes(q))

      return matchesTier && matchesPos && matchesSearch
    })
  }, [searchQuery, selectedTier, selectedPos])

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className="pb-4 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2 mb-1.5">
          <Badge variant="primary" size="sm">Step 2 • Study Guide</Badge>
          <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">
            Synonyms & Antonyms Architectural Guide & 60-Word Curated Collection
          </span>
        </div>
        <h2 className="text-2xl font-bold font-heading text-surface-900 dark:text-surface-50">
          {studyData.title}
        </h2>
        <p className="text-xs text-surface-600 dark:text-surface-300 mt-1.5 max-w-[85ch] leading-relaxed">
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
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs border border-surface-200 dark:border-surface-700'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 hover:bg-surface-200/50 dark:hover:bg-surface-700/50'
              }`}
            >
              {sec.number}. {sec.title.split(':')[0]}
            </button>
          )
        })}
      </div>

      {/* Active Theory Section Content */}
      <Card variant="default" padding="lg" className="space-y-5 border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2.5 pb-3 border-b border-surface-100 dark:border-surface-800">
          <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
            {activeSection.number < 10 ? `0${activeSection.number}` : activeSection.number}
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
              {activeSection.title}
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-400">{activeSection.summary}</p>
          </div>
        </div>

        {/* Section Text Content */}
        <div className="text-xs sm:text-sm text-surface-700 dark:text-surface-300 whitespace-pre-line leading-relaxed space-y-3">
          {activeSection.content}
        </div>

        {/* Dimensions or Categories if present */}
        {activeSection.dimensions && activeSection.dimensions.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-surface-100 dark:border-surface-800">
            {activeSection.dimensions.map((dim, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-3">
                <div>
                  <h4 className="text-xs font-bold font-heading text-primary-700 dark:text-primary-300 uppercase tracking-wider">
                    {dim.name}
                  </h4>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{dim.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {dim.categories?.map((cat, cIdx) => (
                    <div key={cIdx} className="p-2.5 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-xs">
                      <span className="font-bold text-surface-900 dark:text-surface-100 block mb-0.5">
                        {cat.name}
                      </span>
                      <p className="text-surface-600 dark:text-surface-400 text-[0.75rem] leading-relaxed">
                        {cat.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* 60-Word Curated Vocabulary Collection Section */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-surface-200 dark:border-surface-700">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">High Court Curated Bank</Badge>
              <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50">
                60 High-Yield Vocabulary Master Collection
              </h3>
            </div>
            <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
              Foundation (20), Intermediate (20), aur Advanced (20) exam-tested words with definitions, Hinglish meanings, synonyms, antonyms, intensity, and nuance notes.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 self-start md:self-auto">
            Showing {filteredVocab.length} of {vocabCollection.length} Words
          </span>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 bg-surface-50 dark:bg-surface-850 rounded-xl border border-surface-200 dark:border-surface-700">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search word, meaning, synonym, antonym..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Tier Filter */}
          <div className="sm:col-span-3 flex items-center gap-1">
            <span className="text-[0.6875rem] font-bold text-surface-500 dark:text-surface-400 uppercase tracking-wider shrink-0">
              Tier:
            </span>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full py-2 px-2 text-xs rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Tiers (60)</option>
              <option value="Foundation">Foundation (20)</option>
              <option value="Intermediate">Intermediate (20)</option>
              <option value="Advanced">Advanced (20)</option>
            </select>
          </div>

          {/* POS Filter */}
          <div className="sm:col-span-3 flex items-center gap-1">
            <span className="text-[0.6875rem] font-bold text-surface-500 dark:text-surface-400 uppercase tracking-wider shrink-0">
              POS:
            </span>
            <select
              value={selectedPos}
              onChange={(e) => setSelectedPos(e.target.value)}
              className="w-full py-2 px-2 text-xs rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Roles</option>
              <option value="Adjective">Adjective</option>
              <option value="Noun">Noun</option>
              <option value="Verb">Verb</option>
              <option value="Adverb">Adverb</option>
            </select>
          </div>
        </div>

        {/* Vocabulary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredVocab.map((item) => (
            <Card
              key={item.id}
              variant="default"
              padding="md"
              className="space-y-3 border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold font-heading text-primary-950 dark:text-primary-100">
                        {item.word}
                      </h4>
                      <span className="text-[0.6875rem] font-mono px-1.5 py-0.5 rounded bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 font-semibold">
                        {item.pos}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-primary-700 dark:text-primary-300 block mt-0.5">
                      {item.hinglishMeaning}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-[0.625rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        item.tier === 'Foundation'
                          ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                          : item.tier === 'Intermediate'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                      }`}
                    >
                      {item.tier}
                    </span>
                    <span className="text-[0.625rem] text-surface-500 dark:text-surface-400 font-mono">
                      Intensity: {item.intensity}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed">
                  {item.definition}
                </p>

                {/* Synonyms & Antonyms Pills */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-start gap-2 text-xs">
                    <span className="text-[0.6875rem] font-bold text-success-700 dark:text-success-400 uppercase tracking-wider shrink-0 mt-0.5">
                      Syn:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.synonyms.map((syn, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded bg-success-50 dark:bg-success-950/40 text-success-800 dark:text-success-300 border border-success-200 dark:border-success-800/80 text-[0.6875rem] font-medium"
                        >
                          {syn}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-xs">
                    <span className="text-[0.6875rem] font-bold text-danger-700 dark:text-danger-400 uppercase tracking-wider shrink-0 mt-0.5">
                      Ant:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.antonyms.map((ant, aIdx) => (
                        <span
                          key={aIdx}
                          className="px-2 py-0.5 rounded bg-danger-50 dark:bg-danger-950/40 text-danger-800 dark:text-danger-300 border border-danger-200 dark:border-danger-800/80 text-[0.6875rem] font-medium"
                        >
                          {ant}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Nuance Note */}
                <div className="p-2 rounded-lg bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700 text-[0.75rem] text-surface-700 dark:text-surface-300">
                  <strong className="text-surface-900 dark:text-surface-100 font-semibold">Nuance & Traps: </strong>
                  {item.nuanceNote}
                </div>
              </div>

              {/* Example Sentence */}
              <div className="pt-2 border-t border-surface-100 dark:border-surface-800 text-[0.6875rem] text-surface-500 dark:text-surface-400 italic">
                <span className="font-semibold text-surface-700 dark:text-surface-300 not-italic">Example: </span>
                &ldquo;{item.exampleSentence}&rdquo;
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
