export default function ProgressBar({ 
  value = 0, 
  max = 100, 
  size = 'md',
  variant = 'primary',
  showLabel = false,
  label = '',
  className = '',
  ...props 
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  const barColors = {
    primary: 'bg-primary-500',
    success: 'bg-success-500',
    secondary: 'bg-secondary-500',
    error: 'bg-error-500',
  }

  return (
    <div className={className} {...props}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-medium text-surface-700">{label}</span>
          {showLabel && (
            <span className="text-sm font-medium text-surface-500">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div
        className={`w-full rounded-full bg-surface-200 overflow-hidden ${heights[size]}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${barColors[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
