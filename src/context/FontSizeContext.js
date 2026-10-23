import { createContext } from 'react'

export const DEFAULT_FONT_SCALE = 100
export const MIN_FONT_SCALE = 85
export const MAX_FONT_SCALE = 125
export const FONT_SCALE_STEP = 5

export const FontSizeContext = createContext({
  fontScale: DEFAULT_FONT_SCALE,
  increaseFontSize: () => {},
  decreaseFontSize: () => {},
  resetFontSize: () => {},
  setFontScale: () => {},
  minScale: MIN_FONT_SCALE,
  maxScale: MAX_FONT_SCALE,
  step: FONT_SCALE_STEP,
  isMin: false,
  isMax: false,
  isDefault: true,
})
