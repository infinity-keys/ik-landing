import { FormEvent, useState } from 'react'

import clsx from 'clsx'
import loRange from 'lodash/range'
import RICIBs from 'react-individual-character-input-boxes'
import { FindStepQuery } from 'types/graphql'

import Button from 'src/components/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Markdown from 'src/components/Markdown/Markdown'
import useMakeAttempt from 'src/hooks/useMakeAttempt'
import Lock from 'src/svgs/Lock'

interface SimpleTextInputProps {
  count: number
  step: FindStepQuery['step']
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
      stepType: step.type,
      puzzleId,
      reqBody: text,
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
                  failedAttempt && !errorMessage ? 'opacity-1' : 'opacity-0'
                )}
                data-cy="fail_message_check"
              >
                <Markdown>
                  {step.failMessage ||
                    'Thats not it. Need help? [Join our discord](https://discord.gg/infinitykeys)'}
                </Markdown>
              </div>

              {errorMessage && <p className="">{errorMessage}</p>}

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
