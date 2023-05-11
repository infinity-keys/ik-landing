import { PropsWithChildren } from 'react'

import { AuthProviderType } from '@infinity-keys/core'

import { AuthProvider as RedwoodAuthProvider } from 'src/auth'

export const logIn = async ({
  type,
  code,
  state,
}: {
  type: AuthProviderType | null
  code: string | null
  state: string | null
}) => {
  try {
    if (!code || !state || !type)
      throw new Error('logIn() code, type, or state not provided.')

    const response = await fetch(`${global.RWJS_API_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, state, type, method: 'login' }),
    })
    return await response.json()
  } catch (e) {
    console.error('Error in web auth logIn', e)
  }
}

const AuthProvider = (props: PropsWithChildren) => {
  return <RedwoodAuthProvider>{props.children}</RedwoodAuthProvider>
}

export default AuthProvider
