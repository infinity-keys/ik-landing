import { FormEvent, useState } from 'react'

import clsx from 'clsx'
import loRange from 'lodash/range'
import RICIBs from 'react-individual-character-input-boxes'
import { FindStepQuery } from 'types/graphql'

import { routes, navigate, useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import Button from 'src/components/Button'

import LoadingIcon from '../LoadingIcon/LoadingIcon'

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
        <form onSubmit={handleMakeAttempt}>
          <RICIBs
            amount={count}
            handleOutputString={(t) => setText(t)}
            inputRegExp={/^\S*$/}
            inputProps={loRange(count).map(() => ({
              className: 'ik-code-input',
            }))}
          />

          <div className="pt-8">
            <Button
              text="Submit"
              type="submit"
              disabled={text.length !== count}
            />
          </div>
        </form>
      )}

      <div className="relative flex justify-center pt-6">
        <p
          className={clsx(
            'absolute italic text-gray-200',
            failMessage ? 'opacity-1' : 'opacity-0'
          )}
        >
          {failMessage}
        </p>
      </div>
    </div>
  )
}

export default SimpleTextInput
