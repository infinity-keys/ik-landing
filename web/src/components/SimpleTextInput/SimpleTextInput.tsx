import { FormEvent, useEffect, useState } from 'react'

// import loRange from 'lodash/range'
// import RICIBs from 'react-individual-character-input-boxes'
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
  const [text] = useState('')

  const passcodeLength = 8 // Set the length of the passcode here
  const [inputValue, setInputValue] = useState('')
  const [isComplete] = useState(false)
  const [displayValue, setDisplayValue] = useState('')
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
  }

  // const handleSubmit = (value: string) => {
  //   setIsComplete(true)
  //   // Here, you can handle the submission logic
  //   console.log('Passcode submitted:', value)
  // }

  // Creating a string that displays the current input and remaining asterisks
  useEffect(() => {
    setDisplayValue(inputValue + '*'.repeat(passcodeLength - inputValue.length))
  }, [inputValue, passcodeLength, setDisplayValue])
  // const displayValue =
  //   inputValue + '*'.repeat(passcodeLength - inputValue.length)

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
                  className="absolute rounded
                   border-solid border-white bg-transparent p-0 text-start font-mono text-brand-gray-primary caret-white focus:border-none"
                  type="text"
                  value={inputValue}
                  maxLength={passcodeLength}
                  onChange={handleInputChange}
                  disabled={isComplete}
                />
                <div className="pointer-events-none absolute inset-0 text-start font-mono tracking-[.5em]">
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
