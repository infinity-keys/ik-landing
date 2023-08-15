import { useEffect, useState } from 'react'

import clsx from 'clsx'
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
  const [inputValue, setInputValue] = useState('')
  const [displayValue, setDisplayValue] = useState('')

  // This will use useMemo, possibly
  const handleMakeAttempt = async (text: string) => {
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

    if (value.length === count) {
      handleMakeAttempt(value)
    }
  }

  // Creating a string that displays the current input and remaining asterisks
  useEffect(() => {
    setDisplayValue(inputValue + '*'.repeat(count - inputValue.length))
  }, [inputValue, count, setDisplayValue])

  return (
    <div>
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          <div className="flex flex-col items-center justify-center">
            <p className="pb-5 text-lg">Input Your Answer:</p>

            <div className="relative">
              <input
                className={clsx(
                  'border-whites rounded border-solid bg-transparent py-2 px-4 font-mono tracking-[.8em] text-transparent caret-white',
                  failedAttempt && !errorMessage
                    ? 'border-red-400'
                    : 'border-white'
                )}
                type="text"
                value={inputValue}
                maxLength={count}
                onChange={handleInputChange}
              />
              <div className="pointer-events-none absolute inset-0 flex items-center px-4 py-2 font-mono tracking-[.8em]">
                {displayValue}
              </div>
            </div>
          </div>

          {failedAttempt && !errorMessage && (
            <div
              className="relative flex justify-center pt-6 text-gray-150"
              data-cy="fail_message_check"
            >
              <Markdown>
                {step.failMessage ||
                  "That's not it. Need help? [Join our discord](https://discord.gg/infinitykeys)"}
              </Markdown>
            </div>
          )}

          {errorMessage && (
            <p className="text-sm italic text-gray-150">{errorMessage}</p>
          )}
        </>
      )}
    </div>
  )
}

export default SimpleTextInput
