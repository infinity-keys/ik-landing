import { FormEvent, useState } from 'react'

import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import clsx from 'clsx'
import loRange from 'lodash/range'
import RICIBs from 'react-individual-character-input-boxes'
import { FindStepQuery } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { routes, navigate, useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import Button from 'src/components/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Markdown from 'src/components/Markdown/Markdown'
import Lock from 'src/svgs/Lock'

interface SimpleTextInputProps {
  count: number
  numberOfSteps: number
  step: FindStepQuery['step']
}

const MAKE_ATTEMPT_MUTATION = gql`
  mutation MakeAttemptMutation($stepId: String!, $data: JSON!) {
    makeAttempt(stepId: $stepId, data: $data) {
      success
    }
  }
`

const SimpleTextInput = ({
  count,
  step,
  numberOfSteps,
}: SimpleTextInputProps) => {
  const { slug, step: stepParam } = useParams()

  const [text, setText] = useState('')
  const [failMessage, setFailMessage] = useState('')

  const { getToken } = useAuth()

  // This will use useMemo, possibly
  const devSubmit = async () => {
    // localhost:8910 vs api.infinitykeys.io
    const apiBase = global.RWJS_API_URL.includes('.redwood')
      ? window.location.origin
      : global.RWJS_API_URL

    // /.redwood/functions/attempt vs /attempt
    const apiPath = global.RWJS_API_URL.includes('.redwood')
      ? global.RWJS_API_URL + '/attempt'
      : '/attempt'

    const apiUrl = new URL(apiPath, apiBase)

    apiUrl.searchParams.set('puzzle', slug)
    apiUrl.searchParams.set('step', stepParam)
    apiUrl.searchParams.set('stepId', step.id)

    const body = JSON.stringify({ attempt: '9000' })

    // Get JWT from MagicLink
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
    console.log(data)
  }

  const [makeAttempt, { loading }] = useMutation(MAKE_ATTEMPT_MUTATION, {
    onCompleted: (data) => {
      const nextStep = parseInt(stepParam) + 1

      if (data.makeAttempt.success) {
        if (nextStep > numberOfSteps) {
          navigate(routes.puzzleLanding({ slug }))
        } else {
          navigate(routes.puzzleStep({ slug, step: nextStep }))
        }
        return
      }
      setFailMessage(step.failMessage || "That's not it. Try again")
    },
  })

  const handleMakeAttempt = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text.length !== count) return
    setFailMessage('')

    makeAttempt({
      variables: {
        stepId: step.id,
        data: { simpleTextSolution: text },
      },
    })
  }

  return (
    <div>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="z-10 flex justify-center">
          <div>
            <div className="flex py-5">
              <div className="w-6">
                <Lock />
              </div>
              <p className="pt-2 pl-4 text-base font-bold">Solve Puzzle</p>
            </div>

            <form className="magic-input" onSubmit={handleMakeAttempt}>
              <RICIBs
                amount={count}
                handleOutputString={(t) => setText(t)}
                inputRegExp={/^\S*$/}
                inputProps={loRange(count).map(() => ({
                  className: 'ik-code-input',
                }))}
              />

              <div
                className={clsx(
                  'relative flex justify-center pt-6 text-gray-150',
                  failMessage ? 'opacity-1' : 'opacity-0'
                )}
                data-cy="fail_message_check"
              >
                <Markdown>
                  {failMessage ||
                    'Thats not it. Need help? [Join our discord](https://discord.gg/infinitykeys)'}
                </Markdown>
              </div>

              <div className="pt-8">
                <Button text="Do stuff" onClick={devSubmit} />
              </div>

              <div className="pt-8" data-cy="submit">
                <Button
                  text="Submit"
                  type="submit"
                  disabled={text.length !== count}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default SimpleTextInput
