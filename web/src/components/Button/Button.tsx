import { ReactNode } from 'react'

import clsx from 'clsx'

import { Link } from '@redwoodjs/router'

export interface ButtonProps {
  text: string
  to?: string
  textColor?: 'dark' | 'light'
  fullWidth?: boolean
  border?: boolean
  shadow?: boolean
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'medium' | 'large'
  variant?: 'solid' | 'outline' | 'faded' | 'secondary' | 'warn'
  onClick?: () => void
  disabled?: boolean
  responsive?: boolean
  children?: ReactNode
}

export default function Button({
  text,
  to,
  textColor = 'light',
  fullWidth = false,
  type = 'submit',
  size = 'medium',
  variant = 'solid',
  border = true,
  shadow = true,
  onClick,
  disabled = false,
  responsive = false,
  children,
}: ButtonProps) {
  const classes = clsx(
    'ik-button inline-block border hover:border-white rounded-md font-medium text-center transition px-12',
    // Sizing
    { 'block w-full': fullWidth },
    // Borders
    { 'border-transparent': !border },
    { 'border-brand-accent-primary': border },
    // Text color
    [
      textColor === 'light' && 'text-white',
      textColor === 'dark' && 'text-brand-gray-primary hover:text-white',
    ],
    // Box Shadow
    {
      'shadow-[0_3px_0_0_rgba(68,64,60,1)] transition-shadow hover:shadow-[rgba(87,83,78,1)]':
        shadow,
    },
    // Variants
    [
      variant === 'solid' && {
        'bg-brand-accent-primary  hover:border-brand-accent-hover hover:bg-brand-accent-hover':
          true,
        'bg-brand-accent-tertiary border-brand-accent-tertiary text-stone-200 hover:shadow-[rgba(68,64,60,1)] hover:border-brand-accent-tertiary hover:bg-brand-accent-tertiary hover:text-stone-200':
          disabled,
      },
      variant === 'outline' && {
        'text-white hover:bg-brand-accent-primary': true,
        'hover:border-brand-accent-primary': true,
      },
      variant === 'warn' &&
        'text-white bg-red-500 border-red-500 hover:bg-red-700 hover:text-white',
      variant === 'faded' && 'bg-white/10 hover:text-brand-accent-primary',
      variant === 'secondary' &&
        'bg-brand-gray-secondary border-brand-gray-secondary hover:text-white hover:bg-brand-accent-primary ',
    ],
    // Sizes and responsive sizes
    [
      responsive && 'py-1 px-2 text-base sm:py-2 sm:px-4 sm:text-lg',
      !responsive && {
        'py-1 px-2 text-base': size === 'small',
        'py-2 px-4 text-lg': size === 'medium',
        'py-2 px-8 text-2xl': size === 'large',
      },
    ]
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        <span className="flex items-center justify-center">
          {children}
          {text}
        </span>
      </Link>
    )
  }

  return (
    <button
      className={classes}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="flex items-center justify-center">
        {children}
        {text}
      </span>
    </button>
  )
}
