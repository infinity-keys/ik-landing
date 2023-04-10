import { InstanceWithExtensions, SDKBase } from '@magic-sdk/provider'
import { Magic, MagicSDKExtensionsOption } from 'magic-sdk'

import { createAuthentication } from '@redwoodjs/auth'

// If you're integrating with an auth service provider you should delete this interface.
// Instead you should import the type from their auth client sdk.
// export interface AuthClient {
//   login: () => User
//   logout: () => void
//   signup: () => User
//   getToken: () => string
//   getUserMetadata: () => User | null
// }

// If you're integrating with an auth service provider you should delete this interface.
// This type should be inferred from the general interface above.
// interface User {
//   // The name of the id variable will vary depending on what auth service
//   // provider you're integrating with. Another common name is `sub`
//   id: string
//   email?: string
//   username?: string
//   roles: string[]
// }

// If you're integrating with an auth service provider you should delete this interface
// This type should be inferred from the general interface above
export interface ValidateResetTokenResponse {
  error?: string
  [key: string]: string | undefined
}

// Replace this with the auth service provider client sdk
const client = new Magic(process.env.MAGIC_LINK_PUBLIC)

function createAuth() {
  const authImplementation = createAuthImplementation(client)

  // You can pass custom provider hooks here if you need to as a second
  // argument. See the Redwood framework source code for how that's used
  return createAuthentication(authImplementation)
}

// This is where most of the integration work will take place. You should keep
// the shape of this object (i.e. keep all the key names) but change all the
// values/functions to use methods from the auth service provider client sdk
// you're integrating with

function createAuthImplementation(
  client: InstanceWithExtensions<SDKBase, MagicSDKExtensionsOption<string>>
) {
  return {
    type: 'custom-auth',
    client,
    // TODO: maybe a different redirectURI default
    login: async ({ email, redirectURI = '' }) =>
      client.auth.loginWithMagicLink({ email, showUI: true, redirectURI }),
    logout: async () => client.user.logout(),
    signup: async ({ email, redirectURI = '' }) =>
      client.auth.loginWithMagicLink({ email, showUI: true, redirectURI }),
    getToken: async () => client.user.generateIdToken(),
    getUserMetadata: async () => client.user.getMetadata(),
  }
}

export const { AuthProvider, useAuth } = createAuth()
