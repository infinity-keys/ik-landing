import type {
  FindEditPuzzleQuery,
  FindEditPuzzleQueryVariables,
  StepType,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

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
  const steps =
    rewardable.puzzle?.steps.flatMap((step) =>
      step
        ? {
            solutionHint: step.solutionHint ?? undefined,
            defaultImage: step.defaultImage ?? undefined,
            solutionImage: step.solutionImage ?? undefined,
            stepSortWeight: step.stepSortWeight ?? undefined,
            stepGuideType: step.stepGuideType ?? undefined,
            type: 'SIMPLE_TEXT' as StepType,
            stepPage: step?.stepPage?.flatMap((page) => (page ? page : [])),
          }
        : []
    ) || []

  const dbNft = rewardable.nfts[0]?.data
  const nftName =
    dbNft && typeof dbNft === 'object' && 'name' in dbNft ? dbNft.name : ''
  const nftImage =
    dbNft && typeof dbNft === 'object' && 'image' in dbNft ? dbNft.image : ''

  return (
    <PuzzleForm
      initialValues={{
        rewardable: {
          name: rewardable.name,
          slug: rewardable.slug,
          successMessage: rewardable.successMessage,
          nft: {
            name: typeof nftName === 'string' ? nftName : '',
            image: typeof nftImage === 'string' ? nftImage : '',
          },
        },
        puzzle: {
          coverImage: rewardable.puzzle?.coverImage || '',
          requirements: rewardable.puzzle?.requirements || [],
        },
        steps,
      }}
      isEditMode
    />
  )
}
