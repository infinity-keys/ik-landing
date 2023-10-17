import {
  LensFormRoleMutation,
  LensFormRoleMutationVariables,
} from 'types/graphql'
import { useAccount } from 'wagmi'

import { Link, routes } from '@redwoodjs/router'
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
    onCompleted({ addLensFormRole }) {
      if (!addLensFormRole.success) {
        toast('This wallet is missing a required NFT.')
      }
    },
  })

  return (
    <>
      <Seo title="Add Role" />

      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="mx-auto max-w-prose justify-center text-center">
          {(currentUser && currentUser.roles.includes('LENS_FORM')) ||
          data?.addLensFormRole.success ? (
            <div>
              <p className="mb-8">
                Continue to our form to request your Lens account
              </p>
              <Button to={routes.lensProfileForm()}>Continue to Form</Button>
            </div>
          ) : (
            <div>
              <p className="mb-8">
                Please collect the{' '}
                <Link
                  className="text-brand-accent-primary underline transition-colors hover:text-brand-accent-secondary"
                  to={routes.puzzleLanding({ slug: 'lenscollector' })}
                >
                  Lens Collector
                </Link>{' '}
                and{' '}
                <Link
                  className="text-brand-accent-primary underline transition-colors hover:text-brand-accent-secondary"
                  to={routes.puzzleLanding({ slug: 'cometh-cadets' })}
                >
                  Cometh Cadet
                </Link>{' '}
                NFTs to be eligible to request your Lens profile.
              </p>
              <Button onClick={() => addRole()}>Check NFTs</Button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default AddRolesPage
