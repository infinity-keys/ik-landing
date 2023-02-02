import { FormEvent, useState } from 'react'

import clsx from 'clsx'
import loRange from 'lodash/range'
import RICIBs from 'react-individual-character-input-boxes'
import { FindStepQuery } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes, useParams } from '@redwoodjs/router'

import Button from 'src/components/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Markdown from 'src/components/Markdown/Markdown'
import Lock from 'src/svgs/Lock'

interface SimpleTextInputProps {
  count: number
  step: FindStepQuery['step']
  puzzleId: string
}

const SimpleTextInput = ({ count, step, puzzleId }: SimpleTextInputProps) => {
  const { slug, step: stepParam } = useParams()
  const { getToken } = useAuth()

  const [loading, setLoading] = useState(false)
  const [failedAttempt, setFailedAttempt] = useState(false)
  const [text, setText] = useState('')

  // This will use useMemo, possibly
  const handleMakeAttempt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text.length !== count) return
    setFailedAttempt(false)
    setLoading(true)

    // /.redwood/functions/attempt vs /attempt
    const apiPath = `${
      global.RWJS_API_URL.includes('.redwood') ? window.location.origin : ''
    }${global.RWJS_API_URL}/attempt`

    const apiUrl = new URL(apiPath)

    apiUrl.searchParams.set('puzzleId', puzzleId)
    apiUrl.searchParams.set('stepParam', stepParam)
    apiUrl.searchParams.set('stepId', step.id)

    const body = JSON.stringify({ attempt: text })
    setText('')

    try {
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
      setLoading(false)

      if (response.ok) {
        const { success, finalStep } = await response.json()

        // if user guesses correctly, move them to next step
        // or puzzle landing if it is the last step
        if (success) {
          if (finalStep) {
            return navigate(routes.puzzleLanding({ slug }))
          } else {
            return navigate(
              routes.puzzleStep({ slug, step: parseInt(stepParam, 10) + 1 })
            )
          }
        }
        setFailedAttempt(true)
      }
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
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
                  failedAttempt ? 'opacity-1' : 'opacity-0'
                )}
                data-cy="fail_message_check"
              >
                <Markdown>
                  {step.failMessage ||
                    'Thats not it. Need help? [Join our discord](https://discord.gg/infinitykeys)'}
                </Markdown>
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
