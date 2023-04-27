import { KEYP, provider as keypProvider } from './keyp/keyp'

export const providers = {
  [KEYP]: keypProvider,
}

export const types = [KEYP]
