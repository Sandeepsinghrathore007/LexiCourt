import { useState } from 'react'
import { Layers, ShieldAlert } from 'lucide-react'
import studyData from '../../content/lessons/L03/study-document.json'
import { Card, Badge, Callout } from '../common'

export default function L03StudyGuideStep() {
  const [activeSectionId, setActiveSectionId] = useState('sec-foundation')

  const activeSection = studyData.sections.find((s) => s.id === activeSectionId) || studyData.sections[0]

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="pb-4 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="primary" size="sm">Step 2 • Study Guide</Badge>
          <span className="text-xs text-surface-500 dark:text-surface-300">Conditionals & Inversions ka Complete Reference</span>
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
              {sec.number}. {sec.title.split(':')[0].split('(')[0].trim()}
            </button>
          )
        })}
      </div>

      {/* Dynamic Section Viewport */}
      <div className="space-y-6">
        {/* Section 1: Foundation & Clause Architecture */}
        {activeSection.id === 'sec-foundation' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                01
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
                  {activeSection.title}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-300">{activeSection.summary}</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-surface-700 dark:text-surface-200 leading-relaxed max-w-[85ch]">
              {activeSection.content}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeSection.dimensions?.map((dim, idx) => (
                <Card
                  key={idx}
                  variant="default"
                  padding="md"
                  className={idx === 0 ? 'border-primary-200 dark:border-primary-500/40 bg-primary-50/20 dark:bg-primary-950/40 shadow-xs' : 'border-amber-200 dark:border-amber-500/40 bg-amber-50/20 dark:bg-amber-950/40 shadow-xs'}
                >
                  <div className="flex items-center gap-2 mb-2 font-heading font-bold text-sm text-surface-900 dark:text-surface-50">
                    <Layers size={18} className="text-primary-600 dark:text-primary-300" />
                    <span>{dim.name}</span>
                  </div>
                  <p className="text-xs text-surface-700 dark:text-surface-200 mb-3 leading-relaxed">
                    {dim.description}
                  </p>
                  <div className="space-y-2">
                    {dim.categories?.map((cat, cIdx) => (
                      <div key={cIdx} className="p-2.5 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-xs shadow-xs">
                        <strong className="text-surface-800 dark:text-surface-100 block mb-0.5">{cat.name}:</strong>
                        <span className="text-surface-600 dark:text-surface-300">{cat.detail}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <Callout type="info" title="Syntactic Ordering Rule">
              {activeSection.formulaNote}
            </Callout>
          </div>
        )}

        {/* Section 2: Zero Conditional */}
        {activeSection.id === 'sec-zero-conditional' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                02
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
                  {activeSection.title}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-300">{activeSection.summary}</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-surface-700 dark:text-surface-200 leading-relaxed max-w-[85ch]">
              {activeSection.content}
            </p>

            <div className="space-y-3">
              {activeSection.rules?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary-700 dark:text-primary-200">
                      {item.condition}
                    </span>
                    <Badge variant="primary" size="sm">{item.formula}</Badge>
                  </div>
                  <p className="font-mono text-xs font-bold text-surface-900 dark:text-surface-100 bg-white dark:bg-surface-850 p-2 rounded-lg border border-surface-200 dark:border-surface-700">
                    "{item.example}"
                  </p>
                  <p className="text-xs text-surface-700 dark:text-surface-200">
                    {item.analysis}
                  </p>
                </div>
              ))}
            </div>

            <Callout type="tip" title="Zero Conditional Rule">
              {activeSection.goldenRule}
            </Callout>
          </div>
        )}

        {/* Section 3: First Conditional */}
        {activeSection.id === 'sec-first-conditional' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                03
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
                  {activeSection.title}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-300">{activeSection.summary}</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-surface-700 dark:text-surface-200 leading-relaxed max-w-[85ch]">
              {activeSection.content}
            </p>

            <div className="space-y-3">
              {activeSection.rules?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary-700 dark:text-primary-200">
                      {item.condition}
                    </span>
                    <Badge variant="primary" size="sm">{item.formula}</Badge>
                  </div>
                  <p className="font-mono text-xs font-bold text-surface-900 dark:text-surface-100 bg-white dark:bg-surface-850 p-2 rounded-lg border border-surface-200 dark:border-surface-700">
                    "{item.example}"
                  </p>
                  <p className="text-xs text-surface-700 dark:text-surface-200">
                    {item.analysis}
                  </p>
                </div>
              ))}
            </div>

            <Callout type="tip" title="First Conditional Constraint">
              {activeSection.goldenRule}
            </Callout>
          </div>
        )}

        {/* Section 4: Second Conditional */}
        {activeSection.id === 'sec-second-conditional' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                04
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
                  {activeSection.title}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-300">{activeSection.summary}</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-surface-700 dark:text-surface-200 leading-relaxed max-w-[85ch]">
              {activeSection.content}
            </p>

            <div className="space-y-3">
              {activeSection.rules?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary-700 dark:text-primary-200">
                      {item.condition}
                    </span>
                    <Badge variant="primary" size="sm">{item.formula}</Badge>
                  </div>
                  <p className="font-mono text-xs font-bold text-surface-900 dark:text-surface-100 bg-white dark:bg-surface-850 p-2 rounded-lg border border-surface-200 dark:border-surface-700">
                    "{item.example}"
                  </p>
                  <p className="text-xs text-surface-700 dark:text-surface-200">
                    {item.analysis}
                  </p>
                </div>
              ))}
            </div>

            <Callout type="tip" title="Temporal Distance Insight">
              {activeSection.goldenRule}
            </Callout>
          </div>
        )}

        {/* Section 5: Third Conditional */}
        {activeSection.id === 'sec-third-conditional' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                05
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
                  {activeSection.title}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-300">{activeSection.summary}</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-surface-700 dark:text-surface-200 leading-relaxed max-w-[85ch]">
              {activeSection.content}
            </p>

            <div className="space-y-3">
              {activeSection.rules?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary-700 dark:text-primary-200">
                      {item.condition}
                    </span>
                    <Badge variant="primary" size="sm">{item.formula}</Badge>
                  </div>
                  <p className="font-mono text-xs font-bold text-surface-900 dark:text-surface-100 bg-white dark:bg-surface-850 p-2 rounded-lg border border-surface-200 dark:border-surface-700">
                    "{item.example}"
                  </p>
                  <p className="text-xs text-surface-700 dark:text-surface-200">
                    {item.analysis}
                  </p>
                </div>
              ))}
            </div>

            <Callout type="warning" title="Third Conditional Fatal Error">
              {activeSection.goldenRule}
            </Callout>
          </div>
        )}

        {/* Section 6: Comparative Matrix */}
        {activeSection.id === 'sec-type-comparison' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                06
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
                  {activeSection.title}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-300">{activeSection.summary}</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-surface-700 dark:text-surface-200 leading-relaxed max-w-[85ch]">
              {activeSection.content}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeSection.matrix?.map((item, idx) => (
                <Card key={idx} variant="default" padding="md" className="space-y-2.5 border-surface-200 dark:border-surface-700 shadow-xs">
                  <div className="flex items-center justify-between border-b border-surface-200 dark:border-surface-700 pb-2">
                    <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-50">
                      {item.type}
                    </h4>
                    <span className="text-[0.6875rem] text-surface-500 dark:text-surface-400 font-medium">
                      {item.timeReality}
                    </span>
                  </div>

                  <p className="text-xs text-surface-700 dark:text-surface-300 leading-snug">
                    {item.use}
                  </p>

                  <div className="p-2 rounded bg-surface-100 dark:bg-surface-800 font-mono text-xs space-y-1">
                    <div>
                      <span className="text-[0.625rem] text-primary-600 dark:text-primary-400 font-bold block">IF-CLAUSE:</span>
                      <span className="font-bold text-surface-900 dark:text-surface-100">{item.ifClause}</span>
                    </div>
                    <div>
                      <span className="text-[0.625rem] text-success-600 dark:text-success-400 font-bold block">RESULT:</span>
                      <span className="font-bold text-surface-900 dark:text-surface-100">{item.resultClause}</span>
                    </div>
                  </div>

                  <p className="text-xs font-mono font-semibold text-primary-800 dark:text-primary-200">
                    "{item.example}"
                  </p>

                  <div className="text-[0.6875rem] text-error-700 dark:text-error-300 bg-error-50 dark:bg-error-950/40 p-2 rounded border border-error-200 dark:border-error-500/30">
                    <strong>Common Trap:</strong> {item.trap}
                  </div>
                </Card>
              ))}
            </div>

            <Callout type="tip" title="Selection Algorithm">
              {activeSection.goldenRule}
            </Callout>
          </div>
        )}

        {/* Section 7: Mixed Conditionals */}
        {activeSection.id === 'sec-mixed-conditionals' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                07
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
                  {activeSection.title}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-300">{activeSection.summary}</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-surface-700 dark:text-surface-200 leading-relaxed max-w-[85ch]">
              {activeSection.content}
            </p>

            <div className="space-y-3">
              {activeSection.rules?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary-700 dark:text-primary-200">
                      {item.condition}
                    </span>
                    <Badge variant="primary" size="sm">{item.formula}</Badge>
                  </div>
                  <p className="font-mono text-xs font-bold text-surface-900 dark:text-surface-100 bg-white dark:bg-surface-850 p-2 rounded-lg border border-surface-200 dark:border-surface-700">
                    "{item.example}"
                  </p>
                  <p className="text-xs text-surface-700 dark:text-surface-200">
                    {item.analysis}
                  </p>
                </div>
              ))}
            </div>

            <Callout type="tip" title="Mixed Conditional Adverbial Clue">
              {activeSection.goldenRule}
            </Callout>
          </div>
        )}

        {/* Section 8: Conditional Inversions */}
        {activeSection.id === 'sec-conditional-inversions' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                08
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
                  {activeSection.title}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-300">{activeSection.summary}</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-surface-700 dark:text-surface-200 leading-relaxed max-w-[85ch]">
              {activeSection.content}
            </p>

            <div className="space-y-4">
              {activeSection.inversions?.map((inv, idx) => (
                <Card key={idx} variant="default" padding="md" className="space-y-2 border-l-4 border-l-primary-500 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-100">
                      {inv.type}
                    </h4>
                    <span className="text-[0.6875rem] font-mono text-primary-700 dark:text-primary-300 font-bold">
                      {inv.formula}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-surface-100 dark:bg-surface-800 font-mono text-xs space-y-1">
                    <p className="text-surface-600 dark:text-surface-400">
                      Standard: "{inv.standard}"
                    </p>
                    <p className="text-primary-800 dark:text-primary-200 font-bold">
                      Inverted: "{inv.inverted}"
                    </p>
                  </div>

                  <p className="text-xs text-surface-700 dark:text-surface-300 leading-relaxed">
                    {inv.negativeRule}
                  </p>
                </Card>
              ))}
            </div>

            <Callout type="tip" title="Inversion Identification Clue">
              {activeSection.goldenRule}
            </Callout>
          </div>
        )}

        {/* Section 9: Related Connectives */}
        {activeSection.id === 'sec-related-connectives' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                09
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
                  {activeSection.title}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-300">{activeSection.summary}</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-surface-700 dark:text-surface-200 leading-relaxed max-w-[85ch]">
              {activeSection.content}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeSection.connectives?.map((conn, idx) => (
                <Card key={idx} variant="default" padding="md" className="space-y-2 border-surface-200 dark:border-surface-700 shadow-xs">
                  <div className="flex items-center justify-between border-b border-surface-200 dark:border-surface-700 pb-2">
                    <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-50">
                      {conn.word}
                    </h4>
                    <span className="text-[0.6875rem] text-surface-500 dark:text-surface-400">
                      {conn.meaning}
                    </span>
                  </div>

                  <p className="text-xs text-surface-700 dark:text-surface-300 leading-relaxed">
                    {conn.rule}
                  </p>

                  <p className="font-mono text-xs font-bold text-primary-800 dark:text-primary-200 p-2 rounded bg-surface-100 dark:bg-surface-800">
                    "{conn.example}"
                  </p>

                  <p className="text-[0.6875rem] text-surface-500 dark:text-surface-400 italic">
                    Equivalent: {conn.equivalent}
                  </p>
                </Card>
              ))}
            </div>

            <Callout type="warning" title="Unless Double Negative Trap">
              {activeSection.goldenRule}
            </Callout>
          </div>
        )}

        {/* Section 10: Common Traps */}
        {activeSection.id === 'sec-common-traps' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                10
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
                  {activeSection.title}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-300">{activeSection.summary}</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-surface-700 dark:text-surface-200 leading-relaxed max-w-[85ch]">
              {activeSection.content}
            </p>

            <div className="space-y-3">
              {activeSection.traps?.map((t, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-error-50/50 dark:bg-error-950/30 border border-error-200 dark:border-error-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-error-800 dark:text-error-300 font-bold text-sm">
                    <ShieldAlert size={16} />
                    <span>{t.trap}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded bg-white dark:bg-surface-850 text-error-700 dark:text-error-300 line-through">
                      Wrong: "{t.errorPattern}"
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-surface-850 text-success-700 dark:text-success-300 font-bold">
                      Correct: "{t.correctPattern}"
                    </div>
                  </div>
                  <p className="text-xs text-surface-700 dark:text-surface-300">
                    <strong>Remedy:</strong> {t.remedy}
                  </p>
                </div>
              ))}
            </div>

            <Callout type="tip" title="Final Exam Revision Checklist">
              {activeSection.goldenRule}
            </Callout>
          </div>
        )}
      </div>
    </div>
  )
}
