import { useState, useEffect, useCallback } from 'react'
import { ProgressContext } from './ProgressContext'
import { getItem, setItem, STORAGE_KEYS, clearAllProgress } from '../utils/storage'

const INITIAL_PROGRESS = {
  version: 1,
  lastUpdated: new Date().toISOString(),
  lessons: {
    L01: {
      status: 'in-progress',
      completedSteps: ['step-1'],
      scores: {
        guided: { score: 0, total: 12, completed: false },
        independent: { score: 0, total: 20, completed: false },
        mastery: { bestScore: 0, total: 15, passed: false, completed: false },
      },
      timeSpentSeconds: 120,
    },
  },
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    return getItem(STORAGE_KEYS.PROGRESS, INITIAL_PROGRESS)
  })

  // Sync to localStorage
  useEffect(() => {
    setItem(STORAGE_KEYS.PROGRESS, progress)
  }, [progress])

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

      return {
        ...prev,
        lastUpdated: new Date().toISOString(),
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            ...lessonProgress,
            status: isAllStepsCompleted ? 'completed' : 'in-progress',
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

      return {
        ...prev,
        lastUpdated: new Date().toISOString(),
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            ...lessonProgress,
            status: isMasteryPassed ? 'mastered' : lessonProgress.status,
            scores: {
              ...prevScores,
              [stage]: {
                score,
                total,
                completed: true,
                bestScore: Math.max(score, prevScores[stage]?.bestScore || 0),
                passed: stage === 'mastery' ? isMasteryPassed : true,
              },
            },
          },
        },
      }
    })
  }, [])

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
    // 18 total lessons, 10 steps each = 180 total steps
    let completedCount = 0
    Object.values(progress?.lessons || {}).forEach((lesson) => {
      completedCount += lesson.completedSteps?.length || 0
    })
    return Math.min(100, Math.round((completedCount / 180) * 100))
  }, [progress])

  const resetProgress = useCallback(() => {
    clearAllProgress()
    setProgress(INITIAL_PROGRESS)
  }, [])

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markStepCompleted,
        recordQuizScore,
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
