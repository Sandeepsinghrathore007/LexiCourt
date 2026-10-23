import { useState, useEffect, useCallback } from 'react'
import { ThemeContext } from './ThemeContext'
import { getItem, setItem, STORAGE_KEYS } from '../utils/storage'

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    // Light is the default; only activate dark if explicitly saved as 'dark'
    try {
      const settings = getItem(STORAGE_KEYS.SETTINGS, null)
      if (settings && typeof settings === 'object' && settings.theme === 'dark') {
        return 'dark'
      }
    } catch {
      // fallback to light
    }
    return 'light'
  })

  // Synchronize the DOM element classes and attributes whenever theme changes
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'light')
      root.style.colorScheme = 'light'
    }
  }, [theme])

  const setTheme = useCallback((newTheme) => {
    const nextTheme = newTheme === 'dark' ? 'dark' : 'light'
    setThemeState(nextTheme)
    try {
      const existingSettings = getItem(STORAGE_KEYS.SETTINGS, {}) || {}
      setItem(STORAGE_KEYS.SETTINGS, {
        ...existingSettings,
        theme: nextTheme,
      })
    } catch (e) {
      console.warn('[theme] Failed to persist theme preference:', e)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === 'dark',
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
