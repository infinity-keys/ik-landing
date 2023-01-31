import { useState } from 'react'

import { StepType } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes, useParams } from '@redwoodjs/router'

interface SendAttemptProps {
  stepId: string
  stepType: StepType
  numberOfSteps: number
  puzzleId: string
  reqBody: string | object
  redirectOnSuccess?: boolean
}

const useMakeAttempt = () => {
  const { getToken } = useAuth()
  const { slug, step: stepParam } = useParams()

  const [loading, setLoading] = useState(false)
  const [failedAttempt, setFailedAttempt] = useState(false)

  const makeAttempt = async ({
    stepId,
    stepType,
    numberOfSteps,
    puzzleId,
    reqBody,
    redirectOnSuccess = true,
  }: SendAttemptProps) => {
    setFailedAttempt(false)
    setLoading(true)

    const apiPath = `${
      global.RWJS_API_URL.includes('.redwood') ? window.location.origin : ''
    }${global.RWJS_API_URL}/attempt`

    const apiUrl = new URL(apiPath)

    apiUrl.searchParams.set('stepId', stepId)
    apiUrl.searchParams.set('stepParam', stepParam)
    apiUrl.searchParams.set('puzzleId', puzzleId)
    apiUrl.searchParams.set('stepType', stepType)

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

      setLoading(false)
      if (response.ok) {
        const data = await response.json()

        // if user guesses correctly, move them to next step
        // or puzzle landing if it is the last step
        if (data.success) {
          if (redirectOnSuccess) {
            if (parseInt(stepParam, 10) + 1 > numberOfSteps) {
              return navigate(routes.puzzleLanding({ slug }))
            } else {
              return navigate(
                routes.puzzleStep({ slug, step: parseInt(stepParam, 10) + 1 })
              )
            }
          }
          return data
        }

        setFailedAttempt(true)
      }
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  return {
    loading,
    setLoading,
    failedAttempt,
    setFailedAttempt,
    makeAttempt,
  }
}

export default useMakeAttempt
