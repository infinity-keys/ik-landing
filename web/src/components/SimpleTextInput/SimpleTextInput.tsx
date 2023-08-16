import { FormEvent, useEffect, useState } from 'react'

import { FindStepBySlugQuery } from 'types/graphql'

import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Markdown from 'src/components/Markdown/Markdown'
import useMakeAttempt from 'src/hooks/useMakeAttempt'

interface SimpleTextInputProps {
  count: number
  step: NonNullable<FindStepBySlugQuery['stepBySlug']>['step']
  puzzleId: string
  onSuccess?: () => void
}

const SimpleTextInput = ({
  count,
  step,
  puzzleId,
  onSuccess,
}: SimpleTextInputProps) => {
  const { loading, failedAttempt, makeAttempt, errorMessage } = useMakeAttempt()
  const [text] = useState('')

  const passcodeLength = 8 // Set the length of the passcode here
  const [inputValue, setInputValue] = useState('')
  const [isComplete] = useState(false)
  const [displayValue, setDisplayValue] = useState('')
  // This will use useMemo, possibly
  const handleMakeAttempt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text.length !== count) return

    const data = await makeAttempt({
      stepId: step.id,
      puzzleId,
      redirectOnSuccess: false,
      reqBody: {
        type: 'simple-text',
        simpleTextSolution: text,
      },
    })

    if (data?.success && onSuccess) {
      onSuccess()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
  }

  // Creating a string that displays the current input and remaining asterisks
  useEffect(() => {
    setDisplayValue(inputValue + '*'.repeat(passcodeLength - inputValue.length))
  }, [inputValue, passcodeLength, setDisplayValue])

  return (
    <div>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="z-10 flex justify-center">
          <div>
            <div className="flex py-5">
              <p className="pt-2 pl-4 text-lg">Input Your Answer:</p>
            </div>

            <form className="" onSubmit={handleMakeAttempt}>
              <div className="relative">
                <input
                  className="
                   rounded border-solid border-white bg-transparent py-2 px-4 font-mono tracking-[.8em] text-transparent caret-white focus:border-none"
                  type="text"
                  value={inputValue}
                  maxLength={passcodeLength}
                  onChange={handleInputChange}
                  disabled={isComplete}
                />
                <div className=" pointer-events-none absolute inset-0 flex items-center px-4 py-2 font-mono tracking-[.8em]">
                  {displayValue}
                </div>
              </div>

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
