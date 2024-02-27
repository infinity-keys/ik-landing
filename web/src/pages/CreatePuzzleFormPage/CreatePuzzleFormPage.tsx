import { PUZZLE_CREATION_LIMIT } from '@infinity-keys/constants'
import {
  CreateBurdPuzzleMutation,
  CreateBurdPuzzleMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import PuzzleForm from 'src/components/PuzzleForm/PuzzleForm'
import Seo from 'src/components/Seo/Seo'

const CREATE_BURD_PUZZLE_MUTATION = gql`
  mutation CreateBurdPuzzleMutation($input: CreateRewardableInput!) {
    createBurdPuzzle(input: $input) {
      rewardable {
        name
        slug
      }
      success
      errorMessage
    }
  }
`

const GET_USER_PUZZLE_COUNT = gql`
  query GetUserPuzzleCount {
    user {
      primaryOrgRewardableCount
    }
  }
`

const CreatePuzzleFormPage = () => {
  const { hasRole } = useAuth()

  const [createArchetypalPuzzle, { loading, error }] = useMutation<
    CreateBurdPuzzleMutation,
    CreateBurdPuzzleMutationVariables
  >(CREATE_BURD_PUZZLE_MUTATION, {
    onCompleted: ({ createBurdPuzzle }) => {
      if (createBurdPuzzle?.success && createBurdPuzzle.rewardable?.slug) {
        return navigate(
          routes.puzzleLanding({ slug: createBurdPuzzle.rewardable.slug })
        )
      }

      if (createBurdPuzzle?.errorMessage) {
        return alert(createBurdPuzzle.errorMessage)
      }

      return alert('There was an error creating your rewardable!')
    },
    onError: (error) => {
      alert(`Error with Burd's form: ${error.message}`)
    },
  })

  const { data } = useQuery(GET_USER_PUZZLE_COUNT)

  if (
    data?.user.primaryOrgRewardableCount >= PUZZLE_CREATION_LIMIT &&
    !hasRole('ADMIN')
  ) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4 text-center">
        <Seo title="Create a new puzzle" />
        <p>
          You have reached your puzzle creation limit. Please edit an existing
          puzzle.
        </p>
      </div>
    )
  }

  return (
    <>
      <Seo title="Create a new puzzle" />
      <PuzzleForm
        onFormSubmit={({ input }) => {
          const image = input.nft.image

          if (!image) {
            throw new Error('NFT image is required on creation')
          }

          return createArchetypalPuzzle({
            variables: {
              input: {
                ...input,
                nft: { ...input.nft, image },
              },
            },
          })
        }}
        submissionError={error}
        submissionPending={loading}
      />
    </>
  )
}

export default CreatePuzzleFormPage
