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
    T01: true,
    T02: true,
    T03: true,
    T04: true,
    T05: true,
    T06: true,
    T07: true,
    T08: true,
    T09: true,
    T10: true,
  })

  const toggleTopic = (topicId) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }))
  }

  return (
    <aside className="w-[256px] shrink-0 border-r border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 min-h-[calc(100vh-4rem)] flex flex-col justify-between select-none transition-colors duration-200">
      <div className="p-3 flex-1 overflow-y-auto max-h-[calc(100vh-10rem)]">
        {/* Sidebar Header */}
        <div className="mb-3 pb-2.5 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-50 uppercase tracking-wider">
              Syllabus Curriculum
            </h2>
            <Badge variant="primary" size="sm">19 Modules</Badge>
          </div>
          <p className="text-xs text-surface-500 dark:text-surface-300">
            Instructional breakdown of 10 official topics
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
                    ? 'border-primary-300 dark:border-primary-500/50 bg-primary-50/20 dark:bg-primary-950/40 shadow-xs'
                    : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-850'
                }`}
              >
                {/* Topic Header Toggle */}
                <button
                  type="button"
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full flex items-start gap-2 p-2.5 text-left cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800/60 rounded-xl transition-colors"
                >
                  <span className="mt-0.5 text-surface-400 dark:text-surface-500">
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[0.6875rem] font-bold text-primary-700 dark:text-primary-200 bg-primary-100 dark:bg-primary-900/80 px-1.5 py-0.2 rounded border border-primary-200 dark:border-primary-500/30">
                        Topic {topic.number}
                      </span>
                      <span className="text-[0.6875rem] text-surface-400 dark:text-surface-400 font-medium truncate">
                        {topic.lessons.length} {topic.lessons.length === 1 ? 'Lesson' : 'Lessons'}
                      </span>
                    </div>
                    <p className="font-heading text-xs font-bold text-surface-900 dark:text-surface-50 leading-snug line-clamp-2">
                      {topic.title}
                    </p>
                  </div>
                </button>

                {/* Lessons Under Topic */}
                {isExpanded && (
                  <div className="px-2 pb-2 pt-0.5 space-y-1.5">
                    {topic.lessons.map((lesson) => {
                      const isActive = lesson.id === lessonId
                      const isLocked = lesson.status === 'locked'
                      const progressPct = getLessonProgress(lesson.id)
                      const isMastered = progressPct === 100

                      if (isLocked) {
                        return (
                          <div
                            key={lesson.id}
                            className="group flex items-center justify-between p-2 rounded-lg bg-surface-50/80 dark:bg-surface-800/60 border border-transparent dark:border-surface-700/50 text-surface-400 dark:text-surface-400 cursor-not-allowed select-none"
                            title="Unlocks sequentially after foundational lesson mastery"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <Lock size={14} className="shrink-0 text-surface-400 dark:text-surface-400" />
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-surface-600 dark:text-surface-300 truncate">
                                  {lesson.id}: {lesson.title}
                                </p>
                                <span className="text-[0.625rem] text-surface-400 dark:text-surface-400">
                                  {lesson.difficulty} • {lesson.estimatedMinutes}m
                                </span>
                              </div>
                            </div>
                            <span className="text-[0.625rem] uppercase font-semibold tracking-wider text-surface-500 dark:text-surface-300 bg-surface-200/60 dark:bg-surface-700/60 px-1.5 py-0.5 rounded">
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
                          className={`flex flex-col gap-1.5 p-2 rounded-lg border transition-all ${
                            isActive
                              ? 'bg-primary-50 dark:bg-primary-950/70 border-primary-300 dark:border-primary-500/50 shadow-xs'
                              : 'bg-white dark:bg-surface-800/80 hover:bg-surface-50 dark:hover:bg-surface-800 border-surface-200 dark:border-surface-700'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              {isMastered ? (
                                <CheckCircle2 size={16} className="text-success-600 dark:text-success-400 shrink-0" />
                              ) : (
                                <PlayCircle
                                  size={16}
                                  className={`shrink-0 ${
                                    isActive ? 'text-primary-600 dark:text-primary-400 animate-pulse' : 'text-surface-400'
                                  }`}
                                />
                              )}
                              <span
                                className={`text-xs font-bold truncate ${
                                  isActive ? 'text-primary-900 dark:text-primary-100' : 'text-surface-800 dark:text-surface-100'
                                }`}
                              >
                                {lesson.id}: {lesson.title}
                              </span>
                            </div>
                            <Badge variant={isMastered ? 'success' : progressPct > 0 ? 'secondary' : isActive ? 'primary' : 'neutral'} size="sm">
                              {isMastered ? 'Mastered' : progressPct > 0 ? `${progressPct}%` : 'Active'}
                            </Badge>
                          </div>

                          {/* Lesson Mini Progress Bar */}
                          <div className="w-full pl-5">
                            <ProgressBar
                              value={progressPct}
                              size="sm"
                              variant={isMastered ? 'success' : 'primary'}
                            />
                            <div className="flex justify-between items-center mt-1 text-[0.625rem] text-surface-500 dark:text-surface-300">
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

      {/* Sidebar Footer: Official Exam Scheme */}
      <div className="p-3 m-2 rounded-xl bg-gradient-to-br from-surface-100 to-surface-50 dark:from-surface-800 dark:to-surface-850 border border-surface-200 dark:border-surface-700 text-xs space-y-1.5 shadow-xs">
        <div className="flex items-center gap-1.5 font-bold text-surface-800 dark:text-surface-100">
          <Sparkles size={14} className="text-primary-600 dark:text-primary-300" />
          <span>Official Exam Structure</span>
        </div>
        <p className="text-[0.6875rem] text-surface-600 dark:text-surface-300 leading-relaxed">
          100 MCQs / 100 Marks (Part-A: 80 Computer, Part-B: 20 GK & English combined). 2-hour duration, no negative marking.
        </p>
      </div>
    </aside>
  )
}
