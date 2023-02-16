/**
 * Ensure a user's cookie brings over progress from v1, converts to v2, and handles
 * anon progress.
 */

import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { useState } from 'react'

// On login, reconcile v1, v2, anon cookies
const MUTATION_RECONCILE = gql`
  mutation ReconcileProgressQuery {
    reconcileProgress
  }
`

export default function useReconcileProgress() {
  const { getToken } = useAuth()
  const [cookieFetching, setCookieFetching] = useState(false)

  const [reconcilePuzzles, { data, error, loading }] = useMutation(
    MUTATION_RECONCILE,
    {
      onCompleted: async () => {
        setCookieFetching(true)
        // Now do fetch to progressCookies function to set local cookie with all
        // progress

        // /.redwood/functions/attempt vs /attempt
        const apiPath = `${
          global.RWJS_API_URL.includes('.redwood') ? window.location.origin : ''
        }${global.RWJS_API_URL}/progressCookies`
        const apiUrl = new URL(apiPath)
        // Get JWT from MagicLink
        const token = await getToken()
        // This sets progress cookie
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'auth-provider': 'magicLink',
            Authorization: `Bearer ${token}`,
          },
        })
        setCookieFetching(false)
      },
      onError: (error) => {},
    }
  )

  const progressLoading = loading || cookieFetching

  return { reconcilePuzzles, data, error, progressLoading }
}
