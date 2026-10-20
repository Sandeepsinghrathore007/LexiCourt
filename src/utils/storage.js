/**
 * HSA EnglishMaster — LocalStorage Adapter
 * Provides safe, namespaced client persistence with fallback handling.
 */

export const STORAGE_KEYS = {
  PROGRESS: 'hsa-em:progress',
  SETTINGS: 'hsa-em:settings',
  ERRORS: 'hsa-em:errors',
}

export function getItem(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return defaultValue
    return JSON.parse(raw)
  } catch (error) {
    console.warn(`[storage] Error reading key "${key}":`, error)
    return defaultValue
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`[storage] Error saving key "${key}":`, error)
    return false
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.warn(`[storage] Error removing key "${key}":`, error)
    return false
  }
}

export function clearAllProgress() {
  removeItem(STORAGE_KEYS.PROGRESS)
  removeItem(STORAGE_KEYS.ERRORS)
}
