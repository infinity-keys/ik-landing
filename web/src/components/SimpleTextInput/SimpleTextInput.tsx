import { useCallback, useEffect, useState, useRef } from 'react'

import clsx from 'clsx'
import sample from 'lodash/sample'
import { FindStepBySlugQuery } from 'types/graphql'

import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import useMakeAttempt from 'src/hooks/useMakeAttempt'

const FAIL_MESSAGES = [
  "That's not it chief...",
  "You're a few pixels away from greatness! Try again!",
  'Close but no banana! Give it another peel!',
  'One more shot - victory dance awaits!',
  "You're the master of almost! Retry like a champ!",
  'A little more magic dust needed - go for it!',
  'Keep going! Success hugs are waiting!',
]

const DEFAULT_TEXT_SIZE = 16
const DEFAULT_CHAR_LIMIT = 10
const LARGE_TEXT_CHAR_LIMIT = 6
const LETTER_SPACING_MULTIPLIER = 2.2

const SimpleTextInput = ({
  count,
  step,
  onSuccess,
}: {
  count: number
  step: FindStepBySlugQuery['step']
  onSuccess?: () => void
}) => {
  const { loading, failedAttempt, makeAttempt, errorMessage } = useMakeAttempt()
  const [inputValue, setInputValue] = useState('')
  const [displayValue, setDisplayValue] = useState('')
  const [inputTextLeft, setInputTextLeft] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleMakeAttempt = useCallback(
    async (text: string) => {
      const data = await makeAttempt({
        stepId: step.id,
        redirectOnSuccess: false,
        reqBody: {
          type: 'simple-text',
          simpleTextSolution: text,
        },
      })

      if (data?.success && onSuccess) {
        onSuccess()
      }
    },
    [makeAttempt, onSuccess, step.id]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInputValue(value)

      if (value.length === count) {
        handleMakeAttempt(value)
      }
    },
    [setInputValue, handleMakeAttempt, count]
  )

  useEffect(() => {
    if (inputRef.current) {
      const size = window
        .getComputedStyle(inputRef.current, null)
        .getPropertyValue('font-size')

      // Is the user's text size larger than default?
      const largeText = parseInt(size.split('px')[0], 10) > DEFAULT_TEXT_SIZE

      // If a password is longer than 10 characters (or 6 for larger text sizes),
      // it will overflow the container and needS to be left aligned for proper
      // scrolling.
      const leftAlign =
        count > DEFAULT_CHAR_LIMIT ||
        (largeText && count > LARGE_TEXT_CHAR_LIMIT)
      setInputTextLeft(leftAlign)
    }
  }, [count, inputTextLeft, setInputTextLeft])

  // Creating a string that displays the current input and remaining asterisks
  useEffect(() => {
    setDisplayValue(`${inputValue}${'*'.repeat(count - inputValue.length)}`)
  }, [inputValue, count, setDisplayValue])

  return (
    <div>
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          <div className="flex flex-col items-center justify-center">
            <p className="pb-5 text-lg">Input Your Answer:</p>
            <div
              className={clsx(
                'flex w-full max-w-[260px] cursor-text overflow-x-scroll rounded border-2 border-solid px-4 py-2',
                inputTextLeft ? 'justify-start' : 'justify-center',
                failedAttempt && !errorMessage
                  ? 'border-red-400'
                  : 'border-stone-50'
              )}
              tabIndex={0}
              role="button"
              onClick={() => inputRef.current?.focus()}
              onFocus={(e) => {
                if (e.relatedTarget !== inputRef.current) {
                  inputRef.current?.focus()
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  inputRef.current?.focus()
                }
              }}
            >
              <div className="relative">
                <input
                  className={clsx(
                    'border-none bg-transparent p-0 font-mono tracking-[.8em] text-transparent caret-white focus:!border-none focus:!outline-none focus:ring-0'
                  )}
                  type="text"
                  ref={inputRef}
                  maxLength={count}
                  size={count * LETTER_SPACING_MULTIPLIER}
                  value={inputValue}
                  onChange={handleInputChange}
                  onClick={(e) => e.stopPropagation()}
                  onFocus={(e) => e.stopPropagation()}
                />
                <div className="pointer-events-none absolute inset-0 flex items-center font-mono tracking-[.8em]">
                  {displayValue}
                </div>
              </div>
            </div>
          </div>

          {failedAttempt && !errorMessage && inputValue.length === count && (
            <div
              className="relative flex justify-center pt-6 text-gray-150"
              data-cy="fail_message_check"
            >
              <p>{sample(FAIL_MESSAGES)}</p>
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
