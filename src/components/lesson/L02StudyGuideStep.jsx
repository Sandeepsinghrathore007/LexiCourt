import { useState } from 'react'
import { Layers, Clock } from 'lucide-react'
import studyData from '../../content/lessons/L02/study-document.json'
import { Card, Badge, Callout } from '../common'

export default function L02StudyGuideStep() {
  const [activeSectionId, setActiveSectionId] = useState('sec-foundations')

  const activeSection = studyData.sections.find((s) => s.id === activeSectionId) || studyData.sections[0]

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="pb-4 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="primary" size="sm">Step 2 • Study Guide</Badge>
          <span className="text-xs text-surface-500 dark:text-surface-300">Tense Harmony ka Complete Reference</span>
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
        {/* Section 1: Foundations of Tense Coordination */}
        {activeSection.id === 'sec-foundations' && (
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
              {activeSection.dimensions.map((dim, idx) => (
                <Card
                  key={idx}
                  variant="default"
                  padding="md"
                  className={idx === 0 ? 'border-primary-200 dark:border-primary-500/40 bg-primary-50/20 dark:bg-primary-950/40 shadow-xs' : 'border-amber-200 dark:border-amber-500/40 bg-amber-50/20 dark:bg-amber-950/40 shadow-xs'}
                >
                  <div className="flex items-center gap-2 mb-2 font-heading font-bold text-sm text-surface-900 dark:text-surface-50">
                    {idx === 0 ? <Layers size={18} className="text-primary-600 dark:text-primary-300" /> : <Clock size={18} className="text-amber-600 dark:text-secondary-300" />}
                    <span>{dim.name}</span>
                  </div>
                  <p className="text-xs text-surface-700 dark:text-surface-200 mb-3 leading-relaxed">
                    {dim.description}
                  </p>
                  <div className="space-y-2">
                    {dim.categories.map((cat, cIdx) => (
                      <div key={cIdx} className="p-2.5 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-xs shadow-xs">
                        <strong className="text-surface-800 dark:text-surface-100 block mb-0.5">{cat.name}:</strong>
                        <span className="text-surface-600 dark:text-surface-300">{cat.detail}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <Callout type="info" title="Main Syntax Rule">
              {activeSection.formulaNote}
            </Callout>
          </div>
        )}

        {/* Section 2: Present & Future Governing Clauses */}
        {activeSection.id === 'sec-present-future-governing' && (
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
              {activeSection.rules.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary-700 dark:text-primary-200">
                      {item.condition}
                    </span>
                    <Badge variant="primary" size="sm">{item.subordinateTense}</Badge>
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

            <Callout type="tip" title="Present Main Clauses ke liye Master Strategy">
              {activeSection.goldenRule}
            </Callout>
          </div>
        )}

        {/* Section 3: The General Rule of Past Harmony */}
        {activeSection.id === 'sec-past-governing' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                03
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
                  {activeSection.title}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-400">{activeSection.summary}</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-surface-700 dark:text-surface-300 leading-relaxed">
              {activeSection.content}
            </p>

            <div className="space-y-4">
              {activeSection.relationships.map((rel, idx) => (
                <Card key={idx} variant="default" padding="md" className="space-y-2 border-l-4 border-l-primary-500">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-100">
                      {rel.type}
                    </h4>
                    <span className="text-[0.6875rem] text-surface-500 dark:text-surface-400">
                      {rel.relationship}
                    </span>
                  </div>

                  <div className="p-2 rounded bg-surface-100 dark:bg-surface-800 font-mono text-xs font-bold text-primary-800 dark:text-primary-300">
                    {rel.formula}
                  </div>

                  <p className="font-mono text-xs text-surface-800 dark:text-surface-200 bg-white dark:bg-surface-900 p-2 rounded border border-surface-200 dark:border-surface-700">
                    "{rel.example}"
                  </p>

                  <p className="text-xs text-surface-600 dark:text-surface-400 leading-relaxed">
                    {rel.detailedAnalysis}
                  </p>
                </Card>
              ))}
            </div>

            <Callout type="warning" title="Modal Discord Trap">
              {activeSection.goldenRule}
            </Callout>
          </div>
        )}

        {/* Section 4: Universal Truths and Scientific Facts */}
        {activeSection.id === 'sec-universal-truths' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                04
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
                  {activeSection.title}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-400">{activeSection.summary}</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-surface-700 dark:text-surface-300 leading-relaxed max-w-[85ch]">
              {activeSection.content}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeSection.categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700 space-y-2"
                >
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block">
                    {cat.category}
                  </span>
                  <div className="space-y-1">
                    <p className="text-xs font-mono font-bold text-success-800 dark:text-success-300 bg-success-50 dark:bg-success-950/40 p-2 rounded border border-success-200 dark:border-success-900/40">
                      ✓ {cat.correct}
                    </p>
                    <p className="text-xs font-mono text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2 rounded border border-rose-200 dark:border-rose-900/40 line-through">
                      ✗ {cat.incorrect}
                    </p>
                  </div>
                  <p className="text-[0.6875rem] text-surface-600 dark:text-surface-400 leading-snug">
                    {cat.explanation}
                  </p>
                </div>
              ))}
            </div>

            <Callout type="info" title="Universal vs Historical Facts mein Farq">
              {activeSection.goldenRule}
            </Callout>
          </div>
        )}

        {/* Section 5: Habits, Permanent Characteristics & Continuing Facts */}
        {activeSection.id === 'sec-habits-and-continuing-facts' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                05
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
                  {activeSection.title}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-400">{activeSection.summary}</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-surface-700 dark:text-surface-300 leading-relaxed max-w-[85ch]">
              {activeSection.content}
            </p>

            <div className="space-y-3">
              {activeSection.comparisons.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700 space-y-2"
                >
                  <h4 className="font-heading font-bold text-xs text-primary-700 dark:text-primary-300">
                    {comp.type}
                  </h4>
                  <div className="space-y-1 text-xs font-mono">
                    <p className="p-2 rounded bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-surface-800 dark:text-surface-200">
                      Variant A: {comp.sentenceA}
                    </p>
                    <p className="p-2 rounded bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-surface-800 dark:text-surface-200">
                      Variant B: {comp.sentenceB}
                    </p>
                  </div>
                  <p className="text-xs text-surface-600 dark:text-surface-400 leading-relaxed">
                    <strong>High Court Exam Recommendation:</strong> {comp.examRecommendation}
                  </p>
                </div>
              ))}
            </div>

            <Callout type="tip" title="Historical Facts ka Golden Rule">
              {activeSection.goldenRule}
            </Callout>
          </div>
        )}

        {/* Section 6: Special Subordinate Clauses (Purpose, Comparison) */}
        {activeSection.id === 'sec-special-clauses' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                06
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
                  {activeSection.title}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-400">{activeSection.summary}</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-surface-700 dark:text-surface-300 leading-relaxed max-w-[85ch]">
              {activeSection.content}
            </p>

            <div className="space-y-4">
              {activeSection.clauses.map((clause, idx) => (
                <Card key={idx} variant="default" padding="md" className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-100">
                      {clause.name}
                    </h4>
                    <Badge variant="primary" size="sm">Special Syntax</Badge>
                  </div>
                  <p className="text-xs text-surface-600 dark:text-surface-400">
                    {clause.rule}
                  </p>
                  {clause.pattern1 && (
                    <div className="p-2.5 rounded-lg bg-surface-100 dark:bg-surface-800 font-mono text-xs text-primary-800 dark:text-primary-300 space-y-1">
                      <p>• {clause.pattern1}</p>
                      {clause.example1 && <p className="text-surface-600 dark:text-surface-400 pl-3">↳ "{clause.example1}"</p>}
                      {clause.pattern2 && <p>• {clause.pattern2}</p>}
                      {clause.example2 && <p className="text-surface-600 dark:text-surface-400 pl-3">↳ "{clause.example2}"</p>}
                    </div>
                  )}
                  {clause.example && (
                    <p className="font-mono text-xs text-surface-800 dark:text-surface-200 bg-white dark:bg-surface-900 p-2 rounded border border-surface-200 dark:border-surface-700">
                      Example: "{clause.example}"
                    </p>
                  )}
                  <p className="text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-2 rounded border border-amber-200 dark:border-amber-900/40">
                    <strong>Trap Alert:</strong> {clause.trap}
                  </p>
                </Card>
              ))}
            </div>

            <Callout type="warning" title="Purpose Clauses ka Formula Rule">
              {activeSection.goldenRule}
            </Callout>
          </div>
        )}

        {/* Section 7: Competitive Exam Decision Matrix */}
        {activeSection.id === 'sec-exam-decision-matrix' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                07
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
                  {activeSection.title}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-400">{activeSection.summary}</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-surface-700 dark:text-surface-300 leading-relaxed max-w-[85ch]">
              {activeSection.content}
            </p>

            {/* 4-Step Solving Algorithm Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {activeSection.algorithm.map((algo, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700 space-y-1.5"
                >
                  <span className="font-heading font-bold text-xs text-primary-700 dark:text-primary-300 block">
                    {algo.step}
                  </span>
                  <p className="text-[0.6875rem] text-surface-600 dark:text-surface-400 leading-relaxed">
                    {algo.action}
                  </p>
                </div>
              ))}
            </div>

            {/* Master Summary Reference Table */}
            <div className="overflow-x-auto pb-2">
              <table className="w-full text-xs text-left border-collapse border border-surface-200 dark:border-surface-800 rounded-xl overflow-hidden min-w-[600px]">
                <thead className="bg-surface-100 dark:bg-surface-800 font-heading font-bold text-surface-800 dark:text-surface-200">
                  <tr>
                    <th className="p-3 border-b border-surface-200 dark:border-surface-700">Main Clause Tense</th>
                    <th className="p-3 border-b border-surface-200 dark:border-surface-700">Temporal Relationship</th>
                    <th className="p-3 border-b border-surface-200 dark:border-surface-700">Mandatory Subordinate Tense</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-200 dark:divide-surface-800">
                  {activeSection.summaryTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-surface-50/50 dark:hover:bg-surface-800/40">
                      <td className="p-3 font-semibold text-surface-900 dark:text-surface-100">{row.mainTense}</td>
                      <td className="p-3 text-surface-700 dark:text-surface-300">{row.relation}</td>
                      <td className="p-3 font-mono font-bold text-primary-700 dark:text-primary-300">{row.subTense}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Callout type="tip" title="Exam Time Management Tip">
              Is 4-step algorithm ko follow karke aap Part-B English ke questions bina kisi confusion ke rapidly solve kar sakte hain aur exam mein apna time bacha sakte hain.
            </Callout>
          </div>
        )}
      </div>
    </div>
  )
}
