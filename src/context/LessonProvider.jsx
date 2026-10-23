import { useState, useCallback, useMemo } from 'react'
import { LessonContext } from './LessonContext'
import l01Metadata from '../content/lessons/L01/metadata.json'
import l02Metadata from '../content/lessons/L02/metadata.json'
import l03Metadata from '../content/lessons/L03/metadata.json'
import l04Metadata from '../content/lessons/L04/metadata.json'
import l05Metadata from '../content/lessons/L05/metadata.json'
import l06Metadata from '../content/lessons/L06/metadata.json'
import l07Metadata from '../content/lessons/L07/metadata.json'
import l08Metadata from '../content/lessons/L08/metadata.json'
import l09Metadata from '../content/lessons/L09/metadata.json'
import l10Metadata from '../content/lessons/L10/metadata.json'
import l11Metadata from '../content/lessons/L11/metadata.json'
import l12Metadata from '../content/lessons/L12/metadata.json'
import l13Metadata from '../content/lessons/L13/metadata.json'
import l14Metadata from '../content/lessons/L14/metadata.json'
import l15Metadata from '../content/lessons/L15/metadata.json'
import l16Metadata from '../content/lessons/L16/metadata.json'
import l17Metadata from '../content/lessons/L17/metadata.json'
import l18Metadata from '../content/lessons/L18/metadata.json'
import l19Metadata from '../content/lessons/L19/metadata.json'

const LESSON_METADATA_MAP = {
  L01: l01Metadata,
  L02: l02Metadata,
  L03: l03Metadata,
  L04: l04Metadata,
  L05: l05Metadata,
  L06: l06Metadata,
  L07: l07Metadata,
  L08: l08Metadata,
  L09: l09Metadata,
  L10: l10Metadata,
  L11: l11Metadata,
  L12: l12Metadata,
  L13: l13Metadata,
  L14: l14Metadata,
  L15: l15Metadata,
  L16: l16Metadata,
  L17: l17Metadata,
  L18: l18Metadata,
  L19: l19Metadata,
}

export function LessonProvider({ children }) {
  const [activeLessonId, setActiveLessonIdState] = useState('L01')
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const setActiveLessonId = useCallback((newLessonId) => {
    setActiveLessonIdState((prev) => {
      if (prev !== newLessonId) {
        setCurrentStepIndex(0)
        return newLessonId
      }
      return prev
    })
  }, [])

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
