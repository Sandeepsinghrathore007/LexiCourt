import { useState, useEffect, useCallback } from 'react'
import { ProgressContext } from './ProgressContext'
import { getItem, setItem, STORAGE_KEYS, clearAllProgress } from '../utils/storage'

const ALL_LESSONS = [
  'L01', 'L02', 'L03', 'L04', 'L05', 'L06', 'L07', 'L08', 'L09', 'L10',
  'L11', 'L12', 'L13', 'L14', 'L15', 'L16', 'L17', 'L18', 'L19'
]

export function createCleanProgress() {
  const lessons = {}
  ALL_LESSONS.forEach((id, index) => {
    lessons[id] = {
      status: index === 0 ? 'in-progress' : 'not-started',
      completedSteps: [],
      scores: {},
      timeSpentSeconds: 0,
    }
  })
  return {
    version: 1,
    lastUpdated: new Date().toISOString(),
    lessons,
  }
}

const INITIAL_ERRORS = {
  version: 1,
  errors: [],
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    const saved = getItem(STORAGE_KEYS.PROGRESS, null)
    if (!saved || !saved.lessons) return createCleanProgress()
    return saved
  })

  const [errorBank, setErrorBank] = useState(() => {
    return getItem(STORAGE_KEYS.ERRORS, INITIAL_ERRORS)
  })

  // Sync progress to localStorage
  useEffect(() => {
    setItem(STORAGE_KEYS.PROGRESS, progress)
  }, [progress])

  // Sync error bank to localStorage
  useEffect(() => {
    setItem(STORAGE_KEYS.ERRORS, errorBank)
  }, [errorBank])

  const markStepCompleted = useCallback((lessonId, stepId) => {
    setProgress((prev) => {
      const lessonProgress = prev.lessons?.[lessonId] || {
        status: 'in-progress',
        completedSteps: [],
        scores: {},
        timeSpentSeconds: 0,
      }

      if (lessonProgress.completedSteps.includes(stepId)) {
        return prev
      }

      const updatedSteps = [...lessonProgress.completedSteps, stepId]
      const isAllStepsCompleted = updatedSteps.length >= 10
      const isMastered = lessonProgress.scores?.mastery?.passed && isAllStepsCompleted

      return {
        ...prev,
        lastUpdated: new Date().toISOString(),
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            ...lessonProgress,
            status: isMastered ? 'mastered' : isAllStepsCompleted ? 'completed' : 'in-progress',
            completedSteps: updatedSteps,
          },
        },
      }
    })
  }, [])

  const recordQuizScore = useCallback((lessonId, stage, score, total) => {
    setProgress((prev) => {
      const lessonProgress = prev.lessons?.[lessonId] || {
        status: 'in-progress',
        completedSteps: [],
        scores: {},
        timeSpentSeconds: 0,
      }

      const prevScores = lessonProgress.scores || {}
      const isMasteryPassed = stage === 'mastery' ? (score / total) >= 0.8 : false
      const currentPassed = isMasteryPassed || prevScores.mastery?.passed || false

      return {
        ...prev,
        lastUpdated: new Date().toISOString(),
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            ...lessonProgress,
            status: currentPassed ? 'mastered' : lessonProgress.status,
            scores: {
              ...prevScores,
              [stage]: {
                score,
                total,
                completed: true,
                bestScore: Math.max(score, prevScores[stage]?.bestScore || 0),
                passed: stage === 'mastery' ? isMasteryPassed : true,
                lastAttemptDate: new Date().toISOString(),
              },
            },
          },
        },
      }
    })
  }, [])

  const logError = useCallback((errorData) => {
    setErrorBank((prev) => {
      const existing = prev.errors || []
      const index = existing.findIndex((e) => e.questionId === errorData.questionId)
      if (index >= 0) {
        const updated = [...existing]
        updated[index] = {
          ...updated[index],
          ...errorData,
          timestamp: new Date().toISOString(),
          retryCount: (updated[index].retryCount || 0) + 1,
          reviewed: false,
          lastRetrySuccess: false,
        }
        return { ...prev, errors: updated }
      }
      return {
        ...prev,
        errors: [
          ...existing,
          {
            errorId: `ERR-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            timestamp: new Date().toISOString(),
            reviewed: false,
            retryCount: 0,
            lastRetrySuccess: false,
            ...errorData,
          },
        ],
      }
    })
  }, [])

  const resolveError = useCallback((questionId) => {
    setErrorBank((prev) => {
      const updated = (prev.errors || []).map((e) => {
        if (e.questionId === questionId) {
          return {
            ...e,
            reviewed: true,
            lastRetrySuccess: true,
            resolvedAt: new Date().toISOString(),
          }
        }
        return e
      })
      return { ...prev, errors: updated }
    })
  }, [])

  const getLessonErrors = useCallback((lessonId) => {
    return (errorBank.errors || []).filter((e) => e.lessonId === lessonId)
  }, [errorBank])

  const isStepCompleted = useCallback((lessonId, stepId) => {
    return progress?.lessons?.[lessonId]?.completedSteps?.includes(stepId) || false
  }, [progress])

  const getLessonProgress = useCallback((lessonId) => {
    const lesson = progress?.lessons?.[lessonId]
    if (!lesson) return 0
    const stepsCount = lesson.completedSteps?.length || 0
    return Math.min(100, Math.round((stepsCount / 10) * 100))
  }, [progress])

  const getOverallProgress = useCallback(() => {
    // 19 total lessons, 10 steps each = 190 total steps
    let completedCount = 0
    Object.values(progress?.lessons || {}).forEach((lesson) => {
      completedCount += lesson.completedSteps?.length || 0
    })
    return Math.min(100, Math.round((completedCount / 190) * 100))
  }, [progress])

  const resetProgress = useCallback(() => {
    const clean = createCleanProgress()
    clearAllProgress()
    setProgress(clean)
    setErrorBank(INITIAL_ERRORS)
    setItem(STORAGE_KEYS.PROGRESS, clean)
    setItem(STORAGE_KEYS.ERRORS, INITIAL_ERRORS)
  }, [])

  return (
    <ProgressContext.Provider
      value={{
        progress,
        errorBank,
        markStepCompleted,
        recordQuizScore,
        logError,
        resolveError,
        getLessonErrors,
        isStepCompleted,
        getLessonProgress,
        getOverallProgress,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}
