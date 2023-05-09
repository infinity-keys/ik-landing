import { PropsWithChildren } from 'react'

import { AuthProvider as RedwoodAuthProvider } from 'src/auth'
import { getErrorResponse } from 'src/utils/helpers'

export const logIn = async ({
  type,
  code,
  state,
}: {
  type?: string
  code?: string
  state?: string
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
    const errorMessage = getErrorResponse(`${e}.`, 'login').error.message
    console.error(errorMessage)
  }
}

const AuthProvider = (props: PropsWithChildren) => {
  return <RedwoodAuthProvider>{props.children}</RedwoodAuthProvider>
}

export default AuthProvider
