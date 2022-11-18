import React from 'react'

import clsx from 'clsx'

import { LensIcon } from './LensIcon'
import { link, iconWrapper, lightBg, colors } from './style.css'
import { LensShareProps } from './types'
import { buildLensShareUrl } from './utils'

export const LensShareButton = ({
  postBody,
  url,
  via,
  hashtags,
  preview = true,
  buttonLabel = 'Share',
  icon = true,
  iconSize = 18,
  light = false,
  iconWrapperClassName,
  iconClassName,
  className,
  ...rest
}: LensShareProps) => {
  return (
    <a
      href={buildLensShareUrl({
        postBody,
        via,
        url,
        hashtags,
        preview,
      })}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        colors,
        link,
        light && lightBg,
        'react-lens-share-button',
        className && className
      )}
      {...rest}
    >
      {buttonLabel}
      {icon && (
        <span
          className={clsx(
            iconWrapper,
            'react-lens-share-button__svg-wrapper',
            iconWrapperClassName && iconWrapperClassName
          )}
        >
          <LensIcon
            width={iconSize}
            height={iconSize}
            className={iconClassName}
          />
        </span>
      )}
    </a>
  )
}
