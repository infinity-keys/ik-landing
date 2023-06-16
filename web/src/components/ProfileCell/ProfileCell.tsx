import React, { lazy } from 'react'

import EnvelopeIcon from '@heroicons/react/20/solid/EnvelopeIcon'
import ClipboardIcon from '@heroicons/react/24/outline/ClipboardIcon'
import { truncate } from '@infinity-keys/core'
import { LensIcon } from '@infinity-keys/react-lens-share-button'
import { useActiveProfile } from '@lens-protocol/react-web'
import Avatar from 'boring-avatars'
import type { FindUserQuery, FindUserQueryVariables } from 'types/graphql'

import { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import { avatarGradient } from 'src/lib/theme/helpers'
import DiscordIcon from 'src/svgs/DiscordIcon'
import TwitterIcon from 'src/svgs/TwitterIcon'

export const QUERY = gql`
  query FindUserQuery {
    user {
      id
      username
      email
      address
      twitterProfile
      discordProfile
      lensProfile
      authId
      stepsSolvedCount
      puzzlesSolvedCount
      packsSolvedCount
      nftsSolvedCount
      userRewards {
        id
      }
    }
  }
`
const LensConnect = lazy(() => import('src/components/LensConnect/LensConnect'))

export const Loading = () => <LoadingIcon />

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindUserQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  user,
}: CellSuccessProps<FindUserQuery, FindUserQueryVariables>) => {
  const { data: lensProfile } = useActiveProfile()

  // Immediately upon mount, reconcile progress, but also provide function to
  // use on button click

  return (
    <div className="overflow-hidden rounded-lg bg-black/30">
      <div className="flex items-center bg-black/20 py-8 px-10">
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
                  toast('Address copied to clipboard', {
                    className:
                      'bg-black/40 border border-brand-accent-primary text-white',
                  })
                  navigator.clipboard.writeText(user.address)
                }}
              >
                <ClipboardIcon className="ml-1 -mt-[2px] h-4 w-4 fill-transparent text-gray-200 hover:text-brand-accent-primary" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-10 p-10">
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

      <div className="px-10 pb-6 text-white">
        <div className="flex items-center pb-4">
          <EnvelopeIcon className="h-5 w-5 text-white" />
          <p className="ml-4 text-sm text-white/70">{user.email}</p>
        </div>

        {user.twitterProfile && (
          <div className="flex items-center pb-4">
            <TwitterIcon width={20} height={20} />
            <p className="ml-4 text-sm text-white/70">{user.twitterProfile}</p>
          </div>
        )}

        {user.discordProfile && (
          <div className="flex items-center pb-4">
            <DiscordIcon width={20} height={20} />
            <p className="ml-4 text-sm text-white/70">{user.discordProfile}</p>
          </div>
        )}

        {lensProfile?.handle && (
          <div className="flex items-center">
            <LensIcon className="h-5 w-5 text-white" />
            <p className="ml-4 text-sm text-white/70">{lensProfile.handle}</p>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <LensConnect />
        </div>
      </div>
    </div>
  )
}
