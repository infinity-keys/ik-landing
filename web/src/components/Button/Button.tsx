import { PropsWithChildren } from 'react'

import clsx from 'clsx'

import { Link } from '@redwoodjs/router'

export interface ButtonProps extends PropsWithChildren {
  to?: string
  href?: string
  fullWidth?: boolean
  bold?: boolean
  borderWhite?: boolean
  solid?: boolean
  round?: boolean
  shadow?: boolean
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  disabled?: boolean
  responsive?: boolean
}

export default function Button({
  to,
  href,
  onClick,
  fullWidth = false,
  round = false,
  solid = false,
  borderWhite = false,
  bold = false,
  shadow = false,
  disabled = false,
  type = 'submit',
  size = 'medium',
  children,
}: ButtonProps) {
  const classes = clsx(
    'ik-button border-2 text-center transition text-white',
    round ? 'rounded-full' : 'rounded-md',
    fullWidth ? 'block w-full' : 'inline-block',
    borderWhite ? 'border-white' : 'border-brand-accent-primary',
    disabled && 'opacity-80 cursor-default',
    {
      'font-bold': bold,
      'shadow-[0_3px_0_0_rgba(68,64,60,1)]': shadow,
      'bg-brand-accent-primary': solid,
    },
    // Hover and active states
    !disabled && {
      'hover:border-brand-accent-hover hover:bg-brand-accent-hover': solid,
      'hover:border-brand-accent-hover': borderWhite,
      'hover:border-white': !borderWhite && !solid,
      'active:translate-y-[3px]': true,
      'active:shadow-[0_0_0_0_rgba(68,64,60,1)] hover:shadow-[rgba(87,83,78,1)]':
        shadow,
    },
    // Sizes
    {
      'py-1 px-2 text-sm': size === 'small',
      'py-2 px-6 text-base': size === 'medium',
      'py-2 px-8 text-2xl': size === 'large',
    }
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        <span className="flex items-center justify-center">{children}</span>
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        <span className="flex items-center justify-center">{children}</span>
      </a>
    )
  }

  return (
    <button
      className={classes}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="flex items-center justify-center">{children}</span>
    </button>
  )
}
