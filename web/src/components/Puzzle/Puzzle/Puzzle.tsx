import clsx from 'clsx'
import type {
  DeletePuzzleMutationVariables,
  FindStepsByPuzzleId,
} from 'types/graphql'

import { Link, routes, navigate, NavLink, useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import StepCell from 'src/components/StepCell'

import {} from 'src/lib/formatters'

const DELETE_PUZZLE_MUTATION = gql`
  mutation DeletePuzzleMutation($id: String!) {
    deletePuzzle(id: $id) {
      id
    }
  }
`

interface Props {
  puzzle: NonNullable<FindStepsByPuzzleId['puzzle']>
}

// exclude nonrelevant data
// query with all minimum step data, and all the data for the current step
//

const Puzzle = ({ puzzle }: Props) => {
  const { slug, step: stepParam } = useParams()
  const stepIndex = (parseInt(stepParam) - 1).toString()

  const [deletePuzzle] = useMutation(DELETE_PUZZLE_MUTATION, {
    onCompleted: () => {
      toast.success('Puzzle deleted')
      navigate(routes.puzzles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeletePuzzleMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete puzzle ' + id + '?')) {
      deletePuzzle({ variables: { id } })
    }
  }

  // on solve, write cookie ik-solves, rewardable id and step for specific path
  const currentStepIndex =
    puzzle.steps.findLastIndex((step) => step.hasUserCompletedStep) + 1

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
            {!stepParam ? (
              puzzle.steps.map((step) => (
                <tr
                  key={step.id}
                  className={clsx({
                    'bg-red-400':
                      step.stepSortWeight === parseInt(stepParam, 10),
                  })}
                >
                  <th>
                    {step.hasUserCompletedStep && (
                      <b className="mr-2 text-green-500">&#10003;</b>
                    )}{' '}
                    Step {step.stepSortWeight}:{' '}
                  </th>
                  <td>
                    {/* {[...Array(step.stepSimpleText.solutionCharCount).keys()].map(
                    () => (
                      <div key="">
                        <input type="text" />
                      </div>
                    )
                  )} */}
                    <span>
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
              ))
            ) : (
              <StepCell id={puzzle.steps[stepIndex].id} />
            )}
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
