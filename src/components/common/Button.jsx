import { forwardRef } from 'react'

const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm dark:bg-primary-600 dark:hover:bg-primary-500',
  secondary: 'bg-surface-100 text-surface-700 hover:bg-surface-200 active:bg-surface-300 border border-surface-300 dark:bg-surface-800 dark:text-surface-100 dark:border-surface-600 dark:hover:bg-surface-700 dark:hover:border-surface-500',
  success: 'bg-success-600 text-white hover:bg-success-700 active:bg-success-800 shadow-sm dark:bg-success-600 dark:hover:bg-success-500',
  error: 'bg-error-600 text-white hover:bg-error-700 active:bg-error-800 shadow-sm dark:bg-error-600 dark:hover:bg-error-500',
  ghost: 'text-surface-600 hover:bg-surface-100 active:bg-surface-200 dark:text-surface-200 dark:hover:bg-surface-800 dark:hover:text-surface-50',
  link: 'text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline dark:text-primary-300 dark:hover:text-primary-200',
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
