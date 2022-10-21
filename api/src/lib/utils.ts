import { IK_CLAIMS_NAMESPACE } from './constants'
import { makeUserToken } from './jwt'

export const generateUserDeleteJWT = async (userId: string, email?: string) => {
  return await makeUserToken(
    {
      claims: {
        [IK_CLAIMS_NAMESPACE]: { puzzles: [], email },
      },
    },
    userId
  )
}

export const generateUserDeleteUrl = async (userId: string, email?: string) => {
  const jwt = await generateUserDeleteJWT(userId, email)

  const url = new URL('/user/delete', IK_CLAIMS_NAMESPACE)
  url.searchParams.set('jwt', jwt)

  return url
}
