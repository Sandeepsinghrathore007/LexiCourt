import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  CheckCircle2,
  XCircle,
  Flag,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Award,
  AlertTriangle,
  Eye,
  Check,
} from 'lucide-react'
import { Card, Badge, Button } from '../common'
import { useProgress } from '../../hooks/useProgress'
import { useLesson } from '../../hooks/useLesson'
import l01Independent from '../../content/lessons/L01/questions/independent-practice.json'
import l02Independent from '../../content/lessons/L02/questions/independent-practice.json'
import l03Independent from '../../content/lessons/L03/questions/independent-practice.json'
import l04Independent from '../../content/lessons/L04/questions/independent-practice.json'
import l05Independent from '../../content/lessons/L05/questions/independent-practice.json'
import l06Independent from '../../content/lessons/L06/questions/independent-practice.json'
import l07Independent from '../../content/lessons/L07/questions/independent-practice.json'
import l08Independent from '../../content/lessons/L08/questions/independent-practice.json'
import l09Independent from '../../content/lessons/L09/questions/independent-practice.json'
import l10Independent from '../../content/lessons/L10/questions/independent-practice.json'
import l11Independent from '../../content/lessons/L11/questions/independent-practice.json'
import l12Independent from '../../content/lessons/L12/questions/independent-practice.json'
import l13Independent from '../../content/lessons/L13/questions/independent-practice.json'
import l14Independent from '../../content/lessons/L14/questions/independent-practice.json'
import l15Independent from '../../content/lessons/L15/questions/independent-practice.json'
import l16Independent from '../../content/lessons/L16/questions/independent-practice.json'
import l17Independent from '../../content/lessons/L17/questions/independent-practice.json'
import l18Independent from '../../content/lessons/L18/questions/independent-practice.json'
import l19Independent from '../../content/lessons/L19/questions/independent-practice.json'

const INDEPENDENT_DATA_MAP = {
  L01: l01Independent,
  L02: l02Independent,
  L03: l03Independent,
  L04: l04Independent,
  L05: l05Independent,
  L06: l06Independent,
  L07: l07Independent,
  L08: l08Independent,
  L09: l09Independent,
  L10: l10Independent,
  L11: l11Independent,
  L12: l12Independent,
  L13: l13Independent,
  L14: l14Independent,
  L15: l15Independent,
  L16: l16Independent,
  L17: l17Independent,
  L18: l18Independent,
  L19: l19Independent,
}

export default function IndependentPracticeStep({ lessonId = 'L01' }) {
  const questions = useMemo(() => {
    return INDEPENDENT_DATA_MAP[lessonId]?.questions || l01Independent.questions || []
  }, [lessonId])

  const { markStepCompleted, recordQuizScore, logError } = useProgress()
  const { nextStep } = useLesson()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({}) // { [qId]: 'A'|'B'|'C'|'D' }
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set())
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [reviewFilter, setReviewFilter] = useState('all') // 'all' | 'incorrect' | 'flagged'

  // Reset when lessonId changes
  useEffect(() => {
    setCurrentIndex(0)
    setSelectedAnswers({})
    setFlaggedQuestions(new Set())
    setIsSubmitted(false)
    setShowConfirmModal(false)
    setReviewFilter('all')
  }, [lessonId])

  const currentQ = questions[currentIndex] || questions[0]
  const currentSelection = selectedAnswers[currentQ?.id]
  const isCurrentFlagged = flaggedQuestions.has(currentQ?.id)

  const totalAnswered = useMemo(() => Object.keys(selectedAnswers).length, [selectedAnswers])
  const totalUnanswered = questions.length - totalAnswered
  const totalFlagged = flaggedQuestions.size

  // Calculate score upon submission
  const scoreResults = useMemo(() => {
    let correctCount = 0
    const itemResults = {}

    questions.forEach((q) => {
      const userChoice = selectedAnswers[q.id]
      const isCorrect = userChoice === q.correctAnswer
      if (isCorrect) correctCount++
      itemResults[q.id] = {
        userChoice,
        isCorrect,
        correctAnswer: q.correctAnswer,
      }
    })

    return {
      score: correctCount,
      percentage: Math.round((correctCount / questions.length) * 100),
      itemResults,
    }
  }, [selectedAnswers, questions])

  // Select option handler
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

  // Toggle flag handler
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

  // Clear answer handler
  const handleClearAnswer = () => {
    if (isSubmitted) return
    setSelectedAnswers((prev) => {
      const copy = { ...prev }
      delete copy[currentQ.id]
      return copy
    })
  }

  // Keyboard controls
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

      if (e.key === 'ArrowRight' && currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, isSubmitted, showConfirmModal, handleSelectOption, handleToggleFlag, questions.length])

  // Submit test
  const handleConfirmSubmit = () => {
    setShowConfirmModal(false)
    setIsSubmitted(true)

    const finalScore = scoreResults.score
    recordQuizScore(lessonId, 'independent', finalScore, questions.length)
    markStepCompleted(lessonId, 'step-8')

    // Automatically log all missed questions to Error Bank
    questions.forEach((q) => {
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
          stage: 'independent-practice',
        })
      }
    })
  }

  // Reset entire test
  const handleResetTest = () => {
    setSelectedAnswers({})
    setFlaggedQuestions(new Set())
    setIsSubmitted(false)
    setCurrentIndex(0)
    setReviewFilter('all')
  }

  const getDifficultyBadge = (diff) => {
    if (diff === 'easy') return <Badge variant="success" size="sm">Easy</Badge>
    if (diff === 'medium') return <Badge variant="warning" size="sm">Medium</Badge>
    return <Badge variant="danger" size="sm">Hard</Badge>
  }

  // Filtered list for post-submission review
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const res = scoreResults.itemResults[q.id]
      if (reviewFilter === 'incorrect') return !res?.isCorrect
      if (reviewFilter === 'flagged') return flaggedQuestions.has(q.id)
      return true
    })
  }, [questions, scoreResults, reviewFilter, flaggedQuestions])

  // -------------------------------------------------------------
  // POST-SUBMISSION RESULTS VIEW
  // -------------------------------------------------------------
  if (isSubmitted) {
    const { score, percentage } = scoreResults

    // Difficulty breakdown
    const easyTotal = questions.filter((q) => q.difficulty === 'easy')
    const easyCorrect = easyTotal.filter((q) => scoreResults.itemResults[q.id]?.isCorrect).length
    const medTotal = questions.filter((q) => q.difficulty === 'medium')
    const medCorrect = medTotal.filter((q) => scoreResults.itemResults[q.id]?.isCorrect).length
    const hardTotal = questions.filter((q) => q.difficulty === 'hard')
    const hardCorrect = hardTotal.filter((q) => scoreResults.itemResults[q.id]?.isCorrect).length

    return (
      <div className="space-y-6">
        {/* Step Header */}
        <div className="pb-4 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Step 8 • Independent Practice</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400">Diagnostic Analytics</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-surface-900 dark:text-white">
            Independent Practice Performance Report
          </h2>
        </div>

        {/* Score Card */}
        <Card
          variant="default"
          padding="xl"
          className="border-primary-200 dark:border-primary-900/50 bg-gradient-to-b from-primary-50/40 to-transparent dark:from-primary-950/20 text-center space-y-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/60 text-primary-700 dark:text-primary-300 flex items-center justify-center mx-auto shadow-sm">
            <Award size={36} />
          </div>

          <div>
            <h3 className="text-3xl font-extrabold text-surface-900 dark:text-white font-heading">
              {score} / {questions.length} Correct
            </h3>
            <p className="text-sm font-bold text-primary-700 dark:text-primary-400 mt-1">
              Overall Accuracy: {percentage}%
            </p>
            <p className="text-xs text-surface-600 dark:text-surface-300 max-w-lg mx-auto mt-2">
              {percentage >= 80
                ? (lessonId === 'L18'
                    ? 'Prefixes & Suffixes, word-formation rules, negative prefix selection, spelling adjustments, aur grammatical category shifts par behtareen command! Aap timed Mastery Assessment ke liye bilkul tayar hain.'
                    : lessonId === 'L19'
                    ? 'Idioms & Phrases, non-literal semantics, context clues, lookalike disambiguation, aur exam elimination par behtareen command! Aap timed Mastery Assessment ke liye bilkul tayar hain.'
                    : lessonId === 'L17'
                    ? 'One-Word Substitutions, semantic categories, defining clues, morpheme vectors, aur confusing lookalikes par behtareen command! Aap timed Mastery Assessment ke liye bilkul tayar hain.'
                    : lessonId === 'L16'
                    ? 'Synonyms & Antonyms, contextual nuance, degree matching, aur word-family precision par behtareen command! Aap timed Mastery Assessment ke liye bilkul tayar hain.'
                    : lessonId === 'L15'
                    ? 'Connectives, double conjunction avoidance, correlative parallelism, aur commonly confused words discrimination par behtareen command! Aap timed Mastery Assessment ke liye bilkul tayar hain.'
                    : lessonId === 'L14'
                    ? 'Degrees of Comparison rules, group self-exclusion, logical equivalence, aur sentence correction par behtareen command! Aap timed Mastery Assessment ke liye bilkul tayar hain.'
                    : lessonId === 'L13'
                    ? 'Subject–Verb Agreement rules, distractor isolation, aur special structures par behtareen command! Aap timed Mastery Assessment ke liye bilkul tayar hain.'
                    : lessonId === 'L12'
                    ? 'Fixed prepositions, confusing pairs, direct-object verbs, aur legal collocations par behtareen command! Aap timed Mastery Assessment ke liye bilkul tayar hain.'
                    : lessonId === 'L11'
                    ? 'Prepositions of time, place, movement aur boundaries par behtareen command! Aap timed Mastery Assessment ke liye bilkul tayar hain.'
                    : lessonId === 'L10'
                    ? 'Articles, determiners aur quantifiers par behtareen command! Aap timed Mastery Assessment ke liye bilkul tayar hain.'
                    : lessonId === 'L09'
                    ? 'Degrees of comparison, irregular adjectives, aur transformations par behtareen command! Aap timed Mastery Assessment ke liye bilkul tayar hain.'
                    : lessonId === 'L08'
                    ? 'Sentence transformations, polarity rules aur rhetorical equivalence par behtareen command! Aap timed Mastery Assessment ke liye bilkul tayar hain.'
                    : lessonId === 'L07'
                    ? 'Questions, commands, requests, exclamations aur optatives par behtareen command! Aap timed Mastery Assessment ke liye bilkul tayar hain.'
                    : lessonId === 'L06'
                    ? 'Direct & Indirect Speech fundamentals, pronouns aur backshift par behtareen command! Aap timed Mastery Assessment ke liye bilkul tayar hain.'
                    : lessonId === 'L05'
                    ? 'Imperatives, modals aur prepositional voice par behtareen command! Aap timed Mastery Assessment ke liye bilkul tayar hain.'
                    : lessonId === 'L04'
                    ? 'Active & Passive Voice transformation aur tense matrix par behtareen command! Aap timed Mastery Assessment ke liye bilkul tayar hain.'
                    : lessonId === 'L03'
                    ? 'Conditional Sentences aur Inversions par behtareen command! Aap timed Mastery Assessment ke liye bilkul tayar hain.'
                    : lessonId === 'L02'
                    ? 'Sequence of Tenses aur cross-clause tense harmony par behtareen command! Aap timed Mastery Assessment ke liye bilkul tayar hain.'
                    : 'Single-clause tenses aur adverbial time markers par behtareen command! Aap timed Mastery Assessment ke liye bilkul tayar hain.')
                : 'Achi practice performance. Galat hue sawal Step 10 mein targeted revision ke liye aapke Error Bank mein log ho gaye hain.'}
            </p>
          </div>

          {/* Difficulty Metric Grid */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2 text-xs">
            <div className="p-3 rounded-xl bg-surface-100/80 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700">
              <span className="text-surface-500 dark:text-surface-400 block font-medium">Easy Items</span>
              <strong className="text-sm text-surface-900 dark:text-white font-bold">
                {easyCorrect} / {easyTotal.length}
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-surface-100/80 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700">
              <span className="text-surface-500 dark:text-surface-400 block font-medium">Medium Items</span>
              <strong className="text-sm text-surface-900 dark:text-white font-bold">
                {medCorrect} / {medTotal.length}
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-surface-100/80 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700">
              <span className="text-surface-500 dark:text-surface-400 block font-medium">Hard Items</span>
              <strong className="text-sm text-surface-900 dark:text-white font-bold">
                {hardCorrect} / {hardTotal.length}
              </strong>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Button variant="secondary" icon={RotateCcw} onClick={handleResetTest}>
              Retake Practice
            </Button>
            <Button variant="primary" iconRight={ArrowRight} onClick={nextStep}>
              Proceed to Step 9: Mastery Assessment
            </Button>
          </div>
        </Card>

        {/* Detailed Item Review Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-white flex items-center gap-2">
              <Eye size={18} className="text-primary-600 dark:text-primary-400" />
              Item Review & Explanations ({filteredQuestions.length})
            </h3>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 text-xs">
              <button
                type="button"
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  reviewFilter === 'all'
                    ? 'bg-white dark:bg-surface-700 text-surface-900 dark:text-white shadow-xs font-bold'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900'
                }`}
              >
                All ({questions.length})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter('incorrect')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  reviewFilter === 'incorrect'
                    ? 'bg-white dark:bg-surface-700 text-danger-700 dark:text-danger-300 shadow-xs font-bold'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900'
                }`}
              >
                Incorrect ({questions.length - score})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter('flagged')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  reviewFilter === 'flagged'
                    ? 'bg-white dark:bg-surface-700 text-amber-700 dark:text-amber-300 shadow-xs font-bold'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900'
                }`}
              >
                Flagged ({flaggedQuestions.size})
              </button>
            </div>
          </div>

          {/* List of Questions in Review */}
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const res = scoreResults.itemResults[q.id]
              const userChoice = res?.userChoice
              const isCorrect = res?.isCorrect
              const isFlagged = flaggedQuestions.has(q.id)

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
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-2 border-b border-surface-100 dark:border-surface-700/60">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-surface-500">
                          Question {questions.findIndex((item) => item.id === q.id) + 1}
                        </span>
                        <span className="text-surface-300 dark:text-surface-600">•</span>
                        <span className="text-surface-600 dark:text-surface-400 font-medium">{q.subtopic}</span>
                        {isFlagged && (
                          <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                            <Flag size={12} /> Flagged
                          </span>
                        )}
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

                    {/* Question Prompt */}
                    <p className="text-sm md:text-base font-semibold text-surface-900 dark:text-white">
                      {q.question}
                    </p>

                    {/* Options list */}
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

                    {/* Explanation Callout */}
                    <div className="pt-2 text-xs space-y-1.5 border-t border-surface-100 dark:border-surface-700/60">
                      <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                        <strong className="text-surface-900 dark:text-white">Explanation: </strong>
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
  // ACTIVE TEST SIMULATION VIEW (Deferred Feedback)
  // -------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="pb-4 border-b border-surface-200 dark:border-surface-700 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Step 8 • Independent Practice</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400">Deferred Feedback Simulation</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-surface-900 dark:text-white">
            {questions.length}-Question Exam Simulation
          </h2>
        </div>

        {/* Status Tracker & Submit Button */}
        <div className="flex items-center gap-3">
          <div className="text-xs text-surface-600 dark:text-surface-300 font-medium">
            <span>Answered: <strong className="text-primary-700 dark:text-primary-400 font-bold">{totalAnswered}</strong>/{questions.length}</span>
            {totalFlagged > 0 && (
              <span className="ml-2 text-amber-600 dark:text-amber-400 font-bold">
                ({totalFlagged} flagged)
              </span>
            )}
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowConfirmModal(true)}
          >
            Submit Test
          </Button>
        </div>
      </div>

      {/* 20-Question Palette */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-surface-500 dark:text-surface-400">
          <span>Question Palette</span>
          <div className="flex items-center gap-3 text-[0.6875rem]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-600 inline-block" /> Answered
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Flagged
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-surface-200 dark:bg-surface-700 inline-block" /> Unanswered
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap pb-2 border-b border-surface-100 dark:border-surface-700/60">
          {questions.map((q, idx) => {
            const hasAnswer = Boolean(selectedAnswers[q.id])
            const isFlagged = flaggedQuestions.has(q.id)
            const isCurrent = idx === currentIndex

            let style = 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'

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
                title={`Question ${idx + 1}${isFlagged ? ' (Flagged)' : ''}${hasAnswer ? ' (Answered)' : ''}`}
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
        {/* Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-3 border-b border-surface-100 dark:border-surface-700/60">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary-700 dark:text-primary-400">
              Question {currentIndex + 1} of {questions.length}
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
              {isCurrentFlagged ? 'Flagged for Review' : 'Flag Question'}
            </button>

            {getDifficultyBadge(currentQ.difficulty)}
          </div>
        </div>

        {/* Prompt */}
        <div className="space-y-1">
          <p className="text-base md:text-lg font-semibold text-surface-900 dark:text-white leading-relaxed">
            {currentQ.question}
          </p>
          <p className="text-xs text-surface-500 dark:text-surface-400 italic">
            Select one option (Keys 1-4 / A-D). Answers will be evaluated upon final submission.
          </p>
        </div>

        {/* Options Grid */}
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
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={ArrowLeft}
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
            >
              Previous
            </Button>
            {currentSelection && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAnswer}
                className="text-xs text-surface-500 hover:text-danger-600"
              >
                Clear Selection
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {currentIndex < questions.length - 1 ? (
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
                Review & Submit Test
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
                  Submit Independent Practice?
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-400">
                  Review your completion status before finalizing.
                </p>
              </div>
            </div>

            <div className="bg-surface-50 dark:bg-surface-800/80 p-3.5 rounded-xl border border-surface-200 dark:border-surface-700 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-surface-600 dark:text-surface-400">Total Questions:</span>
                <span className="font-bold text-surface-900 dark:text-white">{questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-600 dark:text-surface-400">Answered:</span>
                <span className="font-bold text-success-600 dark:text-success-400">{totalAnswered}</span>
              </div>
              {totalUnanswered > 0 && (
                <div className="flex justify-between">
                  <span className="text-surface-600 dark:text-surface-400">Unanswered:</span>
                  <span className="font-bold text-danger-600 dark:text-danger-400">{totalUnanswered}</span>
                </div>
              )}
              {totalFlagged > 0 && (
                <div className="flex justify-between">
                  <span className="text-surface-600 dark:text-surface-400">Flagged for Review:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{totalFlagged}</span>
                </div>
              )}
            </div>

            {totalUnanswered > 0 && (
              <p className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-lg border border-amber-200 dark:border-amber-800/60">
                You have {totalUnanswered} unanswered question{totalUnanswered > 1 ? 's' : ''}. Unanswered questions will count as incorrect.
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowConfirmModal(false)}
              >
                Return to Test
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmSubmit}
              >
                Confirm & Submit
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
