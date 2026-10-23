import { useState } from 'react'
import { Layers, Sparkles } from 'lucide-react'
import studyData from '../../content/lessons/L01/study-document.json'
import { Card, Badge, Callout, Button } from '../common'
import L02StudyGuideStep from './L02StudyGuideStep'
import L03StudyGuideStep from './L03StudyGuideStep'
import L04StudyGuideStep from './L04StudyGuideStep'
import L05StudyGuideStep from './L05StudyGuideStep'
import L06StudyGuideStep from './L06StudyGuideStep'
import L07StudyGuideStep from './L07StudyGuideStep'
import L08StudyGuideStep from './L08StudyGuideStep'
import L09StudyGuideStep from './L09StudyGuideStep'
import L10StudyGuideStep from './L10StudyGuideStep'
import L11StudyGuideStep from './L11StudyGuideStep'
import L12StudyGuideStep from './L12StudyGuideStep'
import L13StudyGuideStep from './L13StudyGuideStep'
import L14StudyGuideStep from './L14StudyGuideStep'
import L15StudyGuideStep from './L15StudyGuideStep'
import L16StudyGuideStep from './L16StudyGuideStep'
import L17StudyGuideStep from './L17StudyGuideStep'
import L18StudyGuideStep from './L18StudyGuideStep'
import L19StudyGuideStep from './L19StudyGuideStep'

function L01StudyGuideStep() {
  const [activeSectionId, setActiveSectionId] = useState('sec-philosophy')
  const [tenseFilterTime, setTenseFilterTime] = useState('All')

  const activeSection = studyData.sections.find((s) => s.id === activeSectionId) || studyData.sections[0]

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="pb-4 border-b border-surface-200 dark:border-surface-800">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="primary" size="sm">Step 2 • Study Guide</Badge>
          <span className="text-xs text-surface-500 dark:text-surface-400">Tenses Architecture ka Complete Study Guide</span>
        </div>
        <h2 className="text-2xl font-bold font-heading text-surface-900 dark:text-surface-50">
          {studyData.title}
        </h2>
        <p className="text-xs text-surface-600 dark:text-surface-400 mt-1 max-w-[85ch]">
          {studyData.overview}
        </p>
      </div>

      {/* Section Quick Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-surface-100 dark:bg-surface-800/70 rounded-xl border border-surface-200 dark:border-surface-700">
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

      {/* Dynamic Active Section Viewport */}
      <div className="space-y-6">
        {/* Section 1: Time vs Aspect */}
        {activeSection.id === 'sec-philosophy' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                01
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
              {activeSection.dimensions.map((dim, idx) => (
                <Card
                  key={idx}
                  variant="default"
                  padding="md"
                  className={idx === 0 ? 'border-primary-200 dark:border-primary-800 bg-primary-50/20 dark:bg-primary-950/20' : 'border-amber-200 dark:border-amber-800 bg-amber-50/20 dark:bg-amber-950/20'}
                >
                  <div className="flex items-center gap-2 mb-2 font-heading font-bold text-sm text-surface-900 dark:text-surface-100">
                    {idx === 0 ? <Layers size={18} className="text-primary-600 dark:text-primary-400" /> : <Sparkles size={18} className="text-amber-600 dark:text-amber-400" />}
                    <span>{dim.name}</span>
                  </div>
                  <p className="text-xs text-surface-600 dark:text-surface-400 mb-3 leading-relaxed">
                    {dim.description}
                  </p>
                  <div className="space-y-2">
                    {dim.categories.map((cat, cIdx) => (
                      <div key={cIdx} className="p-2.5 rounded-lg bg-white dark:bg-surface-900/80 border border-surface-200 dark:border-surface-700 text-xs">
                        <strong className="text-surface-800 dark:text-surface-200 block mb-0.5">{cat.name}:</strong>
                        <span className="text-surface-600 dark:text-surface-400">{cat.detail}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <Callout type="info" title="Tense Structure ka Formula Model">
              {activeSection.formulaNote} Is dual-axis structure ko samajh lene se 12 tenses ko alag-alag ratne ki zaroorat nahi padti.
            </Callout>
          </div>
        )}

        {/* Section 2: Five Verb Forms */}
        {activeSection.id === 'sec-verb-forms' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                02
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
                  {activeSection.title}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-400">{activeSection.summary}</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-surface-700 dark:text-surface-300 leading-relaxed max-w-[85ch]">
              {activeSection.intro}
            </p>

            <div className="overflow-x-auto pb-2">
              <table className="w-full text-xs text-left border-collapse border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden min-w-[650px]">
                <thead className="bg-surface-100 dark:bg-surface-800 font-heading font-bold text-surface-800 dark:text-surface-100">
                  <tr>
                    <th className="p-3 border-b border-surface-200 dark:border-surface-700">Form</th>
                    <th className="p-3 border-b border-surface-200 dark:border-surface-700">Grammatical Name</th>
                    <th className="p-3 border-b border-surface-200 dark:border-surface-700">Regular Example</th>
                    <th className="p-3 border-b border-surface-200 dark:border-surface-700">Irregular Paradigm</th>
                    <th className="p-3 border-b border-surface-200 dark:border-surface-700">Functional Roles in Tenses</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-200 dark:divide-surface-700 bg-white dark:bg-surface-900 font-mono text-surface-700 dark:text-surface-200">
                  {activeSection.forms.map((f, i) => (
                    <tr key={i} className="hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors">
                      <td className="p-3 font-bold text-primary-600 dark:text-primary-300">{f.notation}</td>
                      <td className="p-3 font-sans font-medium text-surface-900 dark:text-surface-50">{f.name}</td>
                      <td className="p-3">{f.regularExample}</td>
                      <td className="p-3 font-bold text-amber-600 dark:text-amber-300">{f.irregularExample}</td>
                      <td className="p-3 font-sans text-surface-600 dark:text-surface-300 text-[0.6875rem] leading-relaxed">{f.roles}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Callout type="warning" title="Negative aur Interrogative Simple Past ka Rule">
              {activeSection.goldenRule}
            </Callout>
          </div>
        )}

        {/* Section 3: Twelve Tenses Matrix */}
        {activeSection.id === 'sec-twelve-tenses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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

              {/* Time Filter Pills */}
              <div className="flex items-center gap-1 bg-surface-100 dark:bg-surface-800 p-1 rounded-lg border border-surface-200 dark:border-surface-700 shrink-0">
                {['All', 'Present', 'Past', 'Future'].map((t) => (
                  <Button
                    key={t}
                    variant={tenseFilterTime === t ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setTenseFilterTime(t)}
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tenses List */}
            <div className="space-y-4">
              {activeSection.tenses
                .filter((t) => tenseFilterTime === 'All' || t.time === tenseFilterTime)
                .map((t) => (
                  <Card
                    key={t.id}
                    variant="default"
                    padding="lg"
                    className="border-surface-200 dark:border-surface-700 space-y-4 hover:border-primary-300 dark:hover:border-primary-500/50 transition-colors shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-100 dark:border-surface-700 pb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="primary" size="sm">{t.id}</Badge>
                        <h4 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
                          {t.name}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Badge variant="neutral" size="sm">{t.time}</Badge>
                        <Badge variant="secondary" size="sm">{t.aspect}</Badge>
                      </div>
                    </div>

                    <p className="text-xs text-surface-700 dark:text-surface-200 leading-relaxed max-w-[85ch]">
                      {t.definition}
                    </p>

                    {/* Structural Patterns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 font-mono text-[0.6875rem]">
                      <div className="p-2.5 rounded-lg bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-xs">
                        <span className="font-sans font-bold text-[0.625rem] text-success-700 dark:text-success-300 uppercase block mb-1">
                          Affirmative (+)
                        </span>
                        <p className="text-surface-800 dark:text-surface-100 break-words">{t.affirmative}</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-xs">
                        <span className="font-sans font-bold text-[0.625rem] text-error-700 dark:text-error-300 uppercase block mb-1">
                          Negative (−)
                        </span>
                        <p className="text-surface-800 dark:text-surface-100 break-words">{t.negative}</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-xs">
                        <span className="font-sans font-bold text-[0.625rem] text-primary-700 dark:text-primary-300 uppercase block mb-1">
                          Interrogative (?)
                        </span>
                        <p className="text-surface-800 dark:text-surface-100 break-words">{t.interrogative}</p>
                      </div>
                    </div>

                    {/* Auxiliary Concord & Signal Markers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-primary-50/50 dark:bg-primary-950/60 border border-primary-200/80 dark:border-primary-500/40">
                        <strong className="text-primary-900 dark:text-primary-200 block mb-1">Auxiliary Concord:</strong>
                        <p className="text-surface-700 dark:text-surface-200 text-[0.6875rem] leading-relaxed">{t.auxiliaryConcord}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-500/40">
                        <strong className="text-amber-900 dark:text-secondary-200 block mb-1">Contextual Signal Markers:</strong>
                        <p className="font-mono text-amber-800 dark:text-secondary-200 text-[0.6875rem]">{t.timeMarkers}</p>
                      </div>
                    </div>

                    {/* Example Analysis */}
                    <div className="space-y-2 pt-1 border-t border-surface-100 dark:border-surface-700">
                      <span className="text-[0.6875rem] font-bold text-surface-500 dark:text-surface-300 uppercase tracking-wider block">
                        High Court Exam ke Key Examples:
                      </span>
                      {t.examples.map((ex, exIdx) => (
                        <div key={exIdx} className="p-2.5 rounded-lg bg-surface-50 dark:bg-surface-800 border border-surface-200/70 dark:border-surface-700 text-xs shadow-xs">
                          <p className="font-semibold text-surface-900 dark:text-surface-100 mb-0.5">"{ex.sentence}"</p>
                          <p className="text-surface-600 dark:text-surface-300 text-[0.6875rem]">Analysis: {ex.analysis}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Section 4: Contextual Time Markers */}
        {activeSection.id === 'sec-time-markers' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                04
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
                  {activeSection.title}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-400">{activeSection.summary}</p>
              </div>
            </div>

            <div className="space-y-4">
              {activeSection.caveats.map((c, i) => (
                <Card key={i} variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-2 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" size="sm">Signal: {c.marker}</Badge>
                    <span className="font-heading font-bold text-sm text-surface-900 dark:text-surface-50">
                      {c.principle}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-surface-700 dark:text-surface-200 leading-relaxed">
                    {c.explanation}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Section 5: Confusing Pairs */}
        {activeSection.id === 'sec-confusing-pairs' && (
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

            <div className="space-y-4">
              {activeSection.pairs.map((p, i) => (
                <Card key={i} variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-3 shadow-xs">
                  <h4 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
                    {p.pair}
                  </h4>
                  <p className="text-xs text-surface-700 dark:text-surface-200 leading-relaxed max-w-[85ch]">
                    {p.explanation}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="p-3 rounded-xl bg-error-50 dark:bg-error-950/80 border border-error-200 dark:border-error-500/50 text-error-900 dark:text-error-100 space-y-1">
                      <span className="font-bold block text-[0.625rem] uppercase text-error-600 dark:text-error-300">Incorrect:</span>
                      <p className="font-mono line-through">"{p.incorrect}"</p>
                    </div>
                    <div className="p-3 rounded-xl bg-success-50 dark:bg-success-950/80 border border-success-200 dark:border-success-500/50 text-success-900 dark:text-success-100 space-y-1">
                      <span className="font-bold block text-[0.625rem] uppercase text-success-600 dark:text-success-300">Correct:</span>
                      <p className="font-mono font-semibold">"{p.correct}"</p>
                    </div>
                  </div>
                  <p className="text-[0.6875rem] text-surface-500 dark:text-surface-300 italic">Rationale: {p.reasoning}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Section 6: 5-Step Protocol */}
        {activeSection.id === 'sec-solving-algorithm' && (
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

            <div className="space-y-3">
              {activeSection.steps.map((st) => (
                <div
                  key={st.step}
                  className="flex items-start gap-3 p-4 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-primary-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {st.step}
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-100">{st.title}</h5>
                    <p className="text-xs text-surface-700 dark:text-surface-200 leading-relaxed max-w-[85ch]">{st.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function StudyGuideStep({ lessonId = 'L01' }) {
  if (lessonId === 'L19') {
    return <L19StudyGuideStep />
  }
  if (lessonId === 'L18') {
    return <L18StudyGuideStep />
  }
  if (lessonId === 'L17') {
    return <L17StudyGuideStep />
  }
  if (lessonId === 'L16') {
    return <L16StudyGuideStep />
  }
  if (lessonId === 'L15') {
    return <L15StudyGuideStep />
  }
  if (lessonId === 'L14') {
    return <L14StudyGuideStep />
  }
  if (lessonId === 'L13') {
    return <L13StudyGuideStep />
  }
  if (lessonId === 'L12') {
    return <L12StudyGuideStep />
  }
  if (lessonId === 'L11') {
    return <L11StudyGuideStep />
  }
  if (lessonId === 'L10') {
    return <L10StudyGuideStep />
  }
  if (lessonId === 'L09') {
    return <L09StudyGuideStep />
  }
  if (lessonId === 'L08') {
    return <L08StudyGuideStep />
  }
  if (lessonId === 'L07') {
    return <L07StudyGuideStep />
  }
  if (lessonId === 'L06') {
    return <L06StudyGuideStep />
  }
  if (lessonId === 'L05') {
    return <L05StudyGuideStep />
  }
  if (lessonId === 'L04') {
    return <L04StudyGuideStep />
  }
  if (lessonId === 'L03') {
    return <L03StudyGuideStep />
  }
  if (lessonId === 'L02') {
    return <L02StudyGuideStep />
  }
  return <L01StudyGuideStep />
}
