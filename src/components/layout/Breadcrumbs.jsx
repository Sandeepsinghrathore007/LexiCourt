import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumbs({ topicTitle = 'Core Grammar', lessonTitle = 'Lesson 01', stepTitle = '' }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-surface-500 dark:text-surface-400 mb-4 select-none" aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium text-surface-600 dark:text-surface-400"
      >
        <Home size={13} />
        <span>Dashboard</span>
      </Link>

      <ChevronRight size={13} className="text-surface-400 dark:text-surface-600" />
      <span className="truncate max-w-sm text-surface-600 dark:text-surface-400">{topicTitle}</span>

      <ChevronRight size={13} className="text-surface-400 dark:text-surface-600" />
      <span className="font-semibold text-surface-800 dark:text-surface-200">{lessonTitle}</span>

      {stepTitle && (
        <>
          <ChevronRight size={13} className="text-surface-400 dark:text-surface-600" />
          <span className="text-primary-700 dark:text-primary-300 font-bold bg-primary-50 dark:bg-primary-950/60 px-2 py-0.5 rounded border border-primary-100 dark:border-primary-800">
            {stepTitle}
          </span>
        </>
      )}
    </nav>
  )
}
