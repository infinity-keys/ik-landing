import { KEYP, provider as keypProvider } from './keyp/keyp'

export const providers: {
  [key: string]: typeof keypProvider
} = {
  [KEYP]: keypProvider,
}

export const types = [KEYP]
