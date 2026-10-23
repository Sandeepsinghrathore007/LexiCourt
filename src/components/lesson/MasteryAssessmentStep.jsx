import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import {
  Clock,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Flag,
  BookOpen,
  Trophy,
  ShieldCheck,
  Check,
} from 'lucide-react'
import { Card, Badge, Button } from '../common'
import { useProgress } from '../../hooks/useProgress'
import { useLesson } from '../../hooks/useLesson'
import l01Mastery from '../../content/lessons/L01/questions/mastery-assessment.json'
import l02Mastery from '../../content/lessons/L02/questions/mastery-assessment.json'
import l03Mastery from '../../content/lessons/L03/questions/mastery-assessment.json'
import l04Mastery from '../../content/lessons/L04/questions/mastery-assessment.json'
import l05Mastery from '../../content/lessons/L05/questions/mastery-assessment.json'
import l06Mastery from '../../content/lessons/L06/questions/mastery-assessment.json'
import l07Mastery from '../../content/lessons/L07/questions/mastery-assessment.json'
import l08Mastery from '../../content/lessons/L08/questions/mastery-assessment.json'
import l09Mastery from '../../content/lessons/L09/questions/mastery-assessment.json'
import l10Mastery from '../../content/lessons/L10/questions/mastery-assessment.json'
import l11Mastery from '../../content/lessons/L11/questions/mastery-assessment.json'
import l12Mastery from '../../content/lessons/L12/questions/mastery-assessment.json'
import l13Mastery from '../../content/lessons/L13/questions/mastery-assessment.json'
import l14Mastery from '../../content/lessons/L14/questions/mastery-assessment.json'
import l15Mastery from '../../content/lessons/L15/questions/mastery-assessment.json'
import l16Mastery from '../../content/lessons/L16/questions/mastery-assessment.json'
import l17Mastery from '../../content/lessons/L17/questions/mastery-assessment.json'
import l18Mastery from '../../content/lessons/L18/questions/mastery-assessment.json'
import l19Mastery from '../../content/lessons/L19/questions/mastery-assessment.json'

const MASTERY_DATA_MAP = {
  L01: l01Mastery,
  L02: l02Mastery,
  L03: l03Mastery,
  L04: l04Mastery,
  L05: l05Mastery,
  L06: l06Mastery,
  L07: l07Mastery,
  L08: l08Mastery,
  L09: l09Mastery,
  L10: l10Mastery,
  L11: l11Mastery,
  L12: l12Mastery,
  L13: l13Mastery,
  L14: l14Mastery,
  L15: l15Mastery,
  L16: l16Mastery,
  L17: l17Mastery,
  L18: l18Mastery,
  L19: l19Mastery,
}

const ALLOTTED_SECONDS = 12 * 60 // 12 minutes = 720 seconds
const MASTERY_PASS_THRESHOLD = 0.8 // 80% (12/15)

// Helper to shuffle questions on retake
function shuffleArray(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function MasteryAssessmentStep({ lessonId = 'L01' }) {
  const initialQuestions = useMemo(() => {
    return MASTERY_DATA_MAP[lessonId]?.questions || l01Mastery.questions || []
  }, [lessonId])

  const { markStepCompleted, recordQuizScore, logError } = useProgress()
  const { nextStep } = useLesson()

  const [questionsList, setQuestionsList] = useState(initialQuestions)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set())
  const [timeLeft, setTimeLeft] = useState(ALLOTTED_SECONDS)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [reviewFilter, setReviewFilter] = useState('all') // 'all' | 'incorrect'

  // Reset when lessonId changes
  useEffect(() => {
    const freshQuestions = MASTERY_DATA_MAP[lessonId]?.questions || l01Mastery.questions || []
    setQuestionsList(freshQuestions)
    setCurrentIndex(0)
    setSelectedAnswers({})
    setFlaggedQuestions(new Set())
    setTimeLeft(ALLOTTED_SECONDS)
    setIsSubmitted(false)
    setShowConfirmModal(false)
    setReviewFilter('all')
  }, [lessonId])

  const timerRef = useRef(null)

  const currentQ = questionsList[currentIndex] || questionsList[0]
  const currentSelection = selectedAnswers[currentQ?.id]
  const isCurrentFlagged = flaggedQuestions.has(currentQ?.id)

  const totalAnswered = useMemo(() => Object.keys(selectedAnswers).length, [selectedAnswers])
  const totalUnanswered = questionsList.length - totalAnswered
  const totalFlagged = flaggedQuestions.size

  // Format time MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60)
    const rem = secs % 60
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`
  }

  // Calculate score upon submission
  const scoreResults = useMemo(() => {
    let correctCount = 0
    const itemResults = {}

    questionsList.forEach((q) => {
      const userChoice = selectedAnswers[q.id]
      const isCorrect = userChoice === q.correctAnswer
      if (isCorrect) correctCount++
      itemResults[q.id] = {
        userChoice,
        isCorrect,
        correctAnswer: q.correctAnswer,
      }
    })

    const pct = Math.round((correctCount / questionsList.length) * 100)
    const passed = correctCount / questionsList.length >= MASTERY_PASS_THRESHOLD

    return {
      score: correctCount,
      percentage: pct,
      passed,
      itemResults,
    }
  }, [questionsList, selectedAnswers])

  // Submit test handler
  const handleSubmitTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setShowConfirmModal(false)
    setIsSubmitted(true)

    const finalScore = scoreResults.score
    recordQuizScore(lessonId, 'mastery', finalScore, questionsList.length)
    markStepCompleted(lessonId, 'step-9')

    // Automatically log all missed questions to Error Bank
    questionsList.forEach((q) => {
      const userChoice = selectedAnswers[q.id]
      if (userChoice !== q.correctAnswer) {
        logError({
          lessonId,
          questionId: q.id,
          prompt: q.question,
          options: q.options,
          selectedAnswer: userChoice || 'UNANSWERED',
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          ruleReference: q.ruleReference,
          difficulty: q.difficulty,
          subtopic: q.subtopic,
          stage: 'mastery-assessment',
        })
      }
    })
  }, [lessonId, questionsList, selectedAnswers, scoreResults, recordQuizScore, markStepCompleted, logError])

  // Countdown Timer
  useEffect(() => {
    if (isSubmitted) return

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          handleSubmitTest()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isSubmitted, handleSubmitTest])

  // Select Option
  const handleSelectOption = useCallback(
    (optionId) => {
      if (isSubmitted) return
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQ.id]: optionId,
      }))
    },
    [isSubmitted, currentQ]
  )

  // Toggle Flag
  const handleToggleFlag = useCallback(
    (qId = currentQ?.id) => {
      if (!qId) return
      setFlaggedQuestions((prev) => {
        const next = new Set(prev)
        if (next.has(qId)) {
          next.delete(qId)
        } else {
          next.add(qId)
        }
        return next
      })
    },
    [currentQ]
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showConfirmModal) return
      if (e.ctrlKey || e.metaKey || e.altKey || e.target.tagName === 'INPUT') return

      if (!isSubmitted) {
        if (e.key === '1' || e.key.toUpperCase() === 'A') handleSelectOption('A')
        else if (e.key === '2' || e.key.toUpperCase() === 'B') handleSelectOption('B')
        else if (e.key === '3' || e.key.toUpperCase() === 'C') handleSelectOption('C')
        else if (e.key === '4' || e.key.toUpperCase() === 'D') handleSelectOption('D')
        else if (e.key.toLowerCase() === 'f') handleToggleFlag()
      }

      if (e.key === 'ArrowRight' && currentIndex < questionsList.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, isSubmitted, showConfirmModal, questionsList.length, handleSelectOption, handleToggleFlag])

  // Retake assessment with reshuffled questions
  const handleRetake = () => {
    setQuestionsList(shuffleArray(initialQuestions))
    setSelectedAnswers({})
    setFlaggedQuestions(new Set())
    setTimeLeft(ALLOTTED_SECONDS)
    setIsSubmitted(false)
    setCurrentIndex(0)
    setReviewFilter('all')
  }

  // Timer color classes
  const getTimerClasses = () => {
    if (timeLeft < 60) {
      return 'bg-danger-100 dark:bg-danger-950/80 text-danger-700 dark:text-danger-300 border-danger-400 animate-pulse'
    }
    if (timeLeft < 180) {
      return 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300'
    }
    return 'bg-surface-100 dark:bg-surface-800 text-surface-800 dark:text-surface-200 border-surface-200 dark:border-surface-700'
  }

  const getDifficultyBadge = (diff) => {
    if (diff === 'easy') return <Badge variant="success" size="sm">Easy</Badge>
    if (diff === 'medium') return <Badge variant="warning" size="sm">Medium</Badge>
    return <Badge variant="danger" size="sm">Hard</Badge>
  }

  // Filtered questions for review
  const filteredQuestions = useMemo(() => {
    return questionsList.filter((q) => {
      const res = scoreResults.itemResults[q.id]
      if (reviewFilter === 'incorrect') return !res?.isCorrect
      return true
    })
  }, [questionsList, scoreResults, reviewFilter])

  // -------------------------------------------------------------
  // POST-SUBMISSION RESULTS VIEW
  // -------------------------------------------------------------
  if (isSubmitted) {
    const { score, percentage, passed } = scoreResults
    const elapsedSeconds = ALLOTTED_SECONDS - timeLeft
    const elapsedFormatted = `${Math.floor(elapsedSeconds / 60)}m ${elapsedSeconds % 60}s`

    return (
      <div className="space-y-6">
        {/* Step Header */}
        <div className="pb-4 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Step 9 • Mastery Assessment</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400">Summative Certification</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-surface-900 dark:text-white">
            Mastery Assessment Results
          </h2>
        </div>

        {/* Mastered or Failed Banner */}
        <Card
          variant="default"
          padding="xl"
          className={`text-center space-y-4 border ${
            passed
              ? 'border-success-300 dark:border-success-800 bg-gradient-to-b from-success-50/50 to-transparent dark:from-success-950/20'
              : 'border-amber-300 dark:border-amber-800 bg-gradient-to-b from-amber-50/50 to-transparent dark:from-amber-950/20'
          }`}
        >
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-sm ${
              passed
                ? 'bg-success-100 dark:bg-success-900/60 text-success-700 dark:text-success-300'
                : 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300'
            }`}
          >
            {passed ? <Trophy size={36} /> : <AlertTriangle size={36} />}
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-surface-100 dark:bg-surface-800">
              {passed ? (
                <span className="text-success-700 dark:text-success-400 flex items-center gap-1">
                  <ShieldCheck size={14} /> Official Mastery Achieved (≥80%)
                </span>
              ) : (
                <span className="text-amber-700 dark:text-amber-400 flex items-center gap-1">
                  <RotateCcw size={14} /> Full Certification ke liye Retake Zaroori
                </span>
              )}
            </div>

            <h3 className="text-3xl font-extrabold text-surface-900 dark:text-white font-heading">
              {score} / {questionsList.length} Correct ({percentage}%)
            </h3>

            <p className="text-xs text-surface-600 dark:text-surface-300 max-w-lg mx-auto mt-2 leading-relaxed">
              {passed
                ? (lessonId === 'L18'
                    ? 'Badhaai ho! Aapne strict timed exam conditions mein Prefixes & Suffixes, word-formation rules, negative prefix selection, spelling adjustments, aur grammatical category shifts par 80%+ mastery prove kar di hai.'
                    : lessonId === 'L19'
                    ? 'Badhaai ho! Aapne strict timed exam conditions mein Idioms & Phrases, non-literal semantics, context clues, lookalike disambiguation, aur exam elimination par 80%+ mastery prove kar di hai.'
                    : lessonId === 'L17'
                    ? 'Badhaai ho! Aapne strict timed exam conditions mein One-Word Substitutions, semantic categories, defining clues, morpheme vectors, aur confusing lookalikes par 80%+ mastery prove kar di hai.'
                    : lessonId === 'L16'
                    ? 'Badhaai ho! Aapne strict timed exam conditions mein Synonyms & Antonyms, contextual nuance, degree/intensity, aur word-family precision par 80%+ mastery prove kar di hai.'
                    : lessonId === 'L15'
                    ? 'Badhaai ho! Aapne strict timed exam conditions mein Connectives & Commonly Confused Words, double conjunction elimination, correlative parallelism, punctuation aur confusing pairs par 80%+ mastery prove kar di hai.'
                    : lessonId === 'L14'
                    ? 'Badhaai ho! Aapne strict timed exam conditions mein Degrees of Comparison, double comparatives, than any other rules aur error detection par 80%+ mastery prove kar di hai.'
                    : lessonId === 'L13'
                    ? 'Badhaai ho! Aapne strict timed exam conditions mein Subject–Verb Agreement, intervening distractors, correlatives aur special structures par 80%+ mastery prove kar di hai.'
                    : lessonId === 'L12'
                    ? 'Badhaai ho! Aapne strict timed exam conditions mein Fixed Prepositions, confusing pairs aur legal collocations par 80%+ mastery prove kar di hai.'
                    : lessonId === 'L11'
                    ? 'Badhaai ho! Aapne strict timed exam conditions mein Prepositions of time, place, movement aur boundaries par 80%+ mastery prove kar di hai.'
                    : lessonId === 'L10'
                    ? 'Badhaai ho! Aapne strict timed exam conditions mein Articles, Determiners aur Quantifiers par 80%+ mastery prove kar di hai.'
                    : lessonId === 'L09'
                    ? 'Badhaai ho! Aapne strict timed exam conditions mein Degrees of Comparison aur transformations par 80%+ mastery prove kar di hai.'
                    : lessonId === 'L08'
                    ? 'Badhaai ho! Aapne strict timed exam conditions mein Sentence Transformations aur polarity rules par 80%+ mastery prove kar di hai.'
                    : lessonId === 'L07'
                    ? 'Badhaai ho! Aapne strict timed exam conditions mein Interrogatives, Imperatives, Exclamatory aur Optative narration par 80%+ mastery prove kar di hai.'
                    : lessonId === 'L06'
                    ? 'Badhaai ho! Aapne strict timed exam conditions mein Direct & Indirect Speech fundamentals, pronouns aur tense backshift par 80%+ mastery prove kar di hai.'
                    : lessonId === 'L05'
                    ? 'Badhaai ho! Aapne strict timed exam conditions mein Imperatives, Modals aur Prepositional voice par 80%+ mastery prove kar di hai.'
                    : lessonId === 'L04'
                    ? 'Badhaai ho! Aapne strict timed exam conditions mein Active & Passive Voice fundamentals, tense matrix aur transitivity rules par 80%+ mastery prove kar di hai.'
                    : lessonId === 'L03'
                    ? 'Badhaai ho! Aapne strict timed exam conditions mein Conditional Sentences, Types 0-3, aur Inversions par 80%+ mastery prove kar di hai.'
                    : lessonId === 'L02'
                    ? 'Badhaai ho! Aapne strict timed exam conditions mein Sequence of Tenses, past harmony aur cross-clause concord par 80%+ mastery prove kar di hai.'
                    : 'Badhaai ho! Aapne strict timed exam conditions mein tense formulas, auxiliary verb concord aur time markers par 80%+ mastery prove kar di hai.')
                : `Aapka score Lesson ${lessonId.replace('L', '')} certify karne ke liye required 80% (12/15) benchmark se kam raha. Niche diye gaye missed questions aur Step 10 ke Error Bank ko review karein, aur tayar hone par retake lein.`}
            </p>
          </div>

          {/* Assessment Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-lg mx-auto text-xs pt-2">
            <div className="p-2.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
              <span className="text-surface-500 dark:text-surface-400 block font-medium">Time Taken</span>
              <strong className="text-sm text-surface-900 dark:text-white">{elapsedFormatted}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
              <span className="text-surface-500 dark:text-surface-400 block font-medium">Target</span>
              <strong className="text-sm text-surface-900 dark:text-white">≥ 80% (12/15)</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
              <span className="text-surface-500 dark:text-surface-400 block font-medium">Accuracy</span>
              <strong className={`text-sm ${passed ? 'text-success-600 dark:text-success-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {percentage}%
              </strong>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
              <span className="text-surface-500 dark:text-surface-400 block font-medium">Status</span>
              <strong className={`text-sm ${passed ? 'text-success-600 dark:text-success-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {passed ? 'Mastered' : 'Needs Retake'}
              </strong>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Button variant="secondary" icon={RotateCcw} onClick={handleRetake}>
              Retake Assessment (Reshuffled)
            </Button>
            <Button variant="primary" iconRight={ArrowRight} onClick={nextStep}>
              Proceed to Step 10: Error Review
            </Button>
          </div>
        </Card>

        {/* Detailed Item Review */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-white">
              Assessment Item Breakdown
            </h3>
            <div className="flex items-center gap-1.5 p-1 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 text-xs">
              <button
                type="button"
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  reviewFilter === 'all'
                    ? 'bg-white dark:bg-surface-700 text-surface-900 dark:text-white shadow-xs font-bold'
                    : 'text-surface-600 dark:text-surface-400'
                }`}
              >
                All ({questionsList.length})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter('incorrect')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  reviewFilter === 'incorrect'
                    ? 'bg-white dark:bg-surface-700 text-danger-700 dark:text-danger-300 shadow-xs font-bold'
                    : 'text-surface-600 dark:text-surface-400'
                }`}
              >
                Incorrect Only ({questionsList.length - score})
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredQuestions.map((q, idx) => {
              const res = scoreResults.itemResults[q.id]
              const userChoice = res?.userChoice
              const isCorrect = res?.isCorrect

              return (
                <Card
                  key={q.id}
                  variant="default"
                  padding="lg"
                  className={`border ${
                    isCorrect
                      ? 'border-surface-200 dark:border-surface-700'
                      : 'border-danger-200 dark:border-danger-900/50 bg-danger-50/10 dark:bg-danger-950/10'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-2 border-b border-surface-100 dark:border-surface-700/60">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-surface-500">
                          Item #{idx + 1}
                        </span>
                        <span className="text-surface-300 dark:text-surface-600">•</span>
                        <span className="text-surface-600 dark:text-surface-400 font-medium">{q.subtopic}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getDifficultyBadge(q.difficulty)}
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400 font-bold">
                            <CheckCircle2 size={15} /> Correct
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-danger-600 dark:text-danger-400 font-bold">
                            <XCircle size={15} /> Missed
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm md:text-base font-semibold text-surface-900 dark:text-white">
                      {q.question}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt) => {
                        const isChosen = userChoice === opt.id
                        const isRightAnswer = opt.id === q.correctAnswer

                        let style =
                          'border-surface-200 dark:border-surface-700 bg-surface-50/40 dark:bg-surface-800/40 text-surface-700 dark:text-surface-300'

                        if (isRightAnswer) {
                          style =
                            'border-success-500 bg-success-50 dark:bg-success-950/40 text-success-900 dark:text-success-100 font-semibold ring-1 ring-success-500'
                        } else if (isChosen && !isRightAnswer) {
                          style =
                            'border-danger-500 bg-danger-50 dark:bg-danger-950/40 text-danger-900 dark:text-danger-100 font-semibold'
                        }

                        return (
                          <div
                            key={opt.id}
                            className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 ${style}`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="font-bold w-5">{opt.id}.</span>
                              <span className="truncate">{opt.text}</span>
                            </div>
                            <div className="shrink-0 text-[0.625rem] font-bold">
                              {isRightAnswer && (
                                <span className="text-success-700 dark:text-success-400">Correct</span>
                              )}
                              {isChosen && !isRightAnswer && (
                                <span className="text-danger-700 dark:text-danger-400">Your Choice</span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="pt-2 text-xs space-y-1.5 border-t border-surface-100 dark:border-surface-700/60">
                      <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                        <strong className="text-surface-900 dark:text-white">Rationale: </strong>
                        {q.explanation}
                      </p>
                      <div className="flex items-start gap-1.5 text-primary-700 dark:text-primary-400 pt-0.5">
                        <BookOpen size={13} className="shrink-0 mt-0.5" />
                        <span className="font-medium">{q.ruleReference}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------
  // ACTIVE TIMED TEST VIEW
  // -------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Step Header with Countdown Timer */}
      <div className="pb-4 border-b border-surface-200 dark:border-surface-700 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Step 9 • Mastery Assessment</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400">Timed Exam Simulation</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-surface-900 dark:text-white">
            Lesson {lessonId.replace('L', '')} Certification Exam
          </h2>
        </div>

        {/* Live Timer Pill & Submit */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-sm font-mono font-bold transition-colors ${getTimerClasses()}`}
          >
            <Clock size={16} />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowConfirmModal(true)}
          >
            Submit Assessment
          </Button>
        </div>
      </div>

      {/* 15-Question Palette */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-surface-500 dark:text-surface-400">
          <span>Question Palette</span>
          <div className="flex items-center gap-3 text-[0.6875rem]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-600 inline-block" /> Answered ({totalAnswered}/15)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Flagged ({totalFlagged})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap pb-2 border-b border-surface-100 dark:border-surface-700/60">
          {questionsList.map((q, idx) => {
            const hasAnswer = Boolean(selectedAnswers[q.id])
            const isFlagged = flaggedQuestions.has(q.id)
            const isCurrent = idx === currentIndex

            let style =
              'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'

            if (hasAnswer) {
              style = 'bg-primary-600 text-white font-bold'
            }

            if (isFlagged) {
              style = hasAnswer
                ? 'bg-amber-600 text-white font-bold ring-2 ring-amber-400'
                : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-400'
            }

            if (isCurrent) {
              style += ' ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-surface-900 font-extrabold'
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-all flex items-center justify-center relative ${style}`}
                title={`Item ${idx + 1}${isFlagged ? ' (Flagged)' : ''}`}
              >
                {idx + 1}
                {isFlagged && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 ring-1 ring-white dark:ring-surface-900" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <Card variant="default" padding="lg" className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-3 border-b border-surface-100 dark:border-surface-700/60">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary-700 dark:text-primary-400">
              Item {currentIndex + 1} of {questionsList.length}
            </span>
            <span className="text-surface-300 dark:text-surface-600">•</span>
            <span className="text-surface-600 dark:text-surface-400 font-medium">{currentQ.subtopic}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleToggleFlag()}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                isCurrentFlagged
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:text-amber-700'
              }`}
            >
              <Flag size={13} className={isCurrentFlagged ? 'fill-current' : ''} />
              {isCurrentFlagged ? 'Flagged' : 'Flag for Review'}
            </button>
            {getDifficultyBadge(currentQ.difficulty)}
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-base md:text-lg font-semibold text-surface-900 dark:text-white leading-relaxed">
            {currentQ.question}
          </p>
          <p className="text-xs text-surface-500 dark:text-surface-400 italic">
            Timed mode active. Answers will be evaluated upon submission.
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentQ.options.map((opt) => {
            const isSelected = currentSelection === opt.id

            let optStyle =
              'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-800 dark:text-surface-100 hover:border-primary-400 dark:hover:border-primary-600 hover:bg-primary-50/20 dark:hover:bg-primary-950/20'

            if (isSelected) {
              optStyle =
                'border-primary-600 dark:border-primary-500 bg-primary-50/60 dark:bg-primary-950/40 text-primary-950 dark:text-primary-100 ring-2 ring-primary-500/20'
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full p-4 rounded-xl border text-left transition-all duration-150 flex items-start gap-3 select-none ${optStyle}`}
              >
                <span
                  className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-primary-600 text-white'
                      : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                  }`}
                >
                  {opt.id}
                </span>

                <div className="flex-1 min-w-0 pt-0.5">
                  <span className="text-sm font-medium leading-snug block">{opt.text}</span>
                </div>

                {isSelected && (
                  <span className="shrink-0 pt-1 text-primary-600 dark:text-primary-400">
                    <Check size={16} />
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Question Footer Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-surface-100 dark:border-surface-700/60">
          <Button
            variant="secondary"
            size="sm"
            icon={ArrowLeft}
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
          >
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {currentIndex < questionsList.length - 1 ? (
              <Button
                variant="primary"
                size="sm"
                iconRight={ArrowRight}
                onClick={() => setCurrentIndex((prev) => prev + 1)}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowConfirmModal(true)}
              >
                Submit Assessment
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <Card
            variant="default"
            padding="lg"
            className="max-w-md w-full space-y-4 shadow-xl border-surface-200 dark:border-surface-700 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/60 text-primary-700 dark:text-primary-300 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-surface-900 dark:text-white">
                  Submit Mastery Assessment?
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-400">
                  {formatTime(timeLeft)} remaining on the countdown timer.
                </p>
              </div>
            </div>

            <div className="bg-surface-50 dark:bg-surface-800/80 p-3.5 rounded-xl border border-surface-200 dark:border-surface-700 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-surface-600 dark:text-surface-400">Answered:</span>
                <span className="font-bold text-success-600 dark:text-success-400">{totalAnswered} / 15</span>
              </div>
              {totalUnanswered > 0 && (
                <div className="flex justify-between">
                  <span className="text-surface-600 dark:text-surface-400">Unanswered:</span>
                  <span className="font-bold text-danger-600 dark:text-danger-400">{totalUnanswered}</span>
                </div>
              )}
              {totalFlagged > 0 && (
                <div className="flex justify-between">
                  <span className="text-surface-600 dark:text-surface-400">Flagged:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{totalFlagged}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowConfirmModal(false)}
              >
                Keep Testing
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmitTest}
              >
                Confirm Submission
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
