import { useState } from 'react'

import {
  MakeAttemptMutation,
  MakeAttemptMutationVariables,
} from 'types/graphql'

import { useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { redirectUser } from 'src/lib/attempt/makeAttempt'

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
  const { isAuthenticated } = useAuth()
  const { slug, step: stepParam } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [failedAttempt, setFailedAttempt] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [createAttempt, { loading }] = useMutation<
    MakeAttemptMutation,
    MakeAttemptMutationVariables
  >(MAKE_ATTEMPT, {
    onError: ({ message: err }) => {
      err && setErrorMessage(err)
    },
  })

  const makeAttempt = async ({
    stepId,
    reqBody,
    redirectOnSuccess = true,
  }: {
    stepId: string
    reqBody: string | object
    redirectOnSuccess?: boolean
  }) => {
    if (!isAuthenticated) {
      throw new Error('Must be logged in to play.')
    }

    setFailedAttempt(false)
    setIsLoading(true)
    setErrorMessage('')

    let responseData

    try {
      // Authenticated users hit the service directly
      if (isAuthenticated) {
        const { data } = await createAttempt({
          variables: { stepId, data: reqBody },
        })
        if (!data) throw new Error('Error making attempt.')
        responseData = data.makeAttempt
      }
    } catch (e) {
      console.error(e)
      return { success: false, message: 'Error making attempt.' }
    }

    setIsLoading(false)

    // They made a successful attempt
    if (responseData.success) {
      // We automatically forward them to the next step or the puzzle landing
      if (redirectOnSuccess) {
        redirectUser({
          finalStep: responseData.finalStep,
          stepParam,
          slug,
        })
      }
      return responseData
    } else {
      // Incorrect attempt, show fail or error message
      setFailedAttempt(true)
      responseData.message && setErrorMessage(responseData.message)
      return responseData
    }
  }

  return {
    loading: isLoading || loading,
    failedAttempt,
    errorMessage,
    makeAttempt,
  }
}

export default useMakeAttempt
