import { useState } from 'react'
import { Layers } from 'lucide-react'
import studyData from '../../content/lessons/L09/study-document.json'
import { Card, Badge, Callout } from '../common'

export default function L09StudyGuideStep() {
  const [activeSectionId, setActiveSectionId] = useState(studyData.sections[0]?.id || 'sec-foundation')

  const activeSection = studyData.sections.find((s) => s.id === activeSectionId) || studyData.sections[0]

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="pb-4 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="primary" size="sm">Step 2 • Study Guide</Badge>
          <span className="text-xs text-surface-500 dark:text-surface-300">
            Degrees of Comparison & Transformations: Complete Reference Guide
          </span>
        </div>
        <h2 className="text-2xl font-bold font-heading text-surface-900 dark:text-surface-50">
          {studyData.title}
        </h2>
        <p className="text-xs text-surface-700 dark:text-surface-200 mt-1 max-w-[85ch]">
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
          <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
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
                        {cat.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Formula Note Callout */}
        {activeSection.formulaNote && (
          <Callout type="info" title="Core Rule & Examination Takeaway">
            {activeSection.formulaNote}
          </Callout>
        )}
      </div>
    </div>
  )
}
