import {
  LensFormRoleMutation,
  LensFormRoleMutationVariables,
} from 'types/graphql'
import { useAccount } from 'wagmi'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Seo from 'src/components/Seo/Seo'

const LENS_FORM_ROLE_MUTATION = gql`
  mutation LensFormRoleMutation($externalAddress: String) {
    addLensFormRole(externalAddress: $externalAddress) {
      success
    }
  }
`

const AddRolesPage = () => {
  const { address } = useAccount()
  const { currentUser } = useAuth()

  const [addRole, { loading, data }] = useMutation<
    LensFormRoleMutation,
    LensFormRoleMutationVariables
  >(LENS_FORM_ROLE_MUTATION, {
    variables: {
      externalAddress: address,
    },
    onError() {
      toast.error('Something went wrong checking your NFTs.')
    },
  })

  return (
    <>
      <Seo title="Add Role" />

      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="flex justify-center text-center">
          {(currentUser && currentUser.roles.includes('LENS_FORM')) ||
          data?.addLensFormRole.success ? (
            <div>
              <p className="mb-2">
                Please fill out our form to get your Lens account
              </p>
              <Button to={routes.lensProfileForm()} text="Go to Form" />
            </div>
          ) : (
            <div>
              <p className="mb-2">
                Please collect the following NFTs to be eligible to claim your
                Lens profile
              </p>
              <Button onClick={() => addRole()} text="Check NFTs" />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default AddRolesPage
