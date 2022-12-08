import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/UserPuzzle/UserPuzzlesCell'
import { truncate } from 'src/lib/formatters'

import type { DeleteUserPuzzleMutationVariables, FindUserPuzzles } from 'types/graphql'

const DELETE_USER_PUZZLE_MUTATION = gql`
  mutation DeleteUserPuzzleMutation($id: String!) {
    deleteUserPuzzle(id: $id) {
      id
    }
  }
`

const UserPuzzlesList = ({ userPuzzles }: FindUserPuzzles) => {
  const [deleteUserPuzzle] = useMutation(DELETE_USER_PUZZLE_MUTATION, {
    onCompleted: () => {
      toast.success('UserPuzzle deleted')
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

  const onDeleteClick = (id: DeleteUserPuzzleMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete userPuzzle ' + id + '?')) {
      deleteUserPuzzle({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Explanation</th>
            <th>Challenge</th>
            <th>Solution</th>
            <th>Image url</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {userPuzzles.map((userPuzzle) => (
            <tr key={userPuzzle.id}>
              <td>{truncate(userPuzzle.id)}</td>
              <td>{truncate(userPuzzle.userId)}</td>
              <td>{truncate(userPuzzle.name)}</td>
              <td>{truncate(userPuzzle.slug)}</td>
              <td>{truncate(userPuzzle.explanation)}</td>
              <td>{truncate(userPuzzle.challenge)}</td>
              <td>{truncate(userPuzzle.solution)}</td>
              <td>{truncate(userPuzzle.imageUrl)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.userPuzzle({ id: userPuzzle.id })}
                    title={'Show userPuzzle ' + userPuzzle.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editUserPuzzle({ id: userPuzzle.id })}
                    title={'Edit userPuzzle ' + userPuzzle.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete userPuzzle ' + userPuzzle.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(userPuzzle.id)}
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

export default UserPuzzlesList
