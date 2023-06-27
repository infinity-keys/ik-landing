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

import Button from 'src/components/Button/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'

const UPDATE_LENS_PROFILE = gql`
  mutation UpdateUserMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
    }
  }
`

const LensConnect = ({ text }: { text?: string }) => {
  const { isConnected, connector } = useAccount()
  const {
    execute: connectToLens,
    error: connectToLensError,
    isPending: connectToLensPending,
  } = useWalletLogin()
  const { data: profile } = useActiveProfile()
  const { execute: logout, isPending } = useWalletLogout()
  const { openConnectModal } = useConnectModal()
  const [hasTriedConnection, setHasTriedConnection] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const noProfile = hasTriedConnection && !profile
  const isLoading = connectToLensPending || isPending
  const isError = connectToLensError || errorMessage

  const [updateLensProfile] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UPDATE_LENS_PROFILE, {
    onError: () => {
      logout()
      setHasTriedConnection(false)
      setErrorMessage('Error connecting Lens profile to user account.')
    },
  })

  useEffect(() => {
    if (hasTriedConnection && profile?.handle) {
      updateLensProfile({
        variables: {
          input: {
            lensProfile: profile.handle,
          },
        },
      })
    }
  }, [hasTriedConnection, profile, updateLensProfile])

  const onLoginClick = async () => {
    setErrorMessage('')
    try {
      const signer = await connector?.getSigner()
      await connectToLens(signer)
    } catch {
      console.error('Error connecting to Lens Profile')
    }
    setHasTriedConnection(true)
  }

  const onLogoutClick = () => {
    updateLensProfile({
      variables: {
        input: {
          lensProfile: null,
        },
      },
    })
    logout()
    setHasTriedConnection(false)
  }

  return (
    <div className="flex flex-col items-center">
      {!isLoading ? (
        !isConnected ? (
          <Button
            text="Connect Wallet"
            size="small"
            onClick={openConnectModal}
            variant="faded"
            border={false}
          />
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
                disabled={connectToLensPending}
                onClick={onLoginClick}
                text={text || 'Connect to Lens'}
                size="small"
                variant="faded"
                border={false}
              />
            )}
          </div>
        )
      ) : (
        <LoadingIcon />
      )}

      {(connectToLensError || errorMessage) && (
        <p className="pt-2 text-sm italic text-gray-150">
          {errorMessage || 'Error connecting to Lens account'}
        </p>
      )}

      {noProfile && !isError && !isLoading && (
        <p className="pt-2 text-sm italic text-gray-150">
          No active Lens profile associated with this wallet
        </p>
      )}
    </div>
  )
}

export default LensConnect
