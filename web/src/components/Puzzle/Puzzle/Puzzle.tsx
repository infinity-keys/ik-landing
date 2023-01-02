import { useRef } from 'react'

import clsx from 'clsx'
import type {
  DeletePuzzleMutationVariables,
  FindStepsByPuzzleId,
} from 'types/graphql'

import { Link, routes, navigate, NavLink, useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

const DELETE_PUZZLE_MUTATION = gql`
  mutation DeletePuzzleMutation($id: String!) {
    deletePuzzle(id: $id) {
      id
    }
  }
`

const MAKE_ATTEMPT_MUTATION = gql`
  mutation MakeAttemptMutation($stepId: String!, $data: JSON!) {
    makeAttempt(stepId: $stepId, data: $data) {
      id
    }
  }
`

interface Props {
  puzzle: NonNullable<FindStepsByPuzzleId['puzzle']>
}

const Puzzle = ({ puzzle }: Props) => {
  const [deletePuzzle] = useMutation(DELETE_PUZZLE_MUTATION, {
    onCompleted: () => {
      toast.success('Puzzle deleted')
      navigate(routes.puzzles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [makeAttempt] = useMutation(MAKE_ATTEMPT_MUTATION)

  const { slug, step: stepParam } = useParams()

  const onDeleteClick = (id: DeletePuzzleMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete puzzle ' + id + '?')) {
      deletePuzzle({ variables: { id } })
    }
  }

  const stepsRef = useRef([])
  stepsRef.current = []

  const addToRefs: (el) => void = (el) => {
    if (el && !stepsRef.current.includes(el)) {
      stepsRef.current.push(el)
    }
  }

  const handleMakeAttempt = (e, stepId, index, charCount) => {
    e.preventDefault()
    if (stepsRef.current[index].value.length !== charCount) {
      return
    }
    makeAttempt({
      variables: {
        stepId,
        data: { simpleTextSolution: stepsRef.current[index].value },
      },
    })

    stepsRef.current[index].value = ''
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Puzzle {puzzle.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{puzzle.id}</td>
            </tr>
            <tr>
              <th>Rewardable id</th>
              <td>{puzzle.rewardableId}</td>
            </tr>
            {puzzle.steps.map((step, index) => (
              <tr
                key={step.id}
                className={clsx({
                  'bg-red-400': step.stepSortWeight === parseInt(stepParam, 10),
                })}
              >
                <th>Step {step.stepSortWeight}: </th>
                <td>
                  <div>Load custom steps component here.</div>
                  <div>
                    <form
                      onSubmit={(e) =>
                        handleMakeAttempt(
                          e,
                          step.id,
                          index,
                          step.stepSimpleText.solutionCharCount
                        )
                      }
                    >
                      <input type="text" ref={addToRefs} />
                      <button type="submit">submit</button>
                    </form>
                  </div>
                  {/* {[...Array(step.stepSimpleText.solutionCharCount).keys()].map(
                    () => (
                      <div key="">
                        <input type="text" />
                      </div>
                    )
                  )} */}
                  <span>
                    Challenge: {step.challenge} | Step success message:{' '}
                    {step.successMessage} | Solution character count:{' '}
                    {step.stepSimpleText.solutionCharCount} |
                    <NavLink
                      activeClassName="step-active"
                      to={routes.puzzleStep({
                        slug,
                        step: step.stepSortWeight,
                      })}
                    >
                      Go to this step
                    </NavLink>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPuzzle({ id: puzzle.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(puzzle.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Puzzle
