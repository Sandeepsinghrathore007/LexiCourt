const variants = {
  primary: 'bg-primary-100 text-primary-700 border-primary-200 dark:bg-primary-950 dark:text-primary-200 dark:border-primary-500/40',
  secondary: 'bg-secondary-100 text-secondary-700 border-secondary-200 dark:bg-secondary-950 dark:text-secondary-200 dark:border-secondary-500/40',
  success: 'bg-success-100 text-success-700 border-success-200 dark:bg-success-950 dark:text-success-200 dark:border-success-500/40',
  error: 'bg-error-100 text-error-700 border-error-200 dark:bg-error-950 dark:text-error-200 dark:border-error-500/40',
  neutral: 'bg-surface-100 text-surface-600 border-surface-200 dark:bg-surface-800 dark:text-surface-100 dark:border-surface-600',
}

const sizes = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-2.5 py-1 text-sm',
}

export default function Badge({ 
  variant = 'neutral', 
  size = 'md', 
  dot = false,
  children, 
  className = '', 
  ...props 
}) {
  const dotColors = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    success: 'bg-success-500',
    error: 'bg-error-500',
    neutral: 'bg-surface-400',
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium
        border rounded-full whitespace-nowrap
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  )
}
