import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  FontSizeContext,
  DEFAULT_FONT_SCALE,
  MIN_FONT_SCALE,
  MAX_FONT_SCALE,
  FONT_SCALE_STEP,
} from './FontSizeContext'
import { getItem, setItem, STORAGE_KEYS } from '../utils/storage'

function clampScale(val) {
  const num = Number(val)
  if (Number.isNaN(num)) return DEFAULT_FONT_SCALE
  const clamped = Math.max(MIN_FONT_SCALE, Math.min(MAX_FONT_SCALE, num))
  return Math.round(clamped / FONT_SCALE_STEP) * FONT_SCALE_STEP
}

export function FontSizeProvider({ children }) {
  const [fontScale, setFontScaleState] = useState(() => {
    try {
      const settings = getItem(STORAGE_KEYS.SETTINGS, null)
      if (settings && typeof settings === 'object') {
        const saved = settings.fontSize ?? settings.fontScale
        if (saved !== undefined && saved !== null) {
          return clampScale(saved)
        }
      }
    } catch (e) {
      console.warn('[fontSize] Error loading font size preference:', e)
    }
    return DEFAULT_FONT_SCALE
  })

  // Synchronize CSS variable and root element font-size
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--font-scale', `${fontScale}%`)
    root.style.fontSize = `${fontScale}%`
  }, [fontScale])

  const setFontScale = useCallback((newScale) => {
    const clamped = clampScale(newScale)
    setFontScaleState(clamped)
    try {
      const existingSettings = getItem(STORAGE_KEYS.SETTINGS, {}) || {}
      setItem(STORAGE_KEYS.SETTINGS, {
        ...existingSettings,
        fontSize: clamped,
      })
    } catch (e) {
      console.warn('[fontSize] Failed to persist font size preference:', e)
    }
  }, [])

  const increaseFontSize = useCallback(() => {
    setFontScaleState((prev) => {
      const next = Math.min(MAX_FONT_SCALE, prev + FONT_SCALE_STEP)
      try {
        const existingSettings = getItem(STORAGE_KEYS.SETTINGS, {}) || {}
        setItem(STORAGE_KEYS.SETTINGS, {
          ...existingSettings,
          fontSize: next,
        })
      } catch (e) {
        console.warn('[fontSize] Failed to persist font size preference:', e)
      }
      return next
    })
  }, [])

  const decreaseFontSize = useCallback(() => {
    setFontScaleState((prev) => {
      const next = Math.max(MIN_FONT_SCALE, prev - FONT_SCALE_STEP)
      try {
        const existingSettings = getItem(STORAGE_KEYS.SETTINGS, {}) || {}
        setItem(STORAGE_KEYS.SETTINGS, {
          ...existingSettings,
          fontSize: next,
        })
      } catch (e) {
        console.warn('[fontSize] Failed to persist font size preference:', e)
      }
      return next
    })
  }, [])

  const resetFontSize = useCallback(() => {
    setFontScaleState(DEFAULT_FONT_SCALE)
    try {
      const existingSettings = getItem(STORAGE_KEYS.SETTINGS, {}) || {}
      setItem(STORAGE_KEYS.SETTINGS, {
        ...existingSettings,
        fontSize: DEFAULT_FONT_SCALE,
      })
    } catch (e) {
      console.warn('[fontSize] Failed to persist font size preference:', e)
    }
  }, [])

  const contextValue = useMemo(() => {
    return {
      fontScale,
      increaseFontSize,
      decreaseFontSize,
      resetFontSize,
      setFontScale,
      minScale: MIN_FONT_SCALE,
      maxScale: MAX_FONT_SCALE,
      step: FONT_SCALE_STEP,
      isMin: fontScale <= MIN_FONT_SCALE,
      isMax: fontScale >= MAX_FONT_SCALE,
      isDefault: fontScale === DEFAULT_FONT_SCALE,
    }
  }, [fontScale, increaseFontSize, decreaseFontSize, resetFontSize, setFontScale])

  return (
    <FontSizeContext.Provider value={contextValue}>
      {children}
    </FontSizeContext.Provider>
  )
}
