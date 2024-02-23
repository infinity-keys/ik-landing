import {
  CreateBurdPuzzleMutation,
  CreateBurdPuzzleMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

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

const CreatePuzzleFormPage = () => {
  const [createArchetypalPuzzle, { loading, error }] = useMutation<
    CreateBurdPuzzleMutation,
    CreateBurdPuzzleMutationVariables
  >(CREATE_BURD_PUZZLE_MUTATION, {
    onCompleted: ({ createBurdPuzzle }) => {
      if (!createBurdPuzzle.success) {
        if (createBurdPuzzle?.errorMessage) {
          return alert(createBurdPuzzle.errorMessage)
        }

        return alert('There was an error creating your rewardable!')
      }
    },
    onError: (error) => {
      alert(`Error with Burd's form: ${error.message}`)
    },
  })

  return (
    <>
      <Seo title="Create a new puzzle" />
      <PuzzleForm
        onFormSubmit={async ({ input }, onSuccess) => {
          const image = input.nft.image

          if (!image) {
            throw new Error('NFT image is required on creation')
          }

          const result = await createArchetypalPuzzle({
            variables: {
              input: {
                ...input,
                nft: { ...input.nft, image },
              },
            },
          })

          if (
            onSuccess &&
            typeof onSuccess === 'function' &&
            result.data?.createBurdPuzzle.success &&
            result.data?.createBurdPuzzle.rewardable?.slug
          ) {
            onSuccess()

            navigate(
              routes.puzzleLanding({
                slug: result.data.createBurdPuzzle.rewardable.slug,
              })
            )
          }
        }}
        submissionError={error}
        submissionPending={loading}
      />
    </>
  )
}

export default CreatePuzzleFormPage
