import { useEffect, useState } from 'react'

import {
  useWalletLogin,
  useActiveProfile,
  useWalletLogout,
} from '@lens-protocol/react-web'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { UpdateUserMutation, UpdateUserMutationVariables } from 'types/graphql'
import { useAccount } from 'wagmi'

import { useMutation } from '@redwoodjs/web'
import { LoaderIcon, toast } from '@redwoodjs/web/dist/toast'

import Button from 'src/components/Button/Button'
import { ButtonProps } from 'src/components/Button/Button'

const UPDATE_LENS_PROFILE = gql`
  mutation UpdateUserMutation(
    $userInput: UpdateUserInput!
    $lensAddress: String
  ) {
    updateUser(input: $userInput) {
      id
    }
    upsertLensKeypConnect(lensAddress: $lensAddress) {
      success
      errors
    }
  }
`

const LensConnect = (props: Partial<ButtonProps>) => {
  const { isConnected, connector } = useAccount()
  const {
    execute: connectToLens,
    error: connectToLensError,
    isPending: connectToLensPending,
  } = useWalletLogin()
  const { data: profile, loading: profileLoading } = useActiveProfile()
  const { execute: logout, isPending } = useWalletLogout()
  const { openConnectModal } = useConnectModal()
  const [hasTriedConnection, setHasTriedConnection] = useState(false)

  const noProfile = hasTriedConnection && !profile
  const isLoading = connectToLensPending || isPending || profileLoading

  const [updateLensProfile] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UPDATE_LENS_PROFILE, {
    onError: () => {
      logout()
      setHasTriedConnection(false)
      toast.error('Error connecting Lens profile to user account.')
    },
  })

  useEffect(() => {
    if (hasTriedConnection && profile?.handle && profile?.ownedBy) {
      updateLensProfile({
        variables: {
          userInput: {
            lensProfile: profile.handle,
          },
          lensAddress: profile.ownedBy,
        },
      })
    }
  }, [hasTriedConnection, profile, updateLensProfile])

  useEffect(() => {
    if (noProfile && !connectToLensError && !isLoading) {
      toast.error('No active Lens profile associated with this wallet.')
    }
  }, [noProfile, connectToLensError, isLoading])

  const onLoginClick = async () => {
    try {
      const signer = await connector?.getSigner()
      await connectToLens(signer)
      setHasTriedConnection(true)
    } catch {
      toast.error('Error connecting to Lens Profile')
      setHasTriedConnection(true)
    }
  }

  const onLogoutClick = () => {
    updateLensProfile({
      variables: {
        userInput: {
          lensProfile: null,
        },
        lensAddress: null,
      },
    })
    logout()
    setHasTriedConnection(false)
  }

  return (
    <div className="flex flex-col items-center">
      {!isLoading ? (
        !isConnected ? (
          <button
            onClick={openConnectModal}
            className="overflow-hidden rounded-md p-2 text-sm text-gray-200 transition-colors hover:bg-white/10 hover:text-brand-accent-primary"
          >
            Connect Wallet
          </button>
        ) : (
          <div>
            {profile?.handle ? (
              <button
                disabled={isPending}
                onClick={onLogoutClick}
                className="overflow-hidden rounded-md p-2 text-sm text-gray-200 transition-colors hover:bg-white/10 hover:text-brand-accent-primary"
              >
                Disconnect
              </button>
            ) : (
              <Button
                {...props}
                disabled={connectToLensPending}
                onClick={onLoginClick}
                text={props.text || 'Connect to Lens'}
              />
            )}
          </div>
        )
      ) : (
        <LoaderIcon />
      )}
    </div>
  )
}

export default LensConnect
