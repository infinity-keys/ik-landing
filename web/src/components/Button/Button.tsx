import { PropsWithChildren } from 'react'

import clsx from 'clsx'

import { Link } from '@redwoodjs/router'

export interface ButtonProps extends PropsWithChildren {
  href?: string
  onClick?: () => void
  to?: string
  bold?: boolean
  borderWhite?: boolean
  disabled?: boolean
  fullWidth?: boolean
  round?: boolean
  shadow?: boolean
  solid?: boolean
  size?: 'small' | 'medium' | 'large'
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  href,
  onClick,
  to,
  bold = false,
  borderWhite = false,
  disabled = false,
  fullWidth = false,
  round = false,
  shadow = false,
  solid = false,
  size = 'medium',
  type = 'submit',
  children,
}: ButtonProps) {
  const classes = clsx(
    'ik-button text-shadow-sm border-2 text-center transition text-white',
    round ? 'rounded-full' : 'rounded-md',
    fullWidth ? 'block w-full' : 'inline-block',
    borderWhite ? 'border-white' : 'border-brand-accent-primary',
    {
      'opacity-80 cursor-default': disabled,
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
