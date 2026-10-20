import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronDown, ChevronRight, Lock, CheckCircle2, PlayCircle, Sparkles } from 'lucide-react'
import syllabusData from '../../content/syllabus.json'
import { Badge, ProgressBar } from '../common'
import { useProgress } from '../../hooks/useProgress'

export default function CurriculumSidebar() {
  const { lessonId = 'L01' } = useParams()
  const { getLessonProgress } = useProgress()
  const [expandedTopics, setExpandedTopics] = useState({
    T01: true, // Expand Topic 1 by default
    T02: false,
    T03: false,
  })

  const toggleTopic = (topicId) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }))
  }

  return (
    <aside className="w-[310px] shrink-0 border-r border-surface-200 bg-white min-h-[calc(100vh-4rem)] flex flex-col justify-between select-none">
      <div className="p-4 flex-1 overflow-y-auto max-h-[calc(100vh-10rem)]">
        {/* Sidebar Header */}
        <div className="mb-4 pb-3 border-b border-surface-200">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-heading font-bold text-sm text-surface-900 uppercase tracking-wider">
              Syllabus Curriculum
            </h2>
            <Badge variant="primary" size="sm">18 Lessons</Badge>
          </div>
          <p className="text-xs text-surface-500">
            10 Prescribed High Court Topics
          </p>
        </div>

        {/* Topics Accordion List */}
        <div className="space-y-3">
          {syllabusData.topics.map((topic) => {
            const isExpanded = expandedTopics[topic.id]
            const containsActiveLesson = topic.lessons.some((l) => l.id === lessonId)

            return (
              <div
                key={topic.id}
                className={`rounded-xl border transition-colors ${
                  containsActiveLesson
                    ? 'border-primary-200 bg-primary-50/20'
                    : 'border-surface-200 bg-white'
                }`}
              >
                {/* Topic Header Toggle */}
                <button
                  type="button"
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full flex items-start gap-2.5 p-3 text-left cursor-pointer hover:bg-surface-50 rounded-xl transition-colors"
                >
                  <span className="mt-0.5 text-surface-400">
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[11px] font-bold text-primary-700 bg-primary-100 px-1.5 py-0.2 rounded">
                        Topic {topic.number}
                      </span>
                      <span className="text-[11px] text-surface-400 font-medium truncate">
                        {topic.lessons.length} {topic.lessons.length === 1 ? 'Lesson' : 'Lessons'}
                      </span>
                    </div>
                    <p className="font-heading text-xs font-bold text-surface-900 leading-snug line-clamp-2">
                      {topic.title}
                    </p>
                  </div>
                </button>

                {/* Lessons Under Topic */}
                {isExpanded && (
                  <div className="px-2 pb-2.5 pt-0.5 space-y-1.5">
                    {topic.lessons.map((lesson) => {
                      const isActive = lesson.id === lessonId
                      const isLocked = lesson.status === 'locked'
                      const progressPct = getLessonProgress(lesson.id)
                      const isMastered = progressPct === 100

                      if (isLocked) {
                        return (
                          <div
                            key={lesson.id}
                            className="group flex items-center justify-between p-2.5 rounded-lg bg-surface-50/80 border border-transparent text-surface-400 cursor-not-allowed select-none"
                            title="Unlocks sequentially after foundational lesson mastery"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <Lock size={14} className="shrink-0 text-surface-400" />
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-surface-600 truncate">
                                  {lesson.id}: {lesson.title}
                                </p>
                                <span className="text-[10px] text-surface-400">
                                  {lesson.difficulty} • {lesson.estimatedMinutes}m
                                </span>
                              </div>
                            </div>
                            <span className="text-[10px] uppercase font-semibold tracking-wider text-surface-400 bg-surface-200/60 px-1.5 py-0.5 rounded">
                              Locked
                            </span>
                          </div>
                        )
                      }

                      // Active Pilot Lesson (L01)
                      return (
                        <Link
                          key={lesson.id}
                          to={`/lesson/${lesson.id}`}
                          className={`flex flex-col gap-1.5 p-2.5 rounded-lg border transition-all ${
                            isActive
                              ? 'bg-primary-50 border-primary-300 shadow-xs'
                              : 'bg-white hover:bg-surface-50 border-surface-200'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              {isMastered ? (
                                <CheckCircle2 size={16} className="text-success-600 shrink-0" />
                              ) : (
                                <PlayCircle
                                  size={16}
                                  className={`shrink-0 ${
                                    isActive ? 'text-primary-600 animate-pulse' : 'text-surface-400'
                                  }`}
                                />
                              )}
                              <span
                                className={`text-xs font-bold truncate ${
                                  isActive ? 'text-primary-900' : 'text-surface-800'
                                }`}
                              >
                                {lesson.id}: {lesson.title}
                              </span>
                            </div>
                            <Badge variant={isActive ? 'primary' : 'success'} size="sm">
                              {isMastered ? 'Mastered' : 'Pilot'}
                            </Badge>
                          </div>

                          {/* Lesson Mini Progress Bar */}
                          <div className="w-full pl-6">
                            <ProgressBar
                              value={progressPct}
                              size="sm"
                              variant={isMastered ? 'success' : 'primary'}
                            />
                            <div className="flex justify-between items-center mt-1 text-[10px] text-surface-500">
                              <span>Part {lesson.part}</span>
                              <span className="font-semibold">{progressPct}% Complete</span>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Sidebar Footer: Exam Discrepancy Note */}
      <div className="p-3.5 m-3 rounded-xl bg-gradient-to-br from-surface-100 to-surface-50 border border-surface-200 text-xs space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-surface-800">
          <Sparkles size={14} className="text-primary-600" />
          <span>Official Discrepancy Rule</span>
        </div>
        <p className="text-[11px] text-surface-600 leading-relaxed">
          In case of language translation doubt, the High Court mandates that the English version is authentic.
        </p>
      </div>
    </aside>
  )
}
