import { PropsWithChildren } from 'react'

import { AuthProvider as RedwoodAuthProvider } from 'src/auth'
import { getErrorResponse } from 'src/utils/helpers'

export const logIn = async (attributes) => {
  try {
    /* eslint-disable-next-line no-undef */
    const { type, code, state } = attributes
    // eslint-disable-next-line no-undef
    const response = await fetch(`${global.RWJS_API_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, state, type, method: 'login' }),
    })
    return await response.json()
  } catch (e) {
    /* eslint-disable-next-line no-console */
    const errorMessage = getErrorResponse(`${e}.`, 'login').error.message
    console.error(errorMessage)
  }
}

const AuthProvider = (props: PropsWithChildren) => {
  return <RedwoodAuthProvider>{props.children}</RedwoodAuthProvider>
}

export default AuthProvider
