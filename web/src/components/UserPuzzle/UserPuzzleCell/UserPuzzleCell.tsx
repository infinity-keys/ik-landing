import type { FindUserPuzzleById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import UserPuzzle from 'src/components/UserPuzzle/UserPuzzle'

export const QUERY = gql`
  query FindUserPuzzleById($id: String!) {
    userPuzzle: userPuzzle(id: $id) {
      id
      userId
      name
      slug
      explanation
      successMessage
      challenge
      solution
      imageUrl
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>UserPuzzle not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ userPuzzle }: CellSuccessProps<FindUserPuzzleById>) => {
  return <UserPuzzle userPuzzle={userPuzzle} />
}
