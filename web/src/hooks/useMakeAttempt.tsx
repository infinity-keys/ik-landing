import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes, useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import {
  MakeAttemptMutation,
  MakeAttemptMutationVariables,
} from 'types/graphql'

type SendAttemptProps = {
  stepId: string
  puzzleId: string
  reqBody: string | object
  redirectOnSuccess?: boolean
  isAnon?: boolean
}

const MAKE_ATTEMPT = gql`
  mutation MakeAttemptMutation($stepId: String!, $data: JSON!) {
    makeAttempt(stepId: $stepId, data: $data) {
      success
      finalStep
      message
    }
  }
`

const useMakeAttempt = () => {
  const { getToken, isAuthenticated } = useAuth()
  const { slug, step: stepParam } = useParams()

  const [failedAttempt, setFailedAttempt] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isAnonPuzzle, setIsAnonPuzzle] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(true)

  const [createAttempt, { data, loading }] = useMutation<
    MakeAttemptMutation,
    MakeAttemptMutationVariables
  >(MAKE_ATTEMPT, {
    onError: ({ message: err }) => {
      err && setErrorMessage(err)
    },
    onCompleted: () => {
      const { success, finalStep, message } = data.makeAttempt

      if (success) {
        if (shouldRedirect) {
          if (finalStep) {
            return isAnonPuzzle
              ? navigate(routes.anonPuzzleLanding({ slug }))
              : navigate(routes.puzzleLanding({ slug }))
          } else {
            return isAnonPuzzle
              ? navigate(
                  routes.anonPuzzleStep({
                    slug,
                    step: parseInt(stepParam, 10) + 1,
                  })
                )
              : navigate(
                  routes.puzzleStep({
                    slug,
                    step: parseInt(stepParam, 10) + 1,
                  })
                )
          }
        }
        return data
      } else {
        setFailedAttempt(true)
        message && setErrorMessage(message)
      }
    },
  })

  const makeAttempt = async ({
    stepId,
    puzzleId,
    reqBody,
    redirectOnSuccess = true,
    isAnon = false,
  }: SendAttemptProps) => {
    setFailedAttempt(false)
    setIsAnonPuzzle(isAnon)
    setShouldRedirect(redirectOnSuccess)

    // authenticated users hit the service directly
    createAttempt({ variables: { stepId, data: reqBody } })

    // unauthenticated users hit the function to get cookies
  }

  return {
    loading,
    failedAttempt,
    errorMessage,
    makeAttempt,
  }
}

export default useMakeAttempt
