import { RotateCcw } from 'lucide-react'
import { useFontSize } from '../../hooks/useFontSize'

export default function FontSizeControl({ className = '' }) {
  const {
    fontScale,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    isMin,
    isMax,
    isDefault,
    minScale,
    maxScale,
  } = useFontSize()

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/80 p-0.5 text-xs select-none shadow-2xs ${className}`}
      role="group"
      aria-label="Text size adjustments"
    >
      {/* Decrease Button (A−) */}
      <button
        type="button"
        onClick={decreaseFontSize}
        disabled={isMin}
        aria-label="Decrease font size"
        title={isMin ? `Minimum font size reached (${minScale}%)` : `Decrease font size to ${fontScale - 5}% (A−)`}
        className="px-2 py-1 rounded-md font-semibold text-surface-700 dark:text-surface-200 hover:bg-white dark:hover:bg-surface-700 hover:text-primary-600 dark:hover:text-primary-300 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-surface-700 transition-colors cursor-pointer"
      >
        A−
      </button>

      {/* Scale Indicator / Reset on click */}
      <button
        type="button"
        onClick={resetFontSize}
        disabled={isDefault}
        aria-label={isDefault ? 'Font size is 100% (default)' : `Current font size is ${fontScale}%. Click to reset to 100%`}
        title={isDefault ? 'Default font size: 100%' : `Current font size: ${fontScale}%. Click to reset to 100%`}
        className={`px-1.5 py-1 font-mono text-[0.6875rem] font-bold rounded-md transition-colors ${
          isDefault
            ? 'text-surface-600 dark:text-surface-400 cursor-default'
            : 'text-primary-700 dark:text-primary-300 bg-primary-100/70 dark:bg-primary-950/70 hover:bg-primary-200/70 dark:hover:bg-primary-900/70 cursor-pointer'
        }`}
      >
        {fontScale}%
      </button>

      {/* Increase Button (A+) */}
      <button
        type="button"
        onClick={increaseFontSize}
        disabled={isMax}
        aria-label="Increase font size"
        title={isMax ? `Maximum font size reached (${maxScale}%)` : `Increase font size to ${fontScale + 5}% (A+)`}
        className="px-2 py-1 rounded-md font-semibold text-surface-700 dark:text-surface-200 hover:bg-white dark:hover:bg-surface-700 hover:text-primary-600 dark:hover:text-primary-300 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-surface-700 transition-colors cursor-pointer"
      >
        A+
      </button>

      {/* Explicit Reset Button when non-default */}
      {!isDefault && (
        <button
          type="button"
          onClick={resetFontSize}
          aria-label="Reset font size to 100%"
          title="Reset to 100%"
          className="p-1 rounded-md text-surface-400 dark:text-surface-500 hover:text-surface-700 dark:hover:text-surface-200 hover:bg-white dark:hover:bg-surface-700 transition-colors cursor-pointer"
        >
          <RotateCcw size={12} />
        </button>
      )}
    </div>
  )
}
