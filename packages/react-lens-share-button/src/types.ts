import { HTMLProps } from 'react'

export interface UrlProps {
  postBody: string
  url?: string
  via?: string
  hashtags?: string
  preview?: boolean
}

export interface LensShareProps extends UrlProps, HTMLProps<HTMLAnchorElement> {
  buttonLabel?: string
  icon?: boolean
  iconSize?: number
  removeStyles?: boolean
  light?: boolean
}

export interface IconProps {
  height: number
  width: number
  removeStyles?: boolean
}
