import { useRef } from 'react'

import type { FindStepQuery, FindStepQueryVariables } from 'types/graphql'

import { routes, navigate, useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

export const QUERY = gql`
  query FindStepQuery($id: String!) {
    step: step(id: $id) {
      id
      challenge
      failMessage
      successMessage
      type
      stepSimpleText {
        solutionCharCount
      }
      puzzle {
        steps {
          id
        }
      }
    }
  }
`

const MAKE_ATTEMPT_MUTATION = gql`
  mutation MakeAttemptMutation($stepId: String!, $data: JSON!) {
    makeAttempt(stepId: $stepId, data: $data) {
      success
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindStepQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  step,
}: CellSuccessProps<FindStepQuery, FindStepQueryVariables>) => {
  const { slug, step: stepParam } = useParams()

  const [makeAttempt] = useMutation(MAKE_ATTEMPT_MUTATION, {
    onCompleted: (data) => {
      if (data.makeAttempt.success) {
        if (parseInt(stepParam) + 1 >= step.puzzle.steps.length) {
          navigate(routes.puzzleLanding({ slug }))
        } else {
          navigate(routes.puzzleStep({ slug, step: parseInt(stepParam) + 1 }))
        }
        return toast.success('Unlocked')
      }
      toast.error('Wrong')
    },
  })

  const inputRef = useRef(null)

  const handleMakeAttempt = (e, stepId, charCount) => {
    e.preventDefault()
    if (inputRef.current.value.length !== charCount) {
      return
    }
    makeAttempt({
      variables: {
        stepId,
        data: { simpleTextSolution: inputRef.current.value },
      },
    })

    inputRef.current.value = ''
  }

  return (
    <div>
      {step.type === 'SIMPLE_TEXT' && (
        <form
          onSubmit={(e) =>
            handleMakeAttempt(e, step.id, step.stepSimpleText.solutionCharCount)
          }
        >
          <input type="text" ref={inputRef} />
          <p>Char count: {step.stepSimpleText.solutionCharCount}</p>
          <button type="submit">submit</button>
        </form>
      )}
    </div>
  )
}
