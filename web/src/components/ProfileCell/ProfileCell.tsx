import React from 'react'

import EnvelopeIcon from '@heroicons/react/20/solid/EnvelopeIcon'
import { truncate } from '@infinity-keys/core'
import { LensIcon } from '@infinity-keys/react-lens-share-button'
import Avatar from 'boring-avatars'
import type { FindUserQuery, FindUserQueryVariables } from 'types/graphql'
import { useAccount } from 'wagmi'

import { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import LensConnect from 'src/components/LensConnect/LensConnect'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import DiscordIcon from 'src/svgs/DiscordIcon'
import TwitterIcon from 'src/svgs/TwitterIcon'

export const QUERY = gql`
  query FindUserQuery {
    user {
      username
      email
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
  const { address } = useAccount()

  // Immediately upon mount, reconcile progress, but also provide function to
  // use on button click

  return (
    <div className="overflow-hidden rounded-lg bg-black/30">
      <div className="flex items-center bg-black/20 py-8 px-10">
        <Avatar
          size={56}
          name={user.email}
          variant="marble"
          colors={['#101D42', '#E400FF', '#3FCCBB', '#8500AC', '#303B5B']}
        />

        <div className="ml-6">
          <p className="text-xl font-bold text-white">
            {user.username || user.email.split('@')[0]}
          </p>
          {address && <p className="text-turquoise">{truncate(address)}</p>}
        </div>
      </div>

      <div className="flex gap-10 p-10">
        <div>
          <p className="text-xl font-bold text-turquoise">
            {user.stepsSolvedCount}
          </p>
          <p>Steps</p>
        </div>

        <div>
          <p className="text-xl font-bold text-turquoise">
            {user.puzzlesSolvedCount}
          </p>
          <p>Puzzles</p>
        </div>

        <div>
          <p className="text-xl font-bold text-turquoise">
            {user.packsSolvedCount}
          </p>
          <p>Packs</p>
        </div>

        <div>
          <p className="text-xl font-bold text-turquoise">
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

        {user.lensProfile && (
          <div className="flex items-center">
            <LensIcon className="h-5 w-5 text-white" />
            <p className="ml-4 text-sm text-white/70">{user.lensProfile}</p>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <LensConnect />
        </div>
      </div>
    </div>
  )
}
