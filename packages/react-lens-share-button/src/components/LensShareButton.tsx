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
  removeStyles = false,
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
        !removeStyles && colors,
        !removeStyles && link,
        !removeStyles && light && lightBg,
        'ReactLensShareButton',
        className && className
      )}
      {...rest}
    >
      {buttonLabel}
      {icon && (
        <span
          className={clsx(
            !removeStyles && iconWrapper,
            'ReactLensShareButton__svg-wrapper',
            iconWrapperClassName && iconWrapperClassName
          )}
        >
          <LensIcon
            width={iconSize}
            height={iconSize}
            removeStyles={removeStyles}
            className={iconClassName}
          />
        </span>
      )}
    </a>
  )
}
