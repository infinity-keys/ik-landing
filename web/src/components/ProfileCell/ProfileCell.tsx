import React, { lazy } from 'react'

import EnvelopeIcon from '@heroicons/react/20/solid/EnvelopeIcon'
import WalletIcon from '@heroicons/react/20/solid/WalletIcon'
import ClipboardIcon from '@heroicons/react/24/outline/ClipboardIcon'
import { truncate } from '@infinity-keys/core'
import { LensIcon } from '@infinity-keys/react-lens-share-button'
import { useActiveProfile } from '@lens-protocol/react-web'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import Avatar from 'boring-avatars'
import type {
  FindUserQuery,
  FindUserQueryVariables,
  SyncDiscordRolesMutation,
  UpdateExternalWalletMutation,
} from 'types/graphql'
import { useAccount } from 'wagmi'

import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'
import { LoaderIcon, toast } from '@redwoodjs/web/toast'

import Button from 'src/components/Button/Button'
import { avatarGradient } from 'src/lib/theme/helpers'

export const QUERY = gql`
  query FindUserQuery {
    user {
      id
      username
      email
      address
      externalAddress
      lensProfile
      authId
      stepsSolvedCount
      puzzlesSolvedCount
      packsSolvedCount
      nftsSolvedCount
      discordConnection {
        id
        username
      }
      userRewards {
        id
      }
    }
  }
`
const LensConnect = lazy(() => import('src/components/LensConnect/LensConnect'))
const DiscordIcon = lazy(() => import('src/svgs/DiscordIcon'))
const LoadingIcon = lazy(() => import('src/components/LoadingIcon/LoadingIcon'))
const ConnectAccountButton = lazy(
  () => import('src/components/ConnectAccountButton/ConnectAccountButton')
)
const DisconnectAccountButton = lazy(
  () => import('src/components/DisconnectAccountButton/DisconnectAccountButton')
)

const SYNC_DISCORD_ROLES_MUTATION = gql`
  mutation SyncDiscordRolesMutation {
    syncDiscordRoles {
      success
      errors
      message
    }
  }
`

const UPDATE_EXTERNAL_WALLET_MUTATION = gql`
  mutation UpdateExternalWalletMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      externalAddress
    }
  }
`

export const Loading = () => <LoadingIcon />

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindUserQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  user,
  handleLogOut,
  queryResult,
}: CellSuccessProps<FindUserQuery, FindUserQueryVariables> & {
  handleLogOut: () => void
}) => {
  const { data: lensProfile } = useActiveProfile()
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal()

  const [
    syncDiscordRoles,
    { loading: discordSyncLoading, data: discordRolesData },
  ] = useMutation<SyncDiscordRolesMutation>(SYNC_DISCORD_ROLES_MUTATION)

  const [updateExternalWallet, { loading: updateExternalWalletLoading }] =
    useMutation<UpdateExternalWalletMutation>(UPDATE_EXTERNAL_WALLET_MUTATION, {
      onCompleted: () => {
        if (typeof queryResult?.refetch !== 'undefined') {
          queryResult.refetch()
        }
      },
      onError: () => {
        toast.error('Error connecting wallet')
      },
    })

  return (
    <div className="mt-12 flex flex-col gap-6 lg:mt-0 lg:flex-row">
      <div className="mx-auto w-full lg:basis-3/5">
        <div className="overflow-hidden rounded-lg bg-black/30">
          <div className="sm:items-centers flex flex-col justify-between bg-black/20 py-8 px-4 sm:flex-row sm:px-10">
            <div className="flex items-center">
              <Avatar
                size={56}
                name={user.email || user.id}
                variant="marble"
                colors={avatarGradient}
              />

              <div className="ml-6">
                <p className="text-xl font-bold text-white">
                  {user.username || user.email?.split('@')[0] || ''}
                </p>
                {user.address && (
                  <div className="flex items-center">
                    <p className="text-brand-accent-primary">
                      {truncate(user.address)}
                    </p>
                    <button
                      onClick={() => {
                        if (!user.address) {
                          return toast.error('Cannot copy address')
                        }
                        toast('Address copied to clipboard')
                        navigator.clipboard.writeText(user.address)
                      }}
                    >
                      <ClipboardIcon className="ml-1 -mt-[2px] h-4 w-4 fill-transparent text-gray-200 hover:text-brand-accent-primary" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 sm:mt-0">
              <Button onClick={handleLogOut} size="small" solid>
                Log Out
              </Button>
            </div>
          </div>

          <div className="flex gap-10 py-10 px-4 sm:px-10">
            <div>
              <p className="text-xl font-bold text-brand-accent-primary">
                {user.stepsSolvedCount}
              </p>
              <p>Steps</p>
            </div>

            <div>
              <p className="text-xl font-bold text-brand-accent-primary">
                {user.puzzlesSolvedCount}
              </p>
              <p>Puzzles</p>
            </div>

            <div>
              <p className="text-xl font-bold text-brand-accent-primary">
                {user.packsSolvedCount}
              </p>
              <p>Packs</p>
            </div>

            <div>
              <p className="text-xl font-bold text-brand-accent-primary">
                {user.nftsSolvedCount}
              </p>
              <p>NFTs</p>
            </div>
          </div>

          <div className="px-4 pb-6 text-white sm:px-10">
            <div className="flex items-center pb-4">
              <EnvelopeIcon className="h-5 w-5 text-white" />
              <p className="ml-4 text-sm text-white/70">{user.email}</p>
            </div>

            {user.discordConnection?.username && (
              <div className="flex items-center pb-4">
                <DiscordIcon width={20} height={20} />
                <p className="ml-4 text-sm text-white/70">
                  {user.discordConnection.username}
                </p>
              </div>
            )}

            {user.externalAddress && (
              <div className="flex items-center pb-4">
                <WalletIcon className="h-5 w-5 text-white" />
                <p className="ml-4 text-sm text-white/70">
                  {truncate(user.externalAddress)}
                </p>
              </div>
            )}

            {lensProfile?.handle && (
              <div className="flex items-center">
                <LensIcon className="h-5 w-5 text-white" />
                <p className="ml-4 text-sm text-white/70">
                  {lensProfile.handle}
                </p>
              </div>
            )}
          </div>
        </div>

        {(user?.authId?.split('DISCORD-')[1] || user.discordConnection?.id) && (
          <div className="rounded-md border-t border-white/10 bg-black/25 py-8 px-4 text-sm text-gray-100 sm:px-10">
            {discordSyncLoading ? (
              <LoaderIcon />
            ) : (
              <>
                {!discordRolesData?.syncDiscordRoles.success && (
                  <>
                    <p>
                      Are you a member of our{' '}
                      <a
                        href="https://discord.gg/infinitykeys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline transition-colors hover:text-brand-accent-primary"
                      >
                        Discord server
                      </a>
                      ? Sync your Discord roles here.
                    </p>

                    <div className="flex justify-center">
                      <button
                        onClick={() => syncDiscordRoles()}
                        className="social-share mt-4 inline-flex items-center rounded bg-discordPurple px-4 py-2 text-sm font-medium text-white transition hover:bg-discordPurple/70"
                      >
                        Sync Roles
                      </button>
                    </div>
                  </>
                )}

                {discordRolesData?.syncDiscordRoles?.message && (
                  <p className="text-center">
                    {discordRolesData?.syncDiscordRoles?.message}
                  </p>
                )}

                {discordRolesData?.syncDiscordRoles?.errors?.map((text, i) => (
                  <p className="mt-2" key={i}>
                    {text}
                  </p>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      <div className="overflow-hidden rounded-lg bg-black/30 lg:basis-2/5">
        <div className="bg-black/30 py-8 px-4 sm:px-8">
          <p className="">Connect accounts:</p>
        </div>

        <div className="flex flex-col gap-4 py-8 px-4 text-sm sm:px-8">
          <div className="flex items-center justify-between">
            <p>Discord:</p>
            {user?.discordConnection?.id ? (
              <DisconnectAccountButton
                provider="discord"
                onSuccess={queryResult?.refetch}
              />
            ) : (
              <ConnectAccountButton provider="discord" />
            )}
          </div>
          <div className="flex items-center justify-between">
            <p>Lens:</p>
            <LensConnect text="Connect" size="small" />
          </div>

          <div className="flex items-center justify-between">
            <p>External Wallet:</p>

            {updateExternalWalletLoading ? (
              <LoaderIcon />
            ) : address || user.externalAddress ? (
              user.externalAddress ? (
                <button
                  className="overflow-hidden rounded-md p-2 text-sm text-gray-200 transition-colors hover:bg-white/10 hover:text-brand-accent-primary"
                  onClick={() =>
                    updateExternalWallet({
                      variables: {
                        input: {
                          externalAddress: null,
                        },
                      },
                    })
                  }
                >
                  Disconnect
                </button>
              ) : (
                <Button
                  size="small"
                  onClick={() =>
                    updateExternalWallet({
                      variables: {
                        input: {
                          externalAddress: address,
                        },
                      },
                    })
                  }
                >
                  Connect
                </Button>
              )
            ) : (
              <button
                onClick={openConnectModal}
                className="overflow-hidden rounded-md p-2 text-sm text-gray-200 transition-colors hover:bg-white/10 hover:text-brand-accent-primary"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
