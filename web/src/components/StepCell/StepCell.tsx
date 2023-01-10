import { useRef } from 'react'

import type { FindStepQuery, FindStepQueryVariables } from 'types/graphql'

import { routes, navigate, useParams, Link } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

export const QUERY = gql`
  query FindStepQuery($stepId: String, $puzzleId: String!) {
    puzzle(id: $puzzleId) {
      steps {
        id
        stepSortWeight
        hasUserCompletedStep
      }
    }
    step: optionalStep(id: $stepId) {
      id
      challenge
      failMessage
      successMessage
      type
      stepSimpleText {
        solutionCharCount
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
  puzzle,
}: CellSuccessProps<FindStepQuery, FindStepQueryVariables>) => {
  const { slug, step: stepParam } = useParams()

  const [makeAttempt] = useMutation(MAKE_ATTEMPT_MUTATION, {
    onCompleted: (data) => {
      const nextStep = parseInt(stepParam) + 1

      if (data.makeAttempt.success) {
        if (nextStep > puzzle.steps.length) {
          navigate(routes.puzzleLanding({ slug }))
        } else {
          navigate(routes.puzzleStep({ slug, step: nextStep }))
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
      {step && (
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
      {puzzle.steps.map((s) => (
        <Link
          to={routes.puzzleStep({
            slug,
            step: s.stepSortWeight,
          })}
          key={s.id}
          className={s.hasUserCompletedStep && 'text-green-500'}
        >
          {s.stepSortWeight}
        </Link>
      ))}
    </div>
  )
}
