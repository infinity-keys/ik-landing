import { AuthenticationError } from '@redwoodjs/graphql-server'

import { KEYP } from 'src/lib/keyp/oAuth/providers/keyp/keyp'

const APPROVED_LOGIN_PROVIDERS = [KEYP]

export const validateLoginRequest = ({ type }: { type: string }) => {
  if (!APPROVED_LOGIN_PROVIDERS.includes(type)) {
    throw new AuthenticationError(
      `OAuth provider "${type}" not available for login.`
    )
  }
}
