import EnvelopeIcon from '@heroicons/react/20/solid/EnvelopeIcon'
import Avatar from 'boring-avatars'
import type { FindUserQuery, FindUserQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import DiscordIcon from 'src/svgs/DiscordIcon'
import TwitterIcon from 'src/svgs/TwitterIcon'

export const QUERY = gql`
  query FindUserQuery($authId: String!) {
    user: user(authId: $authId) {
      username
      email
      publicAddress
      twitterProfile
      discordProfile
      lensProfile
    }
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
  return (
    <div className="overflow-hidden rounded-lg bg-black/30">
      <div className="flex items-center bg-black/20 py-8 px-10">
        <Avatar
          size={56}
          name={user.publicAddress}
          variant="marble"
          colors={['#101D42', '#E400FF', '#3FCCBB', '#8500AC', '#303B5B']}
        />
        <div className="ml-6">
          <p className="text-xl font-bold text-white">{user.username}</p>
          <p className="text-turquoise">{user.publicAddress}</p>
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
        {user.email && (
          <div className="flex items-center pb-4">
            <EnvelopeIcon className="h-5 w-5 text-white" />
            <p className="ml-4 text-sm text-white/70">{user.email}</p>
          </div>
        )}

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
