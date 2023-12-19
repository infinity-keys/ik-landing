import React from 'react'

import { UserResource } from '@clerk/types'
import { truncate as truncateAddress } from '@infinity-keys/core'
import humanize from 'humanize-string'

const MAX_STRING_LENGTH = 150

export const formatEnum = (values: string | string[] | null | undefined) => {
  let output = ''

  if (Array.isArray(values)) {
    const humanizedValues = values.map((value) => humanize(value))
    output = humanizedValues.join(', ')
  } else if (typeof values === 'string') {
    output = humanize(values)
  }

  return output
}

export const truncate = (value: string | number) => {
  let output = value?.toString() ?? ''

  if (output.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }

  return output
}

export const jsonTruncate = (obj: unknown) => {
  return truncate(JSON.stringify(obj, null, 2))
}

export const timeTag = (dateTime?: string) => {
  let output: string | JSX.Element = ''

  if (dateTime) {
    output = (
      <time dateTime={dateTime} title={dateTime}>
        {new Date(dateTime).toUTCString()}
      </time>
    )
  }

  return output
}

export const checkboxInputTag = (checked: boolean) => {
  return <input type="checkbox" checked={checked} disabled />
}

export const formatUserMetadata = (user?: UserResource | null) => {
  const primaryWallet = user?.primaryWeb3Wallet?.web3Wallet
  const truncatedWallet = primaryWallet
    ? truncateAddress(primaryWallet)
    : undefined
  const primaryEmail = user?.primaryEmailAddress?.emailAddress
  const userName =
    user?.username || primaryEmail?.split('@')[0] || truncatedWallet || user?.id

  return {
    primaryEmail,
    primaryWallet,
    truncatedWallet,
    userName,
    avatar: user?.hasImage ? user?.imageUrl : '',
  }
}
