import { forwardRef } from 'react'

const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm',
  secondary: 'bg-surface-100 text-surface-700 hover:bg-surface-200 active:bg-surface-300 border border-surface-300',
  success: 'bg-success-600 text-white hover:bg-success-700 active:bg-success-800 shadow-sm',
  error: 'bg-error-600 text-white hover:bg-error-700 active:bg-error-800 shadow-sm',
  ghost: 'text-surface-600 hover:bg-surface-100 active:bg-surface-200',
  link: 'text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
  md: 'px-4 py-2 text-sm rounded-lg gap-2',
  lg: 'px-6 py-2.5 text-base rounded-lg gap-2.5',
  xl: 'px-8 py-3 text-lg rounded-xl gap-3',
}

const Button = forwardRef(({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon: Icon, 
  iconRight: IconRight,
  disabled = false,
  className = '',
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center font-medium
        transition-all duration-150 ease-in-out
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        cursor-pointer select-none
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="shrink-0" size={size === 'sm' ? 14 : size === 'lg' || size === 'xl' ? 20 : 16} />}
      {children}
      {IconRight && <IconRight className="shrink-0" size={size === 'sm' ? 14 : size === 'lg' || size === 'xl' ? 20 : 16} />}
    </button>
  )
})

Button.displayName = 'Button'
export default Button
