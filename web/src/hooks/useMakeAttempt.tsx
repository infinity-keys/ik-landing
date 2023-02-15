import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes, useParams } from '@redwoodjs/router'

type SendAttemptProps = {
  stepId: string
  puzzleId: string
  reqBody: string | object
  redirectOnSuccess?: boolean
}

const useMakeAttempt = () => {
  const { getToken } = useAuth()
  const { slug, step: stepParam } = useParams()

  const [loading, setLoading] = useState(false)
  const [failedAttempt, setFailedAttempt] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const makeAttempt = async ({
    stepId,
    puzzleId,
    reqBody,
    redirectOnSuccess = true,
  }: SendAttemptProps) => {
    setFailedAttempt(false)
    setLoading(true)

    const apiUrl = new URL(
      `${global.RWJS_API_URL}/attempt`,
      window.location.origin
    )

    apiUrl.searchParams.set('stepId', stepId)
    apiUrl.searchParams.set('stepParam', stepParam)
    apiUrl.searchParams.set('puzzleId', puzzleId)

    const body = JSON.stringify({ attempt: reqBody })

    try {
      const token = await getToken()
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'auth-provider': 'magicLink',
          Authorization: `Bearer ${token}`,
        },
        body,
      })
      const data = await response.json()
      const { success, finalStep, message } = data

      setLoading(false)
      if (response.ok) {
        // if user guesses correctly, move them to next step
        // or puzzle landing if it is the last step
        if (success) {
          if (redirectOnSuccess) {
            if (finalStep) {
              return navigate(routes.puzzleLanding({ slug }))
            } else {
              return navigate(
                routes.puzzleStep({ slug, step: parseInt(stepParam, 10) + 1 })
              )
            }
          }
          return data
        }
      }
      setFailedAttempt(true)
      message && setErrorMessage(message)
      return data
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  return {
    loading,
    failedAttempt,
    errorMessage,
    makeAttempt,
  }
}

export default useMakeAttempt
