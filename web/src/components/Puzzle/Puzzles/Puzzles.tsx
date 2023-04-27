import type { DeletePuzzleMutationVariables, FindPuzzles } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Puzzle/PuzzlesCell'
import { truncate } from 'src/lib/formatters'

const DELETE_PUZZLE_MUTATION = gql`
  mutation DeletePuzzleMutation($id: String!) {
    deletePuzzle(id: $id) {
      id
    }
  }
`

const PuzzlesList = ({ puzzles }: FindPuzzles) => {
  const [deletePuzzle] = useMutation(DELETE_PUZZLE_MUTATION, {
    onCompleted: () => {
      toast.success('Puzzle deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeletePuzzleMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete puzzle ' + id + '?')) {
      deletePuzzle({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Rewardable id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {puzzles.map((puzzle) => (
            <tr key={puzzle.id}>
              <td>{truncate(puzzle.id)}</td>
              <td>{truncate(puzzle.rewardableId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.puzzle({ id: puzzle.id })}
                    title={'Show puzzle ' + puzzle.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPuzzle({ id: puzzle.id })}
                    title={'Edit puzzle ' + puzzle.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete puzzle ' + puzzle.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(puzzle.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PuzzlesList
