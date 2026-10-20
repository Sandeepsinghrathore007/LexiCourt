import { Info, Lightbulb, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react'

const config = {
  info: {
    icon: Info,
    colors: 'bg-primary-50 border-primary-200 text-primary-800',
    iconColor: 'text-primary-500',
  },
  tip: {
    icon: Lightbulb,
    colors: 'bg-secondary-50 border-secondary-200 text-secondary-800',
    iconColor: 'text-secondary-500',
  },
  warning: {
    icon: AlertTriangle,
    colors: 'bg-secondary-50 border-secondary-300 text-secondary-900',
    iconColor: 'text-secondary-600',
  },
  error: {
    icon: AlertCircle,
    colors: 'bg-error-50 border-error-200 text-error-800',
    iconColor: 'text-error-500',
  },
  success: {
    icon: CheckCircle,
    colors: 'bg-success-50 border-success-200 text-success-800',
    iconColor: 'text-success-500',
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
