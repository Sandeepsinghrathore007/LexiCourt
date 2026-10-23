import { useEffect } from 'react'
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom'
import {
  Lock,
  ArrowRight,
  ArrowLeft,
  Clock,
  SkipForward,
} from 'lucide-react'
import { Breadcrumbs, LessonSubNav } from '../components/layout'
import { Button, Card, Badge } from '../components/common'
import {
  OrientationStep,
  StudyGuideStep,
  VisualArchitectureStep,
  RuleCardsStep,
  WorkedExamplesStep,
  CommonPitfallsStep,
  GuidedPracticeStep,
  IndependentPracticeStep,
  MasteryAssessmentStep,
  ErrorReviewStep,
  PracticePlaceholderStep,
} from '../components/lesson'
import syllabusData from '../content/syllabus.json'
import { useLesson } from '../hooks/useLesson'
import { useProgress } from '../hooks/useProgress'

export default function LessonPage() {
  const { lessonId = 'L01' } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const isDevPreview = searchParams.get('preview') === 'true'
  const {
    activeMetadata,
    setActiveLessonId,
    currentStepIndex,
    currentStep,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
  } = useLesson()
  const { markStepCompleted, isStepCompleted, getLessonProgress } = useProgress()

  useEffect(() => {
    if (lessonId) {
      setActiveLessonId(lessonId)
    }
  }, [lessonId, setActiveLessonId])

  const lessonInSyllabus = syllabusData.topics
    .flatMap((t) => t.lessons)
    .find((l) => l.id === lessonId)

  const activeLessonInSyllabus =
    syllabusData.topics
      .flatMap((t) => t.lessons)
      .filter((l) => l.status === 'active')
      .slice(-1)[0]?.id || 'L10'

  const isLocked = (!lessonInSyllabus || lessonInSyllabus.status === 'locked') && !isDevPreview
  const isCurrentStepDone = isStepCompleted(lessonId, currentStep?.id)
  const lessonProgressPct = getLessonProgress(lessonId)

  // Auto-scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStepIndex])

  // Handle step completion
  const handleCompleteAndNext = () => {
    if (currentStep?.id) {
      markStepCompleted(lessonId, currentStep.id)
    }
    if (!isLastStep) {
      nextStep()
    } else {
      const allLessons = syllabusData.topics.flatMap((t) => t.lessons)
      const currentIndex = allLessons.findIndex((l) => l.id === lessonId)
      const nextLesson = allLessons[currentIndex + 1]
      if (nextLesson) {
        navigate(`/lesson/${nextLesson.id}`)
      } else {
        navigate('/')
      }
    }
  }

  // Handle skip without completing step
  const handleSkip = () => {
    if (!isLastStep) {
      nextStep()
    } else {
      const allLessons = syllabusData.topics.flatMap((t) => t.lessons)
      const currentIndex = allLessons.findIndex((l) => l.id === lessonId)
      const nextLesson = allLessons[currentIndex + 1]
      if (nextLesson) {
        navigate(`/lesson/${nextLesson.id}`)
      } else {
        navigate('/')
      }
    }
  }

  // Locked Lesson Guard View
  if (isLocked) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 flex items-center justify-center mx-auto text-surface-400 dark:text-surface-500 shadow-sm">
          <Lock size={32} />
        </div>
        <div className="space-y-2">
          <Badge variant="neutral">Curriculum Protected</Badge>
          <h2 className="text-2xl font-bold font-heading text-surface-900 dark:text-white">
            Lesson {lessonId} is Currently Locked
          </h2>
          <p className="text-sm text-surface-600 dark:text-surface-300 max-w-md mx-auto leading-relaxed">
            In accordance with our typing-tutor inspired mastery architecture, subsequent modules unlock sequentially after achieving mastery in prerequisite foundations.
          </p>
        </div>
        <Card variant="filled" padding="md" className="max-w-md mx-auto text-left text-xs text-surface-600 dark:text-surface-300 space-y-2 border-surface-200 dark:border-surface-700">
          <p className="font-semibold text-surface-800 dark:text-surface-100">Prerequisite to Unlock:</p>
          <p>• Complete all 10 pedagogical steps of the preceding module</p>
          <p>• Achieve ≥80% score on the prerequisite Mastery Assessment</p>
        </Card>
        <Link to={`/lesson/${activeLessonInSyllabus}`}>
          <Button variant="primary" icon={ArrowLeft}>
            Return to Active Lesson ({activeLessonInSyllabus})
          </Button>
        </Link>
      </div>
    )
  }

  // Render Step Content based on step type
  const renderStepContent = () => {
    switch (currentStep?.type) {
      case 'orientation':
        return <OrientationStep metadata={activeMetadata} lessonId={lessonId} />
      case 'study-doc':
        return <StudyGuideStep lessonId={lessonId} />
      case 'visuals':
        return <VisualArchitectureStep lessonId={lessonId} />
      case 'rule-cards':
        return <RuleCardsStep lessonId={lessonId} />
      case 'worked-examples':
        return <WorkedExamplesStep lessonId={lessonId} />
      case 'common-mistakes':
        return <CommonPitfallsStep lessonId={lessonId} />
      case 'guided-practice':
        return <GuidedPracticeStep lessonId={lessonId} />
      case 'independent-practice':
        return <IndependentPracticeStep lessonId={lessonId} />
      case 'mastery-assessment':
        return <MasteryAssessmentStep lessonId={lessonId} />
      case 'error-review':
        return <ErrorReviewStep lessonId={lessonId} />
      default:
        return <PracticePlaceholderStep step={currentStep} />
    }
  }

  return (
    <div className="w-full space-y-4 select-none">
      {/* Breadcrumbs */}
      <Breadcrumbs
        topicTitle={activeMetadata.topicTitle}
        lessonTitle={`${activeMetadata.id}: ${activeMetadata.shortTitle}`}
        stepTitle={`Step ${currentStep?.index}: ${currentStep?.title}`}
      />

      {/* Lesson Header Banner */}
      <Card
        variant="default"
        padding="lg"
        className="border-primary-200 dark:border-surface-700 bg-gradient-to-r from-white via-primary-50/20 to-white dark:from-surface-900 dark:via-surface-850 dark:to-surface-900 shadow-xs"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">Lesson {activeMetadata.id}</Badge>
              <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">
                {activeMetadata.topicTitle} • Part {activeMetadata.part}
              </span>
              <Badge variant="secondary" size="sm">{activeMetadata.difficulty}</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold font-heading text-surface-900 dark:text-surface-50 tracking-tight">
              {activeMetadata.title}
            </h1>
            <p className="text-xs md:text-sm text-surface-600 dark:text-surface-300 max-w-4xl leading-relaxed">
              {activeMetadata.description}
            </p>
          </div>

          <div className="flex md:flex-col items-center md:items-end justify-between shrink-0 gap-1.5 border-t md:border-t-0 pt-3 md:pt-0 border-surface-100 dark:border-surface-700">
            <div className="flex items-center gap-1.5 text-xs text-surface-500 dark:text-surface-400">
              <Clock size={13} />
              <span>Est. {activeMetadata.estimatedMinutes} mins</span>
            </div>
            <span className="text-xs font-bold text-primary-700 dark:text-primary-200 bg-primary-100/60 dark:bg-primary-900/60 px-2.5 py-1 rounded-full border border-primary-200/50 dark:border-primary-500/40">
              {lessonProgressPct}% Completed
            </span>
          </div>
        </div>
      </Card>

      {/* Main Two-Column Stage */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-start w-full min-w-0">
        {/* Left Column: 10-Step SubNav */}
        <LessonSubNav />

        {/* Right Column: Step Viewport Container */}
        <section className="flex-1 min-w-0 w-full space-y-4">
          <Card
            variant="default"
            padding="lg"
            className="shadow-xs border-surface-200 dark:border-surface-700 min-h-[500px] flex flex-col justify-between"
          >
            {/* Dynamic Step Viewport */}
            <div className="min-w-0">
              {renderStepContent()}
            </div>

            {/* Step Navigation Controls Footer */}
            <div className="pt-6 mt-8 border-t border-surface-200 dark:border-surface-700 flex flex-wrap items-center justify-between gap-4">
              <Button
                variant="secondary"
                size="md"
                icon={ArrowLeft}
                onClick={prevStep}
                disabled={isFirstStep}
              >
                Previous Step
              </Button>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                {!isCurrentStepDone && (
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => markStepCompleted(lessonId, currentStep?.id)}
                    className="text-surface-600 dark:text-surface-300 hover:text-success-700 dark:hover:text-success-400 hover:bg-success-50 dark:hover:bg-success-950/30"
                  >
                    Mark Step Complete
                  </Button>
                )}

                <Button
                  variant="secondary"
                  size="md"
                  iconRight={SkipForward}
                  onClick={handleSkip}
                  title={isLastStep ? 'Skip to next lesson without completing' : 'Skip to next step without completing'}
                >
                  {isLastStep ? 'Skip Lesson' : 'Skip Step'}
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  iconRight={ArrowRight}
                  onClick={handleCompleteAndNext}
                >
                  {isLastStep ? `Finish Lesson ${activeMetadata?.id || lessonId}` : 'Complete & Next Step'}
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
