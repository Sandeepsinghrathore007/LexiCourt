import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, CheckCircle2, Lock } from 'lucide-react'
import syllabusData from '../content/syllabus.json'
import { Button, Card, Badge, ProgressBar } from '../components/common'
import { useProgress } from '../hooks/useProgress'

export default function DashboardPage() {
  const { getLessonProgress, getOverallProgress } = useProgress()
  const l01Progress = getLessonProgress('L01')
  const overallProgress = getOverallProgress()

  return (
    <div className="max-w-5xl mx-auto space-y-8 select-none">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-900 via-primary-800 to-indigo-950 text-white p-8 md:p-10 shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-4">
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
            <Link to="/lesson/L01">
              <Button
                variant="primary"
                size="lg"
                iconRight={ArrowRight}
                className="bg-white text-primary-900 hover:bg-primary-50 font-bold shadow-md"
              >
                {l01Progress > 0 ? 'Resume Lesson 01' : 'Start Pilot Lesson: Tenses Architecture'}
              </Button>
            </Link>
            <div className="text-xs text-primary-200 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-400" />
              <span>Pilot Lesson Active • Remaining 17 Modules Sequential</span>
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
            <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-heading font-bold text-sm text-surface-900">Zero Negative Marking (Official)</h3>
          </div>
          <p className="text-xs text-surface-600 leading-relaxed">
            The official syllabus explicitly confirms no negative marking for wrong answers across the 100 MCQs. A full 100% attempt strategy ensures every possible mark is captured.
          </p>
        </Card>

        <Card variant="default" padding="md" className="border-l-4 border-l-amber-500">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-heading font-bold text-sm text-surface-900">Part-B Merit Scope (Official)</h3>
          </div>
          <p className="text-xs text-surface-600 leading-relaxed">
            Part-A carries 80 marks (Computer Knowledge) and Part-B carries 20 marks (GK & English combined). High English accuracy is a decisive merit differentiator in the written test.
          </p>
        </Card>

        <Card variant="default" padding="md" className="border-l-4 border-l-success-500">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-success-100 text-success-700 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-heading font-bold text-sm text-surface-900">8–10 Min Pacing (Strategy)</h3>
          </div>
          <p className="text-xs text-surface-600 leading-relaxed">
            While the 2-hour paper has no official sectional time limits, completing English in 8–10 minutes is a recommended preparation strategy to maximize time for Part-A.
          </p>
        </Card>
      </div>

      {/* Active Pilot Lesson Hero Card */}
      <Card variant="primary" padding="lg" className="border-primary-300 bg-gradient-to-br from-primary-50/70 to-indigo-50/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">Pilot Module</Badge>
              <span className="text-xs font-semibold text-primary-700">Topic 1 • Part 1 of 3</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-heading text-primary-950">
              Lesson 01: Tenses Architecture & Time Markers
            </h2>
            <p className="text-xs md:text-sm text-primary-800/80 max-w-xl">
              12 tense structures (3 Times × 4 Aspects), auxiliary verb concord, affirmative/negative/interrogative syntax shifts, and contextual time markers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
            <div className="w-44 text-right">
              <div className="flex justify-between text-xs font-semibold text-primary-900 mb-1">
                <span>Completion</span>
                <span>{l01Progress}%</span>
              </div>
              <ProgressBar value={l01Progress} variant="primary" size="md" />
            </div>
            <Link to="/lesson/L01">
              <Button variant="primary" iconRight={ArrowRight}>
                {l01Progress > 0 ? 'Continue Lesson 01' : 'Begin 10-Step Journey'}
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Full 10-Topic Curriculum Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-heading text-surface-900">
              Official Examination Topics
            </h2>
            <p className="text-xs text-surface-500">
              Instructional 18-lesson decomposition of all 10 official syllabus topics
            </p>
          </div>
          <Badge variant="neutral">Curriculum: {overallProgress}% Completed</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {syllabusData.topics.map((topic) => {
            const hasActive = topic.lessons.some((l) => l.status === 'active')

            return (
              <Card
                key={topic.id}
                variant={hasActive ? 'default' : 'filled'}
                padding="md"
                className={`transition-all ${hasActive ? 'border-primary-300 ring-1 ring-primary-100' : 'opacity-90'}`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-surface-200 text-surface-700 text-xs font-bold font-mono flex items-center justify-center">
                      {topic.number}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-surface-900">
                      {topic.title}
                    </h3>
                  </div>
                  <Badge variant={hasActive ? 'primary' : 'neutral'} size="sm">
                    {hasActive ? 'Active' : 'Locked'}
                  </Badge>
                </div>

                <p className="text-xs text-surface-500 mb-3 pl-8">
                  {topic.category} • {topic.lessons.length} {topic.lessons.length === 1 ? 'Lesson' : 'Lessons'}
                </p>

                <div className="space-y-2 pl-8 border-l-2 border-surface-200 ml-3">
                  {topic.lessons.map((lesson) => {
                    const isActive = lesson.status === 'active'

                    if (isActive) {
                      return (
                        <Link
                          key={lesson.id}
                          to={`/lesson/${lesson.id}`}
                          className="flex items-center justify-between text-xs p-2 rounded-lg bg-primary-50 text-primary-900 font-semibold hover:bg-primary-100 transition-colors"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <CheckCircle2 size={14} className="text-primary-600 shrink-0" />
                            <span className="truncate">{lesson.id}: {lesson.title}</span>
                          </div>
                          <span className="text-[10px] text-primary-700 bg-primary-200/60 px-1.5 py-0.5 rounded font-mono">
                            {lesson.estimatedMinutes}m
                          </span>
                        </Link>
                      )
                    }

                    return (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between text-xs p-2 rounded-lg text-surface-400 bg-surface-50 select-none cursor-not-allowed"
                        title="Unlocks after prerequisite lesson mastery"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Lock size={13} className="text-surface-400 shrink-0" />
                          <span className="truncate">{lesson.id}: {lesson.title}</span>
                        </div>
                        <span className="text-[10px] text-surface-400 font-mono">
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
