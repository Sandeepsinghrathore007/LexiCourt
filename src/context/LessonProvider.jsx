import { useState, useCallback, useMemo } from 'react'
import { LessonContext } from './LessonContext'
import l01Metadata from '../content/lessons/L01/metadata.json'

const LESSON_METADATA_MAP = {
  L01: l01Metadata,
}

export function LessonProvider({ children }) {
  const [activeLessonId, setActiveLessonId] = useState('L01')
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const activeMetadata = useMemo(() => {
    return LESSON_METADATA_MAP[activeLessonId] || l01Metadata
  }, [activeLessonId])

  const steps = useMemo(() => {
    return activeMetadata?.steps || []
  }, [activeMetadata])

  const currentStep = useMemo(() => {
    return steps[currentStepIndex] || steps[0]
  }, [steps, currentStepIndex])

  const goToStep = useCallback((index) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index)
    }
  }, [steps.length])

  const nextStep = useCallback(() => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1))
  }, [steps.length])

  const prevStep = useCallback(() => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  return (
    <LessonContext.Provider
      value={{
        activeLessonId,
        setActiveLessonId,
        activeMetadata,
        steps,
        currentStepIndex,
        currentStep,
        goToStep,
        nextStep,
        prevStep,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
      }}
    >
      {children}
    </LessonContext.Provider>
  )
}
