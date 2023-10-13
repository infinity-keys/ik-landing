import { Fragment } from 'react'

import { gql } from '@apollo/client'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import capitalize from 'lodash/capitalize'
import type {
  FindClaimNftQuery,
  FindClaimNftQueryVariables,
} from 'types/graphql'
import { ClaimMutation } from 'types/graphql'
import { useAccount } from 'wagmi'

import { Link } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import CloudImage from 'src/components/CloudImage/CloudImage'
import Heading from 'src/components/Heading/Heading'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import { rewardableLandingRoute } from 'src/lib/urlBuilders'

export const QUERY = gql`
  query FindClaimNftQuery($id: String!) {
    rewardable(id: $id) {
      id
      type
      slug
      name
      asChildPublicParentRewardables {
        parentRewardable {
          slug
          name
          type
        }
      }
      nfts {
        cloudinaryId
      }
    }
  }
`

const CLAIM_MUTATION = gql`
  mutation ClaimMutation($rewardableId: String!, $externalAddress: String) {
    claim(rewardableId: $rewardableId, externalAddress: $externalAddress) {
      claimed
      tokenId
      success
      explorerUrl
      tokenId
      errors
      authorized
    }
  }
`

export const Loading = () => <LoadingIcon />

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindClaimNftQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  rewardable,
}: CellSuccessProps<FindClaimNftQuery, FindClaimNftQueryVariables>) => {
  const { logOut } = useAuth()
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal()

  // checks both db and blockchain to see if user is eligible to mint
  // if successful, it runs the gasless claim function
  const [claim, { loading, data }] = useMutation<ClaimMutation>(
    CLAIM_MUTATION,
    {
      variables: {
        rewardableId: rewardable.id,
        externalAddress: address,
      },
      onCompleted(data) {
        if (
          typeof data.claim.authorized === 'boolean' &&
          !data.claim.authorized
        ) {
          logOut()
        }
      },
    }
  )

  if (!rewardable.nfts.length) {
    return <div>No NFT found for this {capitalize(rewardable.type)}</div>
  }

  const nftImage = rewardable.nfts[0]?.cloudinaryId
  const { errors, success, explorerUrl } = data?.claim || {}

  const canMint = !loading && !success && !data?.claim.claimed
  const canConnect =
    !loading && !success && !address && rewardable.type === 'PACK'

  return (
    <div>
      <div className="mb-8 flex flex-col items-center">
        {nftImage && (
          <div className="mb-6">
            <CloudImage id={nftImage} height={200} width={200} />
          </div>
        )}
        <Heading>Claim Your Treasure</Heading>
      </div>

      {!loading &&
        errors?.map((err: string, i: number) => (
          <p className="mb-4 italic text-gray-200" key={i}>
            {err}
          </p>
        ))}

      {loading && (
        <div className="my-4">
          <LoadingIcon />
        </div>
      )}

      {canMint && <Button text="Claim NFT" onClick={claim} />}

      {canConnect && (
        <div className="pt-12">
          <p className="pb-2">Want us to check your external wallet too?</p>
          <Button
            text="Connect Wallet"
            variant="faded"
            border={false}
            onClick={openConnectModal}
          />
        </div>
      )}

      {success && (
        <div>
          <div className="pb-8">
            <Button
              to={rewardableLandingRoute({
                type: rewardable.type,
                slug: rewardable.slug,
              })}
              text={`Return to ${rewardable.name} ${capitalize(
                rewardable.type
              )}`}
            />
          </div>

          {explorerUrl && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={explorerUrl}
              className="text-gray-200 underline transition-colors hover:text-brand-accent-primary"
            >
              View transaction
            </a>
          )}
        </div>
      )}

      {/* Allows user to navigate to every public parent of this puzzle */}
      {rewardable.asChildPublicParentRewardables.length > 0 && (
        <div className="pt-6 text-center text-gray-200">
          <p>
            Return to:
            {rewardable.asChildPublicParentRewardables.map(
              (rewardable, index) => {
                if (!rewardable?.parentRewardable) return null

                const {
                  parentRewardable: { slug, name, type },
                } = rewardable

                return (
                  <Fragment key={slug + type}>
                    {/* prepend a comma to all but the first item */}
                    {index ? ', ' : ''}
                    <Link
                      to={rewardableLandingRoute({ slug, type })}
                      className="ml-2 mt-2 inline-block italic transition-colors hover:text-brand-accent-primary"
                    >
                      {name} {capitalize(type)}
                    </Link>
                  </Fragment>
                )
              }
            )}
          </p>
        </div>
      )}
    </div>
  )
}
