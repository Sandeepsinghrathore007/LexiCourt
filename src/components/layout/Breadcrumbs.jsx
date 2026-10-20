import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumbs({ topicTitle = 'Core Grammar', lessonTitle = 'Lesson 01', stepTitle = '' }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-surface-500 mb-4 select-none" aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-primary-600 transition-colors font-medium text-surface-600"
      >
        <Home size={13} />
        <span>Dashboard</span>
      </Link>

      <ChevronRight size={13} className="text-surface-400" />
      <span className="truncate max-w-[200px] text-surface-600">{topicTitle}</span>

      <ChevronRight size={13} className="text-surface-400" />
      <span className="font-semibold text-surface-800">{lessonTitle}</span>

      {stepTitle && (
        <>
          <ChevronRight size={13} className="text-surface-400" />
          <span className="text-primary-700 font-bold bg-primary-50 px-2 py-0.5 rounded border border-primary-100">
            {stepTitle}
          </span>
        </>
      )}
    </nav>
  )
}
