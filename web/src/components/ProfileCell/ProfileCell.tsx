import React, { lazy } from 'react'

import EnvelopeIcon from '@heroicons/react/20/solid/EnvelopeIcon'
import WalletIcon from '@heroicons/react/20/solid/WalletIcon'
import { LensIcon } from '@infinity-keys/react-lens-share-button'
import { useActiveProfile } from '@lens-protocol/react-web'
import Avatar from 'boring-avatars'
import type {
  FindUserQuery,
  FindUserQueryVariables,
  SyncDiscordRolesMutation,
  UserRewardablesQuery,
} from 'types/graphql'

import { routes } from '@redwoodjs/router'
import {
  useQuery,
  CellSuccessProps,
  CellFailureProps,
  useMutation,
} from '@redwoodjs/web'
import { LoaderIcon } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import Thumbnail from 'src/components/Thumbnail/Thumbnail'
import { formatUserMetadata } from 'src/lib/formatters'
import { avatarGradient } from 'src/lib/theme/helpers'
import { rewardableLandingRoute } from 'src/lib/urlBuilders'

const CLERK_PORTAL_URL = process.env.CLERK_PORTAL_URL

if (!CLERK_PORTAL_URL) {
  throw new Error('Missing CLERK_PORTAL_URL variable')
}

export const QUERY = gql`
  query FindUserQuery {
    user {
      id
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

// displays rewardables (puzzles & packs) a user can edit or delete
const USER_REWARDABLES_QUERY = gql`
  query UserRewardablesQuery($userId: String!) {
    userRewardables(userId: $userId) {
      id
      trashedAt
      name
      slug
      nfts {
        cloudinaryId
      }
      type
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
  const { userMetadata } = useAuth()

  const [
    syncDiscordRoles,
    { loading: discordSyncLoading, data: discordRolesData },
  ] = useMutation<SyncDiscordRolesMutation>(SYNC_DISCORD_ROLES_MUTATION)

  const userData = formatUserMetadata(userMetadata)

  const { data } = useQuery<UserRewardablesQuery>(USER_REWARDABLES_QUERY, {
    variables: { userId: user?.id },
  })

  const liveRewardables = data?.userRewardables.filter(
    (rewardable) => !rewardable.trashedAt
  )
  const trashedRewardables = data?.userRewardables.filter(
    (rewardable) => rewardable.trashedAt
  )

  return (
    <div>
      <div className="mt-12 mb-6 flex flex-col gap-6 lg:mt-0 lg:flex-row">
        <div className="mx-auto w-full lg:basis-3/5">
          <div className="overflow-hidden rounded-lg bg-black/30">
            <div className="sm:items-centers flex flex-col justify-between bg-black/20 py-8 px-4 sm:flex-row sm:px-10">
              <div className="flex items-center">
                {userData.avatar ? (
                  <img
                    src={userData.avatar}
                    alt=""
                    className="h-14 w-14 rounded-full"
                  />
                ) : (
                  <Avatar
                    size={56}
                    name={user.id}
                    variant="marble"
                    colors={avatarGradient}
                  />
                )}

                <div className="ml-6">
                  <p className="text-xl font-bold text-white">
                    {userData.userName}
                  </p>
                </div>
              </div>

              <div className="mt-8 sm:mt-0">
                <Button onClick={handleLogOut} size="small" solid>
                  Log Out
                </Button>
              </div>
            </div>

            <div className="gap-10 py-10 px-4 sm:flex sm:px-10">
              <div className="flex justify-center sm:block sm:justify-start">
                <p className="mr-3 text-xl font-bold text-brand-accent-primary">
                  {user.stepsSolvedCount}
                </p>
                <p>Steps</p>
              </div>

              <div className="flex justify-center sm:block sm:justify-start">
                <p className="mr-3 text-xl font-bold text-brand-accent-primary">
                  {user.puzzlesSolvedCount}
                </p>
                <p>Puzzles</p>
              </div>

              <div className="flex justify-center sm:block sm:justify-start">
                <p className="mr-3 text-xl font-bold text-brand-accent-primary">
                  {user.packsSolvedCount}
                </p>
                <p>Packs</p>
              </div>

              <div className="flex justify-center sm:block sm:justify-start">
                <p className="mr-3 text-xl font-bold text-brand-accent-primary">
                  {user.nftsSolvedCount}
                </p>
                <p>NFTs</p>
              </div>
            </div>

            <div className="px-4 pb-6 text-white sm:px-10">
              {userData.primaryEmail && (
                <div className="flex items-center pb-4">
                  <EnvelopeIcon className="h-5 w-5 text-white" />
                  <p className="ml-4 text-sm text-white/70">
                    {userData.primaryEmail}
                  </p>
                </div>
              )}

              {user.discordConnection?.username && (
                <div className="flex items-center pb-4">
                  <DiscordIcon width={20} height={20} />
                  <p className="ml-4 text-sm text-white/70">
                    {user.discordConnection.username}
                  </p>
                </div>
              )}

              {userData.truncatedWallet && (
                <div className="flex items-center pb-4">
                  <WalletIcon className="h-5 w-5 text-white" />
                  <p className="ml-4 text-sm text-white/70">
                    {userData.truncatedWallet}
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

          {user.discordConnection?.id && (
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

                  {discordRolesData?.syncDiscordRoles?.errors?.map(
                    (text, i) => (
                      <p className="mt-2" key={i}>
                        {text}
                      </p>
                    )
                  )}
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
              <p>Socials:</p>

              <a
                href={`${CLERK_PORTAL_URL}/user`}
                className="overflow-hidden rounded-md p-2 text-sm text-gray-200 transition-colors hover:bg-white/10 hover:text-brand-accent-primary"
              >
                Connect Accounts
              </a>
            </div>
          </div>
        </div>
      </div>

      {(!!liveRewardables?.length || !!trashedRewardables?.length) && (
        <div className="flex flex-col gap-6">
          <div className="overflow-hidden rounded-lg bg-black/30 lg:basis-2/5">
            <div className="bg-black/30 py-8 px-4 sm:px-8">
              <p className="">Your Puzzles & Packs</p>
            </div>

            <div className="flex flex-col gap-4 py-8 px-4 text-sm sm:px-8">
              {!!liveRewardables?.length && (
                <div className="grid gap-4 py-8 px-4 text-sm sm:px-8 md:grid-cols-2">
                  {liveRewardables?.map((rewardable) => (
                    <Thumbnail
                      id={rewardable.id} // keep typescript happy
                      key={rewardable.id}
                      name={rewardable.name}
                      href={rewardableLandingRoute({
                        type: rewardable.type,
                        slug: rewardable.slug,
                      })}
                      isGrid={false} // always false for this display
                      cloudinaryId={rewardable.nfts?.[0]?.cloudinaryId}
                    />
                  ))}
                </div>
              )}

              {!!trashedRewardables?.length && (
                <>
                  <p className="text-stone-300">Puzzles and packs in trash</p>
                  <div className="grid gap-4 py-8 px-4 text-sm sm:px-8 md:grid-cols-2">
                    {trashedRewardables?.map((rewardable) => (
                      <Thumbnail
                        id={rewardable.id} // keep typescript happy
                        key={rewardable.id}
                        name={rewardable.name}
                        href={routes.editFormArchetype({
                          slug: rewardable.slug,
                        })}
                        isGrid={false} // always false for this display
                        cloudinaryId={rewardable.nfts?.[0]?.cloudinaryId}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
