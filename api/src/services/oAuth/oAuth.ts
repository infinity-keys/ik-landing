import { AuthProviderType } from '@infinity-keys/core'

import {
  oAuthUrl as getOAuthUrl,
  processCodeGrant,
  // processRevoke,
} from 'src/lib/keyp/oAuth'

export const oAuthUrl = ({ type }: { type: AuthProviderType }) =>
  getOAuthUrl(type)

export const codeGrant = ({
  state,
  code,
  type,
  accountId,
}: {
  state: string
  code: string
  type: AuthProviderType
  accountId: string
}) => processCodeGrant({ state, code, type, _accountId: accountId })

// @NOTE: processRevoke calls `provider.onRevoke` which doesn't exist
// export const revokeOAuth = ({ type }) => processRevoke(type)
