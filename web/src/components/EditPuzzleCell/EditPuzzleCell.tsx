import type {
  FindEditPuzzleQuery,
  FindEditPuzzleQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PuzzleForm from 'src/components/PuzzleForm/PuzzleForm'

export const QUERY = gql`
  query FindEditPuzzleQuery($slug: String!) {
    rewardable: rewardableBySlugWithOrg(slug: $slug, type: PUZZLE) {
      name
      slug
      successMessage
      puzzle {
        coverImage
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty!</div>

export const Failure = ({
  error,
}: CellFailureProps<FindEditPuzzleQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  rewardable,
}: CellSuccessProps<FindEditPuzzleQuery, FindEditPuzzleQueryVariables>) => {
  return (
    <PuzzleForm
      initialValues={{
        rewardable: {
          name: rewardable.name,
          slug: rewardable.slug,
          successMessage: rewardable.successMessage,
        },
      }}
      isEditMode
    />
  )
}
