/**
 * Ensure a user's cookie brings over progress from v1, converts to v2, and handles
 * anon progress.
 */

import { useMutation } from '@redwoodjs/web'

// On login, reconcile v1, v2, anon cookies
const MUTATION_RECONCILE = gql`
  mutation ReconcileProgressQuery {
    reconcileProgress
  }
`

export default function useReconcileProgress() {
  const [reconcilePuzzles, { data, error, loading }] =
    useMutation(MUTATION_RECONCILE)

  const progressLoading = loading

  return { reconcilePuzzles, data, error, progressLoading }
}
