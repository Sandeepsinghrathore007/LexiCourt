const variants = {
  default: 'bg-white border border-surface-200 shadow-[var(--shadow-card)]',
  elevated: 'bg-white shadow-[var(--shadow-lg)]',
  outlined: 'bg-transparent border border-surface-300',
  filled: 'bg-surface-50 border border-surface-100',
  primary: 'bg-primary-50 border border-primary-200',
  success: 'bg-success-50 border border-success-200',
  error: 'bg-error-50 border border-error-200',
  glass: 'glass-card',
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
