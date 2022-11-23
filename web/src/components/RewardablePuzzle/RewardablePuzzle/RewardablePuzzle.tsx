import type {
  DeleteRewardableMutationVariables,
  FindRewardablePuzzleBySlug,
} from 'types/graphql'

import { Link, routes, navigate, useMatch, NavLink } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, formatEnum, timeTag } from 'src/lib/formatters'

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
  const [deleteRewardable] = useMutation(DELETE_REWARDABLE_MUTATION, {
    onCompleted: () => {
      toast.success('Rewardable deleted')
      navigate(routes.puzzles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const matchInfo = useMatch('step')

  console.log(matchInfo)

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
              <th>Created at</th>
              <td>{timeTag(rewardable.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(rewardable.updatedAt)}</td>
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
              <th>List publicly</th>
              <td>{checkboxInputTag(rewardable.listPublicly)}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{formatEnum(rewardable.type)}</td>
            </tr>

            {rewardable.puzzle.steps.map((step) => (
              <tr key={step.id}>
                <th>Step {step.stepSortWeight}: </th>
                <td>
                  <div>Load custom steps component here.</div>
                  <span>
                    Challenge: {step.challenge} | Step success message:{' '}
                    {step.successMessage} | Solution character count:{' '}
                    {step.stepSimpleText.solutionCharCount} |
                    <NavLink
                      activeClassName="step-active"
                      to={routes.puzzleStep({
                        slug: 'firstgate',
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
