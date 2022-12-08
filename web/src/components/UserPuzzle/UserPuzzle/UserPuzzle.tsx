
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {  } from 'src/lib/formatters'

import type { DeleteUserPuzzleMutationVariables, FindUserPuzzleById } from 'types/graphql'

const DELETE_USER_PUZZLE_MUTATION = gql`
  mutation DeleteUserPuzzleMutation($id: String!) {
    deleteUserPuzzle(id: $id) {
      id
    }
  }
`

interface Props {
  userPuzzle: NonNullable<FindUserPuzzleById['userPuzzle']>
}

const UserPuzzle = ({ userPuzzle }: Props) => {
  const [deleteUserPuzzle] = useMutation(DELETE_USER_PUZZLE_MUTATION, {
    onCompleted: () => {
      toast.success('UserPuzzle deleted')
      navigate(routes.userPuzzles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteUserPuzzleMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete userPuzzle ' + id + '?')) {
      deleteUserPuzzle({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            UserPuzzle {userPuzzle.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{userPuzzle.id}</td>
            </tr><tr>
              <th>User id</th>
              <td>{userPuzzle.userId}</td>
            </tr><tr>
              <th>Name</th>
              <td>{userPuzzle.name}</td>
            </tr><tr>
              <th>Slug</th>
              <td>{userPuzzle.slug}</td>
            </tr><tr>
              <th>Explanation</th>
              <td>{userPuzzle.explanation}</td>
            </tr><tr>
              <th>Challenge</th>
              <td>{userPuzzle.challenge}</td>
            </tr><tr>
              <th>Solution</th>
              <td>{userPuzzle.solution}</td>
            </tr><tr>
              <th>Image url</th>
              <td>{userPuzzle.imageUrl}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editUserPuzzle({ id: userPuzzle.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(userPuzzle.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default UserPuzzle
