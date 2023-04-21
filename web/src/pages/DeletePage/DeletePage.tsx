import { useState } from 'react'

import {
  DeleteAllUserInfoMutation,
  DeleteAllUserInfoMutationVariables,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import Alert from 'src/components/Alert/Alert'
import Button from 'src/components/Button/Button'
import Heading from 'src/components/Heading/Heading'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Seo from 'src/components/Seo/Seo'
import Text from 'src/components/Text/Text'
import LogoFull1x from 'src/images/full-logo-1x.webp'
import LogoFull2x from 'src/images/full-logo-2x.webp'

const DELETE_ALL_USER_INFO_MUTATION = gql`
  mutation DeleteAllUserInfoMutation($jwt: String!) {
    deleteAllUserInfo(jwt: $jwt) {
      success
      message
    }
  }
`

const DeletePage = ({ jwt }) => {
  const [successMessage, setSuccessMessage] = useState('')

  const [create, { loading, error }] = useMutation<
    DeleteAllUserInfoMutation,
    DeleteAllUserInfoMutationVariables
  >(DELETE_ALL_USER_INFO_MUTATION, {
    onCompleted: () => {
      setSuccessMessage('Your info has been deleted. Thank you for playing!')
    },
  })

  const handleClick = async (jwt: string) => {
    create({ variables: { jwt } })
  }

  return (
    <>
      <Seo title="Delete My Data" />

      <div className="mx-auto max-w-2xl text-center">
        <Link to={routes.home()} className="flex justify-center">
          <img
            srcSet={`${LogoFull1x}, ${LogoFull2x} 2x`}
            src={LogoFull1x}
            alt=""
          />
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
    </>
  )
}

export default DeletePage
