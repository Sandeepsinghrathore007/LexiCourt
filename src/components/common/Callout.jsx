import { Info, Lightbulb, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react'

const config = {
  info: {
    icon: Info,
    colors: 'bg-primary-50 dark:bg-primary-950/80 border-primary-200 dark:border-primary-500/50 text-primary-900 dark:text-primary-100',
    iconColor: 'text-primary-600 dark:text-primary-300',
  },
  tip: {
    icon: Lightbulb,
    colors: 'bg-secondary-50 dark:bg-secondary-950/80 border-secondary-200 dark:border-secondary-500/50 text-secondary-950 dark:text-secondary-100',
    iconColor: 'text-secondary-600 dark:text-secondary-300',
  },
  warning: {
    icon: AlertTriangle,
    colors: 'bg-secondary-50 dark:bg-secondary-950/80 border-secondary-300 dark:border-secondary-500/60 text-secondary-950 dark:text-secondary-100',
    iconColor: 'text-secondary-600 dark:text-secondary-300',
  },
  error: {
    icon: AlertCircle,
    colors: 'bg-error-50 dark:bg-error-950/80 border-error-200 dark:border-error-500/50 text-error-900 dark:text-error-100',
    iconColor: 'text-error-600 dark:text-error-300',
  },
  success: {
    icon: CheckCircle,
    colors: 'bg-success-50 dark:bg-success-950/80 border-success-200 dark:border-success-500/50 text-success-900 dark:text-success-100',
    iconColor: 'text-success-600 dark:text-success-300',
  },
}

export default function Callout({ 
  type = 'info', 
  title, 
  children, 
  className = '',
  ...props 
}) {
  const { icon: IconComponent, colors, iconColor } = config[type]

  return (
    <div
      className={`flex gap-3 p-4 border rounded-xl ${colors} ${className}`}
      role="alert"
      {...props}
    >
      <IconComponent className={`shrink-0 mt-0.5 ${iconColor}`} size={20} />
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-semibold mb-1">{title}</p>
        )}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}
