import type {
  EditBurdPuzzleMutation,
  EditBurdPuzzleMutationVariables,
  FindEditPuzzleQuery,
  FindEditPuzzleQueryVariables,
  StepType,
} from 'types/graphql'

import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'

import PuzzleForm from 'src/components/PuzzleForm/PuzzleForm'

export const QUERY = gql`
  query FindEditPuzzleQuery($slug: String!) {
    rewardable: rewardableBySlugWithOrg(slug: $slug, type: PUZZLE) {
      id
      name
      slug
      successMessage
      nfts {
        data
      }
      puzzle {
        id
        coverImage
        requirements
        steps {
          type
          solutionHint
          defaultImage
          solutionImage
          stepSortWeight
          stepGuideType
          stepPage {
            body
            image
            showStepGuideHint
            sortWeight
          }
        }
      }
    }
  }
`

const EDIT_BURD_PUZZLE_MUTATION = gql`
  mutation EditBurdPuzzleMutation(
    $input: UpdateRewardableInput!
    $rewardableId: String!
    $puzzleId: String!
  ) {
    editBurdPuzzle(
      input: $input
      rewardableId: $rewardableId
      puzzleId: $puzzleId
    ) {
      rewardable {
        name
        slug
      }
      success
      errorMessage
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
  const [editArchetypalPuzzle, { loading, error }] = useMutation<
    EditBurdPuzzleMutation,
    EditBurdPuzzleMutationVariables
  >(EDIT_BURD_PUZZLE_MUTATION, {
    onCompleted: ({ editBurdPuzzle }) => {
      if (editBurdPuzzle?.success) {
        return alert(`Rewardable edited via Burd's Form!`)
      }

      if (editBurdPuzzle?.errorMessage) {
        return alert(editBurdPuzzle.errorMessage)
      }

      return alert('There was an error creating your rewardable!')
    },
  })

  const formattedSteps = rewardable.puzzle?.steps.flatMap((step) => {
    if (!step) return []
    return {
      solutionHint: step.solutionHint ?? '',
      defaultImage: step.defaultImage ?? '',
      solutionImage: step.solutionImage ?? '',
      stepSortWeight: step.stepSortWeight ?? '',
      stepGuideType: step.stepGuideType ?? 'SEEK',
      type: 'SIMPLE_TEXT' as StepType,
      stepPage: step?.stepPage?.flatMap((page) => {
        if (!page) return []
        // Apollo automatically adds `__typename` to the query result.
        // Our sdls do not have that field and will error if it's present.
        const { __typename, ...rest } = page
        return rest
      }),
    }
  })

  const dbNft = rewardable.nfts[0]?.data

  const nftName =
    dbNft &&
    typeof dbNft === 'object' &&
    'name' in dbNft &&
    typeof dbNft.name === 'string'
      ? dbNft.name
      : ''
  const nftImage =
    dbNft &&
    typeof dbNft === 'object' &&
    'image' in dbNft &&
    typeof dbNft.image === 'string'
      ? dbNft.image
      : ''

  return (
    <PuzzleForm
      initialValues={{
        rewardable: {
          name: rewardable.name,
          slug: rewardable.slug,
          successMessage: rewardable.successMessage,
          nft: {
            name: nftName,
            image: nftImage,
          },
        },
        puzzle: {
          coverImage: rewardable.puzzle?.coverImage || '',
          requirements: rewardable.puzzle?.requirements || [],
        },
        steps: formattedSteps || [],
      }}
      isEditMode
      onFormSubmit={({ input }) => {
        if (!rewardable.puzzle?.id) {
          throw new Error('Error obtaining puzzle ID')
        }
        return editArchetypalPuzzle({
          variables: {
            input,
            rewardableId: rewardable.id,
            puzzleId: rewardable.puzzle.id,
          },
        })
      }}
      submissionError={error}
      submissionPending={loading}
    />
  )
}
