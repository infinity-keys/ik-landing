import type {
  DeleteRewardableMutationVariables,
  FindRewardablePuzzleBySlug,
} from 'types/graphql'

import {
  Link,
  routes,
  navigate,
  useParams,
  // useParams
} from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

// import PuzzleStepsCell from 'src/components/Puzzle/PuzzleCell'
import StepCell from 'src/components/StepCell'

const DELETE_REWARDABLE_MUTATION = gql`
  mutation DeleteRewardableMutation($id: String!) {
    deleteRewardable(id: $id) {
      id
    }
  }
`

interface Props {
  rewardable: NonNullable<FindRewardablePuzzleBySlug['puzzle']>
}

const Rewardable = ({ rewardable }: Props) => {
  const { step: stepParam } = useParams()
  const stepIndex = stepParam && parseInt(stepParam, 10) - 1

  const [deleteRewardable] = useMutation(DELETE_REWARDABLE_MUTATION, {
    onCompleted: () => {
      toast.success('Rewardable deleted')
      navigate(routes.puzzles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteRewardableMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete rewardable ' + id + '?')) {
      deleteRewardable({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Rewardable {rewardable.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{rewardable.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{rewardable.name}</td>
            </tr>
            <tr>
              <th>Slug</th>
              <td>{rewardable.slug}</td>
            </tr>
            <tr>
              <th>Explanation</th>
              <td>{rewardable.explanation}</td>
            </tr>
            <tr>
              <th>Success message</th>
              <td>{rewardable.successMessage}</td>
            </tr>

            <tr>
              <th>Steps from cell</th>
              <td>
                <StepCell
                  stepId={stepParam && rewardable.puzzle.steps[stepIndex].id}
                  puzzleId={rewardable.puzzle.id}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPuzzle({ id: rewardable.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(rewardable.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Rewardable
