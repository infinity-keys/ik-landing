import React from 'react'

import clsx from 'clsx'

import LensIcon from './LensIcon'
import { link, iconWrapper, lightBg } from './ShareButton.css'
import { LensShareProps } from './types'
import { buildLensShareUrl } from './utils'

const ShareButton = ({
  postBody,
  url,
  via,
  hashtags,
  buttonLabel = 'Share',
  icon = true,
  preview = true,
  iconSize = 18,
  removeStyles = false,
  light = false,
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
        !removeStyles && link,
        !removeStyles && light && lightBg,
        'ReactLensShareButton'
      )}
      {...rest}
    >
      {buttonLabel}
      {icon && (
        <span
          className={clsx(
            !removeStyles && iconWrapper,
            'ReactLensShareButton__svg-wrapper'
          )}
        >
          <LensIcon
            width={iconSize}
            height={iconSize}
            removeStyles={removeStyles}
          />
        </span>
      )}
    </a>
  )
}

export default ShareButton
