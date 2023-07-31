import { FormEvent, useState } from 'react'

import loRange from 'lodash/range'
import RICIBs from 'react-individual-character-input-boxes'
import { FindStepBySlugQuery } from 'types/graphql'

import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Markdown from 'src/components/Markdown/Markdown'
import useMakeAttempt from 'src/hooks/useMakeAttempt'

interface SimpleTextInputProps {
  count: number
  step: NonNullable<FindStepBySlugQuery['stepBySlug']>['step']
  puzzleId: string
}

const SimpleTextInput = ({ count, step, puzzleId }: SimpleTextInputProps) => {
  const { loading, failedAttempt, makeAttempt, errorMessage } = useMakeAttempt()
  const [text, setText] = useState('')

  // This will use useMemo, possibly
  const handleMakeAttempt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text.length !== count) return

    await makeAttempt({
      stepId: step.id,
      puzzleId,
      reqBody: {
        type: 'simple-text',
        simpleTextSolution: text,
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
              <p className="pt-2 pl-4 text-base font-bold">
                Input Your Answer:
              </p>
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

              {failedAttempt && !errorMessage && (
                <div
                  className={'relative flex justify-center pt-6 text-gray-150'}
                  data-cy="fail_message_check"
                >
                  <Markdown>
                    {step.failMessage ||
                      "That's not it. Need help? [Join our discord](https://discord.gg/infinitykeys)"}
                  </Markdown>
                </div>
              )}

              {errorMessage && <p className="">{errorMessage}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default SimpleTextInput
