import React, { useMemo } from 'react'

import EnvelopeIcon from '@heroicons/react/20/solid/EnvelopeIcon'
import Avatar from 'boring-avatars'
import type { FindUserQuery, FindUserQueryVariables } from 'types/graphql'
import { useAccount } from 'wagmi'

import { useAuth } from '@redwoodjs/auth'
import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'

import Button from 'src/components/Button'
import DiscordIcon from 'src/svgs/DiscordIcon'
import TwitterIcon from 'src/svgs/TwitterIcon'

const truncate = (text: string) => {
  return `${text.substring(0, 5)}...${text.substring(text.length - 3)}`
}

export const QUERY = gql`
  query FindUserQuery {
    user {
      username
      email
      twitterProfile
      discordProfile
      lensProfile
      authId
    }
  }
`

// On login, reconcile v1, v2, anon cookies
const MUTATION_RECONCILE = gql`
  mutation ReconcileProgressQuery {
    reconcileProgress
  }
`

export const Loading = () => <div>Loading...</div>

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
  const { getToken } = useAuth()

  const [reconcilePuzzles, { data, error, loading }] = useMutation(
    MUTATION_RECONCILE,
    {
      onCompleted: async () => {
        // Now do fetch to progressCookies function to set local cookie with all
        // progress
        console.log(data)
        // /.redwood/functions/attempt vs /attempt
        const apiPath = `${
          global.RWJS_API_URL.includes('.redwood') ? window.location.origin : ''
        }${global.RWJS_API_URL}/progressCookies`
        const apiUrl = new URL(apiPath)
        // Get JWT from MagicLink
        const token = await getToken()
        // This sets progress cookie
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'auth-provider': 'magicLink',
            Authorization: `Bearer ${token}`,
          },
        })
      },
      onError: (error) => {},
    }
  )

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

        <div className="ml-auto">
          <h1>{loading && <Loading />}</h1>
          <Button
            text="Reconcile Progress"
            onClick={reconcilePuzzles}
            disabled={loading}
          />
        </div>
      </div>

      <div className="flex gap-10 p-10">
        <div>
          <p className="text-xl font-bold text-turquoise">14</p>
          <p>Puzzles</p>
        </div>

        <div>
          <p className="text-xl font-bold text-turquoise">5</p>
          <p>Series</p>
        </div>

        <div>
          <p className="text-xl font-bold text-turquoise">1</p>
          <p>Bundles</p>
        </div>

        <div>
          <p className="text-xl font-bold text-turquoise">36</p>
          <p>NFTs</p>
        </div>
      </div>

      <div className="px-10 pb-10 text-white">
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
            <EnvelopeIcon className="h-5 w-5 text-white" />
            <p className="ml-4 text-sm text-white/70">{user.lensProfile}</p>
          </div>
        )}
      </div>
    </div>
  )
}
