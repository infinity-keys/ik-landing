import { InstanceWithExtensions, SDKBase } from '@magic-sdk/provider'
import { Magic, MagicSDKExtensionsOption } from 'magic-sdk'

import { createAuthentication } from '@redwoodjs/auth'

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
const TEN_MINUTES = 10 * 60 * 1000

function createAuthImplementation(
  client: InstanceWithExtensions<SDKBase, MagicSDKExtensionsOption<string>>
) {
  let token: string | null
  let expireTime = 0

  return {
    type: 'magicLink',
    client,
    login: async ({ email }) =>
      await client.auth.loginWithMagicLink({
        email,
        showUI: true,
      }),
    logout: async () => {
      token = null
      expireTime = 0

      return await client.user.logout()
    },
    signup: async ({ email }) =>
      client.auth.loginWithMagicLink({ email, showUI: true }),
    getToken: async () => {
      if (!token || Date.now() > expireTime) {
        expireTime = Date.now() + TEN_MINUTES
        token = await client.user.getIdToken()
      }

      return token
    },
    getUserMetadata: async () =>
      (await client.user.isLoggedIn()) ? await client.user.getMetadata() : null,
  }
}

export const { AuthProvider, useAuth } = createAuth()
