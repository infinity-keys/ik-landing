import { useState } from 'react'

import {
  DeleteSubmissionsByEmailMutation,
  DeleteSubmissionsByEmailMutationVariables,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import Alert from 'src/components/Alert/Alert'
import Button from 'src/components/Button/Button'
import Heading from 'src/components/Heading/Heading'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Seo from 'src/components/Seo/Seo'
import Text from 'src/components/Text/Text'
import Wrapper from 'src/components/Wrapper/Wrapper'
import Logo from 'src/svgs/Logo'

const DELETE_SUBMISSIONS_BY_EMAIL_MUTATION = gql`
  mutation DeleteSubmissionsByEmailMutation($jwt: String!) {
    deleteSubmissionsByEmail(jwt: $jwt) {
      success
      message
    }
  }
`

const DeletePage = ({ jwt }) => {
  const [successMessage, setSuccessMessage] = useState('')

  const [create, { loading, error }] = useMutation<
    DeleteSubmissionsByEmailMutation,
    DeleteSubmissionsByEmailMutationVariables
  >(DELETE_SUBMISSIONS_BY_EMAIL_MUTATION, {
    onCompleted: () => {
      setSuccessMessage('Your info has been deleted. Thank you for playing!')
    },
  })

  const handleClick = async (jwt: string) => {
    create({ variables: { jwt } })
  }

  return (
    <Wrapper>
      <Seo title="Delete My Data" />

      <div className="max-w-2xl text-center">
        <Link to={routes.home()} className="flex justify-center">
          <Logo />
        </Link>

        {successMessage && (
          <>
            <div className="mb-4">
              <Text>{successMessage}</Text>
            </div>
            <Button to={routes.home()} text="Return Home" />
          </>
        )}

        {loading && <LoadingIcon />}

        {!successMessage && !loading && (
          <>
            <div className="mt-7">
              <Heading>Delete My Data</Heading>
            </div>
            <Text>
              This will remove you from the database completely. All progress
              related to your completed puzzles and NFTs will be lost.
            </Text>
            <div className="mt-7">
              <Button
                onClick={() => handleClick(jwt)}
                text="Delete My Data"
                variant="warn"
              />
            </div>
          </>
        )}

        {error && (
          <div className="mt-4 flex justify-center">
            <Alert text="Something went wrong with your request. If this keeps happening, please contact us on our [Discord channel](https://discord.com/invite/infinitykeys)" />
          </div>
        )}
      </div>
    </Wrapper>
  )
}

export default DeletePage
