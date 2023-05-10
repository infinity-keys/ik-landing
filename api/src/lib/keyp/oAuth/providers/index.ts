import { AuthProviderType } from '@infinity-keys/core'

import { KEYP, provider as keypProvider } from './keyp/keyp'

export const providers: {
  [key in AuthProviderType]: typeof keypProvider
} = {
  [KEYP]: keypProvider,
}

export const types: AuthProviderType[] = [KEYP]
