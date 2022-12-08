import type { FindUserPuzzles } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import UserPuzzles from 'src/components/UserPuzzle/UserPuzzles'

export const QUERY = gql`
  query FindUserPuzzles {
    userPuzzles {
      id
      userId
      name
      slug
      explanation
      challenge
      solution
      imageUrl
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No userPuzzles yet. '}
      <Link
        to={routes.newUserPuzzle()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ userPuzzles }: CellSuccessProps<FindUserPuzzles>) => {
  return <UserPuzzles userPuzzles={userPuzzles} />
}
