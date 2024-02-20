import { PropsWithChildren } from 'react'

import clsx from 'clsx'

import { Link } from '@redwoodjs/router'

export interface ButtonStyleProps {
  bold?: boolean
  borderWhite?: boolean
  disabled?: boolean
  fullWidth?: boolean
  round?: boolean
  shadow?: boolean
  solid?: boolean
  size?: 'small' | 'medium' | 'large'
}

export interface ButtonProps extends PropsWithChildren, ButtonStyleProps {
  href?: string
  onClick?: () => void
  to?: string
  openInNewTab?: boolean
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
  openInNewTab = true,
  round = false,
  shadow = false,
  solid = false,
  size = 'medium',
  type = 'submit',
  children,
}: ButtonProps) {
  const classes = generateButtonClasses({
    bold,
    borderWhite,
    disabled,
    fullWidth,
    round,
    shadow,
    solid,
    size,
  })

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
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
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

export const generateButtonClasses = ({
  bold = false,
  borderWhite = false,
  disabled = false,
  fullWidth = false,
  round = false,
  shadow = false,
  solid = false,
  size = 'medium',
}: ButtonStyleProps) => {
  return clsx(
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
    !disabled && {
      'hover:border-brand-accent-hover hover:bg-brand-accent-hover': solid,
      'hover:border-brand-accent-hover': borderWhite,
      'hover:border-white': !borderWhite && !solid,
      'active:translate-y-[3px]': true,
      'active:shadow-[0_0_0_0_rgba(68,64,60,1)] hover:shadow-[rgba(87,83,78,1)]':
        shadow,
    },
    {
      'py-1 px-2 text-sm': size === 'small',
      'py-2 px-6 text-base': size === 'medium',
      'py-2 px-8 text-2xl': size === 'large',
    }
  )
}
