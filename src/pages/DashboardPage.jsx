import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, CheckCircle2, Lock } from 'lucide-react'
import syllabusData from '../content/syllabus.json'
import { Button, Card, Badge, ProgressBar } from '../components/common'
import { useProgress } from '../hooks/useProgress'

export default function DashboardPage() {
  const { getLessonProgress, getOverallProgress } = useProgress()
  const overallProgress = getOverallProgress()

  const allLessons = useMemo(() => syllabusData.topics.flatMap((t) => t.lessons), [])
  const activeLesson = allLessons.find((l) => getLessonProgress(l.id) < 100) || allLessons[allLessons.length - 1]
  const activeLessonId = activeLesson?.id || 'L01'
  const activeLessonProgress = getLessonProgress(activeLessonId)

  const activeTopic = syllabusData.topics.find((t) => t.lessons.some((l) => l.id === activeLessonId))
  const activeTopicSubtitle = `Topic ${activeTopic?.number || 1} • Part ${activeLesson?.part || '1 of 1'}`

  const activeLessonTitle = `Lesson ${activeLessonId.replace('L', '')}: ${activeLesson?.title || ''}`
  const activeLessonDescription = activeLesson?.description || ''

  const ctaText =
    activeLessonProgress > 0
      ? `Resume Lesson ${activeLessonId.replace('L', '')}`
      : activeLessonId === 'L01'
      ? 'Start Pilot Lesson: Tenses Architecture'
      : `Start Lesson ${activeLessonId.replace('L', '')}: ${activeLesson?.title?.split('—')[0]?.split(':')[0]?.trim() || ''}`

  return (
    <div className="w-full space-y-6 select-none">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 dark:from-surface-900 dark:via-surface-850 dark:to-surface-900 text-white p-6 md:p-8 shadow-sm border border-transparent dark:border-surface-700">
        <div className="relative z-10 max-w-2xl space-y-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary" className="bg-primary-700/60 text-primary-100 border-primary-500/40">
              Rajasthan High Court HSA 2026
            </Badge>
            <Badge variant="secondary" className="bg-amber-500/20 text-amber-200 border-amber-400/30">
              Part-B English Mastery
            </Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Structure Your English Preparation with Lesson-Based Precision
          </h1>

          <p className="text-sm md:text-base text-primary-100/90 leading-relaxed">
            Engineered specifically for High Court System Assistant aspirants. Move progressively from foundational verbal architecture to flawless 10/10 execution on exam day.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <Link to={`/lesson/${activeLessonId}`}>
              <Button
                variant="primary"
                size="lg"
                iconRight={ArrowRight}
                className="!bg-white !text-primary-950 hover:!bg-primary-50 font-bold shadow-md"
              >
                {ctaText}
              </Button>
            </Link>
            <div className="text-xs text-primary-200 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-400" />
              <span>
                {overallProgress === 100
                  ? 'All 19 Modules Mastered • Exam Ready'
                  : overallProgress > 0
                  ? `${overallProgress}% Curriculum Completed • Lesson ${activeLessonId.replace('L', '')} Active`
                  : 'Pilot Lesson Active • Remaining 18 Modules Sequential'}
              </span>
            </div>
          </div>
        </div>

        {/* Decorative Grid Lines */}
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Strategic Exam Framework (Official Rules & Prep Strategies) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="default" padding="md" className="border-l-4 border-l-primary-500">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-100">Zero Negative Marking (Official)</h3>
          </div>
          <p className="text-xs text-surface-600 dark:text-surface-400 leading-relaxed">
            The official syllabus explicitly confirms no negative marking for wrong answers across the 100 MCQs. A full 100% attempt strategy ensures every possible mark is captured.
          </p>
        </Card>

        <Card variant="default" padding="md" className="border-l-4 border-l-amber-500">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-100">Part-B Merit Scope (Official)</h3>
          </div>
          <p className="text-xs text-surface-600 dark:text-surface-400 leading-relaxed">
            Part-A carries 80 marks (Computer Knowledge) and Part-B carries 20 marks (GK & English combined). High English accuracy is a decisive merit differentiator in the written test.
          </p>
        </Card>

        <Card variant="default" padding="md" className="border-l-4 border-l-success-500">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-success-100 dark:bg-success-950 text-success-700 dark:text-success-300 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-100">8–10 Min Pacing (Strategy)</h3>
          </div>
          <p className="text-xs text-surface-600 dark:text-surface-400 leading-relaxed">
            While the 2-hour paper has no official sectional time limits, completing English in 8–10 minutes is a recommended preparation strategy to maximize time for Part-A.
          </p>
        </Card>
      </div>

      {/* Active Module Hero Card */}
      <Card variant="default" padding="lg" className="border-primary-200 dark:border-surface-700 bg-gradient-to-br from-primary-50/60 via-white to-primary-50/20 dark:from-surface-900 dark:via-surface-850 dark:to-surface-900 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">
                Active Target Module
              </Badge>
              <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
                {activeTopicSubtitle}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-heading text-primary-950 dark:text-primary-100">
              {activeLessonTitle}
            </h2>
            <p className="text-xs md:text-sm text-primary-800/80 dark:text-primary-200/90 max-w-xl">
              {activeLessonDescription}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
            <div className="w-44 text-right">
              <div className="flex justify-between text-xs font-semibold text-primary-900 dark:text-primary-200 mb-1">
                <span>{activeLessonId} Completion</span>
                <span>{activeLessonProgress}%</span>
              </div>
              <ProgressBar value={activeLessonProgress} variant="primary" size="md" />
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              {allLessons
                .filter((l) => getLessonProgress(l.id) === 100 && l.id !== activeLessonId)
                .slice(-4)
                .map((l) => (
                  <Link key={l.id} to={`/lesson/${l.id}`}>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Review {l.id}
                    </Button>
                  </Link>
                ))}
              <Link to={`/lesson/${activeLessonId}`}>
                <Button variant="primary" iconRight={ArrowRight}>
                  {ctaText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>

      {/* Full 10-Topic Curriculum Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-heading text-surface-900 dark:text-surface-100">
              Official Examination Topics
            </h2>
            <p className="text-xs text-surface-500 dark:text-surface-400">
              Instructional 19-lesson decomposition of all 10 official syllabus topics
            </p>
          </div>
          <Badge variant="neutral">Curriculum: {overallProgress}% Completed</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {syllabusData.topics.map((topic) => {
            const hasActive = topic.lessons.some((l) => l.status === 'active' || l.status === 'completed')

            return (
              <Card
                key={topic.id}
                variant={hasActive ? 'default' : 'filled'}
                padding="md"
                className={`transition-all ${hasActive ? 'border-primary-300 dark:border-primary-700 ring-1 ring-primary-100 dark:ring-primary-950' : 'opacity-90'}`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-surface-200 dark:bg-surface-800 text-surface-700 dark:text-surface-300 text-xs font-bold font-mono flex items-center justify-center">
                      {topic.number}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-100">
                      {topic.title}
                    </h3>
                  </div>
                  <Badge variant={hasActive ? 'primary' : 'neutral'} size="sm">
                    {hasActive ? 'In Progress' : 'Locked'}
                  </Badge>
                </div>

                <p className="text-xs text-surface-500 dark:text-surface-400 mb-3 pl-8">
                  {topic.category} • {topic.lessons.length} {topic.lessons.length === 1 ? 'Lesson' : 'Lessons'}
                </p>

                <div className="space-y-2 pl-8 border-l-2 border-surface-200 dark:border-surface-800 ml-3">
                  {topic.lessons.map((lesson) => {
                    const progress = getLessonProgress(lesson.id)
                    const isDone = progress === 100
                    const isAvailable = lesson.status !== 'locked'

                    if (isAvailable) {
                      return (
                        <Link
                          key={lesson.id}
                          to={`/lesson/${lesson.id}`}
                          className={`flex items-center justify-between text-xs p-2 rounded-lg font-semibold transition-colors ${
                            isDone
                              ? 'bg-success-50 dark:bg-success-950/40 text-success-900 dark:text-success-200 hover:bg-success-100 dark:hover:bg-success-900/40'
                              : progress > 0
                              ? 'bg-primary-50 dark:bg-primary-950/60 text-primary-900 dark:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-900/60'
                              : 'bg-surface-50 dark:bg-surface-800/60 text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <CheckCircle2
                              size={14}
                              className={`shrink-0 ${isDone ? 'text-success-600 dark:text-success-400' : 'text-primary-600 dark:text-primary-400'}`}
                            />
                            <span className="truncate">{lesson.id}: {lesson.title}</span>
                          </div>
                          <span
                            className={`text-[0.625rem] px-1.5 py-0.5 rounded font-mono ${
                              isDone
                                ? 'bg-success-200/60 dark:bg-success-900/60 text-success-800 dark:text-success-300'
                                : progress > 0
                                ? 'bg-primary-200/60 dark:bg-primary-900/60 text-primary-700 dark:text-primary-300'
                                : 'bg-surface-200/60 dark:bg-surface-700/60 text-surface-600 dark:text-surface-400'
                            }`}
                          >
                            {isDone ? 'Completed' : progress > 0 ? `${progress}%` : `${lesson.estimatedMinutes}m`}
                          </span>
                        </Link>
                      )
                    }

                    return (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between text-xs p-2 rounded-lg text-surface-400 dark:text-surface-500 bg-surface-50 dark:bg-surface-800/40 select-none cursor-not-allowed"
                        title="Unlocks after prerequisite lesson mastery"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Lock size={13} className="text-surface-400 dark:text-surface-500 shrink-0" />
                          <span className="truncate">{lesson.id}: {lesson.title}</span>
                        </div>
                        <span className="text-[0.625rem] text-surface-400 dark:text-surface-500 font-mono">
                          Locked
                        </span>
                      </div>
                    )
                  })}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
