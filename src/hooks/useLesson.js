import { useContext } from 'react'
import { LessonContext } from '../context/LessonContext.js'

export function useLesson() {
  const context = useContext(LessonContext)
  if (!context) {
    throw new Error('useLesson must be used within a LessonProvider')
  }
  return context
}
