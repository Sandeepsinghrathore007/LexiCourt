import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Award,
  Sparkles,
} from 'lucide-react'
import { Card, Badge, Button } from '../common'
import { useProgress } from '../../hooks/useProgress'
import { useLesson } from '../../hooks/useLesson'
import l01Guided from '../../content/lessons/L01/questions/guided-practice.json'
import l02Guided from '../../content/lessons/L02/questions/guided-practice.json'
import l03Guided from '../../content/lessons/L03/questions/guided-practice.json'
import l04Guided from '../../content/lessons/L04/questions/guided-practice.json'
import l05Guided from '../../content/lessons/L05/questions/guided-practice.json'
import l06Guided from '../../content/lessons/L06/questions/guided-practice.json'
import l07Guided from '../../content/lessons/L07/questions/guided-practice.json'
import l08Guided from '../../content/lessons/L08/questions/guided-practice.json'
import l09Guided from '../../content/lessons/L09/questions/guided-practice.json'
import l10Guided from '../../content/lessons/L10/questions/guided-practice.json'
import l11Guided from '../../content/lessons/L11/questions/guided-practice.json'
import l12Guided from '../../content/lessons/L12/questions/guided-practice.json'
import l13Guided from '../../content/lessons/L13/questions/guided-practice.json'
import l14Guided from '../../content/lessons/L14/questions/guided-practice.json'
import l15Guided from '../../content/lessons/L15/questions/guided-practice.json'
import l16Guided from '../../content/lessons/L16/questions/guided-practice.json'
import l17Guided from '../../content/lessons/L17/questions/guided-practice.json'
import l18Guided from '../../content/lessons/L18/questions/guided-practice.json'
import l19Guided from '../../content/lessons/L19/questions/guided-practice.json'

const GUIDED_DATA_MAP = {
  L01: l01Guided,
  L02: l02Guided,
  L03: l03Guided,
  L04: l04Guided,
  L05: l05Guided,
  L06: l06Guided,
  L07: l07Guided,
  L08: l08Guided,
  L09: l09Guided,
  L10: l10Guided,
  L11: l11Guided,
  L12: l12Guided,
  L13: l13Guided,
  L14: l14Guided,
  L15: l15Guided,
  L16: l16Guided,
  L17: l17Guided,
  L18: l18Guided,
  L19: l19Guided,
}

export default function GuidedPracticeStep({ lessonId = 'L01' }) {
  const isL18 = lessonId === 'L18'
  const isL19 = lessonId === 'L19'
  const isL17 = lessonId === 'L17'
  const isL16 = lessonId === 'L16'
  const isL15 = lessonId === 'L15'
  const isL14 = lessonId === 'L14'
  const isL13 = lessonId === 'L13'
  const isL12 = lessonId === 'L12'
  const isL11 = lessonId === 'L11'
  const isL10 = lessonId === 'L10'
  const isL09 = lessonId === 'L09'
  const isL08 = lessonId === 'L08'
  const isL07 = lessonId === 'L07'
  const isL06 = lessonId === 'L06'
  const isL05 = lessonId === 'L05'
  const isL04 = lessonId === 'L04'
  const isL03 = lessonId === 'L03'
  const isL02 = lessonId === 'L02'

  const questions = useMemo(() => {
    return GUIDED_DATA_MAP[lessonId]?.questions || l01Guided.questions || []
  }, [lessonId])

  const { markStepCompleted, recordQuizScore, logError } = useProgress()
  const { nextStep } = useLesson()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showSummary, setShowSummary] = useState(false)

  // Reset state when lessonId changes
  useEffect(() => {
    setCurrentIndex(0)
    setAnswers({})
    setShowSummary(false)
  }, [lessonId])

  const currentQ = questions[currentIndex] || questions[0]
  const currentAnswer = answers[currentQ?.id]
  const isCurrentAnswered = Boolean(currentAnswer)

  // Calculate score
  const score = useMemo(() => {
    return Object.values(answers).filter((a) => a.isCorrect).length
  }, [answers])

  const totalAnswered = useMemo(() => {
    return Object.keys(answers).length
  }, [answers])

  const allCompleted = totalAnswered === questions.length

  // Record score when all are answered
  useEffect(() => {
    if (allCompleted) {
      markStepCompleted(lessonId, 'step-7')
      recordQuizScore(lessonId, 'guided', score, questions.length)
    }
  }, [allCompleted, score, lessonId, questions.length, markStepCompleted, recordQuizScore])

  // Handle option select
  const handleSelectOption = useCallback(
    (optionId) => {
      if (isCurrentAnswered) return // already answered, no re-click unless reset

      const isCorrect = optionId === currentQ.correctAnswer
      const newAnswer = {
        selectedOption: optionId,
        isCorrect,
      }

      setAnswers((prev) => ({
        ...prev,
        [currentQ.id]: newAnswer,
      }))

      // Auto log to Error Bank if incorrect
      if (!isCorrect) {
        logError({
          lessonId,
          questionId: currentQ.id,
          prompt: currentQ.question,
          options: currentQ.options,
          selectedAnswer: optionId,
          correctAnswer: currentQ.correctAnswer,
          explanation: currentQ.explanation,
          ruleReference: currentQ.ruleReference,
          difficulty: currentQ.difficulty,
          subtopic: currentQ.subtopic,
          stage: 'guided-practice',
        })
      }
    },
    [isCurrentAnswered, currentQ, lessonId, logError]
  )

  // Keyboard navigation & selection
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if modifier keys pressed or typing in inputs
      if (e.ctrlKey || e.metaKey || e.altKey || e.target.tagName === 'INPUT') return

      if (!isCurrentAnswered) {
        if (e.key === '1' || e.key.toUpperCase() === 'A') handleSelectOption('A')
        else if (e.key === '2' || e.key.toUpperCase() === 'B') handleSelectOption('B')
        else if (e.key === '3' || e.key.toUpperCase() === 'C') handleSelectOption('C')
        else if (e.key === '4' || e.key.toUpperCase() === 'D') handleSelectOption('D')
      } else {
        if (e.key === 'ArrowRight' || e.key === 'Enter') {
          if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1)
          } else if (allCompleted) {
            setShowSummary(true)
          }
        }
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, isCurrentAnswered, allCompleted, handleSelectOption, questions.length])

  // Reset current question for retry
  const handleRetryQuestion = () => {
    setAnswers((prev) => {
      const copy = { ...prev }
      delete copy[currentQ.id]
      return copy
    })
  }

  // Reset whole practice
  const handleResetAll = () => {
    setAnswers({})
    setCurrentIndex(0)
    setShowSummary(false)
  }

  const getDifficultyBadgeVariant = (diff) => {
    if (diff === 'easy') return 'success'
    if (diff === 'medium') return 'warning'
    return 'danger'
  }

  // Summary View
  if (showSummary) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="space-y-6">
        {/* Step Header */}
        <div className="pb-4 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Step 7 • Guided Practice</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400">Practice Results</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-surface-900 dark:text-white">
            Guided Practice Summary
          </h2>
        </div>

        {/* Score Card */}
        <Card
          variant="default"
          padding="xl"
          className="text-center space-y-4 border-primary-200 dark:border-primary-900/50 bg-gradient-to-b from-primary-50/40 to-transparent dark:from-primary-950/20"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/60 text-primary-700 dark:text-primary-300 flex items-center justify-center mx-auto shadow-sm">
            <Award size={36} />
          </div>

          <div>
            <h3 className="text-3xl font-extrabold text-surface-900 dark:text-white font-heading">
              {score} / {questions.length} Correct
            </h3>
            <p className="text-sm font-semibold text-primary-700 dark:text-primary-400 mt-1">
              Accuracy: {pct}%
            </p>
            <p className="text-xs text-surface-600 dark:text-surface-300 max-w-md mx-auto mt-2">
              {pct >= 80
                ? (isL18
                    ? 'Prefixes & Suffixes, word-formation rules, negative prefix selection, spelling adjustments, aur grammatical category shifts par shaandar pakad!'
                    : isL19
                    ? 'Idioms & Phrases, figurative semantics, context clues, lookalike disambiguation, aur exam elimination par shaandar pakad!'
                    : isL17
                    ? 'One-Word Substitutions, semantic categories, defining clues, morpheme vectors, aur confusing lookalikes par shaandar pakad!'
                    : isL16
                    ? 'Synonyms & Antonyms, contextual nuance, gradable/complementary opposites, aur polysemic traps par shaandar pakad!'
                    : isL15
                    ? 'Connectives, clause linking, correlative pairs, punctuation rules, aur commonly confused words par shaandar pakad!'
                    : isL14
                    ? 'Degrees of Comparison rules, self-exclusion, logical equivalence, aur sentence correction par shaandar pakad!'
                    : isL13
                    ? 'Subject-Verb Agreement rules, intervening phrase isolation, aur special relative clauses par shaandar pakad!'
                    : isL12
                    ? 'Fixed prepositions, confusing pairs, direct-object verbs, aur legal collocations par shaandar pakad!'
                    : isL11
                    ? 'Prepositions of time, place, movement aur boundaries par shaandar pakad!'
                    : isL10
                    ? 'Articles, determiners aur quantifiers par shaandar pakad!'
                    : isL09
                    ? 'Degrees of comparison, irregular adjectives, aur transformations par shaandar pakad!'
                    : isL08
                    ? 'Sentence transformations, polarity rules aur rhetorical equivalence par shaandar pakad!'
                    : isL07
                    ? 'Questions, commands, requests, exclamations aur optatives par shaandar pakad!'
                    : isL06
                    ? 'Direct & Indirect Speech, pronouns aur tense backshift ke foundations par shaandar pakad!'
                    : isL05
                    ? 'Imperatives, modals aur prepositional voice ke foundations par shaandar pakad!'
                    : isL04
                    ? 'Active aur Passive Voice transformation ke foundations par shaandar pakad!'
                    : isL03
                    ? 'Conditional Sentences aur Inversions ke foundations par shaandar pakad!'
                    : isL02
                    ? 'Sequence of Tenses aur tense harmony ke foundations par shaandar pakad!'
                    : 'Foundational tense formulas aur time markers par shaandar pakad!')
                : 'Acha prayas! Niche diye gaye missed questions aur Step 10 ke Error Bank ko dhyan se review karein.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button variant="secondary" icon={RotateCcw} onClick={handleResetAll}>
              Retake All Questions
            </Button>
            <Button variant="outline" icon={HelpCircle} onClick={() => setShowSummary(false)}>
              Review Question Items
            </Button>
            <Button variant="primary" iconRight={ArrowRight} onClick={nextStep}>
              Proceed to Step 8: Independent Practice
            </Button>
          </div>
        </Card>

        {/* Question Performance Breakdown Table */}
        <Card variant="default" padding="lg">
          <h4 className="text-sm font-bold text-surface-900 dark:text-white mb-3">
            Question-by-Question Diagnostic
          </h4>
          <div className="divide-y divide-surface-100 dark:divide-surface-700/60 text-xs">
            {questions.map((q, idx) => {
              const ans = answers[q.id]
              const isCorrect = ans?.isCorrect
              return (
                <div
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx)
                    setShowSummary(false)
                  }}
                  className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-700/40 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono font-bold text-surface-500 w-6">#{idx + 1}</span>
                    <span className="font-medium text-surface-800 dark:text-surface-200 truncate max-w-md md:max-w-xl">
                      {q.question}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={getDifficultyBadgeVariant(q.difficulty)} size="sm">
                      {q.difficulty}
                    </Badge>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400 font-bold">
                        <CheckCircle2 size={16} /> Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-danger-600 dark:text-danger-400 font-bold">
                        <XCircle size={16} /> Missed
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    )
  }

  // Active Question View
  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="pb-4 border-b border-surface-200 dark:border-surface-700 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Step 7 • Guided Practice</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400">Instant Explanations</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-surface-900 dark:text-white">
            {isL18
              ? 'Prefixes & Suffixes Guided Practice'
              : isL19
              ? 'Idioms & Phrases Guided Practice'
              : isL17
              ? 'One-Word Substitutions Guided Practice'
              : isL16
              ? 'Synonyms & Antonyms Guided Practice'
              : isL15
              ? 'Connectives & Commonly Confused Words Guided Practice'
              : isL14
              ? 'Degrees of Comparison & Error Detection Guided Practice'
              : isL13
              ? 'Subject–Verb Agreement Guided Practice'
              : isL12
              ? 'Fixed Prepositions Guided Practice'
              : isL11
              ? 'Prepositions Spatial & Temporal Practice'
              : isL10
              ? 'Articles & Determiners Guided Practice'
              : isL09
              ? 'Degrees of Comparison Guided Practice'
              : isL08
              ? 'Sentence Transformations Guided Practice'
              : isL07
              ? 'Advanced Narration Guided Practice'
              : isL06
              ? 'Direct & Indirect Speech Guided Practice'
              : isL05
              ? 'Imperatives, Modals & Prepositional Voice Practice'
              : isL04
              ? 'Active & Passive Voice Guided Practice'
              : isL03
              ? 'Conditional Sentences Guided Practice'
              : isL02
              ? 'Sequence of Tenses Guided Practice'
              : 'Single-Clause Tenses Practice'}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-surface-600 dark:text-surface-300">
            Score: <strong className="text-primary-700 dark:text-primary-400 font-bold">{score}</strong> / {totalAnswered}
          </span>
          {allCompleted && (
            <Button variant="secondary" size="sm" onClick={() => setShowSummary(true)}>
              View Summary
            </Button>
          )}
        </div>
      </div>

      {/* 12-Question Navigation Palette */}
      <div className="flex items-center gap-1.5 flex-wrap pb-2 border-b border-surface-100 dark:border-surface-700/60">
        {questions.map((q, idx) => {
          const ans = answers[q.id]
          const isCurrent = idx === currentIndex
          let btnClass = 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'

          if (ans?.isCorrect) {
            btnClass = 'bg-success-100 dark:bg-success-900/50 text-success-700 dark:text-success-300 border border-success-400 dark:border-success-600'
          } else if (ans && !ans.isCorrect) {
            btnClass = 'bg-danger-100 dark:bg-danger-900/50 text-danger-700 dark:text-danger-300 border border-danger-400 dark:border-danger-600'
          }

          if (isCurrent) {
            btnClass += ' ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-surface-900 font-bold'
          }

          return (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-8 h-8 rounded-lg text-xs font-medium transition-all flex items-center justify-center ${btnClass}`}
              title={`Question ${idx + 1}`}
            >
              {idx + 1}
            </button>
          )
        })}
      </div>

      {/* Question Card */}
      <Card variant="default" padding="lg" className="space-y-6">
        {/* Question Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-3 border-b border-surface-100 dark:border-surface-700/60">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary-700 dark:text-primary-400">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-surface-300 dark:text-surface-600">•</span>
            <span className="text-surface-600 dark:text-surface-400 font-medium">{currentQ.subtopic}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getDifficultyBadgeVariant(currentQ.difficulty)} size="sm">
              {currentQ.difficulty.toUpperCase()}
            </Badge>
            <span className="text-surface-400 dark:text-surface-500 font-mono text-[0.625rem]">
              {currentQ.id}
            </span>
          </div>
        </div>

        {/* Question Prompt */}
        <div className="space-y-1">
          <p className="text-base md:text-lg font-semibold text-surface-900 dark:text-white leading-relaxed">
            {currentQ.question}
          </p>
          <p className="text-xs text-surface-500 dark:text-surface-400 italic">
            Niche diye gaye options mein se sabse grammatically correct option select karein (keys 1-4 / A-D bhi use kar sakte hain).
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentQ.options.map((opt) => {
            const isSelected = currentAnswer?.selectedOption === opt.id
            const isCorrectOption = opt.id === currentQ.correctAnswer

            let optStyle =
              'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-800 dark:text-surface-100 hover:border-primary-400 dark:hover:border-primary-600 hover:bg-primary-50/20 dark:hover:bg-primary-950/20'

            if (isCurrentAnswered) {
              if (isSelected && currentAnswer.isCorrect) {
                // Correct selected
                optStyle =
                  'border-success-500 bg-success-50 dark:bg-success-950/40 text-success-900 dark:text-success-100 ring-2 ring-success-500/20'
              } else if (isSelected && !currentAnswer.isCorrect) {
                // Wrong selected
                optStyle =
                  'border-danger-500 bg-danger-50 dark:bg-danger-950/40 text-danger-900 dark:text-danger-100 ring-2 ring-danger-500/20'
              } else if (isCorrectOption) {
                // Highlight actual correct answer
                optStyle =
                  'border-success-500 bg-success-50/50 dark:bg-success-950/20 text-success-800 dark:text-success-200 ring-1 ring-success-400'
              } else {
                optStyle =
                  'border-surface-200 dark:border-surface-700/60 bg-surface-50/50 dark:bg-surface-800/40 text-surface-400 dark:text-surface-500 opacity-60'
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                disabled={isCurrentAnswered}
                className={`w-full p-4 rounded-xl border text-left transition-all duration-150 flex items-start gap-3 select-none ${optStyle}`}
              >
                <span
                  className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? currentAnswer?.isCorrect
                        ? 'bg-success-600 text-white'
                        : 'bg-danger-600 text-white'
                      : isCurrentAnswered && isCorrectOption
                      ? 'bg-success-600 text-white'
                      : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                  }`}
                >
                  {opt.id}
                </span>

                <div className="flex-1 min-w-0 pt-0.5">
                  <span className="text-sm font-medium leading-snug block">{opt.text}</span>
                  {isCurrentAnswered && isCorrectOption && !isSelected && (
                    <span className="text-[0.6875rem] font-bold text-success-700 dark:text-success-400 mt-1 inline-flex items-center gap-1">
                      <CheckCircle2 size={12} /> Correct Choice
                    </span>
                  )}
                </div>

                {isCurrentAnswered && isSelected && (
                  <span className="shrink-0 pt-1">
                    {currentAnswer.isCorrect ? (
                      <CheckCircle2 size={18} className="text-success-600 dark:text-success-400" />
                    ) : (
                      <XCircle size={18} className="text-danger-600 dark:text-danger-400" />
                    )}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Immediate Feedback Reveal */}
        {isCurrentAnswered && (
          <div className="space-y-4 pt-3 border-t border-surface-100 dark:border-surface-700/60 animate-in fade-in duration-200">
            {currentAnswer.isCorrect ? (
              <div className="p-4 rounded-xl bg-success-50 dark:bg-success-950/40 border border-success-200 dark:border-success-800 text-success-900 dark:text-success-100 flex items-start gap-3">
                <CheckCircle2 size={20} className="text-success-600 dark:text-success-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-sm font-bold block">Sahi jawaab! Bilkul sahi deduction.</span>
                  <p className="text-xs text-success-800 dark:text-success-200 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-danger-50 dark:bg-danger-950/40 border border-danger-200 dark:border-danger-800 text-danger-900 dark:text-danger-100 flex items-start gap-3">
                <XCircle size={20} className="text-danger-600 dark:text-danger-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-sm font-bold block">
                    Galat jawaab. (Sahi Option: Option {currentQ.correctAnswer})
                  </span>
                  <p className="text-xs text-danger-800 dark:text-danger-200 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>
            )}

            {/* Rule Reference Callout */}
            <div className="p-3.5 rounded-xl bg-surface-50 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 flex items-start gap-3">
              <BookOpen size={16} className="text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-0.5">
                <span className="font-bold text-surface-900 dark:text-white block">
                  Authoritative Rule Citation:
                </span>
                <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                  {currentQ.ruleReference}
                </p>
              </div>
            </div>

            {/* Action Bar for Current Question */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <Button
                variant="ghost"
                size="sm"
                icon={RotateCcw}
                onClick={handleRetryQuestion}
                className="text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white"
              >
                Retry This Question
              </Button>

              <div className="flex items-center gap-2">
                {currentIndex < questions.length - 1 ? (
                  <Button
                    variant="primary"
                    size="sm"
                    iconRight={ArrowRight}
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                  >
                    Next Question
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Sparkles}
                    onClick={() => setShowSummary(true)}
                  >
                    Complete Practice & View Summary
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Controls (When not answered yet) */}
        {!isCurrentAnswered && (
          <div className="flex items-center justify-between pt-3 border-t border-surface-100 dark:border-surface-700/60">
            <Button
              variant="secondary"
              size="sm"
              icon={ArrowLeft}
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
            >
              Previous
            </Button>
            <span className="text-[0.6875rem] text-surface-400 dark:text-surface-500">
              Press 1-4 or A-D to select option
            </span>
            <Button
              variant="secondary"
              size="sm"
              iconRight={ArrowRight}
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex((prev) => prev + 1)}
            >
              Skip
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
