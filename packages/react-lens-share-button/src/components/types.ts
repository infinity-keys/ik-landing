import { HTMLProps } from 'react'

export interface BuildLensShareUrlProps {
  postBody: string
  url?: string
  via?: string
  hashtags?: string
  preview?: boolean
}

export interface LensShareProps
  extends BuildLensShareUrlProps,
    HTMLProps<HTMLAnchorElement> {
  buttonLabel?: string
  icon?: boolean
  iconSize?: number
  light?: boolean
  iconWrapperClassName?: string
  iconClassName?: string
}

export interface LensIconProps {
  height?: number
  width?: number
  className?: string
}
