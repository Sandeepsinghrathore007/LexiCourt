import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Lock,
  ArrowRight,
  ArrowLeft,
  Clock,
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
  PracticePlaceholderStep,
} from '../components/lesson'
import { useLesson } from '../hooks/useLesson'
import { useProgress } from '../hooks/useProgress'

export default function LessonPage() {
  const { lessonId = 'L01' } = useParams()
  const {
    activeMetadata,
    currentStepIndex,
    currentStep,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
  } = useLesson()
  const { markStepCompleted, isStepCompleted, getLessonProgress } = useProgress()

  const isLocked = lessonId !== 'L01'
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
    }
  }

  // Locked Lesson Guard View
  if (isLocked) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-surface-100 border border-surface-200 flex items-center justify-center mx-auto text-surface-400 shadow-sm">
          <Lock size={32} />
        </div>
        <div className="space-y-2">
          <Badge variant="neutral">Curriculum Protected</Badge>
          <h2 className="text-2xl font-bold font-heading text-surface-900">
            Lesson {lessonId} is Currently Locked
          </h2>
          <p className="text-sm text-surface-600 max-w-md mx-auto leading-relaxed">
            In accordance with our typing-tutor inspired mastery architecture, subsequent modules unlock sequentially after achieving mastery in prerequisite foundations.
          </p>
        </div>
        <Card variant="filled" padding="md" className="max-w-md mx-auto text-left text-xs text-surface-600 space-y-2">
          <p className="font-semibold text-surface-800">Prerequisite to Unlock:</p>
          <p>• Complete all 10 pedagogical steps of <strong>Lesson 01: Tenses Architecture</strong></p>
          <p>• Achieve ≥80% score on the Lesson 01 Mastery Assessment</p>
        </Card>
        <Link to="/lesson/L01">
          <Button variant="primary" icon={ArrowLeft}>
            Return to Active Pilot Lesson (L01)
          </Button>
        </Link>
      </div>
    )
  }

  // Render Step Content based on step type
  const renderStepContent = () => {
    switch (currentStep?.type) {
      case 'orientation':
        return <OrientationStep metadata={activeMetadata} />
      case 'study-doc':
        return <StudyGuideStep />
      case 'visuals':
        return <VisualArchitectureStep />
      case 'rule-cards':
        return <RuleCardsStep />
      case 'worked-examples':
        return <WorkedExamplesStep />
      case 'common-mistakes':
        return <CommonPitfallsStep />
      default:
        return <PracticePlaceholderStep step={currentStep} />
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 select-none">
      {/* Breadcrumbs */}
      <Breadcrumbs
        topicTitle={activeMetadata.topicTitle}
        lessonTitle={`${activeMetadata.id}: ${activeMetadata.shortTitle}`}
        stepTitle={`Step ${currentStep?.index}: ${currentStep?.title}`}
      />

      {/* Lesson Header Banner */}
      <Card variant="default" padding="lg" className="border-primary-200 bg-gradient-to-r from-white via-primary-50/20 to-white shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">Lesson {activeMetadata.id}</Badge>
              <span className="text-xs text-surface-500 font-medium">
                {activeMetadata.topicTitle} • Part {activeMetadata.part}
              </span>
              <Badge variant="secondary" size="sm">{activeMetadata.difficulty}</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold font-heading text-surface-900 tracking-tight">
              {activeMetadata.title}
            </h1>
            <p className="text-xs md:text-sm text-surface-600 max-w-3xl leading-relaxed">
              {activeMetadata.description}
            </p>
          </div>

          <div className="flex md:flex-col items-center md:items-end justify-between shrink-0 gap-1.5 border-t md:border-t-0 pt-3 md:pt-0 border-surface-100">
            <div className="flex items-center gap-1.5 text-xs text-surface-500">
              <Clock size={13} />
              <span>Est. {activeMetadata.estimatedMinutes} mins</span>
            </div>
            <span className="text-xs font-bold text-primary-700 bg-primary-100/60 px-2.5 py-1 rounded-full">
              {lessonProgressPct}% Completed
            </span>
          </div>
        </div>
      </Card>

      {/* Main Two-Column Stage */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column: 10-Step SubNav */}
        <LessonSubNav />

        {/* Right Column: Step Viewport Container */}
        <section className="flex-1 min-w-0 w-full space-y-6">
          <Card variant="default" padding="xl" className="shadow-xs border-surface-200 min-h-[500px] flex flex-col justify-between">
            {/* Dynamic Step Viewport */}
            <div className="min-w-0">
              {renderStepContent()}
            </div>

            {/* Step Navigation Controls Footer */}
            <div className="pt-6 mt-8 border-t border-surface-200 flex items-center justify-between gap-4">
              <Button
                variant="secondary"
                size="md"
                icon={ArrowLeft}
                onClick={prevStep}
                disabled={isFirstStep}
              >
                Previous Step
              </Button>

              <div className="flex items-center gap-3">
                {!isCurrentStepDone && (
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => markStepCompleted(lessonId, currentStep.id)}
                    className="text-surface-600 hover:text-success-700 hover:bg-success-50"
                  >
                    Mark Step Complete
                  </Button>
                )}

                <Button
                  variant="primary"
                  size="md"
                  iconRight={ArrowRight}
                  onClick={handleCompleteAndNext}
                >
                  {isLastStep ? 'Finish Lesson 01' : 'Complete & Next Step'}
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
