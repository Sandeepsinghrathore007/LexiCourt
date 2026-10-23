const variants = {
  default: 'bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 shadow-[var(--shadow-card)] dark:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)]',
  elevated: 'bg-white dark:bg-surface-850 shadow-[var(--shadow-lg)] border border-surface-200 dark:border-surface-600 dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)]',
  outlined: 'bg-transparent border border-surface-300 dark:border-surface-600',
  filled: 'bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700',
  primary: 'bg-primary-50 dark:bg-primary-950/80 border border-primary-200 dark:border-primary-500/50',
  success: 'bg-success-50 dark:bg-success-950/80 border border-success-200 dark:border-success-500/50',
  error: 'bg-error-50 dark:bg-error-950/80 border border-error-200 dark:border-error-500/50',
  glass: 'glass-card dark:glass-card-dark',
}

export default function Card({ 
  variant = 'default', 
  padding = 'md', 
  hover = false,
  children, 
  className = '', 
  ...props 
}) {
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6',
    xl: 'p-8',
  }

  return (
    <div
      className={`
        rounded-xl
        ${variants[variant]}
        ${paddings[padding]}
        ${hover ? 'transition-shadow duration-200 hover:shadow-[var(--shadow-card-hover)]' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}
